const { useState, useEffect } = React;

const ExamsPage = ({ setCurrentPage, setSelectedExamId }) => {
    const [exams, setExams] = useState([]);
    const [filterState, setFilterState] = useState('');
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const loadExams = () => {
            setLoading(true);
            try {
                if (window.EXAMS_DATA && window.EXAMS_DATA.length > 0) {
                    setExams(window.EXAMS_DATA);
                } else {
                    setExams([]);
                }
            } catch (error) {
                console.error("Error loading exams:", error);
                setExams([]);
            }
            setLoading(false);
        };
        
        loadExams();
    }, []);
    
    const filteredExams = exams.filter(exam => 
        !filterState || exam.state === filterState || exam.type === filterState
    );
    
    const states = ['All', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'National'];
    
    if (loading) {
        return (
            <div className="min-h-screen pt-28 flex items-center justify-center">
                <div className="text-center">
                    <div className="loader mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading exams...</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen pt-28 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Entrance Exams</h1>
                <p className="text-gray-600 mb-8">State-wise and national level entrance exams</p>
                
                {/* Filter by State */}
                <div className="glass rounded-3xl p-8 mb-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Filter by State</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {states.map(state => (
                            <button
                                key={state}
                                onClick={() => setFilterState(state === 'All' ? '' : state)}
                                className={`px-4 py-2 rounded-lg font-medium ${
                                    (filterState === state || (!filterState && state === 'All'))
                                        ? 'gradient-primary text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {state}
                            </button>
                        ))}
                    </div>
                    
                    {/* Exams List */}
                    <div className="space-y-6">
                        {filteredExams.map((exam, index) => (
                            <div 
                                key={exam.id}
                                className="glass p-6 rounded-2xl card-hover animate-slide-up"
                                style={{animationDelay: `${index * 100}ms`}}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-1">{exam.name}</h3>
                                        <div className="flex items-center text-gray-600">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold mr-3 ${
                                                exam.type === 'National' ? 'bg-blue-100 text-blue-700' :
                                                exam.type === 'State' ? 'bg-green-100 text-green-700' :
                                                'bg-purple-100 text-purple-700'
                                            }`}>
                                                {exam.type}
                                            </span>
                                            <span className="text-sm">{exam.state}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div>
                                        <div className="text-sm text-gray-500">Exam Date</div>
                                        <div className="font-semibold">{exam.examDate}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Category</div>
                                        <div className="font-semibold">{exam.category}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Registration Ends</div>
                                        <div className="font-semibold">{exam.registrationEnds}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Colleges</div>
                                        <div className="font-semibold">{exam.colleges || '100+'}</div>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => {
                                            setSelectedExamId(exam.id);
                                            setCurrentPage('ExamDetails');
                                        }}
                                        className="gradient-primary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg"
                                    >
                                        View Details
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