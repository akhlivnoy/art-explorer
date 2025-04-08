import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context: { auth }, location, preload }) => {
    if (!auth.user && !preload) {
      auth.setAuthAction('sign-in');
      throw redirect({
        to: '..',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
