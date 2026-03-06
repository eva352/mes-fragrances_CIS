"use client";

import { startTransition, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

const IMAGES = [
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg", alt: "" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg", alt: "" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg", alt: "" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-4.svg", alt: "" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-5.svg", alt: "" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg", alt: "" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg", alt: "" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg", alt: "" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-4.svg", alt: "" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-5.svg", alt: "" },
];

interface Gallery17Props {
  className?: string;
}

const Gallery17 = ({ className }: Gallery17Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    startTransition(() => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    });

    api.on("select", () => {
      startTransition(() => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    });
  }, [api]);

  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container md:px-45">
        <Carousel
          className="mx-auto w-full max-w-[50rem] [&>div:nth-child(1)]:md:overflow-visible"
          setApi={setApi}
          opts={{
            startIndex: 1,
          }}
        >
          <CarouselContent>
            {IMAGES.map((img, index) => (
              <CarouselItem key={`carousel-img-${index}`}>
                <div
                  className={`aspect-[1.333333333] max-w-[50rem] overflow-hidden rounded-[0.75rem] transition-all duration-300 ${
                    current === index + 1
                      ? "scale-100 opacity-100"
                      : "scale-70 opacity-40"
                  }`}
                >
                  <img
                    className="block size-full object-cover object-center"
                    src={img.src}
                    alt={img.alt}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4 hidden md:block">
            <CarouselPrevious
              className="size-10 max-[767px]:static max-[767px]:translate-y-0 md:left-[-6.25rem] md:size-14 lg:left-[-9.9375rem] lg:size-14 [&>svg]:!size-6"
              variant="default"
            />
            <CarouselNext
              className="size-10 max-[767px]:static max-[767px]:translate-y-0 md:right-[-6.25rem] md:size-14 lg:right-[-9.9375rem] lg:size-14 [&>svg]:!size-6"
              variant="default"
            />
          </div>
        </Carousel>
        <div className="mx-auto mt-10 flex w-full max-w-[33.9375rem] items-center justify-center">
          {Array.from({ length: count }).map((_, index) => (
            <button
              aria-label={`Go to slide ${index + 1}`}
              key={`carousel-dot-btn-${index}`}
              className="p-2"
              onClick={() => {
                api?.scrollTo(index);
              }}
            >
              <div
                className={`size-3 rounded-full ${current === index + 1 ? "bg-black" : "bg-black/10"}`}
              ></div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery17 };
