import { Bolt, Cloud, Star } from "lucide-react";

import { cn } from "@/lib/utils";

const features = [
  {
    id: "feature-1",
    title: "Feature 1",
    description:
      "Nam vitae molestie arcu. Quisque eu libero orci. Aliquam imperdiet magna nec massa consectetur, id interdum ante congue.",
    icon: Cloud,
  },
  {
    id: "feature-2",
    title: "Feature 2",
    description:
      "Nam vitae molestie arcu. Quisque eu libero orci. Aliquam imperdiet magna nec massa consectetur, id interdum ante congue.",
    icon: Star,
  },
  {
    id: "feature-3",
    title: "Feature 3",
    description:
      "Nam vitae molestie arcu. Quisque eu libero orci. Aliquam imperdiet magna nec massa consectetur, id interdum ante congue.",
    icon: Bolt,
  },
];

interface Feature58Props {
  className?: string;
}

const Feature58 = ({ className }: Feature58Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-x-20 rounded-lg border border-border bg-accent p-6 md:grid-cols-2 md:p-8 lg:p-16">
          <div className="mb-8 flex justify-center lg:justify-start xl:mb-0">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
              alt="placeholder"
              className="aspect-square h-full w-full rounded-md object-cover object-center"
            />
          </div>
          <ul className="flex flex-col justify-center gap-y-8">
            {features.map((feature) => (
              <li key={feature.id} className="flex">
                <feature.icon className="mr-3 size-5 shrink-0 lg:mr-6 lg:size-6" />
                <div>
                  <div className="mb-3 h-5 text-sm font-semibold text-accent-foreground md:text-base">
                    {feature.title}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground md:text-base">
                    {feature.description}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Feature58 };
