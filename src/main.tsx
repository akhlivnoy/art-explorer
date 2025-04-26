import './index.css';
import './localization';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRouter, ErrorComponent, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { Spinner } from './components/Spinner';
import { Toaster } from './components/ui/sonner';
import { DEFAULT_STALE_TIME } from './constants/api';
import { useSyncFavorites } from './hooks/useSyncFavorites';
// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { useAuthStore } from './store/auth.store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME,
    },
  },
});

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient: undefined!,
    auth: undefined!,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  defaultPendingMs: 500,
  defaultNotFoundComponent: () => <div>404 Not Found</div>,
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  defaultPendingComponent: () => (
    <div className="p-2 text-2xl">
      <Spinner />
    </div>
  ),
});

// Register the Router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const authStore = useAuthStore();
  useSyncFavorites();
  // Inject the returned value from the hook into the router context
  return <RouterProvider context={{ auth: authStore, queryClient: queryClient }} router={router} />;
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster richColors position="bottom-right" />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </StrictMode>,
  );
}
