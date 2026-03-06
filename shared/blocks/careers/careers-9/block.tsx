import { ArrowRight } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const jobs = [
  {
    department: "Engineering",
    role: "Senior Full Stack Developer",
    location: "Remote",
    link: "#",
  },
  {
    department: "Product",
    role: "Product Manager",
    location: "Hybrid",
    link: "#",
  },
  {
    department: "Design",
    role: "UI/UX Designer",
    location: "Remote",
    link: "#",
  },
  {
    department: "Data",
    role: "Data Scientist",
    location: "On-site",
    link: "#",
  },
  {
    department: "Marketing",
    role: "Growth Marketing Specialist",
    location: "Remote",
    link: "#",
  },
];

interface Careers9Props {
  className?: string;
}

const Careers9 = ({ className }: Careers9Props) => {
  return (
    <section
      className={cn(
        "bg-gradient-to-b from-background to-muted/20 py-24",
        className,
      )}
    >
      <div className="container max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Current Openings</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Join our team and help shape the future. We're looking for
            passionate people who are excited to tackle challenging problems and
            build amazing products.
          </p>
        </div>
        <div className="hidden grid-cols-1 items-center gap-1.5 py-6 text-xs uppercase sm:grid sm:grid-cols-4 sm:gap-10">
          <span className="text-muted-foreground">DEPARTMENT</span>
          <span className="col-span-2 text-muted-foreground">ROLE</span>
          <span className="text-muted-foreground uppercase">LOCATION</span>
        </div>
        <Separator />
        {jobs.map((job, idx) => (
          <React.Fragment key={idx}>
            <a
              href={job.link}
              className="group relative grid grid-cols-1 items-center gap-1.5 py-6 sm:grid-cols-4 sm:gap-10"
            >
              <Badge variant="outline">{job.department}</Badge>
              <span className="col-span-2 text-lg font-semibold">
                {job.role}
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">{job.location}</span>
                <ArrowRight className="absolute top-6 right-6 size-4.5 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary sm:static" />
              </div>
            </a>
            <Separator />
          </React.Fragment>
        ))}
        <div className="mt-12 text-center">
          <p className="mb-4 text-muted-foreground">
            Don't see a role that fits? We're always looking for great talent.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary/80"
          >
            Send us your resume
            <ArrowRight className="mt-0.5 size-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export { Careers9 };
