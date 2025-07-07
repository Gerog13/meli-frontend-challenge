import { useRef, useState, useEffect, useCallback } from 'react';
import type { FormEvent } from 'react';
import { useSearchStore } from '../../store/searchStore';
import { useDebounce } from '../../hooks/useDebounce';
import { TfiSearch } from 'react-icons/tfi';
import { IoMdClose } from 'react-icons/io';
import { FiArrowLeft } from 'react-icons/fi';
import SuggestionLoading from '../../components/search/SuggestionLoading';
import SuggestionError from '../../components/search/SuggestionError';
import SuggestionNoResults from '../../components/search/SuggestionNoResults';
import SuggestionHistory from '../../components/search/SuggestionHistory';
import SuggestionList from '../../components/search/SuggestionList';
import { fetchSuggestions as fetchSuggestionsApi } from '../../api/search';

export function MobileSearchBar({ onSearch }: { onSearch?: (query: string) => void }) {
  const {
    query,
    setQuery,
    results,
    setResults,
    loading,
    setLoading,
    setError,
    error,
    searchHistory,
    addToHistory,
  } = useSearchStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 200);
  const [expanded, setExpanded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    setHasSearched(false);
  }, [debouncedQuery]);

  const fetchSuggestions = async (query: string) => {
    setLoading(true);
    try {
      const data = await fetchSuggestionsApi(query);
      setResults(data.results.map((item: any) => item.title));
      setShowSuggestions(true);
      setError(null);
    } catch (error) {
      setError(
        `Error al buscar las sugerencias: ${error instanceof Error ? error.message : 'Error desconocido'}`,
      );
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  };

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setShowSuggestions(false);
      setHasSearched(false);
      return;
    }
    fetchSuggestions(debouncedQuery);
  }, [debouncedQuery]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query.trim());
      setShowSuggestions(false);
      setExpanded(false);
      addToHistory(query.trim());
    }
  };

  const handleBack = () => {
    setExpanded(false);
    setShowSuggestions(false);
    setQuery('');
    inputRef.current?.blur();
  };

  const renderCollapsedBar = useCallback(
    () => (
      <form
        onSubmit={handleSubmit}
        className="h-12 py-[7px] w-full relative"
        role="search"
        autoComplete="off"
        id="search-mobile-form"
      >
        <button
          type="submit"
          className="absolute left-3 w-[34px] h-[34px] bg-none text-[#666] bg-transparent"
          aria-label="Buscar"
          tabIndex={0}
          style={{ borderRadius: '0 2px 2px 0' }}
          onClick={() => inputRef.current?.focus()}
        >
          <TfiSearch
            size={13}
            color="#aaa"
            style={{ verticalAlign: 'top' }}
            aria-label="Buscar"
            strokeWidth={0.1}
          />
        </button>
        <input
          ref={inputRef}
          id="search-mobile"
          name="search-mobile"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Estoy buscando..."
          className="block w-full text-[16px] text-[#333] bg-white border-none outline-none rounded-[2px] h-[34px] shadow-[0_1px_2px_0_rgba(0,0,0,.1)] placeholder-[#ccc] placeholder:font-light transition-all duration-200"
          style={{ boxSizing: 'border-box', padding: '5px 6px 7px 35px' }}
          onFocus={() => setExpanded(true)}
          autoComplete="off"
          spellCheck={false}
          maxLength={120}
          aria-label="Buscar productos, marcas y más"
        />
      </form>
    ),
    [handleSubmit, inputRef, query, setQuery],
  );

  const renderExpandedBar = useCallback(() => {
    return (
      <div className="fixed inset-0 bg-white z-20 h-fit flex flex-col">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center w-full h-12 pl-2.5"
          role="search"
          autoComplete="off"
          id="search-mobile-form-expanded"
        >
          <button
            type="button"
            aria-label="Volver"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-transparent border-0 p-0 z-[1002]"
            tabIndex={0}
            onClick={handleBack}
          >
            <FiArrowLeft size={20} color="#000" className="mb-0.5 ml-0.5" />
          </button>
          <input
            ref={inputRef}
            id="search-mobile-expanded"
            name="search-mobile-expanded"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value === '') {
                setLoading(false);
              } else {
                setLoading(true);
              }
            }}
            placeholder="Estoy buscando..."
            className="block w-full text-[16px] text-[#333] bg-white border-none outline-none rounded-[2px] h-12 shadow-none placeholder-[#ccc] placeholder:font-light transition-all duration-200"
            style={{ boxSizing: 'border-box', padding: '5px 6px 7px 35px' }}
            autoFocus
            autoComplete="off"
            spellCheck={false}
            maxLength={120}
            aria-label="Buscar productos, marcas y más"
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          {query && (
            <button
              type="button"
              aria-label="Limpiar búsqueda"
              className="absolute right-2 top-1/2 z-30 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-transparent border-0 p-0 text-[#aaa] text-2xl"
              tabIndex={0}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setQuery('')}
            >
              <IoMdClose size={22} color="#000" />
            </button>
          )}
        </form>
        {/* Sugerencias o historial */}
        <div
          role="listbox"
          className="w-full bg-white z-[1001] animate-fade-in border-t border-[#e6e6e6] min-h-0 max-h-[calc(100vh-48px)] overflow-y-auto"
          style={{ transition: 'opacity 0.2s cubic-bezier(.4,0,.2,1)' }}
          aria-live="polite"
          aria-busy={loading}
        >
          {getDropdownContent()}
        </div>
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.18s cubic-bezier(.4,0,.2,1);
          }
        `}</style>
      </div>
    );
  }, [
    handleSubmit,
    handleBack,
    inputRef,
    query,
    setQuery,
    showSuggestions,
    results,
    onSearch,
    searchHistory,
    addToHistory,
    loading,
    error,
    hasSearched,
  ]);

  const getDropdownContent = () => {
    const showHistory = !query && searchHistory.length > 0;
    if (loading) return <SuggestionLoading />;
    if (error)
      return (
        <SuggestionError
          onRetry={() => {
            setError(null);
            setLoading(true);
            fetch(`/search?q=${encodeURIComponent(query)}`)
              .then((res) => res.json())
              .then((data) => {
                setResults(data.results.map((item: any) => item.title));
                setError(null);
              })
              .catch(() => setError('Error al buscar'))
              .finally(() => setLoading(false));
          }}
        />
      );
    if (!showHistory && results.length === 0 && query && !loading && hasSearched) {
      return <SuggestionNoResults />;
    }
    return (
      <ul className="p-0 my-2 list-none">
        {showHistory ? (
          <SuggestionHistory
            history={searchHistory}
            onSelect={(s) => {
              setQuery(s);
              setShowSuggestions(false);
              setExpanded(false);
              onSearch?.(s);
            }}
          />
        ) : (
          <SuggestionList
            suggestions={results}
            query={query}
            onSelect={(s) => {
              setQuery(s);
              setShowSuggestions(false);
              setExpanded(false);
              addToHistory(s);
              onSearch?.(s);
            }}
          />
        )}
      </ul>
    );
  };

  return expanded ? renderExpandedBar() : renderCollapsedBar();
}
