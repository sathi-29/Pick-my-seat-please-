const { useState, useEffect } = React;

const ExamDetailsPage = ({ setCurrentPage, examId }) => {
    const [activeTab, setActiveTab] = useState('overview');
    
    const exam = window.EXAMS_DATA ? 
        window.EXAMS_DATA.find(e => e.id === examId) || window.EXAMS_DATA[0]
        : {
            name: 'KCET 2025',
            fullName: 'Karnataka Common Entrance Test 2025',
            date: 'April 18-19, 2025'
        };
    
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 page-transition">
            <div className="max-w-7xl mx-auto">
                <button onClick={() => setCurrentPage('Exams')} className="flex items-center text-blue-600 mb-8">
                    <i className="fas fa-arrow-left mr-2"></i> Back to Exams
                </button>
                
                <div className="glass rounded-3xl p-8 mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">{exam.name}</h1>
                    <p className="text-lg text-gray-600 mb-6">{exam.fullName}</p>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                        <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
                            <i className="fas fa-map-marker-alt mr-2"></i>{exam.state}
                        </span>
                        <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
                            <i className="fas fa-tag mr-2"></i>{exam.type}
                        </span>
                        <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-medium">
                            <i className="fas fa-calendar-alt mr-2"></i>{exam.date}
                        </span>
                        <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full font-medium">
                            <i className="fas fa-graduation-cap mr-2"></i>{exam.category}
                        </span>
                    </div>
                </div>
                
                {/* Tabs */}
                <div className="glass rounded-2xl p-6 mb-8">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {['overview', 'eligibility', 'pattern', 'syllabus', 'dates', 'colleges'].map((tab) => (
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
                                <h3 className="text-2xl font-bold">Exam Overview</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="font-bold mb-4">Key Information</h4>
                                        <div className="space-y-4">
                                            <div className="flex justify-between pb-3 border-b">
                                                <span className="text-gray-600">Registration Start</span>
                                                <span className="font-medium">{exam.registrationStart}</span>
                                            </div>
                                            <div className="flex justify-between pb-3 border-b">
                                                <span className="text-gray-600">Registration End</span>
                                                <span className="font-medium">{exam.registrationEnd}</span>
                                            </div>
                                            <div className="flex justify-between pb-3 border-b">
                                                <span className="text-gray-600">Exam Date</span>
                                                <span className="font-medium">{exam.date}</span>
                                            </div>
                                            <div className="flex justify-between pb-3 border-b">
                                                <span className="text-gray-600">Result Date</span>
                                                <span className="font-medium">{exam.resultDate}</span>
                                            </div>
                                            <div className="flex justify-between pb-3 border-b">
                                                <span className="text-gray-600">Application Fee</span>
                                                <span className="font-medium">{exam.applicationFee}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-bold mb-4">Quick Links</h4>
                                        <div className="space-y-3">
                                            <a href={exam.website} className="flex items-center p-3 bg-blue-50 rounded-xl hover:bg-blue-100">
                                                <i className="fas fa-globe text-blue-600 mr-3"></i>
                                                <div>
                                                    <div className="font-medium">Official Website</div>
                                                    <div className="text-sm text-gray-600">{exam.website}</div>
                                                </div>
                                            </a>
                                            <div className="flex items-center p-3 bg-green-50 rounded-xl">
                                                <i className="fas fa-phone text-green-600 mr-3"></i>
                                                <div>
                                                    <div className="font-medium">Helpline Number</div>
                                                    <div className="text-sm text-gray-600">{exam.helpline}</div>
                                                </div>
                                            </div>
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
                                            <p>{exam.eligibility}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-2">Age Limit</h4>
                                            <p>{exam.ageLimit}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-2">Minimum Percentage</h4>
                                            <p>General Category: 45% aggregate in 12th standard</p>
                                            <p>SC/ST: 40% aggregate in 12th standard</p>
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-2">Subjects Required</h4>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {exam.subjects?.map((subject, idx) => (
                                                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                                                        {subject}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'pattern' && (
                            <div>
                                <h3 className="text-2xl font-bold mb-6">Exam Pattern</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="glass p-6 rounded-xl">
                                        <h4 className="font-bold mb-3">Mode of Exam</h4>
                                        <p className="text-gray-600">Computer Based Test (CBT)</p>
                                    </div>
                                    <div className="glass p-6 rounded-xl">
                                        <h4 className="font-bold mb-3">Duration</h4>
                                        <p className="text-gray-600">3 Hours (180 Minutes)</p>
                                    </div>
                                    <div className="glass p-6 rounded-xl">
                                        <h4 className="font-bold mb-3">Total Questions</h4>
                                        <p className="text-gray-600">180 Questions</p>
                                    </div>
                                </div>
                                
                                <div className="glass p-6 rounded-xl mt-6">
                                    <h4 className="font-bold mb-4">Marking Scheme</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between pb-2 border-b">
                                            <span>Correct Answer</span>
                                            <span className="font-bold text-green-600">+1 Mark</span>
                                        </div>
                                        <div className="flex justify-between pb-2 border-b">
                                            <span>Wrong Answer</span>
                                            <span className="font-bold text-red-600">No Negative Marking</span>
                                        </div>
                                        <div className="flex justify-between pb-2 border-b">
                                            <span>Unanswered</span>
                                            <span>0 Marks</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'syllabus' && (
                            <div>
                                <h3 className="text-2xl font-bold mb-6">Detailed Syllabus</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { subject: 'Physics', topics: ['Mechanics', 'Optics', 'Electricity', 'Magnetism', 'Modern Physics'] },
                                        { subject: 'Chemistry', topics: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry'] },
                                        { subject: 'Mathematics', topics: ['Algebra', 'Calculus', 'Coordinate Geometry', 'Trigonometry'] }
                                    ].map((subject, idx) => (
                                        <div key={idx} className="glass p-6 rounded-xl">
                                            <h4 className="font-bold mb-4">{subject.subject}</h4>
                                            <ul className="space-y-2">
                                                {subject.topics.map((topic, tIdx) => (
                                                    <li key={tIdx} className="flex items-center">
                                                        <i className="fas fa-check text-green-500 mr-2 text-sm"></i>
                                                        {topic}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 glass p-6 rounded-xl">
                                    <h4 className="font-bold mb-3">Preparation Tips</h4>
                                    <ul className="space-y-2">
                                        <li>• Complete NCERT textbooks thoroughly</li>
                                        <li>• Practice previous year question papers</li>
                                        <li>• Take regular mock tests</li>
                                        <li>• Focus on time management during exam</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'dates' && (
                            <div>
                                <h3 className="text-2xl font-bold mb-6">Important Dates</h3>
                                <div className="glass rounded-xl overflow-hidden">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="py-3 px-6 text-left font-semibold">Event</th>
                                                <th className="py-3 px-6 text-left font-semibold">Date</th>
                                                <th className="py-3 px-6 text-left font-semibold">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {exam.importantDates?.map((date, idx) => (
                                                <tr key={idx} className="hover:bg-gray-50">
                                                    <td className="py-4 px-6">{date.event}</td>
                                                    <td className="py-4 px-6 font-medium">{date.date}</td>
                                                    <td className="py-4 px-6">
                                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                                            Upcoming
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Preparation Resources */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-2xl font-bold mb-6">Preparation Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="glass p-6 rounded-xl">
                            <div className="w-12 h-12 gradient-blue rounded-xl flex items-center justify-center mb-4">
                                <i className="fas fa-book text-white"></i>
                            </div>
                            <h4 className="font-bold mb-2">Recommended Books</h4>
                            <ul className="space-y-2 text-sm">
                                <li>• NCERT Physics 11th & 12th</li>
                                <li>• HC Verma Concepts of Physics</li>
                                <li>• OP Tandon Chemistry</li>
                            </ul>
                        </div>
                        
                        <div className="glass p-6 rounded-xl">
                            <div className="w-12 h-12 gradient-purple rounded-xl flex items-center justify-center mb-4">
                                <i className="fas fa-laptop text-white"></i>
                            </div>
                            <h4 className="font-bold mb-2">Online Platforms</h4>
                            <ul className="space-y-2 text-sm">
                                <li>• NPTEL for video lectures</li>
                                <li>• Unacademy/Khan Academy</li>
                                <li>• Official mock test portal</li>
                            </ul>
                        </div>
                        
                        <div className="glass p-6 rounded-xl">
                            <div className="w-12 h-12 gradient-green rounded-xl flex items-center justify-center mb-4">
                                <i className="fas fa-chart-line text-white"></i>
                            </div>
                            <h4 className="font-bold mb-2">Practice Tests</h4>
                            <ul className="space-y-2 text-sm">
                                <li>• 10+ Full length mock tests</li>
                                <li>• Previous 5 years papers</li>
                                <li>• Topic-wise quizzes</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};