import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSearchStore } from '../../store/searchStore';
import ProductCard from '../../components/product/ProductCard';
import { fetchSuggestions as fetchResultsApi } from '../../api/search';
import ProductListHeader from '../../components/productListUI/ProductListHeader';
import ShippingInfoAlert from '../../components/productListUI/ShippingInfoAlert';
import Paginator from '../../components/productListUI/Paginator';

export default function ProductList() {
  const { query: urlQuery } = useParams<{ query?: string }>();
  const {
    searchResults,
    loadingResults,
    errorResults,
    searchQuery,
    setQuery,
    setSearchResults,
    setLoadingResults,
    setErrorResults,
    setSearchQuery,
  } = useSearchStore();

  useEffect(() => {
    if (urlQuery) {
      setQuery(urlQuery);
      setSearchQuery(urlQuery);
      setLoadingResults(true);
      setErrorResults(null);
      fetchResultsApi(urlQuery)
        .then((data) => {
          setSearchResults(data.results);
        })
        .catch((error) => {
          setErrorResults(`Error al buscar productos`);
          console.log('Error al buscar productos', error);
        })
        .finally(() => {
          setLoadingResults(false);
        });
    }
  }, [urlQuery, setQuery, setSearchQuery, setSearchResults, setLoadingResults, setErrorResults]);

  return (
    <section>
      <ProductListHeader />
      <h1 className="my-4 px-4 capitalize text-base text-[rgba(0,0,0,0.9)] font-normal">
        {searchQuery}
      </h1>
      {loadingResults ? (
        <div className="flex flex-col gap-2">
          <div className="animate-pulse h-24 bg-gray-200 rounded" />
          <div className="animate-pulse h-24 bg-gray-200 rounded" />
          <div className="animate-pulse h-24 bg-gray-200 rounded" />
        </div>
      ) : errorResults ? (
        <div className="text-red-600 py-4 text-center">{errorResults}</div>
      ) : !searchResults.length ? (
        <div className="text-gray-500 py-4">No se encontraron resultados para tu búsqueda.</div>
      ) : (
        <ul className="flex flex-col gap-y-0.5 pb-2">
          {searchResults.map((product: any) =>
            product && product.id ? (
              <li key={product.id} className="list-none">
                <ProductCard {...product} />
              </li>
            ) : null,
          )}
        </ul>
      )}
      <ShippingInfoAlert />
      <Paginator page={1} />
    </section>
  );
}
