const { useState } = React;

const ArticlesPage = () => {
    const [articles] = useState(window.ARTICLES_DATA || []);
    
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 page-transition">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Latest Articles</h1>
                <p className="text-gray-600 mb-8">Stay updated with exam news, preparation tips, and career guidance</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <div key={article.id} className="glass rounded-2xl overflow-hidden hover-lift">
                            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                <i className="fas fa-newspaper text-white text-4xl"></i>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                                        {article.category}
                                    </span>
                                    <span className="text-sm text-gray-500">{article.date}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{article.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                                <button className="text-blue-600 font-semibold hover:text-blue-800">
                                    Read More →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};