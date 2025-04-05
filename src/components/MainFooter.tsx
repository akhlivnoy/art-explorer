import { t } from 'i18next';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';

import LogoIcon from '@/assets/logo.svg?react';
import { LocalizationKey } from '@/localization';
import { FileRouteTypes } from '@/routeTree.gen';

import { NavLink } from './NavLink';
import { P } from './ui/typography';

type MainFooterLink = {
  to: FileRouteTypes['to'];
  labelKey: LocalizationKey;
};

const MAIN_FOOTER_LINKS: ReadonlyArray<MainFooterLink> = [
  {
    to: '/',
    labelKey: 'labels.art_gallery',
  },
  {
    to: '/',
    labelKey: 'labels.contact_us',
  },
];

type Social = {
  iconName: IconName;
  link: string;
};

const SOCIALS: ReadonlyArray<Social> = [
  {
    iconName: 'facebook',
    link: '#hero',
  },
  {
    iconName: 'instagram',
    link: '#hero',
  },
  {
    iconName: 'linkedin',
    link: '#hero',
  },
];

export const MainFooter: React.ComponentType = () => {
  return (
    <footer className="flex flex-col gap-10 py-10">
      <div className="grid grid-cols-3 items-center">
        <LogoIcon className="justify-self-start" />

        <ul className="flex gap-8 justify-self-center">
          {MAIN_FOOTER_LINKS.map(({ to, labelKey }) => (
            <NavLink activeProps={undefined} className="text-base font-semibold" key={labelKey.toString()} to={to}>
              {t(labelKey)}
            </NavLink>
          ))}
        </ul>

        <ul className="flex gap-3 justify-self-end">
          {SOCIALS.map(social => (
            <li key={social.iconName}>
              <a href={social.link}>
                <DynamicIcon name={social.iconName} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-foreground border-t pt-5">
        <P className="text-center">{t('labels.all_rights_reserved')}</P>
      </div>
    </footer>
  );
};
