"use client";

import { startTransition, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const carouselItems = [
  {
    image:
      "https://images.unsplash.com/photo-1589100787575-fad1dcaa9d17?q=80&w=1953&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Responsive",
    description:
      "Our templates are built with a mobile-first approach, ensuring your website looks stunning on all devices and screen sizes.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1698516923130-8845104b6224?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Clean Code",
    description:
      "Each template is crafted with clean, well-structured code following best practices to make customization and maintenance simple.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1647517649508-855580038bfd?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Copy & Paste",
    description:
      "Our templates are designed for easy copy and paste functionality, allowing you to quickly implement components and features into your projects.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1586869871566-d8e41dd50318?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Easy Updates",
    description:
      "Regular updates and maintenance ensure your template stays current with the latest web standards and security practices.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1588065394015-68bf7e40738d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Modern Stack",
    description:
      "Built with the latest technologies including React, Tailwind CSS and shadcn/ui for a modern development experience.",
  },
];

interface Gallery14Props {
  className?: string;
}

const Gallery14 = ({ className }: Gallery14Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    startTransition(() => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    api.on("select", () => {
      startTransition(() => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    });
  }, [api]);

  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container">
        <Carousel setApi={setApi}>
          <div className="grid gap-8 md:gap-4 lg:grid-cols-2 [&>div[data-slot=carousel-content]]:overflow-visible [&>div[data-slot=carousel-content]]:[clip-path:inset(-100vw_-100vw_-100vw_0)]">
            <div>
              <h2 className="text-4xl font-semibold md:text-6xl">
                Code less. <br />{" "}
                <span className="text-primary/40">Build faster.</span>
              </h2>
              <p className="mt-8 text-xl text-primary">
                Start with our templates, customize to your needs.
              </p>
              <div className="mt-8 hidden items-center gap-4 md:flex">
                <CarouselPrevious className="static size-12 translate-x-0 translate-y-0" />
                <CarouselNext className="static size-12 translate-x-0 translate-y-0" />
              </div>
            </div>

            <CarouselContent className="max-w-[400px] select-none">
              {carouselItems.map((item, idx) => (
                <CarouselItem className="w-fit" key={idx}>
                  <div className="relative aspect-4/5 max-h-[500px] rounded-2xl">
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-primary to-transparent to-40% dark:from-background" />
                    <img
                      src={item.image}
                      alt={item.title}
                      className="size-full rounded-2xl bg-cover"
                    />
                    <div className="absolute inset-0 p-8">
                      <p className="text-sm font-semibold text-background/50 dark:text-foreground/50">
                        <span className="mr-1 text-background dark:text-foreground">
                          {item.title}.
                        </span>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </Carousel>
        <div className="mt-8 flex items-center lg:ml-[50%]">
          {Array.from({ length: carouselItems.length }).map((_, index) => (
            <span
              key={index}
              className={cn(
                "flex h-8 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-muted-foreground/15 text-xs font-semibold whitespace-nowrap transition-all duration-300",
                index + 1 === current ? "w-32" : "m-4 size-4",
              )}
              onClick={() => api && api.scrollTo(index)}
            >
              <span
                className={cn(
                  "inline-block transition-all duration-300",
                  index + 1 === current
                    ? "translate-x-0 opacity-100"
                    : "translate-x-6 opacity-0",
                )}
              >
                {carouselItems[index].title}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery14 };
