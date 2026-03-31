import { useState, useCallback, useContext, createContext, type ReactNode } from 'react';
import type { MediaCardItem } from '../components/MediaCard';

const STORAGE_KEY = 'movie-explorer:watchlist';

function loadFromStorage(): MediaCardItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MediaCardItem[]) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: MediaCardItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

interface WatchlistContextValue {
  items: MediaCardItem[];
  toggle: (item: MediaCardItem) => void;
  isInWatchlist: (id: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextValue | null>(null);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<MediaCardItem[]>(loadFromStorage);

  const toggle = useCallback((item: MediaCardItem) => {
    setItems((prev) => {
      const next = prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [item, ...prev];
      saveToStorage(next);
      return next;
    });
  }, []);

  const isInWatchlist = useCallback(
    (id: string) => items.some((i) => i.id === id),
    [items]
  );

  return (
    <WatchlistContext.Provider value={{ items, toggle, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist(): WatchlistContextValue {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error('useWatchlist must be used inside WatchlistProvider');
  return ctx;
}
