"use client";

import { Infinity as InfinityIcon, Laptop, Zap, ZoomIn } from "lucide-react";

import { cn } from "@/lib/utils";

const items1 = [
  {
    title: "Team Spirit",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    imgSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  },
  {
    title: "Innovation",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    imgSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg",
  },
  {
    title: "Quality",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    imgSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg",
  },
  {
    title: "Integrity",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    imgSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  },
];

const items2 = [
  {
    title: "Support",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat",
    icon: <InfinityIcon className="size-8" />,
  },
  {
    title: "Efficiency",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat",
    icon: <Laptop className="size-8" />,
  },
  {
    title: "Results",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat",
    icon: <Zap className="size-8" />,
  },
  {
    title: "Experience",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat",
    icon: <ZoomIn className="size-8" />,
  },
];

interface Feature137Props {
  className?: string;
}

const Feature137 = ({ className }: Feature137Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="text-4xl font-semibold">Our Values and Principles</h2>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
          {items1.map((item) => (
            <div
              className="overflow-hidden rounded-2xl bg-muted pb-8"
              key={item.title}
            >
              <img
                src={item.imgSrc}
                alt="placeholder"
                className="h-40 w-full object-cover"
              />
              <p className="mt-8 mb-4 px-10 text-2xl font-semibold">
                {item.title}
              </p>
              <p className="px-10 text-base text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          {items2.map((item, index) => (
            <div
              key={item.title}
              className={`flex flex-col items-center justify-between gap-4 rounded-2xl p-8 sm:flex-row sm:gap-10 ${index % 2 !== 0 ? "bg-muted" : ""}`}
            >
              <div className="flex w-full gap-4">
                {item.icon}
                <p className="text-base font-semibold">{item.title}</p>
              </div>
              <p className="w-full text-base text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature137 };
