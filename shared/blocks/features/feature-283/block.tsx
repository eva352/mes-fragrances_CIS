"use client";

import { motion } from "framer-motion";
import { Forward } from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Feature283Props {
  className?: string;
}

const Feature283 = ({ className }: Feature283Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img11.jpeg",
      className:
        "w-40 absolute -left-10 top-1/2 h-52 -translate-x-full -translate-y-1/2 overflow-hidden rounded-2xl",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img1.jpeg",
      className:
        "size-28 absolute -top-3 left-10 -translate-x-full -translate-y-full overflow-hidden rounded-2xl",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img7.jpeg",
      className:
        "size-32 absolute -bottom-3 left-10 -translate-x-full translate-y-full overflow-hidden rounded-2xl",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img12.jpeg",
      className:
        "w-45 absolute -right-10 top-1/2 h-52 -translate-y-1/2 translate-x-full overflow-hidden rounded-2xl",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img13.jpeg",
      className:
        "size-28 absolute -top-3 right-10 -translate-y-full translate-x-full overflow-hidden rounded-2xl",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img3.jpeg",
      className:
        "size-32 absolute -bottom-3 right-10 translate-x-full translate-y-full overflow-hidden rounded-2xl",
    },
  ];

  return (
    <section className={cn("h-full h-screen overflow-hidden py-32", className)}>
      <div className="container flex h-full w-full flex-col items-center justify-center px-4">
        <div className="relative flex flex-col items-center justify-center">
          <h2 className="relative py-2 text-center font-sans text-4xl font-semibold tracking-tighter md:text-5xl">
            Built by and for Developers
          </h2>
          <p className="mx-auto mt-2 max-w-xl px-5 text-center text-sm text-muted-foreground/50 md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            suscipit dolor blanditiis voluptatum minus est labore amet
            necessitatibus quod distinctio! ipsum dolor sit
          </p>
          <Button className="mt-10 h-10 rounded-xl">
            Be a contributor <Forward />
          </Button>
          <div>
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
                  alt=""
                  className="pointer-events-none size-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature283 };
