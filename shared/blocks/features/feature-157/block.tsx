"use client";

import { cn } from "@/lib/utils";
const integrations = [
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9jsQcDsxyqA-unsplash.jpg",
    title: "Indigo Technology",
    description:
      "Enhance teamwork with our real-time collaboration tools that keep your team connected and productive.",
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-uR__S5GX8Io-unsplash.jpg",
    title: "Rapid Financial",
    description:
      "Leverage powerful analytics to make informed decisions and drive your business forward.",
  },
];

interface Feature157Props {
  className?: string;
}

const Feature157 = ({ className }: Feature157Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h4 className="mb-4 text-center text-muted-foreground/50">Services</h4>
        <h1 className="mx-auto mb-12 max-w-3xl text-center text-4xl font-semibold sm:text-5xl lg:text-[56px]">
          Our customers get results and save time
        </h1>
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
          {integrations.map((item, index) => (
            <a
              key={index}
              className="relative flex-auto basis-1 transition-opacity delay-150 duration-300 hover:opacity-80"
              href="#"
            >
              <img
                src={item.image}
                alt="logo"
                className="mb-6 aspect-[1.5] w-full rounded-2xl object-cover"
              />
              <div className="mb-2 text-2xl font-semibold">{item.title}</div>
              <div>{item.description}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature157 };
