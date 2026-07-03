export async function fetchAPOD() {
  const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_KEY}`);
  return res.json();
}
