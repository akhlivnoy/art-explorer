import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { X } from 'lucide-react';
import { useState } from 'react';

import { getArtworkById } from '@/api/endpoints/artworks.api';
import { FavoriteButton } from '@/components/FavoriteButton';

export const Route = createFileRoute('/artworks/$artworkId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { artworkId } = Route.useParams();
  const numericId = Number(artworkId);

  const [showModal, setShowModal] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['artwork', numericId],
    queryFn: () => getArtworkById(numericId),
  });

  if (isLoading) return <div className="text-muted-foreground p-8 text-center">Loading artwork...</div>;
  if (isError || !data) return <div className="p-8 text-center text-red-500">Failed to load artwork.</div>;

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col gap-10 p-6 md:flex-row md:items-start">
        <div className="w-full flex-shrink-0 cursor-pointer md:w-1/2" onClick={() => setShowModal(true)}>
          <img
            alt={data.title}
            className="w-full rounded-lg object-cover shadow-md transition-transform hover:scale-105"
            src={data.imageUrl || '/placeholder.jpg'}
          />
        </div>

        <div className="flex flex-col gap-4 md:w-1/2">
          <h1 className="text-3xl font-bold">{data.title}</h1>

          <div className="text-muted-foreground space-y-1">
            <p>
              <span className="font-medium">Author:</span> {data.author}
            </p>
            <p>
              <span className="font-medium">Year:</span> {data.year}
            </p>
            <p>
              <span className="font-medium">Description:</span> {data.description}
            </p>
          </div>

          <div className="mt-4">
            <FavoriteButton artworkId={data.objectID} />
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <button className="absolute top-4 right-4 text-white hover:text-red-500" onClick={() => setShowModal(false)}>
            <X size={32} />
          </button>
          <img
            alt={data.title}
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-xl"
            src={data.imageUrl}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
