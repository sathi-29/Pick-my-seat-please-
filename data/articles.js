// Mock data for articles
const ARTICLES_DATA = [
    {
        id: 1,
        title: 'KCET 2025: Complete Guide to Registration Process',
        category: 'Exam Guide',
        date: 'Jan 15, 2025',
        readTime: '5 min read',
        excerpt: 'Step-by-step guide for KCET 2025 registration with important dates and documents required.',
        content: `The Karnataka Common Entrance Test (KCET) 2025 registration process is expected to begin in January 2025. Here's a complete guide:
        
        1. Visit the official website: cetonline.karnataka.gov.in
        2. Click on "New Registration"
        3. Fill in personal details
        4. Upload required documents
        5. Pay the application fee
        6. Submit and print confirmation
        
        Required documents: 10th and 12th marks cards, study certificate, caste certificate (if applicable), passport photo, signature.`,
        author: 'Exam Expert',
        tags: ['KCET', 'Registration', '2025', 'Karnataka']
    },
    {
        id: 2,
        title: 'Top 10 Engineering Colleges in Karnataka 2024',
        category: 'College Rankings',
        date: 'Jan 12, 2025',
        readTime: '8 min read',
        excerpt: 'Comprehensive ranking of engineering colleges in Karnataka based on placement, infrastructure, and faculty.',
        author: 'College Analyst',
        tags: ['Engineering', 'Rankings', 'Karnataka', 'Colleges']
    },
    {
        id: 3,
        title: 'JEE Main 2025: Preparation Strategy for Last 3 Months',
        category: 'Preparation Tips',
        date: 'Jan 10, 2025',
        readTime: '6 min read',
        excerpt: 'Expert tips and study plan to maximize your score in the last 3 months before JEE Main 2025.',
        author: 'JEE Mentor',
        tags: ['JEE', 'Preparation', 'Study Plan', 'Tips']
    },
    {
        id: 4,
        title: 'NEET vs AIIMS: Which is Better for Medical Aspirants?',
        category: 'Career Guidance',
        date: 'Jan 8, 2025',
        readTime: '7 min read',
        excerpt: 'Comparative analysis of NEET and AIIMS exams to help medical students make informed decisions.',
        author: 'Medical Counselor',
        tags: ['NEET', 'AIIMS', 'Medical', 'Career']
    },
    {
        id: 5,
        title: 'Management Quota Admissions: Complete Process Explained',
        category: 'Admission Process',
        date: 'Jan 5, 2025',
        readTime: '4 min read',
        excerpt: 'Everything you need to know about management quota admissions in private colleges.',
        author: 'Admission Expert',
        tags: ['Management Quota', 'Admissions', 'Private Colleges']
    },
    {
        id: 6,
        title: 'Digital Learning: Best Online Platforms for JEE Preparation',
        category: 'E-Learning',
        date: 'Jan 3, 2025',
        readTime: '5 min read',
        excerpt: 'Review of top online platforms offering quality JEE preparation courses and materials.',
        author: 'EdTech Reviewer',
        tags: ['Online Learning', 'JEE', 'EdTech', 'Platforms']
    },
    {
        id: 7,
        title: 'How to Choose Between Engineering and Medical Career',
        category: 'Career Guidance',
        date: 'Dec 28, 2024',
        readTime: '6 min read',
        excerpt: 'A comprehensive guide to help students decide between engineering and medical careers.',
        author: 'Career Counselor',
        tags: ['Engineering', 'Medical', 'Career Choice', 'Guidance']
    },
    {
        id: 8,
        title: 'Scholarship Opportunities for Engineering Students 2025',
        category: 'Scholarships',
        date: 'Dec 25, 2024',
        readTime: '5 min read',
        excerpt: 'List of available scholarships for engineering students in 2025 with application details.',
        author: 'Scholarship Guide',
        tags: ['Scholarships', 'Engineering', 'Financial Aid']
    }
];

// Export for use in components
if (typeof window !== 'undefined') {
    window.ARTICLES_DATA = ARTICLES_DATA;
}