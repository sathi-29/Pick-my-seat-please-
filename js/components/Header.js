const { useState, useEffect } = React;

const Header = ({ currentPage, setCurrentPage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const menuItems = [
        { name: 'Home', icon: 'fa-home' },
        { name: 'Colleges', icon: 'fa-building-columns' },
        { name: 'Exams', icon: 'fa-file-pen' },
        { name: 'Courses', icon: 'fa-graduation-cap' },
        { name: 'Predictor', icon: 'fa-calculator' },
        { name: 'Tuition', icon: 'fa-chalkboard-teacher' },
        { name: 'Articles', icon: 'fa-newspaper' }
    ];
    
    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-lg' : 'glass'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div 
                        className="flex items-center cursor-pointer group"
                        onClick={() => setCurrentPage('Home')}
                    >
                        <div className="w-12 h-12 gradient-blue rounded-2xl flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform duration-500">
                            <i className="fas fa-university text-white text-2xl"></i>
                        </div>
                        <div>
                            <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                ClgMetta
                            </span>
                            <div className="text-xs text-gray-500 font-medium">Smart College Discovery</div>
                        </div>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex space-x-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => setCurrentPage(item.name)}
                                className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                    currentPage === item.name
                                        ? 'gradient-blue text-white shadow-md'
                                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                                }`}
                            >
                                <i className={`fas ${item.icon} mr-2`}></i>
                                {item.name}
                            </button>
                        ))}
                    </nav>
                    
                    {/* Login Button */}
                    <button
                        onClick={() => setCurrentPage('Login')}
                        className="hidden lg:block gradient-purple text-white px-6 py-3 rounded-xl font-medium hover:shadow-md transition-all duration-300"
                    >
                        <i className="fas fa-user mr-2"></i>
                        Login
                    </button>
                    
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden text-gray-600 p-3 rounded-lg hover:bg-gray-100"
                    >
                        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
                    </button>
                </div>
                
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden glass rounded-2xl p-4 mt-2 shadow-lg animate-slide-in-left">
                        {menuItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => {
                                    setCurrentPage(item.name);
                                    setIsMenuOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 rounded-lg mb-1 flex items-center ${
                                    currentPage === item.name
                                        ? 'gradient-blue text-white'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <i className={`fas ${item.icon} mr-3`}></i>
                                {item.name}
                            </button>
                        ))}
                        <button
                            onClick={() => {
                                setCurrentPage('Login');
                                setIsMenuOpen(false);
                            }}
                            className="w-full gradient-purple text-white px-4 py-3 rounded-lg font-medium mt-2"
                        >
                            <i className="fas fa-user mr-2"></i>
                            Login
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};