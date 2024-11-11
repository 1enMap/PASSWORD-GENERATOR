import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PasswordEntry {
  password: string;
  timestamp: string;
  strength: number;
}

interface PasswordStore {
  history: PasswordEntry[];
  favorites: PasswordEntry[];
  addToHistory: (entry: PasswordEntry) => void;
  addToFavorites: (entry: PasswordEntry) => void;
  removeFromFavorites: (entry: PasswordEntry) => void;
  clearHistory: () => void;
  clearFavorites: () => void;
}

export const usePasswordStore = create<PasswordStore>()(
  persist(
    (set) => ({
      history: [],
      favorites: [],
      addToHistory: (entry) =>
        set((state) => ({
          history: [entry, ...state.history.slice(0, 9)],
        })),
      addToFavorites: (entry) =>
        set((state) => ({
          favorites: [entry, ...state.favorites],
        })),
      removeFromFavorites: (entry) =>
        set((state) => ({
          favorites: state.favorites.filter((e) => e.password !== entry.password),
        })),
      clearHistory: () => set({ history: [] }),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'password-storage',
    }
  )
);