import Logo from '@/assets/logo.svg?react';
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
        <Logo className="fill-foreground" />
      </div>

      <div className="flex gap-8 justify-self-center">
        {MAIN_HEADER_LINKS.map(({ to, labelKey }) => (
          <MainHeaderLink key={`${to}-${labelKey.toString()}`} to={to}>
            {i18n.t(labelKey)}
          </MainHeaderLink>
        ))}
      </div>

      <div className="justify-self-end">
        {auth.user ? (
          <Button onClick={showSignUpModal}>{i18n.t('buttons.join')}</Button>
        ) : (
          // TODO: show profile picture
          <div />
        )}
      </div>
    </header>
  );
};
