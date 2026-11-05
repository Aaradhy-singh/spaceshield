import React, { useEffect, useState } from 'react';
import { fetchSpaceNews } from '../api/spaceflight';
import { fetchGuardianNews } from '../api/guardian';
import NewsCard from '../components/NewsCard';

export default function Space({ searchTerm }) {
  const [globalArticles, setGlobalArticles] = useState([]);
  const [indianArticles, setIndianArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedError, setFeedError] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadFeeds() {
      const results = await Promise.allSettled([
        fetchSpaceNews(20),
        fetchGuardianNews('ISRO OR Chandrayaan OR Gaganyaan OR Skyroot OR Agnikul OR "Indian space" OR "India space" OR "India satellite" OR Shubhanshu OR "India rocket" OR "India launch"', 30),
      ]);

      if (!active) return;

      const [spaceResult, guardianResult] = results;
      if (spaceResult.status === 'fulfilled') {
        setGlobalArticles(spaceResult.value);
      }
      if (guardianResult.status === 'fulfilled') {
        const keywords = [
          'isro', 'chandrayaan', 'gaganyaan', 'skyroot', 'agnikul',
          'indian space', 'india space', 'india satellite', 'shubhanshu',
          'india rocket', 'india launch', 'india orbit', 'india mission',
          'vikram', 'pragyan', 'india moon', 'india mars',
        ];
        const filtered = guardianResult.value.filter((article) => {
          const articleText = `${article.webTitle || ''} ${article.fields?.trailText || ''}`.toLowerCase();
          return keywords.some((keyword) => articleText.includes(keyword));
        });
        setIndianArticles(filtered.map((article) => ({
          title: article.webTitle,
          description: article.fields?.trailText || '',
          url: article.webUrl,
          imageUrl: article.fields?.thumbnail,
          source: 'GUARDIAN',
          date: article.webPublicationDate ? new Date(article.webPublicationDate).toLocaleDateString() : null,
        })));
      }

      setFeedError(results.some((result) => result.status === 'rejected'));
      setLoading(false);
    }

    loadFeeds();
    return () => { active = false; };
  }, []);

  const query = (searchTerm || '').toLowerCase();
  const filterArticles = (articles) => {
    if (!query) return articles;
    return articles.filter((article) => {
      const title = (article.title || '').toLowerCase();
      const description = (article.summary || article.description || '').toLowerCase();
      return title.includes(query) || description.includes(query);
    });
  };

  const filteredIndian = filterArticles(indianArticles);
  const filteredGlobal = filterArticles(globalArticles);

  if (loading) {
    return (
      <div style={{ backgroundColor: '#060B14' }} className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#060B14' }} className="min-h-screen p-4 md:p-8 text-white">
      <div className="max-w-7xl mx-auto space-y-16">
        {feedError && <p role="alert" className="text-amber-300">Some news feeds are temporarily unavailable; other available feeds are still shown.</p>}
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">🇮🇳 Indian Space</h2>
            <div className="w-16 h-1 bg-orange-500"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIndian.map((article, idx) => (
              <NewsCard key={article.url || idx} {...article} />
            ))}
            {filteredIndian.length === 0 && <p className="text-gray-400">No articles found.</p>}
          </div>
        </section>
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">🌍 Global Space</h2>
            <div className="w-16 h-1 bg-orange-500"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGlobal.map((article, idx) => (
              <NewsCard
                key={article.id || article.url || idx}
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
