import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/posts/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Select a post.</div>;
}
