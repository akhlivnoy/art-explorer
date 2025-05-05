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
        let action: 'add' | 'remove';

        if (setFav.has(id)) {
          setFav.delete(id);
          action = 'remove';
        } else {
          setFav.add(id);
          action = 'add';
        }
        const updated = Array.from(setFav);
        set({ favorites: updated });

        const userId = useAuthStore.getState().user?.id;
        if (userId) {
          const favoriteDto = { userId, artworkId: id };
          if (action === 'add') {
            void FavoritesApi.createFavorites([favoriteDto]);
          } else {
            void FavoritesApi.deleteFavorite({ userId, artworkId: id });
          }
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
        await FavoritesApi.getFavorites(userId);
      },

      /**
       * Sends the current favorites list to backend.
       */
      syncFavoritesToApi: async (userId: string) => {
        const favorites = get().favorites.map(artworkId => ({
          userId,
          artworkId,
        }));
        await FavoritesApi.createFavorites(favorites);
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
