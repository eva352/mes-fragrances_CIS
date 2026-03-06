"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface GalleryImage {
  src: string;
  rotation: number;
  translateY?: number;
  translateX?: number;
  zIndex?: number;
}

const galleryImages: GalleryImage[] = [
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/landscape2.jpeg",
    rotation: -19,
    translateX: -200,
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/landscape1.jpeg",
    rotation: -19,
    translateY: 2,
    translateX: -104,
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/landscape3.jpeg",
    rotation: 0,
    translateY: -32,
    zIndex: 10,
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/landscape5.jpeg",
    rotation: 12,
    translateX: 104,
    translateY: 2,
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/landscape4.jpeg",
    rotation: 12,
    translateX: 200,
  },
];

interface Gallery20Props {
  className?: string;
}

const Gallery20 = ({ className }: Gallery20Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container overflow-x-clip">
        <motion.div
          initial={{ opacity: 0, translateY: 100 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            duration: 0.7,
            type: "spring",
            bounce: 0.3,
          }}
          className="relative flex h-42 items-center justify-center"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              initial={{
                rotate: image.rotation,
                translateY: image.translateY || 0,
                translateX: 0,
                zIndex: image.zIndex || "auto",
              }}
              animate={{
                rotate: image.rotation,
                translateY: image.translateY || 0,
                translateX: image.translateX || 0,
                zIndex: image.zIndex || "auto",
              }}
              drag
              dragSnapToOrigin
              whileHover={{
                scale: 1.15,
                rotate: 0,
                zIndex: 999,
                translateY: -20,
              }}
              transition={{
                duration: 0.7,
                bounce: 0.3,
                type: "spring",
                delay: 0.5,
                translateY: { duration: 0.2 },
                rotate: { duration: 0.2 },
                scale: { duration: 0.2 },
                zIndex: { duration: 0.2 },
              }}
              key={index}
              className="absolute size-42 cursor-pointer overflow-hidden rounded-3xl shadow-xl transition-all ease-out"
            >
              <img
                src={image.src}
                className="pointer-events-none size-full object-cover"
                alt={`Gallery 20 - Image ${index + 1}`}
              />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.5,
          }}
          className="mt-10 flex flex-col items-center justify-center"
        >
          <h3 className="max-w-md text-center text-2xl font-medium tracking-tight">
            Explore new places and share the memories you make.
          </h3>
          <Button className="group mt-10 flex items-center justify-center gap-2 rounded-full border px-4 py-1 tracking-tight">
            Explore the world
            <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:rotate-0" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export { Gallery20 };
