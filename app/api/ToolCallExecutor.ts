import APIClient from './api_client'
// import dummyDataJson from './dummy_functions_data.json'
import { DummyData, dummyDataJson } from './DummyData'

// Define types for our functions and parameters
type ToolFunction = {
  func: (...args: any[]) => Promise<any>
  params: string[]
}
type ToolParameters = Record<string, any>

const corpoAPIClient = new APIClient(
  process.env.CLIENT_ID || '',
  process.env.CLIENT_SECRET || '',
  process.env.SCOPE || ''
)

function getRandomNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min
}

const dummyData: DummyData = dummyDataJson

const toolFunctions: Record<string, ToolFunction> = {
  access_data: {
    func: async (query: string): Promise<any> => {
      try {
        console.time('[CampusAssistant] Corposerve API call latency')
        // const corpoResponse = await corpoAPIClient.fetchData(query)
        const corpoResponse = await corpoAPIClient.fetchSQLData(query)
        console.timeEnd('[CampusAssistant] Corposerve API call latency')

        return JSON.stringify(corpoResponse)
      } catch (error) {
        console.error('API request failed:', error)
        return 'there was an error running the query'
      }
    },
    params: ['query']
  },
  get_food_menu: {
    func: async (): Promise<any> => {
      const menu = dummyData['Food_Menu']
      const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
      let today = new Date()
      let day = dayNames[today.getDay()]
      return JSON.stringify(menu[day])
    },
    params: []
  },
  get_office_hours: {
    func: async (): Promise<any> => {
      return dummyData['Office_Hours']
    },
    params: []
  },
  get_university_policy: {
    func: async (): Promise<any> => {
      return dummyData['University_Policy']
    },
    params: []
  },
  get_subjects_per_specialization_and_subject_prerequisites: {
    func: async (): Promise<any> => {
      return dummyData['Subjects_per_Specialization_and_Subject_PreRequisites']
    },
    params: []
  },
  get_course_requirements: {
    func: async (): Promise<any> => {
      return dummyData['Course_Requirements']
    },
    params: []
  },
  track_ticket_status: {
    func: async (ticket_number: string): Promise<any> => {
      let num = Number(ticket_number.slice(1))
      if (ticket_number.startsWith('A') || ticket_number.startsWith('H')) {
        let request_type = 'Leave Application'
        if (ticket_number.startsWith('H')) {
          request_type = 'Kitchen Sink repair'
        }
        if (num % 2 == 0) {
          return `Request for ${request_type} with ticket number ${ticket_number} has been approved.`
        } else {
          return `Request for ${request_type} with ticket number ${ticket_number} is in progress.`
        }
      } else {
        return `Invalid ticket. Please provide a valid ticket number. Housing related tickets start with 'H' and all other administrative tickets start with 'A'`
      }
    },
    params: ['ticket_number']
  },
  apply_leave: {
    func: async (start_date: string, end_date: string): Promise<any> => {
      let start = new Date(start_date)
      let end = new Date(end_date)
      let diff = Math.abs(end.getTime() - start.getTime())
      let days = Math.ceil(diff / (1000 * 60 * 60 * 24))

      let application_number = getRandomNumberBetween(1000000, 9999999)
      if (application_number % 2 == 0) {
        //generated number is even
        if (application_number == 9999999) {
          application_number = application_number - 1
        } else {
          application_number = application_number + 1
        }
      }
      return `Your leave application for ${days} days starting from ${start_date} to ${end_date} has been submitted successfully. Please use the issue ticket number A${application_number} for future reference and tracking.`
    },
    params: ['start_date', 'end_date']
  },
  get_university_schedule: {
    func: async (): Promise<any> => {
      return dummyData['University_Schedule']
    },
    params: []
  },
  get_class_schedule: {
    func: async (): Promise<any> => {
      return dummyData['Class_Schedule']
    },
    params: []
  },
  get_housing_availability: {
    func: async (): Promise<any> => {
      return dummyData['Housing_Availability']
    },
    params: []
  },
  apply_housing_issue: {
    func: async (issue: string): Promise<any> => {
      let application_number = getRandomNumberBetween(1000000, 9999999)
      console.log(application_number)
      if (application_number % 2 == 0) {
        //generated number is even
        if (application_number == 9999999) {
          application_number = application_number - 1
        } else {
          application_number = application_number + 1
        }
      }
      return `Your application for ${issue} has been submitted successfully. Please use the issue ticket number H${application_number} for future reference and tracking. For more details, please contact Residential Services Center for further assistance regarding your application request.`
    },
    params: ['issue']
  }
}

// Helper function to validate parameters
function validateParameters(
  functionName: string,
  providedParams: ToolParameters,
  expectedParams: string[]
): void {
  // log all the provided parameters
  console.log(
    `Provided parameters for ${functionName}: ${JSON.stringify(providedParams)} and expectedParams: ${expectedParams}`
  )
  const providedKeys = Object.keys(providedParams)

  console.log(`providedKeys = ${providedKeys}`)
  // Check for missing parameters
  const missingParams = expectedParams.filter(
    param => !providedKeys.includes(param)
  )
  if (missingParams.length > 0) {
    throw new Error(
      `Missing parameters for function "${functionName}": ${missingParams.join(', ')}`
    )
  }

  // Check for extra parameters
  const extraParams = providedKeys.filter(key => !expectedParams.includes(key))
  if (extraParams.length > 0) {
    throw new Error(
      `Unexpected parameters for function "${functionName}": ${extraParams.join(', ')}`
    )
  }
}

// Main function to execute a tool call
export async function executeToolCall(
  functionName: string,
  parameters: ToolParameters
): Promise<string> {
  console.log('Executing tool call: ', functionName)

  try {
    // Check if the function exists
    if (!(functionName in toolFunctions)) {
      throw new Error(`Function "${functionName}" is not registered.`)
    }

    const { func, params: expectedParams } = toolFunctions[functionName]

    // Validate parameters
    validateParameters(functionName, parameters, expectedParams)

    // Call the function with the provided parameters
    const result = await func(...Object.values(parameters))

    // Check if the result is already a string
    if (typeof result === 'string') {
      return result
    }

    // If it's not a string, stringify the result before returning
    return JSON.stringify(result)
  } catch (error) {
    console.error(
      `Error in executeToolCall for function "${functionName}":`,
      error
    )

    // Create an error response object
    const errorResponse = {
      error: true,
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
      functionName: functionName
    }

    // Return the stringified error response
    return JSON.stringify(errorResponse)
  }
}
