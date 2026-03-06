"use client";

import { cn } from "@/lib/utils";
const items = [
  {
    title: "Performance",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi necessitatibus, culpa at vitae molestias tenetur explicabo. Voluptatum amet architecto suscipit pariatur eligendi repellendus mollitia dolore unde sint?",
  },
  {
    title: "Quality",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi necessitatibus, culpa at vitae molestias tenetur explicabo. Voluptatum amet architecto suscipit pariatur eligendi repellendus mollitia dolore unde sint?",
  },
  {
    title: "Accessibility",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi necessitatibus, culpa at vitae molestias tenetur explicabo. Voluptatum amet architecto suscipit pariatur eligendi repellendus mollitia dolore unde sint?",
  },
  {
    title: "Integrations",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi necessitatibus, culpa at vitae molestias tenetur explicabo. Voluptatum amet architecto suscipit pariatur eligendi repellendus mollitia dolore unde sint?",
  },
];

interface Feature123Props {
  className?: string;
}

const Feature123 = ({ className }: Feature123Props) => {
  return (
    <section
      className={cn(
        "m-x-auto container flex flex-col gap-20 py-32 lg:flex-row",
        className,
      )}
    >
      <div className="w-full max-w-[400px]">
        <span className="text-sm text-muted-foreground uppercase">
          Build with blocks
        </span>
        <h2 className="mt-4 mb-8 text-3xl font-extrabold">
          Built with the latest technology stack
        </h2>
        <p className="text-xl text-muted-foreground">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt,
          accusantium quam.
        </p>
      </div>
      <div className="flex flex-col gap-14 lg:gap-20">
        {items.map((item) => (
          <div className="relative pl-4" key={item.title}>
            <div className="absolute top-0 left-0 h-full w-1 bg-linear-to-b from-blue-500 to-purple-500" />
            <p className="mb-1 text-xl font-medium">{item.title}</p>
            <p className="text-base">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export { Feature123 };
