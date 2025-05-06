import { Link } from '@tanstack/react-router';
import { t } from 'i18next';
import { UserCircle } from 'lucide-react';
import { useMemo } from 'react';

import { useLogout } from '@/api/queries/auth.query';
import LogoIcon from '@/assets/logo.svg?react';
import { LocalizationKey } from '@/localization';
import { FileRouteTypes } from '@/routeTree.gen';
import { useAuthStore } from '@/store/auth.store';

import { NavLink } from './NavLink';
import { Button } from './ui/button';

type MainHeaderLink = {
  to: FileRouteTypes['to'];
  labelKey: LocalizationKey;
  authRequired?: boolean;
};

const MAIN_HEADER_LINKS: ReadonlyArray<MainHeaderLink> = [
  {
    to: '/',
    labelKey: 'labels.home',
  },
  {
    to: '/explore',
    labelKey: 'labels.explore_arts',
  },
  {
    to: '/favorites',
    labelKey: 'labels.favorites_arts',
  },
];

export const MainHeader: React.ComponentType = () => {
  const { user, setAuthAction } = useAuthStore();
  const logoutMutation = useLogout();

  const showSignUpModal = () => {
    setAuthAction('sign-up');
  };

  // filter out routes that require auth
  const linksToShow = useMemo(() => MAIN_HEADER_LINKS.filter(link => !link.authRequired || !!user), [user]);

  return (
    <header className="grid grid-cols-3 items-center gap-2 py-6">
      <div className="justify-self-start">
        <Link to="/">
          <LogoIcon className="fill-foreground" />
        </Link>
      </div>

      <nav className="flex gap-8 justify-self-center">
        {linksToShow.map(({ to, labelKey }) => (
          <NavLink key={`${to}-${labelKey.toString()}`} to={to}>
            {t(labelKey)}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center space-x-4 justify-self-end">
        {user ? (
          <>
            <Link search={{ page: 1 }} to="/favorites">
              <UserCircle size={36} />
            </Link>
            <Button onClick={() => logoutMutation.mutate()}>{t('buttons.logout')}</Button>
          </>
        ) : (
          <Button onClick={showSignUpModal}>{t('buttons.join')}</Button>
        )}
      </div>
    </header>
  );
};
