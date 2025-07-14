// En ambos llamados simulamos delay para mostrar los skeletons
export async function fetchSuggestions(query: string) {
  const res = await fetch(`/search?q=${encodeURIComponent(query)}`);
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (!res.ok) throw new Error('Error al buscar');
  return res.json();
}

export async function fetchProductDetailById(id: string) {
  const res = await fetch(`/items/${id}`);
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (!res.ok) throw new Error('Error al buscar detalle');
  return res.json();
}
