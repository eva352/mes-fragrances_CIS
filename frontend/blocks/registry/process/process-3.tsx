"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

const processSteps = [
  {
    id: 1,
    title: "Discovery",
    bgColor: "bg-sky-200",
    numberPosition: "left-[40%] lg:left-[30%]",
    number: "0001",
  },
  {
    id: 2,
    title: "Strategy",
    bgColor: "bg-sky-300",
    numberPosition: "left-[52%] lg:left-[42%]",
    number: "0002",
  },
  {
    id: 3,
    title: "Design",
    bgColor: "bg-sky-400",
    numberPosition: "left-[62%] lg:left-[58%]",
    number: "0003",
  },
  {
    id: 4,
    title: "Development",
    bgColor: "bg-sky-500",
    numberPosition: "left-[75%] lg:left-[72%]",
    number: "0004",
  },
  {
    id: 5,
    title: "Launch",
    bgColor: "bg-sky-600",
    numberPosition: "left-[85%] lg:left-[85%]",
    number: "0005",
  },
];

interface Process3Props {
  className?: string;
}

const Process3 = ({ className }: Process3Props) => {
  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container">
        <div className="flex justify-between gap-[10vw]">
          <h2 className="hidden pt-4 font-mono text-2xl tracking-tighter lg:block">
            0 - 5
          </h2>
          <div className="w-full max-w-xl px-2">
            <h1 className="text-5xl font-semibold tracking-tighter md:text-8xl">
              Process
            </h1>
            <p className="mt-6 max-w-md text-lg text-foreground/50">
              Our comprehensive approach to delivering exceptional results
              through a structured methodology
            </p>
          </div>
          <h2 className="hidden pt-4 font-mono text-2xl tracking-tighter md:block">
            0002
          </h2>
        </div>
        <ul className="mt-20">
          {processSteps.map((step, index) => (
            <motion.li
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.1,
              }}
              key={step.id}
              className="relative flex h-14 w-full items-center md:h-22"
            >
              <div
                className={cn(
                  "absolute left-1/2 h-14 w-screen -translate-x-1/2 md:h-22",
                  step.bgColor,
                )}
              ></div>
              <div className="relative z-10 flex items-center gap-2">
                <ArrowDown className="md:size-12" />
                <h3 className="text-3xl font-medium tracking-tight md:text-5xl">
                  {step.title}
                </h3>
              </div>
              <span
                className={cn(
                  "absolute -bottom-1 font-mono text-5xl font-semibold tracking-tighter text-white md:-bottom-3 md:text-8xl",
                  step.numberPosition,
                )}
              >
                {step.number}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export { Process3 };

export default Process3;
