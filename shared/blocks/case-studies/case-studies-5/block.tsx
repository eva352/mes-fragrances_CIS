"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    name: "John Doe",
    content:
      "Laravel has completely transformed how we build web applications. The elegant syntax, robust features, and amazing documentation make development a joy. ",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/laravel-wordmark.svg",
    logoClass: "h-10 md:h-12",
    images: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/fabian-centeno-njeVb6E3XB8-unsplash.jpg",
        position: 2,
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/israel-andrade-YI_9SivVt_s-unsplash.jpg",
        position: 4,
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/studio-kealaula-IVZ_XAoZF3s-unsplash.jpg",
        position: 7,
      },
    ],
  },
  {
    name: "Jane Smith",
    content:
      "Working with this team transformed our business completely. Their attention to detail and innovative solutions helped us increase our revenue by 40% in just six months.",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-wordmark.svg",
    logoClass: "h-6 md:h-8",
    images: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/annie-spratt-AkftcHujUmk-unsplash.jpg",
        position: 1,
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/nastuh-abootalebi-yWwob8kwOCk-unsplash.jpg",
        position: 3,
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/alvin-engler-bIhpiQA009k-unsplash.jpg",
        position: 5,
      },
    ],
  },
  {
    name: "Alex Johnson",
    content:
      "The product exceeded all our expectations. It's intuitive, powerful, and exactly what we needed to streamline our processes. Highly recommended for any business.",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-wordmark.svg",
    logoClass: "h-6 md:h-8",
    images: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/redd-f-5U_28ojjgms-unsplash.jpg",
        position: 0,
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/nubelson-fernandes-tAJYoec13xk-unsplash.jpg",
        position: 4,
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/nubelson-fernandes-xxa7qYObMrI-unsplash.jpg",
        position: 7,
      },
    ],
  },
];

interface CaseStudies5Props {
  className?: string;
}

const CaseStudies5 = ({ className }: CaseStudies5Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  React.useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const onSelect = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  const renderGrid = (images: (typeof slides)[0]["images"]) => {
    return (
      <div
        className={cn(
          "grid h-full w-full grid-cols-3 grid-rows-3 gap-3 p-3",
          className,
        )}
      >
        {Array.from({ length: 9 }).map((_, index) => {
          const image = images.find((img) => img.position === index);
          const isImage = Boolean(image);

          return (
            <div
              key={index}
              className={`w-full overflow-hidden rounded-lg ${
                isImage ? "" : "bg-muted"
              }`}
            >
              {isImage && image?.src && (
                <img
                  src={image.src}
                  alt=""
                  className="aspect-square h-full w-full object-cover md:aspect-video"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section className="bg-background py-32">
      <div className="relative container">
        <div className="mx-auto w-full overflow-hidden rounded-lg md:border">
          <Carousel setApi={setCarouselApi}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative">
                <CarouselContent>
                  {slides.map((testimonial, index) => (
                    <CarouselItem key={index}>
                      <div className="relative flex items-center justify-center overflow-hidden md:h-[500px]">
                        {renderGrid(testimonial.images)}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </div>

              <div className="z-2 flex h-full items-center p-4 md:p-10">
                <div className="flex flex-col gap-y-6 md:gap-y-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                      className="flex h-12 items-center gap-3"
                    >
                      <img
                        src={slides[currentIndex].logo}
                        alt={slides[currentIndex].name}
                        className={slides[currentIndex].logoClass}
                      />
                    </motion.div>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                        delay: 0.15,
                      }}
                      className="min-h-[100px] leading-snug tracking-tight text-muted-foreground sm:text-xl xl:mr-8"
                    >
                      {slides[currentIndex].content}
                    </motion.p>
                  </AnimatePresence>

                  <div className="flex h-12 gap-4">
                    <CarouselPrevious className="static translate-y-0" />
                    <CarouselNext className="static translate-y-0" />
                  </div>
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { CaseStudies5 };
