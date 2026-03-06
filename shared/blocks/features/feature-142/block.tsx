"use client";

import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

const items: string[] = [
  "Responsive Design and Layout",
  "Clean and Modern Design",
  "Easy to Customize",
  "Cross Browser Compatible",
];

interface Feature142Props {
  className?: string;
}

const Feature142 = ({ className }: Feature142Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mt-20 flex flex-col items-center justify-center gap-16 md:flex-row">
          <div className="relative grid w-full max-w-md grid-cols-[1fr_6fr_1fr] grid-rows-[1fr_2fr_1fr_7fr] rounded-lg bg-linear-to-br from-red-100 to-blue-100 sm:max-h-[700px] md:max-w-xl">
            <div className="border-r-2 border-b-2 border-muted-foreground/30 p-4" />
            <div className="border-b-2 border-muted-foreground/30 p-4" />
            <div className="border-b-2 border-l-2 border-muted-foreground/30 p-4" />
            <div className="border-r-2 border-muted-foreground/30 p-4" />
            <div className="flex items-center justify-center rounded-xl bg-background p-2 md:p-3">
              <p className="text-center text-xs text-muted-foreground sm:text-sm md:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </p>
            </div>
            <div className="border-l-2 border-muted-foreground/30 p-4" />
            <div className="border-t-2 border-r-2 border-b-2 border-muted-foreground/30 p-4" />
            <div className="border-t-2 border-b-2 border-muted-foreground/30 p-4" />
            <div className="border-t-2 border-b-2 border-l-2 border-muted-foreground/30 p-4" />
            <div className="border-r-2 border-muted-foreground/30 p-4" />
            <div className="">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                alt="placeholder"
                className="h-full w-full rounded-t-xl object-cover"
              />
            </div>
            <div className="border-l-2 border-muted-foreground/30 p-4" />
          </div>

          <div className="w-full max-w-sm">
            <h6 className="text-3xl">
              Build any kind of Website with our Blocks
            </h6>
            <Badge variant="outline" className="mt-8 bg-muted px-3 py-2">
              Badge
            </Badge>

            <div className="mt-16 mb-4 h-px w-full bg-muted-foreground" />

            <ul className="flex flex-col gap-2">
              {items.map((item) => (
                <li className="flex items-center gap-2 text-lg" key={item}>
                  <ArrowRight className="size-5" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature142 };
