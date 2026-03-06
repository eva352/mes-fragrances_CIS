"use client";
import {
  AudioLines,
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

interface card {
  video: string;
  Icon: LucideIcon;
  title: string;
  link: string;
  summary: string;
  className?: string;
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
];

const GridCard = ({ video, Icon, title, link, summary }: card) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <a
      href={link}
      className="group block"
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
      <Card className="h-full bg-muted transition-all duration-200 hover:shadow-lg">
        <CardContent className="">
          <div className="relative mb-4">
            <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md">
              <video
                src={video}
                className="block size-full object-cover object-center"
                ref={videoRef}
                controls={false}
                muted={true}
              />
            </AspectRatio>
          </div>
          <div className="flex flex-col gap-2">
            <CardTitle className="flex gap-2 text-lg font-medium text-foreground">
              <Icon className="size-6 rounded-sm bg-primary stroke-primary-foreground p-1" />
              {title}
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              {summary}
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

interface Feature215aProps {
  className?: string;
}

const Feature215a = ({ className }: Feature215aProps) => {
  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-16 flex max-w-[47.5rem] flex-col gap-4 text-center">
          <h2 className="text-3xl font-bold xl:text-5xl">
            Fully Editable Components
          </h2>
          <p className="text-lg text-muted-foreground">
            Built for developers who value quality, performance, and developer
            experience. Every component is crafted with care and tested in
            production.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {List.map((item, index) => (
            <GridCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature215a };
