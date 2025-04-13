import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useFavoritesStore } from '@/store/favorites.store';

type Props = {
  artworkId: number;
};

export const FavoriteButton: React.ComponentType<Props> = ({ artworkId }) => {
  const { t } = useTranslation();

  const favorites = useFavoritesStore(state => state.favorites);
  const isFavorite = favorites.includes(artworkId);
  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);

  const handleToggle = () => {
    toggleFavorite(artworkId);

    if (isFavorite) {
      toast.error(t('toasts.removed_from_favorites'));
    } else {
      toast.success(t('toasts.added_to_favorites'));
    }
  };

  return (
    <Button variant="outline" onClick={handleToggle}>
      <Heart
        className={`mr-2 h-4 w-4 transition-transform duration-200 ${
          isFavorite ? 'scale-125 text-red-500' : 'text-muted-foreground scale-100'
        }`}
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
      />
      {isFavorite ? t('buttons.remove_from_favorites') : t('buttons.add_to_favorites')}
    </Button>
  );
};
