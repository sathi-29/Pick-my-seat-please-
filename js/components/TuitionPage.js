const { useState, useEffect } = React;

const TuitionPage = ({ setCurrentPage, setSelectedTuitionId }) => {
    const [tuitions, setTuitions] = useState([]);
    const [filters, setFilters] = useState({
        subject: '',
        location: '',
        experience: ''
    });
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const loadTuitions = () => {
            setLoading(true);
            try {
                if (window.TUITIONS_DATA && window.TUITIONS_DATA.length > 0) {
                    const tuitionsWithCourses = window.TUITIONS_DATA.map(tuition => ({
                        ...tuition,
                        coursesOffered: generateCoursesForSubject(tuition.subject)
                    }));
                    setTuitions(tuitionsWithCourses);
                } else {
                    setTuitions([]);
                }
            } catch (error) {
                console.error("Error loading tuitions:", error);
                setTuitions([]);
            }
            setLoading(false);
        };
        
        loadTuitions();
    }, []);
    
    const generateCoursesForSubject = (subject) => {
        const courseMap = {
            'Mathematics': ['JEE Mains', 'JEE Advanced', 'KCET', 'NEET Maths', 'Board Exams'],
            'Physics': ['JEE Mains', 'JEE Advanced', 'KCET Physics', 'NEET Physics'],
            'Chemistry': ['JEE Mains', 'JEE Advanced', 'KCET Chemistry', 'NEET Chemistry'],
            'Biology': ['NEET Biology', 'AIIMS Entrance', 'KCET Biology'],
            'Computer Science': ['JEE Mains', 'Programming', 'Data Structures', 'Algorithms'],
            'English': ['IELTS', 'TOEFL', 'SAT English', 'Board Exams'],
            'Accountancy': ['CA Foundation', 'Commerce Board', 'Accountancy Basics'],
            'Economics': ['Economics Board', 'Commerce Entrance', 'UPSC Economics'],
            'Statistics': ['Statistics Board', 'Research Methodology', 'Data Analysis'],
            'Programming': ['Python Basics', 'Web Development', 'Java Programming'],
            'Reasoning': ['CAT', 'GMAT', 'Bank Exams', 'SSC Exams'],
            'GK & Current Affairs': ['UPSC Prelims', 'Bank Exams', 'SSC Exams'],
            'Quantitative Aptitude': ['CAT', 'Bank Exams', 'SSC', 'Railway Exams'],
            'Verbal Ability': ['CAT', 'GMAT', 'GRE', 'Bank Exams']
        };
        
        return courseMap[subject] || ['Subject-specific coaching', 'Exam preparation', 'Board exams'];
    };
    
    const filteredTuitions = tuitions.filter(tuition => {
        if (filters.subject && !tuition.subject.toLowerCase().includes(filters.subject.toLowerCase())) return false;
        if (filters.location && !tuition.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
        if (filters.experience) {
            const expYears = parseInt(tuition.experience);
            if (filters.experience === '5+' && expYears < 5) return false;
            if (filters.experience === '10+' && expYears < 10) return false;
        }
        return true;
    });
    
    const subjects = [...new Set(tuitions.map(t => t.subject))];
    const locations = [...new Set(tuitions.map(t => t.location))];
    
    if (loading) {
        return (
            <div className="min-h-screen pt-28 flex items-center justify-center">
                <div className="text-center">
                    <div className="loader mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading tutors...</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen pt-28 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Find Expert Tutors</h1>
                <p className="text-gray-600 mb-8">Connect with verified tutors for exam preparation across Karnataka</p>
                
                {/* Filters */}
                <div className="bg-white rounded-3xl p-8 mb-8 shadow-lg border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                        <i className="fas fa-search text-primary mr-2"></i>
                        Find Your Tutor
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                            <select 
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                                value={filters.subject}
                                onChange={(e) => setFilters(prev => ({...prev, subject: e.target.value}))}
                            >
                                <option value="">All Subjects</option>
                                {subjects.map(subject => (
                                    <option key={subject} value={subject}>{subject}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                            <select 
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                                value={filters.location}
                                onChange={(e) => setFilters(prev => ({...prev, location: e.target.value}))}
                            >
                                <option value="">All Locations</option>
                                {locations.map(location => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Experience</label>
                            <select 
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                                value={filters.experience}
                                onChange={(e) => setFilters(prev => ({...prev, experience: e.target.value}))}
                            >
                                <option value="">Any Experience</option>
                                <option value="5+">5+ Years</option>
                                <option value="10+">10+ Years</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                {/* Tuition Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTuitions.map((tuition, index) => (
                        <div 
                            key={tuition.id}
                            className="bg-white rounded-3xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-primary/30"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">{tuition.name}</h3>
                                    <div className="flex items-center text-gray-600 text-sm">
                                        <i className="fas fa-book text-primary mr-2"></i>
                                        {tuition.subject}
                                        <span className="mx-2">•</span>
                                        <i className="fas fa-map-marker-alt text-red-500 mr-1"></i>
                                        {tuition.location}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-star text-yellow-500 mr-1"></i>
                                    <span className="font-bold">{tuition.rating}</span>
                                </div>
                            </div>
                            
                            {/* Courses Offered */}
                            <div className="mb-4">
                                <div className="text-sm font-medium text-gray-700 mb-2">Courses Offered:</div>
                                <div className="flex flex-wrap gap-1">
                                    {tuition.coursesOffered?.slice(0, 3).map((course, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                            {course}
                                        </span>
                                    ))}
                                    {tuition.coursesOffered?.length > 3 && (
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                            +{tuition.coursesOffered.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center text-sm">
                                    <i className="fas fa-graduation-cap text-gray-400 mr-3 w-5"></i>
                                    <span>{tuition.qualification || 'Experienced Tutor'}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <i className="fas fa-clock text-gray-400 mr-3 w-5"></i>
                                    <span>{tuition.experience} experience</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <i className="fas fa-users text-gray-400 mr-3 w-5"></i>
                                    <span>{tuition.students || '500+'} students</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <i className="fas fa-chalkboard text-gray-400 mr-3 w-5"></i>
                                    <span>Mode: {tuition.mode?.join(', ') || 'Online & Offline'}</span>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-2xl font-bold text-primary">{tuition.fee}</div>
                                    <div className="text-sm text-gray-600">per hour</div>
                                </div>
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={() => {
                                            setSelectedTuitionId(tuition.id);
                                            setCurrentPage('TuitionDetails');
                                        }}
                                        className="gradient-primary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                                    >
                                        <i className="fas fa-eye mr-2"></i>
                                        View
                                    </button>
                                    {tuition.demo && (
                                        <button className="px-4 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all duration-300">
                                            <i className="fas fa-play mr-1"></i>
                                            Demo
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};