"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

interface Gallery32Props {
  className?: string;
}

const Gallery32 = ({ className }: Gallery32Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const images = [
    {
      className: "size-30 z-1 overflow-hidden rounded-2xl",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img12.jpeg",
      alt: "",
    },
    {
      className:
        "size-30 z-1 absolute bottom-0 left-0 z-10 overflow-hidden rounded-2xl",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img14.jpeg",
      alt: "",
    },
    {
      className:
        "size-45 z-1 bottom-1/6 left-1/9 absolute z-10 overflow-hidden rounded-2xl",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img2.jpeg",
      alt: "",
    },
    {
      className:
        "size-30 z-1 bottom-3/5 left-15 absolute z-10 overflow-hidden rounded-2xl",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img7.jpeg",
      alt: "",
    },
    {
      className:
        "size-34 z-1 left-1/5 absolute top-0 z-10 overflow-hidden rounded-2xl",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img11.jpeg",
      alt: "",
    },
    {
      className:
        "size-30 z-1 absolute right-0 top-0 z-10 overflow-hidden rounded-2xl",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img4.jpeg",
      alt: "",
    },
    {
      className:
        "size-34 z-1 top-1/6 absolute right-[15%] z-10 overflow-hidden rounded-2xl",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img6.jpeg",
      alt: "",
    },
    {
      className:
        "size-45 z-1 absolute bottom-[10%] right-[5%] z-10 overflow-hidden rounded-2xl",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img13.jpeg",
      alt: "",
    },
  ];

  return (
    <section
      className={cn(
        "relative h-full h-screen w-screen overflow-hidden bg-muted py-32",
        className,
      )}
    >
      <div className="relative container flex h-full w-full items-center justify-center">
        <div className="absolute z-20 flex h-full w-full flex-col items-center justify-center gap-5 lg:z-0">
          <motion.p
            initial={{ y: "50%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute max-w-sm rounded-3xl bg-background p-5 md:top-0 md:left-1/2"
          >
            Discover our curated collection of stunning photography that
            captures moments of beauty and inspiration from around the world.
          </motion.p>
          <motion.p
            initial={{ y: "50%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-0 max-w-sm rounded-3xl bg-background p-5 md:left-1/5"
          >
            Explore our collection of stunning photography that captures moments
            of beauty and inspiration from around the world.
          </motion.p>
        </div>
        <div className="flex h-full w-full scale-75 items-center justify-center md:scale-100">
          {images.map((image, index) => (
            <motion.div
              drag
              key={index}
              initial={{ y: "50%", opacity: 0, scale: 0.8 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
                delay: index * 0.1 + 0.5,
              }}
              animate={{
                filter:
                  hoveredIndex !== null && hoveredIndex !== index
                    ? "blur(10px)"
                    : "blur(0px)",
                scale: hoveredIndex === index ? 1.05 : 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                  delay: 0,
                },
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={image.className}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="pointer-events-none h-full w-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export { Gallery32 };
