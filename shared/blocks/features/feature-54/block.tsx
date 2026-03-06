"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const features = [
  {
    id: "feature-1",
    title: "Task Management",
    description:
      "Organize and prioritize your work with our intuitive task management system.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    subfeatures: [
      {
        id: "subfeature-1",
        title: "Smart Lists",
        description:
          "Create custom lists that automatically organize your tasks based on priority, due date, or project.",
      },
      {
        id: "subfeature-2",
        title: "Time Tracking",
        description:
          "Built-in time tracking helps you understand where your time goes and improve your productivity habits.",
      },
      {
        id: "subfeature-3",
        title: "Recurring Tasks",
        description:
          "Set up recurring tasks for routine work and never worry about forgetting important regular activities.",
      },
    ],
  },
  {
    id: "feature-2",
    title: "Team Collaboration",
    description: "Work seamlessly with your team in a unified workspace.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    subfeatures: [
      {
        id: "subfeature-1",
        title: "Real-time Editing",
        description:
          "Collaborate on documents in real-time with multiple team members to streamline your workflow.",
      },
      {
        id: "subfeature-2",
        title: "Task Delegation",
        description:
          "Assign tasks to team members with detailed instructions and monitor progress without micromanaging.",
      },
      {
        id: "subfeature-3",
        title: "Team Chat",
        description:
          "Integrated messaging keeps all communication in context and reduces the need for separate chat tools.",
      },
    ],
  },
  {
    id: "feature-3",
    title: "Workflow Automation",
    description: "Automate repetitive tasks and streamline your processes.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    subfeatures: [
      {
        id: "subfeature-1",
        title: "Custom Triggers",
        description:
          "Create custom triggers that automatically start workflows based on specific conditions or events.",
      },
      {
        id: "subfeature-2",
        title: "Integration Hub",
        description:
          "Connect with your favorite tools and services to create seamless workflows across your entire tech stack.",
      },
      {
        id: "subfeature-3",
        title: "Templates Library",
        description:
          "Access pre-built automation templates for common business processes to save time on setup.",
      },
    ],
  },
  {
    id: "feature-4",
    title: "Analytics Dashboard",
    description: "Gain insights into team performance and productivity trends.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
    subfeatures: [
      {
        id: "subfeature-1",
        title: "Productivity Metrics",
        description:
          "Track individual and team productivity with customizable metrics that matter to your business.",
      },
      {
        id: "subfeature-2",
        title: "Time Analysis",
        description:
          "Visualize how time is spent across projects and identify opportunities to optimize your workflow.",
      },
      {
        id: "subfeature-3",
        title: "Custom Reports",
        description:
          "Generate detailed reports for stakeholders showing progress, bottlenecks, and resource allocation.",
      },
    ],
  },
  {
    id: "feature-5",
    title: "Smart Calendar",
    description: "Intelligent scheduling that optimizes your workday.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
    subfeatures: [
      {
        id: "subfeature-1",
        title: "Meeting Planner",
        description:
          "AI-powered meeting scheduler that finds the optimal time slots based on participants' availability and preferences.",
      },
      {
        id: "subfeature-2",
        title: "Focus Time Blocks",
        description:
          "Automatically block out dedicated focus time for deep work based on your productivity patterns.",
      },
      {
        id: "subfeature-3",
        title: "Smart Reminders",
        description:
          "Contextual reminders that adapt to your work habits and help you stay on track with important deadlines.",
      },
    ],
  },
];

interface Feature54Props {
  className?: string;
}

const Feature54 = ({ className }: Feature54Props) => {
  const [selection, setSelection] = useState(features[0].id);
  return (
    <section className={cn("py-32", className)}>
      <div className="flex flex-col items-center md:gap-y-4 lg:px-16">
        <div className="container flex flex-col items-center">
          <h3 className="mb-3 text-center text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            Powerful Features for Your Workflow
          </h3>
        </div>
        <div className="w-full text-center">
          <Tabs value={selection} onValueChange={setSelection}>
            <div className="relative">
              <div className="container mb-6 hidden min-w-fit flex-col items-center md:flex lg:mb-8 lg:max-w-5xl">
                <TabsList className="gap-x-2">
                  {features.map((feature) => (
                    <TabsTrigger key={feature.id} value={feature.id}>
                      {feature.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-background)_0%,transparent_10%,transparent_90%,var(--color-background)_100%)] md:hidden" />
            </div>
            <div className="container w-full lg:max-w-5xl">
              {features.map((feature) => (
                <TabsContent key={feature.id} value={feature.id}>
                  <div className="">
                    <div className="aspect-[1.67] w-full rounded-lg border border-border bg-accent">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="hidden grid-cols-3 gap-6 py-6 md:grid">
                      {feature.subfeatures.map((subfeature) => (
                        <div
                          key={subfeature.id}
                          className="flex flex-col text-left"
                        >
                          <p className="mb-2 text-xs font-semibold">
                            {subfeature.title}
                          </p>
                          <p className="mb-8 text-xs text-muted-foreground">
                            {subfeature.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </div>
            <div className="flex justify-center py-3 md:hidden">
              {features.map((feature) => (
                <Button
                  key={feature.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelection(feature.id);
                  }}
                >
                  <div
                    className={`size-2 rounded-full ${feature.id === selection ? "bg-primary" : "bg-input"}`}
                  />
                </Button>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export { Feature54 };
