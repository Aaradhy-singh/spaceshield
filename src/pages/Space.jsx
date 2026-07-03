import React, { useEffect, useState } from 'react';
import { fetchSpaceNews } from '../api/spaceflight';
import { fetchGuardianNews } from '../api/guardian';
import NewsCard from '../components/NewsCard';

export default function Space({ searchTerm }) {
  const [globalArticles, setGlobalArticles] = useState([]);
  const [indianArticles, setIndianArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const INDIA_SPACE_KEYWORDS = [
      'isro', 'chandrayaan', 'gaganyaan', 'skyroot', 'agnikul',
      'indian space', 'india space', 'india satellite', 'shubhanshu',
      'india rocket', 'india launch', 'india orbit', 'india mission',
      'vikram', 'pragyan', 'india moon', 'india mars'
    ];

    Promise.all([
      fetchSpaceNews(20),
      fetchGuardianNews("ISRO OR Chandrayaan OR Gaganyaan OR Skyroot OR Agnikul OR \"Indian space\" OR \"India space\" OR \"India satellite\" OR Shubhanshu OR \"India rocket\" OR \"India launch\"", 30)
    ]).then(([spaceData, guardianData]) => {
      setGlobalArticles(spaceData || []);
      const filtered = (guardianData || []).filter(article => {
        const text = (article.webTitle + ' ' + (article.fields?.trailText || '')).toLowerCase();
        return INDIA_SPACE_KEYWORDS.some(kw => text.includes(kw));
      });
      const mapped = filtered.map(article => ({
        title: article.webTitle,
        description: article.fields?.trailText || '',
        url: article.webUrl,
        imageUrl: article.fields?.thumbnail,
        source: 'GUARDIAN',
        date: article.webPublicationDate ? new Date(article.webPublicationDate).toLocaleDateString() : null
      }));
      setIndianArticles(mapped);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ backgroundColor: '#060B14' }} className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  const query = (searchTerm || '').toLowerCase();

  const filterArticles = (articles) => {
    if (!query) return articles;
    return articles.filter(article => {
      const title = (article.title || '').toLowerCase();
      const desc = (article.summary || article.description || '').toLowerCase();
      return title.includes(query) || desc.includes(query);
    });
  };

  const filteredIndian = filterArticles(indianArticles);
  const filteredGlobal = filterArticles(globalArticles);

  return (
    <div style={{ backgroundColor: '#060B14' }} className="min-h-screen p-4 md:p-8 text-white">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* SECTION 1: Indian Space */}
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">🇮🇳 Indian Space</h2>
            <div className="w-16 h-1 bg-orange-500"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIndian.map((article, idx) => (
              <NewsCard 
                key={idx}
                title={article.title}
                description={article.description}
                url={article.url}
                imageUrl={article.imageUrl}
                source={article.source}
                date={article.date}
              />
            ))}
            {filteredIndian.length === 0 && <p className="text-gray-400">No articles found.</p>}
          </div>
        </section>

        {/* SECTION 2: Global Space */}
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">🌍 Global Space</h2>
            <div className="w-16 h-1 bg-orange-500"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGlobal.map((article, idx) => (
              <NewsCard 
                key={idx}
                title={article.title}
                description={article.summary}
                url={article.url}
                imageUrl={article.image_url}
                source={article.news_site}
                date={article.published_at ? new Date(article.published_at).toLocaleDateString() : null}
              />
            ))}
            {filteredGlobal.length === 0 && <p className="text-gray-400">No articles found.</p>}
          </div>
        </section>

      </div>
    </div>
  );
}
