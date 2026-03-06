"use client";

import {
  ArrowDownToLine,
  ArrowUpDown,
  Code,
  Redo,
  Repeat,
  Scaling,
  Scan,
} from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";

const slides = [
  {
    title: "Integrations",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, quae!",
    icon: <Code className="size-4" />,
  },
  {
    title: "Automation",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, quae!",
    icon: <ArrowUpDown className="size-4" />,
  },
  {
    title: "Customization",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, quae!",
    icon: <Redo className="size-4" />,
  },
  {
    title: "Collaboration",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, quae!",
    icon: <ArrowDownToLine className="size-4" />,
  },
  {
    title: "Security",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, quae!",
    icon: <Repeat className="size-4" />,
  },
  {
    title: "Performance",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, quae!",
    icon: <Scan className="size-4" />,
  },
  {
    title: "Scalability",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, quae!",
    icon: <Scaling className="size-4" />,
  },
];

interface Feature12Props {
  className?: string;
}

const Feature12 = ({ className }: Feature12Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [progress, setProgress] = useState(Math.floor(100 / slides.length));

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("scroll", ({ scrollProgress }) => {
      setProgress(
        Math.max(1 / slides.length, Math.min(1, scrollProgress())) * 100,
      );
    });
  }, [api]);

  return (
    <section className={cn("py-32", className)}>
      <div className="container max-w-7xl">
        <div className="mb-10 flex flex-col items-center gap-6 md:mb-20">
          <Badge variant="outline">Badge</Badge>
          <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">
            This is where your features go
          </h2>
        </div>
        <Carousel className="w-full" setApi={setApi}>
          <div className="mb-4 flex justify-between px-1 md:mb-5">
            <p className="font-medium">Rules</p>
            <div className="flex items-center space-x-2">
              <div className="mr-2 hidden items-center gap-3 text-xs text-muted-foreground md:flex">
                <span>01</span>
                <Progress value={progress} className="h-[2px] w-52" />
                <span>0{slides.length}</span>
              </div>
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </div>
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem
                key={index}
                className="basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col justify-center p-6">
                      <div className="">
                        <span className="mb-5 flex size-8 items-center justify-center rounded-full bg-accent lg:size-10">
                          {slide.icon}
                        </span>
                        <p className="text-xl font-semibold md:text-2xl lg:text-2xl">
                          {slide.title}
                        </p>
                        <p className="pt-2 text-muted-foreground">
                          {slide.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Feature12 };
