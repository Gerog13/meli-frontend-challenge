import { create } from 'zustand';

interface SearchState {
  query: string;
  setQuery: (q: string) => void;

  suggestions: string[];
  setSuggestions: (s: string[]) => void;
  loadingSuggestions: boolean;
  setLoadingSuggestions: (l: boolean) => void;
  errorSuggestions: string | null;
  setErrorSuggestions: (e: string | null) => void;

  searchResults: string[];
  setSearchResults: (r: string[]) => void;
  loadingResults: boolean;
  setLoadingResults: (l: boolean) => void;
  errorResults: string | null;
  setErrorResults: (e: string | null) => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;

  searchHistory: string[];
  addToHistory: (q: string) => void;
  clearHistory: () => void;
}

const HISTORY_KEY = 'meli_search_history';

function loadHistory(): string[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: string[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {}
}

export const useSearchStore = create<SearchState>((set, get) => ({
  query: '',
  setQuery: (q) => set({ query: q }),

  suggestions: [],
  setSuggestions: (s) => set({ suggestions: s }),
  loadingSuggestions: false,
  setLoadingSuggestions: (l) => set({ loadingSuggestions: l }),
  errorSuggestions: null,
  setErrorSuggestions: (e) => set({ errorSuggestions: e }),

  searchResults: [],
  setSearchResults: (r) => set({ searchResults: r }),
  loadingResults: false,
  setLoadingResults: (l) => set({ loadingResults: l }),
  errorResults: null,
  setErrorResults: (e) => set({ errorResults: e }),

  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),

  searchHistory: loadHistory(),
  addToHistory: (q) => {
    if (!q.trim()) return;
    const prev = get().searchHistory.filter((item) => item.toLowerCase() !== q.toLowerCase());
    const next = [q, ...prev].slice(0, 10);
    set({ searchHistory: next });
    saveHistory(next);
  },
  clearHistory: () => {
    set({ searchHistory: [] });
    saveHistory([]);
  },
}));
