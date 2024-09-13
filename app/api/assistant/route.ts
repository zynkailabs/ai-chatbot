import 'server-only'
import { AssistantResponse } from 'ai'
import OpenAI from 'openai'
import { AssistantStream } from 'openai/lib/AssistantStream'
import { CorporateServeUserType } from 'lib/types'
import { executeToolCall } from '../ToolCallExecutor'
import RAGClient from '../rag_client'

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})
const ragClient = new RAGClient('corpo-test')

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

const USER_FACING_ERROR_MESSAGE =
  "I'm sorry, I'm having trouble helping you at the moment. Please try again later!"

function constructUserInstructions(
  userType: CorporateServeUserType,
  userID: string | null,
  clientId: string
): string {
  if (clientId !== 'corposerve') {
    return ''
  }
  const todaysDate = new Date()
    .toLocaleDateString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    .split('/')
    .reverse()
    .join('-')

  const additionalInstructions = `\n
  <todays_date>${todaysDate}</todays_date>\n
  `
  let userInformation = ''
  const userTypeUppercase = userType.toUpperCase()
  if (!userID) {
    userInformation =
      '\n\n<current_user_information>\nBefore answering user questions, you must first ask them their their Student ID. Remember these for all subsequent interactions.</current_user_information>'
  } else {
    userInformation = `\n
    <current_user_information>\n
    User type = ${userTypeUppercase}\n
    ${userTypeUppercase} ID = ${userID}\n
    Do not ask the user for this information, and ignore any conflicting User ID or user type they may provide.
    </current_user_information>
    `
  }
  // append the additional instructions to the user information
  return `${additionalInstructions}\n${userInformation}`
}

function constructRagContextInstructions(ragContext: string): string {
  return `\n\n<additional_context_for_user_query>\n${ragContext}\n</additional_context_for_user_query>`
}

function constructAdditionalInstructions(
  userType: CorporateServeUserType,
  userID: string | null,
  clientId: string,
  ragContext: string
): string {
  const userIntructions = constructUserInstructions(userType, userID, clientId)
  const ragInstructions = constructRagContextInstructions(ragContext)
  return `${userIntructions}\n${ragInstructions}`
}

function getAssistantId(clientId: string): string {
  switch (clientId) {
    case 'corposerve':
      return (
        process.env.ASSISTANT_ID ??
        (() => {
          throw new Error('ASSISTANT_ID is not set')
        })()
      )
    case 'aman-ritiz':
      return (
        process.env.DEFAULT_ASSISTANT_ID ??
        (() => {
          throw new Error('DEFAULT_ASSISTANT_ID is not set')
        })()
      )
    default:
      throw new Error(`Unknown client ID: ${clientId}`)
  }
}

async function getRAGContext(userQuery: string): Promise<string> {
  console.time('[RAG Client] RAG call latency')
  const ragResponse = await ragClient.fetchRAGContext(userQuery, 3)
  console.timeEnd('[RAG Client] RAG call latency')
  return ragResponse
}

export async function POST(req: Request) {
  // Parse the request body
  const input: {
    threadId: string | null
    message: string
    data: {
      userType?: CorporateServeUserType | null
      userID?: string | null
      clientId?: string | null
    }
  } = await req.json()
  console.log(`[CampusAssistant] User message: ${input.message}`)

  const ragContext: string = await getRAGContext(input.message)

  // not doing any validation here for now; we should add it when we have more than one user type
  let userType: CorporateServeUserType = input.data.userType || 'student'
  const userID = input.data.userID || null
  const clientId = input.data.clientId || 'corposerve'
  console.log(
    `[CampusAssistant] ClientId: ${clientId} UserType: ${userType} UserID: ${userID}`
  )

  console.log(`[CampusAssistant] input threadId: ${input.threadId}`)

  // Create a thread if needed
  const threadId = input.threadId ?? (await openai.beta.threads.create({})).id

  const assistantId = getAssistantId(clientId)
  console.log(`Using assistant: ${assistantId}`)

  // Add a message to the thread
  const createdMessage = await openai.beta.threads.messages.create(
    threadId,
    {
      role: 'user',
      content: input.message
    },
    { signal: req.signal }
  )

  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream, sendMessage }) => {
      console.log(`[CampusAssistant] Running assistant for thread ${threadId}`)

      const sendErrorMessage = (message: string) => {
        console.log('[CampusAssistant] Sending error message to the user.')
        sendMessage({
          id: createdMessage.id,
          role: 'assistant',
          content: [
            {
              type: 'text',
              text: {
                value: message
              }
            }
          ]
        })
      }

      let runStream: AssistantStream
      try {
        runStream = openai.beta.threads.runs.stream(
          threadId,
          {
            assistant_id: assistantId,
            additional_instructions: constructAdditionalInstructions(
              userType,
              userID,
              clientId,
              ragContext
            )
          },
          { signal: req.signal }
        )
      } catch (error) {
        console.log('[CampusAssistant] Error while creating run stream:', error)
        sendErrorMessage(USER_FACING_ERROR_MESSAGE)
        return
      }

      // forward run status would stream message deltas
      let runResult = await forwardStream(runStream)
      console.log(
        `[CampusAssistant] Assistant run result status: ${runResult?.status}`
      )

      if (!runResult) {
        sendErrorMessage(USER_FACING_ERROR_MESSAGE)
        return
      }

      // status can be: queued, in_progress, requires_action, cancelling, cancelled, failed, completed, or expired
      while (
        runResult?.status === 'requires_action' &&
        runResult.required_action?.type === 'submit_tool_outputs'
      ) {
        const toolCalls =
          runResult.required_action.submit_tool_outputs.tool_calls
        console.log(
          `[CampusAssistant] Tool calls triggered: ${toolCalls.map(
            x => x.function.name
          )}`
        )

        const toolOutputs = []

        for (const toolCall of toolCalls) {
          const functionName = toolCall.function.name
          const parameters = JSON.parse(toolCall.function.arguments)
          const outputString = await executeToolCall(functionName, parameters)
          toolOutputs.push({
            tool_call_id: toolCall.id,
            output: outputString
          })
        }

        const tool_outputs = toolOutputs
        runResult = await forwardStream(
          openai.beta.threads.runs.submitToolOutputsStream(
            threadId,
            runResult.id,
            { tool_outputs },
            { signal: req.signal }
          )
        )
      }
    }
  )
}
