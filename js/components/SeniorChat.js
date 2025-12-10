const { useState } = React;

const SeniorChat = ({ collegeId }) => {
    const [selectedSenior, setSelectedSenior] = useState(null);
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState([]);
    
    const seniors = [
        {
            id: 1,
            name: 'Rahul Sharma',
            batch: '2023',
            branch: 'Computer Science',
            current: 'Software Engineer @ Amazon',
            rating: 4.9,
            verified: true,
            responseTime: '2 hours',
            avatar: '👨‍💻',
            topics: ['Placements', 'Coding Clubs', 'Hostel Life']
        },
        {
            id: 2,
            name: 'Priya Patel',
            batch: '2022',
            branch: 'Electronics',
            current: 'M.Tech @ IIT Delhi',
            rating: 4.8,
            verified: true,
            responseTime: '4 hours',
            avatar: '👩‍🎓',
            topics: ['Research', 'Internships', 'Campus Facilities']
        },
        {
            id: 3,
            name: 'Amit Kumar',
            batch: '2024',
            branch: 'Mechanical',
            current: 'Intern @ Tesla',
            rating: 4.7,
            verified: true,
            responseTime: '1 hour',
            avatar: '👨‍🔧',
            topics: ['Projects', 'Faculty', 'Workshops']
        }
    ];
    
    const sendMessage = () => {
        if (!message.trim() || !selectedSenior) return;
        
        const newChat = {
            id: chats.length + 1,
            sender: 'you',
            text: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setChats([...chats, newChat]);
        setMessage('');
        
        // Simulate auto-reply after 2 seconds
        setTimeout(() => {
            const replies = [
                "Great question! From my experience at this college...",
                "That was my favorite part! Let me explain how it works...",
                "I had the same concern when I joined. Here's what I did...",
                "The college is really good for this. Let me share details..."
            ];
            
            const autoReply = {
                id: chats.length + 2,
                sender: 'senior',
                text: replies[Math.floor(Math.random() * replies.length)],
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            
            setChats(prev => [...prev, autoReply]);
        }, 2000);
    };
    
    if (!selectedSenior) {
        return (
            <div className="glass rounded-2xl p-6">
                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 gradient-blue rounded-xl flex items-center justify-center mr-4">
                        <i className="fas fa-comments text-white"></i>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">Chat with Verified Seniors</h3>
                        <p className="text-gray-600">Ask questions to alumni who studied here</p>
                    </div>
                </div>
                
                <div className="space-y-4">
                    {seniors.map(senior => (
                        <div 
                            key={senior.id}
                            onClick={() => setSelectedSenior(senior)}
                            className="glass p-4 rounded-xl hover:bg-blue-50 cursor-pointer transition-all duration-300"
                        >
                            <div className="flex items-center">
                                <div className="text-3xl mr-4">{senior.avatar}</div>
                                <div className="flex-1">
                                    <div className="flex items-center">
                                        <h4 className="font-bold">{senior.name}</h4>
                                        {senior.verified && (
                                            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                <i className="fas fa-check-circle mr-1"></i>Verified
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600">{senior.branch} • {senior.batch} Batch</p>
                                    <p className="text-sm text-gray-600">{senior.current}</p>
                                    
                                    <div className="flex items-center mt-2">
                                        <div className="flex items-center mr-4">
                                            <i className="fas fa-star text-yellow-500 mr-1"></i>
                                            <span>{senior.rating}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <i className="fas fa-clock text-gray-400 mr-1"></i>
                                            <span className="text-sm">Responds in {senior.responseTime}</span>
                                        </div>
                                    </div>
                                </div>
                                <i className="fas fa-chevron-right text-gray-400"></i>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                    <div className="flex">
                        <i className="fas fa-shield-alt text-blue-500 text-xl mr-3"></i>
                        <div>
                            <h5 className="font-bold">Safe & Verified</h5>
                            <p className="text-sm text-gray-600">All seniors are verified through college ID and LinkedIn</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="glass rounded-2xl p-6 h-[500px] flex flex-col">
            <div className="flex items-center mb-6">
                <button 
                    onClick={() => setSelectedSenior(null)}
                    className="mr-4 text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100"
                >
                    <i className="fas fa-arrow-left"></i>
                </button>
                <div className="flex items-center">
                    <div className="text-2xl mr-3">{selectedSenior.avatar}</div>
                    <div>
                        <h4 className="font-bold">{selectedSenior.name}</h4>
                        <p className="text-sm text-gray-600">{selectedSenior.branch} • {selectedSenior.responseTime} response</p>
                    </div>
                </div>
            </div>
            
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {chats.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="text-4xl mb-4">👋</div>
                        <h5 className="font-bold mb-2">Start a conversation!</h5>
                        <p className="text-gray-600">Ask about placements, campus life, or anything else</p>
                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                            {selectedSenior.topics.map((topic, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setMessage(`Can you tell me about ${topic.toLowerCase()}?`)}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    chats.map(chat => (
                        <div 
                            key={chat.id}
                            className={`flex ${chat.sender === 'you' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[70%] rounded-2xl p-3 ${
                                chat.sender === 'you' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                            }`}>
                                {chat.text}
                                <div className={`text-xs mt-1 ${chat.sender === 'you' ? 'text-blue-200' : 'text-gray-500'}`}>
                                    {chat.time}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            
            {/* Message Input */}
            <div className="flex items-center">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your question..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    onClick={sendMessage}
                    disabled={!message.trim()}
                    className={`px-6 py-3 rounded-r-xl font-medium ${message.trim() ? 'gradient-blue text-white' : 'bg-gray-200 text-gray-500'}`}
                >
                    <i className="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    );
};