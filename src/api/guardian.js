export async function fetchGuardianNews(query, limit = 20) {
  const res = await fetch(`https://content.guardianapis.com/search?q=${encodeURIComponent(query)}&api-key=${import.meta.env.VITE_GUARDIAN_KEY}&show-fields=thumbnail,trailText&page-size=${limit}`);
  const data = await res.json();
  console.log("Guardian API raw response:", data);
  return data?.response?.results ?? [];
}
