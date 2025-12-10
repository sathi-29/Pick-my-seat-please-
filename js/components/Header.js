const { useState, useEffect } = React;

const Header = ({ currentPage, setCurrentPage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const menuItems = [
        { name: 'Home', icon: 'fa-house' },
        { name: 'Colleges', icon: 'fa-building-columns' },
        { name: 'Exams', icon: 'fa-file-pen' },
        { name: 'Courses', icon: 'fa-graduation-cap' },
        { name: 'Predictor', icon: 'fa-chart-line' },
        { name: 'Tuition', icon: 'fa-chalkboard-user' },
        { name: 'Articles', icon: 'fa-newspaper' }
    ];
    
    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-lg py-2' : 'glass py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div 
                        className="flex items-center cursor-pointer group"
                        onClick={() => setCurrentPage('Home')}
                    >
                        <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform duration-500">
                            <i className="fas fa-graduation-cap text-white text-2xl"></i>
                        </div>
                        <div>
                            <span className="text-3xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                ClgMetta
                            </span>
                            <div className="text-xs text-gray-500 font-medium">
                                Smart College Discovery
                            </div>
                        </div>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex space-x-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => setCurrentPage(item.name)}
                                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                    currentPage === item.name
                                        ? 'gradient-primary text-white shadow-md'
                                        : 'text-gray-600 hover:bg-primary/5 hover:text-primary'
                                }`}
                            >
                                <i className={`fas ${item.icon} mr-2`}></i>
                                {item.name}
                            </button>
                        ))}
                    </nav>
                    
                    {/* Login Button */}
                    <div className="hidden lg:flex items-center">
                        <button
                            onClick={() => setCurrentPage('Login')}
                            className="gradient-primary text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                        >
                            <i className="fas fa-user mr-2"></i>
                            Login
                        </button>
                    </div>
                    
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
                    <div className="lg:hidden glass rounded-2xl p-4 mt-2 shadow-lg animate-slide-up">
                        {menuItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => {
                                    setCurrentPage(item.name);
                                    setIsMenuOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 rounded-lg mb-1 flex items-center ${
                                    currentPage === item.name
                                        ? 'gradient-primary text-white'
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
                            className="w-full gradient-primary text-white px-4 py-3 rounded-lg font-semibold mt-2"
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