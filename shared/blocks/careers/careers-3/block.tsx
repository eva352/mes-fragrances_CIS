import { ArrowRight, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Careers3Props {
  className?: string;
}

const Careers3 = ({ className }: Careers3Props) => {
  const jobs = [
    {
      category: "Engineering",
      openings: [
        {
          title: "Senior Software Engineer",
          description:
            "You will be responsible for the development of new and existing software products.",
          location: "Salta, Argentina office or Remote",
          link: "#",
        },
        {
          title: "Product Manager",
          description: "Help us build the next generation of Acme products.",
          location: "Windhoek, Namibia office or Remote",
          link: "#",
        },
        {
          title: "QA Engineer",
          description:
            "Ensure the quality of our software products through testing and automation.",
          location: "Chiang Mai, Thailand office or Remote",
          link: "#",
        },
        {
          title: "Technical Support Specialist",
          description:
            "Provide technical support to our customers and internal teams.",
          location: "Cusco, Peru office or Remote",
          link: "#",
        },
      ],
    },
    {
      category: "Marketing",
      openings: [
        {
          title: "Content Writer",
          description:
            "Create engaging content for our blog, website, and social media channels.",
          location: "Fes, Morocco",
          link: "#",
        },
        {
          title: "Social Media Manager",
          description:
            "Manage our social media presence and engage with our followers.",
          location: "Goa, India",
          link: "#",
        },
      ],
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold md:text-5xl">Open Positions</h1>
          <div className="mx-auto mt-14 flex flex-col gap-16">
            {jobs.map((jobCategory) => (
              <div key={jobCategory.category}>
                <Badge>{jobCategory.category}</Badge>
                <div>
                  {jobCategory.openings.map((job) => (
                    <a
                      href={job.link}
                      key={job.title}
                      className="group block border-b py-7"
                    >
                      <h3 className="text-xl font-semibold group-hover:underline">
                        {job.title}
                      </h3>
                      <p className="mt-1 font-medium text-muted-foreground">
                        {job.description}
                      </p>
                      <div className="mt-4 flex justify-between gap-4 text-muted-foreground">
                        <div className="flex gap-2 text-sm md:text-base">
                          <MapPin className="h-auto w-4 shrink-0" />
                          <p>{job.location}</p>
                        </div>
                        <ArrowRight className="h-auto w-4" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Careers3 };
