import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  Check,
  Infinity as InfinityIcon,
  ListChecks,
  MessagesSquare,
  Star,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Highlight {
  icon: LucideIcon;
  text: string;
}

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface Feature135Props {
  className?: string;
}

const Feature135 = ({ className }: Feature135Props) => {
  const highlights: Highlight[] = [
    {
      icon: Check,
      text: "User-Friendly Interface for Easy Navigation",
    },
    {
      icon: Check,
      text: "Real-time Collaboration for Smooth Teamwork",
    },
    {
      icon: Check,
      text: "Powerful Insights for Informed Decisions",
    },
    {
      icon: Check,
      text: "Strong Data Protection for Secure Operations",
    },
  ];

  const features: Feature[] = [
    {
      icon: Calendar,
      title: "Task Management Simplified",
      description:
        "Keep track of tasks, assign priorities, and monitor progress easily to stay organized and on schedule.",
    },
    {
      icon: MessagesSquare,
      title: "Unified Messaging System",
      description:
        "Communicate efficiently with an intuitive messaging system that supports teams of all sizes and locations.",
    },
    {
      icon: InfinityIcon,
      title: "Effortless Data Sync",
      description:
        "Synchronize data across multiple devices and platforms for a smooth workflow experience for all users.",
    },
    {
      icon: Users,
      title: "Team Member Management",
      description:
        "Add and manage team members with ease, ensuring smooth onboarding and collaboration processes.",
    },
    {
      icon: ListChecks,
      title: "Stay on Track with Deadlines",
      description:
        "Set reminders and deadlines to keep your team aligned and focused on key goals and objectives.",
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative grid gap-10 lg:grid-cols-2">
          <div className="top-10 mx-auto flex h-fit max-w-3xl flex-col items-center gap-4 lg:sticky lg:items-start">
            <Badge
              variant="outline"
              className="flex items-center gap-1 px-2.5 py-1.5 text-sm"
            >
              <Star className="h-auto w-4" />
              Key Highlights
            </Badge>
            <h2 className="text-center text-3xl font-semibold lg:text-left lg:text-4xl">
              Empower Your Workflow with Core Features
            </h2>
            <p className="text-center text-muted-foreground lg:text-left lg:text-lg">
              Maximize your productivity with essential features designed for
              seamless operations.
            </p>
            <div className="mt-6 flex flex-col gap-4">
              {highlights.map((highlight, index) => {
                return (
                  <div
                    key={`highlight-${index}`}
                    className="flex items-center gap-2"
                  >
                    <Check className="h-auto w-4" />
                    <span className="text-muted-foreground">
                      {highlight.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={`feature-${index}`}
                  className="gap flex flex-col gap-3 rounded-lg border p-7"
                >
                  <div className="flex flex-col items-center gap-2.5 lg:flex-row">
                    <span className="flex size-12 items-center justify-center rounded-md bg-muted">
                      <Icon className="h-auto w-6" />
                    </span>
                    <h3 className="text-lg font-medium">{feature.title}</h3>
                  </div>
                  <p className="text-center text-sm text-muted-foreground md:text-base lg:text-left">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature135 };
