import { createFileRoute } from '@tanstack/react-router';

import { FavoriteButton } from '@/components/FavoriteButton';

export const Route = createFileRoute('/artworks/$artworkId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { artworkId } = Route.useParams();
  const numericId = Number(artworkId);

  return (
    <div className="flex grow flex-col items-start gap-4 p-8">
      <h1 className="text-2xl font-bold">Artwork #{artworkId}</h1>

      <FavoriteButton artworkId={numericId} />
    </div>
  );
}
