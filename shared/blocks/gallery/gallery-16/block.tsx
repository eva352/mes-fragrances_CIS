"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const items = [
  {
    title: (
      <>
        <span className="bg-gradient-to-b from-foreground/20 to-muted-foreground bg-clip-text text-transparent">
          Explore Our
        </span>
        <br />
        Core Features
      </>
    ),
    description: (
      <>
        Dive deep into the robust functionalities designed to streamline your
        workflow. Benefit from intuitive design, seamless integration, and
        powerful customization options.
        <br />
        <br />
        Explore how our platform adapts to your evolving needs, ensuring
        long-term value and efficiency.
      </>
    ),
    note: "Comprehensive documentation and dedicated support channels are available to assist you.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    category: "Features",
  },
  {
    title: (
      <>
        <span className="bg-gradient-to-b from-foreground/20 to-muted-foreground bg-clip-text text-transparent">
          Solutions for
        </span>
        <br />
        Every Scenario
      </>
    ),
    description: (
      <>
        <p>
          Discover how our platform addresses diverse challenges across various
          domains:
        </p>
        <ul className="my-4 ml-6 list-disc">
          <li>Enhancing team collaboration efficiency.</li>
          <li>Optimizing critical resource allocation.</li>
          <li>Streamlining complex data analysis.</li>
        </ul>
        <p>We provide adaptable tools for your unique context.</p>
      </>
    ),
    note: "Leverage our expertise in integration and custom development for specific needs.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    category: "Solutions",
  },
  {
    title: (
      <>
        <span className="bg-gradient-to-b from-foreground/20 to-muted-foreground bg-clip-text text-transparent">
          Building the
        </span>
        <br />
        Future Together
      </>
    ),
    description: (
      <>
        <p>
          Get a glimpse into our ongoing commitment to innovation and
          improvement:
        </p>
        <ul className="my-4 ml-6 list-disc">
          <li>Next-generation user interface design.</li>
          <li>Advanced analytics capabilities rollout.</li>
          <li>Expanded third-party integration ecosystem.</li>
        </ul>
        <p>
          We're constantly evolving based on user feedback and industry trends.
        </p>
      </>
    ),
    note: "Our dedicated R&D team is focused on delivering cutting-edge solutions.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    category: "Roadmap",
  },
];

interface Gallery16Props {
  className?: string;
}

const Gallery16 = ({ className }: Gallery16Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(items[0].category);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
  });

  useEffect(() => {
    const currentIndex = items.findIndex((item) => item.category === current);
    const activeTab = tabRefs.current[currentIndex];

    if (activeTab) {
      const { offsetWidth, offsetLeft } = activeTab;
      setIndicatorStyle({
        width: offsetWidth,
        left: offsetLeft,
      });
    }
  }, [current]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const currentIndex = items.findIndex((item) => item.category === current);
    api.scrollTo(currentIndex);

    const onSelect = () => {
      const idx = api.selectedScrollSnap();
      setCurrent(items[idx].category);
    };
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, current]);

  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container">
        <Carousel
          setApi={setApi}
          className="[&>div[data-slot=carousel-content]]:overflow-visible"
        >
          <div className="flex items-center justify-between">
            <Tabs
              value={current}
              onValueChange={setCurrent}
              className="mb-8 flex justify-center"
            >
              <TabsList className="relative h-auto gap-6 bg-background">
                {items.map((item, idx) => (
                  <TabsTrigger
                    key={idx}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    value={item.category}
                    className="text-base transition-all duration-700 ease-out [&[data-state=active]]:shadow-none"
                  >
                    {item.category}
                  </TabsTrigger>
                ))}
                <div
                  className="absolute bottom-0 h-0.5 bg-primary transition-all duration-700 ease-out"
                  style={{
                    width: `${indicatorStyle.width}px`,
                    left: `${indicatorStyle.left}px`,
                  }}
                />
              </TabsList>
            </Tabs>
            <div className="hidden items-center gap-4 sm:flex">
              <CarouselPrevious className="static size-10 translate-0" />
              <CarouselNext className="static size-10 translate-0" />
            </div>
          </div>
          <CarouselContent className="max-w-4xl">
            {items.map((item, idx) => (
              <CarouselItem key={idx} className="w-fit max-w-4xl">
                <div className="grid h-full max-w-4xl gap-10 rounded-xl border border-border p-6 shadow-sm select-none sm:p-10 md:max-h-[450px] md:grid-cols-2 lg:gap-20">
                  <div className="flex flex-col justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-medium sm:text-4xl">
                        {item.title}
                      </h2>
                      <div className="mt-4 text-sm text-muted-foreground sm:mt-6">
                        {item.description}
                      </div>
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground sm:mt-6">
                      {item.note}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border p-2">
                    <img
                      src={item.image}
                      alt="placeholder"
                      className="h-full w-full rounded-xl object-cover"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Gallery16 };
