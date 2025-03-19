import { useNavigate, useRouter } from '@tanstack/react-router';

import i18n, { LocalizationKey } from '@/localization';
import { FileRouteTypes } from '@/routeTree.gen';
import { useAuthStore } from '@/store/auth.store';

import { MainHeaderLink } from './MainHeaderLink';
import { Button } from './ui/button';

type MainHeaderLink = {
  to: FileRouteTypes['to'];
  labelKey: LocalizationKey;
};

const MAIN_HEADER_LINKS: ReadonlyArray<MainHeaderLink> = [
  {
    to: '/',
    labelKey: 'labels.home',
  },
  {
    to: '/login',
    labelKey: 'labels.login',
  },
  {
    to: '/posts',
    labelKey: 'labels.posts',
  },
];

export const MainHeader: React.ComponentType = () => {
  const router = useRouter();
  const navigate = useNavigate();
  const auth = useAuthStore();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      auth.logout();
      router.invalidate().finally(() => {
        navigate({ to: '/' });
      });
    }
  };

  return (
    <header className="flex justify-center gap-4 border-b-2 p-4">
      {MAIN_HEADER_LINKS.map(({ to, labelKey }) => (
        <MainHeaderLink key={`${to}-${labelKey.toString()}`} to={to}>
          {i18n.t(labelKey)}
        </MainHeaderLink>
      ))}

      {auth.user && (
        <Button className="absolute right-10" onClick={handleLogout}>
          {i18n.t('buttons.logout')}
        </Button>
      )}
    </header>
  );
};
