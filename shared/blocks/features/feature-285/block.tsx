"use client";

import { motion } from "framer-motion";
import { Forward } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Marquee } from "@/components/magicui/marquee";
import { Button } from "@/components/ui/button";

interface Feature285Props {
  className?: string;
}

const Feature285 = ({ className }: Feature285Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img11.jpeg",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img1.jpeg",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img7.jpeg",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img12.jpeg",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img13.jpeg",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img3.jpeg",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img11.jpeg",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img1.jpeg",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img7.jpeg",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img12.jpeg",
    },
  ];

  const BRAND = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  };

  return (
    <section
      className={cn("h-full overflow-hidden py-32 lg:h-screen", className)}
    >
      <div className="container flex h-full w-full items-center justify-center">
        <div className="grid h-full w-full max-w-7xl grid-cols-1 overflow-hidden rounded-4xl bg-muted lg:grid-cols-2">
          <div className="relative flex flex-col justify-between p-15">
            <a href={BRAND.url} className="flex items-center gap-2">
              <img src={BRAND.src} className="max-h-8 w-8" alt={BRAND.alt} />
              <span className="text-xl font-semibold tracking-tight">
                {BRAND.title}
              </span>
            </a>
            <div>
              <h2 className="relative mt-12 font-sans text-4xl font-semibold tracking-tighter md:text-5xl lg:mt-0 xl:text-6xl">
                Built by Developers for Developers
              </h2>
              <p className="text-md mx-auto mt-2 mb-10 max-w-2xl text-muted-foreground/50 md:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                suscipit dolor blanditiis voluptatum minus est labore amet
                necessitatibus quod distinctio! ipsum dolor sit
              </p>
            </div>
            <Button className="h-12 w-fit rounded-xl !px-5">
              Be a Member <Forward />
            </Button>
          </div>
          <div className="relative mr-3 flex h-120 flex-row items-center justify-end overflow-hidden lg:h-full">
            <Marquee pauseOnHover vertical className="[--duration:20s]">
              {images.map((image, index) => (
                <motion.img
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
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
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                      delay: 0,
                    },
                  }}
                  key={`marquee1-${image.src}-${index}`}
                  src={image.src}
                  alt=""
                  className="w-full rounded-3xl object-cover lg:h-60"
                />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
              {images.map((image, index) => (
                <motion.img
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
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
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                      delay: 0,
                    },
                  }}
                  key={`marquee2-${image.src}-${index}`}
                  src={image.src}
                  alt=""
                  className="w-full rounded-3xl object-cover lg:h-60"
                />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-x-0 top-0 block h-1/4 bg-gradient-to-b from-muted lg:hidden"></div>
            {/* <div className="from-muted pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature285 };
