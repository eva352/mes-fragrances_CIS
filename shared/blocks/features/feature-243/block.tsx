import { Cog, Gem, Landmark, LocateFixed } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";

type Step = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

interface Feature243Props {
  className?: string;
}

const Feature243 = ({ className }: Feature243Props) => {
  const steps: Step[] = [
    {
      title: "Initialization",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      icon: (
        <LocateFixed className="size-10 stroke-white transition-all ease-in-out group-hover:rotate-90" />
      ),
    },
    {
      title: "Optimization",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      icon: (
        <Cog className="size-10 stroke-white transition-all ease-in-out group-hover:rotate-90" />
      ),
    },
    {
      title: "Efficiency",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      icon: (
        <Gem className="size-10 stroke-white transition-all ease-in-out group-hover:size-12" />
      ),
    },
    {
      title: "Finalization",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      icon: (
        <Landmark className="size-10 stroke-white transition-all ease-in-out group-hover:size-12" />
      ),
    },
  ];

  return (
    <section className={cn("bg-background", className)}>
      <div className="container py-32">
        <header className="relative z-10 flex flex-col items-center justify-center gap-6 bg-background text-center">
          <h1 className="text-5xl font-bold tracking-tighter text-foreground lg:text-6xl">
            From Input to Outcome
          </h1>

          <p className="mt-2 mb-4 max-w-xl text-lg text-muted-foreground md:text-xl">
            Lorem ipsum dolor sit amet consectetur adipiasicing elit.Lorem ipsum
            dolor sit amet consectetur
          </p>
        </header>

        <div className="mt-24 flex flex-wrap items-center justify-center gap-18 sm:mt-68 sm:gap-6">
          <div className="absolute top-40 left-1/2 h-55 w-0.5 rounded-full bg-muted lg:h-58" />
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex w-fit flex-col items-center"
            >
              <div
                className={cn(
                  "absolute -top-[174px] left-1/2 h-0.5 w-[109%] rounded-full bg-muted",
                  index == 3 ? "hidden" : "",
                  index == 2 ? "hidden 2xl:block" : "",
                  index == 1 ? "hidden lg:block" : "",
                  index == 0 ? "hidden sm:block" : "",
                )}
              />
              <div className="absolute -top-[174px] left-1/2 h-full w-0.5 rounded-full bg-muted" />
              <div className="relative z-10 flex h-8 w-5 items-center justify-center rounded-full bg-background p-1 pb-5">
                <div className="relative z-10 size-3 rounded-full bg-foreground" />
              </div>

              <Card className="group relative z-10 h-full w-full overflow-hidden rounded-4xl border-none bg-muted shadow-none sm:w-64 md:w-72">
                <CardContent className="flex h-full flex-col items-center gap-5 p-0 pt-10 pb-5">
                  <div className="flex size-20 items-center justify-center rounded-3xl bg-foreground">
                    {step.icon}
                  </div>

                  <div className="flex w-full flex-col items-center gap-4 px-4 pt-5 pb-3">
                    <h3 className="w-full text-center text-3xl font-semibold tracking-tighter text-foreground">
                      {step.title}
                    </h3>

                    <p className="w-full max-w-sm text-center font-medium text-muted-foreground/70">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature243 };
