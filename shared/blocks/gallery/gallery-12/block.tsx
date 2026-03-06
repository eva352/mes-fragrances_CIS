"use client";

import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

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
  description: string;
  href: string;
  image: string;
}

const DATA: DataItem[] = [
  {
    id: "feature-1",
    title: "Smart AI Assistant",
    description:
      "Powered by advanced language models to handle complex queries, automate tasks, and provide intelligent responses with high accuracy.",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg",
  },
  {
    id: "feature-2",
    title: "Data Analytics",
    description:
      "Transform raw data into actionable insights using machine learning algorithms and predictive analytics for informed decision-making.",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
  },
  {
    id: "feature-3",
    title: "Process Automation",
    description:
      "Streamline workflows and automate repetitive tasks with intelligent process automation, increasing efficiency and reducing errors.",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-3.svg",
  },
  {
    id: "feature-4",
    title: "Knowledge Base",
    description:
      "Access and manage comprehensive information with our AI-powered knowledge base that learns and improves from each interaction.",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-4.svg",
  },
  {
    id: "feature-5",
    title: "API Integration",
    description:
      "Seamlessly integrate with existing systems through our robust API framework, enabling smooth data exchange and functionality extension.",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-5.svg",
  },
  {
    id: "feature-6",
    title: "Security & Compliance",
    description:
      "Ensure data security and compliance with industry standards through our comprehensive security measures and protocols.",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-6.svg",
  },
  {
    id: "feature-7",
    title: "Customizable Dashboards",
    description:
      "Create and customize dashboards to visualize key metrics and performance indicators, providing real-time insights at a glance.",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-4.svg",
  },
  {
    id: "feature-8",
    title: "Collaboration Tools",
    description:
      "Enhance team collaboration with integrated tools for communication, project management, and file sharing.",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
  },
];

interface Gallery12Props {
  className?: string;
}

const Gallery12 = ({ className }: Gallery12Props) => {
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
    <section className={cn("py-32", className)}>
      <div className="container">
        {/* Subtitle and Description */}
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
            Our features
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis
            sit phasellus mollis sit aliquam sit.
          </p>
        </div>

        {/* Carousel */}
        <div className="w-full">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: "start",
              breakpoints: {
                "(max-width: 768px)": {
                  active: true,
                  dragFree: true,
                },
                "(min-width: 768px)": {
                  active: true,
                },
                "(min-width: 1024px)": {
                  active: true,
                },
              },
            }}
          >
            <CarouselContent className="-ml-4">
              {DATA.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-4 sm:basis-1/2 md:basis-1/3 xl:basis-1/4"
                >
                  <div className="group flex h-full flex-col justify-between rounded-xl border bg-muted">
                    {/* Image Section */}
                    <div className="flex aspect-square items-center justify-center overflow-clip rounded-t-xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-48 w-48 object-cover object-center md:h-36 md:w-36"
                      />
                    </div>

                    {/* Text Section */}
                    <div className="flex h-full flex-col justify-between px-8">
                      <div className="my-8">
                        <div className="mb-2 line-clamp-3 text-lg font-medium break-words md:text-xl lg:text-2xl">
                          {item.title}
                        </div>
                        <div className="line-clamp-2 text-sm text-muted-foreground md:text-base">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Buttons and Navigation */}
        <div className="mt-8 flex flex-row items-center justify-between gap-4 md:flex-row">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              carouselApi?.scrollPrev();
            }}
            disabled={!canScrollPrev}
            className="rounded-full disabled:pointer-events-auto md:ml-12"
          >
            <ArrowLeft className="size-4" />
          </Button>

          <div className="flex flex-col items-center gap-4 md:flex-row">
            <Button size="lg" className="font-bold shadow-lg">
              <Sparkles /> Download Now
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              carouselApi?.scrollNext();
            }}
            disabled={!canScrollNext}
            className="rounded-full disabled:pointer-events-auto md:mr-12"
          >
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Gallery12 };
