import React, { useEffect, useState } from 'react';
import { fetchGuardianNews } from '../api/guardian';
import DefenceCard from '../components/DefenceCard';
import SummaryButton from '../components/SummaryButton';

export default function Defence({ searchTerm }) {
  const [indianDefence, setIndianDefence] = useState([]);
  const [globalDefence, setGlobalDefence] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchGuardianNews("DRDO OR BrahMos OR Tejas OR \"Indian Air Force\" OR \"Indian Navy\" OR \"Indian Army\" OR \"Indian defence\" OR \"India defence\" OR HAL aircraft OR Agni missile OR S-400 India", 30),
      fetchGuardianNews("defence OR military OR NATO OR Pentagon OR \"arms deal\" OR \"defence budget\" OR \"military spending\"", 20)
    ]).then(([indianDefenceData, globalDefenceData]) => {
      const INDIA_DEFENCE_KEYWORDS = [
        'drdo', 'brahmos', 'tejas', 'indian air force', 'indian navy',
        'indian army', 'indian defence', 'india defence', 'hal aircraft',
        'agni', 's-400', 'rafale india', 'india missile', 'india military',
        'india weapon', 'india fighter', 'india submarine', 'india warship',
        'india border', 'india ceasefire', 'india pakistan', 'india china military',
        'india nuclear', 'india military budget', 'india arms'
      ];
      const filteredIndiaData = (indianDefenceData || []).filter(article => {
        const text = (article.webTitle + ' ' + (article.fields?.trailText || '')).toLowerCase();
        return INDIA_DEFENCE_KEYWORDS.some(kw => text.includes(kw));
      });
      setIndianDefence(filteredIndiaData);
      setGlobalDefence(globalDefenceData || []);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ backgroundColor: '#0A0F1E' }} className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  const query = (searchTerm || '').toLowerCase();

  const filterArticles = (articles) => {
    if (!query) return articles;
    return articles.filter(article => {
      const title = (article.title || article.webTitle || '').toLowerCase();
      const desc = (article.description || article.fields?.trailText || '').toLowerCase();
      return title.includes(query) || desc.includes(query);
    });
  };

  const filteredIndian = filterArticles(indianDefence);
  const filteredGlobal = filterArticles(globalDefence);

  return (
    <div style={{ backgroundColor: '#0A0F1E' }} className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* SECTION 2: Indian Defence */}
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">🇮🇳 Indian Defence</h2>
            <div className="w-16 h-1" style={{ background: 'rgba(255,107,53,0.8)' }}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIndian.map((article, idx) => (
              <DefenceCard 
                key={idx}
                title={article.webTitle}
                description={article.fields?.trailText || ''}
                url={article.webUrl}
                imageUrl={article.fields?.thumbnail}
                source="GUARDIAN"
                date={article.webPublicationDate ? new Date(article.webPublicationDate).toLocaleDateString() : null}
                summaryText={article.fields?.trailText || article.webTitle || ''}
              />
            ))}
            {filteredIndian.length === 0 && <p className="text-gray-400">No articles found.</p>}
          </div>
        </section>

        {/* SECTION 1: Global Defence */}
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">🌍 Global Defence</h2>
            <div className="w-16 h-1" style={{ background: 'rgba(255,107,53,0.8)' }}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGlobal.map((article, idx) => (
              <DefenceCard 
                key={idx}
                title={article.webTitle}
                description={article.fields?.trailText}
                url={article.webUrl}
                imageUrl={article.fields?.thumbnail}
                source="GUARDIAN"
                date={article.webPublicationDate ? new Date(article.webPublicationDate).toLocaleDateString() : null}
                summaryText={(article.fields?.trailText || article.webTitle || '')}
              />
            ))}
            {filteredGlobal.length === 0 && <p className="text-gray-400">No articles found.</p>}
          </div>
        </section>

      </div>
    </div>
  );
}
