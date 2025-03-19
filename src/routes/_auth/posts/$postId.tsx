import { useQueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, ErrorComponent, ErrorComponentProps, useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';

import { postQueryOptions } from '@/api/queries/posts.query';
import { NotFoundError } from '@/api/types/api.types';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_auth/posts/$postId')({
  beforeLoad: ({ params: { postId } }) => ({ postId: Number(postId) }),
  loader: ({ context: { queryClient, postId } }) => queryClient.ensureQueryData(postQueryOptions({ postId: postId })),
  errorComponent: PostErrorComponent,
  component: RouteComponent,
  pendingComponent: () => <p>Loading post details...</p>,
});

function PostErrorComponent({ error }: ErrorComponentProps) {
  const router = useRouter();

  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  if (error instanceof NotFoundError) {
    return <div>NotFoundError: {error.message}</div>;
  }

  return (
    <div>
      <Button
        variant="outline"
        onClick={() => {
          router.invalidate();
        }}
      >
        Retry
      </Button>
      <ErrorComponent error={error} />
    </div>
  );
}

function RouteComponent() {
  const { postId } = Route.useRouteContext();
  const { data: post } = useSuspenseQuery(postQueryOptions({ postId }));

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">{post?.title}</h4>
      <div className="text-sm">{post?.body}</div>
    </div>
  );
}
