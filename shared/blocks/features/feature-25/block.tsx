import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const sections = [
  {
    title: "Manage your projects",
    items: [
      "Lorem ipsum dolor sit",
      "Amet consectetur adipisicing elit",
      "Dolores itaque modi quos",
      "Hic placeat laudantium inventore",
      "Odio dignissimos quibusdam",
      "Autem quae eveniet voluptatibus",
      "Similique illum. Iure perspiciatis",
      "Impedit culpa error earum in quas",
      "Nisi inventore minus voluptatem",
    ],
  },
  {
    title: "Customize your website easily",
    items: [
      "Lorem ipsum dolor sit",
      "Amet consectetur adipisicing elit",
      "Dolores itaque modi quos",
      "Hic placeat laudantium inventore",
      "Odio dignissimos quibusdam",
      "Autem quae eveniet voluptatibus",
      "Similique illum. Iure perspiciatis",
      "Impedit culpa error earum in quas",
      "Nisi inventore minus voluptatem",
    ],
  },
  {
    title: "Style your components",
    items: [
      "Lorem ipsum dolor sit",
      "Amet consectetur adipisicing elit",
      "Dolores itaque modi quos",
      "Hic placeat laudantium inventore",
      "Odio dignissimos quibusdam",
      "Autem quae eveniet voluptatibus",
      "Similique illum. Iure perspiciatis",
      "Impedit culpa error earum in quas",
      "Nisi inventore minus voluptatem",
    ],
  },
];

interface Feature25Props {
  className?: string;
}

const Feature25 = ({ className }: Feature25Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
          <Badge variant="outline">Overview</Badge>
          <h2 className="mb-2 text-center text-3xl font-semibold lg:text-4xl">
            Built awesome websites with our blocks
          </h2>
          <p className="text-center text-muted-foreground lg:text-lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit dolores
            itaque.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          {sections.map((section, idx) => (
            <div key={idx} className="w-full max-w-96 lg:max-w-none">
              <Separator className="my-16 w-full" />
              <div className="mx-auto inline-block w-full gap-x-10 lg:grid lg:grid-cols-4">
                <h3 className="mb-4 text-2xl font-semibold lg:text-3xl">
                  {section.title}
                </h3>
                <ul className="col-span-3 grid gap-x-10 gap-y-4 lg:grid-cols-3">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex gap-1 text-muted-foreground">
                      <Check className="mr-2 inline-block w-4" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature25 };
