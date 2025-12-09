const { useState } = React;

const PredictorPage = ({ setCurrentPage }) => {
    const [activeTool, setActiveTool] = useState('college');
    const [formData, setFormData] = useState({
        exam: '',
        rank: '',
        category: 'General',
        state: 'Karnataka'
    });
    const [predictionResult, setPredictionResult] = useState(null);
    
    const handlePredict = () => {
        if (!formData.exam || !formData.rank) {
            alert('Please fill all required fields');
            return;
        }
        
        // Mock prediction result
        const mockResults = {
            college: [
                { name: 'RV College of Engineering', chance: 'High', cutoff: '2000-5000' },
                { name: 'PES University', chance: 'Medium', cutoff: '1000-3000' },
                { name: 'MS Ramaiah Institute', chance: 'High', cutoff: '3000-6000' },
                { name: 'Dayananda Sagar College', chance: 'Very High', cutoff: '5000-8000' }
            ],
            rank: `Based on your marks, estimated rank: ${Math.floor(Math.random() * 10000) + 1000}`,
            chance: '75% chance of admission in top colleges'
        };
        
        setPredictionResult(mockResults[activeTool]);
    };
    
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 page-transition">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Smart Predictor Tools</h1>
                <p className="text-gray-600 mb-8">AI-powered predictions for better college selection</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                        { id: 'college', title: 'College Predictor', desc: 'Predict colleges based on rank', icon: 'fa-university' },
                        { id: 'rank', title: 'Rank Predictor', desc: 'Estimate rank from score', icon: 'fa-chart-line' },
                        { id: 'chance', title: 'Admission Chance', desc: 'Check admission probability', icon: 'fa-percentage' }
                    ].map((tool) => (
                        <button
                            key={tool.id}
                            onClick={() => {
                                setActiveTool(tool.id);
                                setPredictionResult(null);
                            }}
                            className={`p-6 rounded-2xl text-center hover-lift ${activeTool === tool.id ? 'gradient-blue text-white' : 'glass'}`}
                        >
                            <i className={`fas ${tool.icon} text-3xl mb-3`}></i>
                            <h3 className="font-bold text-xl mb-2">{tool.title}</h3>
                            <p className="text-sm">{tool.desc}</p>
                        </button>
                    ))}
                </div>
                
                <div className="glass rounded-2xl p-8">
                    {activeTool === 'college' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">College Predictor</h2>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-700 mb-2">Select Exam</label>
                                        <select 
                                            className="w-full px-4 py-3 rounded-xl border"
                                            value={formData.exam}
                                            onChange={(e) => setFormData({...formData, exam: e.target.value})}
                                        >
                                            <option value="">Select Exam</option>
                                            <option value="KCET">KCET</option>
                                            <option value="COMEDK">COMEDK</option>
                                            <option value="JEE Main">JEE Main</option>
                                            <option value="NEET">NEET</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">Your Rank</label>
                                        <input
                                            type="number"
                                            className="w-full px-4 py-3 rounded-xl border"
                                            placeholder="Enter your rank"
                                            value={formData.rank}
                                            onChange={(e) => setFormData({...formData, rank: e.target.value})}
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-700 mb-2">Category</label>
                                        <select 
                                            className="w-full px-4 py-3 rounded-xl border"
                                            value={formData.category}
                                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        >
                                            <option value="General">General</option>
                                            <option value="SC">SC</option>
                                            <option value="ST">ST</option>
                                            <option value="OBC">OBC</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">State</label>
                                        <select 
                                            className="w-full px-4 py-3 rounded-xl border"
                                            value={formData.state}
                                            onChange={(e) => setFormData({...formData, state: e.target.value})}
                                        >
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                            <option value="Kerala">Kerala</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={handlePredict}
                                    className="w-full gradient-blue text-white py-4 rounded-xl font-semibold text-lg hover:shadow-md"
                                >
                                    <i className="fas fa-calculator mr-2"></i>
                                    Predict Colleges
                                </button>
                                
                                {predictionResult && (
                                    <div className="mt-8">
                                        <h3 className="text-xl font-bold mb-4">Predicted Colleges</h3>
                                        <div className="space-y-4">
                                            {predictionResult.map((college, idx) => (
                                                <div key={idx} className="glass p-4 rounded-xl">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <h4 className="font-bold">{college.name}</h4>
                                                            <p className="text-sm text-gray-600">Cutoff: {college.cutoff}</p>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded-full ${
                                                            college.chance === 'Very High' ? 'bg-green-100 text-green-800' :
                                                            college.chance === 'High' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {college.chance} Chance
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};