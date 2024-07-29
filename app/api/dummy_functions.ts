class Dummy_Functions{
    getFoodMenu(){
        const menu = {
            "Monday": {
                "Breakfast": ["Boiled Eggs", "Aloo Paratha", "Poha", "Tea", "Coffee"],
                "Lunch": ["Rice", "Roti", "Paneer Butter Masala", "Chicken Curry", "Mixed Vegetable Curry"],
                "Dinner": ["Rice", "Roti", "Aloo Gobi", "Fish Fry", "Bhindi Masala"]
            },
            "Tuesday": {
                "Breakfast": ["Omelette", "Idli Sambar", "Upma", "Tea", "Coffee"],
                "Lunch": ["Rice", "Roti", "Chole Masala", "Vegetable Pulao", "Mutton Curry"],
                "Dinner": ["Rice", "Roti", "Palak Paneer", "Chicken Kebab", "Aloo Matar"]
            },
            "Wednesday": {
                "Breakfast": ["Boiled Eggs", "Puri Bhaji", "Masala Dosa", "Tea", "Coffee"],
                "Lunch": ["Rice", "Roti", "Rajma Masala", "Baingan Bharta", "Dal Fry"],
                "Dinner": ["Rice", "Roti", "Paneer Tikka Masala", "Fish Curry", "Aloo Matar"]
            },
            "Thursday": {
                "Breakfast": ["Omelette", "Aloo Paratha", "Dhokla", "Tea", "Coffee"],
                "Lunch": ["Rice", "Roti", "Kadhi Pakora", "Mixed Vegetable Curry", "Chicken Biryani"],
                "Dinner": ["Rice", "Roti", "Chole Masala", "Paneer Bhurji", "Fish Fry"]
            },
            "Friday": {
                "Breakfast": ["Boiled Eggs", "Poha", "Uttapam", "Tea", "Coffee"],
                "Lunch": ["Rice", "Roti", "Paneer Butter Masala", "Aloo Gobi", "Dal Tadka"],
                "Dinner": ["Rice", "Roti", "Bhindi Masala", "Vegetable Pulao", "Mutton Korma"]
            },
            "Saturday": {
                "Breakfast": ["Omelette", "Pav Bhaji", "Masala Dosa with Sambar and Chutney", "Tea", "Coffee"],
                "Lunch": ["Vegetable Biryani", "Roti", "Paneer Butter Masala", "Chicken Curry"],
                "Dinner": ["Rice", "Roti", "Aloo Gobi", "Paneer Tikka", "Fish Fry"]
            },
            "Sunday": {
                "Breakfast": ["Boiled Eggs", "Chole Bhature", "Upma", "Tea", "Coffee"],
                "Lunch": ["Hyderabadi Biryani", "Roti", "Paneer Butter Masala", "Mutton Curry"],
                "Dinner": ["Rice", "Roti", "Pav Bhaji", "Bhindi Masala", "Chicken Kebab"]
            }
        }        

        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let today = new Date()
        let day = dayNames[today.getDay()]
        return JSON.stringify(menu[day])
    }


    get_office_hours(){

        return `
        Administrative Offices
            Financial Aid Office
            Monday: 9:00 AM - 1:00 PM
            Wednesday: 1:00 PM - 5:00 PM
            Friday: 9:00 AM - 1:00 PM
            
            Library
            Monday to Friday: 8:00 AM - 8:00 PM
            Saturday: 10:00 AM - 4:00 PM
            
            Student Center
            Monday to Friday: 9:00 AM - 6:00 PM
            Saturday: 10:00 AM - 2:00 PM
            
            Mess/Cafeteria
            Monday to Sunday: 7:00 AM - 9:00 PM
            
            International Student Center
            Tuesday: 10:00 AM - 4:00 PM
            Thursday: 10:00 AM - 4:00 PM
       
        Course and Department Specific Offices
        
            Department of Family Medicine
            Monday: 10:00 AM - 12:00 PM
            Wednesday: 2:00 PM - 4:00 PM
            Friday: 10:00 AM - 12:00 PM
            
            Department of Nursing
            Tuesday: 9:00 AM - 11:00 AM
            Thursday: 1:00 PM - 3:00 PM
            
            Department of Pharmacy
            Monday: 2:00 PM - 4:00 PM
            Wednesday: 9:00 AM - 11:00 AM
            Friday: 2:00 PM - 4:00 PM
            
            Department of Dentistry
            Tuesday: 11:00 AM - 1:00 PM
            Thursday: 2:00 PM - 4:00 PM
            
            Department of Public Health
            Monday: 1:00 PM - 3:00 PM
            Wednesday: 10:00 AM - 12:00 PM
            Friday: 1:00 PM - 3:00 PM

            Department of Surgery
            Monday: 1:00 PM - 3:00 PM
            Wednesday: 10:00 AM - 12:00 PM
            Friday: 1:00 PM - 3:00 PM

            Departments of Gyneacology, Neurology, Cardiology and Orthopedics and other specializations
            Monday: 2:00 PM - 4:00 PM
            Wednesday: 9:00 AM - 11:00 AM
            Friday: 2:00 PM - 4:00 PM
        
        Other Services
            Counseling Center
            Monday: 9:00 AM - 1:00 PM
            Wednesday: 1:00 PM - 5:00 PM
            Friday: 9:00 AM - 1:00 PM
            
            Career Services
            Tuesday: 9:00 AM - 1:00 PM
            Thursday: 1:00 PM - 5:00 PM

            Financial Services
            Monday to Friday: 9:00 AM - 5:00 PM
           
            IT Help Desk
            Monday to Friday: 8:00 AM - 6:00 PM

            Security Office
            Monday to Sunday: 24 hours

            Health Center and Recreation Facilities
            Monday to Saturday: 9:00 AM - 6:00 PM

            Class Hours 
            Monday to Friday: 8:00 AM and 8:00 PM. Some evening and weekend classes may be available.
            
        Please refer to the university website for more details on office hours and locations.
        `
    }


    getRandomArbitrary(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    apply_leave(
        start_date: string,
        end_date: string
    ){
        let start = new Date(start_date)
        let end = new Date(end_date)
        let diff = Math.abs(end.getTime() - start.getTime())
        let days = Math.ceil(diff / (1000 * 60 * 60 * 24))

        let application_number = this.getRandomArbitrary(1000000,9999999)
        if(application_number %2 == 0){//generated number is even
            if(application_number == 9999999){
                application_number  = application_number -1 ;
            }else{
                application_number  = application_number +1 ;
            }
         }
        return `Your leave application for ${days} days starting from ${start_date} to ${end_date} has been submitted successfully. Please use the issue ticket number A${application_number} for future reference and tracking.`
    }

    track_ticket_status(ticket: string){
        let ticket_number = Number(ticket.slice(1))
        if(ticket.startsWith("A")){
            if (ticket_number % 2 == 0){
                return `Ticket ${ticket} has been approved.`
            }
            else{
                return `Ticket ${ticket} is currently in progress.`
            }
        }else{
            return `Invalid ticket. Please provide a valid ticket number.`
        }
    }


    get_university_policy(){

        return `
        University Policy Handbook
        Guest Policy on Campus
            Registration: All guests must register at the campus security office upon arrival. They must present a valid ID and receive a guest pass.
            Hours: Guests are allowed on campus between 8:00 AM and 10:00 PM. Overnight stays are not permitted without prior approval from the administration. You can visit the campus website and fill the guest form for overnight stay.
            Conduct: Guests must adhere to all university policies and regulations. Hosts are responsible for the behavior of their guests.
            Access: Certain areas, such as labs, libraries, and residence halls, may have restricted access for guests. Prior permission is required for entry.
        Financial Aid Policy
            Eligibility: Financial aid is available to all enrolled students who demonstrate financial need and meet academic requirements.
            Application Process: Students must complete the Free Application for Federal Student Aid (FAFSA) and any additional forms required by the university.
            Deadlines: Financial aid applications must be submitted by March 1st for the upcoming academic year.
            Types of Aid: Aid includes grants, scholarships, work-study programs, and loans. Details on each type of aid are available on the university website.
            Renewal: Financial aid must be renewed annually. Students must maintain satisfactory academic progress to remain eligible.
        Administrative Policy
            Office Hours: Administrative offices are open from 9:00 AM to 5:00 PM, Monday through Friday. Some offices may have extended hours during peak times.
            Appointments: Students are encouraged to make appointments for meetings with administrative staff to ensure availability.
            Communication: Official university communications will be sent via university email. Students are responsible for regularly checking their email.
            Complaints and Appeals: Students may file complaints or appeals regarding administrative decisions through the designated process outlined on the university website.
        Academic Policy
            Attendance: Regular attendance is mandatory for all classes. Absences must be reported to the instructor and may require documentation.
            Grading System: The university uses a standard letter grading system (A, B, C, D, F) with pluses and minuses. The grading scale and criteria are detailed in the course syllabus.
            Examinations: Midterm and final exams are scheduled by the registrar’s office. Students must adhere to the exam schedule and policies.
            Academic Integrity: All students must adhere to the university’s academic integrity policy, which prohibits cheating, plagiarism, and other forms of academic dishonesty.
        Residence Life Policy
            Housing Assignments: Housing assignments are made based on availability and student preferences. Requests for changes must be submitted in writing.
            Quiet Hours: Quiet hours are from 10:00 PM to 8:00 AM daily. During finals week, 24-hour quiet hours are in effect.
            Room Inspections: Residence hall rooms are subject to inspection for maintenance, health, and safety reasons. Notice will be given prior to inspections whenever possible.
            Prohibited Items: Firearms, illegal drugs, and open flames (e.g., candles) are prohibited in residence halls. A full list of prohibited items is available in the residence life handbook.
        
        These policies are subject to change, and students are responsible for staying informed about current policies. Full details and updates are available on the university website.
        
        `
    }

    get_course_prerequisites(){
        return 
        `
        Prerequisites Document
            1. Mitochondria: Structure & Function-PDH & TCA
            Prerequisites:
            Energy Metabolism
            Histology (non matric)
            Introduction to Anatomy (Revisited)
            Mitochondria: ETC & OP

            2. Development of Embryo: Cell Growth
            Prerequisites:
            Introduction to Anatomy (Revisited)
            Histology of the Heart and Vessels
            Behavioral Science
            Clinical Diagnostic Imaging

            3. Behavioral and Community Medicine I
            Prerequisites:
            Introduction to Clinical Medicine IV
            Behavioral Science
            Psychiatry (3W Core)
            Behavioral and Community Medicine II

            4. Clinical Diagnostic Imaging
            Prerequisites:
            Histology of the Heart and Vessels
            Introduction to Anatomy (Revisited)
            MI & Heart Failure case
            Radiology (4w Elective)

            5. Advanced Cardiac Life Support
            Prerequisites:
            MI & Heart Failure case
            Clinical Cardiology (4w Elective)
            Emergency Medicine (5w Elective)
            Internal Medicine (5w Elective)
        `
    }

    get_specialization_requirements(){
        return `
            Specialization Requirements Document
                1. Advanced General Health (AGH)
                    Required Courses:
                        BSC (Basic Science Course)
                        ASHS (Advanced Science and Health Studies)
                        DSP (Disease and Symptom Pathology)
                        DCM (Diagnostics and Clinical Methods)
                        DEE (Disease Epidemiology and Etiology)
                    Additional Requirements:
                        Completion of at least one elective in Emergency Medicine (EMTB) or Clinical Medicine (MBBS)
                        Minimum GPA of 3.0 in core courses
                
                2. Behavioral Science and Health Studies (ASHS)
                    Required Courses:
                        BSEP (Behavioral Science and Epidemiology Program)
                        DSP (Disease and Symptom Pathology)
                        DAH (Disease and Health)
                        DAP (Disease and Psychology)
                        DEE (Disease Epidemiology and Etiology)
                    Additional Requirements:
                        Participation in a research project related to Behavioral Science
                        Completion of a capstone project or thesis
                        Minimum GPA of 3.2 in core courses

                3. Diagnostic and Clinical Methods (DCM)
                    Required Courses:
                        DGD (Diagnostics and General Disease)
                        DFD (Diagnostics and Functional Disease)
                        DMLT (Diagnostic Medical Laboratory Techniques)
                        DA (Diagnostic Applications)
                        DNTT (Diagnostic Nuclear and Therapeutic Techniques)
                    Additional Requirements:
                        Practical experience in a clinical setting (minimum 200 hours)
                        Certification in Advanced Cardiac Life Support (ACLS)
                        Minimum GPA of 3.5 in core courses

                4. Emergency Medical Training and Basic Life Support (EMTB)
                    Required Courses:
                        BSC (Basic Science Course)
                        DA (Diagnostic Applications)
                        DCM (Diagnostics and Clinical Methods)
                        DSP (Disease and Symptom Pathology)
                        KMCIC (Key Medical and Clinical Interventions and Care)
                    Additional Requirements:
                        Certification in Basic Life Support (BLS)
                        Completion of an internship in an emergency medical setting
                        Minimum GPA of 3.0 in core courses

                5. Medical and Behavioral Science Program (MBBS)
                    Required Courses:
                        BSC (Basic Science Course)
                        ASHS (Advanced Science and Health Studies)
                        DGD (Diagnostics and General Disease)
                        DAH (Disease and Health)
                        DAP (Disease and Psychology)
                        DEE (Disease Epidemiology and Etiology)
                    Additional Requirements:
                        Completion of a residency program in a chosen specialty
                        Participation in clinical rotations across various departments
                        Minimum GPA of 3.5 in core courses
                        Submission of a final research project or thesis
        `
    }

}