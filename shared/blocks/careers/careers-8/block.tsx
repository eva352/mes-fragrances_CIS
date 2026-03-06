"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const JOBS = [
  {
    category: "Engineering & Development",
    openings: [
      {
        title: "Software Engineer",
        location: "San Francisco, CA | Remote",
        link: "#",
      },
      {
        title: "Backend Developer",
        location: "San Francisco, CA | Remote",
        link: "#",
      },
    ],
  },
  {
    category: "Product Management",
    openings: [
      {
        title: "Product Manager",
        location: "Sydney, Australia",
        link: "#",
      },
      {
        title: "Product Owner",
        location: "Sydney, Australia",
        link: "#",
      },
      {
        title: "Product Data Management Specialist",
        location: "Sydney, Australia | Remote",
        link: "#",
      },
      {
        title: "Associate Product Manager",
        location: "Sydney, Australia | Remote",
        link: "#",
      },
      {
        title: "Mobile Product Manager",
        location: "Sydney, Australia | Remote",
        link: "#",
      },
      {
        title: "AI Product Manager",
        location: "Sydney, Australia | Remote",
        link: "#",
      },
    ],
  },
  {
    category: "Design & User Experience",
    openings: [
      {
        title: "UX Designer",
        location: "Sydney, Australia",
        link: "#",
      },
    ],
  },
  {
    category: "Sales & Marketing",
    openings: [
      {
        title: "Sales Executive",
        location: "Sydney, Australia",
        link: "#",
      },
    ],
  },
  {
    category: "IT & Infrastructure",
    openings: [
      {
        title: "IT Support",
        location: "Sydney, Australia",
        link: "#",
      },
      {
        title: "System Administrator",
        location: "Sydney, Australia",
        link: "#",
      },
      {
        title: "Network Engineer",
        location: "Sydney, Australia",
        link: "#",
      },
    ],
  },
];

const options = [
  {
    label: "All Departments",
    value: "all",
  },
  {
    label: "Engineering & Development",
    value: "engineering_&_development",
  },
  {
    label: "Product Management",
    value: "product_management",
  },
  {
    label: "Design & User Experience",
    value: "design_&_user_experience",
  },
  {
    label: "Sales & Marketing",
    value: "sales_&_marketing",
  },
  {
    label: "IT & Infrastructure",
    value: "IT_&_infrastructure",
  },
];

interface Careers8Props {
  className?: string;
}

const Careers8 = ({ className }: Careers8Props) => {
  const [filterValue, setFilterValue] = useState(options[0].value);

  const filterJobsByCategory = (category: string) => {
    if (category === "All Departments") return JOBS;
    return JOBS.filter((job) => job.category === category);
  };

  const renderJobs = () => {
    const option = options.filter((opt) => opt.value == filterValue);
    const jobs = filterJobsByCategory(option[0].label);
    return (
      <>
        {jobs.map((job, i) => (
          <div
            key={`job-${job.category}-${i}`}
            className="flex w-full flex-col justify-start gap-10"
          >
            <div className="text-4xl leading-none font-semibold">
              {job.category}
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {job.openings.map((opening) => (
                <a
                  key={`job-${opening.title}`}
                  href={opening.link}
                  className="block rounded-md bg-muted p-5 transition-colors hover:bg-foreground/10"
                >
                  <div className="mb-1 text-lg leading-normal font-semibold">
                    {opening.title}
                  </div>
                  <div className="text-sm leading-normal text-muted-foreground">
                    {opening.location}
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex w-full flex-col gap-14">
          <h2 className="text-5xl leading-[1.3] font-semibold">
            Open Positions
          </h2>
          <div className="flex flex-wrap items-center justify-start gap-5">
            <Label
              htmlFor="terms"
              className="text-base leading-normal font-semibold text-muted-foreground"
            >
              Filter
            </Label>
            <Select
              value={filterValue}
              onValueChange={(value) => setFilterValue(value)}
            >
              <SelectTrigger className="w-[15.625rem]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-16">{renderJobs()}</div>
        </div>
      </div>
    </section>
  );
};

export { Careers8 };
