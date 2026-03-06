"use client";

import { motion } from "framer-motion";
import { AudioLines, Globe, Heart, TrophyIcon } from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

const featureData = [
  {
    id: 1,
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img7.jpeg",
    link: "#",
    title: "June Layout Grid Collection v2",
    description: "#JuneBlockCollection",
    chips: [
      { icon: TrophyIcon, value: "50+" },
      { icon: Globe, value: "50+" },
      { icon: AudioLines, value: "50+" },
    ],
  },
  {
    id: 2,
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img6.jpeg",
    link: "#",
    title: "Modern UI Components Pack",
    description: "#ModernUIComponents",
    chips: [
      { icon: TrophyIcon, value: "75+" },
      { icon: Globe, value: "60+" },
      { icon: AudioLines, value: "45+" },
    ],
  },
  {
    id: 3,
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img14.jpeg",
    link: "#",
    title: "Responsive Design System",
    description: "#ResponsiveDesign",
    chips: [
      { icon: TrophyIcon, value: "90+" },
      { icon: Globe, value: "80+" },
      { icon: AudioLines, value: "65+" },
    ],
  },
  {
    id: 4,
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img25.jpeg",
    link: "#",
    title: "Interactive Animation Kit",
    description: "#AnimationKit",
    chips: [
      { icon: TrophyIcon, value: "40+" },
      { icon: Globe, value: "35+" },
      { icon: AudioLines, value: "55+" },
    ],
  },
  {
    id: 5,
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img11.jpeg",
    link: "#",
    title: "Dark Mode Components",
    description: "#DarkModeUI",
    chips: [
      { icon: TrophyIcon, value: "65+" },
      { icon: Globe, value: "70+" },
      { icon: AudioLines, value: "50+" },
    ],
  },
  {
    id: 6,
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img12.jpeg",
    link: "#",
    title: "E-commerce Template Pack",
    description: "#EcommerceUI",
    chips: [
      { icon: TrophyIcon, value: "85+" },
      { icon: Globe, value: "90+" },
      { icon: AudioLines, value: "75+" },
    ],
  },
];

interface Gallery34Props {
  className?: string;
}

const Gallery34 = ({ className }: Gallery34Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className={cn("h-full overflow-hidden py-32", className)}>
      <div className="container">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featureData.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative overflow-hidden rounded-3xl bg-muted p-2"
            >
              <motion.img
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
                  scale: hoveredIndex === index ? 1.02 : 1,
                }}
                src={item.img}
                className="pointer-events-none h-72 w-full rounded-2xl object-cover"
                alt={item.title}
              />
              <div className="mt-2 p-2">
                <h2 className="text-xl font-semibold tracking-tight">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  {item.chips.map((chip, index) => {
                    const IconComponent = chip.icon;
                    return (
                      <span
                        key={index}
                        className="inline-flex items-center justify-center gap-3 rounded-full bg-background px-2 py-1 text-sm"
                      >
                        <IconComponent className="size-4" /> {chip.value}
                      </span>
                    );
                  })}
                </div>
                <div className="absolute top-4 right-4">
                  <Heart className="size-6 fill-background/20 text-background" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery34 };
