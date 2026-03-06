import { cn } from "@/lib/utils";

interface ExperienceItem {
  title: string;
  details: string;
  period: string;
  company: string;
  logo: string;
  description: string;
  className?: string;
}

interface Experience5Props {
  title?: string;
  experience?: ExperienceItem[];
  className?: string;
}

const Experience5 = ({
  title = "Work Experience",
  experience = [
    {
      title: "Senior Full Stack Developer",
      details: "Full-Time • Remote • San Francisco CA",
      period: "Mar 2022 - Present",
      company: "Anthropic",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/claude-icon.svg",
      description:
        "Led development of scalable web applications using React, Node.js, and PostgreSQL. Architected microservices infrastructure serving 100K+ users. Mentored junior developers and established coding standards.",
    },
    {
      title: "Frontend Engineer",
      details: "Full-Time • Onsite • Austin TX",
      period: "Jan 2020 - May 2021",
      company: "Vercel",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-icon.svg",
      description:
        "Developed full-stack applications using JavaScript, Python, and MySQL. Participated in agile development process and code reviews. Contributed to open-source projects and internal tooling.",
    },
    {
      title: "Junior Web Developer",
      details: "Full-Time • Onsite • Denver CO",
      period: "Aug 2018 - Dec 2019",
      company: "Figma",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-icon.svg",
      description:
        "Created responsive websites using HTML, CSS, and JavaScript. Worked with WordPress and PHP for content management. Assisted in debugging and testing web applications.",
    },
  ],
  className,
}: Experience5Props) => {
  return (
    <section className={cn("py-16 md:py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 font-serif text-4xl leading-tight font-medium md:text-7xl">
            {title}
          </h2>

          <div className="space-y-8">
            {experience.map(
              ({ title, details, period, company, logo, description }, idx) => (
                <div
                  key={idx}
                  className="border-b border-border pb-6 last:border-b-0"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start">
                    <div className="md:w-2/3">
                      <div className="mb-2 flex items-center gap-3">
                        <img
                          src={logo}
                          alt={`${company} logo`}
                          className="h-5 object-contain"
                        />
                        <h3 className="text-xl">{title}</h3>
                      </div>
                      <p className="mb-3 text-sm text-muted-foreground">
                        {details}
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {description}
                      </p>
                    </div>
                    <div className="text-right md:w-1/3 md:text-right">
                      <p className="mb-1 text-sm font-medium">{period}</p>
                      <p className="text-sm text-muted-foreground">{company}</p>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Experience5 };
