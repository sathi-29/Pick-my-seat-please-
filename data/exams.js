// Mock data for exams
const EXAMS_DATA = [
    {
        id: 1,
        name: 'KCET 2025',
        fullName: 'Karnataka Common Entrance Test 2025',
        date: 'April 18-19, 2025',
        registrationStart: 'Jan 15, 2025',
        registrationEnd: 'Feb 28, 2025',
        resultDate: 'June 2025',
        state: 'Karnataka',
        type: 'State Level',
        category: 'Engineering/Medical',
        eligibility: '12th Standard with PCM/PCB from recognized board',
        ageLimit: 'Minimum 17 years',
        applicationFee: 'General: ₹500, SC/ST: ₹250',
        examPattern: '180 Questions, 180 Minutes, Multiple Choice',
        subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Kannada Language Test'],
        website: 'https://cetonline.karnataka.gov.in',
        helpline: '080-23460460',
        colleges: ['All Government Engineering Colleges', 'All Government Medical Colleges', 'Some Private Colleges'],
        importantDates: [
            { event: 'Notification Release', date: 'Jan 10, 2025' },
            { event: 'Application Start', date: 'Jan 15, 2025' },
            { event: 'Application End', date: 'Feb 28, 2025' },
            { event: 'Admit Card', date: 'Apr 10, 2025' },
            { event: 'Exam Dates', date: 'Apr 18-19, 2025' },
            { event: 'Result Declaration', date: 'June 2025' }
        ],
        syllabus: 'Class 11 & 12 Physics, Chemistry, Mathematics/Biology',
        totalApplicants: '2,00,000+'
    },
    {
        id: 2,
        name: 'COMEDK UGET 2025',
        fullName: 'Consortium of Medical, Engineering and Dental Colleges of Karnataka',
        date: 'May 2025',
        registrationStart: 'Feb 1, 2025',
        registrationEnd: 'Apr 15, 2025',
        state: 'Karnataka',
        type: 'Private',
        category: 'Engineering',
        eligibility: '12th PCM with 45% aggregate',
        icon: 'fa-atom',
        examPattern: '180 Questions, 3 Hours',
        applicationFee: 'General: ₹1500'
    },
    {
        id: 3,
        name: 'DCET 2025',
        fullName: 'Diploma Common Entrance Test',
        date: 'June 2025',
        state: 'Karnataka',
        type: 'State',
        category: 'Diploma Lateral Entry',
        eligibility: 'Diploma holders',
        icon: 'fa-certificate'
    },
    {
        id: 4,
        name: 'KEAM 2025',
        fullName: 'Kerala Engineering Architecture Medical',
        date: 'April 2025',
        state: 'Kerala',
        type: 'State',
        category: 'Engineering/Medical',
        eligibility: '12th PCM/PCB',
        icon: 'fa-stethoscope'
    },
    {
        id: 5,
        name: 'MHT CET 2025',
        fullName: 'Maharashtra Common Entrance Test',
        date: 'May 2025',
        state: 'Maharashtra',
        type: 'State',
        category: 'Engineering',
        eligibility: '12th PCM',
        icon: 'fa-building'
    },
    {
        id: 6,
        name: 'JEE Main 2025',
        date: 'Jan 22-31, 2025',
        state: 'National',
        type: 'National',
        category: 'Engineering',
        eligibility: '12th PCM',
        icon: 'fa-rocket'
    },
    {
        id: 7,
        name: 'NEET UG 2025',
        date: 'May 5, 2025',
        state: 'National',
        type: 'National',
        category: 'Medical',
        eligibility: '12th PCB',
        icon: 'fa-heart-pulse'
    }
];

const EXAM_STATES = ['All', 'Karnataka', 'Maharashtra', 'Kerala', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'West Bengal', 'National'];

// Export for use in components
if (typeof window !== 'undefined') {
    window.EXAMS_DATA = EXAMS_DATA;
    window.EXAM_STATES = EXAM_STATES;
}