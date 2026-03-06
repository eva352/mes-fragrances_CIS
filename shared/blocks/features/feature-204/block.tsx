import { Combine, Gauge, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Feature204Props {
  className?: string;
}

const Feature204 = ({ className }: Feature204Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center gap-10 md:gap-24 lg:flex-row lg:items-stretch">
          <div className="grid w-full max-w-lg place-items-center rounded-2xl bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ivan-bandura-hqnUYXsN5oY-unsplash.jpg')] bg-cover bg-center bg-no-repeat px-8 py-10 sm:px-16 sm:py-20">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
              alt="placeholder"
              className="rounded-2xl"
            />
          </div>
          <div className="flex max-w-2xl flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h2 className="text-5xl font-medium text-balance lg:text-6xl">
                Unlock Your Potential with Our Platform.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Discover powerful tools and resources designed to elevate your
                projects and streamline your workflow effectively.
              </p>
              <Button size="lg" className="mt-8">
                Explore Now <Zap />
              </Button>
            </div>
            <div className="grid gap-7 sm:grid-cols-2">
              <div className="text-center lg:text-left">
                <Combine className="mx-auto size-8 lg:mx-0" />
                <h3 className="mt-4 mb-2 text-lg font-semibold">
                  Seamless Integration
                </h3>
                <p className="text-muted-foreground">
                  Integrate effortlessly with your existing tools and systems.
                </p>
              </div>
              <div className="text-center lg:text-left">
                <Gauge className="mx-auto size-8 lg:mx-0" />
                <h3 className="mt-4 mb-2 text-lg font-semibold">
                  Reliable Performance
                </h3>
                <p className="text-muted-foreground">
                  Experience consistent speed and stability for all your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature204 };
