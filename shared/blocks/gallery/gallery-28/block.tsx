"use client";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/alex-tyson-2Fv_otxbGtg-unsplash.jpg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jason-leung-6uoj7DL6BFk-unsplash.jpg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jonathan-borba-UisC7KLAWjs-unsplash.jpg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jean-philippe-delberghe-fnIIuaEHvII-unsplash.jpg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jonathan-borba-YdomJdFdbDo-unsplash.jpg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jose-angel-rios-ux9cu6FLsFE-unsplash.jpg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/zhao-yangyang-4uMRVFnJcP4-unsplash.jpg",
];

interface Gallery28Props {
  className?: string;
}

const Gallery28 = ({ className }: Gallery28Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="mb-4 text-center text-4xl font-semibold">
          Beautiful Interiors.
        </h2>
        <p className="text-center text-sm text-muted-foreground">
          Explore our curated collection of stunning interior designs.
          <br />
          Each space tells a unique story through thoughtful design and
          attention to detail.
        </p>
        <div className="mt-10">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="mx-auto w-full max-w-6xl"
          >
            <CarouselContent
              style={{
                backfaceVisibility: "hidden",
              }}
            >
              {images.map((image, index) => (
                <CarouselItem key={index} className="basis-1/2">
                  <img
                    src={image}
                    alt="placeholder"
                    className="aspect-[3.8/5] w-full rounded-xl object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-5 scale-120 border-none bg-black/30 text-white hover:bg-black/50 hover:text-white dark:bg-black/30 dark:hover:bg-black/50" />
            <CarouselNext className="right-5 scale-120 border-none bg-black/30 text-white hover:bg-black/50 hover:text-white dark:bg-black/30 dark:hover:bg-black/50" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { Gallery28 };
