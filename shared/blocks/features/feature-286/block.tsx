import { ShoppingCartIcon } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { GlowingStarsBackgroundCard } from "@/components/aceternity/glowing-stars";
import { Button } from "@/components/ui/button";

const cardData = [
  {
    title: "June Collection",
    price: "$129",
    link: "#",
    className: "md:col-span-1",
  },
  {
    title: "Summer Essentials",
    price: "$89",
    link: "#",
    className: "md:col-span-1",
  },
  {
    title: "Premium Bundle",
    price: "$199",
    link: "#",
    className: "md:col-span-1",
  },
];

interface Feature286Props {
  className?: string;
}

const Feature286 = ({ className }: Feature286Props) => {
  return (
    <section
      className={cn(
        "dark overflow-hidden bg-background py-32 text-foreground",
        className,
      )}
    >
      <div className="container flex w-full flex-col items-center justify-center px-4">
        <p className="mb-4 rounded-full bg-muted px-2 py-1 text-xs uppercase">
          INTEGRATIONS
        </p>
        <h2 className="relative py-2 text-center font-sans text-5xl font-semibold tracking-tighter lg:text-6xl">
          Integrate with your fav apps
        </h2>
        <p className="text-md mx-auto mt-5 max-w-xl px-5 text-center text-muted-foreground lg:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut
        </p>

        <div className="mt-10 grid w-full max-w-5xl grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="flex flex-col rounded-3xl bg-muted/60 p-4"
            >
              <GlowingStarsBackgroundCard className="h-55 border-none !bg-none" />

              <div className="mt-3 flex items-center justify-start gap-3">
                <h3 className="text-2xl font-semibold tracking-tighter">
                  {card.title}
                </h3>
                <span className="inline-block rounded-xl bg-muted-foreground/20 px-3 text-sm text-foreground/60">
                  50+
                </span>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div className="flex h-full items-center justify-center gap-2 rounded-full bg-muted-foreground/20 px-7 text-sm">
                  Add to cart
                  <ShoppingCartIcon className="size-4" />
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground">
                    Starting At
                  </span>
                  <h3 className="-mt-1 text-2xl font-semibold tracking-tight">
                    {card.price}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="secondary" className="mt-10 h-10 rounded-full !px-5">
          View All Collections
        </Button>
      </div>
    </section>
  );
};

export { Feature286 };
