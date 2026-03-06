"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { MoveRight } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const images = [
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
];

interface Gallery7Props {
  className?: string;
}

const Gallery7 = ({ className }: Gallery7Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-12 grid grid-cols-1 gap-x-12 gap-y-6 md:mb-16 md:grid-cols-2 md:gap-x-24">
          <div className="flex flex-col gap-8 md:gap-12">
            <h1 className="text-3xl font-bold md:text-4xl">
              Bringing your data to life with the power of AI
            </h1>
          </div>
          <p>
            We thrive on the power of AI. Our team is made up of some of the
            most talented people in the world, and we&apos;re looking for new
            ways to push the boundaries of what&apos;s possible. We&apos;re a
            team of data scientists.
          </p>
          <a href="#" className="font-medium hover:underline">
            Explore our solutions <MoveRight className="ml-2 inline size-5" />
          </a>
        </div>
      </div>
      <div className="w-full">
        <div className="max-w-[100vw] overflow-x-hidden">
          <Carousel
            opts={{
              loop: true,
            }}
            plugins={[
              AutoScroll({
                speed: 0.9,
              }),
            ]}
            className="pointer-events-none"
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="basis-auto">
                  <div className="max-h-80 max-w-60">
                    <img
                      src={image}
                      alt="placeholder"
                      className={cn(
                        "mt-7 h-full w-full rounded-md object-cover",
                        index % 2 === 0 && "mt-16",
                      )}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { Gallery7 };
