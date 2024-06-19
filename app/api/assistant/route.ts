import 'server-only'
import { AssistantResponse } from 'ai'
import OpenAI from 'openai'

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

async function callAPI(queryString: string): Promise<any> {
  try {
    const query = queryString.trim()
    if (!query) {
      console.log(
        `[CampusAssistant] Tried calling backend API with an empty query; returning early.`
      )
      return 'you ran an empty query string which is not valid'
    }
    const apiURL = FASTAPI_BASE_URL.concat(`/run_query?query=${query}`)
    console.log(`[CampusAssistant] Calling backend with query: ${query}`)
    const res = await fetch(apiURL)
    const data = await res.json()
    return data
  } catch (err) {
    console.log(`[CampusAssistant] Backend API error: ${err}`)
    return 'there was an error running the SQL query'
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
          run_sql_query: callAPI
        }

        for (const toolCall of toolCalls) {
          const functionName = toolCall.function.name
          const parameters = JSON.parse(toolCall.function.arguments)
          const functionToCall = availableFunctions[functionName]
          
          let outputString = null
          if (!functionToCall) {
            console.log(`[CampusAssistant] Unknown function: ${functionName}`)
            outputString =
              `That is not a valid function. The functions available to you are: ${Object.keys(availableFunctions)}`
          } else {
            const functionResponse = await functionToCall(parameters.query)
            outputString = JSON.stringify(functionResponse)
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
