"use client";

import {
  ArrowRight,
  Blocks,
  Fingerprint,
  LayoutPanelTop,
  MessageCircleMore,
  Users,
} from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface DataBlockProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Feature122Props {
  className?: string;
}

const Feature122 = ({ className }: Feature122Props) => {
  return (
    <section className={cn("container py-40", className)}>
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-3">
        <DataBlock
          title="Communication"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
          icon={
            <MessageCircleMore
              className="size-10 text-primary/90 md:size-12"
              strokeWidth={1.5}
            />
          }
        />
        <DataBlock
          title="Integrations"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
          icon={
            <Blocks
              className="size-10 text-primary/90 md:size-12"
              strokeWidth={1.5}
            />
          }
        />
        <DataBlock
          title="Collaboration"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
          icon={
            <Users
              className="size-10 text-primary/90 md:size-12"
              strokeWidth={1.5}
            />
          }
        />
        <DataBlock
          title="Customization"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
          icon={
            <LayoutPanelTop
              className="size-10 text-primary/90 md:size-12"
              strokeWidth={1.5}
            />
          }
        />
        <DataBlock
          title="Security"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
          icon={
            <Fingerprint
              className="size-10 text-primary/90 md:size-12"
              strokeWidth={1.5}
            />
          }
        />
        <div className="flex w-full grow flex-col gap-6 rounded-lg bg-accent/80 p-6 transition-all hover:bg-accent md:col-span-2 md:col-start-2 md:row-span-2 md:row-start-2 lg:p-10">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <h3 className="max-w-[85%] text-xl font-bold tracking-tight md:max-w-[60%] lg:text-3xl">
              Powerful Features
            </h3>
            <Button className="w-full sm:w-auto" size="lg">
              Get Started
            </Button>
          </div>
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
            alt="placeholder"
            className="aspect-square h-full w-full rounded-lg object-cover md:aspect-[3]"
          />
        </div>
      </div>
    </section>
  );
};

export { Feature122 };

const DataBlock: React.FC<DataBlockProps> = ({ title, description, icon }) => {
  const [isBlockHover, setBlockHover] = useState<boolean>(false);

  return (
    <a
      href="#"
      className="flex w-full cursor-pointer flex-col rounded-lg bg-accent/80 p-6 transition-all hover:bg-accent lg:p-8"
      onMouseOver={() => setBlockHover(true)}
      onMouseOut={() => setBlockHover(false)}
    >
      <h3
        className={`mb-3 w-fit border-b border-solid border-transparent text-lg font-bold tracking-tight transition lg:text-xl ${isBlockHover && "border-primary/80!"}`}
      >
        {title}
      </h3>
      <p className="mb-5 text-sm text-muted-foreground/90 lg:text-base">
        {description}
      </p>
      <div className="mt-auto flex items-end justify-between">
        <div>{icon}</div>
        <ArrowRight
          className={`size-5 h-fit text-primary/80 transition-all ${isBlockHover && "translate-x-1.5 transform"}`}
          strokeWidth={1.5}
        />
      </div>
    </a>
  );
};
