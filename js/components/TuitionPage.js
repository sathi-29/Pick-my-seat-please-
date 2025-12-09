const TuitionPage = ({ setCurrentPage, setSelectedTuitionId }) => {
    const [tuitions] = useState(window.TUITIONS_DATA || []);
    const [filterType, setFilterType] = useState('All');
    
    const filteredTuitions = filterType === 'All' 
        ? tuitions 
        : tuitions.filter(tuition => tuition.type === filterType);
    
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 page-transition">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Tuition Centers</h1>
                <p className="text-gray-600 mb-8">Find the best coaching centers with detailed information and maps</p>
                
                {/* Filters */}
                <div className="glass p-6 rounded-2xl mb-8">
                    <div className="flex flex-wrap gap-3">
                        {['All', 'Offline', 'Online', 'Hybrid'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-4 py-2 rounded-lg font-medium ${filterType === type ? 'gradient-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                            >
                                {type} Centers
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTuitions.map((tuition) => (
                        <div key={tuition.id} className="glass rounded-2xl p-6 hover-lift">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{tuition.name}</h3>
                                    <div className="flex items-center mt-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold mr-3 ${
                                            tuition.type === 'Offline' ? 'bg-blue-100 text-blue-800' :
                                            tuition.type === 'Online' ? 'bg-purple-100 text-purple-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>
                                            {tuition.type}
                                        </span>
                                        <div className="flex items-center">
                                            <i className="fas fa-star text-yellow-500 mr-1"></i>
                                            <span className="font-bold">{tuition.rating}</span>
                                            <span className="text-gray-500 text-sm ml-1">({tuition.reviews})</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-3xl">
                                    {tuition.icon ? <i className={`fas ${tuition.icon}`}></i> : '🎓'}
                                </div>
                            </div>
                            
                            <div className="space-y-3 mb-6">
                                {tuition.location && (
                                    <div className="flex items-center">
                                        <i className="fas fa-map-marker-alt text-gray-400 mr-3 w-5"></i>
                                        <span className="text-sm">{tuition.location}</span>
                                        {tuition.distance && (
                                            <span className="ml-auto text-sm text-gray-500">{tuition.distance}</span>
                                        )}
                                    </div>
                                )}
                                
                                <div className="flex items-center">
                                    <i className="fas fa-rupee-sign text-gray-400 mr-3 w-5"></i>
                                    <span className="font-medium">{tuition.fees}</span>
                                </div>
                                
                                {tuition.subjects && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {tuition.subjects.slice(0, 3).map((subject, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                                                {subject}
                                            </span>
                                        ))}
                                        {tuition.subjects.length > 3 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                                +{tuition.subjects.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                            
                            <button 
                                onClick={() => {
                                    setSelectedTuitionId(tuition.id);
                                    setCurrentPage('TuitionDetails');
                                }}
                                className="w-full gradient-blue text-white py-3 rounded-xl font-semibold hover:shadow-md"
                            >
                                <i className="fas fa-eye mr-2"></i> View More Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};