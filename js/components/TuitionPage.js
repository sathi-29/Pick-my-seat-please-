const { useState, useEffect } = React;

const TuitionPage = ({ setCurrentPage, setSelectedTuitionId }) => {
    const [tuitions, setTuitions] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Load tuition data
        const loadTuitions = () => {
            setLoading(true);
            try {
                if (window.TUITIONS_DATA && window.TUITIONS_DATA.length > 0) {
                    setTuitions(window.TUITIONS_DATA);
                } else {
                    // Fallback data
                    const fallbackTuitions = [
                        {
                            id: 1,
                            name: 'Dr. Rajesh Kumar',
                            subject: 'Mathematics',
                            experience: '15 Years',
                            rating: 4.9,
                            fee: '₹800/hour'
                        },
                        {
                            id: 2,
                            name: 'Prof. Anjali Sharma',
                            subject: 'Physics',
                            experience: '12 Years',
                            rating: 4.8,
                            fee: '₹750/hour'
                        }
                    ];
                    setTuitions(fallbackTuitions);
                }
            } catch (error) {
                console.error("Error loading tuitions:", error);
                setTuitions([]);
            }
            setLoading(false);
        };
        
        loadTuitions();
    }, []);
    
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
                <p className="text-gray-600 mb-8">Connect with verified tutors for exam preparation</p>
                
                {/* Tuition Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tuitions.map((tuition, index) => (
                        <div 
                            key={tuition.id} 
                            className="glass rounded-3xl p-6 card-hover animate-slide-up" 
                            style={{animationDelay: `${index * 100}ms`}}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">{tuition.name}</h3>
                                    <div className="flex items-center text-gray-600 text-sm">
                                        <i className="fas fa-book text-primary mr-2"></i>
                                        {tuition.subject}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-star text-yellow-500 mr-1"></i>
                                    <span className="font-bold">{tuition.rating}</span>
                                </div>
                            </div>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center text-sm">
                                    <i className="fas fa-graduation-cap text-gray-400 mr-3"></i>
                                    <span>{tuition.qualification || 'Experienced Tutor'}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <i className="fas fa-clock text-gray-400 mr-3"></i>
                                    <span>{tuition.experience} experience</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <i className="fas fa-users text-gray-400 mr-3"></i>
                                    <span>{tuition.students || '500+'} students</span>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-primary">{tuition.fee}</span>
                                <button 
                                    onClick={() => {
                                        setSelectedTuitionId(tuition.id);
                                        setCurrentPage('TuitionDetails');
                                    }}
                                    className="gradient-primary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                                >
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};