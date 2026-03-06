import { Calendar } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface DataItem {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
}

const DATA: DataItem[] = [
  {
    id: 1,
    number: "01",
    title: "Streamline your workflow",
    description:
      "Automate repetitive tasks and focus on what truly matters for your business growth.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  },
  {
    id: 2,
    number: "02",
    title: "Collaborate seamlessly",
    description:
      "Work together with your team in real-time, no matter where you are.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  },
  {
    id: 3,
    number: "03",
    title: "Scale effortlessly",
    description:
      "Our tools grow with your business, ensuring you’re always ready for the next step.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  },
];

interface Feature191Props {
  className?: string;
}

const Feature191 = ({ className }: Feature191Props) => {
  return (
    <section className={cn("bg-accent py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center pb-4 text-center">
          <div>
            <span className="my-3 mb-4 flex items-center justify-center">
              <Badge variant="outline" className="bg-background px-3 py-1">
                <Calendar className="mr-2 h-4 w-4" />
                <p className="text-xs text-black">Why choose us?</p>
              </Badge>
            </span>
          </div>
          <h1 className="pb-3 text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
            Empower your business with our solutions
          </h1>
          <p className="max-w-md text-sm text-muted-foreground lg:max-w-2xl lg:text-lg">
            Discover how our tools can transform your workflow and help you
            achieve your goals faster.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-4 grid grid-cols-1 gap-4 px-4 sm:px-6 md:grid-cols-2 md:px-8 lg:grid-cols-3 lg:px-12">
          {DATA.map((feature) => (
            <div
              key={feature.id}
              className="grid grid-cols-1 rounded-2xl border bg-background shadow-sm"
            >
              <div className="p-6">
                <Badge className="rounded-sm bg-muted-foreground py-2 font-mono">
                  {feature.number}
                </Badge>
                <p className="text-md my-4 font-semibold">{feature.title}</p>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
              <div className="mt-auto flex min-h-[200px] justify-center rounded-b-2xl">
                <div className="h-[200px] w-full">
                  <img
                    src={feature.image}
                    alt="placeholder"
                    className="h-full w-full rounded-b-2xl object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature191 };
