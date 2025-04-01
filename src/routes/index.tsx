import { createFileRoute } from '@tanstack/react-router';
import { t } from 'i18next';

import homeBanner from '@/assets/home-banner.webp';
import { Button } from '@/components/ui/button';
import { H1, P } from '@/components/ui/typography';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

const showSignUpModal = () => {
  // TODO: open modal with sign up form
};

const showLoginModal = () => {
  // TODO: open modal with sign in form
};

function RouteComponent() {
  return (
    <div>
      <section className="flex h-[calc(100vh-98px)] items-center gap-20">
        <div className="flex-1/2">
          <H1>{t('pages.home.hero_section.title')}</H1>
          <P>{t('pages.home.hero_section.description')}</P>

          <div className="mt-8 flex gap-4">
            <Button size="lg" onClick={showLoginModal}>
              {t('buttons.login')}
            </Button>
            <Button size="lg" variant="outline" onClick={showSignUpModal}>
              {t('buttons.sign_up')}
            </Button>
          </div>
        </div>

        <div className="flex max-h-full flex-1/2">
          <img alt="Banner" className="aspect-square object-cover" loading="eager" src={homeBanner} />
        </div>
      </section>
    </div>
  );
}
