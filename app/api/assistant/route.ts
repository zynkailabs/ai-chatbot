import 'server-only'
import { AssistantResponse } from 'ai'
import OpenAI from 'openai'
import APIClient from '../api_client'

// dummy comment for commit

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

const homeTemperatures = {
  bedroom: 20,
  'home office': 21,
  'living room': 21,
  kitchen: 22,
  bathroom: 23
}

const FASTAPI_BASE_URL = 'https://fast-api-ritiztambi.replit.app'

const corpoAPIClient = new APIClient(
  process.env.CLIENT_ID || '',
  process.env.CLIENT_SECRET || '',
  process.env.SCOPE || ''
)

async function callCorpoAPI(oDataQuery: string): Promise<any> {
  try {
    console.time('[CampusAssistant] Corposerve API call latency')
    const corpoResponse = await corpoAPIClient.fetchData(oDataQuery)
    console.timeEnd('[CampusAssistant] Corposerve API call latency')

    return JSON.stringify(corpoResponse)
  } catch (error) {
    console.error('API request failed:', error)
    return 'there was an error running the query'
  }
}

export async function POST(req: Request) {
  // Parse the request body
  const input: {
    threadId: string | null
    message: string
  } = await req.json()
  console.log(`[CampusAssistant] User message: ${input.message}`)

  // Create a thread if needed
  const threadId = input.threadId ?? (await openai.beta.threads.create({})).id

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
    async ({ forwardStream, sendDataMessage }) => {
      console.log(`[CampusAssistant] Running assistant for thread ${threadId}`)

      // Run the assistant on the thread
      const runStream = openai.beta.threads.runs.stream(
        threadId,
        {
          assistant_id:
            process.env.ASSISTANT_ID ??
            (() => {
              throw new Error('ASSISTANT_ID is not set')
            })()
        },
        { signal: req.signal }
      )

      // forward run status would stream message deltas
      let runResult = await forwardStream(runStream)

      console.log(
        `[CampusAssistant] Assistant run result status: ${runResult?.status}`
      )

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
        const availableFunctions: { [key: string]: Function } = {
          access_data: callCorpoAPI
        }

        for (const toolCall of toolCalls) {
          const functionName = toolCall.function.name
          const parameters = JSON.parse(toolCall.function.arguments)
          const functionToCall = availableFunctions[functionName]

          let outputString = null
          if (!functionToCall) {
            console.log(`[CampusAssistant] Unknown function: ${functionName}`)
            outputString = `That is not a valid function. The functions available to you are: ${Object.keys(
              availableFunctions
            )}`
          } else {
            const functionResponse = await functionToCall(
              parameters.odata_query
            )
            outputString = functionResponse
          }

          console.log(
            `[CampusAssistant] Response for function ${functionName} with arguments: ${parameters} => ${outputString}`
          )

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
