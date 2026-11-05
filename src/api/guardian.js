export async function fetchGuardianNews(query, limit = 20) {
  const params = new URLSearchParams({
    q: String(query || '').slice(0, 240),
    limit: String(Math.min(Math.max(Number(limit) || 20, 1), 30)),
  });
  const response = await fetch(`/api/guardian?${params}`);
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || 'The Guardian feed is temporarily unavailable.');
  }

  if (!Array.isArray(data?.articles)) {
    throw new Error('The Guardian feed returned an unexpected response.');
  }

  return data.articles;
}
