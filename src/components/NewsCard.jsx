import React, { useState } from 'react';
import SummaryButton from './SummaryButton';

const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
};

const cardBase = {
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '16px',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};

const cardHover = {
  border: '1px solid rgba(255,107,53,0.4)',
  transform: 'translateY(-4px)',
  background: 'rgba(255,255,255,0.07)',
};

export default function NewsCard({ title, description, url, imageUrl, source, date, summary }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={hovered ? { ...cardBase, ...cardHover } : cardBase}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
      ) : (
        <div style={{ width: '100%', height: '180px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4B5563' }}>
          No Image
        </div>
      )}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {source && (
          <span style={{ color: '#FF6B35', fontSize: '11px', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
            {source}
          </span>
        )}
        <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.35, marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {title}
        </h3>
        <p style={{ color: '#E5E7EB', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '16px', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {stripHtml(description)}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
          {date && <span style={{ color: '#9CA3AF', fontSize: '12px' }}>{date}</span>}
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#FF6B35', fontSize: '13px', textDecoration: 'none', alignSelf: 'flex-start' }}
             onMouseEnter={e => e.target.style.textDecoration = 'underline'}
             onMouseLeave={e => e.target.style.textDecoration = 'none'}>
            Read More
          </a>
          <SummaryButton text={description || title} variant="dark" />
        </div>
      </div>
    </div>
  );
}
