export async function fetchGNews(query, limit = 10) {
  const res = await fetch(`https://gnews.io/api/v4/search?q=${query}&token=${import.meta.env.VITE_GNEWS_KEY}&max=${limit}&lang=en`);
  const data = await res.json();
  return data.articles;
}
