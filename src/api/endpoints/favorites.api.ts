import { apiClient } from '../apiClient';
import { ApiErrorResponse } from '../types/api.types';
import { GetFavoritesResponse, SyncFavoritesRequest } from '../types/favorites.types';
import { handleApiResponse, handleApiResponseErrors } from '../utils';

export const FavoritesApi = {
  /**
   * Fetches favorites from the backend for a given user ID
   */
  getFavorites: async (userId: number) => {
    const response = await apiClient.get<GetFavoritesResponse, ApiErrorResponse>(`users/${userId}/favorites`);
    return handleApiResponse(response);
  },

  /**
   * Sends the current favorites list to the backend
   */
  syncFavorites: async (userId: number, data: SyncFavoritesRequest) => {
    const response = await apiClient.put<undefined, ApiErrorResponse>(`users/${userId}/favorites`, data);
    return handleApiResponseErrors(response).data;
  },
};
