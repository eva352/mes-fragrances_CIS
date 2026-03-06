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
import { Button } from "@/components/ui/button";

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
];

const HorizontalCard = ({ video, Icon, title, link, summary }: card) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <div
      className="group flex flex-col gap-6 border-b border-border py-8 last:border-b-0 md:flex-row md:items-center"
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
      <div className="md:w-1/3">
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
          <video
            src={video}
            className="block size-full object-cover object-center"
            ref={videoRef}
            controls={false}
            muted={true}
          />
        </AspectRatio>
      </div>

      <div className="flex flex-1 flex-col gap-4 md:pl-6">
        <div className="flex items-center gap-3">
          <div className="flex size-8 rounded-md bg-primary">
            <Icon className="m-auto size-4 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>

        <p className="leading-relaxed text-muted-foreground">{summary}</p>

        <div>
          <Button variant="outline" size="sm" asChild>
            <a href={link}>Learn more</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

interface Feature215bProps {
  className?: string;
}

const Feature215b = ({ className }: Feature215bProps) => {
  return (
    <section className={cn("py-20", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold xl:text-5xl">
            Fully Editable Components
          </h2>
          <p className="text-lg text-muted-foreground">
            A complete toolkit for modern web development. Clean, performant,
            and ready to use.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          {List.map((item, index) => (
            <HorizontalCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature215b };
