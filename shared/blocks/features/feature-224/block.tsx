"use client";
import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Lock,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Workflow,
} from "lucide-react";
import { startTransition, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface feature {
  title: string;
  label: string;
  icon: LucideIcon;
  description: string;
  background: string;
}

const FEATURES: Array<feature> = [
  {
    title: "AI-Driven Analysis of Natural Patterns",
    label: "Patterns Identified",
    icon: Workflow,
    description:
      "Utilize AI to seamlessly identify and analyze natural patterns across various ecosystems, enhancing our understanding of environmental dynamics.",
    background: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jeremy-bishop-iEjCQtcsVPY-unsplash.jpg",
  },
  {
    title: "AI-Powered Security in Natural Environments",
    label: "Security Enhanced",
    icon: Lock,
    description:
      "AI technology ensures the protection of sensitive ecological data, preventing unauthorized access and maintaining the integrity of environmental research.",
    background: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ivan-bandura-hqnUYXsN5oY-unsplash.jpg",
  },
  {
    title: "Enterprise-Grade AI Safeguards for Ecology",
    label: "Safeguards Activated",
    icon: ShieldCheck,
    description:
      "Advanced AI safeguards ensure the accuracy and relevance of ecological data, preventing misinformation and supporting sustainable practices.",
    background: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/sam-wermut-FiUuNWxnb3k-unsplash.jpg",
  },
  {
    title: "AI Interpretation of Natural Communication",
    label: "Structure Analyzed",
    icon: SlidersHorizontal,
    description:
      "AI systems adapt to various natural communication styles, ensuring accurate interpretation and analysis of ecological interactions.",
    background: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ivan-bandura-Kj2tYAl4HZg-unsplash.jpg",
  },
  {
    title: "Multilingual AI for Global Ecology Studies",
    label: "Languages Supported",
    icon: Globe,
    description:
      "AI facilitates global ecological studies through automatic language detection and real-time translation, supporting research in diverse regions.",
    background:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/vasilis-karkalas-LadCWrSL7X8-unsplash.jpg",
  },
];

interface Feature224Props {
  className?: string;
}

const Feature224 = ({ className }: Feature224Props) => {
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

  const goToSlide = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <h2 className="mx-auto max-w-[21.875rem] text-center text-4xl leading-none font-medium md:max-w-[28.125rem] md:text-5xl lg:max-w-[35rem] lg:text-6xl">
            Harness the power of AI in nature
          </h2>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent className="-ml-8 pt-20">
            {FEATURES.map((card, index) => (
              <CarouselItem
                key={index}
                className="pl-8 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card className="border-0 py-0 shadow-none dark:bg-background">
                    <CardContent className="flex flex-col p-0">
                      <div
                        style={{ backgroundImage: `url("${card.background}")` }}
                        className="relative flex aspect-[0.935802469] w-full flex-col items-center justify-between overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat p-7"
                      >
                        <div className="flex size-full flex-1"></div>
                        <div className="h-12 w-full">
                          <div className="mx-auto mb-8 flex w-full max-w-[15rem] items-center gap-4 rounded-full bg-primary px-3 py-2.5 shadow-xl dark:bg-background">
                            <div className="shrink-0">
                              <div className="flex -space-x-2">
                                <div className="flex size-7 rounded-full border border-black bg-background dark:bg-primary">
                                  <Sparkles className="m-auto size-4 dark:text-background" />
                                </div>
                                <div className="flex size-7 rounded-full border border-black bg-background dark:bg-primary">
                                  <card.icon className="m-auto size-4 dark:text-background" />
                                </div>
                              </div>
                            </div>
                            <div className="text-sm font-medium text-white">
                              {card.label}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex w-full flex-col gap-1 pt-6">
                        <h3 className="text-xl font-medium text-foreground">
                          {card.title}
                        </h3>
                        <p className="text-sm">{card.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 hidden items-center justify-center gap-4 md:flex">
            <CarouselPrevious className="static size-12 translate-y-0" />
            <CarouselNext className="static size-12 translate-y-0" />
          </div>
          <div className="mt-6 flex w-full items-center gap-2 md:hidden">
            {Array.from({ length: FEATURES.length }).map((_, i) => (
              <button
                onClick={() => goToSlide(i % FEATURES.length)}
                key={`carousel-btn-${i}`}
                className="h-4 w-full"
              >
                <div
                  className={` ${current == i + 1 ? "bg-primary" : "bg-muted"} my-auto h-1 w-full rounded-full`}
                ></div>
              </button>
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export { Feature224 };
