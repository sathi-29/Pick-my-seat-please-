const { useState, useEffect } = React;

const CollegeDetailsPage = ({ setCurrentPage, collegeId }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedSeats, setSelectedSeats] = useState([]);
    
    const college = window.COLLEGES_DATA ? 
        window.COLLEGES_DATA.find(c => c.id === collegeId) || window.COLLEGES_DATA[0] 
        : {
            name: 'RV College of Engineering',
            location: 'Bengaluru, Karnataka',
            rating: 4.7,
            fees: '₹3.2L/year',
            cutoff: 'KCET: 2000-5000',
            placement: '92%',
            avgPackage: '₹8.5 LPA',
            highestPackage: '₹45 LPA',
            image: '🏛️',
            verified: { trustScore: 92 },
            founded: '1963',
            type: 'Private Autonomous',
            ranking: '#15 Engineering College in India',
            campusSize: '52 acres',
            address: 'Mysore Road, Bengaluru, Karnataka',
            contact: '080-6717 8021',
            website: 'https://rvce.edu.in',
            reviews: [
                { id: 1, name: 'Rahul Sharma', rating: 5, date: '2024-01-15', comment: 'Excellent infrastructure and faculty' },
                { id: 2, name: 'Priya Patel', rating: 4, date: '2024-01-10', comment: 'Good placement records, but strict rules' },
                { id: 3, name: 'Amit Kumar', rating: 5, date: '2024-01-05', comment: 'Best decision of my life to join this college' }
            ],
            highlights: [
                'NAAC A++ Accredited',
                'ISO Certified',
                'NBA Accredited Programs',
                'Industry Collaborations',
                '52 Acre Campus',
                '95% Placement Rate',
                'International Tie-ups',
                'Research Centers'
            ]
        };
    
    const generateSeats = () => {
        const seats = [];
        let seatNumber = 1;
        
        const managementTotal = college.seats?.management || 600;
        const managementAvailable = college.seats?.available?.management || 150;
        
        for (let i = 0; i < managementTotal; i++) {
            seats.push({
                id: `M${seatNumber}`,
                type: 'management',
                status: seatNumber <= managementAvailable ? 'available' : 'booked',
                price: college.type === 'Government' ? '₹1,00,000' : '₹5,00,000'
            });
            seatNumber++;
        }
        
        const govtTotal = college.seats?.government || 1200;
        const govtAvailable = college.seats?.available?.government || 400;
        
        for (let i = 0; i < govtTotal; i++) {
            seats.push({
                id: `G${seatNumber}`,
                type: 'government',
                status: seatNumber <= govtAvailable ? 'available' : 'booked',
                price: '₹2,50,000'
            });
            seatNumber++;
        }
        
        return seats;
    };
    
    const seats = generateSeats();
    
    const handleSeatClick = (seat) => {
        if (seat.status !== 'available') return;
        
        if (selectedSeats.includes(seat.id)) {
            setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
        } else {
            if (selectedSeats.length < 5) {
                setSelectedSeats([...selectedSeats, seat.id]);
            }
        }
    };
    
    useEffect(() => {
        // Initialize map
        const initMap = () => {
            if (window.L && document.getElementById('college-map')) {
                // Default coordinates for Bangalore
                const coords = college.coordinates || [12.9716, 77.5946];
                
                const map = L.map('college-map').setView(coords, 15);
                
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors',
                    maxZoom: 19
                }).addTo(map);
                
                L.marker(coords)
                    .addTo(map)
                    .bindPopup(`<b>${college.name}</b><br>${college.location || 'Bengaluru, Karnataka'}`)
                    .openPopup();
                
                // Add circle around college
                L.circle(coords, {
                    color: '#4f46e5',
                    fillColor: '#6366f1',
                    fillOpacity: 0.2,
                    radius: 500
                }).addTo(map);
            }
        };
        
        // Load Leaflet CSS if not loaded
        if (!document.querySelector('link[href*="leaflet"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);
        }
        
        // Load Leaflet JS if not loaded
        if (!window.L) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.onload = initMap;
            document.head.appendChild(script);
        } else {
            initMap();
        }
        
        return () => {
            // Cleanup map
            const mapContainer = document.getElementById('college-map');
            if (mapContainer) {
                mapContainer.innerHTML = '';
            }
        };
    }, [college]);
    
    return (
        <div className="min-h-screen pt-28 pb-16 px-4 page-transition">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => setCurrentPage('Colleges')}
                    className="flex items-center text-primary mb-8 hover:text-primary/80 transition-colors duration-300"
                >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back to Colleges
                </button>
                
                {/* College Header */}
                <div className="bg-white rounded-3xl p-8 mb-8 shadow-lg border border-gray-200">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">{college.name}</h1>
                            <div className="flex items-center text-gray-600 flex-wrap gap-2">
                                <i className="fas fa-map-marker-alt text-red-500 mr-2"></i>
                                {college.location}
                                <span className="mx-2">•</span>
                                <div className="flex items-center">
                                    <i className="fas fa-star text-yellow-500 mr-1"></i>
                                    <span className="font-bold">{college.rating}</span>
                                    <span className="text-gray-500 text-sm ml-1">/5.0</span>
                                </div>
                                {college.verified && (
                                    <span className="ml-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                        <i className="fas fa-check-circle mr-1"></i>Trust Score: {college.verified.trustScore}%
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="mt-4 lg:mt-0 flex space-x-3">
                            <button className="gradient-primary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                                <i className="fas fa-download mr-2"></i>
                                Brochure
                            </button>
                            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300">
                                <i className="fas fa-heart mr-2 text-red-500"></i>
                                Save
                            </button>
                        </div>
                    </div>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                            <div className="text-sm text-blue-600 font-medium mb-1">Annual Fees</div>
                            <div className="text-2xl font-bold text-gray-800">{college.fees}</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                            <div className="text-sm text-green-600 font-medium mb-1">Placement Rate</div>
                            <div className="text-2xl font-bold text-gray-800">{college.placement}</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                            <div className="text-sm text-purple-600 font-medium mb-1">Avg Package</div>
                            <div className="text-2xl font-bold text-gray-800">{college.avgPackage}</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                            <div className="text-sm text-orange-600 font-medium mb-1">Highest Package</div>
                            <div className="text-2xl font-bold text-gray-800">{college.highestPackage}</div>
                        </div>
                    </div>
                </div>
                
                {/* Tabs */}
                <div className="bg-white rounded-3xl p-8 mb-8 shadow-lg border border-gray-200">
                    <div className="flex flex-wrap gap-2 mb-8">
                        {['overview', 'highlights', 'reviews', 'seat-booking', 'location', 'facilities'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-xl font-semibold capitalize transition-all duration-300 ${
                                    activeTab === tab 
                                        ? 'gradient-primary text-white shadow-md' 
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                                }`}
                            >
                                {tab.replace('-', ' ')}
                            </button>
                        ))}
                    </div>
                    
                    {/* Tab Content */}
                    <div className="min-h-[400px]">
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">About {college.name}</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {college.name} is a premier institution located in {college.location}. 
                                    Established in {college.founded || '1963'}, it has consistently ranked among the top colleges 
                                    in the region with excellent placement records and state-of-the-art infrastructure.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="font-bold text-lg mb-4">College Details</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                    <i className="fas fa-calendar text-blue-600"></i>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-500">Established</div>
                                                    <div className="font-medium">{college.founded || '1963'}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                                    <i className="fas fa-university text-green-600"></i>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-500">Type</div>
                                                    <div className="font-medium">{college.type}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                                    <i className="fas fa-ranking-star text-purple-600"></i>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-500">Ranking</div>
                                                    <div className="font-medium">{college.ranking || 'Top 20 in Karnataka'}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                                    <i className="fas fa-expand text-orange-600"></i>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-500">Campus Size</div>
                                                    <div className="font-medium">{college.campusSize || '50+ acres'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-bold text-lg mb-4">Courses Offered</h4>
                                        <div className="space-y-2">
                                            {['B.Tech Computer Science', 'B.Tech Electronics', 'B.Tech Mechanical', 'MBA', 'MCA'].map((course, idx) => (
                                                <div key={idx} className="flex items-center">
                                                    <i className="fas fa-graduation-cap text-primary mr-3"></i>
                                                    <span>{course}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'highlights' && (
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Key Highlights</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {college.highlights?.map((highlight, idx) => (
                                        <div key={idx} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:border-primary/50 transition-all duration-300">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center mr-3">
                                                    <i className="fas fa-star text-primary"></i>
                                                </div>
                                                <span className="font-medium">{highlight}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Additional Information */}
                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
                                        <h4 className="font-bold text-lg mb-3 flex items-center">
                                            <i className="fas fa-trophy text-blue-600 mr-2"></i>
                                            Accreditations
                                        </h4>
                                        <ul className="space-y-2">
                                            <li className="flex items-center">
                                                <i className="fas fa-check text-green-500 mr-2"></i>
                                                NAAC A++ Accredited
                                            </li>
                                            <li className="flex items-center">
                                                <i className="fas fa-check text-green-500 mr-2"></i>
                                                NBA Accredited Programs
                                            </li>
                                            <li className="flex items-center">
                                                <i className="fas fa-check text-green-500 mr-2"></i>
                                                ISO 9001:2015 Certified
                                            </li>
                                        </ul>
                                    </div>
                                    
                                    <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
                                        <h4 className="font-bold text-lg mb-3 flex items-center">
                                            <i className="fas fa-handshake text-green-600 mr-2"></i>
                                            Industry Collaborations
                                        </h4>
                                        <ul className="space-y-2">
                                            <li className="flex items-center">
                                                <i className="fas fa-industry text-green-500 mr-2"></i>
                                                IBM Center of Excellence
                                            </li>
                                            <li className="flex items-center">
                                                <i className="fas fa-industry text-green-500 mr-2"></i>
                                                Microsoft Innovation Center
                                            </li>
                                            <li className="flex items-center">
                                                <i className="fas fa-industry text-green-500 mr-2"></i>
                                                Infosys Campus Connect
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'reviews' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-800">Student Reviews</h3>
                                    <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium">
                                        <i className="fas fa-plus mr-2"></i>
                                        Add Review
                                    </button>
                                </div>
                                
                                {/* Overall Rating */}
                                <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 mb-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-3xl font-bold text-gray-800 mb-1">{college.rating}</div>
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <i key={i} className={`fas fa-star ${i < Math.floor(college.rating) ? 'text-yellow-500' : 'text-gray-300'}`}></i>
                                                ))}
                                            </div>
                                            <div className="text-sm text-gray-600 mt-2">Based on {college.reviews?.length || 120}+ reviews</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-semibold text-gray-800">Excellent</div>
                                            <div className="text-sm text-gray-600">Overall Experience</div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Reviews List */}
                                <div className="space-y-4">
                                    {(college.reviews || []).map((review) => (
                                        <div key={review.id} className="border border-gray-200 rounded-xl p-6 hover:border-primary/50 transition-all duration-300">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <div className="font-bold text-gray-800">{review.name}</div>
                                                    <div className="text-sm text-gray-600">{review.date}</div>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="flex items-center mr-2">
                                                        {[...Array(5)].map((_, i) => (
                                                            <i key={i} className={`fas fa-star ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'} text-sm`}></i>
                                                        ))}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700">{review.rating}.0</span>
                                                </div>
                                            </div>
                                            <p className="text-gray-700">{review.comment}</p>
                                            <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                                                <button className="text-primary hover:text-primary/80 text-sm font-medium mr-4">
                                                    <i className="fas fa-thumbs-up mr-1"></i> Helpful
                                                </button>
                                                <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                                                    <i className="fas fa-flag mr-1"></i> Report
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'seat-booking' && (
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Seat Availability & Booking</h3>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Seat Layout */}
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <div>
                                                <h4 className="font-bold text-lg">Select Seats</h4>
                                                <p className="text-sm text-gray-600">Click on available seats to select</p>
                                            </div>
                                            <div className="text-sm">
                                                <span className="inline-flex items-center mr-4">
                                                    <div className="w-4 h-4 bg-blue-200 border-2 border-blue-400 mr-2 rounded"></div>
                                                    Available
                                                </span>
                                                <span className="inline-flex items-center mr-4">
                                                    <div className="w-4 h-4 bg-gray-200 border-2 border-gray-400 mr-2 rounded"></div>
                                                    Booked
                                                </span>
                                                <span className="inline-flex items-center">
                                                    <div className="w-4 h-4 bg-primary mr-2 rounded"></div>
                                                    Selected
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Seat Grid */}
                                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                            <div className="grid grid-cols-10 gap-2">
                                                {seats.slice(0, 100).map((seat) => (
                                                    <div
                                                        key={seat.id}
                                                        className={`seat ${seat.type} ${seat.status} ${selectedSeats.includes(seat.id) ? 'selected' : ''} rounded-lg`}
                                                        onClick={() => handleSeatClick(seat)}
                                                        title={`${seat.id} - ${seat.type} - ${seat.price}`}
                                                    >
                                                        {seat.id}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Seat Statistics */}
                                    <div>
                                        <h4 className="font-bold text-lg mb-4">Seat Statistics</h4>
                                        <div className="space-y-6">
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="font-medium">Management Quota</span>
                                                    <span className="font-bold">
                                                        {college.seats?.available?.management || 150}/{
                                                        college.seats?.management || 600} available
                                                    </span>
                                                </div>
                                                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-gradient-to-r from-primary to-secondary" 
                                                        style={{ 
                                                            width: `${((college.seats?.available?.management || 150) / (college.seats?.management || 600)) * 100}%` 
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="font-medium">Government Quota</span>
                                                    <span className="font-bold">
                                                        {college.seats?.available?.government || 400}/{
                                                        college.seats?.government || 1200} available
                                                    </span>
                                                </div>
                                                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" 
                                                        style={{ 
                                                            width: `${((college.seats?.available?.government || 400) / (college.seats?.government || 1200)) * 100}%` 
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                            
                                            {selectedSeats.length > 0 && (
                                                <div className="mt-8 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-xl">
                                                    <h5 className="font-bold text-lg mb-4">Selected Seats ({selectedSeats.length})</h5>
                                                    <div className="space-y-3 mb-4">
                                                        {selectedSeats.map(seatId => {
                                                            const seat = seats.find(s => s.id === seatId);
                                                            return (
                                                                <div key={seatId} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
                                                                    <div>
                                                                        <span className="font-medium">{seatId}</span>
                                                                        <span className="text-sm text-gray-600 ml-2">({seat?.type})</span>
                                                                    </div>
                                                                    <span className="font-bold text-primary">{seat?.price}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    <button className="w-full gradient-primary text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300">
                                                        <i className="fas fa-lock mr-2"></i>
                                                        Proceed to Booking
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'location' && (
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Location & Campus</h3>
                                
                                {/* Map */}
                                <div id="college-map" className="map-container mb-6 rounded-xl overflow-hidden border border-gray-300"></div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="font-bold text-lg mb-4">Contact Information</h4>
                                        <div className="space-y-4">
                                            <div className="flex items-start">
                                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                                    <i className="fas fa-map-marker-alt text-red-600"></i>
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-800">Address</div>
                                                    <div className="text-gray-600">{college.address || 'Mysore Road, Bengaluru, Karnataka - 560059'}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                    <i className="fas fa-phone text-blue-600"></i>
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-800">Phone</div>
                                                    <div className="text-gray-600">{college.contact || '080-6717 8021'}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                                    <i className="fas fa-globe text-green-600"></i>
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-800">Website</div>
                                                    <a href={college.website || '#'} className="text-primary hover:underline">
                                                        {college.website || 'https://example.com'}
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                                    <i className="fas fa-envelope text-purple-600"></i>
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-800">Email</div>
                                                    <div className="text-gray-600">admissions@{college.name.split(' ')[0].toLowerCase()}.edu.in</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-bold text-lg mb-4">How to Reach</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-start">
                                                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                                                    <i className="fas fa-train text-yellow-600"></i>
                                                </div>
                                                <div>
                                                    <div className="font-medium">By Metro</div>
                                                    <div className="text-sm text-gray-600">Nearest station: Mysore Road Metro Station (2 km)</div>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                                                    <i className="fas fa-bus text-orange-600"></i>
                                                </div>
                                                <div>
                                                    <div className="font-medium">By Bus</div>
                                                    <div className="text-sm text-gray-600">BMTC buses: 401, 402, 403 to RV College stop</div>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                                                    <i className="fas fa-car text-cyan-600"></i>
                                                </div>
                                                <div>
                                                    <div className="font-medium">By Car</div>
                                                    <div className="text-sm text-gray-600">On Mysore Road, near Bangalore University</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'facilities' && (
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Campus Facilities</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {[
                                        { icon: 'fa-book', name: 'Library', desc: 'Central library with 1L+ books', color: 'from-blue-500 to-blue-600' },
                                        { icon: 'fa-flask', name: 'Labs', desc: 'State-of-the-art laboratories', color: 'from-purple-500 to-purple-600' },
                                        { icon: 'fa-wifi', name: 'WiFi Campus', desc: 'High-speed internet access', color: 'from-green-500 to-green-600' },
                                        { icon: 'fa-dumbbell', name: 'Sports', desc: 'Sports complex & gym', color: 'from-red-500 to-red-600' },
                                        { icon: 'fa-utensils', name: 'Cafeteria', desc: 'Multi-cuisine food court', color: 'from-orange-500 to-orange-600' },
                                        { icon: 'fa-home', name: 'Hostels', desc: 'Separate hostels for boys & girls', color: 'from-cyan-500 to-cyan-600' },
                                        { icon: 'fa-bus', name: 'Transport', desc: 'College bus facility', color: 'from-yellow-500 to-yellow-600' },
                                        { icon: 'fa-hospital', name: 'Medical', desc: '24/7 medical facility', color: 'from-pink-500 to-pink-600' }
                                    ].map((facility, idx) => (
                                        <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-primary/50 transition-all duration-300">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br ${facility.color}`}>
                                                <i className={`fas ${facility.icon} text-white`}></i>
                                            </div>
                                            <h5 className="font-bold text-gray-800">{facility.name}</h5>
                                            <p className="text-sm text-gray-600 mt-1">{facility.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};