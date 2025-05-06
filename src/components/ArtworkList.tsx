// src/components/ArtworkList.tsx

import { t } from 'i18next';
import React from 'react';

import { Artwork } from '@/api/types/api.types';
import { ArtworkCard } from '@/components/ArtworkCard';
import { PaginationList } from '@/components/PaginationList';
import { Spinner } from '@/components/Spinner';
import { P } from '@/components/ui/typography';
import type { FileRouteTypes } from '@/routeTree.gen';

interface ArtworkListProps {
  isLoading: boolean;
  isError: boolean;
  data?: Array<Artwork>;
  isFetching?: boolean;
  currentPage: number;
  totalPages: number;
  to: FileRouteTypes['to'];
  updatePageRange?: boolean;
}

export const ArtworkList: React.ComponentType<ArtworkListProps> = ({
  isLoading,
  isError,
  data,
  isFetching,
  currentPage,
  totalPages,
  to,
  updatePageRange = false,
}) => {
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError || !data) {
    return <P>{t('errors.failed_to_load_artworks')}</P>;
  }
  if (data.length === 0) {
    return <P>{t('messages.no_artworks')}</P>;
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="relative">
        {isFetching && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50">
            <Spinner />
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map(art => (
            <ArtworkCard
              artist={art.author}
              id={art.objectID}
              image={art.imageUrl}
              key={art.objectID}
              title={art.title}
            />
          ))}
        </div>
      </div>
      <PaginationList currentPage={currentPage} to={to} totalPages={totalPages} updatePageRange={updatePageRange} />
    </div>
  );
};
