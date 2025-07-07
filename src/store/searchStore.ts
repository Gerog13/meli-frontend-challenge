import { create } from 'zustand';

interface SearchState {
  query: string;
  setQuery: (q: string) => void;

  results: string[];
  setResults: (r: string[]) => void;

  loading: boolean;
  setLoading: (l: boolean) => void;

  error: string | null;
  setError: (e: string | null) => void;

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

  results: [],
  setResults: (r) => set({ results: r }),

  loading: false,
  setLoading: (l) => set({ loading: l }),

  error: null,
  setError: (e) => set({ error: e }),

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
