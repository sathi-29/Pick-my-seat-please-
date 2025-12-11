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
    },
    {
        id: 6,
        name: 'CLAT 2025',
        type: 'National',
        state: 'All India',
        examDate: 'December 2024',
        registrationEnds: 'November 2024',
        category: 'Law',
        website: 'https://consortiumofnlus.ac.in',
        colleges: 23
    },
    {
        id: 7,
        name: 'NATA 2025',
        type: 'National',
        state: 'All India',
        examDate: 'April-July 2025',
        registrationEnds: 'March 2025',
        category: 'Architecture',
        website: 'https://nata.in',
        colleges: 150
    },
    {
        id: 8,
        name: 'AIIMS MBBS 2025',
        type: 'National',
        state: 'All India',
        examDate: 'May 2025',
        registrationEnds: 'March 2025',
        category: 'Medical',
        colleges: 15
    },
    {
        id: 9,
        name: 'BITSAT 2025',
        type: 'University',
        state: 'All India',
        examDate: 'May-June 2025',
        registrationEnds: 'April 2025',
        category: 'Engineering',
        colleges: 3
    },
    {
        id: 10,
        name: 'VITEEE 2025',
        type: 'University',
        state: 'All India',
        examDate: 'April 2025',
        registrationEnds: 'March 2025',
        category: 'Engineering',
        colleges: 4
    },
    {
        id: 11,
        name: 'SRMJEEE 2025',
        type: 'University',
        state: 'All India',
        examDate: 'April 2025',
        registrationEnds: 'March 2025',
        category: 'Engineering',
        colleges: 5
    },
    {
        id: 12,
        name: 'KIITEE 2025',
        type: 'University',
        state: 'All India',
        examDate: 'April 2025',
        registrationEnds: 'March 2025',
        category: 'Engineering',
        colleges: 1
    },
    {
        id: 13,
        name: 'MU OET 2025',
        type: 'University',
        state: 'All India',
        examDate: 'April 2025',
        registrationEnds: 'March 2025',
        category: 'Engineering/Medical',
        colleges: 1
    },
    {
        id: 14,
        name: 'IPU CET 2025',
        type: 'State',
        state: 'Delhi',
        examDate: 'May 2025',
        registrationEnds: 'April 2025',
        category: 'Engineering/Medical',
        colleges: 15
    },
    {
        id: 15,
        name: 'MH CET 2025',
        type: 'State',
        state: 'Maharashtra',
        examDate: 'May 2025',
        registrationEnds: 'April 2025',
        category: 'Engineering/Medical',
        colleges: 200
    },
    {
        id: 16,
        name: 'TNEA 2025',
        type: 'State',
        state: 'Tamil Nadu',
        examDate: 'June 2025',
        registrationEnds: 'May 2025',
        category: 'Engineering',
        colleges: 180
    },
    {
        id: 17,
        name: 'AP EAMCET 2025',
        type: 'State',
        state: 'Andhra Pradesh',
        examDate: 'May 2025',
        registrationEnds: 'April 2025',
        category: 'Engineering/Medical',
        colleges: 150
    },
    {
        id: 18,
        name: 'TS EAMCET 2025',
        type: 'State',
        state: 'Telangana',
        examDate: 'May 2025',
        registrationEnds: 'April 2025',
        category: 'Engineering/Medical',
        colleges: 120
    },
    {
        id: 19,
        name: 'KEAM 2025',
        type: 'State',
        state: 'Kerala',
        examDate: 'June 2025',
        registrationEnds: 'May 2025',
        category: 'Engineering/Medical',
        colleges: 100
    },
    {
        id: 20,
        name: 'WBJEE 2025',
        type: 'State',
        state: 'West Bengal',
        examDate: 'April 2025',
        registrationEnds: 'March 2025',
        category: 'Engineering',
        colleges: 80
    },
    {
        id: 21,
        name: 'GUJCET 2025',
        type: 'State',
        state: 'Gujarat',
        examDate: 'April 2025',
        registrationEnds: 'March 2025',
        category: 'Engineering/Medical',
        colleges: 70
    },
    {
        id: 22,
        name: 'UPSEE 2025',
        type: 'State',
        state: 'Uttar Pradesh',
        examDate: 'June 2025',
        registrationEnds: 'May 2025',
        category: 'Engineering',
        colleges: 90
    },
    {
        id: 23,
        name: 'MHT CET 2025',
        type: 'State',
        state: 'Maharashtra',
        examDate: 'May 2025',
        registrationEnds: 'April 2025',
        category: 'Engineering',
        colleges: 120
    },
    {
        id: 24,
        name: 'CET Delhi 2025',
        type: 'State',
        state: 'Delhi',
        examDate: 'June 2025',
        registrationEnds: 'May 2025',
        category: 'Engineering',
        colleges: 15
    },
    {
        id: 25,
        name: 'Punjab CET 2025',
        type: 'State',
        state: 'Punjab',
        examDate: 'June 2025',
        registrationEnds: 'May 2025',
        category: 'Engineering',
        colleges: 25
    }
];

if (typeof window !== 'undefined') {
    window.EXAMS_DATA = EXAMS_DATA;
}