"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
  children: ReactNode;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 1,
  children,
}: MarqueeProps) {
  const axisClass = vertical ? "flex-col" : "flex-row";
  const containerClass = vertical ? "h-full" : "w-full";
  const content = Array.from({ length: Math.max(1, repeat) }, (_, index) => (
    <span key={index} className={axisClass}>
      {children}
    </span>
  ));
  return (
    <div className={cn("group flex overflow-hidden", containerClass, axisClass, className)}>
      <div
        className={cn(
          "flex shrink-0 items-center gap-4 pr-4",
          reverse ? "aurora-marquee-reverse" : "aurora-marquee",
          axisClass,
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{ animationDuration: "var(--duration, 20s)" }}
      >
        {content}
      </div>
      <div
        aria-hidden
        className={cn(
          "flex shrink-0 items-center gap-4 pr-4",
          reverse ? "aurora-marquee-reverse" : "aurora-marquee",
          axisClass,
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{ animationDuration: "var(--duration, 20s)" }}
      >
        {content}
      </div>
    </div>
  );
}
