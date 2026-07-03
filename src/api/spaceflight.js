export async function fetchSpaceNews(limit = 20) {
  const res = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/?limit=${limit}&format=json`);
  const data = await res.json();
  console.log("Spaceflight API raw response:", data);
  return Array.isArray(data.results) ? data.results : [];
}
