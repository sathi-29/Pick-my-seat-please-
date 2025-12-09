// Mock data for tuition centers
const TUITIONS_DATA = [
    {
        id: 1,
        name: 'Brilliant Minds Academy',
        type: 'Offline',
        address: '123 MG Road, Bengaluru, Karnataka 560001',
        rating: 4.8,
        reviews: 245,
        fees: '₹15,000/month',
        contact: '+91 9876543210',
        email: 'contact@brilliantminds.com',
        subjects: ['JEE Main', 'JEE Advanced', 'KCET', 'NEET'],
        faculty: [
            { name: 'Dr. Rajesh Kumar', qualification: 'PhD IIT Delhi', experience: '15+ years' },
            { name: 'Ms. Priya Sharma', qualification: 'M.Tech IISc', experience: '10+ years' }
        ],
        facilities: ['Air Conditioned Classrooms', 'Library', 'Test Series', 'Doubt Sessions', 'Online Portal'],
        timing: 'Weekdays: 4 PM - 8 PM, Weekends: 9 AM - 6 PM',
        reviewsList: [
            { name: 'Aarav Patel', rating: 5, comment: 'Excellent teaching methodology', date: '2024-01-10' },
            { name: 'Sneha Reddy', rating: 4, comment: 'Good infrastructure but fees are high', date: '2024-01-05' },
            { name: 'Rohit Verma', rating: 5, comment: 'Best faculty for JEE preparation', date: '2024-01-01' }
        ],
        coordinates: [12.9716, 77.5946],
        distance: '2.5 km',
        established: '2010',
        studentsPlaced: '5000+',
        successRate: '92%'
    },
    {
        id: 2,
        name: 'Physics Wallah',
        type: 'Online',
        rating: 4.7,
        reviews: 15000,
        fees: '₹10,000/month',
        subjects: ['JEE', 'NEET', 'Foundation'],
        platform: 'PW App/Website',
        icon: 'fa-laptop'
    },
    {
        id: 3,
        name: 'Career Point',
        type: 'Offline',
        rating: 4.5,
        reviews: 890,
        fees: '₹12,000/month',
        subjects: ['KCET', 'COMEDK'],
        location: 'Koramangala, Bengaluru',
        distance: '4 km',
        icon: 'fa-chalkboard'
    },
    {
        id: 4,
        name: 'Unacademy',
        type: 'Online',
        rating: 4.6,
        reviews: 12000,
        fees: '₹8,000/month',
        subjects: ['All Engineering', 'Medical'],
        platform: 'Unacademy App',
        icon: 'fa-globe'
    },
    {
        id: 5,
        name: 'Sri Chaitanya',
        type: 'Offline',
        rating: 4.4,
        reviews: 3400,
        fees: '₹20,000/month',
        subjects: ['IIT-JEE', 'Medical'],
        location: 'Jayanagar, Bengaluru',
        distance: '5 km',
        icon: 'fa-school'
    },
    {
        id: 6,
        name: 'Byju\'s',
        type: 'Hybrid',
        rating: 4.3,
        reviews: 2100,
        fees: '₹18,000/month',
        subjects: ['Comprehensive'],
        location: 'Multiple Centers',
        icon: 'fa-graduation-cap'
    }
];

// Export for use in components
if (typeof window !== 'undefined') {
    window.TUITIONS_DATA = TUITIONS_DATA;
}