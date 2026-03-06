"use client";

import {
  Activity,
  ArrowDownToLine,
  ArrowUpDown,
  Bell,
  Brain,
  CheckCircle,
  Clock,
  Code,
  Database,
  FileText,
  GitBranch,
  Redo,
  Repeat,
  Rocket,
  Scaling,
  Scan,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Marquee } from "@/components/magicui/marquee";
import { Badge } from "@/components/ui/badge";

const badges = [
  {
    title: "Integrations",
    icon: <Code className="size-4" />,
  },
  {
    title: "Automation",
    icon: <ArrowUpDown className="size-4" />,
  },
  {
    title: "Workflows",
    icon: <GitBranch className="size-4" />,
  },
  {
    title: "Triggers",
    icon: <Zap className="size-4" />,
  },
  {
    title: "Scheduling",
    icon: <Clock className="size-4" />,
  },
  {
    title: "Monitoring",
    icon: <Activity className="size-4" />,
  },
  {
    title: "AI Processing",
    icon: <Brain className="size-4" />,
  },
  {
    title: "Data Pipeline",
    icon: <Database className="size-4" />,
  },
  {
    title: "Notifications",
    icon: <Bell className="size-4" />,
  },
  {
    title: "Auto-Deploy",
    icon: <Rocket className="size-4" />,
  },
  {
    title: "Testing",
    icon: <CheckCircle className="size-4" />,
  },
  {
    title: "Reporting",
    icon: <FileText className="size-4" />,
  },
  {
    title: "Customization",
    icon: <Redo className="size-4" />,
  },
  {
    title: "Collaboration",
    icon: <ArrowDownToLine className="size-4" />,
  },
  {
    title: "Security",
    icon: <Repeat className="size-4" />,
  },
  {
    title: "Performance",
    icon: <Scan className="size-4" />,
  },
  {
    title: "Scalability",
    icon: <Scaling className="size-4" />,
  },
];

interface Feature154Props {
  className?: string;
}

const Feature154 = ({ className }: Feature154Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-6 text-center">
          <Badge variant="outline">Automations</Badge>
          <h1 className="text-4xl font-semibold md:text-6xl">
            The best way to automate your workflow
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Streamline operations with intelligent automation. Eliminate
            repetitive tasks and focus on what matters most.
          </p>
        </div>
        <div className="relative mt-10">
          <Marquee className="[--duration:30s]">
            {badges.map((badge) => (
              <div
                key={badge.title}
                className="flex items-center gap-2 rounded-full bg-muted px-4 py-2"
              >
                {badge.icon}
                {badge.title}
              </div>
            ))}
          </Marquee>
          <Marquee reverse className="[--duration:30s]">
            {badges.map((badge) => (
              <div
                key={badge.title}
                className="flex items-center gap-2 rounded-full bg-muted px-4 py-2"
              >
                {badge.icon}
                {badge.title}
              </div>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    </section>
  );
};

export { Feature154 };
