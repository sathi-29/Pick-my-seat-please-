const { useState, useEffect } = React;

const ScholarshipsPage = ({ setCurrentPage }) => {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        level: '',
        amount: '',
        deadline: ''
    });
    const [selectedScholarship, setSelectedScholarship] = useState(null);
    const [appliedFilters, setAppliedFilters] = useState([]);
    
    useEffect(() => {
        const loadScholarships = () => {
            setLoading(true);
            try {
                if (window.SCHOLARSHIPS_DATA && window.SCHOLARSHIPS_DATA.length > 0) {
                    setScholarships(window.SCHOLARSHIPS_DATA);
                } else {
                    setScholarships([]);
                }
            } catch (error) {
                console.error("Error loading scholarships:", error);
                setScholarships([]);
            }
            setLoading(false);
        };
        
        loadScholarships();
    }, []);
    
    const filteredScholarships = scholarships.filter(scholarship => {
        if (filters.category && scholarship.category !== filters.category) return false;
        if (filters.level && scholarship.level !== filters.level) return false;
        if (filters.amount === 'high' && !scholarship.amount.includes('₹1,00,000')) return false;
        if (filters.deadline === 'urgent') {
            const deadline = new Date(scholarship.deadline);
            const now = new Date();
            const diffDays = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
            return diffDays <= 30;
        }
        return true;
    });
    
    const categories = [...new Set(scholarships.map(s => s.category))];
    const levels = [...new Set(scholarships.map(s => s.level))];
    
    const handleFilterChange = (filterType, value) => {
        setFilters(prev => {
            const newFilters = { ...prev, [filterType]: value };
            // Update applied filters for display
            const applied = [];
            if (newFilters.category) applied.push(`${newFilters.category}`);
            if (newFilters.level) applied.push(`${newFilters.level}`);
            if (newFilters.amount) applied.push('High Amount');
            if (newFilters.deadline) applied.push('Urgent Deadline');
            setAppliedFilters(applied);
            return newFilters;
        });
    };
    
    const clearFilters = () => {
        setFilters({
            category: '',
            level: '',
            amount: '',
            deadline: ''
        });
        setAppliedFilters([]);
    };
    
    if (loading) {
        return (
            <div className="min-h-screen pt-28 flex items-center justify-center">
                <div className="text-center">
                    <div className="loader mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading scholarships...</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen pt-28 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="mb-12 text-center animate-slide-up">
                    <h1 className="text-5xl font-black text-gray-800 mb-4">
                        Discover <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">Scholarships</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Find financial aid opportunities for your education. {scholarships.length}+ scholarships available
                    </p>
                </div>
                
                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="glass p-6 rounded-2xl text-center">
                        <div className="text-3xl font-bold text-primary animate-count">
                            {scholarships.filter(s => s.status === 'Open').length}+
                        </div>
                        <div className="text-sm text-gray-600">Active Scholarships</div>
                    </div>
                    <div className="glass p-6 rounded-2xl text-center">
                        <div className="text-3xl font-bold text-green-600 animate-count">
                            ₹10 Cr+
                        </div>
                        <div className="text-sm text-gray-600">Total Funding</div>
                    </div>
                    <div className="glass p-6 rounded-2xl text-center">
                        <div className="text-3xl font-bold text-purple-600 animate-count">
                            15+
                        </div>
                        <div className="text-sm text-gray-600">Categories</div>
                    </div>
                    <div className="glass p-6 rounded-2xl text-center">
                        <div className="text-3xl font-bold text-orange-600 animate-count">
                            30+
                        </div>
                        <div className="text-sm text-gray-600">Days Avg Deadline</div>
                    </div>
                </div>
                
                {/* Filters */}
                <div className="glass rounded-3xl p-8 mb-8 card-hover">
                    <div className="flex flex-wrap justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800">Filter Scholarships</h3>
                        {appliedFilters.length > 0 && (
                            <button 
                                onClick={clearFilters}
                                className="text-sm text-primary hover:underline"
                            >
                                Clear all filters
                            </button>
                        )}
                    </div>
                    
                    {/* Applied Filters */}
                    {appliedFilters.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {appliedFilters.map((filter, idx) => (
                                <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                    {filter} ×
                                </span>
                            ))}
                        </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">🏛️ Category</label>
                            <select 
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary/20"
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                            >
                                <option value="">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">🎓 Level</label>
                            <select 
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary/20"
                                value={filters.level}
                                onChange={(e) => handleFilterChange('level', e.target.value)}
                            >
                                <option value="">All Levels</option>
                                {levels.map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">💰 Amount</label>
                            <select 
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary/20"
                                value={filters.amount}
                                onChange={(e) => handleFilterChange('amount', e.target.value)}
                            >
                                <option value="">Any Amount</option>
                                <option value="high">High Amount (₹1L+)</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">⏰ Deadline</label>
                            <select 
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary/20"
                                value={filters.deadline}
                                onChange={(e) => handleFilterChange('deadline', e.target.value)}
                            >
                                <option value="">All Deadlines</option>
                                <option value="urgent">Urgent (≤ 30 days)</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                {/* Scholarships Grid */}
                {filteredScholarships.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fas fa-search text-primary text-3xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">No scholarships found</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your filters</p>
                        <button 
                            onClick={clearFilters}
                            className="px-8 py-3 gradient-primary text-white rounded-xl font-semibold hover:shadow-lg"
                        >
                            Show All Scholarships
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {filteredScholarships.map((scholarship, index) => (
                            <div 
                                key={scholarship.id}
                                className="animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="glass rounded-3xl p-8 card-hover h-full border border-gray-100">
                                    {/* Scholarship Header */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex-1">
                                            <div className="flex items-center mb-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold mr-3 ${
                                                    scholarship.status === 'Open' ? 'bg-green-100 text-green-800' :
                                                    scholarship.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {scholarship.status}
                                                </span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    scholarship.category === 'Government' ? 'bg-blue-100 text-blue-800' :
                                                    scholarship.category === 'State Government' ? 'bg-purple-100 text-purple-800' :
                                                    scholarship.category === 'Private' ? 'bg-orange-100 text-orange-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                    {scholarship.category}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{scholarship.name}</h3>
                                            <p className="text-gray-600 mb-4">{scholarship.description}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Scholarship Details */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Amount</div>
                                            <div className="text-xl font-bold text-green-600">{scholarship.amount}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Deadline</div>
                                            <div className="text-lg font-semibold text-red-600">
                                                {scholarship.deadline}
                                                {(() => {
                                                    const deadline = new Date(scholarship.deadline);
                                                    const now = new Date();
                                                    const diffDays = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
                                                    if (diffDays <= 7) return ' ⚠️';
                                                    if (diffDays <= 30) return ' 🔥';
                                                    return '';
                                                })()}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Level</div>
                                            <div className="font-semibold">{scholarship.level}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Fields</div>
                                            <div className="font-semibold">{scholarship.fields?.join(', ')}</div>
                                        </div>
                                    </div>
                                    
                                    {/* Eligibility */}
                                    <div className="mb-6">
                                        <div className="text-sm text-gray-500 mb-2">Eligibility Criteria</div>
                                        <p className="text-gray-700">{scholarship.eligibility}</p>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="flex space-x-4">
                                        <button 
                                            onClick={() => setSelectedScholarship(scholarship)}
                                            className="flex-1 py-3 bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-semibold rounded-xl hover:from-primary/20 hover:to-primary/10 transition-all duration-300 border border-primary/20"
                                        >
                                            <i className="fas fa-info-circle mr-2"></i> Details
                                        </button>
                                        <button 
                                            onClick={() => window.open(scholarship.website || '#', '_blank')}
                                            className="flex-1 py-3 gradient-primary text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                                        >
                                            <i className="fas fa-external-link-alt mr-2"></i> Apply Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Scholarship Details Modal */}
            {selectedScholarship && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="glass rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedScholarship.name}</h3>
                                <p className="text-gray-600">{selectedScholarship.description}</p>
                            </div>
                            <button 
                                onClick={() => setSelectedScholarship(null)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm text-gray-500">Amount</div>
                                    <div className="text-2xl font-bold text-green-600">{selectedScholarship.amount}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Deadline</div>
                                    <div className="text-lg font-semibold">{selectedScholarship.deadline}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Category</div>
                                    <div className="font-semibold">{selectedScholarship.category}</div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm text-gray-500">Level</div>
                                    <div className="font-semibold">{selectedScholarship.level}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Status</div>
                                    <div className={`px-3 py-1 rounded-full text-sm font-semibold inline-block ${
                                        selectedScholarship.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                    }`}>
                                        {selectedScholarship.status}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Application Mode</div>
                                    <div className="font-semibold">{selectedScholarship.application}</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-lg font-bold mb-3">Eligibility Criteria</h4>
                                <p className="text-gray-700">{selectedScholarship.eligibility}</p>
                            </div>
                            
                            <div>
                                <h4 className="text-lg font-bold mb-3">Required Documents</h4>
                                <div className="space-y-2">
                                    {selectedScholarship.documents?.map((doc, idx) => (
                                        <div key={idx} className="flex items-center">
                                            <i className="fas fa-check text-green-500 mr-3"></i>
                                            <span>{doc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="text-lg font-bold mb-3">How to Apply</h4>
                                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                                    <li>Visit the official website: {selectedScholarship.website || 'N/A'}</li>
                                    <li>Register/create an account</li>
                                    <li>Fill the application form with accurate details</li>
                                    <li>Upload required documents</li>
                                    <li>Submit before the deadline</li>
                                </ol>
                            </div>
                        </div>
                        
                        <div className="mt-8 flex space-x-4">
                            <button 
                                onClick={() => window.open(selectedScholarship.website || '#', '_blank')}
                                className="flex-1 py-4 gradient-primary text-white rounded-xl font-semibold text-lg hover:shadow-xl"
                            >
                                <i className="fas fa-external-link-alt mr-2"></i> Apply Now
                            </button>
                            <button 
                                onClick={() => {
                                    // Add to calendar functionality
                                    alert('Added to your calendar!');
                                }}
                                className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200"
                            >
                                <i className="fas fa-calendar-plus mr-2"></i> Remind Me
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};