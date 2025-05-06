import { apiClient } from '../apiClient';
import { ApiErrorResponse } from '../types/api.types';
import { FavoriteDto } from '../types/favorites.types';
import { handleApiResponse } from '../utils';

export const FavoritesApi = {
  /**
   * Creates multiple favorites for a user.
   */
  createFavorites: async (favorites: FavoriteDto[]): Promise<{ message: string[] }> => {
    const response = await apiClient.post<{ message: string[] }, ApiErrorResponse>('/api/favorites/Create', favorites);
    return handleApiResponse(response);
  },

  /**
   * Gets all favorites for a specific user.
   */
  getFavorites: async (userId: string): Promise<number[]> => {
    // const response = await apiClient.get<GetFavoritesResponse, ApiErrorResponse>(`/api/favorites/Read/${userId}`);
    // const data = handleApiResponseErrors(response)?.data;
    // return (data?.favorites ?? []).map(fav => fav.artworkId);
    const response = await apiClient.get<FavoriteDto[], ApiErrorResponse>(`/api/favorites/Read/${userId}`);
    const favorites = handleApiResponse(response);
    return (favorites ?? []).map(fav => fav.artworkId);
  },

  /**
   * Deletes a specific favorite.
   */
  deleteFavorite: async (favorite: FavoriteDto): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }, ApiErrorResponse>(
      '/api/favorites/Delete',
      {},
      {
        data: favorite,
      },
    );
    return handleApiResponse(response);
  },
};
