import { createFileRoute } from '@tanstack/react-router';

// import { t } from 'i18next';
import { ArtworkList } from '@/components/ArtworkList';
// import { P } from '@/components/ui/typography';
import { useFavoriteArtworks } from '@/hooks/useFavoriteArtworks';
// import { useAuthStore } from '@/store/auth.store';

export const Route = createFileRoute('/favorites')({
  component: FavoritesPage,
  validateSearch: s => {
    const p = Number(s.page ?? 1);
    return { page: isNaN(p) || p < 1 ? 1 : p };
  },
});

function FavoritesPage() {
  // const user = useAuthStore(s => s.user);
  const { page } = Route.useSearch();
  const pageSize = 6;

  const { items, total, isLoading, isError, isFetching } = useFavoriteArtworks(page, pageSize);

  // if (!user) {
  //   return <P>{t('errors.must_be_logged_in')}</P>;
  // }

  return (
    <ArtworkList
      updatePageRange
      currentPage={page}
      data={items}
      isError={isError}
      isFetching={isFetching}
      isLoading={isLoading}
      to={Route.to}
      totalPages={Math.ceil(total / pageSize)}
    />
  );
}
