"use client";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

const items = [
  {
    title: "Slack",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    number: 400,
  },
  {
    title: "Google Drive",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    number: 4000,
  },
  {
    title: "Dropbox",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    number: 7000,
  },
  {
    title: "Github",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    number: 850,
  },
];

interface Feature139Props {
  className?: string;
}

const Feature139 = ({ className }: Feature139Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="rounded-lg border bg-card p-10 shadow-sm">
          <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full max-w-md">
              <Badge
                variant="outline"
                className="px-3 py-2 text-muted-foreground"
              >
                The badge
              </Badge>
              <h2 className="my-5 text-2xl font-medium lg:text-4xl">
                Build your own website with our UI blocks
              </h2>
              <p className="text-sm text-muted-foreground lg:text-base">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Pariatur modi et recusandae ducimus eligendi eveniet soluta
                reprehenderit nostrum expedita omnis.
              </p>
            </div>
            <div className="w-full max-w-lg">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                alt="placeholder"
                className="max-h-[420px] w-full rounded-lg object-cover"
              />
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 justify-between gap-12 sm:grid-cols-2 md:grid-cols-4">
            {items.map((item) => (
              <div key={item.title}>
                <p className="text-4xl text-muted-foreground">{item.number}+</p>
                <h6 className="text-5 mt-5 mb-3 font-semibold">{item.title}</h6>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature139 };
