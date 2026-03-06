"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckSquare,
  Clock,
  Focus,
  Target,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const data = [
  {
    id: "item-1",
    title: "Task Management",
    icon: CheckSquare,
    description:
      "Organize your tasks with our intuitive interface. Create, prioritize, and track your progress with ease. Set deadlines, add labels, and never miss an important deadline again.",
    href: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    id: "item-2",
    title: "Time Tracking",
    icon: Clock,
    description:
      "Monitor how you spend your time with detailed analytics. Identify productivity patterns, eliminate time-wasting activities, and optimize your daily schedule for maximum efficiency.",
    href: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    id: "item-3",
    title: "Team Collaboration",
    icon: Users,
    description:
      "Work seamlessly with your team in real-time. Share tasks, communicate through integrated chat, and keep everyone aligned with shared goals and milestones.",
    href: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    id: "item-4",
    title: "Goal Tracking & Habits",
    icon: Target,
    description:
      "Turn your aspirations into achievable goals with our habit-building system. Track your progress, maintain streaks, and visualize your journey toward lasting behavioral change.",
    href: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
  {
    id: "item-5",
    title: "Focus Sessions",
    icon: Focus,
    description:
      "Boost your concentration with our Pomodoro-inspired focus timer. Block distractions, maintain deep work states, and balance productivity with necessary breaks.",
    href: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
  },
];

interface Gallery5Props {
  className?: string;
}

const Gallery5 = ({ className }: Gallery5Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selection, setSelection] = useState(0);
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    carouselApi.scrollTo(selection);
  }, [carouselApi, selection]);
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setSelection(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);
  return (
    <section className={cn("py-32", className)}>
      <div className="container mb-14 flex flex-col gap-16 lg:mb-16 lg:px-16">
        <div className="lg:max-w-lg">
          <h2 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            Supercharge Your Productivity
          </h2>
          <p className="text-muted-foreground lg:text-lg">
            Our productivity suite helps you accomplish more in less time. From
            task management to habit building, we provide the tools you need to
            optimize your workflow and achieve your goals.
          </p>
        </div>
        <div className="flex shrink-0 gap-2 md:hidden">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              carouselApi?.scrollPrev();
            }}
            disabled={!canScrollPrev}
            className="disabled:pointer-events-auto"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              carouselApi?.scrollNext();
            }}
            disabled={!canScrollNext}
            className="disabled:pointer-events-auto"
          >
            <ArrowRight className="size-5" />
          </Button>
        </div>
        <div className="hidden space-y-4 space-x-4 text-center md:flex md:flex-wrap">
          <ToggleGroup
            type="single"
            variant="outline"
            size="lg"
            className="flex-wrap"
            value={data[selection].id}
            onValueChange={(newValue) => {
              if (newValue) {
                setSelection(data.findIndex((item) => item.id === newValue));
              }
            }}
          >
            {data.map((item) => {
              const Icon = item.icon;
              return (
                <ToggleGroupItem
                  key={item.id}
                  value={item.id}
                  className="flex flex-col items-center p-4 text-center"
                >
                  <Icon className="size-4" />
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-[calc(theme(container.padding)-40px)] mr-[calc(theme(container.padding))] lg:mr-[200px] lg:ml-[calc(200px-40px)] 2xl:mr-[calc(50vw-700px+200px)] 2xl:ml-[calc(50vw-700px+200px-40px)]">
            {data.map((item) => (
              <CarouselItem key={item.id} className="pl-[40px]">
                <a href={item.href} className="group rounded-xl">
                  <div className="flex flex-col overflow-clip rounded-xl border border-border md:col-span-2 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
                    <div className="md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="aspect-16/9 h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="flex flex-col justify-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
                      {(() => {
                        const Icon = item.icon;
                        return <Icon className="mb-4 size-6" />;
                      })()}
                      <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground lg:text-lg">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Gallery5 };
