const { useState } = React;

const LoginPage = ({ setCurrentPage }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: ''
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isLogin) {
            // Login logic
            if (formData.email && formData.password) {
                alert('Login successful! Redirecting to home page...');
                setCurrentPage('Home');
            } else {
                alert('Please fill in all fields');
            }
        } else {
            // Signup logic
            if (formData.name && formData.email && formData.phone && formData.password) {
                alert('Account created successfully! Redirecting to home page...');
                setCurrentPage('Home');
            } else {
                alert('Please fill in all fields');
            }
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-accent/5 px-4">
            <div className="max-w-md w-full animate-slide-up">
                <div className="text-center mb-8">
                    <div 
                        className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 cursor-pointer"
                        onClick={() => setCurrentPage('Home')}
                    >
                        <i className="fas fa-graduation-cap text-white text-3xl"></i>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">
                        {isLogin ? 'Welcome Back!' : 'Create Account'}
                    </h2>
                    <p className="text-gray-600 mt-2">
                        {isLogin ? 'Sign in to continue your college discovery journey' : 'Start your college discovery journey'}
                    </p>
                </div>
                
                <div className="glass rounded-3xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required={!isLogin}
                                />
                            </div>
                        )}
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                            />
                        </div>
                        
                        {!isLogin && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    required={!isLogin}
                                />
                            </div>
                        )}
                        
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                required
                            />
                        </div>
                        
                        {isLogin && (
                            <div className="flex items-center justify-between mb-6">
                                <label className="flex items-center">
                                    <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                </label>
                                <button type="button" className="text-sm text-primary hover:underline font-medium">
                                    Forgot Password?
                                </button>
                            </div>
                        )}
                        
                        <button
                            type="submit"
                            className="w-full gradient-primary text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 mb-4"
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                        
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setFormData({
                                        email: '',
                                        password: '',
                                        name: '',
                                        phone: ''
                                    });
                                }}
                                className="text-primary hover:underline font-medium"
                            >
                                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                            </button>
                        </div>
                    </form>
                    
                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>
                        
                        <div className="mt-6 grid grid-cols-3 gap-3">
                            <button className="py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300">
                                <i className="fab fa-google text-red-500 text-xl"></i>
                            </button>
                            <button className="py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300">
                                <i className="fab fa-facebook text-blue-600 text-xl"></i>
                            </button>
                            <button className="py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300">
                                <i className="fab fa-apple text-gray-800 text-xl"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Back to home button */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => setCurrentPage('Home')}
                        className="text-gray-600 hover:text-primary font-medium flex items-center justify-center mx-auto"
                    >
                        <i className="fas fa-arrow-left mr-2"></i>
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};