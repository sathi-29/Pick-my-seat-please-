const { useState } = React;

const CollegesPage = ({ setCurrentPage, setSelectedCollegeId }) => {
    const [selectedCollege, setSelectedCollege] = useState(null);
    const [colleges] = useState(window.COLLEGES_DATA || []);
    const [filters, setFilters] = useState({
        location: '',
        type: '',
        minFees: '',
        maxFees: ''
    });
    
    const filteredColleges = colleges.filter(college => {
        if (filters.location && !college.location.includes(filters.location)) return false;
        if (filters.type && college.type !== filters.type) return false;
        return true;
    });
    
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 page-transition">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Top Colleges</h1>
                <p className="text-gray-600 mb-8">Discover detailed information about colleges with seat availability</p>
                
                {/* Filters */}
                <div className="glass rounded-2xl p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <input
                                type="text"
                                placeholder="e.g., Bengaluru"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                value={filters.location}
                                onChange={(e) => setFilters(prev => ({...prev, location: e.target.value}))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">College Type</label>
                            <select 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Min Fees (₹/year)</label>
                            <input
                                type="number"
                                placeholder="e.g., 100000"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                value={filters.minFees}
                                onChange={(e) => setFilters(prev => ({...prev, minFees: e.target.value}))}
                            />
                        </div>
                        <div className="flex items-end">
                            <button 
                                onClick={() => setFilters({
                                    location: '',
                                    type: '',
                                    minFees: '',
                                    maxFees: ''
                                })}
                                className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredColleges.map((college) => (
                        <div key={college.id} className="glass rounded-2xl p-6 hover-lift">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{college.name}</h3>
                                    <div className="flex items-center text-gray-600 mt-1">
                                        <i className="fas fa-map-marker-alt text-red-400 mr-2"></i>
                                        {college.location}
                                    </div>
                                </div>
                                <div className="text-4xl">{college.image}</div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="bg-blue-50 p-3 rounded-lg">
                                    <div className="text-sm text-blue-600">Fees</div>
                                    <div className="font-semibold">{college.fees}</div>
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg">
                                    <div className="text-sm text-green-600">Placement</div>
                                    <div className="font-semibold">{college.placement}</div>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                    <i className="fas fa-star text-yellow-500 mr-1"></i>
                                    <span className="font-bold">{college.rating}</span>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm ${
                                    college.type === 'Private Autonomous' ? 'bg-purple-100 text-purple-800' :
                                    college.type === 'Government' ? 'bg-green-100 text-green-800' :
                                    'bg-blue-100 text-blue-800'
                                }`}>
                                    {college.type}
                                </span>
                            </div>
                            
                            <button 
                                onClick={() => {
                                    setSelectedCollegeId(college.id);
                                    setCurrentPage('CollegeDetails');
                                }}
                                className="w-full gradient-blue text-white py-3 rounded-xl font-semibold hover:shadow-md transition-all duration-300"
                            >
                                <i className="fas fa-eye mr-2"></i>
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};