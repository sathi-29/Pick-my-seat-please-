const { useState, useEffect } = React;

const CoursesPage = ({ setCurrentPage, setSelectedCourseId }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        duration: '',
        demand: '',
        search: ''
    });
    const [sortBy, setSortBy] = useState('popularity');
    
    useEffect(() => {
        const loadCourses = () => {
            setLoading(true);
            try {
                if (window.COURSES_DATA && window.COURSES_DATA.length > 0) {
                    setCourses(window.COURSES_DATA);
                } else {
                    // Fallback data
                    const fallbackCourses = [
                        {
                            id: 1,
                            name: 'Computer Science Engineering',
                            duration: '4 Years',
                            fees: '₹3.5L/year',
                            avgSalary: '₹8.5 LPA',
                            category: 'Engineering',
                            demand: 'High',
                            popularity: 95
                        },
                        {
                            id: 2,
                            name: 'MBBS',
                            duration: '5.5 Years',
                            fees: '₹15L/year',
                            avgSalary: '₹15 LPA',
                            category: 'Medical',
                            demand: 'Very High',
                            popularity: 99
                        },
                        {
                            id: 3,
                            name: 'BBA',
                            duration: '3 Years',
                            fees: '₹2.5L/year',
                            avgSalary: '₹6 LPA',
                            category: 'Commerce',
                            demand: 'High',
                            popularity: 90
                        }
                    ];
                    setCourses(fallbackCourses);
                }
            } catch (error) {
                console.error("Error loading courses:", error);
                setCourses([]);
            }
            setLoading(false);
        };
        
        loadCourses();
    }, []);
    
    const filteredAndSortedCourses = courses.filter(course => {
        if (filters.category && course.category !== filters.category) return false;
        if (filters.duration && course.duration !== filters.duration) return false;
        if (filters.demand && course.demand !== filters.demand) return false;
        if (filters.search && !course.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
        return true;
    }).sort((a, b) => {
        if (sortBy === 'popularity') return (b.popularity || 0) - (a.popularity || 0);
        if (sortBy === 'salary') {
            const aSalary = parseFloat(a.avgSalary.replace(/[^0-9.]/g, ''));
            const bSalary = parseFloat(b.avgSalary.replace(/[^0-9.]/g, ''));
            return bSalary - aSalary;
        }
        if (sortBy === 'fees') {
            const aFees = parseFloat(a.fees.replace(/[^0-9.]/g, ''));
            const bFees = parseFloat(b.fees.replace(/[^0-9.]/g, ''));
            return aFees - bFees;
        }
        return 0;
    });
    
    const categories = [...new Set(courses.map(c => c.category))];
    const durations = [...new Set(courses.map(c => c.duration))];
    const demandLevels = [...new Set(courses.map(c => c.demand))];
    
    const getCategoryColor = (category) => {
        switch(category) {
            case 'Engineering': return 'from-blue-500 to-cyan-500';
            case 'Medical': return 'from-red-500 to-pink-500';
            case 'Commerce': return 'from-green-500 to-emerald-500';
            case 'Science': return 'from-purple-500 to-indigo-500';
            case 'Arts': return 'from-yellow-500 to-orange-500';
            case 'Law': return 'from-gray-600 to-gray-800';
            default: return 'from-primary to-secondary';
        }
    };
    
    const getDemandBadge = (demand) => {
        switch(demand) {
            case 'Very High': return { color: 'bg-red-100 text-red-800', icon: 'fa-fire' };
            case 'High': return { color: 'bg-orange-100 text-orange-800', icon: 'fa-chart-line' };
            case 'Medium': return { color: 'bg-yellow-100 text-yellow-800', icon: 'fa-balance-scale' };
            case 'Low': return { color: 'bg-blue-100 text-blue-800', icon: 'fa-chart-bar' };
            default: return { color: 'bg-gray-100 text-gray-800', icon: 'fa-chart-line' };
        }
    };
    
    if (loading) {
        return (
            <div className="min-h-screen pt-28 flex items-center justify-center">
                <div className="text-center">
                    <div className="loader mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading courses...</p>
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
                        Explore <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Courses</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover {courses.length}+ undergraduate courses with detailed information on fees, eligibility, and career prospects
                    </p>
                </div>
                
                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="glass p-6 rounded-2xl text-center">
                        <div className="text-3xl font-bold text-primary animate-count">{courses.length}+</div>
                        <div className="text-sm text-gray-600">Total Courses</div>
                    </div>
                    <div className="glass p-6 rounded-2xl text-center">
                        <div className="text-3xl font-bold text-green-600 animate-count">15+</div>
                        <div className="text-sm text-gray-600">Categories</div>
                    </div>
                    <div className="glass p-6 rounded-2xl text-center">
                        <div className="text-3xl font-bold text-purple-600 animate-count">₹8L+</div>
                        <div className="text-sm text-gray-600">Avg Starting Salary</div>
                    </div>
                    <div className="glass p-6 rounded-2xl text-center">
                        <div className="text-3xl font-bold text-orange-600 animate-count">500+</div>
                        <div className="text-sm text-gray-600">Colleges Offering</div>
                    </div>
                </div>
                
                {/* Filters & Search */}
                <div className="glass rounded-3xl p-8 mb-8 card-hover">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary/20"
                                    value={filters.search}
                                    onChange={(e) => setFilters(prev => ({...prev, search: e.target.value}))}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <select 
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary/20"
                                value={filters.category}
                                onChange={(e) => setFilters(prev => ({...prev, category: e.target.value}))}
                            >
                                <option value="">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <select 
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary/20"
                                value={filters.demand}
                                onChange={(e) => setFilters(prev => ({...prev, demand: e.target.value}))}
                            >
                                <option value="">All Demand Levels</option>
                                {demandLevels.map(demand => (
                                    <option key={demand} value={demand}>{demand}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <select 
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary/20"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="popularity">Sort by: Popularity</option>
                                <option value="salary">Sort by: Salary</option>
                                <option value="fees">Sort by: Fees (Low to High)</option>
                            </select>
                        </div>
                    </div>
                    
                    {/* Active Filters */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {filters.category && (
                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center">
                                {filters.category} 
                                <button onClick={() => setFilters(prev => ({...prev, category: ''}))} className="ml-2">×</button>
                            </span>
                        )}
                        {filters.demand && (
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center">
                                {filters.demand} 
                                <button onClick={() => setFilters(prev => ({...prev, demand: ''}))} className="ml-2">×</button>
                            </span>
                        )}
                        {filters.search && (
                            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center">
                                Search: {filters.search}
                                <button onClick={() => setFilters(prev => ({...prev, search: ''}))} className="ml-2">×</button>
                            </span>
                        )}
                        {(filters.category || filters.demand || filters.search) && (
                            <button 
                                onClick={() => setFilters({ category: '', duration: '', demand: '', search: '' })}
                                className="px-3 py-1 text-gray-600 hover:text-gray-800 text-sm"
                            >
                                Clear all
                            </button>
                        )}
                    </div>
                </div>
                
                {/* Courses Grid */}
                {filteredAndSortedCourses.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fas fa-search text-primary text-3xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">No courses found</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your filters</p>
                        <button 
                            onClick={() => setFilters({ category: '', duration: '', demand: '', search: '' })}
                            className="px-8 py-3 gradient-primary text-white rounded-xl font-semibold hover:shadow-lg"
                        >
                            Show All Courses
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredAndSortedCourses.map((course, index) => (
                            <div 
                                key={course.id}
                                className="animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="glass rounded-3xl p-6 card-hover h-full border border-gray-100">
                                    {/* Course Header */}
                                    <div className="mb-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-1">{course.name}</h3>
                                                <div className="flex items-center text-gray-600 text-sm">
                                                    <i className="fas fa-clock text-gray-400 mr-2"></i>
                                                    {course.duration}
                                                </div>
                                            </div>
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${getCategoryColor(course.category)}`}>
                                                <i className="fas fa-graduation-cap text-white"></i>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDemandBadge(course.demand).color}`}>
                                                <i className={`fas ${getDemandBadge(course.demand).icon} mr-1`}></i>
                                                {course.demand} Demand
                                            </span>
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                                                {course.category}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Course Stats */}
                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                                            <div className="text-xs text-blue-600 font-semibold">Annual Fees</div>
                                            <div className="font-bold text-sm">{course.fees}</div>
                                        </div>
                                        <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                                            <div className="text-xs text-green-600 font-semibold">Avg Salary</div>
                                            <div className="font-bold text-sm">{course.avgSalary}</div>
                                        </div>
                                        <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                                            <div className="text-xs text-purple-600 font-semibold">Colleges</div>
                                            <div className="font-bold text-sm">{course.colleges || '50+'}</div>
                                        </div>
                                        <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                                            <div className="text-xs text-orange-600 font-semibold">Popularity</div>
                                            <div className="font-bold text-sm">{course.popularity || '85'}%</div>
                                        </div>
                                    </div>
                                    
                                    {/* Course Description */}
                                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                                        {course.description || `${course.name} is a popular undergraduate course with excellent career opportunities.`}
                                    </p>
                                    
                                    {/* Eligibility */}
                                    <div className="mb-6">
                                        <div className="text-xs text-gray-500 mb-1">Eligibility</div>
                                        <div className="text-sm font-medium">{course.eligibility || '10+2 in relevant stream'}</div>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <button 
                                            onClick={() => {
                                                setSelectedCourseId(course.id);
                                                setCurrentPage('CourseDetails');
                                            }}
                                            className="py-3 bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-semibold rounded-xl hover:from-primary/20 hover:to-primary/10 transition-all duration-300 border border-primary/20"
                                        >
                                            <i className="fas fa-eye mr-2"></i> Details
                                        </button>
                                        <button 
                                            onClick={() => {
                                                setSelectedCourseId(course.id);
                                                setCurrentPage('CourseDetails');
                                            }}
                                            className="py-3 gradient-primary text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                                        >
                                            <i className="fas fa-book mr-2"></i> Explore
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {/* Categories Overview */}
                <div className="mt-16">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Browse by Category</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { name: 'Engineering', icon: 'fa-cogs', count: 15, color: 'from-blue-500 to-cyan-500' },
                            { name: 'Medical', icon: 'fa-heart-pulse', count: 12, color: 'from-red-500 to-pink-500' },
                            { name: 'Commerce', icon: 'fa-chart-line', count: 8, color: 'from-green-500 to-emerald-500' },
                            { name: 'Science', icon: 'fa-flask', count: 10, color: 'from-purple-500 to-indigo-500' },
                            { name: 'Arts', icon: 'fa-palette', count: 8, color: 'from-yellow-500 to-orange-500' },
                            { name: 'Others', icon: 'fa-graduation-cap', count: 12, color: 'from-gray-500 to-gray-700' }
                        ].map((category, idx) => (
                            <div 
                                key={idx}
                                className="glass rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 cursor-pointer"
                                onClick={() => setFilters(prev => ({...prev, category: category.name === 'Others' ? '' : category.name}))}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 bg-gradient-to-br ${category.color}`}>
                                    <i className={`fas ${category.icon} text-white`}></i>
                                </div>
                                <div className="font-bold mb-1">{category.name}</div>
                                <div className="text-sm text-gray-600">{category.count} courses</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};