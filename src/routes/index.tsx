import { createFileRoute, Link } from '@tanstack/react-router';
import { t } from 'i18next';

import homeBannerJpeg from '@/assets/home-banner.jpg';
import homeBannerWebp from '@/assets/home-banner.webp';
import { Button } from '@/components/ui/button';
import { H1, H2, P } from '@/components/ui/typography';
import { useAuthStore } from '@/store/auth.store';

import { ArtworkCarousel } from './-components/ArtworkCarousel';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useAuthStore(state => state.user);
  const setAuthAction = useAuthStore(state => state.setAuthAction);

  const showSignUpModal = () => setAuthAction('sign-up');
  const showLoginModal = () => setAuthAction('sign-in');

  return (
    <div>
      <section className="flex h-[calc(100vh-98px)] items-center gap-20" id="hero">
        <div className="flex-1/2">
          <H1>{t('pages.home.hero_section.title')}</H1>
          <P>{t('pages.home.hero_section.description')}</P>

          <div className="mt-8 flex gap-4">
            {!user ? (
              <>
                <Button size="lg" onClick={showLoginModal}>
                  {t('buttons.login')}
                </Button>
                <Button size="lg" variant="outline" onClick={showSignUpModal}>
                  {t('buttons.sign_up')}
                </Button>
              </>
            ) : null}
          </div>
        </div>

        <div className="flex max-h-full flex-1/2">
          <picture>
            <source srcSet={homeBannerWebp} type="image/webp" />
            <source srcSet={homeBannerJpeg} type="image/jpeg" />
            <img alt="Banner" className="aspect-square object-cover" />
          </picture>
        </div>
      </section>

      <section id="arts-carousel">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <H2>{t('pages.home.explore_arts.title')}</H2>
            <P>{t('pages.home.explore_arts.description')}</P>
          </div>

          <Button asChild variant="outline">
            <Button asChild variant="outline">
              <Link search={{ page: 1 }} to="/explore">
                {t('buttons.view_all')}
              </Link>
            </Button>
          </Button>
        </div>
        <ArtworkCarousel />
      </section>
    </div>
  );
}
