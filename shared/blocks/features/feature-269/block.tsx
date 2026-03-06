import { BadgeCheck } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/aceternity/3d-card";

interface Feature269Props {
  className?: string;
}

const Feature269 = ({ className }: Feature269Props) => {
  const features = [
    "Instant Implementation",
    "One-Time Payment",
    "Developer Friendly",
    "Fully Responsive",
    "Production Ready",
    "Premium Support",
    "Regular Updates",
    "Customizable Design",
    "Performance Optimized",
    "Accessibility Compliant",
    "Cross-Browser ",
    "Documentation Included",
  ];

  return (
    <section className={cn("h-full w-screen overflow-hidden py-32", className)}>
      <div className="relative container flex h-full flex-col items-start justify-between gap-10 lg:flex-row">
        <div className="brder w-full space-y-5 lg:w-3/5">
          <h1 className="mx-auto mb-15 w-full max-w-lg text-center text-5xl font-medium font-semibold tracking-tighter lg:mx-0 lg:text-left lg:text-6xl">
            Why Choose Shadcn Blocks?
          </h1>
          <div className="mb-18 flex items-center gap-4 px-5 lg:max-w-md">
            <span className="h-px w-full bg-muted-foreground/20" />
            <p className="text-sm text-muted-foreground/50">FEATURES</p>
            <span className="h-px w-full bg-muted-foreground/20" />
          </div>
          <ul className="grid grid-cols-2 gap-3 lg:max-w-md">
            {features.map((feature) => (
              <li key={feature} className="flex gap-2 lg:items-center">
                <BadgeCheck className="size-4 text-muted-foreground/80" />
                <p className="tracking-tight text-muted-foreground/80">
                  {feature}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <CardContainer
          className="w-full"
          containerClassName="h-full   w-full p-0 m-0 lg:w-2/5"
        >
          <CardBody className="group/card flex h-full !w-full flex-col items-center justify-center rounded-3xl bg-muted/70 p-5">
            <CardItem
              translateZ="60"
              className="mt-10 mb-2 max-w-xs text-center text-3xl leading-none font-semibold tracking-tighter"
            >
              #1 Biggest Shadcn Blocks Collection
            </CardItem>
            <CardItem
              as="p"
              translateZ="25"
              className="my-4 flex w-full max-w-sm items-center justify-center text-sm tracking-tight"
            >
              <span className="mr-2 opacity-50">Welcome to</span>
              <span className="font-semibold">SHADCN BLOCKS</span>
            </CardItem>
            <CardItem translateZ="60" className="mt-4 w-full max-w-[1000px]">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img7.jpeg"
                height="1000"
                width="1000"
                className="h-70 w-full rounded-3xl object-cover group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </section>
  );
};

export { Feature269 };
