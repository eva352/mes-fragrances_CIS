"use client";

import { Cpu, Zap } from "lucide-react";
import { motion } from "motion/react";
import type { RefObject} from "react";
import React, { useRef } from "react";
import { useEffect, useId, useState } from "react";

import { cn } from "@/lib/utils";

interface Feature250Props {
  className?: string;
}

const Feature250 = ({ className }: Feature250Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <p className="mx-auto mb-4 max-w-sm text-center text-muted-foreground md:text-xl">
          Bridging Developers, Building the Future
        </p>
        <h1 className="mx-auto -mb-12 max-w-3xl text-center text-4xl font-medium tracking-tighter md:text-6xl lg:mb-5 lg:text-7xl">
          Connecting Developers Worldwide
        </h1>
        <AnimatedBeamIllustration />
      </div>
    </section>
  );
};

export { Feature250 };

const REVERSE = false;
const DURATION = 4;

function AnimatedBeamIllustration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      <div className="flex w-full flex-col items-center justify-between gap-10 lg:flex-row">
        <div className="relative z-10 flex h-100 w-full items-center justify-center rounded-3xl lg:w-0">
          <div
            ref={div1Ref}
            className="absolute top-40 left-0 z-10 flex size-18 -translate-y-1/2 items-center justify-center rounded-full bg-background p-1 lg:top-1/2 lg:left-0"
          >
            <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background p-[5px]">
              <div className="flex size-full items-center justify-center rounded-md border border-border bg-muted">
                <Cpu size={16} />
              </div>
            </div>
          </div>
          <div
            ref={div2Ref}
            className="absolute top-40 right-0 z-10 flex size-18 -translate-y-1/2 items-center justify-center rounded-full bg-background p-1 lg:top-20 lg:left-20"
          >
            <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background p-[5px]">
              <div className="flex size-full items-center justify-center rounded-md border border-border bg-muted">
                <Cpu size={16} />
              </div>
            </div>
          </div>
          <div
            ref={div3Ref}
            className="absolute bottom-0 left-6 z-10 flex size-18 -translate-y-1/2 items-center justify-center rounded-full bg-background p-1 lg:bottom-2 lg:left-20"
          >
            <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background p-[5px]">
              <div className="flex size-full items-center justify-center rounded-md border border-border bg-muted">
                <Cpu size={16} />
              </div>
            </div>
          </div>
          <div
            ref={div4Ref}
            className="absolute right-6 bottom-0 z-10 flex size-18 -translate-y-1/2 items-center justify-center rounded-full bg-background p-1 lg:top-0 lg:left-50"
          >
            <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background p-[5px]">
              <div className="flex size-full items-center justify-center rounded-md border border-border bg-muted">
                <Cpu size={16} />
              </div>
            </div>
          </div>
          <div
            ref={div5Ref}
            className="absolute top-20 z-10 flex size-18 -translate-y-1/2 items-center justify-center rounded-full bg-background p-1 lg:top-100 lg:left-50"
          >
            <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background p-[5px]">
              <div className="flex size-full items-center justify-center rounded-md border border-border bg-muted">
                <Cpu size={16} />
              </div>
            </div>
          </div>
        </div>
        <div
          ref={div6Ref}
          className="z-10 flex size-32 items-center justify-center rounded-3xl border bg-muted lg:size-42"
        >
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
            className="size-14 lg:size-18 dark:invert"
            alt=""
          />
        </div>
        <div
          ref={div7Ref}
          className="z-10 mt-40 flex size-15 items-center justify-center rounded-xl border bg-muted lg:mt-0"
        >
          <Zap fill="currentColor" />
        </div>
      </div>

      <div className="block lg:hidden">
        <AnimatedBeam
          duration={DURATION}
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div6Ref}
          reverse={REVERSE}
        />
        <AnimatedBeam
          duration={DURATION}
          endYOffset={-60}
          endXOffset={-10}
          curvature={10}
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div6Ref}
          reverse={REVERSE}
        />
        <AnimatedBeam
          duration={DURATION}
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={div6Ref}
          direction="vertical"
          reverse={REVERSE}
        />
        <AnimatedBeam
          duration={DURATION}
          endYOffset={-60}
          endXOffset={10}
          curvature={10}
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div6Ref}
          reverse={!REVERSE}
        />
        <AnimatedBeam
          duration={DURATION}
          containerRef={containerRef}
          fromRef={div4Ref}
          toRef={div6Ref}
          reverse={!REVERSE}
        />
        <AnimatedBeam
          duration={DURATION}
          containerRef={containerRef}
          fromRef={div6Ref}
          toRef={div7Ref}
          direction="vertical"
          reverse={REVERSE}
        />
      </div>

      <div className="hidden lg:block">
        <AnimatedBeam
          duration={DURATION}
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div6Ref}
          reverse={REVERSE}
        />
        <AnimatedBeam
          endYOffset={-30}
          endXOffset={60}
          duration={DURATION}
          curvature={-140}
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div6Ref}
          reverse={REVERSE}
        />
        <AnimatedBeam
          duration={DURATION}
          endYOffset={30}
          curvature={140}
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div6Ref}
          reverse={REVERSE}
        />
        <AnimatedBeam
          duration={DURATION}
          endYOffset={-30}
          endXOffset={-60}
          curvature={-180}
          containerRef={containerRef}
          fromRef={div4Ref}
          toRef={div6Ref}
          reverse={REVERSE}
        />

        <AnimatedBeam
          duration={DURATION}
          endXOffset={-60}
          endYOffset={30}
          curvature={180}
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={div6Ref}
          reverse={REVERSE}
        />
        <AnimatedBeam
          duration={DURATION}
          containerRef={containerRef}
          fromRef={div6Ref}
          toRef={div7Ref}
          reverse={REVERSE}
        />
      </div>
    </div>
  );
}

/* 
  animated-beam.tsx with direction support.
  The original code is from https://magicui.design/docs/components/animated-beam which doesn't support vertical animations. This is a modified version of the original code to support that.
*/

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>; // Container ref
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  direction?: "horizontal" | "vertical";
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false, // Include the reverse prop
  direction = "horizontal",
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  // Calculate the gradient coordinates based on the direction and reverse prop
  const gradientCoordinates =
    direction === "vertical"
      ? reverse
        ? {
            x1: ["0%", "0%"],
            x2: ["0%", "0%"],
            y1: ["90%", "-10%"],
            y2: ["100%", "0%"],
          }
        : {
            x1: ["0%", "0%"],
            x2: ["0%", "0%"],
            y1: ["10%", "110%"],
            y2: ["0%", "100%"],
          }
      : reverse
        ? {
            x1: ["90%", "-10%"],
            x2: ["100%", "0%"],
            y1: ["0%", "0%"],
            y2: ["0%", "0%"],
          }
        : {
            x1: ["10%", "110%"],
            x2: ["0%", "100%"],
            y1: ["0%", "0%"],
            y2: ["0%", "0%"],
          };

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;
        setSvgDimensions({ width: svgWidth, height: svgHeight });

        const startX =
          rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
        const startY =
          rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
        const endX =
          rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
        const endY =
          rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

        let d: string;
        if (direction === "vertical") {
          const controlX = startX - curvature;
          d = `M ${startX},${startY} Q ${controlX},${
            (startY + endY) / 2
          } ${endX},${endY}`;
        } else {
          const controlY = startY - curvature;
          d = `M ${startX},${startY} Q ${
            (startX + endX) / 2
          },${controlY} ${endX},${endY}`;
        }
        setPathD(d);
      }
    };

    // Initialize ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      // For all entries, recalculate the path
      for (const _ of entries) {
        updatePath();
      }
    });

    // Observe the container element
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Call the updatePath initially to set the initial path
    updatePath();

    // Clean up the observer on component unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
    direction,
  ]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute top-0 left-0 transform-gpu stroke-2",
        className,
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1], // https://easings.net/#easeOutExpo
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop stopColor={gradientStartColor}></stop>
          <stop offset="32.5%" stopColor={gradientStopColor}></stop>
          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          ></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  );
};
