"use client";

import {
  Blocks,
  Infinity as InfinityIcon,
  Laptop,
  ListEnd,
  Zap,
  ZoomIn,
} from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  {
    icon: <ZoomIn className="size-6" />,
    description: "Our UI blocks are designed with quality in mind",
  },
  {
    icon: <Blocks className="size-6" />,
    description: "You can easily customize our UI blocks to fit your needs",
  },
  {
    icon: <Laptop className="size-6" />,
    description:
      "Our UI blocks are fully responsive and look great on any device",
  },
  {
    icon: <ListEnd className="size-6" />,
    description:
      "Our UI blocks are easy to use and require no coding knowledge",
  },
  {
    icon: <Zap className="size-6" />,
    description: "Our UI blocks are optimized for speed and performance",
  },
  {
    icon: <InfinityIcon className="size-6" />,
    description: "Our UI blocks are designed with modern trends in mind",
  },
];

interface Feature128Props {
  className?: string;
}

const Feature128 = ({ className }: Feature128Props) => {
  return (
    <section className={cn("container py-32", className)}>
      <div className="m-auto rounded-3xl bg-muted px-8 pt-14 pb-8 text-center md:px-16 md:pt-24 md:pb-16">
        <h2 className="mx-auto mb-4 max-w-96 text-3xl font-normal md:max-w-xl md:text-5xl">
          Build your own website with our{" "}
          <span className="italic">UI blocks</span>
        </h2>
        <p className="mx-auto max-w-xl text-sm font-normal">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt,
          accusantium quam. Temporibus quae quos deserunt!
        </p>
        <div className="mt-16 grid w-full grid-cols-2 gap-px bg-muted-foreground md:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex w-full flex-col items-center justify-center gap-6 bg-muted px-3 py-4 md:gap-8 md:px-6 md:py-8"
            >
              <div className="flex size-12 items-center justify-center rounded-xl border border-primary/10 bg-background drop-shadow-lg">
                {item.icon}
              </div>
              <p className="">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature128 };
