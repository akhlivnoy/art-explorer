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
  const artworkLinkProps = {
    params: { artworkId: id.toString() },
    to: '/artworks/$artworkId',
    target: '_blank',
  };

  return (
    <div className="flex h-[500px] w-full flex-col overflow-hidden rounded-md border p-2">
      <Link {...artworkLinkProps} className="block h-[300px] w-full overflow-hidden rounded bg-gray-100">
        {image ? (
          <img alt={title} className="h-full w-full object-cover transition-transform hover:scale-105" src={image} />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">No Image</div>
        )}
      </Link>

      <div className="mt-2 flex flex-1 flex-col justify-between overflow-auto">
        <Link {...artworkLinkProps} className="block">
          <Large className="hover:underline">{title}</Large>
        </Link>
        <Muted className="hover:text-foreground">{artist}</Muted>

        <div className="mt-2 flex w-full items-center justify-between">
          <Button asChild className="pl-0" variant="link">
            <Link {...artworkLinkProps}>
              {t('buttons.read_more')}
              <ChevronRight />
            </Link>
          </Button>
          <FavoriteButton artworkId={id} />
        </div>
      </div>
    </div>
  );
};
