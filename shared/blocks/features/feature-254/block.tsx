import { ArrowRight } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { Button } from "@/components/ui/button";

interface Feature254Props {
  className?: string;
}

const Feature254 = ({ className }: Feature254Props) => {
  const circle1Images = [
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person4.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person5.jpeg",
  ];

  const circle2Images = [
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw1.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw2.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw3.jpeg",
  ];

  const circle3Images = [
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person1.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person2.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person3.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person4.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person5.jpeg",
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="relative">
        <div className="flex w-full items-center justify-center">
          <div className="absolute z-99 flex h-full w-full flex-col items-center justify-center gap-4">
            <div className="pointer-events-none absolute inset-y-0 top-1/2 left-1/2 h-1/3 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-background blur-2xl"></div>
            <h1 className="z-10 text-center text-5xl font-medium tracking-tighter sm:text-6xl">
              Connecting Devs
            </h1>
            <p className="z-10 max-w-2xl text-center text-muted-foreground/70">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur
            </p>

            <Button
              variant="default"
              className="group relative z-10 w-fit !rounded-full px-10 tracking-tighter !shadow-none"
            >
              Become a member
              <ArrowRight className="-rotate-45 rounded-full transition-all ease-in-out group-hover:rotate-0" />
            </Button>
          </div>
          <div className="relative flex h-[620px] w-full flex-col items-center justify-center overflow-hidden">
            <OrbitingCircles iconSize={40} radius={130} speed={2}>
              {circle1Images.map((src, index) => (
                <div
                  key={index}
                  className="size-10 overflow-hidden rounded-full"
                >
                  <img src={src} className="size-full object-cover" alt="" />
                </div>
              ))}
            </OrbitingCircles>
            <OrbitingCircles iconSize={40} radius={200} reverse speed={2}>
              {circle2Images.map((src, index) => (
                <div
                  key={index}
                  className="size-10 overflow-hidden rounded-full"
                >
                  <img src={src} className="size-full object-cover" alt="" />
                </div>
              ))}
            </OrbitingCircles>
            <OrbitingCircles iconSize={40} radius={280} speed={1}>
              {circle3Images.map((src, index) => (
                <div
                  key={index}
                  className="size-10 overflow-hidden rounded-full"
                >
                  <img src={src} className="size-full object-cover" alt="" />
                </div>
              ))}
            </OrbitingCircles>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature254 };
