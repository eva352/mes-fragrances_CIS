"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
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
  username: string;
  quote: string;
  author: string;
  image: string;
  bgColor: string;
}

const DATA: DataItem[] = [
  {
    id: "item-1",
    username: "@techinnovator",
    quote:
      "Their team transformed our vision into a seamless, user-friendly app. The attention to detail and commitment to quality is unmatched!",
    author: "Sarah",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
    bgColor: "bg-green-300",
  },
  {
    id: "item-2",
    username: "@startupfounder",
    quote:
      "From ideation to deployment, they delivered a robust solution that scaled with our business. Truly a partner in our growth journey.",
    author: "James",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
    bgColor: "bg-orange-300",
  },
  {
    id: "item-3",
    username: "@enterpriseleader",
    quote:
      "Their expertise in cloud solutions helped us optimize our operations and reduce costs significantly. Highly recommend their services!",
    author: "Emily",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    bgColor: "bg-purple-300",
  },
  {
    id: "item-4",
    username: "@productmanager",
    quote:
      "The team's ability to understand complex requirements and deliver on time is exceptional. They made the development process stress-free.",
    author: "Michael",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    bgColor: "bg-green-300",
  },
  {
    id: "item-5",
    username: "@cto",
    quote:
      "Their innovative approach to software development has been a game-changer for our organization. We couldn't be happier with the results!",
    author: "Laura",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    bgColor: "bg-orange-300",
  },
];

interface Gallery10Props {
  className?: string;
}

const Gallery10 = ({ className }: Gallery10Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentIndex(carouselApi.selectedScrollSnap());
    };

    updateSelection();
    carouselApi.on("select", updateSelection);

    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  // Calculate the progress bar width and position
  const progressWidth = 240;
  const progressIndicatorWidth = progressWidth / DATA.length;
  const progressOffset = currentIndex * progressIndicatorWidth;

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 px-4 lg:flex-row lg:px-10">
          {/* Left Side: Text Content and Navigation Buttons */}
          <div className="flex flex-col justify-between lg:h-[460px] lg:w-[445px] lg:pr-10">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-semibold lg:text-4xl">
                Building the Future, One Line of Code at a Time
              </h2>
              <p className="text-lg text-muted-foreground">
                From startups to enterprises, we empower businesses with
                cutting-edge software solutions. Hear from our satisfied
                clients.
              </p>
            </div>

            {/* Navigation Buttons Aligned to Bottom */}
            <div className="hidden justify-start gap-4 lg:flex">
              <Button
                size="icon"
                className="rounded-full"
                variant="outline"
                onClick={() => carouselApi?.scrollPrev()}
                disabled={!canScrollPrev}
              >
                <ArrowLeft className="size-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                onClick={() => carouselApi?.scrollNext()}
                disabled={!canScrollNext}
              >
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          {/* Right Side: Carousel */}
          <div className="relative w-full overflow-hidden pb-12 lg:flex-1">
            <Carousel
              setApi={setCarouselApi}
              opts={{
                align: "start",
                dragFree: true,
              }}
            >
              <CarouselContent>
                {DATA.map((testimonial) => (
                  <CarouselItem
                    key={testimonial.id}
                    className="min-w-[800px] flex-1"
                  >
                    <div className="flex gap-2">
                      <div className="h-[460px] w-[400px]">
                        <img
                          src={testimonial.image}
                          alt={testimonial.username}
                          className="aspect-[1] h-full w-full rounded-2xl object-cover"
                        />
                      </div>

                      {/* Quote Section */}
                      <div
                        className={`relative flex h-[460px] w-[400px] flex-col items-start justify-end rounded-2xl p-8 ${testimonial.bgColor}`}
                      >
                        <Badge className="mb-auto bg-background px-4 py-2 text-black">
                          {testimonial.username}
                        </Badge>
                        <span className="-rotate-[4deg] text-7xl leading-none">
                          “
                        </span>
                        <p className="text-xl font-semibold">
                          {testimonial.quote}
                        </p>
                        <p className="mt-4 text-lg font-medium">
                          {testimonial.author}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Progress Indicator */}
            <div className="absolute bottom-4 left-1/2 h-[2px] w-[240px] -translate-x-1/2 rounded bg-gray-200">
              <div
                className="h-[2px] rounded bg-primary transition-transform duration-300 ease-out"
                style={{
                  width: `${progressIndicatorWidth}px`,
                  transform: `translateX(${progressOffset}px)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Gallery10 };
