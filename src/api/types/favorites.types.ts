// Represents an artwork marked as favorite
export type FavoriteArtworkId = number;

// Response format from GET /users/:userId/favorites
export interface GetFavoritesResponse {
  favorites: FavoriteArtworkId[];
}

// Request format for PUT /users/:userId/favorites
export interface SyncFavoritesRequest {
  favorites: FavoriteArtworkId[];
}
