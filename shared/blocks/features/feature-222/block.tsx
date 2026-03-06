"use client";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

type stat = {
  number: string;
  text: string;
};

interface CardData {
  title: string;
  link: string;
  background: string;
  stats: Array<stat>;
}

const LIST: Array<CardData> = [
  {
    title: "TechCorp's Quantum Leap in AI",
    link: "#",
    background: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-5oYbG-sEImY-unsplash.jpg",
    stats: [
      {
        number: "30%",
        text: "increase in processing speed",
      },
    ],
  },
  {
    title: "GreenTech's Path to Carbon Neutrality by 2025",
    link: "#",
    background: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-o9F8dRoSucM-unsplash.jpg",
    stats: [
      {
        number: "50%",
        text: "reduction in carbon emissions",
      },
    ],
  },
  {
    title: "FinServe's Blockchain Security Revolution",
    link: "#",
    background: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-K1W9OjEgacI-unsplash.jpg",
    stats: [
      {
        number: "60%",
        text: "decrease in fraud cases",
      },
    ],
  },
  {
    title: "EduWorld's VR Learning Transformation",
    link: "#",
    background: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-gDmVqxZt1hg-unsplash.jpg",
    stats: [
      {
        number: "80%",
        text: "increase in student engagement",
      },
    ],
  },
  {
    title: "HealthPlus's Telemedicine Innovation",
    link: "#",
    background: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-sutfgh5DNIU-unsplash.jpg",
    stats: [
      {
        number: "25%",
        text: "increase in patient satisfaction",
      },
    ],
  },
  {
    title: "Ecolands's Sustainable Land Development",
    link: "#",
    background: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-ZXLGP2Qh3Mo-unsplash.jpg",
    stats: [
      {
        number: "30%",
        text: "increase in land productivity",
      },
    ],
  },
];

const Card = ({ link, background, title, stats }: CardData) => {
  return (
    <a
      href={link}
      style={{ backgroundImage: `url(${background})` }}
      className="before:content-[] relative min-h-auto w-full overflow-hidden rounded-[.5rem] bg-black/80 bg-cover bg-center bg-no-repeat p-5 transition-all duration-300 before:absolute before:top-0 before:left-0 before:z-10 before:block before:size-full before:bg-black/50 before:transition-all before:duration-300 hover:before:bg-black/30 sm:aspect-square md:aspect-auto md:min-h-[30rem] md:max-w-[30rem]"
    >
      <div className="relative z-20 flex size-full flex-col justify-between gap-20 md:gap-16">
        <div className="text-2xl leading-[1.2] font-normal text-white md:text-3xl">
          {title}
        </div>
        <div className="flex w-full flex-col gap-8">
          <div className="flex gap-8 text-white">
            {stats.map((item, i) => (
              <div key={`${title}-${i}`} className="flex flex-col gap-1">
                <div className="text-[1.15rem] md:text-xl">{item.number}</div>
                <div className="text-sm opacity-80">{item.text}</div>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-fit">
            Read Story
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
      </div>
    </a>
  );
};

interface Feature222Props {
  className?: string;
}

const Feature222 = ({ className }: Feature222Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {LIST.map((item, i) => (
            <Card key={`feature-222-${i}`} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature222 };
