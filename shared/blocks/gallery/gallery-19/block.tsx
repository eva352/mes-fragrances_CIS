"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Autoplay, EffectCards, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Gallery19Props {
  className?: string;
}

const Gallery19 = ({ className }: Gallery19Props) => {
  const images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
      alt: "Portrait of Joanna Doe in urban setting",
      name: "Joanna Doe",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      link: "https://www.google.com",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random6.jpeg",
      alt: "Portrait of Joan Doe in natural lighting",
      name: "Joan Doe",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      link: "https://www.google.com",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
      alt: "Portrait of Sarah Chen in studio setting",
      name: "Sarah Chen",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      link: "https://www.google.com",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
      alt: "Portrait of Michael Park in outdoor setting",
      name: "Michael Park",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      link: "https://www.google.com",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
      alt: "Portrait of Emma Wilson in urban setting",
      name: "Emma Wilson",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      link: "https://www.google.com",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random6.jpeg",
      alt: "Portrait of David Kim in natural lighting",
      name: "David Kim",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      link: "https://www.google.com",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
      alt: "Portrait of Lisa Martinez in studio setting",
      name: "Lisa Martinez",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      link: "https://www.google.com",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
      alt: "Portrait of James Thompson in outdoor setting",
      name: "James Thompson",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      link: "https://www.google.com",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
      alt: "Portrait of Sophia Lee in urban setting",
      name: "Sophia Lee",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      link: "https://www.google.com",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random6.jpeg",
      alt: "Portrait of Alex Rodriguez in natural lighting",
      name: "Alex Rodriguez",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      link: "https://www.google.com",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
      alt: "Portrait of Maya Patel in studio setting",
      name: "Maya Patel",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      link: "https://www.google.com",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
      alt: "Portrait of Noah Johnson in outdoor setting",
      name: "Noah Johnson",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      link: "https://www.google.com",
    },
  ];

  const css = `
  .mySwiper19 {
    width: 260px;
    height: 340px;
  }

  .mySwiper19 .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
  }

  .mySwiper19 .swiper-pagination {
    bottom: -40px !important;
  }
  
  .mySwiper19 .swiper-pagination-bullet-active {
    background-color: var(--primary);
  }
`;
  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <style>{css}</style>
      <div className="container flex flex-col items-center gap-10">
        <AnimatePresence mode="popLayout">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full"
          >
            <Swiper
              effect="cards"
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
              }}
              loop={true}
              grabCursor={true}
              modules={[EffectCards, Autoplay, Pagination]}
              pagination={{ clickable: true }}
              className="mySwiper19"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    className="h-full w-full overflow-hidden rounded-3xl object-cover"
                    src={image.src}
                    alt={image.alt}
                  />
                  <div className="absolute h-full w-full bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute flex h-full w-full flex-col justify-end p-4">
                    <h3 className="text-2xl font-bold text-white">
                      {image.name.split(" ")[0]}
                      <span className="font-playfair italic">
                        {" "}
                        {image.name.split(" ")[1]}
                      </span>
                    </h3>
                    <p className="text-left text-xs text-white/50">
                      {image.description}
                    </p>
                    <Button
                      variant="secondary"
                      className="mt-4 w-fit rounded-full text-xs"
                      asChild
                    >
                      <a href={image.link}>
                        Know More{" "}
                        <ArrowRight size={14} className="-rotate-45" />
                      </a>
                    </Button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export { Gallery19 };
