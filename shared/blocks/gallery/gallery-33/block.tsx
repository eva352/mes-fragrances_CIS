"use client";

import { ArrowRightIcon, HeartIcon } from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

import { Lens } from "@/components/aceternity/lens";

interface CardData {
  title: string;
  price: string;
  image: string;
  link: string;
}

const Gallery33 = ({
  cardData = [
    {
      title: "June Collection",
      price: "$150",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img1.jpeg",
      link: "#",
    },
    {
      title: "Summer Essentials",
      price: "$89",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img2.jpeg",
      link: "#",
    },
    {
      title: "Premium Bundle",
      price: "$299",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img3.jpeg",
      link: "#",
    },
    {
      title: "New Arrivals",
      price: "$120",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img4.jpeg",
      link: "#",
    },
    {
      title: "Limited Edition",
      price: "$199",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img27.jpeg",
      link: "#",
    },
    {
      title: "Exclusive Set",
      price: "$249",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img13.jpeg",
      link: "#",
    },
  ],
  className,
}: {
  cardData?: CardData[];
  className?: string;
}) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container w-full">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="relative flex flex-col rounded-4xl bg-muted/60 p-2"
            >
              <Lens
                hovering={hoveredCard === index}
                setHovering={(hovering) =>
                  setHoveredCard(hovering ? index : null)
                }
              >
                <img
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  src={card.image}
                  alt={card.title}
                  className="h-72 w-full rounded-3xl object-cover"
                />
              </Lens>
              <div className="mt-3 flex items-center justify-between gap-3 px-2 pb-3">
                <div>
                  <p className="text-sm tracking-tighter text-muted-foreground">
                    {card.title}
                  </p>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {card.price}
                  </h3>
                </div>
                <a
                  href={card.link}
                  className="flex size-12 items-center justify-center gap-2 rounded-full bg-muted-foreground/10 text-sm transition-all duration-300 hover:bg-muted-foreground/20"
                >
                  <ArrowRightIcon className="size-7 -rotate-45 stroke-1" />
                </a>
              </div>
              <div className="absolute top-4 right-4 z-20">
                <div className="flex size-12 items-center justify-center gap-2 rounded-full bg-background/30 text-sm text-background transition-all duration-300 hover:bg-background/50">
                  <HeartIcon className="size-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery33 };
