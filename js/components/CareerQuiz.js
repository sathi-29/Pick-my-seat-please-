const { useState } = React;

const CareerQuiz = ({ setCurrentPage }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [selectedStream, setSelectedStream] = useState('');
    
    const questions = [
        {
            id: 1,
            question: "What excites you most?",
            options: [
                { text: "Solving puzzles & logical problems", stream: "Engineering", icon: "🧩" },
                { text: "Understanding living things & health", stream: "Medical", icon: "🩺" },
                { text: "Creating art, design & visuals", stream: "Arts/Design", icon: "🎨" },
                { text: "Business, money & leadership", stream: "Commerce", icon: "💼" }
            ],
            time: 7
        },
        {
            id: 2,
            question: "In a group project, you prefer to:",
            options: [
                { text: "Research & analyze data", stream: "Engineering/Research", icon: "📊" },
                { text: "Build/create something tangible", stream: "Engineering", icon: "🔨" },
                { text: "Lead & organize the team", stream: "Commerce", icon: "👥" },
                { text: "Help/support team members", stream: "Medical/Social", icon: "🤝" }
            ],
            time: 7
        },
        {
            id: 3,
            question: "Which subject was your favorite?",
            options: [
                { text: "Math/Physics", stream: "Engineering", icon: "∫" },
                { text: "Biology/Chemistry", stream: "Medical", icon: "🧪" },
                { text: "Arts/Literature", stream: "Arts", icon: "📚" },
                { text: "Commerce/Economics", stream: "Commerce", icon: "💰" },
                { text: "Computers", stream: "Technology", icon: "💻" }
            ],
            time: 7
        },
        {
            id: 4,
            question: "Pick a weekend activity:",
            options: [
                { text: "Coding workshop/hackathon", stream: "Technology", icon: "👨‍💻" },
                { text: "Hospital volunteering", stream: "Medical", icon: "🏥" },
                { text: "Art exhibition/design fest", stream: "Arts", icon: "🖼️" },
                { text: "Business competition", stream: "Commerce", icon: "🏆" }
            ],
            time: 8
        }
    ];
    
    const streamRecommendations = {
        "Engineering": {
            confidence: 85,
            courses: ["B.Tech CSE", "B.Tech ECE", "B.Tech Mechanical", "B.Tech AI/ML"],
            topColleges: ["RVCE", "PES", "MSRIT"],
            actionSteps: ["Take JEE/KCET", "Build coding portfolio", "Join prep center"],
            icons: ["👨‍💻", "🔧", "📐"]
        },
        "Medical": {
            confidence: 85,
            courses: ["MBBS", "BDS", "B.Pharm", "B.Sc Nursing"],
            topColleges: ["KMC", "St. John's", "MS Ramaiah Medical"],
            actionSteps: ["NEET preparation", "Biology revision", "Hospital internship"],
            icons: ["🩺", "🧬", "⚕️"]
        },
        "Commerce": {
            confidence: 85,
            courses: ["BBA", "B.Com", "BMS", "B.A Economics"],
            topColleges: ["Christ University", "Jain University", "St. Joseph's"],
            actionSteps: ["CAT/CMAT prep", "Join business club", "Start small project"],
            icons: ["💼", "📈", "🤝"]
        },
        "Arts/Design": {
            confidence: 85,
            courses: ["B.Des", "BFA", "B.A Psychology", "B.A Journalism"],
            topColleges: ["NID", "Srishti", "Christ Arts"],
            actionSteps: ["Build portfolio", "Join design contests", "Art workshops"],
            icons: ["🎨", "✏️", "📷"]
        },
        "Technology": {
            confidence: 85,
            courses: ["B.Tech CSE", "BCA", "B.Sc CS", "B.Tech AI"],
            topColleges: ["RVCE", "PES", "BMSIT"],
            actionSteps: ["Learn programming", "Build projects", "Join hackathons"],
            icons: ["💻", "🤖", "🔧"]
        }
    };
    
    const handleAnswer = (stream) => {
        const newAnswers = { ...answers, [currentQuestion]: stream };
        setAnswers(newAnswers);
        
        // Calculate dominant stream
        const streamCounts = {};
        Object.values(newAnswers).forEach(s => {
            streamCounts[s] = (streamCounts[s] || 0) + 1;
        });
        
        let dominantStream = '';
        let maxCount = 0;
        for (const [stream, count] of Object.entries(streamCounts)) {
            if (count > maxCount) {
                maxCount = count;
                dominantStream = stream;
            }
        }
        
        setSelectedStream(dominantStream);
        
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };
    
    if (showResults && selectedStream) {
        const recommendation = streamRecommendations[selectedStream] || streamRecommendations["Engineering"];
        return (
            <div className="glass rounded-3xl p-8 animate-fade-in-up">
                <div className="text-center mb-8">
                    <div className="text-5xl mb-4">{recommendation.icons[0]}</div>
                    <h3 className="text-2xl font-bold mb-2">You're a <span className="text-blue-600">{selectedStream}</span> person!</h3>
                    <p className="text-gray-600 mb-4">Based on your answers, this field matches your interests</p>
                    <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-50 p-6 rounded-2xl">
                        <h4 className="font-bold mb-3 flex items-center">
                            <span className="text-xl mr-2">🎯</span> Top Courses
                        </h4>
                        <ul className="space-y-2">
                            {recommendation.courses.map((course, idx) => (
                                <li key={idx} className="flex items-center">
                                    <i className="fas fa-check text-green-500 mr-2"></i>
                                    {course}
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="bg-purple-50 p-6 rounded-2xl">
                        <h4 className="font-bold mb-3 flex items-center">
                            <span className="text-xl mr-2">🏛️</span> Recommended Colleges
                        </h4>
                        <ul className="space-y-2">
                            {recommendation.topColleges.map((college, idx) => (
                                <li key={idx} className="flex items-center">
                                    <i className="fas fa-building text-purple-500 mr-2"></i>
                                    {college}
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="bg-green-50 p-6 rounded-2xl">
                        <h4 className="font-bold mb-3 flex items-center">
                            <span className="text-xl mr-2">✅</span> Next Actions
                        </h4>
                        <ul className="space-y-2">
                            {recommendation.actionSteps.map((action, idx) => (
                                <li key={idx} className="flex items-center">
                                    <i className="fas fa-arrow-right text-green-500 mr-2"></i>
                                    {action}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
                <div className="flex gap-4">
                    <button 
                        onClick={() => {
                            setCurrentQuestion(0);
                            setAnswers({});
                            setShowResults(false);
                            setSelectedStream('');
                        }}
                        className="flex-1 py-3 bg-gray-100 rounded-xl font-medium hover:bg-gray-200"
                    >
                        <i className="fas fa-redo mr-2"></i> Retake Quiz
                    </button>
                    <button 
                        onClick={() => setCurrentPage('Colleges')}
                        className="flex-1 gradient-blue text-white py-3 rounded-xl font-medium"
                    >
                        <i className="fas fa-search mr-2"></i> Explore Colleges
                    </button>
                </div>
            </div>
        );
    }
    
    const currentQ = questions[currentQuestion];
    
    return (
        <div className="glass rounded-3xl p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-bold">Quick Career Match</h3>
                    <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-500">~{currentQ.time}s to answer</div>
                    <div className="w-48 bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                            className="gradient-blue h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>
            
            <div className="text-center mb-8">
                <h4 className="text-xl font-semibold mb-6">{currentQ.question}</h4>
                <p className="text-sm text-gray-500 mb-6">Choose what feels most natural</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQ.options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleAnswer(option.stream)}
                        className="glass p-6 rounded-2xl text-left hover:bg-blue-50 transition-all duration-300 group"
                    >
                        <div className="flex items-start">
                            <span className="text-2xl mr-4 group-hover:scale-110 transition-transform">{option.icon}</span>
                            <div>
                                <div className="font-medium mb-1">{option.text}</div>
                                <div className="text-sm text-gray-600">{option.stream}</div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
            
            {selectedStream && (
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-blue-800">
                        <i className="fas fa-lightbulb mr-2"></i>
                        <strong>Pattern detected:</strong> You lean towards <span className="font-bold">{selectedStream}</span>
                    </p>
                </div>
            )}
        </div>
    );
};