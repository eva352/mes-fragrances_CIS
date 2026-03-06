import React from "react";

import { cn } from "@/lib/utils";

import { GlowingStarsBackgroundCard } from "@/components/aceternity/glowing-stars";
import { Button } from "@/components/ui/button";

const cardData = [
  {
    title: "June Collection",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi.",
  },
  {
    title: "Summer Essentials",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi.",
  },
  {
    title: "Premium Bundle",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi.",
  },
  {
    title: "New Arrivals",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi.",
  },
];

interface Feature287Props {
  className?: string;
}

const Feature287 = ({ className }: Feature287Props) => {
  return (
    <section
      className={cn(
        "dark overflow-hidden bg-background py-32 text-foreground",
        className,
      )}
    >
      <div className="container flex w-full flex-col items-center justify-center px-4">
        <h2 className="relative mt-4 w-full max-w-7xl py-2 text-4xl font-semibold tracking-tighter lg:text-5xl">
          The Production Ready Blocks
          <br />
          <span className="text-muted-foreground">for your Next Project</span>
        </h2>
        <div className="mt-10 grid w-full max-w-7xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="flex flex-col rounded-3xl bg-muted/60 p-4"
            >
              <GlowingStarsBackgroundCard className="h-55 max-w-full border-none !bg-muted-foreground" />

              <div className="mt-3 flex items-center justify-start gap-3">
                <h3 className="text-xl font-semibold tracking-tighter">
                  {card.title}
                </h3>
              </div>
              <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground/70">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Commodi.
              </div>
            </div>
          ))}
        </div>

        <Button variant="secondary" className="mt-10 h-10 rounded-full !px-5">
          View All Collections
        </Button>
      </div>
    </section>
  );
};

export { Feature287 };
