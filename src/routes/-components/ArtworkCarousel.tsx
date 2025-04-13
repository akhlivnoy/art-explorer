import { ArtworkCard } from '@/components/ArtworkCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export const ArtworkCarousel: React.FunctionComponent = () => {
  return (
    <Carousel
      className="w-full"
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem className="lg:basis-1/3" key={index}>
            <ArtworkCard
              artist="Vincent van Gogh"
              id={index}
              image="https://images.metmuseum.org/CRDImages/ep/web-large/DT1567.jpg"
              title="Wheat Field with Cypresses"
            />
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
