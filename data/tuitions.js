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
    },
    {
        id: 16,
        name: 'Mr. Deepak Mishra',
        subject: 'Mathematics',
        experience: '8 Years',
        rating: 4.6,
        students: 850,
        fee: '₹600/hour',
        location: 'Mysore'
    },
    {
        id: 17,
        name: 'Ms. Ananya Das',
        subject: 'Physics',
        experience: '7 Years',
        rating: 4.5,
        students: 700,
        fee: '₹550/hour',
        location: 'Hubli'
    },
    {
        id: 18,
        name: 'Dr. Karthik Reddy',
        subject: 'Chemistry',
        experience: '12 Years',
        rating: 4.7,
        students: 1100,
        fee: '₹720/hour',
        location: 'Mangalore'
    },
    {
        id: 19,
        name: 'Prof. Sneha Nair',
        subject: 'Biology',
        experience: '9 Years',
        rating: 4.6,
        students: 900,
        fee: '₹630/hour',
        location: 'Belgaum'
    },
    {
        id: 20,
        name: 'Mr. Rohan Shetty',
        subject: 'Computer Science',
        experience: '5 Years',
        rating: 4.4,
        students: 600,
        fee: '₹680/hour',
        location: 'Davanagere'
    },
    {
        id: 21,
        name: 'Ms. Shalini Kapoor',
        subject: 'English Literature',
        experience: '10 Years',
        rating: 4.7,
        students: 950,
        fee: '₹580/hour',
        location: 'Bellary'
    },
    {
        id: 22,
        name: 'Dr. Arun Deshpande',
        subject: 'Accountancy',
        experience: '14 Years',
        rating: 4.8,
        students: 1200,
        fee: '₹620/hour',
        location: 'Gulbarga'
    },
    {
        id: 23,
        name: 'Prof. Meenakshi Iyer',
        subject: 'Economics',
        experience: '11 Years',
        rating: 4.6,
        students: 850,
        fee: '₹590/hour',
        location: 'Shimoga'
    },
    {
        id: 24,
        name: 'Mr. Vijay Kumar',
        subject: 'Statistics',
        experience: '8 Years',
        rating: 4.5,
        students: 750,
        fee: '₹610/hour',
        location: 'Bidar'
    },
    {
        id: 25,
        name: 'Ms. Pooja Sharma',
        subject: 'Commerce',
        experience: '6 Years',
        rating: 4.4,
        students: 650,
        fee: '₹520/hour',
        location: 'Hospet'
    },
    {
        id: 26,
        name: 'Dr. Sameer Ahmed',
        subject: 'Programming',
        experience: '9 Years',
        rating: 4.7,
        students: 880,
        fee: '₹780/hour',
        location: 'Raichur'
    },
    {
        id: 27,
        name: 'Prof. Nandini Rao',
        subject: 'Reasoning',
        experience: '7 Years',
        rating: 4.5,
        students: 720,
        fee: '₹540/hour',
        location: 'Gadag'
    },
    {
        id: 28,
        name: 'Mr. Karan Singh',
        subject: 'GK & Current Affairs',
        experience: '8 Years',
        rating: 4.6,
        students: 680,
        fee: '₹480/hour',
        location: 'Bagalkot'
    },
    {
        id: 29,
        name: 'Ms. Deepa Patel',
        subject: 'Quantitative Aptitude',
        experience: '10 Years',
        rating: 4.7,
        students: 920,
        fee: '₹680/hour',
        location: 'Bijapur'
    },
    {
        id: 30,
        name: 'Dr. Ramesh Joshi',
        subject: 'Verbal Ability',
        experience: '12 Years',
        rating: 4.8,
        students: 1050,
        fee: '₹590/hour',
        location: 'Tumkur'
    },
    {
        id: 31,
        name: 'Mr. Akash Malhotra',
        subject: 'Mathematics',
        experience: '5 Years',
        rating: 4.3,
        students: 550,
        fee: '₹520/hour',
        location: 'Kolar'
    },
    {
        id: 32,
        name: 'Ms. Tanvi Reddy',
        subject: 'Physics',
        experience: '6 Years',
        rating: 4.4,
        students: 620,
        fee: '₹530/hour',
        location: 'Chitradurga'
    },
    {
        id: 33,
        name: 'Prof. Harsha Kumar',
        subject: 'Chemistry',
        experience: '9 Years',
        rating: 4.6,
        students: 780,
        fee: '₹640/hour',
        location: 'Hassan'
    },
    {
        id: 34,
        name: 'Dr. Lakshmi Nair',
        subject: 'Biology',
        experience: '11 Years',
        rating: 4.7,
        students: 850,
        fee: '₹610/hour',
        location: 'Mandya'
    },
    {
        id: 35,
        name: 'Mr. Surya Prakash',
        subject: 'Computer Science',
        experience: '4 Years',
        rating: 4.2,
        students: 480,
        fee: '₹620/hour',
        location: 'Chikmagalur'
    },
    {
        id: 36,
        name: 'Ms. Anjali Verma',
        subject: 'English Grammar',
        experience: '8 Years',
        rating: 4.5,
        students: 710,
        fee: '₹540/hour',
        location: 'Kodagu'
    },
    {
        id: 37,
        name: 'Dr. Prakash Rao',
        subject: 'Accountancy',
        experience: '13 Years',
        rating: 4.8,
        students: 980,
        fee: '₹590/hour',
        location: 'Dharwad'
    },
    {
        id: 38,
        name: 'Prof. Sunita Sharma',
        subject: 'Economics',
        experience: '10 Years',
        rating: 4.6,
        students: 830,
        fee: '₹570/hour',
        location: 'Udupi'
    },
    {
        id: 39,
        name: 'Mr. Rajeev Nair',
        subject: 'Statistics',
        experience: '7 Years',
        rating: 4.5,
        students: 690,
        fee: '₹580/hour',
        location: 'Karwar'
    },
    {
        id: 40,
        name: 'Ms. Meera Desai',
        subject: 'Commerce',
        experience: '5 Years',
        rating: 4.3,
        students: 580,
        fee: '₹500/hour',
        location: 'Sirsi'
    },
    {
        id: 41,
        name: 'Dr. Ashok Kumar',
        subject: 'Python Programming',
        experience: '8 Years',
        rating: 4.7,
        students: 820,
        fee: '₹750/hour',
        location: 'Bengaluru'
    },
    {
        id: 42,
        name: 'Prof. Divya Sharma',
        subject: 'Data Science',
        experience: '6 Years',
        rating: 4.6,
        students: 730,
        fee: '₹820/hour',
        location: 'Bengaluru'
    },
    {
        id: 43,
        name: 'Mr. Vikas Patel',
        subject: 'Web Development',
        experience: '7 Years',
        rating: 4.5,
        students: 680,
        fee: '₹720/hour',
        location: 'Mysore'
    },
    {
        id: 44,
        name: 'Ms. Priyanka Singh',
        subject: 'Machine Learning',
        experience: '5 Years',
        rating: 4.4,
        students: 590,
        fee: '₹780/hour',
        location: 'Hubli'
    },
    {
        id: 45,
        name: 'Dr. Ravi Shankar',
        subject: 'AI & Robotics',
        experience: '10 Years',
        rating: 4.8,
        students: 950,
        fee: '₹850/hour',
        location: 'Mangalore'
    },
    {
        id: 46,
        name: 'Prof. Anil Kumar',
        subject: 'Cloud Computing',
        experience: '8 Years',
        rating: 4.6,
        students: 770,
        fee: '₹740/hour',
        location: 'Belgaum'
    },
    {
        id: 47,
        name: 'Ms. Swati Reddy',
        subject: 'Cybersecurity',
        experience: '6 Years',
        rating: 4.5,
        students: 650,
        fee: '₹760/hour',
        location: 'Davanagere'
    },
    {
        id: 48,
        name: 'Mr. Mohan Das',
        subject: 'Mobile App Development',
        experience: '7 Years',
        rating: 4.6,
        students: 710,
        fee: '₹730/hour',
        location: 'Bellary'
    },
    {
        id: 49,
        name: 'Dr. Shweta Nair',
        subject: 'Blockchain Technology',
        experience: '5 Years',
        rating: 4.4,
        students: 580,
        fee: '₹790/hour',
        location: 'Gulbarga'
    },
    {
        id: 50,
        name: 'Prof. Rajat Verma',
        subject: 'DevOps',
        experience: '6 Years',
        rating: 4.5,
        students: 620,
        fee: '₹710/hour',
        location: 'Shimoga'
    }
];

// Export for use in components
if (typeof window !== 'undefined') {
    window.TUITIONS_DATA = TUITIONS_DATA;
}