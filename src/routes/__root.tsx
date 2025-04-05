import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { MainFooter } from '@/components/MainFooter';
import { MainHeader } from '@/components/MainHeader';
import { AuthStore } from '@/store/auth.store';

interface RouterContext {
  queryClient: QueryClient;
  auth: AuthStore;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});
function RootComponent() {
  return (
    <div className="container mx-auto min-h-screen px-4">
      <MainHeader />

      <Outlet />

      <MainFooter />

      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </div>
  );
}
