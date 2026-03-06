"use client";
import {
  AudioLines,
  Captions,
  Eye,
  Languages,
  ListMinus,
  LucideIcon,
  ScanFace,
  TextQuote,
} from "lucide-react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface card {
  video: string;
  Icon: LucideIcon;
  title: string;
  link: string;
  summary: string;
}

const List: Array<card> = [
  {
    video: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-1.mp4",
    Icon: Eye,
    title: "Visual Design System",
    link: "#",
    summary:
      "Consistent, beautiful components built with a cohesive design language that scales across your entire application.",
  },
  {
    video: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-2.mp4",
    Icon: Languages,
    title: "Framework Agnostic",
    link: "#",
    summary:
      "Use with React, Vue, Angular, or vanilla JavaScript. One library that works everywhere you need it.",
  },
  {
    video: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-3.mp4",
    Icon: AudioLines,
    title: "Interactive Components",
    link: "#",
    summary:
      "Rich interactions and smooth animations built-in. From subtle hover effects to complex state transitions.",
  },
  {
    video: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-4.mp4",
    Icon: ListMinus,
    title: "Minimal Setup",
    link: "#",
    summary:
      "Get started in minutes with zero configuration. Clean, semantic code that doesn't bloat your bundle size.",
  },
  {
    video: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-5.mp4",
    Icon: ScanFace,
    title: "Accessibility First",
    link: "#",
    summary:
      "WCAG compliant components with full keyboard navigation, screen reader support, and focus management.",
  },
  {
    video: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-6.mp4",
    Icon: TextQuote,
    title: "Complete Documentation",
    link: "#",
    summary:
      "Comprehensive guides, live examples, and API references. Everything you need to build with confidence.",
  },
  {
    video: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-6.mp4",
    Icon: Captions,
    title: "TypeScript Native",
    link: "#",
    summary:
      "Built with TypeScript from the ground up. Full type safety, autocomplete, and IntelliSense support.",
  },
];

const CarouselCard = ({ video, Icon, title, link, summary }: card) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  return (
    <a
      href={link}
      className="group block h-full"
      onMouseEnter={() => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      }}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      <Card className="h-full min-h-[24rem] bg-muted p-8 shadow-none transition-all group-hover:shadow-md">
        <CardContent className="p-0">
          <div className="relative">
            <AspectRatio
              ratio={16 / 9}
              className="overflow-hidden rounded-[0.5rem]"
            >
              <video
                src={video}
                className="block size-full object-cover object-center"
                ref={videoRef}
                controls={false}
                muted={true}
              />
            </AspectRatio>
            <div className="absolute -top-3 -left-2 flex size-9 rounded-[0.5rem] bg-primary">
              <Icon className="m-auto size-4 stroke-primary-foreground" />
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-2">
            <CardTitle className="text-xl leading-[130%] font-normal tracking-[-0.48px] text-foreground">
              {title}
            </CardTitle>
            <CardDescription className="text-sm leading-[150%] tracking-[-0.36px]">
              {summary}
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};
interface Feature215Props {
  className?: string;
}

const Feature215 = ({ className }: Feature215Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto mb-16 flex max-w-[47.5rem] flex-col gap-6">
          <h2 className="text-center text-4xl font-semibold xl:text-6xl">
            Fully Editable Components
          </h2>
          <p className="text-center text-xl text-muted-foreground">
            A comprehensive component library designed for modern web
            development. Ship beautiful, accessible interfaces in record time
            with our battle-tested components.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="py-4">
            {List.map((item, index) => (
              <CarouselItem
                key={index}
                className="basis-full md:basis-1/2 lg:basis-1/3"
              >
                <CarouselCard {...item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex w-full justify-center gap-4">
            <CarouselPrevious className="static size-12" />
            <CarouselNext className="static size-12" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export { Feature215 };
