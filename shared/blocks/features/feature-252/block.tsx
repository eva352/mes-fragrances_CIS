import React from "react";

import { cn } from "@/lib/utils";

import { Ripple } from "@/components/magicui/ripple";
import { Button } from "@/components/ui/button";

interface Feature252Props {
  className?: string;
}

const Feature252 = ({ className }: Feature252Props) => {
  return (
    <section className={cn("bg-muted py-32", className)}>
      <div className="container">
        <div className="relative h-92 w-full overflow-hidden rounded-4xl border bg-background p-4">
          <svg
            className="absolute top-0 left-0 size-full p-4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.2"
              width="100%"
              height="100%"
              rx="22"
              strokeWidth="2"
              stroke="currentColor"
              strokeDasharray="7 12"
            />
          </svg>
          <div className="relative flex size-full items-center justify-center overflow-hidden rounded-3xl text-center">
            <div className="flex flex-col items-center gap-4">
              <p className="mx-auto max-w-sm text-muted-foreground lg:text-xl">
                Blocks Build with Shadcn and Tailwindcss
              </p>
              <h1 className="text-5xl font-medium tracking-tighter lg:text-7xl">
                Your Ultimate Solution
              </h1>
              <Button
                variant="secondary"
                className="relative z-99 mb-20 w-fit !rounded-none border px-10"
              >
                Get Started
              </Button>
            </div>

            <Ripple mainCircleSize={550} className="absolute -bottom-220" />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature252 };
