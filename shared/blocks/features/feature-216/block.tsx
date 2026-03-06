"use client";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Circle,
  ClipboardList,
  LucideIcon,
  MessageSquare,
  Rocket,
  Share2,
  Users,
} from "lucide-react";
import { startTransition, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TAB_TRIGGERS = [
  {
    name: "Team Sync",
    icon: Users,
    value: "team_sync",
    color: "#2563EB",
  },
  {
    name: "Discussions",
    icon: MessageSquare,
    value: "discussions",
    color: "#F97316",
  },
  {
    name: "Knowledge Share",
    icon: Share2,
    value: "knowledge_share",
    color: "#A855F7",
  },
  {
    name: "Brainstorming",
    icon: Brain,
    value: "brainstorming",
    color: "#10B981",
  },
  {
    name: "Task Tracking",
    icon: ClipboardList,
    value: "task_tracking",
    color: "#EF4444",
  },
  {
    name: "Launch Prep",
    icon: Rocket,
    value: "launch_prep",
    color: "#EAB308",
  },
];

const TABS = [
  {
    value: TAB_TRIGGERS[0].value,
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/redd-f-5U_28ojjgms-unsplash.jpg",
      alt: "",
    },
    summary: "Stay aligned with regular team standups and updates.",
    link: "#",
  },
  {
    value: TAB_TRIGGERS[1].value,
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/annie-spratt-hCb3lIB8L8E-unsplash.jpg",
      alt: "",
    },
    summary: "Collaborate through chats, threads, and decision logs.",
    link: "#",
  },
  {
    value: TAB_TRIGGERS[2].value,
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/annie-spratt-MChSQHxGZrQ-unsplash.jpg",
      alt: "",
    },
    summary: "Exchange insights, tips, and documentation openly.",
    link: "#",
  },
  {
    value: TAB_TRIGGERS[3].value,
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/dylan-gillis-KdeqA3aTnBY-unsplash.jpg",
      alt: "",
    },
    summary: "Generate new ideas and solve problems together.",
    link: "#",
  },
  {
    value: TAB_TRIGGERS[4].value,
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/studio-republic-fotKKqWNMQ4-unsplash.jpg",
      alt: "",
    },
    summary: "Monitor tasks, deadlines, and team progress efficiently.",
    link: "#",
  },
  {
    value: TAB_TRIGGERS[5].value,
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/annie-spratt-vGgn0xLdy8s-unsplash.jpg",
      alt: "",
    },
    summary: "Coordinate teams for smooth feature releases.",
    link: "#",
  },
];

interface TabLabelProps {
  value: string;
}

const TabLabel = ({ value }: TabLabelProps) => {
  const [label, setLabel] = useState<{
    name: string;
    icon: LucideIcon;
    color: string;
  }>({
    name: "",
    icon: Circle,
    color: "",
  });

  useEffect(() => {
    const tab = TAB_TRIGGERS.filter((trigger) => trigger.value === value);
    startTransition(() => {
      setLabel({
        name: tab[0].name,
        icon: tab[0].icon,
        color: tab[0].color,
      });
    });
  }, [value]);

  return (
    <div className="mb-8 flex items-center justify-center gap-6 xl:hidden">
      <div
        className="flex size-8 rounded-md"
        style={{ backgroundColor: label.color }}
      >
        {label.icon && <label.icon className="m-auto stroke-white" />}
      </div>
      <div className="text-lg">{label.name}</div>
    </div>
  );
};

interface Feature216Props {
  className?: string;
}

const Feature216 = ({ className }: Feature216Props) => {
  const [buttonPosition, setButtonPosition] = useState<number>(0);
  const [tabValue, setTabValue] = useState(TABS[0].value);
  const triggerRefs = useRef<HTMLButtonElement[]>([]);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const updateBottom = () => {
    if (imageRef.current) {
      const height = imageRef.current.getBoundingClientRect().height / 2;
      startTransition(() => {
        setButtonPosition(height);
      });
    }
  };

  useEffect(() => {
    updateBottom();
    window.addEventListener("resize", updateBottom);
    return () => {
      window.removeEventListener("resize", updateBottom);
    };
  }, []);

  const getCurrentTabIndex = () => {
    return TAB_TRIGGERS.findIndex((elem) => elem.value === tabValue);
  };

  const handleTabNavigation = (direction: "next" | "prev") => {
    triggerRefs.current.forEach((ref) => {
      ref.classList.add("grayscale-[1]", "opacity-[0.2]");
    });

    const currentIndex = getCurrentTabIndex();
    if (currentIndex === -1) return;

    const nextIndex =
      direction === "next" ? currentIndex + 1 : currentIndex - 1;

    const isInBounds = nextIndex >= 0 && nextIndex < TAB_TRIGGERS.length;

    if (isInBounds) {
      setTabValue(TAB_TRIGGERS[nextIndex].value);
    }
  };

  const onValueChange = (value: string) => {
    setTabValue(value);
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="px-5 sm:px-6 2xl:px-16">
        <div className="w-full rounded-2xl bg-muted pt-10 pb-20 sm:pt-12 sm:pb-24">
          <div className="container">
            <Tabs
              value={tabValue}
              onValueChange={onValueChange}
              className="w-full"
            >
              <TabsList className="hidden h-fit w-full items-end gap-12 bg-transparent pt-12 pb-16 xl:flex">
                {TAB_TRIGGERS.map((trigger, index) => (
                  <TabsTrigger
                    ref={(el) => {
                      if (el) {
                        triggerRefs.current[index] = el;
                      } else {
                        delete triggerRefs.current[index];
                      }
                    }}
                    className="flex flex-col items-center gap-5 p-0 opacity-[0.2] grayscale-[1] hover:opacity-[0.5] hover:grayscale-[0] data-[state=active]:bg-transparent data-[state=active]:opacity-100 data-[state=active]:shadow-none data-[state=active]:grayscale-0 dark:border-0 dark:data-[state=active]:bg-transparent"
                    key={`tab-trigger-${trigger.value}`}
                    value={trigger.value}
                    data-index={index}
                  >
                    <div
                      className="flex size-8 rounded-md"
                      style={{ backgroundColor: trigger.color }}
                    >
                      <trigger.icon className="m-auto stroke-white" />
                    </div>
                    <div className="text-xl font-normal">{trigger.name}</div>
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="relative">
                {TABS.map((tab) => (
                  <TabsContent
                    key={`tab-content-${tab.value}`}
                    value={tab.value}
                    className="animate-in duration-300 ease-in-out fade-in"
                  >
                    <TabLabel value={tab.value} />
                    <div className="flex w-full flex-col items-center xl:flex-row xl:justify-between">
                      <div className="flex-1">
                        <div className="mx-auto min-h-12 max-w-[22.5rem] text-center text-base font-medium text-foreground/60">
                          {tab.summary}
                        </div>
                      </div>
                    </div>
                    <div
                      className="sm:px-8k mt-10 w-full sm:mt-14 xl:mt-20"
                      ref={imageRef}
                    >
                      <AspectRatio
                        ratio={1.847058824}
                        className="w-full overflow-hidden rounded-lg border shadow-xl"
                      >
                        <img
                          src={tab.image.src}
                          alt={tab.image.alt}
                          className="block size-full object-cover object-center"
                        />
                      </AspectRatio>
                    </div>
                  </TabsContent>
                ))}
                <div
                  className="absolute left-0 translate-y-1/2"
                  style={{ bottom: buttonPosition }}
                >
                  <Button
                    variant="secondary"
                    disabled={getCurrentTabIndex() === 0}
                    onClick={() => handleTabNavigation("prev")}
                    size="lg"
                    className="size-12 -translate-x-1/2 rounded-full border shadow-lg"
                  >
                    <ArrowLeft />
                  </Button>
                </div>
                <div
                  className="absolute right-0 translate-y-1/2"
                  style={{ bottom: buttonPosition }}
                >
                  <Button
                    variant="secondary"
                    disabled={getCurrentTabIndex() === TAB_TRIGGERS.length - 1}
                    onClick={() => handleTabNavigation("next")}
                    size="lg"
                    className="size-12 translate-x-1/2 rounded-full border shadow-lg"
                  >
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature216 };
