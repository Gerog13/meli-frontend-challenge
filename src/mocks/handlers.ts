import { http, HttpResponse } from 'msw';
import products from './products.json';

export const handlers = [
  http.get('/search', ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get('q')?.toLowerCase() || '';
    const filtered = products.search.results.filter((item) => item.title.toLowerCase().includes(q));
    return HttpResponse.json({
      ...products.search,
      results: filtered,
    });
  }),
  http.get('/items/:id', () => {
    return HttpResponse.json(products.detail);
  }),
];
