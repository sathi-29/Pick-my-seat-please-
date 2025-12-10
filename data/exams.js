const EXAMS_DATA = [
    {
        id: 1,
        name: 'KCET 2025',
        type: 'State Level',
        state: 'Karnataka',
        examDate: 'April 18-19, 2025',
        registrationEnds: 'Feb 28, 2025',
        category: 'Engineering/Medical',
        website: 'https://cetonline.karnataka.gov.in',
        eligibility: '12th pass with Physics, Chemistry, Mathematics/Biology',
        syllabus: 'Physics, Chemistry, Mathematics/Biology',
        applicationFee: '₹500 (General), ₹250 (SC/ST)',
        colleges: 200
    },
    {
        id: 2,
        name: 'COMEDK UGET 2025',
        type: 'Private',
        state: 'Karnataka',
        examDate: 'May 2025',
        registrationEnds: 'Apr 15, 2025',
        category: 'Engineering',
        website: 'https://comedk.org',
        colleges: 150
    },
    {
        id: 3,
        name: 'DCET 2025',
        type: 'State',
        state: 'Karnataka',
        examDate: 'June 2025',
        registrationEnds: 'May 2025',
        category: 'Diploma Lateral Entry',
        colleges: 100
    },
    {
        id: 4,
        name: 'JEE Mains 2025',
        type: 'National',
        state: 'All India',
        examDate: 'January-April 2025',
        registrationEnds: 'Dec 2024',
        category: 'Engineering',
        colleges: 500
    },
    {
        id: 5,
        name: 'NEET 2025',
        type: 'National',
        state: 'All India',
        examDate: 'May 2025',
        registrationEnds: 'Mar 2025',
        category: 'Medical',
        colleges: 300
    }
];

if (typeof window !== 'undefined') {
    window.EXAMS_DATA = EXAMS_DATA;
}