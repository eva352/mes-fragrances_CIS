"use client";

import { ArrowRight, Donut } from "lucide-react";

import { cn } from "@/lib/utils";

import { ShineBorder } from "@/components/magicui/shine-border";
import { Button } from "@/components/ui/button";

interface Feature235Props {
  className?: string;
}

const Feature235 = ({ className }: Feature235Props) => {
  return (
    <section className={cn("bg-background py-32", className)}>
      <style jsx global>{`
        :root {
          --shine-color-1: #48e5c7;
          --shine-color-2: #48e54d;
          --shine-color-3: #e5dc48;
        }
        @keyframes flicker {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
        .animate-flicker {
          animation: flicker 3s ease-in-out infinite;
        }
        .animation-delay-0 {
          animation-delay: 0s;
        }
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
        .animation-delay-1500 {
          animation-delay: 1500ms;
        }
        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
        .animation-delay-2500 {
          animation-delay: 2500ms;
        }
      `}</style>
      <div className="container flex flex-col items-center justify-center gap-10 md:justify-between lg:max-w-6xl lg:flex-row">
        <div className="z-10 flex max-w-lg flex-col gap-12">
          <div>
            <Button
              variant="ghost"
              className="relative flex gap-3 rounded-full border-2 border-dashed border-muted p-5 text-base font-semibold text-foreground transition-all ease-in-out hover:gap-5"
            >
              Your website builder
              <Donut />
            </Button>
          </div>
          <h1 className="text-7xl font-semibold tracking-tighter text-foreground">
            Beautifully designed blocks for Shadcn UI
          </h1>
          <p className="text-xl font-normal tracking-tight text-muted-foreground">
            Finely crafted components built with React, Tailwind and Shadcn UI.
            Developers can copy and paste these blocks directly into their
            project.
          </p>
          <div>
            <Button
              variant="outline"
              className="relative flex gap-3 rounded-full border-2 border-dashed border-muted p-5 text-base font-semibold text-foreground transition-all ease-in-out hover:gap-5"
            >
              View on Github <ArrowRight />
            </Button>
          </div>
        </div>
        <div className="relative max-w-3xl">
          <div className="relative z-10 inline-flex items-center justify-start gap-2 rounded-3xl border border-border bg-muted p-2">
            <div className="inline-flex w-76 flex-col items-center justify-start gap-5">
              <div className="relative gap-2 rounded-2xl bg-background p-1.5">
                <ShineBorder
                  borderWidth={2}
                  shineColor={[
                    "var(--shine-color-1)",
                    "var(--shine-color-2)",
                    "var(--shine-color-3)",
                  ]}
                />
                <div className="flex flex-1 flex-wrap content-center items-center justify-center gap-1">
                  <div className="relative h-24 w-36 overflow-hidden rounded-2xl">
                    <img
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                      alt="Architecture 1"
                      className="animate-flicker animation-delay-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="relative h-24 w-36 overflow-hidden rounded-2xl">
                    <img
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                      alt="Architecture 2"
                      className="animate-flicker animation-delay-500 h-full w-full object-cover"
                    />
                  </div>
                  <div className="relative h-24 w-36 overflow-hidden rounded-2xl">
                    <img
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
                      alt="Architecture 1"
                      className="animate-flicker animation-delay-1000 h-full w-full object-cover"
                    />
                  </div>
                  <div className="relative h-24 w-36 overflow-hidden rounded-2xl">
                    <img
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg"
                      alt="Architecture 2"
                      className="animate-flicker animation-delay-1500 h-full w-full object-cover"
                    />
                  </div>
                  <div className="relative h-24 w-36 overflow-hidden rounded-2xl">
                    <img
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg"
                      alt="Architecture 3"
                      className="animate-flicker animation-delay-2000 h-full w-full object-cover"
                    />
                  </div>
                  <div className="relative h-24 w-36 overflow-hidden rounded-2xl">
                    <img
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg"
                      alt="Architecture 4"
                      className="animate-flicker animation-delay-2500 h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <svg
            width="583"
            height="455"
            className="absolute right-48 bottom-[-60]"
            viewBox="0 0 583 455"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.55487 322.329V453L305.639 451.57V341.935C305.639 312.547 329.463 288.723 358.851 288.723H542.008C563.381 288.723 580.707 271.397 580.707 250.024V40.8934C580.707 19.5203 563.381 2.19406 542.008 2.19406H332.877C311.504 2.19406 294.178 19.5203 294.178 40.8934V230.418C294.178 259.806 270.354 283.629 240.966 283.629H41.2542C19.8812 283.629 2.55487 300.956 2.55487 322.329Z"
              fill="url(#paint0_linear_1_801)"
              stroke="url(#paint1_linear_1_801)"
              strokeOpacity="0.18"
              strokeWidth="3.22494"
              strokeLinecap="round"
              strokeDasharray="9.67 9.67"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1_801"
                x1="407.667"
                y1="36.7886"
                x2="264.86"
                y2="511.534"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F3F3F3" />
                <stop offset="1" stopColor="#F9F9F9" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_1_801"
                x1="340.7"
                y1="99.5801"
                x2="237.281"
                y2="508.087"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#666666" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};

export { Feature235 };
