"use client";

import { motion } from "framer-motion";
import { Cpu, FlagIcon, LocateFixed, RocketIcon } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Timeline11Props {
  className?: string;
}

const Timeline11 = ({ className }: Timeline11Props) => {
  const currentPhase = 2;
  const timelinePhases = [
    {
      id: 0,
      date: "January 15, 2024",
      title: "Phase I",
      description: "Project initialization and strategic planning begins.",
      icon: RocketIcon,
    },
    {
      id: 1,
      date: "March 10, 2024",
      title: "Phase II",
      description: "Detailed research and preliminary development stage.",
      icon: Cpu,
    },
    {
      id: 2,
      date: "June 5, 2024",
      title: "Phase III",
      description: "Core implementation and major milestones achieved.",
      icon: LocateFixed,
    },
    {
      id: 3,
      date: "September 20, 2024",
      title: "Phase IV",
      description: "Final refinements and project completion.",
      icon: FlagIcon,
    },
  ];

  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container flex flex-col items-center justify-center">
        <h1 className="mb-10 text-center text-3xl font-bold tracking-tighter text-foreground sm:text-6xl">
          Timeline
        </h1>
        <Card className="relative w-full border-none shadow-none md:py-16">
          <CardContent className="relative flex flex-col items-center p-0 md:mt-12">
            <Separator className="absolute -top-8 left-0 hidden md:block" />
            {currentPhase && (
              <motion.div
                initial={{ width: 0 }}
                whileInView={{
                  width: `${(currentPhase / timelinePhases.length) * 104}%`,
                }}
                transition={{ ease: "easeOut", duration: 0.5 }}
                className={cn(
                  "absolute -top-[33px] left-0 hidden h-0.5 bg-foreground md:block",
                )}
              />
            )}
            <div className="grid gap-6 md:grid-cols-4">
              {timelinePhases.map((phase, index) => {
                const PhaseIcon = phase.icon;
                return (
                  <div key={phase.id} className="relative space-y-2">
                    <Separator
                      orientation="vertical"
                      className="absolute top-6 left-2.5 block md:hidden"
                    />
                    {index == 0 && (
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{
                          height: currentPhase * 125,
                        }}
                        transition={{ ease: "easeOut", duration: 0.5 }}
                        className={cn(
                          "absolute top-22 left-2.5 z-10 w-0.5 bg-foreground md:hidden",
                        )}
                      />
                    )}
                    <div className="absolute top-4 -left-6 z-10 mb-5 flex size-18 items-center justify-center rounded-full bg-background p-1 md:-top-17 md:-left-4">
                      <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background p-[5px]">
                        <div className="flex size-full items-center justify-center rounded-md border border-border bg-muted">
                          <PhaseIcon size={16} />
                        </div>
                      </div>
                    </div>

                    <div className="pl-13 md:pl-0">
                      <p className="mt-10 text-sm text-muted-foreground">
                        {phase.date}
                      </p>
                      <h2 className="text-xl font-bold tracking-tighter text-foreground">
                        {phase.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export { Timeline11 };
