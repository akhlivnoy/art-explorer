import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { getArtworks } from '@/api/endpoints/artworks.api';
import { ArtworkCard } from '@/components/ArtworkCard';
import { PaginationList } from '@/components/PaginationList';
import { Spinner } from '@/components/Spinner';

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

  const totalPages = data ? Math.ceil(data.total / pageSize) : 1;

  return (
    <div className="flex flex-col gap-6 p-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : isError || !data ? (
        <div>Failed to load artworks.</div>
      ) : (
        <>
          <div className="relative">
            {!isLoading && isFetching && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
                <Spinner />
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.items.map(artwork => (
                <ArtworkCard
                  artist={artwork.author}
                  id={artwork.objectID}
                  image={artwork.imageUrl}
                  key={artwork.objectID}
                  title={artwork.title}
                />
              ))}
            </div>
          </div>
          <PaginationList currentPage={page} to="/explore" totalPages={totalPages} updatePageRange={true} />
        </>
      )}
    </div>
  );
}
