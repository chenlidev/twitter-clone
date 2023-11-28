"use client";
import React, { useState, useEffect } from 'react';

interface NewsArticle {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
}

const News: React.FC = () => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/general/us.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setArticles(data.articles.slice(0, 4)); // Limit articles to five
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2 className="font-bold text-lg mb-2">What's happening</h2> {/* Make header bold and add margin-bottom */}
            {articles.length > 0 ? (
                <ul className="list-none p-0"> {/* Remove list padding */}
                    {articles.map((article, index) => (
                        <li key={index} className="mb-5 flex items-center"> {/* Add margin-bottom and display flex */}
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center no-underline text-black"> {/* Remove text decoration and set text color */}
                                <img src={article.urlToImage} alt={article.title} className="w-24 h-auto mr-2" /> {/* Set width, auto height, and right margin */}
                                <strong>{article.title}</strong>
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No articles found.</p>
            )}
        </div>
    );

};

export default News;
