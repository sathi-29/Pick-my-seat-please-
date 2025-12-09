const { useState, useEffect } = React;

const TuitionDetailsPage = ({ setCurrentPage, tuitionId }) => {
    const [activeTab, setActiveTab] = useState('overview');
    
    const tuition = window.TUITIONS_DATA ? 
        window.TUITIONS_DATA.find(t => t.id === tuitionId) || window.TUITIONS_DATA[0]
        : {
            name: 'Brilliant Minds Academy',
            type: 'Offline',
            rating: 4.8
        };
    
    useEffect(() => {
        if (window.L && document.getElementById('tuition-map') && tuition.coordinates) {
            const map = L.map('tuition-map').setView(tuition.coordinates, 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            L.marker(tuition.coordinates).addTo(map)
                .bindPopup(`<b>${tuition.name}</b>`)
                .openPopup();
        }
    }, [tuition]);
    
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 page-transition">
            <div className="max-w-7xl mx-auto">
                <button onClick={() => setCurrentPage('Tuition')} className="flex items-center text-blue-600 mb-8">
                    <i className="fas fa-arrow-left mr-2"></i> Back to Tuition Centers
                </button>
                
                <div className="glass rounded-3xl p-8 mb-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">{tuition.name}</h1>
                            <div className="flex items-center">
                                <span className={`px-4 py-2 rounded-full font-medium mr-4 ${
                                    tuition.type === 'Offline' ? 'bg-blue-100 text-blue-800' :
                                    tuition.type === 'Online' ? 'bg-purple-100 text-purple-800' :
                                    'bg-green-100 text-green-800'
                                }`}>
                                    {tuition.type}
                                </span>
                                <div className="flex items-center">
                                    <i className="fas fa-star text-yellow-500 mr-1"></i>
                                    <span className="font-bold">{tuition.rating}</span>
                                    <span className="text-gray-500 text-sm ml-1">({tuition.reviews} reviews)</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 lg:mt-0">
                            <button className="gradient-blue text-white px-6 py-3 rounded-xl font-semibold">
                                <i className="fas fa-phone mr-2"></i>
                                Contact Now
                            </button>
                        </div>
                    </div>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 p-4 rounded-xl">
                            <div className="text-sm text-blue-600 font-medium">Fees</div>
                            <div className="text-2xl font-bold">{tuition.fees}</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl">
                            <div className="text-sm text-green-600 font-medium">Success Rate</div>
                            <div className="text-2xl font-bold">{tuition.successRate || '92%'}</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-xl">
                            <div className="text-sm text-purple-600 font-medium">Students Placed</div>
                            <div className="text-2xl font-bold">{tuition.studentsPlaced || '5000+'}</div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-xl">
                            <div className="text-sm text-orange-600 font-medium">Established</div>
                            <div className="text-2xl font-bold">{tuition.established || '2010'}</div>
                        </div>
                    </div>
                </div>
                
                {/* Tabs */}
                <div className="glass rounded-2xl p-6 mb-8">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {['overview', 'courses', 'faculty', 'facilities', 'reviews', 'location'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-xl font-semibold capitalize ${activeTab === tab ? 'gradient-blue text-white' : 'hover:bg-gray-100'}`}
                            >
                                {tab.replace('-', ' ')}
                            </button>
                        ))}
                    </div>
                    
                    {/* Tab Content */}
                    <div className="min-h-[400px]">
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div className="glass p-6 rounded-xl">
                                    <h4 className="font-bold text-lg mb-3">About {tuition.name}</h4>
                                    <p className="text-gray-700 leading-relaxed">
                                        {tuition.name} is one of the premier coaching institutes specializing in 
                                        competitive exam preparation. With a track record of producing top rankers 
                                        and a comprehensive teaching methodology, it has established itself as a 
                                        trusted name in the education sector.
                                    </p>
                                </div>
                                
                                <div>
                                    <h4 className="font-bold text-lg mb-4">Courses Offered</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {tuition.subjects?.map((subject, idx) => (
                                            <div key={idx} className="glass p-4 rounded-xl">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 gradient-blue rounded-lg flex items-center justify-center mr-3">
                                                        <i className="fas fa-book text-white"></i>
                                                    </div>
                                                    <span className="font-medium">{subject}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'faculty' && (
                            <div>
                                <h3 className="text-2xl font-bold mb-6">Our Expert Faculty</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {(tuition.faculty || [
                                        { name: 'Dr. Rajesh Kumar', qualification: 'PhD IIT Delhi', experience: '15+ years' },
                                        { name: 'Ms. Priya Sharma', qualification: 'M.Tech IISc', experience: '10+ years' },
                                        { name: 'Mr. Vikram Singh', qualification: 'M.Sc IIT Bombay', experience: '12+ years' }
                                    ]).map((teacher, idx) => (
                                        <div key={idx} className="glass p-6 rounded-xl text-center">
                                            <div className="w-20 h-20 gradient-blue rounded-full flex items-center justify-center mx-auto mb-4">
                                                <i className="fas fa-user-graduate text-white text-2xl"></i>
                                            </div>
                                            <h5 className="font-bold text-lg">{teacher.name}</h5>
                                            <p className="text-blue-600 text-sm mt-1">{teacher.qualification}</p>
                                            <p className="text-gray-600 text-sm mt-2">
                                                <i className="fas fa-clock mr-1"></i>
                                                {teacher.experience} Experience
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'facilities' && (
                            <div>
                                <h3 className="text-2xl font-bold mb-6">Facilities</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {(tuition.facilities || [
                                        'Air Conditioned Classrooms',
                                        'Digital Library',
                                        'Test Series',
                                        'Doubt Sessions',
                                        'Online Portal',
                                        'Study Material',
                                        'Mock Interviews',
                                        'Career Counseling'
                                    ]).map((facility, idx) => (
                                        <div key={idx} className="glass p-4 rounded-xl text-center">
                                            <div className="w-12 h-12 gradient-green rounded-lg flex items-center justify-center mx-auto mb-3">
                                                <i className="fas fa-check text-white"></i>
                                            </div>
                                            <p className="text-sm font-medium">{facility}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'location' && (
                            <div>
                                <h3 className="text-2xl font-bold mb-6">Location</h3>
                                <div id="tuition-map" className="map-container mb-4"></div>
                                <div className="mt-4 space-y-3">
                                    <div className="flex items-center">
                                        <i className="fas fa-map-marker-alt text-red-500 mr-3 w-5"></i>
                                        <span>{tuition.address || '123 MG Road, Bengaluru'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-phone text-blue-500 mr-3 w-5"></i>
                                        <span>{tuition.contact || '+91 9876543210'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-envelope text-green-500 mr-3 w-5"></i>
                                        <span>{tuition.email || 'contact@example.com'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-clock text-purple-500 mr-3 w-5"></i>
                                        <span>{tuition.timing || 'Weekdays: 4 PM - 8 PM, Weekends: 9 AM - 6 PM'}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'reviews' && (
                            <div>
                                <h3 className="text-2xl font-bold mb-6">Student Reviews</h3>
                                <div className="space-y-6">
                                    {(tuition.reviewsList || [
                                        { name: 'Aarav Patel', rating: 5, comment: 'Excellent teaching methodology', date: '2024-01-10' },
                                        { name: 'Sneha Reddy', rating: 4, comment: 'Good infrastructure but fees are high', date: '2024-01-05' },
                                        { name: 'Rohit Verma', rating: 5, comment: 'Best faculty for JEE preparation', date: '2024-01-01' }
                                    ]).map((review, idx) => (
                                        <div key={idx} className="glass p-6 rounded-xl">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h5 className="font-bold">{review.name}</h5>
                                                    <div className="flex items-center mt-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <i 
                                                                key={i} 
                                                                className={`fas fa-star ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'} mr-1`}
                                                            ></i>
                                                        ))}
                                                    </div>
                                                </div>
                                                <span className="text-sm text-gray-500">{review.date}</span>
                                            </div>
                                            <p className="text-gray-700">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Batch Information */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-2xl font-bold mb-6">Batch Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="glass p-6 rounded-xl">
                            <h4 className="font-bold mb-3">Regular Batch</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Duration</span>
                                    <span className="font-medium">12 Months</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Classes</span>
                                    <span className="font-medium">Daily 3 hours</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Fees</span>
                                    <span className="font-bold text-green-600">{tuition.fees}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="glass p-6 rounded-xl">
                            <h4 className="font-bold mb-3">Crash Course</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Duration</span>
                                    <span className="font-medium">3 Months</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Classes</span>
                                    <span className="font-medium">Daily 5 hours</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Fees</span>
                                    <span className="font-bold text-green-600">₹25,000</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="glass p-6 rounded-xl">
                            <h4 className="font-bold mb-3">Weekend Batch</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Duration</span>
                                    <span className="font-medium">Weekends Only</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Classes</span>
                                    <span className="font-medium">Sat-Sun 6 hours</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Fees</span>
                                    <span className="font-bold text-green-600">₹12,000/month</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};