// Mock data for courses
const COURSES_DATA = [
    {
        id: 1,
        name: 'B.Tech Computer Science & Engineering',
        duration: '4 Years (8 Semesters)',
        eligibility: '12th Standard with Physics, Chemistry, Mathematics (PCM) and minimum 45% aggregate',
        entranceExams: ['JEE Main', 'KCET', 'COMEDK', 'State CETs', 'Institute Level Exams'],
        fees: '₹3,00,000 - ₹5,00,000 per year',
        avgSalary: '₹6,00,000 - ₹15,00,000 per annum',
        topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Infosys', 'TCS', 'Wipro', 'Accenture'],
        syllabus: [
            'Semester 1-2: Basic Sciences & Engineering',
            'Semester 3-4: Core Programming & Algorithms',
            'Semester 5-6: Advanced Computing & Specialization',
            'Semester 7-8: Project Work & Internship'
        ],
        specializations: ['AI & ML', 'Data Science', 'Cyber Security', 'Cloud Computing', 'IoT', 'Blockchain'],
        careerPaths: [
            'Software Development Engineer',
            'Data Scientist',
            'Machine Learning Engineer',
            'Full Stack Developer',
            'DevOps Engineer',
            'Cloud Architect'
        ],
        demand: 'Very High',
        growth: '25% annual growth in job opportunities',
        image: '💻'
    },
    {
        id: 2,
        name: 'MBBS',
        duration: '5.5 Years (4.5 Years + 1 Year Internship)',
        eligibility: '12th PCB with 50% marks, NEET qualified',
        entranceExams: ['NEET UG'],
        fees: '₹50,000 - ₹15,00,000 per year',
        avgSalary: '₹8,00,000 - ₹20,00,000 per annum',
        topRecruiters: ['Government Hospitals', 'Private Hospitals', 'Research Institutes', 'Armed Forces'],
        syllabus: [
            'Phase 1 (Pre-Clinical): Anatomy, Physiology, Biochemistry',
            'Phase 2 (Para-Clinical): Pathology, Microbiology, Pharmacology',
            'Phase 3 (Clinical): Medicine, Surgery, OBG, Pediatrics',
            'Phase 4: Internship'
        ],
        specializations: ['MD', 'MS', 'Diploma Courses'],
        careerPaths: ['General Physician', 'Surgeon', 'Specialist Doctor', 'Medical Researcher', 'Medical Officer'],
        demand: 'Very High',
        growth: '15% annual growth',
        image: '🏥'
    },
    {
        id: 3,
        name: 'MBA',
        duration: '2 Years (4 Semesters)',
        eligibility: 'Bachelor\'s degree with 50% marks, CAT/MAT/XAT/CMAT qualified',
        entranceExams: ['CAT', 'MAT', 'XAT', 'CMAT', 'GMAT'],
        fees: '₹4,00,000 - ₹10,00,000 per year',
        avgSalary: '₹7,00,000 - ₹18,00,000 per annum',
        topRecruiters: ['Consulting Firms', 'Banks', 'IT Companies', 'FMCG', 'Manufacturing'],
        syllabus: [
            'Year 1: Core Management Subjects',
            'Year 2: Specialization Electives',
            'Summer Internship',
            'Final Project'
        ],
        specializations: ['Marketing', 'Finance', 'HR', 'Operations', 'IT', 'International Business'],
        careerPaths: ['Business Analyst', 'Marketing Manager', 'Financial Analyst', 'HR Manager', 'Operations Manager'],
        demand: 'High',
        growth: '20% annual growth',
        image: '📊'
    },
    {
        id: 4,
        name: 'BBA',
        duration: '3 Years (6 Semesters)',
        eligibility: '12th any stream with 45% marks',
        entranceExams: ['Institute Level', 'CUET', 'SET'],
        fees: '₹1,00,000 - ₹3,00,000 per year',
        avgSalary: '₹3,00,000 - ₹8,00,000 per annum',
        topRecruiters: ['Startups', 'Banks', 'Retail Companies', 'Consulting Firms'],
        syllabus: [
            'Principles of Management',
            'Business Economics',
            'Accounting',
            'Marketing Management',
            'Human Resource Management',
            'Business Law'
        ],
        specializations: ['Finance', 'Marketing', 'HR', 'Entrepreneurship'],
        careerPaths: ['Business Analyst', 'Marketing Executive', 'HR Executive', 'Banking Officer'],
        demand: 'High',
        growth: '18% annual growth',
        image: '📈'
    },
    {
        id: 5,
        name: 'B.Sc Nursing',
        duration: '4 Years',
        eligibility: '12th PCB with 45% marks',
        entranceExams: ['State Level', 'Institute Level'],
        fees: '₹2,00,000 - ₹4,00,000 per year',
        avgSalary: '₹4,00,000 - ₹10,00,000 per annum',
        topRecruiters: ['Hospitals', 'Nursing Homes', 'Healthcare Centers', 'Schools'],
        syllabus: [
            'Anatomy & Physiology',
            'Nutrition & Biochemistry',
            'Nursing Foundations',
            'Medical Surgical Nursing',
            'Community Health Nursing',
            'Midwifery'
        ],
        specializations: ['Critical Care', 'Pediatric', 'Psychiatric', 'Community Health'],
        careerPaths: ['Staff Nurse', 'Nursing Supervisor', 'Nursing Educator', 'Public Health Nurse'],
        demand: 'High',
        growth: '22% annual growth',
        image: '👩‍⚕️'
    },
    {
        id: 6,
        name: 'B.Arch',
        duration: '5 Years',
        eligibility: '12th PCM with 50% marks + NATA qualified',
        entranceExams: ['NATA', 'JEE Paper 2'],
        fees: '₹3,00,000 - ₹6,00,000 per year',
        avgSalary: '₹5,00,000 - ₹12,00,000 per annum',
        topRecruiters: ['Architecture Firms', 'Construction Companies', 'Government Departments', 'Real Estate'],
        syllabus: [
            'Architectural Design',
            'Building Construction',
            'History of Architecture',
            'Structural Design',
            'Urban Planning',
            'Interior Design'
        ],
        specializations: ['Urban Design', 'Landscape Architecture', 'Interior Design', 'Sustainable Architecture'],
        careerPaths: ['Architect', 'Urban Planner', 'Interior Designer', 'Project Manager'],
        demand: 'Medium',
        growth: '12% annual growth',
        image: '🏗️'
    }
];

// Export for use in components
if (typeof window !== 'undefined') {
    window.COURSES_DATA = COURSES_DATA;
}