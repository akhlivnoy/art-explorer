import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { FavoritesApi } from '@/api/endpoints/favorites.api';

import { useAuthStore } from './auth.store';

type FavoriteState = {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  loadFavoritesFromApi: (userId: string) => Promise<void>;
  syncFavoritesToApi: (userId: string) => Promise<void>;
  clearFavorites: () => void;
};

export const useFavoritesStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],

      /**
       * Adds or removes an artwork ID from favorites.
       * Automatically syncs to backend if user is authenticated.
       */
      toggleFavorite: id => {
        const setFav = new Set(get().favorites);
        if (setFav.has(id)) {
          setFav.delete(id);
        } else {
          setFav.add(id);
        }
        const updated = Array.from(setFav);
        set({ favorites: updated });

        const userId = useAuthStore.getState().user?.id;
        if (userId) {
          void FavoritesApi.syncFavorites(userId, { favorites: updated });
        }
      },

      /**
       * Checks if the artwork is in the favorites list.
       */
      isFavorite: id => get().favorites.includes(id),

      /**
       * Loads the favorites list from backend.
       */
      loadFavoritesFromApi: async (userId: string) => {
        const response = await FavoritesApi.getFavorites(userId);
        set({ favorites: response.favorites });
      },

      /**
       * Sends the current favorites list to backend.
       */
      syncFavoritesToApi: async (userId: string) => {
        await FavoritesApi.syncFavorites(userId, { favorites: get().favorites });
      },

      /**
       * Clears all local favorites.
       */
      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: 'favorites-storage', // Persist key for localStorage
    },
  ),
);
