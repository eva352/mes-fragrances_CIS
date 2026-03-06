import { cn } from "@/lib/utils";

const features = [
  {
    id: "feature-1",
    title: "Feature 1",
    description: "Nam vitae molestie arcu. Quisque eu libero orci.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    id: "feature-2",
    title: "Feature 2",
    description: "Nam vitae molestie arcu. Quisque eu libero orci.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    id: "feature-3",
    title: "Feature 3",
    description: "Nam vitae molestie arcu. Quisque eu libero orci.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    id: "feature-4",
    title: "Feature 4",
    description: "Nam vitae molestie arcu. Quisque eu libero orci.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
  {
    id: "feature-5",
    title: "Feature 5",
    description: "Nam vitae molestie arcu. Quisque eu libero orci.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
  },
  {
    id: "feature-6",
    title: "Feature 6",
    description: "Nam vitae molestie arcu. Quisque eu libero orci.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
  },
];

interface Feature63Props {
  className?: string;
}

const Feature63 = ({ className }: Feature63Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <h3 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            Feature group
          </h3>
          <p className="text-muted-foreground lg:max-w-3xl lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
            doloremque mollitia fugiat omnis! Porro facilis quo animi
            consequatur. Explicabo.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="rounded-lg border border-border bg-accent p-6 md:p-8"
            >
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                alt="placeholder"
                className="mb-6 aspect-16/9 md:mb-8 lg:w-full"
              />
              <div className="flex flex-col">
                <p className="mb-2 text-sm font-semibold md:text-base">
                  {feature.title}
                </p>
                <p className="text-sm text-muted-foreground md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature63 };
