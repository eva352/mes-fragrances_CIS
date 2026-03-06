"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Group } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { ShineBorder } from "@/components/magicui/shine-border";
import { Button } from "@/components/ui/button";

interface Feature236Props {
  className?: string;
}

const Feature236 = ({ className }: Feature236Props) => {
  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container flex flex-col items-center gap-10 md:gap-0">
        <Button
          variant="outline"
          className="flex items-center justify-center gap-5 rounded-full px-5! py-5 text-sm font-medium text-muted-foreground"
        >
          <Group />
          Your website builder
          <ArrowUpRight />
        </Button>
        <BracketedBorder>
          <div className="mb-7 flex items-center justify-center gap-5 tracking-tight">
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-block size-2 rounded-full bg-green-300"></span>
              <span className="absolute inline-block size-3 animate-ping rounded-full bg-green-300"></span>
            </div>
            <p>Ready to copy/paste blocks</p>
          </div>
          <h1 className="max-w-xl px-4 text-center text-6xl font-semibold tracking-tighter text-foreground md:text-[90px] md:leading-22">
            Blocks Built With Shadcn & Tailwind.
          </h1>
        </BracketedBorder>
        <h2 className="text-3xl font-medium tracking-tighter text-foreground">
          Welcome to Shadcn Blocks{" "}
        </h2>
        <p className="max-w-2xl px-10 text-center text-muted-foreground sm:mt-5 lg:text-xl">
          Finely crafted components built with React, Tailwind and Shadcn UI.
          Developers can copy and paste these blocks directly into their
          project.
        </p>
        <div className="flex flex-col gap-4 sm:mt-8 md:flex-row">
          <Button className="h-11 w-full rounded-xl sm:w-auto">
            Discover all components
          </Button>
          <Button
            variant="outline"
            className="h-11 w-full rounded-xl sm:w-auto"
          >
            View on GitHub
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

const BracketedBorder = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ width: 0, opacity: 0 }}
    className="relative flex flex-col items-center justify-center sm:my-10 md:h-[500px] md:overflow-hidden"
    whileInView={{ width: "65vw", opacity: 1 }}
    viewport={{ once: true }}
    transition={{
      width: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        mass: 1,
      },
      opacity: { duration: 0.5 },
    }}
  >
    <div className="absolute inset-0 hidden border border-foreground/10 md:block">
      <ShineBorder
        duration={10}
        borderWidth={2}
        shineColor={["oklch(87.1% 0.15 154.449)"]}
      />
      <Vector className="absolute top-1 left-1 rotate-90" />
      <Vector className="absolute top-1 right-1 -rotate-180" />
      <Vector className="absolute bottom-1 left-1" />
      <Vector className="absolute right-1 bottom-1 -rotate-90" />
    </div>
    <div className="flex h-full w-screen flex-col items-center justify-center">
      {children}
    </div>
  </motion.div>
);

export { Feature236 };

const Vector = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="12"
    height="12"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.7718 20.3821L0.771792 0.265381C3.72131 0.262685 6.1138 2.65299 6.1138 5.6025V15.1587H15.5512C18.436 15.1587 20.7746 17.4973 20.7746 20.3821H0.7718Z"
      fill="black"
    />
  </svg>
);
