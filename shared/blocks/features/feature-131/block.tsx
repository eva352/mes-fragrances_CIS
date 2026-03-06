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
  imageSrc: string;
  description: string;
}

const tabsData: ITabData[] = [
  {
    id: 1,
    title: "Performance",
    imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!",
  },
  {
    id: 2,
    title: "Innovation",
    imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!",
  },
  {
    id: 3,
    title: "Quality",
    imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!",
  },
];

interface Feature131Props {
  className?: string;
}

const Feature131 = ({ className }: Feature131Props) => {
  const [activeTabId, setActiveTabId] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>(tabsData[0].imageSrc);

  return (
    <section className={cn("py-16 md:py-24 lg:py-32", className)}>
      <div className="container">
        <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row lg:gap-16">
          <div className="w-full md:max-w-[400px]">
            <h2 className="mb-8 text-3xl font-semibold tracking-tight md:mb-12 md:text-4xl">
              Our Core Features
            </h2>
            <Accordion
              type="single"
              defaultValue="item-1"
              className="w-full"
              onValueChange={(value) => {
                const id = parseInt(value.split("-")[1]);
                setActiveTabId(id);
                setActiveImage(
                  tabsData.find((tab) => tab.id === id)?.imageSrc ||
                    tabsData[0].imageSrc,
                );
              }}
            >
              {tabsData.map((tab) => (
                <AccordionItem
                  key={tab.id}
                  value={`item-${tab.id}`}
                  className={`border-t-2 border-b-0 px-2 transition-all duration-300 ${
                    tab.id === activeTabId
                      ? "border-primary bg-accent/40"
                      : "border-muted hover:bg-accent/20"
                  }`}
                >
                  <AccordionTrigger className="cursor-pointer py-5 no-underline! transition-all">
                    <h6
                      className={`text-xl font-semibold transition-colors duration-300 ${
                        tab.id === activeTabId
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {tab.title}
                    </h6>
                  </AccordionTrigger>
                  <AccordionContent className="animate-accordion-down">
                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {tab.description}
                    </p>
                    <div className="mt-6 md:hidden">
                      <img
                        src={tab.imageSrc}
                        alt={tab.title}
                        className="h-full max-h-80 w-full rounded-md object-cover transition-transform duration-300"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="relative hidden w-full overflow-hidden rounded-md bg-accent/30 md:block">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/5 to-transparent"></div>
            <div className="pt-12 pl-12">
              <img
                src={activeImage}
                alt="Feature illustration"
                className="max-h-[490px] w-full rounded-tl-md object-cover transition-all duration-500 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature131 };
