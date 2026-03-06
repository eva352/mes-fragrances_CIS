"use client";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const items = [
  {
    title: "Built for artists and designers",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima doloribus illum, labore quis facilis molestias!",
    imgSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  },
  {
    title: "Built for coders and developers",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima doloribus illum, labore quis facilis molestias!",
    imgSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg",
  },
  {
    title: "Build your own website with our UI blocks",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima doloribus illum, labore quis facilis molestias!",
    imgSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg",
  },
];

interface Feature140Props {
  className?: string;
}

const Feature140 = ({ className }: Feature140Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <Carousel className="relative w-full">
          <CarouselContent className="ease-in">
            {items.map((item) => (
              <CarouselItem key={item.title}>
                <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-muted py-20 pl-8 md:flex-row md:pl-16">
                  <div className="w-full pr-2 md:max-w-xs md:pr-0">
                    <h2 className="mb-6 text-xl font-medium sm:text-2xl md:text-5xl">
                      {item.title}
                    </h2>
                    <p className="text-sm text-muted-foreground md:text-base">
                      {item.description}
                    </p>
                  </div>
                  <div className="w-full max-w-2xl">
                    <img
                      src={item.imgSrc}
                      alt="placeholder"
                      className="h-80 max-h-[560px] w-full rounded-l-2xl object-cover md:h-full"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-16 left-16 md:bottom-11">
            <CarouselPrevious className="size-14" />
          </div>
          <div className="absolute right-16 bottom-16 md:bottom-11">
            <CarouselNext className="size-14" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export { Feature140 };
