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
            image: '🏛️'
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
        if (window.L && document.getElementById('college-map') && college.coordinates) {
            const map = L.map('college-map').setView(college.coordinates, 15);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            L.marker(college.coordinates)
                .addTo(map)
                .bindPopup(`<b>${college.name}</b><br>${college.location}`)
                .openPopup();
        }
    }, [college]);
    
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 page-transition">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => setCurrentPage('Colleges')}
                    className="flex items-center text-blue-600 mb-8 hover:text-blue-800"
                >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back to Colleges
                </button>
                
                {/* College Header */}
                <div className="glass rounded-3xl p-8 mb-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">{college.name}</h1>
                            <div className="flex items-center text-gray-600">
                                <i className="fas fa-map-marker-alt text-red-500 mr-2"></i>
                                {college.location}
                                <span className="mx-4">•</span>
                                <div className="flex items-center">
                                    <i className="fas fa-star text-yellow-500 mr-1"></i>
                                    <span className="font-bold">{college.rating}</span>
                                    <span className="text-gray-500 text-sm ml-1">/5.0</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 lg:mt-0">
                            <button className="gradient-blue text-white px-6 py-3 rounded-xl font-semibold mr-3">
                                <i className="fas fa-download mr-2"></i>
                                Brochure
                            </button>
                            <button className="glass px-6 py-3 rounded-xl font-semibold">
                                <i className="fas fa-heart mr-2 text-red-500"></i>
                                Save
                            </button>
                        </div>
                    </div>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 p-4 rounded-xl">
                            <div className="text-sm text-blue-600 font-medium">Annual Fees</div>
                            <div className="text-2xl font-bold">{college.fees}</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl">
                            <div className="text-sm text-green-600 font-medium">Placement Rate</div>
                            <div className="text-2xl font-bold">{college.placement}</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-xl">
                            <div className="text-sm text-purple-600 font-medium">Avg Package</div>
                            <div className="text-2xl font-bold">{college.avgPackage}</div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-xl">
                            <div className="text-sm text-orange-600 font-medium">Highest Package</div>
                            <div className="text-2xl font-bold">{college.highestPackage}</div>
                        </div>
                    </div>
                </div>
                
                {/* Tabs */}
                <div className="glass rounded-3xl p-8 mb-8">
                    <div className="flex flex-wrap gap-2 mb-8">
                        {['overview', 'courses', 'seat-booking', 'placement', 'reviews', 'location', 'facilities'].map((tab) => (
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
                                <h3 className="text-2xl font-bold mb-4">About {college.name}</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {college.name} is a premier institution located in {college.location}. 
                                    Established in {college.founded}, it has consistently ranked among the top colleges 
                                    in the region with excellent placement records and state-of-the-art infrastructure.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-bold mb-3">Key Highlights</h4>
                                        <ul className="space-y-2">
                                            {(college.highlights || []).map((highlight, idx) => (
                                                <li key={idx} className="flex items-center">
                                                    <i className="fas fa-check text-green-500 mr-3"></i>
                                                    {highlight}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-3">Basic Information</h4>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Established</span>
                                                <span className="font-medium">{college.founded}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Campus Size</span>
                                                <span className="font-medium">{college.campusSize}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Accreditation</span>
                                                <span className="font-medium">{college.accreditation || 'NAAC A'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Total Seats</span>
                                                <span className="font-medium">{college.totalSeats || 1800}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'seat-booking' && (
                            <div>
                                <h3 className="text-2xl font-bold mb-6">Seat Availability & Booking</h3>
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
                                                    <div className="w-4 h-4 bg-blue-200 border-2 border-blue-400 mr-2"></div>
                                                    Available
                                                </span>
                                                <span className="inline-flex items-center mr-4">
                                                    <div className="w-4 h-4 bg-gray-200 border-2 border-gray-400 mr-2"></div>
                                                    Booked
                                                </span>
                                                <span className="inline-flex items-center">
                                                    <div className="w-4 h-4 bg-blue-500 mr-2"></div>
                                                    Selected
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Seat Grid */}
                                        <div className="bg-gray-50 p-6 rounded-xl">
                                            <div className="grid grid-cols-10 gap-2">
                                                {seats.slice(0, 100).map((seat) => (
                                                    <div
                                                        key={seat.id}
                                                        className={`seat ${seat.type} ${seat.status} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
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
                                                    <span>Management Quota</span>
                                                    <span className="font-bold">
                                                        {college.seats?.available?.management || 150}/{
                                                        college.seats?.management || 600} available
                                                    </span>
                                                </div>
                                                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-purple-500" 
                                                        style={{ 
                                                            width: `${((college.seats?.available?.management || 150) / (college.seats?.management || 600)) * 100}%` 
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span>Government Quota</span>
                                                    <span className="font-bold">
                                                        {college.seats?.available?.government || 400}/{
                                                        college.seats?.government || 1200} available
                                                    </span>
                                                </div>
                                                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-blue-500" 
                                                        style={{ 
                                                            width: `${((college.seats?.available?.government || 400) / (college.seats?.government || 1200)) * 100}%` 
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                            
                                            {selectedSeats.length > 0 && (
                                                <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                                                    <h5 className="font-bold mb-3">Selected Seats ({selectedSeats.length})</h5>
                                                    <div className="space-y-2">
                                                        {selectedSeats.map(seatId => {
                                                            const seat = seats.find(s => s.id === seatId);
                                                            return (
                                                                <div key={seatId} className="flex justify-between items-center">
                                                                    <span>{seatId} ({seat?.type})</span>
                                                                    <span className="font-bold">{seat?.price}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    <button className="w-full mt-4 gradient-blue text-white py-3 rounded-xl font-semibold">
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
                                <h3 className="text-2xl font-bold mb-6">Location & Map</h3>
                                <div id="college-map" className="map-container mb-4"></div>
                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center">
                                        <i className="fas fa-map-marker-alt text-red-500 mr-3"></i>
                                        <span>{college.address || 'Mysore Road, Bengaluru'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-phone text-blue-500 mr-3"></i>
                                        <span>{college.contact || '080-6717 8021'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-globe text-green-500 mr-3"></i>
                                        <a href={college.website || '#'} className="text-blue-600 hover:underline">
                                            {college.website || 'https://example.com'}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'facilities' && (
                            <div>
                                <h3 className="text-2xl font-bold mb-6">Campus Facilities</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {[
                                        { icon: 'fa-book', name: 'Library', desc: 'Central library with 1L+ books' },
                                        { icon: 'fa-flask', name: 'Labs', desc: 'State-of-the-art laboratories' },
                                        { icon: 'fa-wifi', name: 'WiFi Campus', desc: 'High-speed internet access' },
                                        { icon: 'fa-dumbbell', name: 'Sports', desc: 'Sports complex & gym' },
                                        { icon: 'fa-utensils', name: 'Cafeteria', desc: 'Multi-cuisine food court' },
                                        { icon: 'fa-home', name: 'Hostels', desc: 'Separate hostels for boys & girls' },
                                        { icon: 'fa-bus', name: 'Transport', desc: 'College bus facility' },
                                        { icon: 'fa-hospital', name: 'Medical', desc: '24/7 medical facility' }
                                    ].map((facility, idx) => (
                                        <div key={idx} className="glass p-4 rounded-xl text-center">
                                            <div className="w-12 h-12 gradient-blue rounded-xl flex items-center justify-center mx-auto mb-3">
                                                <i className={`fas ${facility.icon} text-white`}></i>
                                            </div>
                                            <h5 className="font-bold">{facility.name}</h5>
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