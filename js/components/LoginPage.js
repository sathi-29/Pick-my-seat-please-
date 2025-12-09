const { useState } = React;

const LoginPage = ({ setCurrentPage }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        userType: 'student'
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        if (!isLogin) {
            if (!formData.name) {
                newErrors.name = 'Name is required';
            }
            
            if (!formData.phone) {
                newErrors.phone = 'Phone number is required';
            } else if (!/^\d{10}$/.test(formData.phone)) {
                newErrors.phone = 'Phone number must be 10 digits';
            }
            
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        setTimeout(() => {
            setIsSubmitting(false);
            alert(isLogin ? 'Login successful!' : 'Registration successful!');
            setCurrentPage('Home');
        }, 1500);
    };
    
    const handleSocialLogin = (platform) => {
        alert(`Redirecting to ${platform} login...`);
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
            <div className="max-w-md w-full">
                <div className="glass rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="gradient-blue text-white p-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
                        
                        <div className="relative z-10">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-university text-3xl"></i>
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Welcome to ClgMetta</h2>
                            <p className="text-blue-100">Your college discovery journey starts here</p>
                        </div>
                    </div>
                    
                    {/* Tabs */}
                    <div className="flex p-4 bg-gray-100">
                        <button 
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-3 rounded-lg font-medium transition-all ${isLogin ? 'gradient-blue text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}
                        >
                            <i className="fas fa-sign-in-alt mr-2"></i>
                            Login
                        </button>
                        <button 
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-3 rounded-lg font-medium transition-all ${!isLogin ? 'gradient-blue text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}
                        >
                            <i className="fas fa-user-plus mr-2"></i>
                            Sign Up
                        </button>
                    </div>
                    
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 pt-6">
                        {!isLogin && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        I am a
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['student', 'parent', 'counselor'].map((type) => (
                                            <button
                                                type="button"
                                                key={type}
                                                onClick={() => setFormData({...formData, userType: type})}
                                                className={`py-3 rounded-xl font-medium capitalize ${
                                                    formData.userType === type 
                                                        ? 'gradient-blue text-white' 
                                                        : 'bg-gray-100 hover:bg-gray-200'
                                                }`}
                                            >
                                                <i className={`fas ${
                                                    type === 'student' ? 'fa-user-graduate' :
                                                    type === 'parent' ? 'fa-user-friends' :
                                                    'fa-chalkboard-teacher'
                                                } mr-2`}></i>
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                            {errors.password && <p className="text-red500 text-sm mt-1">{errors.password}</p>}
                        </div>
                        
                        {!isLogin && (
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                            </div>
                        )}
                        
                        {isLogin && (
                            <div className="flex justify-between items-center mb-6">
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span className="text-sm">Remember me</span>
                                </label>
                                <button type="button" className="text-blue-600 text-sm hover:text-blue-800">
                                    Forgot Password?
                                </button>
                            </div>
                        )}
                        
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full gradient-blue text-white py-4 rounded-xl font-semibold text-lg hover:shadow-md transition-all duration-300 ${isSubmitting ? 'opacity-75' : ''}`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                    Processing...
                                </span>
                            ) : (
                                <span>
                                    <i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'} mr-2`}></i>
                                    {isLogin ? 'Login to Account' : 'Create Account'}
                                </span>
                            )}
                        </button>
                        
                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>
                        
                        {/* Social Login */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('Google')}
                                className="py-3 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100"
                            >
                                <i className="fab fa-google mr-2"></i>
                                Google
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('Facebook')}
                                className="py-3 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100"
                            >
                                <i className="fab fa-facebook mr-2"></i>
                                Facebook
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('Microsoft')}
                                className="py-3 bg-gray-50 text-gray-700 rounded-xl font-medium hover:bg-gray-100"
                            >
                                <i className="fab fa-microsoft mr-2"></i>
                                Microsoft
                            </button>
                        </div>
                        
                        {/* Terms and Conditions */}
                        {!isLogin && (
                            <div className="text-center text-sm text-gray-600 mb-6">
                                By signing up, you agree to our{' '}
                                <button type="button" className="text-blue-600 hover:underline">
                                    Terms & Conditions
                                </button>{' '}
                                and{' '}
                                <button type="button" className="text-blue-600 hover:underline">
                                    Privacy Policy
                                </button>
                            </div>
                        )}
                        
                        {/* Back to Home */}
                        <div className="text-center">
                            <button 
                                type="button"
                                onClick={() => setCurrentPage('Home')}
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                <i className="fas fa-arrow-left mr-2"></i> 
                                Back to Home
                            </button>
                        </div>
                    </form>
                </div>
                
                {/* Features */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 glass rounded-xl">
                        <i className="fas fa-shield-alt text-blue-500 text-2xl mb-2"></i>
                        <div className="text-sm font-medium">Secure Login</div>
                    </div>
                    <div className="text-center p-4 glass rounded-xl">
                        <i className="fas fa-bolt text-green-500 text-2xl mb-2"></i>
                        <div className="text-sm font-medium">Instant Access</div>
                    </div>
                    <div className="text-center p-4 glass rounded-xl">
                        <i className="fas fa-heart text-red-500 text-2xl mb-2"></i>
                        <div className="text-sm font-medium">Personalized</div>
                    </div>
                </div>
            </div>
        </div>
    );
};