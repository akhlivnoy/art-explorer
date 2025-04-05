import { Link } from '@tanstack/react-router';
import { t } from 'i18next';

import LogoIcon from '@/assets/logo.svg?react';
import { LocalizationKey } from '@/localization';
import { FileRouteTypes } from '@/routeTree.gen';
import { useAuthStore } from '@/store/auth.store';

import { NavLink } from './NavLink';
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
    // TODO: change to /arts
    to: '/posts',
    labelKey: 'labels.explore_arts',
  },
];

export const MainHeader: React.ComponentType = () => {
  const auth = useAuthStore();

  const showSignUpModal = () => {
    // TODO: open modal with sign up form
  };

  return (
    <header className="grid grid-cols-3 items-center gap-2 py-6">
      <div className="justify-self-start">
        <Link to="/">
          <LogoIcon className="fill-foreground" />
        </Link>
      </div>

      <nav className="flex gap-8 justify-self-center">
        {MAIN_HEADER_LINKS.map(({ to, labelKey }) => (
          <NavLink key={`${to}-${labelKey.toString()}`} to={to}>
            {t(labelKey)}
          </NavLink>
        ))}
      </nav>

      <div className="justify-self-end">
        {auth.user ? (
          // TODO: show profile picture
          <div />
        ) : (
          <Button onClick={showSignUpModal}>{t('buttons.join')}</Button>
        )}
      </div>
    </header>
  );
};
