import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature188Props {
  className?: string;
}

const Feature188 = ({ className }: Feature188Props) => {
  const resources = [
    {
      title: "Explore ready-to-use templates",
      description:
        "Choose from hundreds of pre-designed templates tailored to your needs",
      href: "#",
      imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg",
    },
    {
      title: "Discover the power of No Code",
      description:
        "Understand how no-code platforms are revolutionizing software development",
      href: "#",
      imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg",
    },
    {
      title: "Connect with a certified expert",
      description:
        "Get professional help from our network of certified experts",
      href: "#",
      imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg",
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="text-center text-4xl font-medium sm:text-5xl lg:text-6xl">
          Kickstart your journey with us
        </h2>

        <div className="mx-auto mt-12 max-w-5xl rounded-2xl border">
          {resources.map((resource, index) => (
            <div
              key={index}
              className={`${index !== resources.length - 1 ? "border-b" : ""}`}
            >
              <a
                href={resource.href}
                className="flex flex-col p-4 md:flex-row md:items-center md:justify-between lg:p-6"
              >
                <div className="flex items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted p-2 lg:h-14 lg:w-14">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-semibold lg:text-xl">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-muted-foreground lg:text-lg">
                      {resource.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 shrink-0 md:mt-0 md:w-60">
                  <div className="aspect-w-16 aspect-h-9 rounded-lg bg-muted">
                    <img
                      src={resource.imageSrc}
                      alt={resource.title}
                      className="h-full w-full rounded-md object-cover"
                    />
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature188 };
