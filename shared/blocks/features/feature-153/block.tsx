"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const integrations = [
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-icon.svg",
    title: "Shadcn UI",
    description:
      "Shadcn UI is a modern component library that streamlines the development of user interfaces.",
    info: [
      {
        title: "Component Variety",
        text: "Shadcn UI provides a diverse set of components tailored for modern web applications, enhancing development speed.",
      },
      {
        title: "Customizability",
        text: "The library allows extensive customization options, enabling developers to create unique designs without constraints.",
      },
      {
        title: "Accessibility Focus",
        text: "Shadcn UI emphasizes accessibility, ensuring that components are usable for all users, including those with disabilities.",
      },
    ],
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-icon.svg",
    title: "Figma",
    description:
      "Figma is a collaborative interface design tool that empowers teams to create and prototype.",
    info: [
      {
        title: "Real-Time Collaboration",
        text: "Figma enables multiple users to work on designs simultaneously, making it ideal for team projects.",
      },
      {
        title: "Prototyping Capabilities",
        text: "It offers powerful prototyping tools that allow designers to create interactive mockups for user testing.",
      },
      {
        title: "Designing Components",
        text: "Figma provides powerful tools for designing and building reusable components, enhancing collaboration and consistency across designs.",
      },
    ],
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-icon.svg",
    title: "Tailwind",
    description:
      "Tailwind CSS is a utility-first CSS framework that enables developers to build custom designs directly in their markup, promoting rapid development and design flexibility.",
    info: [
      {
        title: "Utility-First Approach",
        text: "Tailwind CSS promotes a utility-first approach, allowing developers to apply styles directly in their markup for rapid development.",
      },
      {
        title: "Responsive Design Made Easy",
        text: "It simplifies responsive design with built-in classes that adapt to different screen sizes effortlessly.",
      },
    ],
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/google-icon.svg",
    title: "Google",
    description:
      "Google is a leading technology company that offers a wide range of services, including search.",
    info: [
      {
        title: "Search Engine Dominance",
        text: "Google is the leading search engine, providing users with quick access to information across the web.",
      },
      {
        title: "Cloud Services",
        text: "Google Cloud offers a suite of cloud computing services, including storage, machine learning, and data analytics.",
      },
      {
        title: "Advertising Solutions",
        text: "Google Ads provides businesses with powerful tools for online advertising, targeting specific audiences effectively.",
      },
    ],
  },
];

interface Feature153Props {
  className?: string;
}

const Feature153 = ({ className }: Feature153Props) => {
  const [startIndex, setStartIndex] = useState(0);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <div className="mb-6 flex flex-col items-center gap-8 sm:flex-row sm:items-center">
            <h1 className="text-4xl font-medium">Key Features</h1>
            <div className="mb-[-32px] flex items-center gap-3">
              <CarouselPrevious
                onClick={() => setStartIndex(startIndex - 1)}
                disabled={startIndex === 0}
                className="static"
              />
              <CarouselNext
                onClick={() => setStartIndex(startIndex + 1)}
                disabled={startIndex === integrations.length - 1}
                className="static"
              />
            </div>
          </div>
          <div className="relative">
            <CarouselContent
              className="ml-6 pt-[5px] pb-5 transition-all duration-300"
              style={{
                transform: `translateX(-${startIndex * 100}%)`,
              }}
            >
              {integrations.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="flex basis-full md:basis-1/2 xl:basis-1/3"
                >
                  <div className="flex h-full flex-col justify-between rounded-xl py-14 pr-20 pl-11 shadow-[0px_0px_0px_1px_rgba(17,26,37,0.05),0px_2px_5px_rgba(16,25,36,0.1),0px_5px_20px_rgba(16,25,36,0.1)]">
                    <div className="mb-6 flex items-center gap-2">
                      <img src={item.image} alt="logo" className="h-7" />
                      <h2 className="font-semibold">{item.title}</h2>
                    </div>
                    <div className="text mb-4">{item.description}</div>
                    <div className="mb-10 flex items-center text-sm text-indigo-400">
                      Learn More <ArrowRight className="h-4" />
                    </div>
                    <div className="mt-auto flex flex-col gap-4">
                      {item.info.map((infoItem, index) => (
                        <div key={index}>
                          <h3 className="font-medium">{infoItem.title}</h3>
                          <p className="text-xs text-muted-foreground">
                            {infoItem.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="pointer-events-none absolute inset-0 left-0 w-[30px] bg-linear-to-r from-background from-10% to-transparent"></div>
            <div className="pointer-events-none absolute inset-0 bg-linear-to-l from-background via-transparent to-transparent"></div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export { Feature153 };
