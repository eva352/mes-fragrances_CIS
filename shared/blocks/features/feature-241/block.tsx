import {
  ArrowUpRight,
  AudioLines,
  Box,
  Fingerprint,
  LocateFixed,
} from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";

const teamFeatures = [
  {
    id: 1,
    icon: LocateFixed,
    title:
      "Moving fast and tackling complexity Building systems that scale at OpenAI",
    description: "Innovative approaches to system design and scalability",
    href: "#",
  },
  {
    id: 2,
    icon: AudioLines,
    title:
      "Collaborative Innovation Driving technological breakthroughs breakthroughs ",
    description: "Teamwork that pushes the boundaries of what's possible",
    href: "#",
  },
  {
    id: 3,
    icon: Box,
    title:
      "Agile Development Rapid iteration and continuous improvement improvement",
    description: "Adapting quickly to changing technological landscapes",
    href: "#",
  },
  {
    id: 4,
    icon: Fingerprint,
    title:
      "Cross-Functional Excellence Breaking down silos, fostering innovation",
    description: "Integrating diverse skills and perspectives",
    href: "#",
  },
];

interface Feature241Props {
  className?: string;
}

const Feature241 = ({ className }: Feature241Props) => {
  return (
    <section className={cn("overflow-hidden bg-background py-32", className)}>
      <div className="container">
        <div className="relative">
          <header className="mb-15 max-w-2xl">
            <h1 className="mb-8 text-5xl font-bold tracking-tighter text-foreground lg:text-7xl">
              Meet the teams who build the future
            </h1>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground md:text-xl">
              Finely crafted components built with React, Tailwind and Shadcn
              UI. Developers can copy and adapt.
            </p>
          </header>
          <div className="absolute -top-15 -right-10 hidden transition-all ease-in-out group-hover:-rotate-0 lg:block">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/illustrations/tokyo-browser-window-with-tab-bars.svg"
              className="size-150 md:size-100"
              alt=""
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {teamFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <a
                key={feature.id}
                href={feature.href}
                className="block transition-all duration-500 ease-in-out"
              >
                <Card className="group relative rounded-none! border border-border bg-background p-6 shadow-none transition-all duration-500 ease-in-out hover:bg-linear-to-l hover:from-transparent hover:to-muted">
                  <CardContent className="flex h-full flex-col justify-between p-0">
                    <div className="flex size-15 items-center justify-center border border-border bg-muted transition-colors duration-500 ease-in-out group-hover:bg-background">
                      <Icon
                        size={30}
                        className="transition-all duration-500 ease-in-out"
                      />
                    </div>

                    <h3 className="mt-4 text-xl leading-tight font-semibold tracking-tight text-foreground transition-all duration-500 ease-in-out md:text-2xl lg:pr-30 lg:text-3xl">
                      {feature.title}
                    </h3>

                    <div className="absolute right-6 bottom-6 flex size-12 items-center justify-center border border-border bg-muted opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100">
                      <ArrowUpRight className="h-[27px] w-[27px] text-foreground transition-all duration-500 ease-in-out group-hover:rotate-45" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { Feature241 };
