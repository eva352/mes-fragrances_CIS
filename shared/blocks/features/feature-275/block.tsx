"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

import { CanvasRevealEffect } from "@/components/aceternity/canvas-reveal-effect";

interface Feature275Props {
  className?: string;
}

const Feature275 = ({ className }: Feature275Props) => {
  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container flex w-full flex-col items-center justify-center px-4">
        <h2 className="relative z-20 py-2 text-center font-sans text-5xl font-semibold tracking-tighter md:py-7 lg:text-7xl">
          Secrets Behind Success
        </h2>
        <p className="text-md mx-auto max-w-xl text-center text-muted-foreground lg:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card
            defaultText="01"
            revealText="#01 Consistent Work"
            revealDesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            animationSpeed={5.1}
            containerClassName="bg-emerald-900"
            hasRadialGradient
          />
          <Card
            defaultText="02"
            revealText="#02 Focused Mind"
            revealDesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            animationSpeed={3}
            containerClassName="bg-black"
            colors={[
              [236, 72, 153],
              [232, 121, 249],
            ]}
            dotSize={2}
            hasRadialGradient
          />
          <Card
            defaultText="03"
            revealText="#03 Positive Mindset"
            revealDesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            animationSpeed={3}
            containerClassName="bg-sky-600"
            colors={[[125, 211, 252]]}
            hasRadialGradient
          />
        </div>
      </div>
    </section>
  );
};

export { Feature275 };

const Card = ({
  defaultText,
  revealText,
  revealDesc,
  animationSpeed = 3,
  containerClassName = "bg-black",
  colors = [[255, 255, 255]],
  dotSize = 1,
  hasRadialGradient = false,
}: {
  defaultText: string;
  revealText: string;
  revealDesc: string;
  animationSpeed?: number;
  containerClassName?: string;
  colors?: number[][];
  dotSize?: number;
  hasRadialGradient?: boolean;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group/canvas-card relative mx-auto flex h-[22rem] w-full max-w-sm items-center justify-center overflow-hidden rounded-3xl bg-muted"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 h-full w-full"
          >
            <CanvasRevealEffect
              animationSpeed={animationSpeed}
              containerClassName={containerClassName}
              colors={colors}
              dotSize={dotSize}
            />
            {hasRadialGradient && (
              <div className="absolute inset-0 bg-black/50 [mask-image:radial-gradient(400px_at_center,white,transparent)] dark:bg-black/90" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 flex h-full items-center justify-center">
        <div className="absolute mx-auto flex w-full max-w-[10rem] flex-col items-center justify-center gap-5 text-center text-6xl leading-none tracking-tight text-muted-foreground/80 transition duration-200 group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0">
          {defaultText}
        </div>
        <div className="absolute relative z-10 mt-4 flex h-full flex-col justify-between border p-7 tracking-tight text-black opacity-0 transition duration-200 group-hover/canvas-card:-translate-y-2 group-hover/canvas-card:text-white group-hover/canvas-card:opacity-100 dark:text-white">
          <p>{revealText}</p>
          <p>{revealDesc}</p>
        </div>
      </div>
    </div>
  );
};
