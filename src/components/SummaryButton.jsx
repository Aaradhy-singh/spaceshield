import React, { useState } from 'react';
import { useGroqSummary } from '../hooks/useGroqSummary';

export default function SummaryButton({ text, variant }) {
  const { summarise, loading, error } = useGroqSummary();
  const [summary, setSummary] = useState(null);
  const [summarised, setSummarised] = useState(false);
  const [noTextError, setNoTextError] = useState(false);

  const cleanText = text?.replace(/<[^>]*>/g, '').trim();
  const tooShort = !cleanText || cleanText.length < 50;

  const handleSummarise = async () => {
    if (tooShort) {
      return;
    }
    setNoTextError(false);
    const result = await summarise(cleanText);
    if (result) {
      setSummary(result);
      setSummarised(true);
    }
  };

  const isDark = variant === 'dark';

  const buttonStyle = isDark
    ? { border: '1px solid #FF6B35', color: '#FF6B35', background: 'transparent' }
    : {};

  const summaryStyle = isDark
    ? {
        background: 'rgba(255,107,53,0.08)',
        borderLeft: '2px solid #FF6B35',
        padding: '12px',
        borderRadius: '6px',
        marginTop: '8px',
        color: '#E2E8F0',
      }
    : {
        background: 'rgba(10,15,30,0.85)',
        borderRadius: '6px',
        padding: '12px',
        marginTop: '8px',
        color: '#E2E8F0',
      };

  return (
    <div className="mt-4">
      <button
        onClick={handleSummarise}
        disabled={loading || summarised || tooShort}
        style={buttonStyle}
        className={
          isDark
            ? 'px-3 py-1 text-sm rounded disabled:opacity-50'
            : 'px-3 py-1 text-sm rounded border border-orange-500 text-orange-500 bg-transparent disabled:opacity-50'
        }
      >
        {loading ? 'Summarising...' : summarised ? 'Summarised' : 'Summarise'}
      </button>
      {tooShort && <p className="text-gray-500 text-xs mt-2">Not enough content to summarise.</p>}
      {error && <p className="text-red-500 text-xs mt-2">Error — try again</p>}
      {summary && (
        <div style={summaryStyle} className="text-sm whitespace-pre-wrap">
          {summary}
        </div>
      )}
    </div>
  );
}
