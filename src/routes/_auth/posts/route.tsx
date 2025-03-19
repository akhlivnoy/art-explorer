import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Outlet, stripSearchParams } from '@tanstack/react-router';
import { z } from 'zod';

import { postsQueryOptions } from '@/api/queries/posts.query';
import { PaginationList } from '@/components/PaginationList';
import { Spinner } from '@/components/Spinner';

import { PostsList } from './-components/PostsList';

const defaultValues = {
  page: 1,
};

const LIMIT = 25;

export const Route = createFileRoute('/_auth/posts')({
  validateSearch: z.object({
    page: z.number().int().gt(0).default(defaultValues.page).catch(defaultValues.page),
  }),
  search: {
    middlewares: [stripSearchParams(defaultValues)],
  },
  loaderDeps: ({ search }) => search,
  loader: ({ context: { queryClient }, deps: { page } }) => {
    void queryClient.prefetchQuery(postsQueryOptions({ limit: LIMIT, skip: LIMIT * (page - 1) }));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { page } = Route.useLoaderDeps();
  const { data, isFetching, isFetched, isSuccess } = useQuery(
    postsQueryOptions({ limit: LIMIT, skip: LIMIT * (page - 1) }),
  );

  return (
    <div className="flex gap-2 p-2">
      <div className="flex flex-1/2 flex-col gap-4 overflow-x-hidden border-r-2 border-gray-400 px-4">
        <div className="self-center text-3xl text-green-600">
          <Spinner show={isFetching} />
        </div>
        {isSuccess && (
          <>
            <PostsList page={page} posts={data.posts} />
            <PaginationList
              currentPage={page}
              to="/posts"
              totalPages={Math.ceil(data.total / LIMIT)}
              updatePageRange={isFetched}
            />
          </>
        )}
      </div>

      <div className="flex-1/2">
        <Outlet />
      </div>
    </div>
  );
}
