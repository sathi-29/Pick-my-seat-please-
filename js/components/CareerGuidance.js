const { useState } = React;

const CareerGuidance = ({ setCurrentPage }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [recommendations, setRecommendations] = useState(null);
    
    const questions = [
        {
            id: 'interest',
            question: 'What subjects do you enjoy the most?',
            type: 'multi-select',
            options: [
                { id: 'math', label: 'Mathematics & Problem Solving', field: 'Science' },
                { id: 'bio', label: 'Biology & Living Systems', field: 'Medical' },
                { id: 'physics', label: 'Physics & How Things Work', field: 'Engineering' },
                { id: 'chemistry', label: 'Chemistry & Materials', field: 'Science/Medical' },
                { id: 'computers', label: 'Computers & Technology', field: 'IT' },
                { id: 'business', label: 'Business & Commerce', field: 'Management' },
                { id: 'arts', label: 'Arts & Creativity', field: 'Arts/Humanities' },
                { id: 'social', label: 'Social Sciences & Society', field: 'Humanities' }
            ]
        },
        {
            id: 'strengths',
            question: 'What are your strongest skills?',
            type: 'multi-select',
            options: [
                { id: 'analytical', label: 'Analytical Thinking', field: 'Engineering/Science' },
                { id: 'creative', label: 'Creative Thinking', field: 'Arts/Design' },
                { id: 'communication', label: 'Communication & People Skills', field: 'Management' },
                { id: 'leadership', label: 'Leadership & Management', field: 'Business' },
                { id: 'technical', label: 'Technical Hands-on Skills', field: 'Engineering' },
                { id: 'research', label: 'Research & Investigation', field: 'Science/Medical' },
                { id: 'problem-solving', label: 'Problem Solving', field: 'Engineering/IT' },
                { id: 'detail', label: 'Attention to Detail', field: 'Medical/Science' }
            ]
        },
        {
            id: 'career_goals',
            question: 'What kind of work environment do you prefer?',
            type: 'single',
            options: [
                { id: 'corporate', label: 'Corporate Office (9-5 job)', field: 'Engineering/Management' },
                { id: 'research', label: 'Research & Laboratory', field: 'Science/Medical' },
                { id: 'field', label: 'Field Work & Outdoor', field: 'Agriculture/Geology' },
                { id: 'creative', label: 'Creative Studio/Workspace', field: 'Arts/Design' },
                { id: 'healthcare', label: 'Hospital/Healthcare Setting', field: 'Medical' },
                { id: 'entrepreneur', label: 'Startup/Entrepreneurship', field: 'Business' },
                { id: 'academia', label: 'Academic/Teaching', field: 'Education' }
            ]
        },
        {
            id: 'study_style',
            question: 'How do you prefer to study/learn?',
            type: 'single',
            options: [
                { id: 'theoretical', label: 'Theoretical & Conceptual', field: 'Science/Research' },
                { id: 'practical', label: 'Practical & Hands-on', field: 'Engineering/Medical' },
                { id: 'creative', label: 'Creative & Experimental', field: 'Arts/Design' },
                { id: 'analytical', label: 'Analytical & Problem-based', field: 'Engineering/IT' },
                { id: 'collaborative', label: 'Group Projects & Discussions', field: 'Management/Business' }
            ]
        },
        {
            id: 'lifestyle',
            question: 'What kind of lifestyle are you aiming for?',
            type: 'single',
            options: [
                { id: 'stable', label: 'Stable & Secure Career', field: 'Medical/Government' },
                { id: 'high-growth', label: 'High Growth & Earnings', field: 'Engineering/IT/Business' },
                { id: 'flexible', label: 'Flexible & Creative Freedom', field: 'Arts/Entrepreneurship' },
                { id: 'impact', label: 'Social Impact & Service', field: 'Social Work/Medicine' },
                { id: 'innovative', label: 'Innovation & Technology', field: 'Engineering/Research' }
            ]
        },
        {
            id: 'percentage',
            question: 'What is your expected 12th percentage/CGPA?',
            type: 'range',
            options: [
                { id: '90+', label: '90% and above', min: 90, max: 100 },
                { id: '80-90', label: '80% - 89%', min: 80, max: 89 },
                { id: '70-80', label: '70% - 79%', min: 70, max: 79 },
                { id: '60-70', label: '60% - 69%', min: 60, max: 69 },
                { id: '50-60', label: '50% - 59%', min: 50, max: 59 }
            ]
        },
        {
            id: 'budget',
            question: 'What is your budget for higher education?',
            type: 'single',
            options: [
                { id: 'low', label: 'Under ₹1 Lakh per year', field: 'Government Colleges' },
                { id: 'medium', label: '₹1-3 Lakhs per year', field: 'Private Colleges' },
                { id: 'high', label: '₹3-5 Lakhs per year', field: 'Premium Colleges' },
                { id: 'premium', label: '₹5+ Lakhs per year', field: 'Top-tier/International' }
            ]
        }
    ];

    const courseRecommendations = {
        'Engineering/IT': [
            { name: 'B.Tech Computer Science', match: 95, salary: '₹6-25 LPA', demand: 'Very High' },
            { name: 'B.Tech Artificial Intelligence', match: 90, salary: '₹8-30 LPA', demand: 'Very High' },
            { name: 'B.Tech Electronics', match: 85, salary: '₹5-20 LPA', demand: 'High' },
            { name: 'BCA', match: 80, salary: '₹4-15 LPA', demand: 'High' }
        ],
        'Medical': [
            { name: 'MBBS', match: 95, salary: '₹8-50 LPA', demand: 'Very High' },
            { name: 'BDS (Dental)', match: 90, salary: '₹6-25 LPA', demand: 'High' },
            { name: 'B.Pharm', match: 85, salary: '₹4-15 LPA', demand: 'High' },
            { name: 'B.Sc Nursing', match: 80, salary: '₹4-12 LPA', demand: 'Very High' }
        ],
        'Science/Research': [
            { name: 'B.Sc Physics', match: 92, salary: '₹4-20 LPA', demand: 'Medium' },
            { name: 'B.Sc Chemistry', match: 88, salary: '₹4-18 LPA', demand: 'Medium' },
            { name: 'B.Sc Mathematics', match: 85, salary: '₹5-22 LPA', demand: 'High' },
            { name: 'B.Sc Biotechnology', match: 82, salary: '₹4-16 LPA', demand: 'High' }
        ],
        'Management/Business': [
            { name: 'BBA', match: 95, salary: '₹4-20 LPA', demand: 'High' },
            { name: 'B.Com', match: 90, salary: '₹3-15 LPA', demand: 'High' },
            { name: 'BMS', match: 85, salary: '₹4-18 LPA', demand: 'Medium' },
            { name: 'B.A Economics', match: 80, salary: '₹4-16 LPA', demand: 'Medium' }
        ],
        'Arts/Design': [
            { name: 'B.Des (Design)', match: 95, salary: '₹4-25 LPA', demand: 'High' },
            { name: 'B.A Psychology', match: 90, salary: '₹4-18 LPA', demand: 'High' },
            { name: 'BFA (Fine Arts)', match: 85, salary: '₹3-15 LPA', demand: 'Medium' },
            { name: 'B.A English', match: 80, salary: '₹3-12 LPA', demand: 'Medium' }
        ]
    };

    const handleAnswer = (questionId, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
        
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            calculateRecommendations();
        }
    };

    const calculateRecommendations = () => {
        const scores = {};
        
        Object.keys(answers).forEach(qId => {
            const answer = answers[qId];
            const question = questions.find(q => q.id === qId);
            
            if (Array.isArray(answer)) {
                answer.forEach(ans => {
                    const option = question.options.find(opt => opt.id === ans);
                    if (option.field) {
                        const fields = option.field.split('/');
                        fields.forEach(field => {
                            scores[field] = (scores[field] || 0) + 10;
                        });
                    }
                });
            } else if (answer) {
                const option = question.options.find(opt => opt.id === answer);
                if (option.field) {
                    const fields = option.field.split('/');
                    fields.forEach(field => {
                        scores[field] = (scores[field] || 0) + 15;
                    });
                }
            }
        });
        
        const topFields = Object.entries(scores)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([field]) => field);
        
        setRecommendations({
            topFields,
            scores,
            recommendedCourses: topFields.flatMap(field => 
                courseRecommendations[field] || []
            ).slice(0, 6)
        });
    };

    const renderQuestion = () => {
        const question = questions[currentStep];
        
        switch(question.type) {
            case 'multi-select':
                return (
                    <div className="space-y-4">
                        {question.options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => {
                                    const currentAnswers = answers[question.id] || [];
                                    const newAnswers = currentAnswers.includes(option.id)
                                        ? currentAnswers.filter(id => id !== option.id)
                                        : [...currentAnswers, option.id];
                                    handleAnswer(question.id, newAnswers);
                                }}
                                className={`w-full text-left p-4 rounded-xl transition-all ${
                                    (answers[question.id] || []).includes(option.id)
                                        ? 'gradient-blue text-white'
                                        : 'glass hover:bg-blue-50'
                                }`}
                            >
                                <div className="flex items-center">
                                    <div className={`w-6 h-6 rounded-md mr-3 flex items-center justify-center ${
                                        (answers[question.id] || []).includes(option.id)
                                            ? 'bg-white/20'
                                            : 'border-2 border-gray-300'
                                    }`}>
                                        {(answers[question.id] || []).includes(option.id) && (
                                            <i className="fas fa-check text-white text-xs"></i>
                                        )}
                                    </div>
                                    <span>{option.label}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                );
                
            case 'single':
                return (
                    <div className="space-y-4">
                        {question.options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleAnswer(question.id, option.id)}
                                className={`w-full text-left p-4 rounded-xl transition-all ${
                                    answers[question.id] === option.id
                                        ? 'gradient-blue text-white'
                                        : 'glass hover:bg-blue-50'
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                );
                
            case 'range':
                return (
                    <div className="space-y-6">
                        {question.options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleAnswer(question.id, option.id)}
                                className={`w-full text-left p-4 rounded-xl transition-all ${
                                    answers[question.id] === option.id
                                        ? 'gradient-blue text-white'
                                        : 'glass hover:bg-blue-50'
                                }`}
                            >
                                <div className="font-medium">{option.label}</div>
                                <div className="text-sm text-gray-500 mt-1">
                                    Suitable for most {option.min}+% cutoff colleges
                                </div>
                            </button>
                        ))}
                    </div>
                );
        }
    };

    if (recommendations) {
        return (
            <div className="glass rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6">Your Career Recommendations</h3>
                
                <div className="mb-8">
                    <h4 className="font-semibold text-lg mb-4">Top Matching Fields:</h4>
                    <div className="flex flex-wrap gap-3 mb-6">
                        {recommendations.topFields.map((field, idx) => (
                            <span key={field} className="px-4 py-2 gradient-blue text-white rounded-full font-medium">
                                {field} {idx === 0 && '👑'}
                            </span>
                        ))}
                    </div>
                </div>
                
                <div className="space-y-6">
                    <h4 className="font-semibold text-lg">Recommended Courses:</h4>
                    {recommendations.recommendedCourses.map((course, idx) => (
                        <div key={idx} className="glass p-4 rounded-xl">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h5 className="font-bold text-lg">{course.name}</h5>
                                    <div className="flex items-center mt-2">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-3" style={{ width: '100px' }}>
                                            <div 
                                                className="bg-green-500 h-2.5 rounded-full" 
                                                style={{ width: `${course.match}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-medium">{course.match}% Match</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-green-600 font-bold">{course.salary}</div>
                                    <div className="text-sm text-gray-600">Avg. Salary</div>
                                </div>
                            </div>
                            <div className="mt-3 text-sm">
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                                    {course.demand} Demand
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="flex gap-4 mt-8">
                    <button 
                        onClick={() => {
                            setCurrentStep(0);
                            setAnswers({});
                            setRecommendations(null);
                        }}
                        className="px-6 py-3 bg-gray-100 rounded-xl font-medium hover:bg-gray-200"
                    >
                        Restart Assessment
                    </button>
                    <button 
                        onClick={() => setCurrentPage('Courses')}
                        className="px-6 py-3 gradient-blue text-white rounded-xl font-medium"
                    >
                        Explore All Courses
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="glass rounded-3xl p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-bold">Career Guidance Assessment</h3>
                    <p className="text-gray-600 mt-2">Answer 7 questions to find your perfect career path</p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-500">Question {currentStep + 1} of {questions.length}</div>
                    <div className="w-48 bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                            className="gradient-blue h-2 rounded-full transition-all duration-500"
                            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>
            
            <div className="mb-8">
                <h4 className="text-xl font-semibold mb-6">{questions[currentStep].question}</h4>
                {renderQuestion()}
            </div>
            
            <div className="flex justify-between">
                {currentStep > 0 && (
                    <button 
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="px-6 py-3 bg-gray-100 rounded-xl font-medium hover:bg-gray-200"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Previous
                    </button>
                )}
                <div></div>
            </div>
        </div>
    );
};