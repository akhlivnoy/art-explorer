import { FavoritesApi } from '@/api/endpoints/favorites.api';
import { useFavoritesStore } from '@/store/favorites.store';

/**
 * Merges local favorites with server-side favorites after login.
 * Updates Zustand and syncs to backend.
 * @param userId - The ID of the logged-in user.
 * @returns Array of merged favorite artwork IDs.
 */
export const mergeLocalFavoritesWithServer = async (userId: string): Promise<number[]> => {
  const store = useFavoritesStore.getState();

  // grab what was locally saved
  const localFavorites = store.favorites;

  // load from API and overwrite store.favorites
  const serverFavorites = await FavoritesApi.getFavorites(userId);

  // merge & dedupe
  const merged = Array.from(new Set([...localFavorites, ...serverFavorites]));
  useFavoritesStore.setState({ favorites: merged });

  // push merged back to server — reload state to get updated favorites
  const updatedStore = useFavoritesStore.getState();
  await updatedStore.syncFavoritesToApi(userId);

  // return the merged IDs for pagination and queries
  return merged;
};
