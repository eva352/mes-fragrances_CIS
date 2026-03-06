"use client";

import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";

const integrations = [
  {
    title: "Outreach",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
  },
  {
    title: "Typeform",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg",
  },
  {
    title: "Slack",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-3.svg",
  },
  {
    title: "Mailchimp",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-4.svg",
  },
  {
    title: "Mixmax",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-5.svg",
  },
  {
    title: "Webhooks",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-6.svg",
  },
];

interface Feature147Props {
  className?: string;
}

const Feature147 = ({ className }: Feature147Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-24 flex flex-col items-center justify-between gap-6 lg:flex-row lg:gap-x-12">
          <div className="w-full text-center text-3xl font-medium lg:w-1/2 lg:text-left lg:text-5xl">
            <span className="text-muted-foreground">Built</span> with the latest
            technology stack
          </div>
          <div className="w-full text-center text-lg font-medium lg:w-1/2 lg:text-left lg:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            fuga error voluptates ut sint.
          </div>
        </div>
        <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration, index) => (
            <li key={index}>
              <Card className="p-6">
                <img
                  src={integration.image}
                  alt={integration.title}
                  className="w-14"
                />
                <h3 className="mt-4 mb-1 text-lg font-medium">
                  {integration.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {integration.description}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export { Feature147 };
