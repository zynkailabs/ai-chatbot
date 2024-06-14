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

async function callAPI(queryString: string): Promise<any> {
  console.log('========= FAST API ============')
  try {
    const res = await fetch(
      `https://fast-api-ritiztambi.replit.app/run_query?query=${queryString}`
    )
    const data = await res.json()
    console.log('========= CALLING FAST API ============')
    console.log(data)
    return data
  } catch (err) {
    console.log('========= FAST API ERROR ============')
    console.log(err)
  }
}

export async function POST(req: Request) {
  // Parse the request body
  const input: {
    threadId: string | null
    message: string
  } = await req.json()
  console.log('=========== RECEIVED INPUT ============')
  console.log(input)

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
      console.log('=============== RUNNING ASSISTANT ==============')
      console.log(threadId)
      console.log(process.env.ASSISTANT_ID)
      console.log(req.signal)
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

      console.log('Calling forwardStream')
      console.log(runStream)
      // forward run status would stream message deltas
      let runResult = await forwardStream(runStream)
      console.log('=============== RUN RESULT ==============')
      console.log(runResult)

      // status can be: queued, in_progress, requires_action, cancelling, cancelled, failed, completed, or expired
      while (
        runResult?.status === 'requires_action' &&
        runResult.required_action?.type === 'submit_tool_outputs'
      ) {
        console.log('=========== TOOL CALL ==============')
        console.log(runResult.required_action.submit_tool_outputs.tool_calls)
        const toolCalls =
          runResult.required_action.submit_tool_outputs.tool_calls
        const toolOutputs = []
        const availableFunctions: { [key: string]: Function } = {
          run_sql_query: callAPI
        }

        for (const toolCall of toolCalls) {
          const functionName = toolCall.function.name
          const parameters = JSON.parse(toolCall.function.arguments)
          const functionToCall = availableFunctions[functionName]
          const functionResponse = await functionToCall(parameters)
          console.log('========= functionResponse ============')
          console.log(functionResponse)
          const outputString = JSON.stringify(functionResponse)

          toolOutputs.push({
            tool_call_id: toolCall.id,
            output: outputString
          })
        }

        const tool_outputs = toolOutputs
        console.log('=========== calling forwardstream ===========')
        console.log(tool_outputs)
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
