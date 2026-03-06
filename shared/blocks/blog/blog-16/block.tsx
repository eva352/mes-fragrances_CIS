import { ArrowRight, ChevronRight } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const data = [
  {
    team: "Acme",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    date: "22 November 2024",
    title: "The future of digital transformation: embracing new technologies.",
    link: "#",
    categories: [
      {
        name: "Technology",
        link: "#",
      },
      {
        name: "Innovation",
        link: "#",
      },
      {
        name: "Business",
        link: "#",
      },
    ],
  },
  {
    team: "Advent corporation",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg",
    date: "07 November 2024",
    title: "Building sustainable solutions for tomorrow’s challenges.",
    link: "#",
    categories: [
      {
        name: "Sustainability",
        link: "#",
      },
      { name: "Innovation", link: "#" },
      { name: "Business", link: "#" },
    ],
  },
  {
    team: "Ace",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-3.svg",
    date: "30 October 2024",
    title: "How modern technologies are reshaping business landscapes.",
    link: "#",
    categories: [
      { name: "Technology", link: "#" },
      { name: "Business", link: "#" },
    ],
  },
];

interface Blog16Props {
  className?: string;
}

const Blog16 = ({ className }: Blog16Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="px-0">
        <h1 className="container text-3xl font-bold lg:text-5xl">
          <span className="text-muted-foreground">Blog.</span>
          <br />
          Latest insights & updates
        </h1>
        <div className="mt-8">
          <Separator />
          <div className="">
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <div className="container grid grid-cols-1 gap-6 py-8 lg:grid-cols-4">
                  <div className="hidden items-center gap-3 self-start lg:flex">
                    <img
                      src={item.logo}
                      alt={item.team}
                      className="h-auto w-11"
                    />
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">{item.team}</span>
                      <span className="text-sm text-muted-foreground">
                        Team
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2 max-w-xl">
                    <span className="mb-2 text-sm font-medium text-muted-foreground">
                      {item.date}
                      <span className="inline lg:hidden"> - {item.team}</span>
                    </span>
                    <h3 className="text-2xl font-bold hover:underline lg:text-3xl">
                      <a href={item.link}>{item.title}</a>
                    </h3>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.categories.map((category, index) => (
                        <a
                          key={index}
                          href={category.link}
                          className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
                        >
                          {category.name}
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </a>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    asChild
                    size="icon"
                    className="ml-auto hidden lg:flex"
                  >
                    <a href={item.link}>
                      <ArrowRight className="h-4 w-4" />
                      <span className="sr-only">Read more</span>
                    </a>
                  </Button>
                </div>
                <Separator />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Blog16 };
