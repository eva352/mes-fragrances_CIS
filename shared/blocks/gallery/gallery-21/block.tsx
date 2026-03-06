"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Gallery21Props {
  className?: string;
}

const Gallery21 = ({ className }: Gallery21Props) => {
  const images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
      alt: "Portrait of Joanna Doe in urban setting",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
      alt: "Portrait of Joan Doe in natural lighting",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
      alt: "Portrait of Sarah Chen in studio setting",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
      alt: "Portrait of Joanna Doe in urban setting",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
      alt: "Portrait of Joan Doe in natural lighting",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
      alt: "Portrait of Sarah Chen in studio setting",
    },
  ];

  const css = `
  .mySwiper21 {
    width: 100%;
    height: 420px;
    padding-bottom: 50px;
  }
  
  .mySwiper21 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
  }
  
  .mySwiper21 .swiper-slide img {
    display: block;
    width: 100%;
  }

  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  `;
  return (
    <section className={cn("py-32", className)}>
      <style>{css}</style>
      <div className="relative container flex max-w-4xl flex-col items-center gap-10 overflow-x-clip">
        {/* Left and right mask */}
        <div className="pointer-events-none absolute left-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent lg:w-66" />
        <div className="pointer-events-none absolute right-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent lg:w-66" />

        <div className="relative h-[420px] max-w-4xl">
          <motion.div
            className="relative h-full w-full"
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.5,
            }}
          >
            <Swiper
              spaceBetween={50}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={2.447}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
              }}
              className="mySwiper21"
              modules={[EffectCoverflow, Autoplay]}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    className="h-full w-full overflow-hidden rounded-3xl object-cover shadow-lg"
                    src={image.src}
                    alt={image.alt}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h3 className="max-w-sm px-2 text-center text-2xl font-medium tracking-tight">
            Hear the Music: An Experience Like Never Before
          </h3>
          <Button
            variant="secondary"
            className="group mt-10 flex items-center justify-center gap-2 rounded-full tracking-tight"
          >
            Explore the world
            <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:rotate-0" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Gallery21 };
