export async function fetchSuggestions(query: string) {
  const res = await fetch(`/search?q=${encodeURIComponent(query)}`);
  await new Promise((resolve) => setTimeout(resolve, 600)); // simulamos delay solo para la demo
  if (!res.ok) throw new Error('Error al buscar');
  return res.json();
}
