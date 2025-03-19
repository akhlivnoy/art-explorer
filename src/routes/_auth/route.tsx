import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { H3, P } from '@/components/ui/typography';

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context: { auth }, location }) => {
    if (!auth.user) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <H3>Authenticated route</H3>
      <P>This route&apos;s content is only visible to authenticated users.</P>

      <Outlet />
    </div>
  );
}
