// Response format from GET /users/:userId/favorites
export interface GetFavoritesResponse {
  favorites: FavoriteDto[];
}

// Request format for PUT /users/:userId/favorites
export interface SyncFavoritesRequest {
  favoriteDto: FavoriteDto[];
}

export interface FavoriteDto {
  userId: string;
  artworkId: number;
}
