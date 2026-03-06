"use client";

import {
  DollarSign,
  MessagesSquare,
  PersonStanding,
  Timer,
  Zap,
  ZoomIn,
} from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

interface IFeatures {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: IFeatures[] = [
  {
    title: "Performance",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!",
    icon: <Timer className="size-8 invert md:size-10" />,
  },
  {
    title: "Innovation",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!",
    icon: <Zap className="size-8 invert md:size-10" />,
  },
  {
    title: "Quality",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!",
    icon: <ZoomIn className="size-8 invert md:size-10" />,
  },
  {
    title: "Accessibility",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!",
    icon: <PersonStanding className="size-8 invert md:size-10" />,
  },
  {
    title: "Affordability",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!",
    icon: <DollarSign className="size-8 invert md:size-10" />,
  },
  {
    title: "Customer Support",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!",
    icon: <MessagesSquare className="size-8 invert md:size-10" />,
  },
];

interface Feature121Props {
  className?: string;
}

const Feature121 = ({ className }: Feature121Props) => {
  return (
    <section className={cn("relative container py-32", className)}>
      <div className="m-auto grid w-full gap-px overflow-hidden rounded-md bg-border sm:max-w-[600px] sm:grid-cols-2">
        {features.map((feature) => (
          <Block
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
    </section>
  );
};

export { Feature121 };

const Block: React.FC<IFeatures> = ({ title, description, icon }) => {
  const [isBlockHover, setBlockHover] = useState<boolean>(false);
  const [isBlockClick, setBlockClick] = useState<boolean>(false);
  return (
    <section
      className="relative aspect-square h-auto cursor-pointer overflow-hidden bg-accent px-6 py-3.5 transition duration-300 hover:bg-[#e9e9e9] sm:aspect-auto sm:h-[300px]"
      onMouseOver={() => setBlockHover(true)}
      onMouseOut={() => setBlockHover(false)}
      onClick={() => setBlockClick((prev) => !prev)}
    >
      <p className="mr-auto text-lg text-balance uppercase">{title}</p>

      <div
        className={`absolute top-0 right-0 bottom-0 left-0 m-auto flex size-36 min-h-36 min-w-36 shrink-0 items-center justify-center rounded-full bg-primary transition duration-300 sm:h-28 sm:min-h-28 sm:w-28 sm:min-w-28 ${isBlockHover && "scale-110 shadow-xl"} ${isBlockClick ? "-translate-y-40 transform opacity-0" : ""} md:size-12`}
      >
        {icon}
      </div>

      <p
        className={`absolute top-0 right-0 bottom-0 left-0 m-auto h-fit translate-y-40 transform px-6 py-3.5 opacity-0 transition duration-300 ${isBlockClick ? "translate-y-0! opacity-100!" : ""} `}
      >
        {description}
      </p>
    </section>
  );
};
