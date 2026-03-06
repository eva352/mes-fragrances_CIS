"use client";

import { type SVGProps, useId } from "react";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FEATURES = [
  {
    id: "move-money",
    title: "Move and hold money",
    description:
      "Previously, emerging financial companies were forced to navigate costly middleware solutions that connected them to outdated sponsor bank systems.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    id: "card-program",
    title: "Build a modern card program",
    description:
      "Create and manage virtual and physical cards with complete control over spending limits, merchant categories, and real-time transaction monitoring.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    id: "lend-money",
    title: "Lend money",
    description:
      "Offer various lending products through our platform with automated underwriting, loan servicing, and compliance management.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    description:
      "Leverage powerful analytics tools to gain insights from transaction data, user behavior, and financial patterns to make data-driven decisions.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
  {
    id: "compliance",
    title: "Regulatory Compliance",
    description:
      "Stay compliant with automated monitoring systems, KYC/AML checks, and real-time reporting tools that adapt to changing regulatory requirements.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
  },
];

export function Feature192() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section className="container max-w-5xl py-32">
      <div className="relative overflow-hidden rounded-3xl border bg-linear-to-bl from-gradient-1/20 to-transparent py-5 sm:py-6 lg:py-8">
        <div className="absolute inset-0 z-[-1]">
          <PlusSigns className="h-full w-full text-foreground/[0.05]" />
        </div>
        <div className="sm:px-6 lg:px-8">
          <div className="px-5 sm:px-0">
            <h3 className="font-mono text-sm font-semibold tracking-widest text-accent-foreground">
              WHY CHARTER?
            </h3>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Code security
            </h2>
          </div>
          <div className="mt-10 flex gap-12 overflow-hidden sm:mt-16 lg:mt-20">
            <Accordion
              type="single"
              className="flex-1"
              defaultValue="0"
              onValueChange={(value) => setSelectedIndex(Number(value))}
            >
              {FEATURES.map((feature, index) => (
                <AccordionItem
                  key={feature.id}
                  value={index.toString()}
                  className="border-black/20 dark:border-white/20"
                >
                  <AccordionTrigger className="px-5 text-start hover:no-underline sm:px-0">
                    <h3 className="text-xl font-bold opacity-80">
                      {feature.title}
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent className="">
                    <p className="px-5 leading-relaxed font-medium text-muted-foreground sm:px-0">
                      {feature.description}
                    </p>
                    <div className="relative mt-4 translate-x-5 sm:hidden">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="h-[240px] w-full rounded-2xl object-cover shadow-lg"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="relative hidden sm:block sm:flex-1">
              <img
                src={FEATURES[selectedIndex].image}
                alt={FEATURES[selectedIndex].title}
                className="rounded-2xl object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface PlusSignsProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

const PlusSigns = ({ className, ...props }: PlusSignsProps) => {
  const GAP = 16;
  const STROKE_WIDTH = 1;
  const PLUS_SIZE = 6;
  const id = useId();
  const patternId = `plus-pattern-${id}`;

  return (
    <svg width={GAP * 2} height={GAP * 2} className={className} {...props}>
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={GAP}
          height={GAP}
          patternUnits="userSpaceOnUse"
        >
          <line
            x1={GAP / 2}
            y1={(GAP - PLUS_SIZE) / 2}
            x2={GAP / 2}
            y2={(GAP + PLUS_SIZE) / 2}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
          />
          <line
            x1={(GAP - PLUS_SIZE) / 2}
            y1={GAP / 2}
            x2={(GAP + PLUS_SIZE) / 2}
            y2={GAP / 2}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};
