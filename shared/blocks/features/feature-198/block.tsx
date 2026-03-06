import { Cable, Workflow, Wrench } from "lucide-react";

import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";

interface DataItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const DATA: DataItem[] = [
  {
    title: "Simplify Your Workflow",
    description:
      "Streamline your operations with tools designed to fit your business needs.",
    icon: <Workflow />,
    className: "absolute cursor-pointer top-0.5",
  },
  {
    title: "Eliminate Clunky Tools",
    description:
      "Replace outdated software with intuitive solutions that empower your team.",
    icon: <Wrench />,
    className: "absolute cursor-pointer -right-4 top-5 xl:top-0 xl:right-5",
  },
  {
    title: "Connect Your Workflows",
    description:
      "Integrate your tools and data to create seamless, efficient workflows.",
    icon: <Cable />,
    className: "absolute cursor-pointer bottom-2 left-[25%]",
  },
];

const CardComponent = ({
  title,
  description,
  icon,
  className,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("", className)}>
      <Card className="flex max-w-lg transform items-center gap-4 rounded-2xl p-6 shadow-lg transition-transform hover:scale-105">
        <div className="shrink-0 rounded-full bg-muted p-3.5">{icon}</div>
        <div className="font-semibold">
          <p>{title}</p>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </Card>
    </div>
  );
};

interface Feature198Props {
  className?: string;
}

const Feature198 = ({ className }: Feature198Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative py-20 md:py-24 lg:py-28">
          <h2 className="mx-auto max-w-5xl text-center text-5xl font-medium sm:text-6xl lg:text-7xl xl:text-[85px]">
            <span className="text-muted-foreground">
              Your tools should adapt to your business.{" "}
            </span>
            <span>Not the other way around.</span>
          </h2>

          <div className="lg:hidden">
            <div className="grid translate-y-4 justify-items-center gap-2">
              {DATA.map((card, index) => (
                <CardComponent
                  key={index}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                />
              ))}
            </div>
          </div>

          {/* Cards for larger screens (lg:block) */}
          <div className="absolute inset-0 max-lg:hidden">
            {DATA.map((card, index) => (
              <CardComponent
                key={index}
                title={card.title}
                description={card.description}
                icon={card.icon}
                className={card.className}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature198 };
