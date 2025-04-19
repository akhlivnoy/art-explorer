import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/artworks/$artworkId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { artworkId } = Route.useParams();

  return <div className="grow">Hello /_auth/artworks/{artworkId}!</div>;
}
