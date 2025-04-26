// src/hooks/useSyncFavorites.ts
import { useEffect } from 'react';

import { mergeLocalFavoritesWithServer } from '@/services/favorites.service';
import { useAuthStore } from '@/store/auth.store';

export function useSyncFavorites() {
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    if (!user) return;
    mergeLocalFavoritesWithServer(user.id).catch(err => console.error('Sync favorites failed:', err));
  }, [user]);
}
