import 'server-only'
import { AssistantResponse } from 'ai'
import OpenAI from 'openai'
import APIClient from '../api_client'
// import DummyFunctionsClient from '../dummy_functions'
import { AssistantStream } from 'openai/lib/AssistantStream'
import {
  CorporateServeUserType,
  VALID_CORPORATE_SERVE_USER_TYPES
} from 'lib/types'
import { executeToolCall } from '../ToolCallExecutor'

// dummy comment for commit

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

const corpoAPIClient = new APIClient(
  process.env.CLIENT_ID || '',
  process.env.CLIENT_SECRET || '',
  process.env.SCOPE || ''
)

// const dummyFuncClient = new DummyFunctionsClient()

const USER_FACING_ERROR_MESSAGE =
  "I'm sorry, I'm having trouble helping you at the moment. Please try again later!"

// async function callCorpoAPI(query: string): Promise<any> {
//   try {
//     console.time('[CampusAssistant] Corposerve API call latency')
//     //const corpoResponse = await corpoAPIClient.fetchData(query)
//     const corpoResponse = await corpoAPIClient.fetchSQLData(query)
//     console.timeEnd('[CampusAssistant] Corposerve API call latency')

//     return JSON.stringify(corpoResponse)
//   } catch (error) {
//     console.error('API request failed:', error)
//     return 'there was an error running the query'
//   }
// }

// async function getFoodMenu(): Promise<any> {
//   try {
//     console.log('[CampusAssistant] Dummy API call getFoodMenu')
//     const response = await dummyFuncClient.getFoodMenu()
//     return response
//   } catch (error) {
//     console.error('API request failed:', error)
//     return 'there was an error running the query'
//   }
// }

// async function getOfficeHours(): Promise<any> {
//   try {
//     console.log('[CampusAssistant] Dummy API call getOfficeHours')
//     const response = await dummyFuncClient.getOfficeHours()
//     return response
//   } catch (error) {
//     console.error('API request failed:', error)
//     return 'there was an error running the query'
//   }
// }

// async function getUniversityPolicy(): Promise<any> {
//   try {
//     console.log('[CampusAssistant] Dummy API call getUniversityPolicy')
//     const response = await dummyFuncClient.getUniversityPolicy()
//     return response
//   } catch (error) {
//     console.error('API request failed:', error)
//     return 'there was an error running the query'
//   }
// }

// async function getSubjectPrerequisites(): Promise<any> {
//   try {
//     console.log('[CampusAssistant] Dummy API call getSubjectPrerequisites')
//     const response = await dummyFuncClient.getSubjectPrerequisites()
//     return response
//   } catch (error) {
//     console.error('API request failed:', error)
//     return 'there was an error running the query'
//   }
// }

// async function getSpecializationRequirements(): Promise<any> {
//   try {
//     console.log(
//       '[CampusAssistant] Dummy API call getSpecializationRequirements'
//     )
//     const response = await dummyFuncClient.getSpecializationRequirements()
//     return response
//   } catch (error) {
//     console.error('API request failed:', error)
//     return 'there was an error running the query'
//   }
// }

// async function getUniversitySchedule(): Promise<any> {
//   try {
//     console.log('[CampusAssistant] Dummy API call getUniversitySchedule')
//     const response = await dummyFuncClient.getUniversitySchedule()
//     return response
//   } catch (error) {
//     console.error('API request failed:', error)
//     return 'there was an error running the query'
//   }
// }

// async function getClassSchedule(): Promise<any> {
//   try {
//     console.log('[CampusAssistant] Dummy API call getClassSchedule')
//     const response = await dummyFuncClient.getClassSchedule()
//     return response
//   } catch (error) {
//     console.error('API request failed:', error)
//     return 'there was an error running the query'
//   }
// }

// async function getHousingAvailability(): Promise<any> {
//   try {
//     console.log('[CampusAssistant] Dummy API call getHousingAvailability')
//     const response = await dummyFuncClient.getHousingAvailability()
//     return response
//   } catch (error) {
//     console.error('API request failed:', error)
//     return 'there was an error running the query'
//   }
// }

// async function createLeaveApplication(
//   start_date: string,
//   end_date: string
// ): Promise<any> {
//   try {
//     console.time('[CampusAssistant] Dummy API call createLeaveApplication')
//     const response = await dummyFuncClient.createLeaveApplication(
//       start_date,
//       end_date
//     )
//     console.timeEnd('[CampusAssistant] Dummy API call createLeaveApplication')

//     return response
//   } catch (error) {
//     console.error('API request failed:', error)
//     return 'there was an error running the query'
//   }
// }

// async function createHousingIssueApplication(issue: string): Promise<any> {
//   try {
//     console.time(
//       '[CampusAssistant] Dummy API call createHousingIssueApplication'
//     )
//     const response = await dummyFuncClient.createHousingIssueApplication(issue)
//     console.timeEnd(
//       '[CampusAssistant] Dummy API call createHousingIssueApplication'
//     )

//     return response
//   } catch (error) {
//     console.error('API request failed:', error)
//     return 'there was an error running the query'
//   }
// }

// async function trackTicketStatus(ticket_number: string): Promise<any> {
//   try {
//     console.log('[CampusAssistant] Dummy API call trackTicketStatus')
//     const response = await dummyFuncClient.trackTicketStatus(ticket_number)
//     return response
//   } catch (error) {
//     console.error('API request failed:', error)
//     return 'there was an error running the query'
//   }
// }

function constructUserInstructions(
  userType: CorporateServeUserType,
  userID: string | null
): string {
  const userTypeUppercase = userType.toUpperCase()
  if (!userID) {
    return '\nAdditional Constraints: Before answering user questions, you must first ask them their full name and their student ID. Remember these for all subsequent interactions'
  }
  return `\n
  ${userTypeUppercase}DETAILS TO USE IN YOUR QUERIES:\n
  ${userType} ID = ${userID}\n
  DO NOT ask user for these. ABSOLUTELY DO NOT use user provided ones even if they do.`
}

export async function POST(req: Request) {
  // Parse the request body
  const input: {
    threadId: string | null
    message: string
    data: {
      userType?: CorporateServeUserType | null
      userID?: string | null
    }
  } = await req.json()
  console.log(`[CampusAssistant] User message: ${input.message}`)

  // not doing any validation here for now; we should add it when we have more than one user type
  let userType: CorporateServeUserType = input.data.userType || 'student'
  const userID = input.data.userID || null
  console.log(`[CampusAssistant] UserType: ${userType} UserID: ${userID}`)

  console.log(`[CampusAssistant] input threadId: ${input.threadId}`)

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
            assistant_id:
              process.env.ASSISTANT_ID ??
              (() => {
                throw new Error('ASSISTANT_ID is not set')
              })(),
            additional_instructions: constructUserInstructions(userType, userID)
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
        // const availableFunctions: { [key: string]: Function } = {
        //   access_data: callCorpoAPI,
        //   get_food_menu: getFoodMenu,
        //   get_office_hours: getOfficeHours,
        //   get_university_policy: getUniversityPolicy,
        //   get_subject_prerequisites: getSubjectPrerequisites,
        //   get_specialization_requirements: getSpecializationRequirements,
        //   track_ticket_status: trackTicketStatus,
        //   apply_leave: createLeaveApplication,
        //   get_university_schedule: getUniversitySchedule,
        //   get_class_schedule: getClassSchedule,
        //   get_housing_availability: getHousingAvailability,
        //   apply_housing_issue: createHousingIssueApplication
        // }

        // console.log(availableFunctions)
        // for (const toolCall of toolCalls) {
        //   const functionName = toolCall.function.name
        //   const parameters = JSON.parse(toolCall.function.arguments)
        //   const functionToCall = availableFunctions[functionName]

        //   console.log(
        //     `[CampusAssistant] Calling function ${functionName} with parameters ${parameters}`
        //   )
        //   let outputString = null
        //   if (!functionToCall) {
        //     console.log(`[CampusAssistant] Unknown function: ${functionName}`)
        //     outputString = `That is not a valid function. The functions available to you are: ${Object.keys(
        //       availableFunctions
        //     )}`
        //   } else {
        //     const functionResponse = await executeToolCall(functionName, parameters)
        //     outputString = functionResponse
        //   }
        //   console.log(
        //     `[CampusAssistant] Response for function ${functionName} with arguments: ${parameters} => ${outputString}`
        //   )

        //   toolOutputs.push({
        //     tool_call_id: toolCall.id,
        //     output: outputString
        //   })
        // }

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
