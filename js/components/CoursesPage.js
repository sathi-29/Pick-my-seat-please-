const { useState } = React;

const CoursesPage = ({ setCurrentPage, setSelectedCourseId }) => {
    const [courses] = useState(window.COURSES_DATA || []);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    const categories = ['All', 'Engineering', 'Medical', 'Management', 'Science', 'Arts', 'Law'];
    
    const filteredCourses = courses.filter(course => {
        if (searchTerm && !course.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
        if (selectedCategory !== 'All') {
            const courseCategories = {
                'B.Tech': 'Engineering',
                'MBBS': 'Medical',
                'MBA': 'Management',
                'BBA': 'Management',
                'B.Sc': 'Science',
                'B.A': 'Arts',
                'LLB': 'Law'
            };
            
            const courseType = course.name.split(' ')[0];
            return courseCategories[courseType] === selectedCategory;
        }
        return true;
    });
    
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 page-transition">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Popular Courses</h1>
                <p className="text-gray-600 mb-8">Explore courses with detailed information and career scope</p>
                
                {/* Search and Filter */}
                <div className="glass rounded-2xl p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                <input
                                    type="text"
                                    placeholder="Search courses by name, specialization, or keyword..."
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <select 
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category === 'All' ? 'All Categories' : category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                        <div key={course.id} className="glass rounded-2xl p-6 hover-lift">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{course.name}</h3>
                                    <div className="flex items-center mt-2">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mr-3">
                                            {course.duration}
                                        </span>
                                        <span className="text-sm text-gray-600">{course.avgSalary}</span>
                                    </div>
                                </div>
                                <div className="text-4xl">{course.image}</div>
                            </div>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center">
                                    <i className="fas fa-graduation-cap text-gray-400 mr-3 w-5"></i>
                                    <div>
                                        <div className="text-sm text-gray-500">Eligibility</div>
                                        <div className="font-medium text-sm">{course.eligibility?.split('(')[0]}</div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <i className="fas fa-chart-line text-gray-400 mr-3 w-5"></i>
                                    <div>
                                        <div className="text-sm text-gray-500">Job Demand</div>
                                        <div className="font-medium">{course.demand}</div>
                                    </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {course.specializations?.slice(0, 2).map((spec, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                            {spec}
                                        </span>
                                    ))}
                                    {course.specializations?.length > 2 && (
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                            +{course.specializations.length - 2} more
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => {
                                    setSelectedCourseId(course.id);
                                    setCurrentPage('CourseDetails');
                                }}
                                className="w-full gradient-blue text-white py-3 rounded-xl font-semibold hover:shadow-md"
                            >
                                <i className="fas fa-book-open mr-2"></i> Learn More
                            </button>
                        </div>
                    ))}
                </div>
                
                {filteredCourses.length === 0 && (
                    <div className="text-center py-12">
                        <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
                        <h3 className="text-xl font-bold text-gray-700 mb-2">No courses found</h3>
                        <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};