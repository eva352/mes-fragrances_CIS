import { ArrowRight, Check } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/aceternity/3d-card";
import { Button } from "@/components/ui/button";

interface Feature268Props {
  className?: string;
}

const Feature268 = ({ className }: Feature268Props) => {
  const features = [
    {
      title: "Instant Implementation",
      description: "Get access to your blocks the moment you pay.",
    },
    {
      title: "One-Time Payment",
      description: "No subscriptions. Just pay once and own it forever.",
    },
    {
      title: "Developer Friendly",
      description:
        "Clean, copy-paste-ready code with full Tailwind + shadcn support.",
    },
    {
      title: "Fully Responsive",
      description:
        "Every block looks perfect on all screen sizes, out of the box.",
    },
    {
      title: "Production Ready",
      description:
        "Battle-tested components you can drop into real projects today.",
    },
  ];

  return (
    <section className={cn("h-full w-screen overflow-hidden py-32", className)}>
      <div className="relative container flex h-full flex-col items-start justify-between gap-10 lg:flex-row">
        <div className="w-full space-y-5 lg:w-3/5">
          <h1 className="mt-3 w-full max-w-2xl text-5xl font-medium font-semibold tracking-tighter lg:text-6xl">
            Drop-In Ready Blocks to Supercharge Your App
          </h1>
          <p className="max-w-xl text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad
          </p>
          <div className="mt-10 mb-29 flex gap-2">
            <Button className="rounded-full">Get Started</Button>
            <Button variant="secondary" className="rounded-full">
              Learn More
            </Button>
          </div>
          <ul className="space-y-4">
            <li className="mb-3">
              <p className="font-semibold tracking-tight opacity-50">
                ShadcnBlocks Perks
              </p>
            </li>
            {features.map((feature) => (
              <li key={feature.title} className="flex gap-4 lg:items-center">
                <Check className="size-4" />
                <p className="font-medium tracking-tight">
                  {feature.title}
                  <span className="pl-2 opacity-30">{feature.description}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <CardContainer
          className="w-full"
          containerClassName="h-full   w-full p-0 m-0 lg:w-2/5"
        >
          <CardBody className="group/card flex h-full !w-full flex-col items-center justify-center rounded-3xl bg-muted/70 px-5 py-15">
            <CardItem
              translateZ="60"
              className="mb-2 max-w-xs text-center text-3xl leading-none font-semibold tracking-tight"
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
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img27.jpeg"
                height="1000"
                width="1000"
                className="h-82 w-full rounded-3xl object-cover group-hover/card:shadow-xl lg:h-60"
                alt="thumbnail"
              />
            </CardItem>

            <div className="flex w-full flex-col items-center justify-center">
              <CardItem translateZ="100">
                <Button
                  variant="ghost"
                  className="my-5 tracking-tight opacity-50"
                >
                  Try now <ArrowRight />
                </Button>
              </CardItem>
              <img
                className="w-30"
                src="
                /images/block/logos/ph-daily.svg"
                alt=""
              />
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </section>
  );
};

export { Feature268 };
