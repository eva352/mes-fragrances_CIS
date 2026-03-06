import { Code, GitBranch, List, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

const integrations = [
  {
    icon: <Code className="h-5 w-5" />,
    title: "Code Snippets",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam corporis, inventore explicabo",
  },
  {
    icon: <GitBranch className="h-5 w-5" />,
    title: "Version Control",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam corporis, inventore explicabo dolores facilis",
  },
  {
    icon: <List className="h-5 w-5" />,
    title: "Task Management",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam corporis.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "UI Components",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam corporis, inventore explicabo dolores facilis voluptates",
  },
];

interface Feature159Props {
  className?: string;
}

const Feature159 = ({ className }: Feature159Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-wrap items-start justify-between border-b pb-16">
          {integrations.map((item, index, arr) => (
            <div
              key={index}
              className="flex shrink grow basis-full flex-col items-start justify-between p-6 md:basis-1/2 lg:basis-1/4"
            >
              <div className="mb-3 flex items-center justify-start gap-3">
                {item.icon}
                <h1 className="text-lg font-semibold">{item.title}</h1>
              </div>
              <p className="text-sm text-muted-foreground/50">{item.text}</p>
              {arr.length - 1 === index && (
                <div className="mt-5 w-auto cursor-pointer self-start border-b text-sm">
                  See all
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature159 };
