import { useState } from 'react';
export function useGroqSummary() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  async function summarise(text) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [{ role: 'user', content: 'Summarise this news article in exactly 3 bullet points, each under 20 words: ' + text }],
          max_tokens: 200
        })
      });
      const data = await res.json();
      return data.choices[0].message.content;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }
  return { summarise, loading, error };
}
