const TUITIONS_DATA = [
    {
        id: 1,
        name: 'Dr. Rajesh Kumar',
        subject: 'Mathematics',
        experience: '15 Years',
        rating: 4.9,
        students: 1200,
        fee: '₹800/hour',
        qualification: 'PhD in Mathematics, IIT Delhi',
        specialization: ['JEE Mains', 'JEE Advanced', 'Board Exams'],
        availability: 'Mon-Sat',
        mode: ['Online', 'Offline'],
        location: 'Bengaluru',
        demo: true
    },
    {
        id: 2,
        name: 'Prof. Anjali Sharma',
        subject: 'Physics',
        experience: '12 Years',
        rating: 4.8,
        students: 950,
        fee: '₹750/hour',
        qualification: 'M.Tech, IISc Bangalore',
        specialization: ['NEET', 'JEE', 'KCET'],
        location: 'Bengaluru'
    },
    {
        id: 3,
        name: 'Mr. Suresh Patel',
        subject: 'Chemistry',
        experience: '10 Years',
        rating: 4.7,
        students: 800,
        fee: '₹700/hour',
        location: 'Bengaluru'
    },
    {
        id: 4,
        name: 'Ms. Priya Reddy',
        subject: 'Biology',
        experience: '8 Years',
        rating: 4.6,
        students: 700,
        fee: '₹650/hour',
        location: 'Bengaluru'
    },
    {
        id: 5,
        name: 'Prof. Kumar Swamy',
        subject: 'Computer Science',
        experience: '18 Years',
        rating: 4.9,
        students: 1500,
        fee: '₹900/hour',
        location: 'Bengaluru'
    },
    {
        id: 6,
        name: 'Dr. Meena Singh',
        subject: 'English',
        experience: '14 Years',
        rating: 4.8,
        students: 1100,
        fee: '₹600/hour',
        location: 'Bengaluru'
    },
    {
        id: 7,
        name: 'Mr. Ravi Verma',
        subject: 'Accountancy',
        experience: '9 Years',
        rating: 4.7,
        students: 850,
        fee: '₹550/hour',
        location: 'Bengaluru'
    },
    {
        id: 8,
        name: 'Ms. Sunita Rao',
        subject: 'Economics',
        experience: '11 Years',
        rating: 4.6,
        students: 900,
        fee: '₹600/hour',
        location: 'Bengaluru'
    },
    {
        id: 9,
        name: 'Prof. Vikram Joshi',
        subject: 'Statistics',
        experience: '16 Years',
        rating: 4.9,
        students: 1200,
        fee: '₹850/hour',
        location: 'Bengaluru'
    },
    {
        id: 10,
        name: 'Ms. Neha Gupta',
        subject: 'Commerce',
        experience: '7 Years',
        rating: 4.5,
        students: 600,
        fee: '₹500/hour',
        location: 'Bengaluru'
    },
    {
        id: 11,
        name: 'Mr. Arun Kumar',
        subject: 'Programming',
        experience: '6 Years',
        rating: 4.8,
        students: 950,
        fee: '₹800/hour',
        location: 'Bengaluru'
    },
    {
        id: 12,
        name: 'Dr. Sanjay Mehta',
        subject: 'Reasoning',
        experience: '13 Years',
        rating: 4.7,
        students: 1000,
        fee: '₹700/hour',
        location: 'Bengaluru'
    },
    {
        id: 13,
        name: 'Ms. Radhika Iyer',
        subject: 'GK & Current Affairs',
        experience: '10 Years',
        rating: 4.6,
        students: 750,
        fee: '₹450/hour',
        location: 'Bengaluru'
    },
    {
        id: 14,
        name: 'Prof. Manoj Tiwari',
        subject: 'Quantitative Aptitude',
        experience: '15 Years',
        rating: 4.9,
        students: 1300,
        fee: '₹750/hour',
        location: 'Bengaluru'
    },
    {
        id: 15,
        name: 'Ms. Kavita Sharma',
        subject: 'Verbal Ability',
        experience: '8 Years',
        rating: 4.7,
        students: 800,
        fee: '₹550/hour',
        location: 'Bengaluru'
    }
];

// Export for use in components
if (typeof window !== 'undefined') {
    window.TUITIONS_DATA = TUITIONS_DATA;
}