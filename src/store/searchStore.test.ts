import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import { useSearchStore } from './searchStore';

describe('searchStore', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();

    // Reset the store before each test
    const { result } = renderHook(() => useSearchStore());
    act(() => {
      result.current.setQuery('');
      result.current.setSuggestions([]);
      result.current.setLoadingSuggestions(false);
      result.current.setErrorSuggestions(null);
      result.current.setSearchResults([]);
      result.current.setLoadingResults(false);
      result.current.setErrorResults(null);
      result.current.setSearchQuery('');
      result.current.clearHistory();
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('inicializa con valores por defecto', () => {
    const { result } = renderHook(() => useSearchStore());

    expect(result.current.query).toBe('');
    expect(result.current.suggestions).toEqual([]);
    expect(result.current.loadingSuggestions).toBe(false);
    expect(result.current.errorSuggestions).toBe(null);
    expect(result.current.searchResults).toEqual([]);
    expect(result.current.loadingResults).toBe(false);
    expect(result.current.errorResults).toBe(null);
    expect(result.current.searchQuery).toBe('');
    expect(result.current.searchHistory).toEqual([]);
  });

  it('permite actualizar el query', () => {
    const { result } = renderHook(() => useSearchStore());

    act(() => {
      result.current.setQuery('iPhone');
    });

    expect(result.current.query).toBe('iPhone');
  });

  it('permite actualizar las sugerencias', () => {
    const { result } = renderHook(() => useSearchStore());
    const suggestions = ['iPhone 13', 'iPhone 14', 'iPhone 15'];

    act(() => {
      result.current.setSuggestions(suggestions);
    });

    expect(result.current.suggestions).toEqual(suggestions);
  });

  it('permite actualizar el estado de loading de sugerencias', () => {
    const { result } = renderHook(() => useSearchStore());

    act(() => {
      result.current.setLoadingSuggestions(true);
    });

    expect(result.current.loadingSuggestions).toBe(true);
  });

  it('permite actualizar el error de sugerencias', () => {
    const { result } = renderHook(() => useSearchStore());
    const error = 'Error al buscar sugerencias';

    act(() => {
      result.current.setErrorSuggestions(error);
    });

    expect(result.current.errorSuggestions).toBe(error);
  });

  it('permite actualizar los resultados de búsqueda', () => {
    const { result } = renderHook(() => useSearchStore());
    const results = ['iPhone 13', 'iPhone 14', 'iPhone 15'];

    act(() => {
      result.current.setSearchResults(results);
    });

    expect(result.current.searchResults).toEqual(results);
  });

  it('permite actualizar el estado de loading de resultados', () => {
    const { result } = renderHook(() => useSearchStore());

    act(() => {
      result.current.setLoadingResults(true);
    });

    expect(result.current.loadingResults).toBe(true);
  });

  it('permite actualizar el error de resultados', () => {
    const { result } = renderHook(() => useSearchStore());
    const error = 'Error al buscar productos';

    act(() => {
      result.current.setErrorResults(error);
    });

    expect(result.current.errorResults).toBe(error);
  });

  it('permite actualizar el query de búsqueda', () => {
    const { result } = renderHook(() => useSearchStore());

    act(() => {
      result.current.setSearchQuery('iPhone 13');
    });

    expect(result.current.searchQuery).toBe('iPhone 13');
  });

  it('permite agregar elementos al historial', () => {
    const { result } = renderHook(() => useSearchStore());

    act(() => {
      result.current.addToHistory('iPhone');
    });

    expect(result.current.searchHistory).toContain('iPhone');
  });

  it('no duplica elementos en el historial', () => {
    const { result } = renderHook(() => useSearchStore());

    act(() => {
      result.current.addToHistory('iPhone');
      result.current.addToHistory('iPhone');
    });

    const iphoneCount = result.current.searchHistory.filter((item) => item === 'iPhone').length;
    expect(iphoneCount).toBe(1);
  });

  it('mantiene el historial en orden cronológico', () => {
    const { result } = renderHook(() => useSearchStore());

    act(() => {
      result.current.addToHistory('iPhone');
      result.current.addToHistory('Samsung');
      result.current.addToHistory('Xiaomi');
    });

    expect(result.current.searchHistory).toEqual(['Xiaomi', 'Samsung', 'iPhone']);
  });

  it('permite múltiples actualizaciones de estado', () => {
    const { result } = renderHook(() => useSearchStore());

    act(() => {
      result.current.setQuery('iPhone');
      result.current.setSuggestions(['iPhone 13', 'iPhone 14']);
      result.current.setLoadingSuggestions(true);
    });

    expect(result.current.query).toBe('iPhone');
    expect(result.current.suggestions).toEqual(['iPhone 13', 'iPhone 14']);
    expect(result.current.loadingSuggestions).toBe(true);
  });

  it('mantiene el estado entre renders', () => {
    const { result, rerender } = renderHook(() => useSearchStore());

    act(() => {
      result.current.setQuery('iPhone');
    });

    rerender();

    expect(result.current.query).toBe('iPhone');
  });

  it('no agrega queries vacíos al historial', () => {
    const { result } = renderHook(() => useSearchStore());

    act(() => {
      result.current.addToHistory('');
      result.current.addToHistory('   ');
    });

    expect(result.current.searchHistory).toEqual([]);
  });

  it('limita el historial a 10 elementos', () => {
    const { result } = renderHook(() => useSearchStore());

    act(() => {
      for (let i = 1; i <= 12; i++) {
        result.current.addToHistory(`Query ${i}`);
      }
    });

    expect(result.current.searchHistory.length).toBe(10);
    expect(result.current.searchHistory[0]).toBe('Query 12');
  });

  it('permite limpiar el historial', () => {
    const { result } = renderHook(() => useSearchStore());

    act(() => {
      result.current.addToHistory('iPhone');
      result.current.addToHistory('Samsung');
    });

    expect(result.current.searchHistory.length).toBeGreaterThan(0);

    act(() => {
      result.current.clearHistory();
    });

    expect(result.current.searchHistory).toEqual([]);
  });
});
