import { ArrowRight } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Globe } from "@/components/magicui/globe";
import { Button } from "@/components/ui/button";

interface Feature253Props {
  className?: string;
}

const Feature253 = ({ className }: Feature253Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative flex h-92 w-full flex-col justify-between overflow-hidden rounded-4xl border bg-muted p-8 md:flex-row">
          <div className="flex h-full max-w-lg flex-col justify-center gap-4">
            <h1 className="text-4xl font-medium tracking-tighter md:text-6xl">
              Your Ultimate Solution
            </h1>
            <p className="text-muted-foreground/70">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur
            </p>
            <Button
              variant="default"
              className="group relative z-99 w-fit !rounded-full border border-none bg-background px-10 tracking-tighter text-foreground !shadow-none hover:bg-background"
            >
              Join Today
              <ArrowRight className="ml-2 -rotate-45 rounded-full bg-foreground p-px text-background transition-all ease-in-out group-hover:rotate-0" />
            </Button>
          </div>
          <div className="relative size-full">
            <Globe className="absolute top-0 md:top-10 md:-right-100 md:scale-150" />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature253 };
