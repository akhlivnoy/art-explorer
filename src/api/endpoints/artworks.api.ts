import { apiClient } from '../apiClient';
import { ApiError, ApiErrorResponse, Artwork, PaginationBody } from '../types/api.types';

type GetArtworksResponse = {
  results: Artwork[];
  totalCount: number;
};

export const getArtworks = async (params: PaginationBody = {}): Promise<{ items: Artwork[]; total: number }> => {
  const response = await apiClient.get<GetArtworksResponse, ApiErrorResponse>('/api/Artworks', params);

  console.log('🔍 API response raw:', response);

  if (!response.ok || !response.data) {
    console.error('API ERROR:', response.problem);
    throw new ApiError(response.problem || 'Unknown error');
  }

  console.log('✅ Parsed results:', response.data.results);

  return {
    items: response.data.results,
    total: response.data.totalCount,
  };
};

export const getArtworkById = async (id: number) => {
  const response = await apiClient.get<Artwork>(`/api/Artworks/${id}`);
  if (!response.ok || !response.data) {
    throw new Error('Failed to fetch artwork');
  }
  return response.data;
};
