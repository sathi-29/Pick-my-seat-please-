const { useState, useEffect } = React;

const HomePage = ({ setCurrentPage }) => {
    const [showQuiz, setShowQuiz] = useState(false);
    const [animatedStats, setAnimatedStats] = useState({
        students: 0,
        colleges: 0,
        success: 0,
        scholarships: 0
    });
    
    useEffect(() => {
        // Animate statistics
        const animateValue = (start, end, duration, setter) => {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const value = Math.floor(progress * (end - start) + start);
                setter(value);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        };
        
        // Start animations
        animateValue(0, 50000, 2000, (val) => {
            setAnimatedStats(prev => ({...prev, students: val}));
        });
        
        const collegesCount = window.COLLEGES_DATA ? window.COLLEGES_DATA.length : 15;
        animateValue(0, collegesCount, 1500, (val) => {
            setAnimatedStats(prev => ({...prev, colleges: val}));
        });
        
        animateValue(0, 92, 1800, (val) => {
            setAnimatedStats(prev => ({...prev, success: val}));
        });
        
        // Scholarships count
        const scholarshipsCount = window.SCHOLARSHIPS_DATA ? window.SCHOLARSHIPS_DATA.length : 15;
        animateValue(0, scholarshipsCount, 2000, (val) => {
            setAnimatedStats(prev => ({...prev, scholarships: val}));
        });
    }, []);
    
    // Render statistics
    const statistics = [
        { 
            value: animatedStats.students.toLocaleString() + "+", 
            label: "Students Helped", 
            color: "text-primary",
            icon: "👨‍🎓"
        },
        { 
            value: animatedStats.colleges + "+", 
            label: "Colleges Listed", 
            color: "text-secondary",
            icon: "🏛️"
        },
        { 
            value: animatedStats.success + "%", 
            label: "Success Rate", 
            color: "text-accent",
            icon: "✨"
        },
        { 
            value: animatedStats.scholarships + "+", 
            label: "Scholarships", 
            color: "text-green-600",
            icon: "💰"
        }
    ];
    
    return (
        <div className="min-h-screen">
            {/* Animated Background */}
            <AnimatedBackground />
            
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4 py-20 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="animate-slide-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 mb-6">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                <span className="text-sm font-medium text-gray-600">AI-Powered College Discovery</span>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                    Find Your Perfect
                                </span>
                                <br />
                                <span className="text-gray-800">College Match</span>
                            </h1>
                            
                            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                                Get personalized college recommendations, discover scholarships, 
                                chat with seniors, and create your action plan—all in one place.
                            </p>
                            
                            <div className="flex flex-wrap gap-4 mb-12">
                                <button 
                                    onClick={() => setCurrentPage('Colleges')}
                                    className="group relative overflow-hidden rounded-xl"
                                >
                                    <div className="absolute inset-0 gradient-primary"></div>
                                    <div className="relative px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 group-hover:border-white/40 rounded-xl font-semibold text-white transition-all duration-300 group-hover:scale-105">
                                        Explore Colleges
                                        <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                                    </div>
                                </button>
                                
                                <button 
                                    onClick={() => setShowQuiz(true)}
                                    className="group px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-lg"
                                >
                                    <i className="fas fa-bolt mr-2"></i>
                                    Take Quick Quiz
                                </button>
                            </div>
                            
                            {/* Statistics - FIXED */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                                {statistics.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color} animate-count`}>
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-gray-600">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Right - Illustration */}
                        <div className="animate-slide-in-right">
                            <div className="glass rounded-3xl p-8 shadow-2xl">
                                <div className="relative h-96 flex items-center justify-center">
                                    <div className="absolute top-8 left-8 floating-element">
                                        <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center">
                                            <i className="fas fa-graduation-cap text-white text-3xl"></i>
                                        </div>
                                    </div>
                                    <div className="absolute top-24 right-12 floating-element">
                                        <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center">
                                            <i className="fas fa-chart-line text-white text-2xl"></i>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-12 left-16 floating-element">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                                            <i className="fas fa-check text-white text-lg"></i>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-6xl mb-4">🎓</div>
                                        <h3 className="text-2xl font-bold text-gray-800">Start Your Journey</h3>
                                        <p className="text-gray-600 mt-2">Find your perfect college match</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Quick Quiz Section */}
            {showQuiz ? (
                <div className="max-w-4xl mx-auto px-4 py-12 animate-slide-up">
                    <CareerQuiz setCurrentPage={setCurrentPage} />
                </div>
            ) : (
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            How It <span className="text-primary">Works</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Your journey to the perfect college in four simple steps
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: 'fa-brain', title: 'Quick Quiz', desc: '60-second personality assessment', color: 'from-primary to-secondary' },
                            { icon: 'fa-filter', title: 'Smart Match', desc: 'AI-powered college suggestions', color: 'from-accent to-blue-500' },
                            { icon: 'fa-comments', title: 'Connect', desc: 'Chat with verified seniors', color: 'from-purple-500 to-pink-500' },
                            { icon: 'fa-calendar-check', title: 'Action Plan', desc: 'Personalized timeline & checklist', color: 'from-green-500 to-emerald-500' }
                        ].map((step, idx) => (
                            <div 
                                key={idx} 
                                className="group relative animate-slide-up"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="relative z-10 glass rounded-2xl p-8 card-hover">
                                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${step.color} group-hover:scale-110 transition-transform duration-500`}>
                                        <i className={`fas ${step.icon} text-white text-2xl`}></i>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                    <p className="text-gray-600">{step.desc}</p>
                                </div>
                                <div className="absolute -inset-4 bg-gradient-to-br from-gray-100 to-white rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center mt-12">
                        <button 
                            onClick={() => setShowQuiz(true)}
                            className="group relative overflow-hidden rounded-xl px-12 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <span className="relative z-10 flex items-center">
                                Start Your Journey
                                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>
                </div>
            )}
            
            {/* Scholarships Preview Section */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Financial <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">Support</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover scholarships and financial aid opportunities to fund your education
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {[
                        {
                            icon: 'fa-award',
                            title: 'Government Scholarships',
                            count: '25+',
                            desc: 'Central and state government funded scholarships',
                            color: 'from-blue-500 to-cyan-500'
                        },
                        {
                            icon: 'fa-building',
                            title: 'Private Scholarships',
                            count: '50+',
                            desc: 'Corporate and foundation scholarships',
                            color: 'from-purple-500 to-pink-500'
                        },
                        {
                            icon: 'fa-hand-holding-usd',
                            title: 'Full Funding',
                            count: '15+',
                            desc: 'Complete tuition and living expense coverage',
                            color: 'from-green-500 to-emerald-600'
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="glass p-8 rounded-2xl card-hover">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${item.color}`}>
                                <i className={`fas ${item.icon} text-white text-2xl`}></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <div className="text-3xl font-bold text-gray-800 mb-2">{item.count}</div>
                            <p className="text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
                
                <div className="text-center">
                    <button 
                        onClick={() => setCurrentPage('Scholarships')}
                        className="group relative overflow-hidden rounded-xl px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        <span className="relative z-10 flex items-center">
                            Explore Scholarships
                            <i className="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </div>
            </div>
            
            {/* Success Stories Section */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Student <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Success Stories</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        See how ClgMetta helped students achieve their dreams
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            name: 'Rahul Sharma',
                            college: 'RV College of Engineering',
                            achievement: 'Received ₹2,00,000 scholarship',
                            image: '👨‍💻',
                            quote: 'ClgMetta helped me find the perfect college and scholarship!',
                            color: 'from-blue-100 to-blue-50'
                        },
                        {
                            name: 'Priya Patel',
                            college: 'Christ University',
                            achievement: '95% placement assistance',
                            image: '👩‍🎓',
                            quote: 'The senior chat feature gave me real insights about campus life.',
                            color: 'from-purple-100 to-purple-50'
                        },
                        {
                            name: 'Amit Kumar',
                            college: 'PES University',
                            achievement: 'Personalized action plan',
                            image: '👨‍🔧',
                            quote: 'The 60-second quiz accurately predicted my ideal stream!',
                            color: 'from-green-100 to-green-50'
                        }
                    ].map((student, idx) => (
                        <div key={idx} className="glass p-8 rounded-2xl card-hover">
                            <div className={`absolute inset-0 ${student.color} rounded-2xl opacity-50`}></div>
                            <div className="relative z-10">
                                <div className="flex items-center mb-6">
                                    <div className="text-4xl mr-4">{student.image}</div>
                                    <div>
                                        <h4 className="text-xl font-bold">{student.name}</h4>
                                        <p className="text-gray-600 text-sm">{student.college}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-6 italic">"{student.quote}"</p>
                                <div className="px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg inline-block">
                                    <span className="text-primary font-semibold">{student.achievement}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Call to Action */}
            <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">
                        Ready to Find Your Perfect College?
                    </h2>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        Join thousands of students who found their dream colleges with ClgMetta
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => setCurrentPage('Colleges')}
                            className="px-12 py-4 gradient-primary text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <i className="fas fa-building-columns mr-2"></i>
                            Browse Colleges
                        </button>
                        
                        <button 
                            onClick={() => setCurrentPage('Scholarships')}
                            className="px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <i className="fas fa-award mr-2"></i>
                            Explore Scholarships
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};