const Footer = ({ setCurrentPage }) => {
    return (
        <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Logo & Description */}
                    <div>
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center mr-3">
                                <i className="fas fa-graduation-cap text-white text-xl"></i>
                            </div>
                            <span className="text-2xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                ClgMetta
                            </span>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Your smart companion for college discovery, admissions, and career guidance.
                        </p>
                        <div className="flex space-x-4">
                            {['fa-twitter', 'fa-facebook', 'fa-instagram', 'fa-linkedin'].map((icon) => (
                                <a 
                                    key={icon}
                                    href="#" 
                                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all duration-300"
                                >
                                    <i className={`fab ${icon}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                    
                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h4>
                        {['Home', 'Colleges', 'Exams', 'Courses'].map((link) => (
                            <button
                                key={link}
                                onClick={() => setCurrentPage(link)}
                                className="block text-gray-600 hover:text-primary mb-2 transition-colors duration-300 text-left"
                            >
                                {link}
                            </button>
                        ))}
                    </div>
                    
                    {/* Resources */}
                    <div>
                        <h4 className="text-lg font-bold text-gray-800 mb-4">Resources</h4>
                        {['Blog', 'Scholarships', 'Ranking', 'FAQs'].map((resource) => (
                            <button
                                key={resource}
                                onClick={() => setCurrentPage('Articles')}
                                className="block text-gray-600 hover:text-primary mb-2 transition-colors duration-300 text-left"
                            >
                                {resource}
                            </button>
                        ))}
                    </div>
                    
                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-bold text-gray-800 mb-4">Stay Updated</h4>
                        <p className="text-gray-600 mb-4">Get college admission updates and tips</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 px-4 py-3 border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                            <button className="gradient-primary text-white px-4 rounded-r-xl font-semibold">
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Bottom Bar */}
                <div className="border-t border-gray-200 pt-8 text-center">
                    <p className="text-gray-600">
                        © 2024 ClgMetta. All rights reserved. | Made with ❤️ for students
                    </p>
                </div>
            </div>
        </footer>
    );
};