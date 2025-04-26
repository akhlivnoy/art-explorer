import { useFavoritesStore } from '@/store/favorites.store';

/**
 * Merges local favorites with server-side favorites after login.
 * Updates Zustand and syncs to backend.
 */
export const mergeLocalFavoritesWithServer = async (userId: string) => {
  const localFavorites = useFavoritesStore.getState().favorites;

  await useFavoritesStore.getState().loadFavoritesFromApi(userId);
  const serverFavorites = useFavoritesStore.getState().favorites;

  const merged = Array.from(new Set([...localFavorites, ...serverFavorites]));
  useFavoritesStore.setState({ favorites: merged });

  await useFavoritesStore.getState().syncFavoritesToApi(userId);
};
