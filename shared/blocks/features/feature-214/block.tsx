"use client";
import type { LucideIcon } from "lucide-react";
import {
  AudioLines,
  Captions,
  Eye,
  Languages,
  ListMinus,
  ScanFace,
  TextQuote,
} from "lucide-react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

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
    title: "Smart Code Analysis",
    link: "#",
    summary:
      "Advanced AI that analyzes your code in real-time, identifying patterns and potential improvements as you type.",
  },
  {
    video: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-6.mp4",
    Icon: Languages,
    title: "Multi-Language Support",
    link: "#",
    summary:
      "Seamlessly work with multiple programming languages while maintaining consistent code quality and style.",
  },
  {
    video: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-7-640_360_30fps.mp4",
    Icon: AudioLines,
    title: "Intelligent Refactoring",
    link: "#",
    summary:
      "Let AI handle complex refactoring tasks, from method extraction to class restructuring, with perfect accuracy.",
  },
  {
    video: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-5.mp4",
    Icon: ListMinus,
    title: "Code Cleanup",
    link: "#",
    summary:
      "Automatically remove unused imports, dead code, and redundant statements while maintaining functionality.",
  },
  {
    video: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-1.mp4",
    Icon: ScanFace,
    title: "Security Scanner",
    link: "#",
    summary:
      "Advanced vulnerability detection that identifies potential security risks and suggests immediate fixes.",
  },
  {
    video: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-6.mp4",
    Icon: TextQuote,
    title: "Documentation Generator",
    link: "#",
    summary:
      "Transform your code into comprehensive documentation with AI-powered comment generation and formatting.",
  },
  {
    video: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-7-640_360_30fps.mp4",
    Icon: Captions,
    title: "Code Suggestions",
    link: "#",
    summary:
      "Get intelligent code completions and suggestions that adapt to your coding style and project requirements.",
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
      <Card className="min-h-[39.75rem] bg-muted p-8 shadow-none transition-all group-hover:shadow-md">
        <CardContent className="p-0">
          <div className="relative">
            <div className="h-[20rem] w-full overflow-hidden rounded-[0.5rem]">
              <video
                src={video}
                className="block size-full object-cover object-center"
                ref={videoRef}
                controls={false}
                muted={true}
              />
            </div>
            <div className="absolute -top-3 -left-2 flex size-9 rounded-[0.5rem] bg-primary">
              <Icon className="m-auto size-4 stroke-primary-foreground" />
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-2">
            <CardTitle className="text-2xl leading-[130%] font-normal tracking-[-0.48px] text-foreground">
              {title}
            </CardTitle>
            <CardDescription className="text-lg leading-[150%] tracking-[-0.36px]">
              {summary}
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};
interface Feature214Props {
  className?: string;
}

const Feature214 = ({ className }: Feature214Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto mb-16 flex max-w-[47.5rem] flex-col gap-6">
          <h2 className="text-center font-serif text-4xl md:text-5xl xl:text-7xl">
            AI-powered editing in an instant
          </h2>
          <p className="text-center text-xl">
            Refine your appearance, improve your audio, and tackle all the
            obvious, tedious edits—instantly with just a few clicks, thanks to
            your AI editing assistant.
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
                className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <CarouselCard {...item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex w-full justify-end gap-4">
            <CarouselPrevious className="static size-12" />
            <CarouselNext className="static size-12" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export { Feature214 };
