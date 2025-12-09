const { useState } = React;

const HomePage = ({ setCurrentPage }) => {
    const [showGuidance, setShowGuidance] = useState(false);
    const [userPreferences, setUserPreferences] = useState({
        percentage: '',
        preferredCourse: '',
        stream: '',
        budget: ''
    });
    
    const courses = window.COURSES_DATA || [];

    return (
        <div className="min-h-screen pt-20">
            {/* Hero Section */}
            <div className="gradient-blue text-white py-24 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                        Find Your <span className="text-yellow-300">Perfect College</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto">
                        Personalized recommendations based on your scores, preferences, and career goals
                    </p>
                </div>
            </div>

            {/* Quick Input Section */}
            <div className="max-w-6xl mx-auto px-4 -mt-16 relative">
                <div className="glass rounded-3xl p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        <i className="fas fa-bullseye mr-3 text-blue-500"></i>
                        Let's Find Your Best Fit
                    </h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left: Quick Preferences Form */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4">Quick College Finder</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        12th Percentage/CGPA
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter your percentage (e.g., 85)"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={userPreferences.percentage}
                                        onChange={(e) => setUserPreferences(prev => ({...prev, percentage: e.target.value}))}
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Preferred Course
                                    </label>
                                    <select 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={userPreferences.preferredCourse}
                                        onChange={(e) => setUserPreferences(prev => ({...prev, preferredCourse: e.target.value}))}
                                    >
                                        <option value="">Select a course</option>
                                        {courses.map(course => (
                                            <option key={course.id} value={course.name}>
                                                {course.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Budget Per Year
                                    </label>
                                    <select 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={userPreferences.budget}
                                        onChange={(e) => setUserPreferences(prev => ({...prev, budget: e.target.value}))}
                                    >
                                        <option value="">Select budget range</option>
                                        <option value="1">Under ₹1 Lakh</option>
                                        <option value="1-3">₹1-3 Lakhs</option>
                                        <option value="3-5">₹3-5 Lakhs</option>
                                        <option value="5+">₹5+ Lakhs</option>
                                    </select>
                                </div>
                                
                                <button 
                                    onClick={() => setCurrentPage('Colleges')}
                                    className="w-full gradient-blue text-white py-3 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 mt-4"
                                >
                                    <i className="fas fa-search mr-2"></i>
                                    Find Matching Colleges
                                </button>
                            </div>
                        </div>
                        
                        {/* Right: Career Guidance */}
                        <div>
                            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100">
                                <div className="flex items-start mb-4">
                                    <div className="w-12 h-12 gradient-purple rounded-xl flex items-center justify-center mr-4">
                                        <i className="fas fa-lightbulb text-white text-xl"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Confused About Your Career?</h3>
                                        <p className="text-gray-600 text-sm mt-1">
                                            Take our 5-minute assessment to discover courses that match your interests
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center">
                                        <i className="fas fa-check text-green-500 mr-3"></i>
                                        <span>Personalized career recommendations</span>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-check text-green-500 mr-3"></i>
                                        <span>Match your skills with ideal courses</span>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-check text-green-500 mr-3"></i>
                                        <span>Future job market insights</span>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={() => setShowGuidance(!showGuidance)}
                                    className="w-full gradient-purple text-white py-3 rounded-xl font-semibold hover:shadow-md"
                                >
                                    <i className="fas fa-play-circle mr-2"></i>
                                    Start Career Assessment
                                </button>
                            </div>
                            
                            {/* Stats */}
                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-xl text-center">
                                    <div className="text-2xl font-bold text-blue-600">50K+</div>
                                    <div className="text-sm text-gray-600">Students Helped</div>
                                </div>
                                <div className="bg-white p-4 rounded-xl text-center">
                                    <div className="text-2xl font-bold text-green-600">92%</div>
                                    <div className="text-sm text-gray-600">Satisfaction Rate</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Career Guidance Section (Conditional) */}
            {showGuidance && (
                <div className="max-w-4xl mx-auto px-4 mt-12">
                    <CareerGuidance setCurrentPage={setCurrentPage} />
                </div>
            )}
            
            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Everything You Need</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: 'fa-building', title: '50+ Colleges', desc: 'Detailed information with seat availability' },
                        { icon: 'fa-map-location', title: 'Interactive Maps', desc: 'Location maps for colleges & tuition centers' },
                        { icon: 'fa-chair', title: 'Seat Booking', desc: 'Real-time seat availability and booking' },
                        { icon: 'fa-state', title: 'State-wise Exams', desc: 'All government and private exams' }
                    ].map((feature, idx) => (
                        <div key={idx} className="glass p-8 rounded-2xl hover-lift">
                            <div className="w-16 h-16 gradient-blue rounded-2xl flex items-center justify-center mb-6">
                                <i className={`fas ${feature.icon} text-white text-2xl`}></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};