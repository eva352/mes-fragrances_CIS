"use client";

import { motion, useSpring } from "framer-motion";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

interface Awards5Props {
  className?: string;
}

const Awards5 = ({ className }: Awards5Props) => {
  const SPRING = {
    mass: 0.1,
    stiffness: 100,
    damping: 10,
  };

  const xSpring = useSpring(0, SPRING);
  const ySpring = useSpring(0, SPRING);
  const scaleSpring = useSpring(0, SPRING);
  const opacity = useSpring(0, SPRING);

  const awards = [
    {
      title: "Creative Collaboration Award",
      year: "I",
      url: "#",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img1.png",
    },
    {
      title: "Design Excellence Prize",
      year: "II",
      url: "#",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img2.png",
    },
    {
      title: "Innovation in Web Development",
      year: "III",
      url: "#",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img3.png",
    },
    {
      title: "Best User Experience Design",
      year: "IV",
      url: "#",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img4.png",
    },
    {
      title: "Outstanding Visual Design",
      year: "V",
      url: "#",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img5.png",
    },
    {
      title: "Digital Innovation Award",
      year: "VI",
      url: "#",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img6.png",
    },
  ];

  const handlePointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    xSpring.set(e.clientX - bounds.left + 20);
    ySpring.set(e.clientY - bounds.top + 20);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className={cn("py-32", className)}>
      <div className="container font-hedvigLettersSerif">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-6 lg:gap-20">
          <div className="top-10 col-span-2 flex h-fit w-fit items-center gap-3 py-8 lg:sticky">
            <p className="text-2xl text-foreground/30 uppercase"> 05 AWWARDS</p>
          </div>
          <ul
            onPointerMove={handlePointerMove}
            onPointerEnter={() => {
              opacity.set(1);
              scaleSpring.set(1);
            }}
            onPointerLeave={() => {
              opacity.set(0);
              scaleSpring.set(0);
            }}
            className="relative col-span-4 w-full"
          >
            {awards.map((award, index) => (
              <li
                key={index}
                onPointerEnter={() => {
                  setCurrentIndex(index);
                }}
                className="group relative flex cursor-pointer items-center justify-between border-b py-5"
              >
                <h3 className="text-xl font-medium tracking-tight lg:text-5xl">
                  {award.title}
                  <sup className="align-top text-xs lg:text-sm">
                    {award.year}
                  </sup>
                </h3>
                <a
                  href={award.url}
                  className="text-sm tracking-tighter text-foreground/30 hover:text-foreground"
                >
                  Verify Award
                </a>
              </li>
            ))}
            {/* Cursor-following image */}
            <motion.div
              className="pointer-events-none absolute top-0 left-0 size-40 border"
              style={{
                x: xSpring,
                y: ySpring,
                opacity: opacity,
                scale: scaleSpring,
              }}
            >
              <img
                src={awards[currentIndex].image}
                alt=""
                className="h-full w-full object-cover"
              />
            </motion.div>
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Awards5 };
