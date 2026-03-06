import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const CUSTOMER_DATA = {
  company: {
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-8.svg",
    name: "",
  },
  stats: [
    {
      number: "45%",
      text: "improvement in onboarding completion",
    },
    {
      number: "61%",
      text: "reduction in time-to-value",
    },
    {
      number: "3x",
      text: "increase in user activation",
    },
  ],
  author: {
    name: "Sarah Williams",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    role: "CTO, monzo",
  },
  title: "How We Optimized Our Onboarding Flow to Triple User Activation",
  summary:
    "Learn how we revamped our product onboarding experience using our in-house toolkit and reduced time-to-value by over 60%.",
  link: "#",
};

interface AuthorProps {
  image: string;
  name: string;
  role: string;
}

const Author = ({ image, name, role }: AuthorProps) => {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar className="size-10 rounded-[.5rem] border bg-background">
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-0.5">
        <div className="text-sm leading-normal font-medium">{name}</div>
        <div className="text-sm leading-normal font-medium">{role}</div>
      </div>
    </div>
  );
};

interface CaseStudies4Props {
  className?: string;
}

const CaseStudies4 = ({ className }: CaseStudies4Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex w-full flex-col items-stretch justify-between gap-10 rounded-[.5rem] bg-muted p-10 lg:flex-row">
          <div className="flex w-full max-w-[30rem] flex-col gap-10 rounded-[.5rem] bg-background p-5">
            <div className="max-w-[4.875rem]">
              <img
                src={CUSTOMER_DATA.company.logo}
                alt={CUSTOMER_DATA.company.name}
                className="block size-full object-contain object-center"
              />
            </div>
            <div className="flex w-full flex-col gap-8 sm:flex-row">
              {CUSTOMER_DATA.stats.map((item, i) => (
                <div
                  className="flex flex-col gap-1"
                  key={`stats-use-case-${i}`}
                >
                  <div className="text-xl font-semibold">{item.number}</div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
            <Author {...CUSTOMER_DATA.author} />
          </div>
          <div className="flex max-w-[32rem] flex-col gap-5">
            <h2 className="text-2xl leading-none font-bold md:text-3xl lg:text-4xl">
              {CUSTOMER_DATA.title}
            </h2>
            <p className="text-base font-medium text-foreground">
              {CUSTOMER_DATA.summary}
            </p>
            <div className="shrink-0">
              <Button asChild variant="outline" size="sm">
                <a href={CUSTOMER_DATA.link}>
                  Read Story
                  <ArrowRight />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CaseStudies4 };
