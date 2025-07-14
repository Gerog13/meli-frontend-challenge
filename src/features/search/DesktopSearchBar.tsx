import { useRef, useState, useEffect, useCallback } from 'react';
import type { KeyboardEvent, FormEvent } from 'react';
import { TfiSearch } from 'react-icons/tfi';
import { useSearchStore } from '../../store/searchStore';
import { useDebounce } from '../../hooks/useDebounce';
import SuggestionLoading from '../../components/search/SuggestionLoading';
import SuggestionError from '../../components/search/SuggestionError';
import SuggestionNoResults from '../../components/search/SuggestionNoResults';
import SuggestionHistory from '../../components/search/SuggestionHistory';
import SuggestionList from '../../components/search/SuggestionList';
import { fetchSuggestions as fetchSuggestionsApi } from '../../api/search';
import { useNavigate } from 'react-router-dom';

export function DesktopSearchBar() {
  const {
    query,
    setQuery,
    suggestions,
    setSuggestions,
    loadingSuggestions,
    setLoadingSuggestions,
    errorSuggestions,
    setErrorSuggestions,
    setSearchResults,
    setLoadingResults,
    setErrorResults,
    setSearchQuery,
    searchHistory,

    addToHistory,
  } = useSearchStore();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current && query) {
      inputRef.current.value = query;
    }
  }, [query]);

  const fetchSuggestions = async (q: string) => {
    setLoadingSuggestions(true);
    try {
      const data = await fetchSuggestionsApi(q);
      setSuggestions(data.results.map((item: any) => item.title));
      setErrorSuggestions(null);
    } catch (error) {
      setErrorSuggestions(
        `Error al buscar las sugerencias: ${error instanceof Error ? error.message : 'Error desconocido'}`,
      );
    } finally {
      setLoadingSuggestions(false);
    }
  };

  useEffect(() => {
    if (!debouncedQuery) {
      setSuggestions([]);
      return;
    }
    fetchSuggestions(debouncedQuery);
  }, [debouncedQuery]);

  const fetchResults = async (q: string) => {
    setLoadingResults(true);
    setErrorResults(null);
    try {
      const data = await fetchSuggestionsApi(q);
      setSearchResults(data.results);
      setSearchQuery(q);
    } catch (error) {
      setErrorResults(
        `Error al buscar productos: ${error instanceof Error ? error.message : 'Error desconocido'}`,
      );
    } finally {
      setLoadingResults(false);
    }
  };

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmedQuery = query.trim();
      if (trimmedQuery) {
        setQuery(trimmedQuery);
        addToHistory(trimmedQuery);
        fetchResults(trimmedQuery);
        navigate(`/${encodeURIComponent(trimmedQuery)}`);
        setShowSuggestions(false);
      }
    },
    [query, setQuery, addToHistory, fetchResults, navigate],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const trimmedQuery = query.trim();
      if (e.key === 'Enter' && trimmedQuery) {
        setQuery(trimmedQuery);
        fetchResults(trimmedQuery);
        navigate(`/${encodeURIComponent(trimmedQuery)}`);
        setShowSuggestions(false);
      }
    },
    [query, setQuery, fetchResults, navigate],
  );

  const handleSuggestionSelect = (s: string) => {
    setQuery(s);
    setShowSuggestions(false);
    addToHistory(s);
    fetchResults(s);
    navigate(`/${encodeURIComponent(s)}`);
  };

  const getDropdownContent = () => {
    const showHistory = !query && searchHistory.length > 0;
    if (loadingSuggestions) return <SuggestionLoading />;
    if (errorSuggestions)
      return (
        <SuggestionError
          onRetry={() => {
            setErrorSuggestions(null);
            setLoadingSuggestions(true);
            fetchSuggestions(query);
          }}
        />
      );
    if (!showHistory && suggestions.length === 0 && query) {
      return <SuggestionNoResults />;
    }
    return (
      <ul className="p-0 m-0 list-none">
        {showHistory ? (
          <SuggestionHistory history={searchHistory} onSelect={handleSuggestionSelect} />
        ) : (
          <SuggestionList
            suggestions={suggestions}
            query={query}
            onSelect={handleSuggestionSelect}
          />
        )}
      </ul>
    );
  };

  const renderSuggestions = useCallback(() => {
    return (
      <div
        role="listbox"
        className="absolute left-0 top-[40px] w-full min-w-[320px] max-w-[720px] bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.2)] rounded-b-[2px] z-20 p-0 m-0"
        aria-live="polite"
        aria-busy={loadingSuggestions}
      >
        <div
          aria-hidden="true"
          className="absolute left-0 right-0"
          style={{
            top: 0,
            height: 0,
            borderTop: '1px solid #e6e6e6',
            margin: '0 16.5px',
            zIndex: 1,
          }}
        />
        <div className="p-0 my-2 list-none relative z-10">{getDropdownContent()}</div>
      </div>
    );
  }, [
    suggestions,
    query,
    setQuery,
    loadingSuggestions,
    errorSuggestions,
    setErrorSuggestions,
    setLoadingSuggestions,
    setSuggestions,
    searchHistory,
    addToHistory,
  ]);

  return (
    <form
      onSubmit={handleSubmit}
      className="nav-search flex items-center relative w-full max-w-[720px] h-[40px] z-10"
      role="search"
      autoComplete="off"
      id="search"
      style={{ transition: 'left .15s ease-out', willChange: 'left' }}
    >
      <label htmlFor="search" className="sr-only">
        Buscar productos, marcas y más
      </label>
      <input
        ref={inputRef}
        id="search"
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
          if (e.target.value === '') {
            setLoadingSuggestions(false);
          } else {
            setLoadingSuggestions(true);
          }
        }}
        onKeyDown={handleKeyDown}
        placeholder="Buscar productos, marcas y más..."
        className="relative w-full border-[1.5px] flex rounded-xs h-[40px] text-base tracking-normal leading-[normal] font-normal py-2.5 px-[15px] pr-[60px] shadow-[0_1px_2px_0_rgba(0,0,0,.2)] outline-0 border-transparent bg-white placeholder-[#737373] text-[rgba(0,0,0,0.898)] focus:border-meli-blue"
        aria-label="Buscar productos, marcas y más"
        autoComplete="off"
        spellCheck={false}
        maxLength={120}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
      />
      <button
        type="submit"
        className="absolute right-0 top-0 w-[46px] h-[40px] bg-none flex items-center justify-center text-[#666] bg-transparent p-0 cursor-pointer focus:left-auto focus:border-[1.5px] focus:border-meli-blue"
        aria-label="Buscar"
        tabIndex={0}
        style={{
          borderRadius: '0 2px 2px 0',
        }}
        onClick={() => inputRef.current?.focus()}
      >
        <span
          aria-hidden="true"
          style={{
            content: '""',
            display: 'block',
            height: 20,
            borderLeft: '1px solid #e6e6e6',
            position: 'absolute',
            top: 8.5,
            left: 0,
            width: 1,
            zIndex: 1,
          }}
        />
        <TfiSearch
          size={16}
          color="#666"
          style={{ verticalAlign: 'top' }}
          aria-label="Buscar"
          strokeWidth={0.1}
        />
      </button>
      {showSuggestions && (query || searchHistory.length > 0) && renderSuggestions()}
    </form>
  );
}
