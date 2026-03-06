"use client";

import clsx from "clsx";
import {
  ChevronDown,
  ChevronUp,
  GanttChartSquareIcon,
  SwatchBook,
} from "lucide-react";
import { GitBranch, Sparkles } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

const integrations = [
  {
    title: "Design",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: <SwatchBook className="h-8 w-8" />,
    color: "bg-red-400",
    tags: [
      "Deliverables",
      "Research Insights",
      "Hi-fi Product Screens",
      "Vision Presentations",
      "Animated Product Walk-through",
    ],
  },
  {
    title: "Develop",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: <GitBranch className="h-8 w-8" />,
    color: "bg-blue-400",
    tags: [
      "Deliverables",
      "Brand Audit",
      "Look Book",
      "Executive Decks",
      "Style Guides",
      "Design Systems",
    ],
  },
  {
    title: "UX",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: <Sparkles className="h-8 w-8" />,
    color: "bg-yellow-400",
    tags: [
      "Deliverables",
      "Weekly Sprints",
      "Hi-fi Product Screens",
      "Prototyping",
      "Walk-through Videos",
    ],
  },
  {
    title: "Analytics",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: <GanttChartSquareIcon className="h-8 w-8" />,
    color: "bg-green-400",
    tags: [
      "Deliverables",
      "Workshops",
      "Tool Kits",
      "Communications Packages",
      "Websites",
    ],
  },
];

interface Feature65Props {
  className?: string;
}

const Feature65 = ({ className }: Feature65Props) => {
  const [activeTabId, setActiveTabId] = useState<number | null>(null);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
          {integrations.map((item, index) => (
            <div
              key={index}
              className="flex h-full flex-col justify-between gap-2"
            >
              <div className="flex items-center justify-between rounded-xl bg-muted-foreground/5 p-6">
                <div className="flex items-center gap-3">
                  <div className={clsx("h-16 w-3 rounded-md", item.color)} />
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
                <div className="flex items-center gap-6">
                  {item.image}
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-lg bg-background lg:hidden"
                    onClick={() =>
                      setActiveTabId(activeTabId === index ? null : index)
                    }
                  >
                    {activeTabId === index ? (
                      <ChevronUp className="h-8" />
                    ) : (
                      <ChevronDown className="h-8" />
                    )}
                  </div>
                </div>
              </div>
              <div
                className={` ${activeTabId === index ? "flex" : "hidden"} h-full flex-col items-start justify-between gap-64 rounded-xl bg-muted-foreground/5 p-6 transition-all duration-300 lg:flex`}
              >
                <div className="text-xl font-medium text-muted-foreground/90">
                  {item.description}
                </div>
                <div className="flex flex-col items-start gap-4">
                  {item.tags.map((tag, index) => (
                    <Badge
                      variant="outline"
                      className={`${index == 0 ? "bg-muted/5" : "bg-background"} rounded-2xl border-0 px-4 py-3 text-base font-medium`}
                      key={tag}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature65 };
