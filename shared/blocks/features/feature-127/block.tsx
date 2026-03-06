"use client";

import {
  Blocks,
  ChevronRight,
  Infinity as InfinityIcon,
  Laptop,
  ListEnd,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const itemsData = [
  {
    title: "Integrations",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi laboriosam voluptatibus temporibus doloremque laudantium.",
    icon: <Blocks className="size-6" />,
    imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    title: "Apps",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi laboriosam voluptatibus temporibus doloremque laudantium.",
    icon: <Laptop className="size-6" />,
    imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    title: "Plugins",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi laboriosam voluptatibus temporibus doloremque laudantium.",
    icon: <ListEnd className="size-6" />,
    imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    title: "Extensions",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi laboriosam voluptatibus temporibus doloremque laudantium.",
    icon: <InfinityIcon className="size-6" />,
    imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
];

const gridItems = [
  {
    id: 1,
    row: 3,
    col: 3,
    imgSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
  },
  {
    id: 2,
    row: 4,
    col: 4,
    imgSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg",
  },
  {
    id: 3,
    row: 4,
    col: 7,
    imgSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg",
  },
];

interface Feature127Props {
  className?: string;
}

const Feature127 = ({ className }: Feature127Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container max-w-[1200px]">
        <div className="flex gap-6">
          <div className="w-full">
            <span className="text-base text-muted-foreground">
              Build with blocks
            </span>
            <h2 className="my-4 text-3xl font-medium">
              What you can do with our utilities
            </h2>

            <p className="text-lg text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              qui dignissimos odit.
            </p>
          </div>

          <div className="relative hidden w-full lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-transparent to-background"></div>

            <div className="grid w-full grid-cols-8 grid-rows-4 gap-2">
              {Array.from({ length: 32 - gridItems.length }).map((_, index) => (
                <div
                  key={index}
                  className="flex w-full rounded-md bg-muted p-3"
                />
              ))}
              {gridItems.map((item) => (
                <div
                  key={item.id}
                  className={`col-start-${item.col} rounded-md row-start-${item.row} bg-muted p-3`}
                >
                  <img
                    src={item.imgSrc}
                    alt="placeholder"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2">
          {itemsData.map((item) => (
            <div key={item.title} className="rounded-lg border p-12 pb-0">
              <div className="mb-8 flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-lg bg-muted">
                  {item.icon}
                </div>
                <Button variant="outline" className="size-10 p-0">
                  <ChevronRight className="size-4" />
                </Button>
              </div>

              <h4 className="mb-4 text-xl font-medium">{item.title}</h4>
              <p className="font-base mb-8 text-muted-foreground">
                {item.description}
              </p>
              <div className="relative m-auto mt-4 w-full overflow-hidden">
                <div className="absolute right-0 bottom-0 left-0 z-2 h-[100px] bg-[linear-gradient(to_top,white_0%,rgba(255,255,255,0)_100%)]"></div>
                <img
                  src={item.imageSrc}
                  alt="placeholder"
                  className="max-h-[270px] w-full rounded-md object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature127 };
