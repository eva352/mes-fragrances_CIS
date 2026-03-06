"use client";

import React from "react";
import { Autoplay, EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";

import { cn } from "@/lib/utils";

interface Gallery18Props {
  className?: string;
}

const Gallery18 = ({ className }: Gallery18Props) => {
  const images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
      alt: "Portrait of Joanna Doe in urban setting",
      name: "Joanna Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random6.jpeg",
      alt: "Portrait of Joan Doe in natural lighting",
      name: "Joan Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
      alt: "Portrait of Sarah Chen in studio setting",
      name: "Sarah Chen",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
      alt: "Portrait of Michael Park in outdoor setting",
      name: "Michael Park",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
      alt: "Portrait of Emma Wilson in urban setting",
      name: "Emma Wilson",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random6.jpeg",
      alt: "Portrait of David Kim in natural lighting",
      name: "David Kim",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
      alt: "Portrait of Lisa Martinez in studio setting",
      name: "Lisa Martinez",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
      alt: "Portrait of James Thompson in outdoor setting",
      name: "James Thompson",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
      alt: "Portrait of Sophia Lee in urban setting",
      name: "Sophia Lee",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random6.jpeg",
      alt: "Portrait of Alex Rodriguez in natural lighting",
      name: "Alex Rodriguez",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
      alt: "Portrait of Maya Patel in studio setting",
      name: "Maya Patel",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
      alt: "Portrait of Noah Johnson in outdoor setting",
      name: "Noah Johnson",
    },
  ];

  const css = `
  .mySwiper18 {
  width: 260px;
  height: 340px;
}

.mySwiper18 .swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
}

.mySwiper18 .swiper-slide-active {
  overflow: visible !important;
}

`;
  return (
    <section className={cn("py-32", className)}>
      <style>{css}</style>
      <div className="container flex flex-col items-center gap-10">
        <div className="relative w-full">
          <Swiper
            effect="cards"
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            loop={true}
            grabCursor={true}
            modules={[EffectCards, Autoplay]}
            className="mySwiper18"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  className="h-full w-full overflow-hidden rounded-3xl object-cover"
                  src={image.src}
                  alt={image.alt}
                />
                <div className="absolute right-0 -bottom-12 left-0 flex h-12 items-end justify-center text-center font-mono text-xs font-light">
                  @ {image.name}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export { Gallery18 };
