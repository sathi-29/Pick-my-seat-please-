const { useState } = React;

const ExamsPage = ({ setCurrentPage, setSelectedExamId }) => {
    const [selectedState, setSelectedState] = useState('All');
    const [exams] = useState(window.EXAMS_DATA || []);
    const [states] = useState(window.EXAM_STATES || ['All', 'Karnataka', 'Maharashtra']);
    
    const filteredExams = selectedState === 'All' 
        ? exams 
        : exams.filter(exam => exam.state === selectedState);
    
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 page-transition">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Entrance Exams</h1>
                <p className="text-gray-600 mb-8">State-wise and national level entrance exams</p>
                
                {/* State Filter */}
                <div className="glass p-6 rounded-2xl mb-8">
                    <h3 className="font-bold text-lg mb-4">Filter by State</h3>
                    <div className="flex flex-wrap gap-2">
                        {states.map((state) => (
                            <button
                                key={state}
                                onClick={() => setSelectedState(state)}
                                className={`px-4 py-2 rounded-lg font-medium ${selectedState === state ? 'gradient-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                            >
                                {state}
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Exams Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredExams.map((exam) => (
                        <div key={exam.id} className="glass rounded-2xl p-6 hover-lift">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{exam.name}</h3>
                                    <div className="flex items-center mt-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold mr-3 ${
                                            exam.type === 'National' ? 'bg-blue-100 text-blue-800' :
                                            exam.type === 'State' ? 'bg-green-100 text-green-800' :
                                            'bg-purple-100 text-purple-800'
                                        }`}>
                                            {exam.type}
                                        </span>
                                        <span className="text-sm text-gray-600">{exam.state}</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 gradient-blue rounded-xl flex items-center justify-center">
                                    <i className="fas fa-file-pen text-white"></i>
                                </div>
                            </div>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center">
                                    <i className="fas fa-calendar-alt text-gray-400 mr-3 w-5"></i>
                                    <div>
                                        <div className="text-sm text-gray-500">Exam Date</div>
                                        <div className="font-medium">{exam.date}</div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <i className="fas fa-graduation-cap text-gray-400 mr-3 w-5"></i>
                                    <div>
                                        <div className="text-sm text-gray-500">Category</div>
                                        <div className="font-medium">{exam.category}</div>
                                    </div>
                                </div>
                                
                                {exam.registrationEnd && (
                                    <div className="flex items-center">
                                        <i className="fas fa-clock text-gray-400 mr-3 w-5"></i>
                                        <div>
                                            <div className="text-sm text-gray-500">Registration Ends</div>
                                            <div className="font-medium text-red-600">{exam.registrationEnd}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            <button 
                                onClick={() => {
                                    setSelectedExamId(exam.id);
                                    setCurrentPage('ExamDetails');
                                }}
                                className="w-full gradient-blue text-white py-3 rounded-xl font-semibold hover:shadow-md transition-all duration-300"
                            >
                                <i className="fas fa-info-circle mr-2"></i>
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};