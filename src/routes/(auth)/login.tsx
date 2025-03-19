import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { P } from '@/components/ui/typography';
import i18n from '@/localization';

export const Route = createFileRoute('/(auth)/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context: { auth }, search }) => {
    if (auth.user && search.redirect) {
      throw redirect({ to: search.redirect });
    }
  },
  loader: ({ context: { auth } }) => {
    return {
      isAuthenticated: !!auth.user,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated } = Route.useLoaderData();
  const { auth } = Route.useRouteContext();
  const router = useRouter();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      username: { value: string };
    };
    const username = target.username.value;
    auth.setUser({ id: Math.floor(10000 + Math.random() * 90000).toString(), username });
    router.invalidate();
  };

  return (
    <div>
      {isAuthenticated ? (
        <P>{i18n.t('labels.hello', { username: auth.user?.username })}</P>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <Input required name="username" placeholder={i18n.t('labels.username')}></Input>
          <Button type="submit">{i18n.t('buttons.login')}</Button>
        </form>
      )}
    </div>
  );
}
