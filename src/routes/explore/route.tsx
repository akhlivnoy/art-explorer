import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { getArtworks } from '@/api/endpoints/artworks.api';
import type { Artwork } from '@/api/types/api.types';
import { ArtworkList } from '@/components/ArtworkList';

export const Route = createFileRoute('/explore')({
  component: ExplorePage,
  validateSearch: search => {
    const page = Number(search.page ?? 1);
    return { page: isNaN(page) || page < 1 ? 1 : page };
  },
});

function ExplorePage() {
  const { page } = Route.useSearch();
  const pageSize = 6;

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['exploreArtworks', page, pageSize],
    queryFn: () => getArtworks({ page, pageSize }),
    placeholderData: prev => prev,
  });

  const artworks: Artwork[] = data?.items ?? [];
  const totalPages = data ? Math.ceil(data.total / pageSize) : 1;

  return (
    <ArtworkList
      updatePageRange
      currentPage={page}
      data={artworks}
      isError={isError}
      isFetching={isFetching}
      isLoading={isLoading}
      to={Route.to}
      totalPages={totalPages}
    />
  );
}
