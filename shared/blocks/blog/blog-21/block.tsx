"use client";

import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface DataItem {
  id: string;
  title: string;
  summary: string;
  href: string;
  image: string;
  date: string;
  tag: string;
}

const DATA: DataItem[] = [
  {
    id: "item-1",
    title: "Discover the essential features of our notes app",
    summary:
      "Advanced AI algorithms that understand and process human language, enabling seamless communication between users and machines through text and speech.",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    date: "July 10, 2024",
    tag: "AI",
  },
  {
    id: "item-2",
    title: "Computer Vision Technology, a game changer",
    summary:
      "Powerful image recognition and processing capabilities that allow AI systems to analyze, understand, and interpret visual information from the world.",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    date: "July 11, 2024",
    tag: "Development",
  },
  {
    id: "item-3",
    title: "Machine Learning Automation, the future is now",
    summary:
      "Self-improving algorithms that learn from data patterns to automate complex tasks and make intelligent decisions with minimal human intervention.",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    date: "July 12, 2024",
    tag: "Open Source",
  },
  {
    id: "item-4",
    title: "Predictive Analytics, the key to success",
    summary:
      "Advanced forecasting capabilities that analyze historical data to predict future trends and outcomes, helping businesses make data-driven decisions.",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
    date: "July 13, 2024",
    tag: "Feature",
  },
  {
    id: "item-5",
    title: "Neural Network Architecture, the future is now",
    summary:
      "Sophisticated AI models inspired by human brain structure, capable of solving complex problems through deep learning and pattern recognition.",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
    date: "July 14, 2024",
    tag: "Guide",
  },
];

interface Blog21Props {
  className?: string;
}

const Blog21 = ({ className }: Blog21Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section
      className={cn(
        "bg-linear-to-b from-background to-muted/20 py-24",
        className,
      )}
    >
      <div className="container">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Latest Blog Posts
            </h2>
            <p className="text-muted-foreground">
              Stay updated with our latest articles and insights
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="rounded-full hover:bg-background/80 disabled:opacity-50"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="rounded-full hover:bg-background/80 disabled:opacity-50"
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
      <Carousel
        setApi={setCarouselApi}
        opts={{
          align: "start",
          loop: true,
          breakpoints: {
            "(max-width: 768px)": {
              dragFree: true,
            },
          },
        }}
        className="w-full"
      >
        <CarouselContent className="mr-[calc(theme(container.padding))] 2xl:ml-[calc(50vw-700px+theme(container.padding)-20px)] 2xl:mr-[calc(50vw-700px+theme(container.padding))] gap-6">
          {DATA.map((item) => (
            <CarouselItem
              key={item.id}
              className="px-4 md:basis-1/2 md:pr-0 md:pl-4 lg:basis-1/3"
            >
              <div className="group h-full overflow-hidden rounded-xl border bg-background shadow-sm transition-all hover:shadow-md">
                <a href={item.href} className="flex h-full flex-col">
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                    <Badge className="absolute top-4 right-4 z-10">
                      {item.tag}
                    </Badge>
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="mb-2 line-clamp-2 text-xl font-semibold tracking-tight">
                        {item.title}
                      </h3>
                      <p className="line-clamp-2 text-muted-foreground">
                        {item.summary}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <Badge variant="secondary" className="rounded-full">
                        <Calendar className="mr-1.5 size-3.5" />
                        <span className="text-xs">{item.date}</span>
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full hover:bg-background"
                      >
                        <ArrowRight className="size-4" />
                      </Button>
                    </div>
                  </div>
                </a>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-16 flex items-center justify-center">
        <Button
          variant="outline"
          size="lg"
          className="rounded-full px-8 font-medium hover:bg-primary hover:text-primary-foreground"
        >
          View All Articles
        </Button>
      </div>
    </section>
  );
};

export { Blog21 };
