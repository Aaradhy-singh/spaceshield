export async function fetchSpaceNews(limit = 20) {
  const safeLimit = Math.min(Math.max(Number(limit) || 20, 1), 50);
  const response = await fetch(
    `https://api.spaceflightnewsapi.net/v4/articles/?limit=${safeLimit}&format=json`
  );
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error('The Spaceflight News feed is temporarily unavailable.');
  }

  if (!Array.isArray(data?.results)) {
    throw new Error('The Spaceflight News feed returned an unexpected response.');
  }

  return data.results;
}
