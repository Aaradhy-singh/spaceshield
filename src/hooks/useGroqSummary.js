import { useState } from 'react';

export function useGroqSummary() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function summarise(text) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || 'The summary service is temporarily unavailable.');
      }

      if (typeof data?.summary !== 'string' || !data.summary.trim()) {
        throw new Error('The summary service returned an unexpected response.');
      }

      return data.summary;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The summary request failed.');
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { summarise, loading, error };
}
