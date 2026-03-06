"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Feature314Props {
  smallCards: {
    image: string;
    topNote: string;
    title: string;
    summary: string;
    url: string;
  }[];
  bigCard: {
    image: string;
    label: string;
    title: string;
    url: string;
  };
  heading: string;
  secondaryHeading: string;
  description: string;
  button: {
    text: string;
    url: string;
  };
  className?: string;
}

const Feature314 = ({
  heading = "Explore our creative studio.",
  button = {
    text: "Contact us",
    url: "https://dub.sh/NHu6ZMt",
  },
  smallCards = [
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
      topNote: "March 10, 2025",
      title: "The Future of User Experience in 2025",
      summary:
        "Discover how motion design, accessibility, and micro-interactions are shaping the next generation of interfaces.",
      url: "https://dub.sh/NHu6ZMt",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
      topNote: "February 22, 2025",
      title: "Design Systems that Scale Across Teams",
      summary:
        "Learn how we use unified design tokens and shared libraries to keep large projects consistent and efficient. ",
      url: "https://dub.sh/NHu6ZMt",
    },
  ],
  bigCard = {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/artistic-portrait-glitch-yqp6z.png",
    label: "studio®",
    title: "Inside our design process",
    url: "https://dub.sh/NHu6ZMt",
  },
  className,
}: Feature314Props) => {
  return (
    <section className={cn("bg-muted py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-12 px-4">
          {/* Header Section */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end md:gap-8">
            <h2 className="max-w-lg flex-1 justify-between text-3xl font-bold whitespace-pre-line md:text-5xl">
              {heading}
            </h2>
            <Button asChild className="rounded-xl">
              <a href={button.url}>
                {button.text}
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
            {smallCards.map((card, id) => (
              <Card
                key={id}
                className="col-span-1 rounded-xl border-0 p-4 shadow-none"
              >
                <div className="flex h-full w-full flex-col justify-between gap-4">
                  <div className="relative w-full">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="size-24 rounded-xl lg:size-32 dark:invert"
                    />
                    <div className="absolute top-0 right-0 flex items-start justify-end">
                      <p className="flex items-center gap-2 text-sm font-bold">
                        <Plus
                          size={20}
                          className="rounded-full bg-secondary p-0.5"
                        />
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <span className="text-xs text-muted-foreground">
                      {card.topNote}
                    </span>
                    <h1 className="text-xl font-medium md:text-xl">
                      {card.title}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {card.summary}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
            <Card className="min-h-[30rem] rounded-xl border-0 bg-white py-0 pt-0 shadow-none md:col-span-2 md:min-h-[32rem]">
              <a href={bigCard.url} target="_blank" className="block h-full">
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  <motion.img
                    src={bigCard.image}
                    alt={bigCard.title}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="aspect-[4/3] h-full w-full object-cover"
                  />
                  <div className="absolute top-0 flex w-full items-center justify-between p-8">
                    <div className="text-lg font-bold">{bigCard.label}</div>
                    <Plus
                      size={20}
                      className="rounded-full bg-secondary p-0.5"
                    />
                  </div>
                  <div className="absolute bottom-0 flex w-full items-end justify-end bg-gradient-to-b from-black/0 to-black/95 p-10 text-right">
                    <h1 className="w-2/3 text-xl font-semibold text-secondary md:text-3xl lg:text-4xl">
                      {bigCard.title}
                    </h1>
                  </div>
                </div>
              </a>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature314 };
