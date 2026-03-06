"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

import { Button } from "@/components/ui/button";

const images = [
  {
    id: 1,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random5.jpeg",
    title: "Summer Collection",
    code: "#0031",
  },
  {
    id: 2,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
    title: "The Music Festival",
    code: "#0030",
  },
  {
    id: 3,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random13.jpeg",
    title: "Winter Special",
    code: "#0032",
  },
  {
    id: 4,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
    title: "Spring Edition",
    code: "#0033",
  },
  {
    id: 5,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
    title: "Spring Edition",
    code: "#0033",
  },
  {
    id: 6,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random8.jpeg",
    title: "Spring Edition",
    code: "#0033",
  },
  {
    id: 7,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random9.jpeg",
    title: "Spring Edition",
    code: "#0033",
  },
  {
    id: 8,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random10.jpeg",
    title: "Spring Edition",
    code: "#0033",
  },
];

interface Gallery24Props {
  className?: string;
}

const Gallery24 = ({ className }: Gallery24Props) => {
  const [activeImage, setActiveImage] = useState<number | null>(1);

  return (
    <section className={cn("py-32", className)}>
      <div className="relative container overflow-x-clip">
        <div className="flex flex-col items-center justify-center">
          <h1 className="max-w-xl text-center font-playfair text-5xl tracking-tighter italic md:text-6xl">
            We don&apos;t Believe in talk
          </h1>
          <p className="text-md my-10 max-w-lg text-center opacity-50">
            we deliver Results Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt.
          </p>

          <div className="flex w-full items-center justify-center gap-1">
            {images
              .slice(0, useIsMobile() ? 4 : images.length)
              .map((image, index) => (
                <motion.div
                  key={image.id}
                  className="relative cursor-pointer overflow-hidden rounded-3xl border"
                  initial={{ width: "2.5rem", height: "20rem" }}
                  animate={{
                    width: activeImage === index ? "24rem" : "5rem",
                    height: activeImage === index ? "24rem" : "24rem",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  onClick={() => setActiveImage(index)}
                  onHoverStart={() => setActiveImage(index)}
                >
                  <AnimatePresence>
                    {activeImage === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute h-full w-full bg-gradient-to-t from-black/80 to-transparent"
                      />
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {activeImage === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute flex h-full w-full flex-col items-end justify-end px-4 pb-10"
                      >
                        <p className="text-left text-xs text-white/50">
                          {image.code}
                        </p>
                        <h3 className="w-42 text-right text-3xl font-bold text-white lg:w-fit lg:whitespace-nowrap">
                          {image.title.split(" ")[0]}
                          <span className="font-playfair italic">
                            {" "}
                            {image.title.split(" ")[1]}{" "}
                          </span>
                        </h3>
                        <button className="mt-2 flex w-32 items-center justify-center gap-2 rounded-full bg-background px-4 py-2 text-xs whitespace-nowrap">
                          Add to Cart <ShoppingCart size={14} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <img
                    src={image.src}
                    className="size-full object-cover"
                    alt={image.title}
                  />
                </motion.div>
              ))}
          </div>
          <Button className="group mt-10 flex w-fit items-center justify-center gap-2 rounded-full tracking-tight">
            Contact Us
            <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:rotate-0" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Gallery24 };
