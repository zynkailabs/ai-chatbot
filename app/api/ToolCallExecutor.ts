import APIClient from './api_client'

// Define types for our functions and parameters
type ToolFunction = (...args: any[]) => Promise<any>
type ToolParameters = Record<string, any>

const corpoAPIClient = new APIClient(
  process.env.CLIENT_ID || '',
  process.env.CLIENT_SECRET || '',
  process.env.SCOPE || ''
)

const toolFunctions: Record<string, ToolFunction> = {
  access_data: async (query: string): Promise<any> => {
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
  get_food_menu: async (date?: string): Promise<any> => {
    console.log(`Getting food menu for date: ${date || 'today'}`)
    return { menu: ['Item 1', 'Item 2', 'Item 3'] }
  },
  get_office_hours: async (department?: string): Promise<any> => {
    console.log(`Getting office hours for department: ${department || 'all'}`)
    return { hours: '9 AM - 5 PM', days: 'Monday - Friday' }
  },
  get_university_policy: async (policyName: string): Promise<any> => {
    console.log(`Getting university policy: ${policyName}`)
    return { policyName, content: 'Policy details...' }
  },
  get_subject_prerequisites: async (subjectCode: string): Promise<any> => {
    console.log(`Getting prerequisites for subject: ${subjectCode}`)
    return { subjectCode, prerequisites: ['MATH101', 'ENG102'] }
  },
  get_specialization_requirements: async (
    specializationName: string
  ): Promise<any> => {
    console.log(
      `Getting requirements for specialization: ${specializationName}`
    )
    return {
      specializationName,
      requirements: ['Course A', 'Course B', 'Project C']
    }
  },
  track_ticket_status: async (ticketId: string): Promise<any> => {
    console.log(`Tracking status for ticket: ${ticketId}`)
    return { ticketId, status: 'In Progress', lastUpdated: '2023-07-30' }
  },
  apply_leave: async (
    startDate: string,
    endDate: string,
    reason: string
  ): Promise<any> => {
    console.log(`Applying for leave from ${startDate} to ${endDate}`)
    return { success: true, leaveId: 'LEAVE123', status: 'Pending Approval' }
  },
  get_university_schedule: async (semester?: string): Promise<any> => {
    console.log(
      `Getting university schedule for semester: ${semester || 'current'}`
    )
    return { semester, events: ['Event 1', 'Event 2', 'Event 3'] }
  },
  get_class_schedule: async (studentId: string): Promise<any> => {
    console.log(`Getting class schedule for student: ${studentId}`)
    return { studentId, schedule: ['Class A: Mon 9AM', 'Class B: Tue 2PM'] }
  },
  get_housing_availability: async (): Promise<any> => {
    console.log('Getting housing availability')
    return { available: true, units: 5 }
  },
  apply_housing_issue: async (issue: string): Promise<any> => {
    console.log(`Creating housing issue application for: ${issue}`)
    return { success: true, issueId: 'HOUSE123', status: 'Submitted' }
  }
}

function getExpectedParams(func: ToolFunction): string[] {
  const funcStr = func.toString()
  const argsStr = funcStr.slice(funcStr.indexOf('(') + 1, funcStr.indexOf(')'))
  return argsStr
    .split(',')
    .map(arg => arg.trim())
    .filter(arg => arg !== '')
}

// Helper function to validate parameters
function validateParameters(
  functionName: string,
  providedParams: ToolParameters,
  expectedParams: string[]
): void {
  const providedKeys = Object.keys(providedParams)

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

    const func = toolFunctions[functionName]

    // Get the expected parameters for the function
    const expectedParams = getExpectedParams(func)

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
    console.error(`Error in executeToolCall for function "${functionName}":`, error)

    // Create an error response object
    const errorResponse = {
      error: true,
      message: error instanceof Error ? error.message : 'An unknown error occurred',
      functionName: functionName
    }

    // Return the stringified error response
    return JSON.stringify(errorResponse)
  }
}