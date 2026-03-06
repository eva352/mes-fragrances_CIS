import { ArrowUpRight } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Experience2Props {
  className?: string;
}

const Experience2 = ({ className }: Experience2Props) => {
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
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-6 lg:gap-20">
          <div className="top-10 col-span-2 h-fit w-fit gap-3 space-y-7 py-8 lg:sticky">
            <h1 className="text-6xl font-medium tracking-tight">
              {" "}
              Experience
              <sup className="align-top text-sm tracking-tight text-foreground/40">
                Solid 4 Years
              </sup>{" "}
            </h1>
            <p className="text-base text-foreground/50">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime
              amet dolorem eum est voluptatem id repellendus ut laborum
              laboriosam debitis.
            </p>

            <Button
              variant="secondary"
              className="group h-12 rounded-full pr-2"
            >
              Contact now
              <span className="rounded-full bg-orange-500 p-2 text-white">
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </Button>
          </div>
          <ul className="relative col-span-4 w-full">
            {experience.map((exp, index) => (
              <li
                key={index}
                className="flex flex-col justify-between gap-10 border-b py-10 md:flex-row lg:items-center lg:py-15"
              >
                <div className="lg:w-2/3">
                  <h2 className="mb-4 font-medium tracking-tighter lg:text-xl">
                    {exp.company}
                  </h2>
                  <h3 className="mb-4 text-2xl font-semibold tracking-tighter lg:text-3xl">
                    {exp.title}
                  </h3>
                  <p className="text-foreground/50">{exp.description}</p>
                </div>
                <div className="w-fit rounded-full bg-muted px-4 py-1 tracking-tighter">
                  {exp.period}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Experience2 };
