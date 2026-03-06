"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export type ChangelogEntry = {
  version: string;
  date: string;
  title: string;
  description: string;
  items?: string[];
  image?: string;
};

export interface Changelog8Props {
  className?: string;
  title?: string;
  description?: string;
  entries?: ChangelogEntry[];
}

const Changelog8 = ({
  title = "Changelog",
  description = "Get the latest updates and improvements to our platform.",
  entries = defaultChangelogData,
  className,
}: Changelog8Props) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, entries.length);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Adding offset to improve usability

      // Find the section that is currently in view
      const currentSectionIndex = sectionRefs.current.findIndex(
        (ref, index) => {
          if (!ref) return false;

          const nextRef = sectionRefs.current[index + 1];
          const refTop = ref.offsetTop;
          const refBottom = nextRef
            ? nextRef.offsetTop
            : document.body.scrollHeight;

          return scrollPosition >= refTop && scrollPosition < refBottom;
        },
      );

      if (currentSectionIndex !== -1) {
        setActiveId(currentSectionIndex);
      } else if (scrollPosition < (sectionRefs.current[0]?.offsetTop || 0)) {
        setActiveId(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [entries.length]);

  const scrollToSection = (index: number) => {
    const sectionRef = sectionRefs.current[index];
    if (sectionRef) {
      window.scrollTo({
        top: sectionRef.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  // Correct way to set refs for linter
  const setRef = (index: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[index] = el;
  };

  return (
    <section className={cn("bg-background py-24 md:py-32", className)}>
      <div className="relative container flex flex-col lg:flex-row">
        {/* Header for mobile */}
        <div className="mb-12 lg:hidden">
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h1>
          <p className="text-base text-muted-foreground md:text-lg">
            {description}
          </p>
          <Separator className="mt-8" />
        </div>

        {/* Scrollspy sidebar */}
        <div className="sticky top-24 hidden h-fit w-72 overflow-visible pr-10 lg:block">
          <div className="mb-10">
            <h1 className="mb-3 text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-base text-muted-foreground">{description}</p>
          </div>
          <Separator className="mb-6" />
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="pb-6">
              <h3 className="mb-5 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                On this page
              </h3>
              <nav className="flex flex-col space-y-2.5">
                {entries.map((entry, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(index)}
                    className={cn(
                      "group flex flex-col gap-2 rounded-md border border-transparent px-3 py-2 text-left transition-all hover:border-border hover:bg-accent",
                      activeId === index
                        ? "border-border bg-accent font-medium text-foreground shadow-sm"
                        : "text-muted-foreground",
                    )}
                  >
                    <span className="text-sm">{entry.title}</span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium">{entry.version}</span>
                      <span>•</span>
                      <span>{entry.date}</span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </ScrollArea>
        </div>

        {/* Main content */}
        <div className="flex-1 lg:pl-10">
          <div className="mb-10 hidden lg:block">
            <h2 className="text-xl font-semibold">Latest updates</h2>
          </div>
          <div className="space-y-16 md:space-y-24">
            {entries.map((entry, index) => (
              <div
                key={index}
                ref={setRef(index)}
                className="relative flex flex-col gap-6 border-l-4 border-l-border/30 pl-6 transition-colors hover:border-l-border md:gap-8"
                id={`entry-${index}`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 text-xs font-medium"
                  >
                    {entry.version}
                  </Badge>
                  <span className="text-xs font-medium text-muted-foreground">
                    {entry.date}
                  </span>
                </div>
                <div>
                  <h2 className="mb-4 text-xl leading-tight font-bold text-foreground md:text-2xl">
                    {entry.title}
                  </h2>
                  <p className="mb-6 text-base text-muted-foreground md:text-base">
                    {entry.description}
                  </p>
                  {entry.items && entry.items.length > 0 && (
                    <div className="mt-6 rounded-lg border bg-muted/30 p-5">
                      <h3 className="mb-3 text-sm font-medium">
                        What's included:
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {entry.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <span className="mt-1 mr-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {entry.image && (
                    <div className="mt-8 overflow-hidden rounded-xl border">
                      <img
                        src={entry.image}
                        alt={`${entry.version} visual`}
                        className="w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Changelog8 };

export const defaultChangelogData: ChangelogEntry[] = [
  {
    version: "Version 1.3.0",
    date: "15 November 2024",
    title: "Enhanced Analytics Dashboard",
    description:
      "We've completely redesigned our analytics dashboard to provide deeper insights and improved visualizations of your data.",
    items: [
      "Interactive data visualizations with real-time updates",
      "Customizable dashboard widgets",
      "Export analytics in multiple formats (CSV, PDF, Excel)",
      "New reporting templates for common use cases",
      "Improved data filtering and segmentation options",
    ],
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-aspect-video-1.svg",
  },
  {
    version: "Version 1.2.5",
    date: "7 October 2024",
    title: "Mobile App Launch",
    description:
      "We're excited to announce the launch of our mobile application, available now on iOS and Android platforms.",
    items: [
      "Native mobile experience for on-the-go productivity",
      "Offline mode support for working without internet connection",
      "Push notifications for important updates",
      "Biometric authentication for enhanced security",
    ],
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-aspect-video-1.svg",
  },
];
