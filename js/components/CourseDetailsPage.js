const { useState } = React;

const CourseDetailsPage = ({ setCurrentPage, courseId }) => {
    const [activeTab, setActiveTab] = useState('overview');
    
    const course = window.COURSES_DATA ? 
        window.COURSES_DATA.find(c => c.id === courseId) || window.COURSES_DATA[0]
        : {
            name: 'B.Tech Computer Science',
            duration: '4 Years',
            avgSalary: '₹6-15 LPA',
            fees: '₹3-5 L/year'
        };
    
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 page-transition">
            <div className="max-w-7xl mx-auto">
                <button onClick={() => setCurrentPage('Courses')} className="flex items-center text-blue-600 mb-8">
                    <i className="fas fa-arrow-left mr-2"></i> Back to Courses
                </button>
                
                <div className="glass rounded-3xl p-8 mb-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6">
                        <div className="flex items-start">
                            <div className="text-5xl mr-6">{course.image}</div>
                            <div>
                                <h1 className="text-4xl font-bold text-gray-800 mb-2">{course.name}</h1>
                                <p className="text-gray-600 text-lg">Build a successful career in the dynamic field</p>
                            </div>
                        </div>
                        <div className="mt-4 lg:mt-0">
                            <button className="gradient-blue text-white px-6 py-3 rounded-xl font-semibold">
                                <i className="fas fa-download mr-2"></i>
                                Download Syllabus
                            </button>
                        </div>
                    </div>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 p-6 rounded-xl">
                            <div className="text-sm text-blue-600 font-medium">Duration</div>
                            <div className="text-2xl font-bold">{course.duration}</div>
                        </div>
                        <div className="bg-green-50 p-6 rounded-xl">
                            <div className="text-sm text-green-600 font-medium">Average Salary</div>
                            <div className="text-2xl font-bold">{course.avgSalary}</div>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-xl">
                            <div className="text-sm text-purple-600 font-medium">Fees Range</div>
                            <div className="text-2xl font-bold">{course.fees}</div>
                        </div>
                        <div className="bg-orange-50 p-6 rounded-xl">
                            <div className="text-sm text-orange-600 font-medium">Job Demand</div>
                            <div className="text-2xl font-bold">{course.demand}</div>
                        </div>
                    </div>
                </div>
                
                {/* Tabs */}
                <div className="glass rounded-2xl p-6 mb-8">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {['overview', 'eligibility', 'syllabus', 'careers', 'colleges', 'exams'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-xl font-semibold capitalize ${activeTab === tab ? 'gradient-blue text-white' : 'hover:bg-gray-100'}`}
                            >
                                {tab.replace('-', ' ')}
                            </button>
                        ))}
                    </div>
                    
                    {/* Tab Content */}
                    <div className="min-h-[400px]">
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold mb-4">Course Overview</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {course.name} is designed to provide students with comprehensive knowledge and 
                                        practical skills required in the industry. The program focuses on both theoretical 
                                        foundations and hands-on experience through projects and internships.
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-bold mb-3">Specializations Available</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {course.specializations?.map((spec, idx) => (
                                                <span key={idx} className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg">
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-3">Top Recruiters</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {course.topRecruiters?.slice(0, 5).map((recruiter, idx) => (
                                                <span key={idx} className="px-3 py-2 bg-green-100 text-green-800 rounded-lg">
                                                    {recruiter}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'eligibility' && (
                            <div>
                                <h3 className="text-2xl font-bold mb-6">Eligibility Criteria</h3>
                                <div className="glass p-6 rounded-xl">
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-bold mb-2">Educational Qualification</h4>
                                            <p>{course.eligibility}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-2">Entrance Exams</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {course.entranceExams?.map((exam, idx) => (
                                                    <span key={idx} className="px-3 py-2 bg-purple-100 text-purple-800 rounded-lg">
                                                        {exam}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-2">Minimum Percentage</h4>
                                            <p>General Category: 45-50% in 12th standard</p>
                                            <p>Reserved Categories: 40-45% in 12th standard</p>
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-2">Age Limit</h4>
                                            <p>Minimum 17 years as on December 31 of admission year</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'syllabus' && (
                            <div>
                                <h3 className="text-2xl font-bold mb-6">Course Syllabus</h3>
                                <div className="space-y-6">
                                    {course.syllabus?.map((semester, idx) => (
                                        <div key={idx} className="glass p-6 rounded-xl">
                                            <h4 className="font-bold mb-3">Year {Math.floor(idx/2) + 1} - Semester {(idx % 2) + 1}</h4>
                                            <p className="text-gray-700">{semester}</p>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                                    5 Core Subjects
                                                </span>
                                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                                    2 Electives
                                                </span>
                                                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                                                    1 Lab Course
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'careers' && (
                            <div>
                                <h3 className="text-2xl font-bold mb-6">Career Opportunities</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {course.careerPaths?.map((career, idx) => (
                                        <div key={idx} className="glass p-6 rounded-xl">
                                            <div className="w-12 h-12 gradient-blue rounded-xl flex items-center justify-center mb-4">
                                                <i className="fas fa-briefcase text-white"></i>
                                            </div>
                                            <h5 className="font-bold text-lg mb-2">{career}</h5>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span>Entry Level Salary</span>
                                                    <span className="font-bold text-green-600">₹4-8 LPA</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Experience Required</span>
                                                    <span>0-2 years</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-8 glass p-6 rounded-xl">
                                    <h4 className="font-bold mb-4">Industry Growth</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span>Current Job Openings</span>
                                                <span className="font-bold">50,000+</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div className="bg-green-500 h-2.5 rounded-full" style={{width: '85%'}}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span>Annual Growth Rate</span>
                                                <span className="font-bold">{course.growth}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div className="bg-blue-500 h-2.5 rounded-full" style={{width: '78%'}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Related Colleges */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-2xl font-bold mb-6">Top Colleges Offering This Course</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(window.COLLEGES_DATA || []).slice(0, 6).map((college) => (
                            <div key={college.id} className="glass p-4 rounded-xl hover-lift">
                                <div className="flex items-start mb-3">
                                    <div className="text-3xl mr-3">{college.image}</div>
                                    <div>
                                        <h5 className="font-bold">{college.name}</h5>
                                        <p className="text-sm text-gray-600">{college.location}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold">{college.fees}</span>
                                    <button 
                                        onClick={() => setCurrentPage('CollegeDetails')}
                                        className="text-blue-600 text-sm font-medium"
                                    >
                                        View Details →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};