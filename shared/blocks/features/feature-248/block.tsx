"use client";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import React from "react";
import { ComponentPropsWithoutRef, FC, ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";

const Feature248 = () => {
  return (
    <section className="dark bg-background py-32">
      <div className="container flex flex-col items-center justify-center">
        <TextReveal className="font-medium xl:text-3xl" maxWidth="86rem">
          And the coolest part? This is just the beginning — there&apos;s so
          much more coming your way. From exciting features to game-changing
          updates, we&apos;re just getting started. Stay tuned — the best is yet
          to come. Big ideas are turning into reality, and you&apos;re at the
          heart of it all. Get ready to experience what&apos;s next.
        </TextReveal>
      </div>
    </section>
  );
};

export { Feature248 };

// Below is the modified component from Magic UI
// Original source: https://magicui.design/docs/components/text-reveal
// Modified to follow our coding standards and design system
// We respect copyright and attribution to the original creators

interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string;
  title?: string;
  maxWidth?: string;
}

const TextReveal: FC<TextRevealProps> = ({
  children,
  title,
  className,
  maxWidth,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const words = children.split(" ");

  return (
    <div
      ref={targetRef}
      className={cn("relative z-0 h-[200vh]", className)}
      style={{ maxWidth: maxWidth || "56rem" }}
    >
      <div className="sticky top-0 mx-auto flex h-[50%] items-center bg-transparent px-[1rem] py-[5rem]">
        <div ref={targetRef} className="flex flex-col justify-center">
          <span className="text-center text-lg font-medium tracking-tight text-foreground">
            {title}
          </span>
          <span
            className={cn(
              "flex flex-wrap p-5 text-2xl font-semibold text-black/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl dark:text-white/20",
              className,
            )}
          >
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-1.5">
      <span className="absolute opacity-30">{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className="text-black dark:text-white"
      >
        {children}
      </motion.span>
    </span>
  );
};
