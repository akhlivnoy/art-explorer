import { Link } from '@tanstack/react-router';
import { t } from 'i18next';
import { ChevronRight } from 'lucide-react';

import { FavoriteButton } from './FavoriteButton';
import { Button } from './ui/button';
import { Large, Muted } from './ui/typography';

type ArtworkCardProps = {
  id: number;
  title: string;
  artist: string;
  image: string;
};

export const ArtworkCard: React.FunctionComponent<ArtworkCardProps> = ({ id, title, artist, image }) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <img alt={title} src={image} />
      <Large>{title}</Large>
      <Muted>{artist}</Muted>

      <div className="mt-2 flex w-full items-center justify-between">
        <Button asChild className="pl-0" variant="link">
          <Link params={{ artworkId: id.toString() }} to="/artworks/$artworkId">
            {t('buttons.read_more')}
            <ChevronRight />
          </Link>
        </Button>
        <FavoriteButton artworkId={id} />
      </div>
    </div>
  );
};
