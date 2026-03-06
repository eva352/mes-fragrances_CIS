"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const integrations = [
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    title: "Sales efficiency",
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    title: "Revenue metrics",
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    title: "PLG monitoring",
  },
];

interface Feature164Props {
  className?: string;
}

const Feature164 = ({ className }: Feature164Props) => {
  const [cardNumber, setCardNumber] = useState(0);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <Tabs className="p-3 lg:w-1/2" defaultValue="0">
            <div className="mb-8">
              {integrations.map((item, index) => (
                <TabsContent key={index} value={index.toString()}>
                  <img
                    src={item.image}
                    className="aspect-[1] rounded-3xl object-cover"
                    alt={integrations[cardNumber].title}
                  />
                </TabsContent>
              ))}
            </div>
            <TabsList className="flex h-full items-center justify-center gap-2 bg-transparent p-0">
              {integrations.map((item, index) => (
                <TabsTrigger
                  key={index}
                  value={index.toString()}
                  className={`rounded-xl border px-3 py-2 ${index === cardNumber && "border-black bg-gray-50"} text-xs hover:border-black sm:text-base`}
                  onClick={() => setCardNumber(index)}
                >
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="flex flex-col items-end justify-center p-3 lg:w-1/2">
            <div className="max-w-md">
              <h1 className="mb-4 text-3xl font-semibold sm:text-5xl">
                <span className="text-muted-foreground/50">
                  Real-time data.
                </span>{" "}
                Dynamic reporting.
              </h1>
              <p className="mb-6 text-xl">
                Quickly create reports to get deeper insights into your data
                with Attio’s powerful reporting suite.
              </p>
              <Button>Learn more</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature164 };
