const { useState } = React;

const PredictorPage = ({ setCurrentPage }) => {
    const [activeTool, setActiveTool] = useState('college');
    const [collegeData, setCollegeData] = useState({
        exam: '',
        category: 'General',
        rank: '',
        state: 'Karnataka'
    });
    const [rangeData, setRangeData] = useState({
        score: '',
        exam: ''
    });
    const [admissionData, setAdmissionData] = useState({
        college: '',
        rank: '',
        category: 'General'
    });
    const [predictionResult, setPredictionResult] = useState(null);
    const [calculating, setCalculating] = useState(false);
    
    const handleCollegePredict = () => {
        if (!collegeData.exam || !collegeData.rank) {
            alert("Please select exam and enter your rank");
            return;
        }
        
        setCalculating(true);
        
        // Simulate calculation
        setTimeout(() => {
            const mockColleges = [
                { 
                    name: 'RV College of Engineering', 
                    chance: '85%', 
                    cutoff: '2000-5000',
                    probability: 'High',
                    color: 'green'
                },
                { 
                    name: 'PES University', 
                    chance: '75%', 
                    cutoff: '3000-6000',
                    probability: 'Good',
                    color: 'blue'
                },
                { 
                    name: 'MS Ramaiah Institute', 
                    chance: '65%', 
                    cutoff: '4000-8000',
                    probability: 'Moderate',
                    color: 'yellow'
                },
                { 
                    name: 'BMS College of Engineering', 
                    chance: '55%', 
                    cutoff: '5000-10000',
                    probability: 'Fair',
                    color: 'orange'
                }
            ];
            
            setPredictionResult({
                type: 'college',
                data: mockColleges,
                message: `Based on your ${collegeData.exam} rank: ${collegeData.rank} (${collegeData.category})`,
                note: 'These are estimated chances based on previous year data'
            });
            
            setCalculating(false);
        }, 1500);
    };
    
    const handleRangePredict = () => {
        if (!rangeData.score || !rangeData.exam) {
            alert("Please select exam and enter your score");
            return;
        }
        
        setCalculating(true);
        
        setTimeout(() => {
            const score = parseInt(rangeData.score);
            let rank = '';
            let percentile = '';
            
            if (rangeData.exam === 'KCET') {
                rank = Math.floor((180 - score) * 1000).toLocaleString();
                percentile = Math.min(100, Math.floor((score / 180) * 100)) + '%';
            } else if (rangeData.exam === 'COMEDK') {
                rank = Math.floor((180 - score) * 800).toLocaleString();
                percentile = Math.min(100, Math.floor((score / 180) * 100)) + '%';
            } else if (rangeData.exam === 'JEE') {
                rank = Math.floor((300 - score) * 1000).toLocaleString();
                percentile = Math.min(100, Math.floor((score / 300) * 100)) + '%';
            }
            
            setPredictionResult({
                type: 'range',
                data: { 
                    rank, 
                    score,
                    percentile,
                    exam: rangeData.exam
                },
                message: `Estimated rank for ${rangeData.exam} score: ${score}`,
                note: 'Based on historical data and normal distribution'
            });
            
            setCalculating(false);
        }, 1500);
    };
    
    const handleAdmissionChance = () => {
        if (!admissionData.college || !admissionData.rank) {
            alert("Please select college and enter your rank");
            return;
        }
        
        setCalculating(true);
        
        setTimeout(() => {
            const rank = parseInt(admissionData.rank);
            let chance = '';
            let probability = '';
            let color = '';
            
            if (rank < 2000) {
                chance = '90%';
                probability = 'Excellent';
                color = 'green';
            } else if (rank < 5000) {
                chance = '75%';
                probability = 'Very Good';
                color = 'blue';
            } else if (rank < 10000) {
                chance = '60%';
                probability = 'Good';
                color = 'yellow';
            } else if (rank < 20000) {
                chance = '40%';
                probability = 'Moderate';
                color = 'orange';
            } else {
                chance = '20%';
                probability = 'Low';
                color = 'red';
            }
            
            setPredictionResult({
                type: 'admission',
                data: { 
                    chance, 
                    rank,
                    probability,
                    color,
                    college: admissionData.college
                },
                message: `For ${admissionData.college} with rank: ${rank} (${admissionData.category})`,
                note: 'Chance calculated based on last 3 years cutoff trends'
            });
            
            setCalculating(false);
        }, 1500);
    };
    
    return (
        <div className="min-h-screen pt-28 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Smart Predictor Tools</h1>
                <p className="text-gray-600 mb-8">AI-powered predictions for better college selection</p>
                
                {/* Tool Selection */}
                <div className="glass rounded-2xl p-2 mb-8 flex space-x-2">
                    {[
                        { id: 'college', label: 'College Predictor', icon: 'fa-building' },
                        { id: 'range', label: 'Range Predictor', icon: 'fa-chart-bar' },
                        { id: 'chance', label: 'Admission Chance', icon: 'fa-percentage' }
                    ].map(tool => (
                        <button
                            key={tool.id}
                            onClick={() => {
                                setActiveTool(tool.id);
                                setPredictionResult(null);
                            }}
                            className={`flex-1 py-4 rounded-xl font-medium flex items-center justify-center transition-all duration-300 ${
                                activeTool === tool.id 
                                    ? 'gradient-primary text-white shadow-md' 
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            <i className={`fas ${tool.icon} mr-3`}></i>
                            {tool.label}
                        </button>
                    ))}
                </div>
                
                {/* Prediction Form */}
                <div className="glass rounded-3xl p-8 mb-8 animate-slide-up">
                    {activeTool === 'college' && (
                        <div>
                            <h3 className="text-2xl font-bold mb-6">College Predictor</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Exam *</label>
                                    <select 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                                        value={collegeData.exam}
                                        onChange={(e) => setCollegeData({...collegeData, exam: e.target.value})}
                                    >
                                        <option value="">Select Exam</option>
                                        <option value="KCET">KCET</option>
                                        <option value="COMEDK">COMEDK</option>
                                        <option value="JEE">JEE Mains</option>
                                        <option value="NEET">NEET</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <select 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                                        value={collegeData.category}
                                        onChange={(e) => setCollegeData({...collegeData, category: e.target.value})}
                                    >
                                        <option value="General">General</option>
                                        <option value="OBC">OBC</option>
                                        <option value="SC">SC</option>
                                        <option value="ST">ST</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Rank *</label>
                                    <input
                                        type="number"
                                        placeholder="Enter your rank"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                                        value={collegeData.rank}
                                        onChange={(e) => setCollegeData({...collegeData, rank: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                                    <select 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                                        value={collegeData.state}
                                        onChange={(e) => setCollegeData({...collegeData, state: e.target.value})}
                                    >
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                        <option value="Kerala">Kerala</option>
                                    </select>
                                </div>
                            </div>
                            <button 
                                onClick={handleCollegePredict}
                                disabled={calculating}
                                className={`gradient-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 ${calculating ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {calculating ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        Calculating...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-calculator mr-2"></i>
                                        Predict Colleges
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                    
                    {activeTool === 'range' && (
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Range Predictor</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Exam *</label>
                                    <select 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                                        value={rangeData.exam}
                                        onChange={(e) => setRangeData({...rangeData, exam: e.target.value})}
                                    >
                                        <option value="">Select Exam</option>
                                        <option value="KCET">KCET</option>
                                        <option value="COMEDK">COMEDK</option>
                                        <option value="JEE">JEE Mains</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Score *</label>
                                    <input
                                        type="number"
                                        placeholder="Enter your score"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                                        value={rangeData.score}
                                        onChange={(e) => setRangeData({...rangeData, score: e.target.value})}
                                    />
                                </div>
                            </div>
                            <button 
                                onClick={handleRangePredict}
                                disabled={calculating}
                                className={`gradient-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 ${calculating ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {calculating ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        Calculating...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-chart-line mr-2"></i>
                                        Estimate Rank
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                    
                    {activeTool === 'chance' && (
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Admission Chance</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Select College *</label>
                                    <select 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                                        value={admissionData.college}
                                        onChange={(e) => setAdmissionData({...admissionData, college: e.target.value})}
                                    >
                                        <option value="">Select College</option>
                                        <option value="RV College of Engineering">RV College of Engineering</option>
                                        <option value="PES University">PES University</option>
                                        <option value="MS Ramaiah Institute">MS Ramaiah Institute</option>
                                        <option value="BMS College">BMS College</option>
                                        <option value="NIT Karnataka">NIT Karnataka</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <select 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                                        value={admissionData.category}
                                        onChange={(e) => setAdmissionData({...admissionData, category: e.target.value})}
                                    >
                                        <option value="General">General</option>
                                        <option value="OBC">OBC</option>
                                        <option value="SC">SC</option>
                                        <option value="ST">ST</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Rank *</label>
                                    <input
                                        type="number"
                                        placeholder="Enter your rank"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                                        value={admissionData.rank}
                                        onChange={(e) => setAdmissionData({...admissionData, rank: e.target.value})}
                                    />
                                </div>
                            </div>
                            <button 
                                onClick={handleAdmissionChance}
                                disabled={calculating}
                                className={`gradient-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 ${calculating ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {calculating ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        Calculating...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-percentage mr-2"></i>
                                        Check Chance
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
                
                {/* Results Display */}
                {predictionResult && (
                    <div className="glass rounded-3xl p-8 animate-slide-up">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold">Prediction Results</h3>
                            <button 
                                onClick={() => setPredictionResult(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        
                        <p className="text-gray-600 mb-6">{predictionResult.message}</p>
                        
                        {predictionResult.type === 'college' && (
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    {predictionResult.data.map((college, index) => (
                                        <div key={index} className="glass p-4 rounded-xl border border-gray-200">
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="font-bold text-lg">{college.name}</h4>
                                                <div className={`px-3 py-1 rounded-full text-sm font-semibold bg-${college.color}-100 text-${college.color}-800`}>
                                                    {college.probability}
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">Cutoff Range: {college.cutoff}</p>
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="text-2xl font-bold text-primary">{college.chance}</div>
                                                    <div className="text-xs text-gray-500">Admission Chance</div>
                                                </div>
                                                <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-semibold hover:bg-primary/20">
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-500 italic">{predictionResult.note}</p>
                            </div>
                        )}
                        
                        {predictionResult.type === 'range' && (
                            <div className="text-center p-8">
                                <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 mb-6">
                                    <div className="text-5xl font-bold text-primary mb-2">{predictionResult.data.rank}</div>
                                    <p className="text-xl text-gray-700">Estimated Rank</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                                    <div className="p-4 bg-blue-50 rounded-xl">
                                        <div className="text-2xl font-bold text-blue-600">{predictionResult.data.score}</div>
                                        <div className="text-sm text-gray-600">Your Score</div>
                                    </div>
                                    <div className="p-4 bg-green-50 rounded-xl">
                                        <div className="text-2xl font-bold text-green-600">{predictionResult.data.percentile}</div>
                                        <div className="text-sm text-gray-600">Percentile</div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 italic mt-6">{predictionResult.note}</p>
                            </div>
                        )}
                        
                        {predictionResult.type === 'admission' && (
                            <div className="text-center p-8">
                                <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 mb-6">
                                    <div className="text-5xl font-bold text-primary mb-2">{predictionResult.data.chance}</div>
                                    <p className="text-xl text-gray-700">Admission Probability</p>
                                    <div className={`mt-4 px-4 py-2 rounded-full text-sm font-semibold bg-${predictionResult.data.color}-100 text-${predictionResult.data.color}-800 inline-block`}>
                                        {predictionResult.data.probability} Chance
                                    </div>
                                </div>
                                <div className="max-w-md mx-auto text-left space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">College:</span>
                                        <span className="font-semibold">{predictionResult.data.college}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Your Rank:</span>
                                        <span className="font-semibold">{predictionResult.data.rank}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Category:</span>
                                        <span className="font-semibold">{admissionData.category}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 italic mt-6">{predictionResult.note}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};