import { Download } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Experience3Props {
  className?: string;
}

const Experience3 = ({ className }: Experience3Props) => {
  const experience = [
    {
      period: "Sep 2025 - Now",
      title: "Sr. Software Engineer",
      description:
        "Leading development of scalable web applications using React, TypeScript, and Node.js. Mentoring junior developers and implementing best practices.",
      company: "Google",
    },
    {
      period: "Mar 2023 - Aug 2025",
      title: "Full Stack Developer",
      description:
        "Built and maintained multiple client websites and e-commerce platforms. Collaborated with design teams to implement pixel-perfect UI/UX designs.",
      company: "Microsoft",
    },
    {
      period: "Jan 2021 - Feb 2023",
      title: "Frontend Developer",
      description:
        "Developed responsive web applications using modern JavaScript frameworks. Optimized performance and accessibility across multiple projects.",
      company: "Apple",
    },
    {
      period: "Jun 2019 - Dec 2020",
      title: "Junior Developer",
      description:
        "Assisted in building web applications and learning modern development practices. Contributed to team projects and code reviews.",
      company: "Netflix",
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex h-fit w-fit w-full flex-col justify-between gap-10 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <p className="tracking-loose text-foreground/30 uppercase">
              Professional Journey
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight lg:text-6xl">
              Experience
            </h1>
            <p className="mt-10 text-lg text-foreground/50">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime
              amet dolorem eum est voluptatem id repellendus.
            </p>
          </div>
          <div className="flex w-fit max-w-lg flex-col gap-4 lg:items-center">
            <Button
              variant="secondary"
              className="group h-12 rounded-full pr-2"
            >
              Download Resume
              <span className="rounded-full bg-orange-500 p-2 text-white">
                <Download className="size-4" />
              </span>
            </Button>
            <p className="text-sm text-foreground/50">
              Last update: 2025-09-03
            </p>
          </div>
        </div>
        <ul className="relative w-full">
          <li className="flex justify-between gap-10 border-b pt-15 pb-2 text-sm tracking-tight text-foreground/40 uppercase lg:text-base">
            <p>Description</p>
            <p>Period</p>
          </li>
          {experience.map((exp, index) => (
            <li
              key={index}
              className="flex justify-between gap-10 border-b py-10 lg:py-15"
            >
              <div className="max-w-2xl">
                <h3 className="mb-4 text-xl font-semibold tracking-tighter lg:text-2xl lg:text-3xl">
                  (0{experience.length - index}) {exp.title}
                </h3>
                <p className="text-sm text-foreground/50 lg:text-base">
                  {exp.description}
                </p>
              </div>
              <p className="w-fit min-w-20 text-right text-sm text-foreground/50 uppercase lg:text-base">
                {exp.period}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export { Experience3 };
