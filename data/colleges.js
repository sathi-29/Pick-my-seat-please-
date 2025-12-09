// Mock data for colleges
const COLLEGES_DATA = [
    {
        id: 1,
        name: 'RV College of Engineering',
        location: 'Bengaluru, Karnataka',
        rating: 4.7,
        fees: '₹3.2L/year',
        cutoff: 'KCET: 2000-5000',
        placement: '92%',
        avgPackage: '₹8.5 LPA',
        highestPackage: '₹45 LPA',
        image: '🏛️',
        founded: '1963',
        type: 'Private Autonomous',
        ranking: '#15 Engineering College in India',
        campusSize: '52 acres',
        courses: ['B.Tech', 'M.Tech', 'MBA', 'MCA'],
        exams: ['KCET', 'COMEDK', 'Management Quota'],
        facilities: ['Hostels', 'Library', 'Sports Complex', 'Labs', 'Cafeteria'],
        placementCompanies: ['Infosys', 'TCS', 'Wipro', 'Accenture', 'Amazon'],
        totalSeats: 1800,
        seats: {
            management: 600,
            government: 1200,
            available: {
                management: 150,
                government: 400
            }
        },
        images: ['🏛️', '📚', '🔬'],
        coordinates: [12.9229, 77.4965],
        address: 'RV Vidyaniketan Post, 8th Mile, Mysore Road, Bengaluru',
        contact: '080-6717 8021',
        website: 'https://rvce.edu.in',
        accreditation: 'NAAC A++',
        reviews: [
            { id: 1, name: 'Rahul Sharma', rating: 5, date: '2024-01-15', comment: 'Excellent infrastructure and faculty' },
            { id: 2, name: 'Priya Patel', rating: 4, date: '2024-01-10', comment: 'Good placement records, but strict rules' },
            { id: 3, name: 'Amit Kumar', rating: 5, date: '2024-01-05', comment: 'Best decision of my life to join this college' }
        ],
        highlights: ['NAAC A++ Accredited', 'ISO Certified', 'NBA Accredited Programs', 'Industry Collaborations']
    },
    {
        id: 2,
        name: 'PES University',
        location: 'Bengaluru, Karnataka',
        rating: 4.6,
        fees: '₹4.5L/year',
        cutoff: 'PESSAT/KCET',
        placement: '95%',
        avgPackage: '₹9 LPA',
        highestPackage: '₹50 LPA',
        image: '🎓',
        founded: '1972',
        type: 'Private University',
        ranking: '#18 Engineering College in India',
        campusSize: '25 acres',
        courses: ['B.Tech', 'M.Tech', 'BBA', 'MBA'],
        exams: ['PESSAT', 'KCET', 'COMEDK'],
        coordinates: [12.9716, 77.5946],
        seats: {
            management: 500,
            government: 1000,
            available: {
                management: 100,
                government: 300
            }
        }
    },
    {
        id: 3,
        name: 'Christ University',
        location: 'Bengaluru, Karnataka',
        rating: 4.5,
        fees: '₹2.8L/year',
        cutoff: 'CUET/Christ Exam',
        placement: '88%',
        avgPackage: '₹7 LPA',
        highestPackage: '₹25 LPA',
        image: '⛪',
        founded: '1969',
        type: 'Deemed University',
        ranking: '#1 Private University in Karnataka',
        campusSize: '75 acres',
        courses: ['BA', 'B.Com', 'BBA', 'BCA', 'MBA'],
        exams: ['CUET', 'Christ University Entrance Test'],
        coordinates: [12.9279, 77.6271],
        seats: {
            management: 400,
            government: 800,
            available: {
                management: 80,
                government: 250
            }
        }
    },
    {
        id: 4,
        name: 'MS Ramaiah Institute of Technology',
        location: 'Bengaluru, Karnataka',
        rating: 4.4,
        fees: '₹3.5L/year',
        cutoff: 'KCET/COMEDK',
        placement: '90%',
        avgPackage: '₹8 LPA',
        highestPackage: '₹35 LPA',
        image: '🔬',
        founded: '1962',
        type: 'Private Autonomous',
        ranking: '#20 Engineering College in India',
        campusSize: '15 acres',
        courses: ['B.Tech', 'M.Tech', 'Pharmacy'],
        exams: ['KCET', 'COMEDK'],
        coordinates: [13.0319, 77.5628],
        seats: {
            management: 450,
            government: 900,
            available: {
                management: 120,
                government: 320
            }
        }
    },
    {
        id: 5,
        name: 'Jain University',
        location: 'Bengaluru, Karnataka',
        rating: 4.3,
        fees: '₹2.5L/year',
        cutoff: 'JET',
        placement: '85%',
        avgPackage: '₹6 LPA',
        highestPackage: '₹22 LPA',
        image: '📚',
        founded: '1990',
        type: 'Deemed University',
        ranking: '#25 Private University in India',
        campusSize: '100 acres',
        courses: ['B.Tech', 'BBA', 'BCA', 'MBA', 'Law'],
        exams: ['JET', 'Jain Entrance Test'],
        coordinates: [12.8710, 77.6625],
        seats: {
            management: 350,
            government: 700,
            available: {
                management: 90,
                government: 280
            }
        }
    },
    {
        id: 6,
        name: 'Dayananda Sagar College of Engineering',
        location: 'Bengaluru, Karnataka',
        rating: 4.2,
        fees: '₹2.2L/year',
        cutoff: 'KCET/Management',
        placement: '87%',
        avgPackage: '₹5.5 LPA',
        highestPackage: '₹30 LPA',
        image: '🏢',
        founded: '1979',
        type: 'Private Autonomous',
        ranking: '#30 Engineering College in India',
        campusSize: '30 acres',
        courses: ['B.Tech', 'M.Tech', 'MBA'],
        exams: ['KCET', 'COMEDK', 'Management Quota'],
        coordinates: [12.9010, 77.5665],
        seats: {
            management: 300,
            government: 600,
            available: {
                management: 70,
                government: 200
            }
        }
    }
];

// Export for use in components
if (typeof window !== 'undefined') {
    window.COLLEGES_DATA = COLLEGES_DATA;
}