"use client";

import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

interface Gallery30Props {
  className?: string;
}

const Gallery30 = ({ className }: Gallery30Props) => {
  const [shuffledImages, setShuffledImages] = useState<
    Array<{ src: string; className: string; delay: number }>
  >([]);

  const images = useMemo(
    () => [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img2.jpeg",
        className:
          "  md:w-50 size-47 rotate-7 md:rotate-0  z-1 absolute md:-left-10 md:bottom-1/4 lg:left-0 md:h-72",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img11.jpeg",
        className:
          "  md:w-38 size-47 -rotate-7 md:rotate-0  z-1 md:left-1/5 md:h-45 absolute md:-top-10",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img6.jpeg",
        className:
          " md:w-50 size-45  z-1 md:right-2/5 absolute md:-top-40 md:h-52",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img5.jpeg",
        className:
          "  hidden md:block size-40  z-1 md:-top-42 md:h-42 absolute md:-right-10 md:w-60",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img7.jpeg",
        className:
          "  md:w-55 hidden md:block z-1 top-1/5 md:h-65 md:absolute -right-10 lg:right-28",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img14.jpeg",
        className:
          "   md:w-50 hidden md:block z-1 md:h-78 md:absolute -bottom-5 -right-40",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img13.jpeg",
        className:
          "  hidden md:block z-1 right-1/5 md:absolute -bottom-1/4 md:h-48 md:w-60",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img12.jpeg",
        className:
          "  hidden md:block z-1 right-3/5 -bottom-1/6 md:absolute md:h-48 md:w-60",
      },
    ],
    [],
  );

  useEffect(() => {
    // Defer state update to avoid synchronous setState in effect
    const timeoutId = setTimeout(() => {
      const shuffled = [...images]
        .sort(() => Math.random() - 0.5)
        .map((image) => ({
          ...image,
          delay: Math.random() * 0.4,
        }));
      setShuffledImages(shuffled);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [images]);

  return (
    <section
      className={cn(
        "relative h-full w-screen overflow-hidden py-32 md:h-screen",
        className,
      )}
    >
      <div className="relative container flex h-full w-full flex-col items-center justify-center">
        <div className="relative z-10 flex flex-col items-center justify-center gap-5">
          <h1 className="max-w-xl text-center text-4xl font-medium tracking-tighter uppercase lg:text-6xl">
            exclusive shadcnblocks
          </h1>
          <p className="max-w-md text-center text-sm text-muted-foreground/70 lg:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
          </p>
        </div>
        <div className="mt-30 flex items-center justify-center border">
          {shuffledImages.map((image) => (
            <motion.div
              key={image.src}
              className={cn(image.className)}
              drag
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.4,
                type: "spring",
                bounce: 0.2,
                delay: image.delay,
              }}
              whileDrag={{ zIndex: 20 }}
            >
              <img
                src={image.src}
                alt=""
                className="pointer-events-none h-full w-full cursor-grab object-cover shadow-lg active:cursor-grabbing"
              />
            </motion.div>
          ))}
        </div>
      </div>
      <Illustration />
    </section>
  );
};
export { Gallery30 };

const Illustration = () => {
  return (
    <div className="absolute inset-0">
      <svg
        viewBox="0 0 1920 1081"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="-356.326"
          y="-222.305"
          width="1041.41"
          height="1041.41"
          rx="520.707"
          stroke="#D9D9D9"
        />
        <rect
          x="1362.49"
          y="391.957"
          width="1041.41"
          height="1041.41"
          rx="520.707"
          stroke="#D9D9D9"
        />
      </svg>
    </div>
  );
};
