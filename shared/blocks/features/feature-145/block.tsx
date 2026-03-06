"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ITabData {
  id: number;
  title: string;
  imageSrc: string[];
  description: string;
}

const tabsData: ITabData[] = [
  {
    id: 1,
    title: "Title 1",
    imageSrc: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    ],
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam repellat officiis culpa, quis veniam incidunt illum vitae saepe dolore doloremque magni exercitationem aut facere eos quam odit et voluptatum dolorem?",
  },
  {
    id: 2,
    title: "Title 2",
    imageSrc: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    ],
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam repellat officiis culpa, quis veniam incidunt illum vitae saepe dolore doloremque magni exercitationem aut facere eos quam odit et voluptatum dolorem?",
  },
  {
    id: 3,
    title: "Title 3",
    imageSrc: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    ],
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam repellat officiis culpa, quis veniam incidunt illum vitae saepe dolore doloremque magni exercitationem aut facere eos quam odit et voluptatum dolorem?",
  },
];

interface Feature145Props {
  className?: string;
}

const Feature145 = ({ className }: Feature145Props) => {
  const [activeTabId, setActiveTabId] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<string[]>(
    tabsData[0].imageSrc,
  );

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="m-auto mb-24 max-w-xl">
          <h2 className="mb-6 text-center text-3xl font-semibold lg:text-5xl">
            <span className="text-muted-foreground">Build</span> your website
            with UI blocks.
          </h2>
          <p className="m-auto max-w-3xl text-center text-lg lg:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro et,
            ipsa numquam asperiores tempora voluptatibus officia culpa eaque
            odit.
          </p>
          <a
            className="mx-auto mt-8 block w-fit rounded-full border-2 border-muted bg-background px-6 py-4 text-sm font-semibold transition hover:border-muted-foreground"
            href="#"
          >
            Get Started
          </a>
        </div>
        <div className="mb-12 flex w-full items-start justify-between gap-28">
          <div className="w-full md:w-1/2">
            <Accordion type="single" className="w-full" defaultValue="item-1">
              {tabsData.map((tab) => (
                <AccordionItem
                  key={tab.id}
                  value={`item-${tab.id}`}
                  className={`border-t-2 border-b-0 px-2 transition hover:bg-accent ${tab.id === activeTabId && "border-foreground"}`}
                >
                  <AccordionTrigger
                    onClick={() => {
                      setActiveImage(tab.imageSrc);
                      setActiveTabId(tab.id);
                    }}
                    className="cursor-pointer py-5 no-underline! transition"
                  >
                    <h6
                      className={`text-xl font-semibold ${tab.id === activeTabId ? "text-black" : "text-muted-foreground"}`}
                    >
                      {tab.title}
                    </h6>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mt-3 text-muted-foreground">
                      {tab.description}
                    </p>
                    <div className="mt-4 md:hidden">
                      <img
                        src={tab.imageSrc[0]}
                        alt="placeholder"
                        className="h-full max-h-80 w-full rounded-md object-cover"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="relative m-auto hidden w-1/2 overflow-hidden rounded-xl bg-muted-foreground/5 px-10 py-12 before:absolute before:inset-0 before:z-[-1] before:bg-primary/50 before:[mask-image:url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/dot-pattern.svg')] before:[mask-size:15px] before:[mask-repeat:repeat] md:block">
            <div className="flex min-h-96 w-full items-center justify-center px-3">
              <img
                src={activeImage[0]}
                alt="placeholder"
                className="aspect-[1.2] w-1/2 rounded-md object-cover pl-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature145 };
