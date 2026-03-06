import { Map } from "lucide-react";

import { cn } from "@/lib/utils";

const jobs = [
  {
    title: "Senior Software Engineer",
    category: "Engineering",
    description:
      "You will be responsible for the development of new and existing software products.",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $180k",
    link: "#",
  },
  {
    title: "Product Manager",
    category: "Engineering",
    description: "Help us build the next generation of Acme products.",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $150k",
    link: "#",
  },
  {
    title: "QA Engineer",
    category: "Engineering",
    description:
      "Ensure the quality of our software products through testing and automation.",
    location: "Remote",
    type: "Full-time",
    salary: "$80k - $120k",
    link: "#",
  },
  {
    title: "Technical Support Specialist",
    category: "Engineering",
    description:
      "Provide technical support to our customers and internal teams.",
    location: "Remote",
    type: "Full-time",
    salary: "$60k - $90k",
    link: "#",
  },
  {
    title: "Content Writer",
    category: "Marketing",
    description:
      "Create engaging content for our blog, website, and social media channels.",
    location: "Remote",
    type: "Full-time",
    salary: "$50k - $80k",
    link: "#",
  },
  {
    title: "Social Media Manager",
    category: "Marketing",
    description:
      "Manage our social media presence and engage with our followers.",
    location: "Remote",
    type: "Full-time",
    salary: "$45k - $75k",
    link: "#",
  },
];

interface Careers5Props {
  className?: string;
}

const Careers5 = ({ className }: Careers5Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h1 className="mb-3 text-4xl font-semibold">Careers</h1>
          </div>
          <div>
            {jobs.map((job) => (
              <div key={job.title} className="border-t py-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <a
                      href={job.link}
                      className="mb-1 text-lg font-semibold hover:underline"
                    >
                      {job.title}
                    </a>
                    <p className="text-muted-foreground">{job.description}</p>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex gap-2">
                      <Map className="h-auto w-4" />
                      {job.location}
                    </div>
                    <div className="flex gap-2">{job.salary}</div>
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

export { Careers5 };
