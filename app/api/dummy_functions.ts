import jsonData from './dummy_functions_data.json'

interface DummyData {
    Food_Menu: {
        [day: string]: {
            Breakfast: string[]
            Lunch: string[]
            Dinner: string[]
        }
    }
    Office_Hours: string
    University_Policy: string
    Subject_Prerequisites: string
    Specialization_Requirements: string
    University_Schedule: string
    Class_Schedule: string
    Housing_Availability: string
}

class DummyFunctionsClient {
    dummy_data: DummyData
    constructor() {
        this.dummy_data = jsonData['Dummy_Data']
        console.log(this.dummy_data)
    }

    getFoodMenu() {
        const menu = this.dummy_data['Food_Menu']
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
    }

    getOfficeHours() {
        return this.dummy_data['Office_Hours']
    }

    getRandomArbitrary(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min
    }

    createLeaveApplication(start_date: string, end_date: string) {
        let start = new Date(start_date)
        let end = new Date(end_date)
        let diff = Math.abs(end.getTime() - start.getTime())
        let days = Math.ceil(diff / (1000 * 60 * 60 * 24))

        let application_number = this.getRandomArbitrary(1000000, 9999999)
        if (application_number % 2 == 0) {
            //generated number is even
            if (application_number == 9999999) {
                application_number = application_number - 1
            } else {
                application_number = application_number + 1
            }
        }
        return `Your leave application for ${days} days starting from ${start_date} to ${end_date} has been submitted successfully. Please use the issue ticket number A${application_number} for future reference and tracking.`
    }

    createHousingIssueApplication(issue: string) {
        let application_number = this.getRandomArbitrary(1000000, 9999999)
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
    }

    trackTicketStatus(ticket_number: string) {
        let num = Number(ticket_number.slice(1))
        if (ticket_number.startsWith('A') || ticket_number.startsWith('H')) {
            let request_type = 'Leave Application'
            if (ticket_number.startsWith('H')) {
                request_type = 'Kitchen Sink repair'
            }
            if (num % 2 == 0) {
                return `Request for ${request_type} with ticket number ${ticket_number} has been approved.`
            } else {
                return `Rquest for ${request_type} with ticket number ${ticket_number} is in progress.`
            }
        } else {
            return `Invalid ticket. Please provide a valid ticket number. Housing related tickets start with 'H' and all other administrative tickets start with 'A'`
        }
    }

    getUniversityPolicy() {
        return this.dummy_data['University_Policy']
    }

    getSubjectPrerequisites() {
        return this.dummy_data['Subject_Prerequisites']
    }

    getSpecializationRequirements() {
        return this.dummy_data['Specialization_Requirements']
    }
    getUniversitySchedule() {
        return this.dummy_data['University_Schedule']
    }
    getClassSchedule() {
        return this.dummy_data['Class_Schedule']
    }
    getHousingAvailability() {
        return this.dummy_data['Housing_Availability']
    }
}
export default DummyFunctionsClient
