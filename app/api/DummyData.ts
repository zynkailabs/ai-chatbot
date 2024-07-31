export interface DummyData {
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

export const dummyDataJson: DummyData = {
    Food_Menu: {
        Monday: {
            Breakfast: ['Boiled Eggs', 'Aloo Paratha', 'Poha', 'Tea', 'Coffee'],
            Lunch: [
                'Rice',
                'Roti',
                'Paneer Butter Masala',
                'Chicken Curry',
                'Mixed Vegetable Curry'
            ],
            Dinner: ['Rice', 'Roti', 'Aloo Gobi', 'Fish Fry', 'Bhindi Masala']
        },
        Tuesday: {
            Breakfast: ['Omelette', 'Idli Sambar', 'Upma', 'Tea', 'Coffee'],
            Lunch: [
                'Rice',
                'Roti',
                'Chole Masala',
                'Vegetable Pulao',
                'Mutton Curry'
            ],
            Dinner: [
                'Rice',
                'Roti',
                'Palak Paneer',
                'Chicken Kebab',
                'Aloo Matar'
            ]
        },
        Wednesday: {
            Breakfast: [
                'Boiled Eggs',
                'Puri Bhaji',
                'Masala Dosa',
                'Tea',
                'Coffee'
            ],
            Lunch: [
                'Rice',
                'Roti',
                'Rajma Masala',
                'Baingan Bharta',
                'Dal Fry'
            ],
            Dinner: [
                'Rice',
                'Roti',
                'Paneer Tikka Masala',
                'Fish Curry',
                'Aloo Matar'
            ]
        },
        Thursday: {
            Breakfast: ['Omelette', 'Aloo Paratha', 'Dhokla', 'Tea', 'Coffee'],
            Lunch: [
                'Rice',
                'Roti',
                'Kadhi Pakora',
                'Mixed Vegetable Curry',
                'Chicken Biryani'
            ],
            Dinner: [
                'Rice',
                'Roti',
                'Chole Masala',
                'Paneer Bhurji',
                'Fish Fry'
            ]
        },
        Friday: {
            Breakfast: ['Boiled Eggs', 'Poha', 'Uttapam', 'Tea', 'Coffee'],
            Lunch: [
                'Rice',
                'Roti',
                'Paneer Butter Masala',
                'Aloo Gobi',
                'Dal Tadka'
            ],
            Dinner: [
                'Rice',
                'Roti',
                'Bhindi Masala',
                'Vegetable Pulao',
                'Mutton Korma'
            ]
        },
        Saturday: {
            Breakfast: [
                'Omelette',
                'Pav Bhaji',
                'Masala Dosa with Sambar and Chutney',
                'Tea',
                'Coffee'
            ],
            Lunch: [
                'Vegetable Biryani',
                'Roti',
                'Paneer Butter Masala',
                'Chicken Curry'
            ],
            Dinner: ['Rice', 'Roti', 'Aloo Gobi', 'Paneer Tikka', 'Fish Fry']
        },
        Sunday: {
            Breakfast: [
                'Boiled Eggs',
                'Chole Bhature',
                'Upma',
                'Tea',
                'Coffee'
            ],
            Lunch: [
                'Hyderabadi Biryani',
                'Roti',
                'Paneer Butter Masala',
                'Mutton Curry'
            ],
            Dinner: [
                'Rice',
                'Roti',
                'Pav Bhaji',
                'Bhindi Masala',
                'Chicken Kebab'
            ]
        }
    },
    Office_Hours:
        'Administrative Offices\n\nFinancial Aid Office (555-123-4567, Mr. Albert Matthew, University Campus Building A)\nMonday: 9:00 AM - 1:00 PM\nWednesday: 1:00 PM - 5:00 PM\nFriday: 9:00 AM - 1:00 PM\n\nLibrary (555-234-5678, University Campus Building B)\nMonday to Friday: 8:00 AM - 8:00 PM\nSaturday: 10:00 AM - 4:00 PM\n\nStudent Center (555-345-6789, Student Center Building)\nMonday to Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM\n\nMess/Cafeteria (555-456-7890, University Campus Building C)\nMonday to Sunday: 7:00 AM - 9:00 PM\n\nInternational Student Center (555-567-8901, University Campus Building B)\nTuesday: 10:00 AM - 4:00 PM\nThursday: 10:00 AM - 4:00 PM\n\nCourse and Department Specific Offices\n\nDepartment of Family Medicine (555-678-9012, University Campus Building A)\nMonday: 10:00 AM - 12:00 PM\nWednesday: 2:00 PM - 4:00 PM\nFriday: 10:00 AM - 12:00 PM\n\nDepartment of Nursing (555-789-0123, University Campus Building C)\nTuesday: 9:00 AM - 11:00 AM\nThursday: 1:00 PM - 3:00 PM\n\nDepartment of Pharmacy (555-890-1234, University Campus Building B)\nMonday: 2:00 PM - 4:00 PM\nWednesday: 9:00 AM - 11:00 AM\nFriday: 2:00 PM - 4:00 PM\n\nDepartment of Dentistry (555-901-2345, University Campus Building A)\nTuesday: 11:00 AM - 1:00 PM\nThursday: 2:00 PM - 4:00 PM\n\nDepartment of Public Health (555-012-3456, University Campus Building C)\nMonday: 1:00 PM - 3:00 PM\nWednesday: 10:00 AM - 12:00 PM\nFriday: 1:00 PM - 3:00 PM\n\nDepartment of Surgery (555-123-4567, University Campus Building B)\nMonday: 1:00 PM - 3:00 PM\nWednesday: 10:00 AM - 12:00 PM\nFriday: 1:00 PM - 3:00 PM\n\nDepartments of Gyneacology, Neurology, Cardiology and Orthopedics and other specializations (555-234-5678, University Campus Building A)\nMonday: 2:00 PM - 4:00 PM\nWednesday: 9:00 AM - 11:00 AM\nFriday: 2:00 PM - 4:00 PM\n\nOther Services\n\nCounseling Center (555-345-6789, University Campus Building C)\nMonday: 9:00 AM - 1:00 PM\nWednesday: 1:00 PM - 5:00 PM\nFriday: 9:00 AM - 1:00 PM\n\nCareer Services (555-456-7890, University Campus Building B)\nTuesday: 9:00 AM - 1:00 PM\nThursday: 1:00 PM - 5:00 PM\n\nFinancial Services (555-567-8901, University Campus Building A)\nMonday to Friday: 9:00 AM - 5:00 PM\n\nIT Help Desk (555-678-9012, University Campus Building C)\nMonday to Friday: 8:00 AM - 6:00 PM\n\nSecurity Office (555-789-0123, University Campus Building B)\nMonday to Sunday: 24 hours\n\nHealth Center and Recreation Facilities (555-890-1234, Recreation Center Building)\nMonday to Saturday: 9:00 AM - 6:00 PM\n\n Residential Services Center ((555-890-1235, Resident Building A): Monday to Saturday 9:00AM - 6:00PM\n\nPlease refer to the university website for more details on office hours and locations.',
    University_Policy:
        "University Policy Handbook\n\tGuest Policy on Campus\n\t\tRegistration: All guests must register at the campus security office upon arrival. They must present a valid ID and receive a guest pass.\n\t\tHours: Guests are allowed on campus between 8:00 AM and 10:00 PM. Overnight stays are not permitted without prior approval from the administration. You can visit the campus website and fill the guest form for overnight stay.\n\t\tConduct: Guests must adhere to all university policies and regulations. Hosts are responsible for the behavior of their guests.\n\t\tAccess: Certain areas, such as labs, libraries, and residence halls, may have restricted access for guests. Prior permission is required for entry.\n\tFinancial Aid Policy\n\t\tEligibility: Financial aid is available to all enrolled students who demonstrate financial need and meet academic requirements - Grade must be H for all subjects, GPA must be > 2.\n\t\tApplication Process: Students must complete the Free Application for Federal Student Aid (FAFSA) and any additional forms required by the university.\n\t\tDeadlines: Financial aid applications must be submitted by March 1st for the upcoming academic year.\n\t\tTypes of Aid: Aid includes grants, scholarships, work-study programs, and loans. Details on each type of aid are available on the university website.\n\t\tRenewal: Financial aid must be renewed annually. Students must maintain satisfactory academic progress to remain eligible.\n\tAdministrative Policy\n\t\tOffice Hours: Administrative offices are open from 9:00 AM to 5:00 PM, Monday through Friday. Some offices may have extended hours during peak times.\n\t\tAppointments: Students are encouraged to make appointments for meetings with administrative staff to ensure availability.\n\t\tCommunication: Official university communications will be sent via university email. Students are responsible for regularly checking their email.\n\t\tComplaints and Appeals: Students may file complaints or appeals regarding administrative decisions through the designated process outlined on the university website.\n\tAcademic Policy\nNew course catalog is being updated currently and will be available next week\n\t\tAttendance: Regular attendance is mandatory for all classes. Absences must be reported to the instructor and may require documentation.\n\t\tGrading System: The university uses a standard letter grading system. The grading scale and criteria are detailed in the course syllabus.\n\t\tExaminations: Midterm and final exams are scheduled by the registrar's office. Students must adhere to the exam schedule and policies.\n\t\tAcademic Integrity: All students must adhere to the university's academic integrity policy, which prohibits cheating, plagiarism, and other forms of academic dishonesty.\n\t\tExam Retaking: Make-up Examination facility is available to students who may have missed to attend one or more courses in a semester for valid reasons and given the 'I' grade. Students having the 'X' grade shall also be eligible to take advantage of this facility. For more information, please contact Administration Office. If you pass your makeup exam then you get a normal grade, similar to what you would get if you wrote the exam and passed the first time.\n\tResidence Life Policy\n\t\tHousing Assignments: Housing assignments are made based on availability and student preferences. Requests for changes must be submitted in writing.\n\t\tQuiet Hours: Quiet hours are from 10:00 PM to 8:00 AM daily. During finals week, 24-hour quiet hours are in effect.\n\t\tRoom Inspections: Residence hall rooms are subject to inspection for maintenance, health, and safety reasons. Notice will be given prior to inspections whenever possible.\n\t\tProhibited Items: Firearms, illegal drugs, and open flames (e.g., candles) are prohibited in residence halls. A full list of prohibited items is available in the residence life handbook.\n\n Tuition Fees: Due for upcoming semester is due one week before your semester starts.\n\n These policies are subject to change, and students are responsible for staying informed about current policies. Full details and updates are available on the university website.",
    Subject_Prerequisites:
        'Prerequisites Document\n\t1. Mitochondria: Structure & Function-PDH & TCA\n\tPrerequisites:\n\t\tEnergy Metabolism\n\t\tHistology (non matric)\n\t\tIntroduction to Anatomy (Revisited)\n\t\tMitochondria: ETC & OP\n\t2. Development of Embryo: Cell Growth\n\tPrerequisites:\n\t\tIntroduction to Anatomy (Revisited)\n\t\tHistology of the Heart and Vessels\n\t\tBehavioral Science\n\t\tClinical Diagnostic Imaging\n\t3. Behavioral and Community Medicine I\n\tPrerequisites:\n\t\tIntroduction to Clinical Medicine IV\n\t\tBehavioral Science\n\t\tPsychiatry (6W Core)\n\t\tBehavioral and Community Medicine II\n\t4. Clinical Diagnostic Imaging\n\tPrerequisites:\n\t\tHistology of the Heart and Vessels\n\t\tIntroduction to Anatomy (Revisited)\n\t\tMI & Heart Failure case\n\t\tRadiology (4w Elective)\n\t5. Advanced Cardiac Life Support\n\tPrerequisites:\n\t\tMI & Heart Failure case\n\t\tClinical Cardiology (4w Elective)\n\t\tEmergency Medicine (5w Elective)\n\t\tInternal Medicine (5w Elective)\n\t\tSurgery (8W core)',
    Specialization_Requirements:
        'Specialization Requirements Document\n\t1. Advanced General Health (AGH)\n\t\tRequired Courses:\n\t\t\tBSC (Basic Science Course)\n\t\t\tASHS (Advanced Science and Health Studies)\n\t\t\tDSP (Disease and Symptom Pathology)\n\t\t\tDCM (Diagnostics and Clinical Methods)\n\t\t\tDEE (Disease Epidemiology and Etiology)\n\t\tAdditional Requirements:\n\t\t\tCompletion of at least one elective in Emergency Medicine (EMTB) or Clinical Medicine (MBBS)\n\t\t\tMinimum GPA of 3.0 in core courses\n\n\t2. Behavioral Science and Health Studies (ASHS)\n\t\tRequired Courses:\n\t\t\tBSEP (Behavioral Science and Epidemiology Program)\n\t\t\tDSP (Disease and Symptom Pathology)\n\t\t\tDAH (Disease and Health)\n\t\t\tDAP (Disease and Psychology)\n\t\t\tDEE (Disease Epidemiology and Etiology)\n\t\tAdditional Requirements:\n\t\t\tParticipation in a research project related to Behavioral Science\n\t\t\tCompletion of a capstone project or thesis\n\t\t\tMinimum GPA of 3.2 in core courses\n\t3. Diagnostic and Clinical Methods (DCM)\n\t\tRequired Courses:\n\t\t\tDGD (Diagnostics and General Disease)\n\t\t\tDFD (Diagnostics and Functional Disease)\n\t\t\tDMLT (Diagnostic Medical Laboratory Techniques)\n\t\t\tDA (Diagnostic Applications)\n\t\t\tDNTT (Diagnostic Nuclear and Therapeutic Techniques)\n\t\tAdditional Requirements:\n\t\t\tPractical experience in a clinical setting (minimum 200 hours)\n\t\t\tCertification in Advanced Cardiac Life Support (ACLS)\n\t\t\tMinimum GPA of 3.5 in core courses\n\t4. Emergency Medical Training and Basic Life Support (EMTB)\n\t\tRequired Courses:\n\t\t\tBSC (Basic Science Course)\n\t\t\tDA (Diagnostic Applications)\n\t\t\tDCM (Diagnostics and Clinical Methods)\n\t\t\tDSP (Disease and Symptom Pathology)\n\t\t\tKMCIC (Key Medical and Clinical Interventions and Care)\n\t\tAdditional Requirements:\n\t\t\tCertification in Basic Life Support (BLS)\n\t\t\tCompletion of an internship in an emergency medical setting\n\t\t\tMinimum GPA of 3.0 in core courses\n\t5. Medical and Behavioral Science Program (MBBS)\n\t\tRequired Courses:\n\t\t\tBSC (Basic Science Course)\n\t\t\tASHS (Advanced Science and Health Studies)\n\t\t\tDGD (Diagnostics and General Disease)\n\t\t\tDAH (Disease and Health)\n\t\t\tDAP (Disease and Psychology)\n\t\t\tDEE (Disease Epidemiology and Etiology)\n\t\tAdditional Requirements:\n\t\t\tCompletion of a residency program in a chosen specialty\n\t\t\tParticipation in clinical rotations across various departments\n\t\t\tMinimum GPA of 3.5 in core courses\n\t\t\tSubmission of a final research project or thesis',
    University_Schedule:
        'Next Semester Start date is January 2, 2025.\n Exams for this semester are scheduled from 18 November 2024 to 7th December 2024.\n For any other details, contact the admiinistration office.\n\n Exam Dates per Subject:\n 1.7136 Psychiatry (6W Core): 18 November 2024, Campus Building A Room 112 10AM - 12PM\n 2.7150 Internal Medicine (12W Core): 19 November 2024, Campus Building B Room 201 2PM - 4PM\n 3.6326 Pre-Clinical Sciences II: 6th December 2024, Campus Building A Room 120 2PM - 4PM.\n\n New course catalog is being updated currently and will be available next week',
    Class_Schedule:
        'Monday:\n\tPediatrics (6W Core) - Subject Code: 7116 (University Campus Building B, Room 101): 8:00 AM - 10:00 AM\n\tObstetrics and Gynecology (6W Core) - Subject Code: 7126 (University Campus Building A, Room 100): 10:30 AM - 12:30 PM\n\tPsychiatry (6W Core) - Subject Code: 7136 (University Campus Building C, Room 102): 1:00 PM - 3:00 PM\n\tFamily Medicine (6W Core) - Subject Code: 7146 (University Campus Building A, Room 103): 3:30 PM - 5:30 PM\n\nTuesday:\n\tInternal Medicine (12W Core) - Subject Code: 7150 (University Campus Building C, Room 104): 9:00 AM - 11:00 AM\n\tSurgery (8W Core) - Subject Code: 7168 (University Campus Building B, Room 105): 11:30 AM - 1:30 PM\n\tGeneral Surgery (4W Elective) - Subject Code: 8345 (University Campus Building A, Room 111): 2:00 PM - 4:00 PM\n\tFamily Medicine I/Internal Medicine I - Subject Code: 9920 (University Campus Building C, Room 114): 4:30 PM - 6:30 PM\n\nWednesday:\n\tGlobal HT V - Subject Code: 6853 (University Campus Building A, Room 123): 8:30 AM - 10:30 AM\n\tBasic Science Integration Course - Subject Code: 6855 (University Campus Building B, Room 201): 11:00 AM - 1:00 PM\n\tGlobal HT I - Subject Code: 5101 (University Campus Building C, Room 202): 1:30 PM - 3:30 PM\n\tPre-Clinical Sciences I - Subject Code: 5116 (University Campus Building A, Room 205): 4:00 PM - 6:00 PM\n\nThursday:\n\tGlobal HT II - Subject Code: 5201 (University Campus Building B, Room 207): 9:00 AM - 11:00 AM\n\tPre-Clinical Sciences II - Subject Code: 5216 (University Campus Building C, Room 219): 11:30 AM - 1:30 PM\n\tGlobal HT III - Subject Code: 6301 (University Campus Building A, Room 220): 2:00 PM - 4:00 PM\n\tPre-Clinical Sciences II - Subject Code: 6326 (University Campus Building B, Room 219): 4:30 PM - 6:30 PM\n\nFriday:\n\tGlobal HT IV - Subject Code: 6401 (University Campus Building C, Room 202): 8:00 AM - 10:00 AM\n\tPre-Clinical Sciences II - Subject Code: 6426 (University Campus Building A, Room 219): 10:30 AM - 12:30 PM\n\tPediatrics (6W Core) - Subject Code: 7116 (University Campus Building B, Room 101): 1:00 PM - 3:00 PM\n\tObstetrics and Gynecology (6W Core) - Subject Code: 7126 (University Campus Building C, Room 100): 3:30 PM - 5:30 PM\n\nPlease note that some evening and weekend classes may also be available. Refer to the university website for the most up-to-date class schedule and locations.',
    Housing_Availability:
        'Currently, there are 10 rooms available in On-Campus Housing. For more details, please contact the Residential Services Center or call them at 555-890-1235.'
}
