const { useState, useEffect } = React;

const ArticlesPage = ({ setCurrentPage }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    // News categories
    const categories = [
        { id: 'all', name: 'All News', icon: 'fa-newspaper' },
        { id: 'admissions', name: 'Admissions', icon: 'fa-graduation-cap' },
        { id: 'exams', name: 'Exams', icon: 'fa-file-pen' },
        { id: 'scholarships', name: 'Scholarships', icon: 'fa-award' },
        { id: 'career', name: 'Career', icon: 'fa-briefcase' },
        { id: 'trends', name: 'Trends', icon: 'fa-chart-line' }
    ];
    
    // Static news data (in case API fails)
    const staticArticles = [
        {
            id: 1,
            title: 'KCET 2025 Registration Date Announced',
            description: 'Karnataka Examination Authority announces KCET 2025 registration starting from February 1st.',
            category: 'exams',
            date: '2024-01-15',
            image: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?ixlib=rb-4.0.3',
            source: 'Times of India',
            url: 'https://timesofindia.indiatimes.com'
        },
        {
            id: 2,
            title: 'New Scholarship Scheme for SC/ST Students',
            description: 'Government launches new scholarship scheme worth ₹500 crore for SC/ST students.',
            category: 'scholarships',
            date: '2024-01-14',
            image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3',
            source: 'The Hindu',
            url: 'https://www.thehindu.com'
        },
        {
            id: 3,
            title: 'Top 10 Engineering Colleges in Karnataka 2024',
            description: 'Latest ranking of engineering colleges in Karnataka based on placements and infrastructure.',
            category: 'admissions',
            date: '2024-01-13',
            image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3',
            source: 'India Today',
            url: 'https://www.indiatoday.in'
        },
        {
            id: 4,
            title: 'Artificial Intelligence Course Demand Increases by 300%',
            description: 'Students are flocking to AI courses as job opportunities in tech sector grow exponentially.',
            category: 'trends',
            date: '2024-01-12',
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3',
            source: 'Economic Times',
            url: 'https://economictimes.indiatimes.com'
        },
        {
            id: 5,
            title: 'How to Prepare for JEE Mains 2025',
            description: 'Expert tips and study plan for JEE Mains 2025 preparation.',
            category: 'exams',
            date: '2024-01-11',
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3',
            source: 'NDTV',
            url: 'https://www.ndtv.com'
        },
        {
            id: 6,
            title: 'Campus Placement Records Broken in 2024',
            description: 'Engineering colleges report highest placement packages and recruitment numbers.',
            category: 'career',
            date: '2024-01-10',
            image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3',
            source: 'Business Standard',
            url: 'https://www.business-standard.com'
        }
    ];
    
    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            
            try {
                // Try to fetch from News API (you would need an API key)
                // For now, we'll use static data
                setTimeout(() => {
                    setArticles(staticArticles);
                    setLoading(false);
                }, 1000);
                
                // Uncomment and add your API key to use real news
                /*
                const apiKey = 'YOUR_NEWS_API_KEY_HERE';
                const response = await fetch(
                    `https://newsapi.org/v2/everything?q=education+college+admissions&language=en&sortBy=publishedAt&apiKey=${apiKey}`
                );
                const data = await response.json();
                setArticles(data.articles.slice(0, 12));
                */
                
            } catch (error) {
                console.error('Error fetching news:', error);
                setArticles(staticArticles);
                setLoading(false);
            }
        };
        
        fetchNews();
    }, []);
    
    const filteredArticles = selectedCategory === 'all' 
        ? articles 
        : articles.filter(article => article.category === selectedCategory);
    
    if (loading) {
        return (
            <div className="min-h-screen pt-28 flex items-center justify-center">
                <div className="text-center">
                    <div className="loader mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading latest news...</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen pt-28 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Latest News & Articles</h1>
                <p className="text-gray-600 mb-8">Stay updated with education news, admission updates, and career guidance</p>
                
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-5 py-3 rounded-xl font-medium flex items-center transition-all duration-300 ${
                                selectedCategory === category.id
                                    ? 'gradient-primary text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <i className={`fas ${category.icon} mr-2`}></i>
                            {category.name}
                        </button>
                    ))}
                </div>
                
                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                        <div 
                            key={article.id}
                            className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                        >
                            {/* Article Image */}
                            <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <i className="fas fa-newspaper text-6xl text-primary/30"></i>
                                </div>
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium">
                                        {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Article Content */}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-bold text-gray-800 leading-tight">
                                        {article.title}
                                    </h3>
                                </div>
                                
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {article.description}
                                </p>
                                
                                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                                    <div className="flex items-center">
                                        <i className="fas fa-calendar-alt mr-2"></i>
                                        {new Date(article.date).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-newspaper mr-2"></i>
                                        {article.source}
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={() => window.open(article.url, '_blank')}
                                    className="w-full gradient-primary text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                                >
                                    <i className="fas fa-external-link-alt mr-2"></i>
                                    Read Full Article
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* No Articles Message */}
                {filteredArticles.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fas fa-newspaper text-primary text-3xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">No articles found</h3>
                        <p className="text-gray-600 mb-6">Try selecting a different category</p>
                        <button 
                            onClick={() => setSelectedCategory('all')}
                            className="px-8 py-3 gradient-primary text-white rounded-xl font-semibold hover:shadow-lg"
                        >
                            Show All Articles
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};