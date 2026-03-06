"use client";

import {
  Award,
  Building2,
  Clock,
  DollarSign,
  Globe,
  GraduationCap,
  Map,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const jobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    category: "Engineering",
    department: "Product Development",
    description:
      "You will be responsible for the development of new and existing software products, leading technical initiatives, and mentoring junior developers.",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $180k",
    experience: "5+ years",
    link: "#",
  },
  {
    id: 2,
    title: "Product Manager",
    category: "Product",
    department: "Product Management",
    description:
      "Help us build the next generation of Acme products by defining product strategy, roadmap, and working closely with engineering teams.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$100k - $150k",
    experience: "3+ years",
    link: "#",
  },
  {
    id: 3,
    title: "QA Engineer",
    category: "Engineering",
    department: "Quality Assurance",
    description:
      "Ensure the quality of our software products through comprehensive testing, automation frameworks, and continuous improvement processes.",
    location: "Remote",
    type: "Full-time",
    salary: "$80k - $120k",
    experience: "2+ years",
    link: "#",
  },
  {
    id: 4,
    title: "Technical Support Specialist",
    category: "Support",
    department: "Customer Success",
    description:
      "Provide exceptional technical support to our customers and internal teams, troubleshoot issues, and maintain customer satisfaction.",
    location: "New York, NY",
    type: "Full-time",
    salary: "$60k - $90k",
    experience: "1+ years",
    link: "#",
  },
  {
    id: 5,
    title: "Content Writer",
    category: "Marketing",
    department: "Content Marketing",
    description:
      "Create engaging, SEO-optimized content for our blog, website, and social media channels that drives traffic and conversions.",
    location: "Remote",
    type: "Full-time",
    salary: "$50k - $80k",
    experience: "2+ years",
    link: "#",
  },
];

interface Careers6Props {
  className?: string;
}

const Careers6 = ({ className }: Careers6Props) => {
  return (
    <section className={cn("bg-background py-24", className)}>
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight">Careers</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              We're building the future of technology. Find your perfect role
              and grow with us.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>150+ Team Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Remote First</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span>Best Places to Work 2024</span>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="group relative overflow-hidden rounded-lg border bg-card p-6"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  {/* Main Content */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">
                          <a href={job.link} className="hover:underline">
                            {job.title}
                          </a>
                        </h3>
                      </div>
                      <p className="mb-4 text-muted-foreground">
                        {job.description}
                      </p>
                      <Button asChild size="sm" variant="outline">
                        <a href={job.link}>Apply Now</a>
                      </Button>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="flex flex-col gap-4 lg:w-72">
                    {/* Job Details */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>{job.department}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Map className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap className="h-4 w-4" />
                        <span>{job.experience} experience</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Careers6 };
