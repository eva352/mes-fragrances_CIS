import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Feature55Props {
  className?: string;
}

const Feature55 = ({ className }: Feature55Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <h3 className="my-6 text-3xl font-semibold text-pretty md:text-4xl lg:max-w-3xl lg:text-5xl">
            This is a feature
          </h3>
          <p className="mb-8 text-muted-foreground lg:max-w-3xl lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
            doloremque mollitia fugiat omnis! Porro facilis quo animi
            consequatur. Explicabo.
          </p>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>
    </section>
  );
};

export { Feature55 };
