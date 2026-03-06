"use client";

import {
  motion,
  MotionValue,
  useAnimationControls,
  useScroll,
  useTransform,
} from "framer-motion";
import { Pause, Play, RotateCcw } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const getTextPositionClassName = (
  textPosition: "left" | "right" | "top" | "bottom",
) => {
  let textPositionClassName = "";

  switch (textPosition) {
    case "left":
      textPositionClassName = "md:left-10 md:top-1/3 md:-translate-y-1/3";
      break;
    case "right":
      textPositionClassName = "md:right-10 md:top-1/2 md:-translate-y-1/2";
      break;
    case "top":
      textPositionClassName = "md:top-10 md:left-1/2 md:-translate-x-1/2";
      break;
    case "bottom":
      textPositionClassName = "md:bottom-10 md:left-1/2 md:-translate-x-1/2";
      break;
    default:
      textPositionClassName = "md:left-10 md:top-1/2 md:-translate-y-1/2";
      break;
  }

  return textPositionClassName;
};

const getCardPositions = (total: number, index: number) => {
  const scrollWidthPerCard = 1 / total;
  const scrollOffset = (scrollWidthPerCard / total) * (index + 1);

  const position = scrollWidthPerCard * index + scrollOffset;

  const prev = Math.max(0, scrollWidthPerCard * (index - 1) + scrollOffset);
  const next = Math.min(1, scrollWidthPerCard * (index + 1) + scrollOffset);

  const firstCardPosition = scrollWidthPerCard * 0 + scrollOffset;
  const lastCardPosition = scrollWidthPerCard * (total - 1) + scrollOffset;

  const range = [firstCardPosition, prev, position, next, lastCardPosition];

  return range;
};

interface Visual {
  text: string;
  className: string;
  image: string;
  textPosition: "left" | "right" | "top" | "bottom";
}

interface VisualCardProps {
  visual: Visual;
  index: number;
  total: number;
  scrollXProgress: MotionValue<number>;
}

const VisualCard = ({
  visual,
  index,
  total,
  scrollXProgress,
}: VisualCardProps) => {
  const textPositionClassName = getTextPositionClassName(visual.textPosition);

  const range = getCardPositions(total, index);

  const opacity = useTransform(scrollXProgress, range, [0, 0, 1, 0, 0]);
  const x = useTransform(scrollXProgress, range, [
    "100%",
    "100%",
    "0%",
    "-100%",
    "-100%",
  ]);

  return (
    <motion.div
      className={cn(
        "relative h-[75vh] w-[70vw] shrink-0 snap-center overflow-hidden rounded-3xl",
        visual.className,
      )}
      id={`visual-${index}`}
    >
      <img
        src={visual.image}
        alt={visual.text}
        className={cn("absolute inset-0 z-0 h-full w-full object-cover")}
      />

      <span className="absolute inset-0 z-10 bg-black/5" />

      <motion.p
        style={{
          opacity,
          x,
        }}
        className={cn(
          "absolute z-20 hidden text-xl font-semibold md:block md:max-w-sm lg:text-2xl",
          textPositionClassName,
        )}
      >
        {visual.text}
      </motion.p>
      <motion.p
        style={{
          opacity,
          x,
        }}
        className={cn(
          "absolute z-20 text-xl font-semibold md:hidden md:max-w-sm lg:text-2xl",
          "top-10 left-1/2 -translate-x-1/2",
        )}
      >
        {visual.text}
      </motion.p>
    </motion.div>
  );
};

const GalleryPaginationDot = ({
  index,
  scrollXProgress,
  total,
  isPlaying,
  currentVisualIndex,
}: {
  index: number;
  scrollXProgress: MotionValue<number>;
  total: number;
  isPlaying: boolean;
  currentVisualIndex: number;
}) => {
  const range = getCardPositions(total, index);

  const controls = useAnimationControls();

  const width = useTransform(scrollXProgress, range, [8, 8, 50, 8, 8]);

  useEffect(() => {
    if (isPlaying && currentVisualIndex === index) {
      controls.set({
        width: 0,
      });
      controls.start({
        width: "100%",
      });
    }
  }, [currentVisualIndex, isPlaying, index, controls]);

  const handleClick = (index: number) => {
    document.getElementById(`visual-${index}`)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };
  return (
    <motion.button
      style={{
        width,
      }}
      onClick={() => handleClick(index)}
      className="relative inline-block h-2 rounded-full bg-foreground/50 hover:bg-foreground/70"
    >
      {isPlaying && currentVisualIndex === index && (
        <motion.span
          animate={controls}
          transition={{ duration: 2, ease: "linear" }}
          className="absolute top-0 left-0 z-10 h-full rounded-full bg-foreground"
        />
      )}
    </motion.button>
  );
};

interface Gallery35Props {
  heading: string;
  visuals: Visual[];
  className?: string;
}

const Gallery35 = ({
  className,
  heading = "Our Creative Gallery",
  visuals = [
    {
      text: "Modern design principles create intuitive interfaces that users love and trust.",
      className: "bg-blue-100 dark:bg-blue-900",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img11.png",
      textPosition: "left",
    },

    {
      text: "Creative process drives innovation through iterative design and user feedback.",
      className: "bg-green-100 dark:bg-green-900",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img5.jpeg",
      textPosition: "top",
    },
    {
      text: "Artistic vision transforms complex ideas into beautiful, engaging visual experiences.",
      className: "bg-purple-100 dark:bg-purple-900",
      // image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-xOLhD-qfoRI-unsplash.jpg",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-uR__S5GX8Io-unsplash.jpg",
      textPosition: "bottom",
    },
    {
      text: "Digital art combines traditional aesthetics with modern interactive capabilities.",
      className: "bg-pink-100 dark:bg-pink-900",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw15.jpeg",
      textPosition: "top",
    },
    {
      text: "Innovation hub brings together cutting-edge technology with human-centered design.",
      className: "bg-orange-100 dark:bg-orange-900",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img23.jpeg",
      textPosition: "left",
    },
    {
      text: "Visual storytelling connects audiences through compelling narratives and imagery.",
      className: "bg-indigo-100 dark:bg-indigo-900",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img4.jpeg",
      textPosition: "top",
    },
  ],
}: Gallery35Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVisualIndex, setCurrentVisualIndex] = useState(0);

  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  useEffect(() => {
    const unsubscribe = scrollXProgress.on("change", (progress) => {
      if (isPlaying) return;

      let closestIndex = 0;
      let minDistance = Infinity;

      visuals.forEach((_, index) => {
        const range = getCardPositions(visuals.length, index);
        const visualPosition = range[2];
        const distance = Math.abs(progress - visualPosition);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setCurrentVisualIndex(closestIndex);
    });

    return () => unsubscribe();
  }, [scrollXProgress, visuals.length, isPlaying, visuals]);

  useEffect(() => {
    if (!isPlaying) return;

    const intervalId = setInterval(() => {
      if (currentVisualIndex === visuals.length - 1) {
        setIsPlaying(false);
        return currentVisualIndex;
      }

      const nextIndex = currentVisualIndex + 1;

      document.getElementById(`visual-${nextIndex}`)?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });

      setCurrentVisualIndex(nextIndex);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [isPlaying, visuals.length, currentVisualIndex]);

  const restartAnimation = () => {
    setCurrentVisualIndex(0);
    document.getElementById(`visual-0`)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    setIsPlaying(true);
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="container overflow-visible">
        <div className="flex flex-col gap-14">
          <h3 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            {heading}
          </h3>

          <div className="relative space-y-10">
            <div
              ref={containerRef}
              className="hide-scrollbar flex snap-x snap-mandatory flex-nowrap items-center gap-10 overflow-x-auto scroll-smooth"
              style={{
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {visuals.map((visual, index) => {
                return (
                  <VisualCard
                    key={`visual-${index}`}
                    visual={visual}
                    index={index}
                    total={visuals.length}
                    scrollXProgress={scrollXProgress}
                  />
                );
              })}
            </div>
            <div className="sticky bottom-20 z-20 flex justify-center">
              <div className="flex h-14 items-center gap-2 overflow-hidden">
                <div className="flex h-full items-center gap-3 rounded-full bg-muted/50 px-6 backdrop-blur-xl">
                  {visuals.map((_, index) => {
                    return (
                      <GalleryPaginationDot
                        key={`visual-${index}`}
                        index={index}
                        scrollXProgress={scrollXProgress}
                        total={visuals.length}
                        isPlaying={isPlaying}
                        currentVisualIndex={currentVisualIndex}
                      />
                    );
                  })}
                </div>

                <button
                  onClick={
                    currentVisualIndex === visuals.length - 1 && !isPlaying
                      ? restartAnimation
                      : () => setIsPlaying(!isPlaying)
                  }
                  className="flex h-full items-center justify-center rounded-full bg-muted/50 px-6 backdrop-blur-xl [&>svg]:fill-foreground/50 [&>svg]:stroke-foreground/10"
                >
                  {currentVisualIndex === visuals.length - 1 && !isPlaying ? (
                    <RotateCcw
                      strokeWidth={2.2}
                      className="!fill-none !stroke-foreground/50"
                    />
                  ) : isPlaying ? (
                    <Pause />
                  ) : (
                    <Play />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Gallery35 };
