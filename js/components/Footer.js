const Footer = ({ setCurrentPage }) => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center mr-3">
                                <i className="fas fa-university text-white"></i>
                            </div>
                            <span className="text-xl font-bold">ClgMetta</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Your comprehensive platform for college discovery, exam preparation, and career guidance.
                        </p>
                    </div>
                    
                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            {['Home', 'Colleges', 'Exams', 'Courses'].map((page) => (
                                <li key={page}>
                                    <button onClick={() => setCurrentPage(page)} className="hover:text-white">
                                        {page}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="flex items-center">
                                <i className="fas fa-envelope mr-2"></i>
                                support@clgmetta.com
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-phone mr-2"></i>
                                +91 9876543210
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-map-marker-alt mr-2"></i>
                                Bengaluru, Karnataka
                            </li>
                        </ul>
                    </div>
                    
                    {/* Newsletter */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
                        <p className="text-gray-400 text-sm mb-3">Subscribe for updates</p>
                        <div className="flex">
                            <input 
                                type="email" 
                                placeholder="Your email"
                                className="flex-1 px-3 py-2 rounded-l-lg text-gray-900 text-sm"
                            />
                            <button className="gradient-blue px-4 py-2 rounded-r-lg text-sm font-medium">
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; {currentYear} ClgMetta. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};