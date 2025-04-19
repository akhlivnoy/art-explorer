import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet, redirect } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { z } from 'zod';

import { MainFooter } from '@/components/MainFooter';
import { MainHeader } from '@/components/MainHeader';
import { LoginModal } from '@/components/modals/LoginModal';
import { RegisterModal } from '@/components/modals/RegisterModal';
import { AuthStore } from '@/store/auth.store';

interface RouterContext {
  queryClient: QueryClient;
  auth: AuthStore;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context: { auth }, search }) => {
    if (auth.user && search.redirect) {
      throw redirect({ to: search.redirect });
    }
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col px-4">
      <MainHeader />

      <Outlet />

      <LoginModal />
      <RegisterModal />

      <MainFooter />

      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </div>
  );
}
