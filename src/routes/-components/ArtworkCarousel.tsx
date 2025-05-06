import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { getArtworks } from '@/api/endpoints/artworks.api';
import { ArtworkCard } from '@/components/ArtworkCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export const ArtworkCarousel: React.FunctionComponent = () => {
  const pageSize = 6;
  const [randomPage, setRandomPage] = useState<number | null>(null);

  useEffect(() => {
    // TODO: Replace hardcoded totalItems with dynamic value from API (e.g. from getArtworks({ page: 1, pageSize: 1 }))
    const totalItems = 128;
    const maxPage = Math.ceil(totalItems / pageSize);
    setRandomPage(Math.floor(Math.random() * maxPage) + 1);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['carouselArtworks', randomPage, pageSize],
    queryFn: () => getArtworks({ page: randomPage ?? 1, pageSize }),
    enabled: randomPage !== null,
  });

  if (isLoading) return <div>Loading carousel...</div>;
  if (isError || !data) return <div>Failed to load artworks.</div>;

  return (
    <Carousel className="w-full" opts={{ loop: true }}>
      <CarouselContent>
        {data.items.map(artwork => (
          <CarouselItem className="lg:basis-1/3" key={artwork.objectID}>
            <ArtworkCard artist={artwork.author} id={artwork.objectID} image={artwork.imageUrl} title={artwork.title} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="relative mt-6 flex justify-end gap-4">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};
