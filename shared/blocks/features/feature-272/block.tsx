import { ArrowRight } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { BackgroundBeams } from "@/components/aceternity/background-beams";

interface Feature272Props {
  className?: string;
}

const Feature272 = ({ className }: Feature272Props) => {
  return (
    <section
      className={cn(
        "dark h-full w-screen overflow-hidden bg-background py-32 text-foreground",
        className,
      )}
    >
      <div className="relative z-20 container flex h-full flex-col items-center justify-center gap-10">
        <p>HOW TO IMPLEMENT</p>
        <h2 className="text-center text-5xl font-medium font-semibold tracking-tighter lg:text-7xl">
          Just 3 Steps to get Started
        </h2>
        <p className="max-w-3xl text-center text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam,
        </p>
        <div className="relative grid grid-cols-1 md:grid-cols-3">
          <div className="relative space-y-5 border p-10">
            <h3 className="text-xl font-medium font-semibold tracking-tighter">
              Copy the Shadcn CLI
            </h3>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim
            </p>
            <div className="absolute right-1/2 -bottom-5 z-10 flex size-10 translate-x-1/2 rotate-90 items-center justify-center gap-2 rounded-full border bg-background md:top-1/2 md:-right-5 md:translate-x-0 md:-translate-y-1/2 md:rotate-0">
              <ArrowRight className="size-6" />
            </div>
          </div>
          <div className="relative space-y-5 border p-10">
            <h3 className="text-xl font-medium font-semibold tracking-tighter">
              Paste CLI to your project
            </h3>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim
            </p>
            <div className="absolute right-1/2 -bottom-5 z-10 flex size-10 translate-x-1/2 rotate-90 items-center justify-center gap-2 rounded-full border bg-background md:top-1/2 md:-right-5 md:translate-x-0 md:-translate-y-1/2 md:rotate-0">
              <ArrowRight className="size-6" />
            </div>
          </div>

          <div className="space-y-5 border p-10">
            <h3 className="text-xl font-medium font-semibold tracking-tighter">
              Edit as you want
            </h3>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim
            </p>
          </div>
          <div className="absolute left-0 z-99 h-full w-10 bg-gradient-to-r from-background to-transparent" />
          <div className="absolute right-0 z-99 h-full w-10 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
      <BackgroundBeams className="dark bg-background text-foreground" />
    </section>
  );
};

export { Feature272 };
