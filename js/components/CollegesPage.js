const { useState, useEffect } = React;

const CollegesPage = ({ setCurrentPage, setSelectedCollegeId }) => {
    const [colleges, setColleges] = useState([]);
    const [filters, setFilters] = useState({
        location: '',
        type: '',
        minRating: '',
        maxFees: ''
    });
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Load colleges data
        const loadColleges = () => {
            setLoading(true);
            try {
                // Check if data exists, otherwise use fallback
                if (window.COLLEGES_DATA && window.COLLEGES_DATA.length > 0) {
                    setColleges(window.COLLEGES_DATA);
                } else {
                    // Fallback data
                    const fallbackColleges = [
                        {
                            id: 1,
                            name: 'RV College of Engineering',
                            location: 'Bengaluru, Karnataka',
                            rating: 4.7,
                            fees: '₹3.2L/year',
                            placement: '92%',
                            avgPackage: '₹8.5 LPA',
                            type: 'Private Autonomous',
                            verified: { trustScore: 92 }
                        },
                        {
                            id: 2,
                            name: 'PES University',
                            location: 'Bengaluru, Karnataka',
                            rating: 4.6,
                            fees: '₹4.5L/year',
                            placement: '95%',
                            avgPackage: '₹9 LPA',
                            type: 'Private University',
                            verified: { trustScore: 90 }
                        }
                    ];
                    setColleges(fallbackColleges);
                }
            } catch (error) {
                console.error("Error loading colleges:", error);
                setColleges([]);
            }
            setLoading(false);
        };
        
        loadColleges();
    }, []);
    
    const filteredColleges = colleges.filter(college => {
        if (filters.location && !college.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
        if (filters.type && college.type !== filters.type) return false;
        if (filters.minRating && college.rating < parseFloat(filters.minRating)) return false;
        return true;
    });
    
    if (loading) {
        return (
            <div className="min-h-screen pt-28 flex items-center justify-center">
                <div className="text-center">
                    <div className="loader mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading colleges...</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen pt-28 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-black text-gray-800 mb-4">
                        Discover Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Dream College</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore {colleges.length}+ colleges with verified data, seat availability, and student reviews
                    </p>
                </div>
                
                {/* Interactive Filters - FIXED VISIBILITY */}
                <div className="glass rounded-3xl p-8 mb-12 shadow-lg card-hover">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                        <i className="fas fa-filter text-primary mr-2"></i>
                        Filter Colleges
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">📍 Location</label>
                            <div className="relative">
                                <i className="fas fa-map-marker-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                <input
                                    type="text"
                                    placeholder="City or State"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    value={filters.location}
                                    onChange={(e) => setFilters(prev => ({...prev, location: e.target.value}))}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">🏫 Type</label>
                            <select 
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                value={filters.type}
                                onChange={(e) => setFilters(prev => ({...prev, type: e.target.value}))}
                            >
                                <option value="">All Types</option>
                                <option value="Private Autonomous">Private Autonomous</option>
                                <option value="Private University">Private University</option>
                                <option value="Deemed University">Deemed University</option>
                                <option value="Government">Government</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">⭐ Min Rating</label>
                            <select 
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                value={filters.minRating}
                                onChange={(e) => setFilters(prev => ({...prev, minRating: e.target.value}))}
                            >
                                <option value="">Any Rating</option>
                                <option value="4.5">4.5+ Stars</option>
                                <option value="4.0">4.0+ Stars</option>
                                <option value="3.5">3.5+ Stars</option>
                            </select>
                        </div>
                        
                        <div className="flex items-end">
                            <button 
                                onClick={() => setFilters({
                                    location: '',
                                    type: '',
                                    minRating: '',
                                    maxFees: ''
                                })}
                                className="w-full py-3 bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
                            >
                                <i className="fas fa-redo mr-2"></i>
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* College Grid */}
                {filteredColleges.length === 0 ? (
                    <div className="text-center py-16 animate-fade-in">
                        <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fas fa-search text-white text-3xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">No colleges found</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your filters or browse all colleges</p>
                        <button 
                            onClick={() => setFilters({
                                location: '',
                                type: '',
                                minRating: '',
                                maxFees: ''
                            })}
                            className="px-8 py-3 gradient-primary text-white rounded-xl font-semibold hover:shadow-lg"
                        >
                            Clear All Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredColleges.map((college, index) => (
                            <div 
                                key={college.id}
                                className="animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="glass rounded-3xl p-6 card-hover h-full border border-gray-100">
                                    {/* College Header */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-800 mb-1">{college.name}</h3>
                                            <div className="flex items-center text-gray-600 text-sm">
                                                <i className="fas fa-map-marker-alt text-red-400 mr-2"></i>
                                                {college.location}
                                            </div>
                                        </div>
                                        <div className="text-4xl">{college.image || '🏛️'}</div>
                                    </div>
                                    
                                    {/* Rating & Type */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center">
                                            <div className="flex items-center mr-3">
                                                <i className="fas fa-star text-yellow-500 mr-1"></i>
                                                <span className="font-bold">{college.rating}</span>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                college.type === 'Government' ? 'bg-blue-100 text-blue-700' :
                                                college.type === 'Private Autonomous' ? 'bg-purple-100 text-purple-700' :
                                                'bg-green-100 text-green-700'
                                            }`}>
                                                {college.type}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-3 gap-2 mb-6">
                                        <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                                            <div className="text-xs text-blue-600 font-semibold">Fees</div>
                                            <div className="font-bold text-sm">{college.fees}</div>
                                        </div>
                                        <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                                            <div className="text-xs text-green-600 font-semibold">Placement</div>
                                            <div className="font-bold text-sm">{college.placement}</div>
                                        </div>
                                        <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                                            <div className="text-xs text-purple-600 font-semibold">Package</div>
                                            <div className="font-bold text-sm">{college.avgPackage}</div>
                                        </div>
                                    </div>
                                    
                                    {/* Action Buttons - FIXED VISIBILITY */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <button 
                                            onClick={() => {
                                                setSelectedCollegeId(college.id);
                                                setCurrentPage('CollegeDetails');
                                            }}
                                            className="py-3 bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-semibold rounded-xl hover:from-primary/20 hover:to-primary/10 transition-all duration-300 border border-primary/20"
                                        >
                                            <i className="fas fa-eye mr-2"></i> Details
                                        </button>
                                        <button 
                                            onClick={() => {
                                                setSelectedCollegeId(college.id);
                                                setCurrentPage('CollegeDetails');
                                            }}
                                            className="py-3 gradient-primary text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                                        >
                                            <i className="fas fa-file-alt mr-2"></i> Apply Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};