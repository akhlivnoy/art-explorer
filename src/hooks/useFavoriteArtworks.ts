import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';

import { getArtworkById } from '@/api/endpoints/artworks.api';
import { mergeLocalFavoritesWithServer } from '@/services/favorites.service';
import { useAuthStore } from '@/store/auth.store';
import { useFavoritesStore } from '@/store/favorites.store';

export function useFavoriteArtworks(page: number, pageSize: number) {
  const user = useAuthStore(s => s.user);
  const localFavs = useFavoritesStore(s => s.favorites);
  const lastUserId = useRef<string | undefined>('?');
  const [mergedIds, setMergedIds] = useState<number[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const newId = user?.id;
    if (lastUserId.current === newId) {
      return;
    }
    lastUserId.current = newId;

    if (!user) {
      setMergedIds(useFavoritesStore.getState().favorites);
      setInitialized(true);
      return;
    }

    mergeLocalFavoritesWithServer(user.id)
      .then(ids => {
        setMergedIds(ids);
      })
      .catch(console.error)
      .finally(() => {
        setInitialized(true);
      });
  }, [user]);

  useEffect(() => {
    // if (!user) {
    setMergedIds(localFavs);
    // }
  }, [localFavs]);

  const pageIds = useMemo(() => {
    const start = (page - 1) * pageSize;
    return mergedIds.slice(start, start + pageSize);
  }, [mergedIds, page, pageSize]);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['favoriteArtworks', pageIds],
    queryFn: () => Promise.all(pageIds.map(id => getArtworkById(id))),
    enabled: initialized && pageIds.length > 0,
  });

  return {
    items: data ?? [],
    total: mergedIds.length,
    isLoading,
    isError,
    isFetching,
  };
}
