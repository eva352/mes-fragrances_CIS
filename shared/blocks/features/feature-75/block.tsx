import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature75Props {
  className?: string;
}

const Feature75 = ({ className }: Feature75Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container grid gap-y-12 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
        <div className="md:col-span-6 lg:col-span-5">
          <h2 className="mb-3 text-xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            Feature name
          </h2>
          <p className="mb-8 text-muted-foreground lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
            doloremque mollitia fugiat omnis! Porro facilis quo animi
            consequatur. Explicabo.
          </p>
        </div>
        <div className="grid gap-y-5 md:col-span-6 md:gap-y-[1.875rem] lg:col-start-7">
          <a
            href="#"
            className="group flex flex-col justify-center overflow-clip rounded-2xl bg-accent px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12"
          >
            <p className="mb-3 text-xs font-medium tracking-wider uppercase">
              Tag Line
            </p>
            <p className="mb-12 font-semibold text-muted-foreground lg:text-xl">
              Nam vitae molestie arcu. Quisque eu libero orci. Aliquam imperdiet
              magna nec massa consectetur, id interdum ante congue.
            </p>
            <div className="flex w-fit items-center gap-4 rounded-full border border-primary px-6 py-4 group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />{" "}
              Learn more
            </div>
          </a>
          <a
            href="#"
            className="group flex flex-col justify-center overflow-clip rounded-2xl bg-accent px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12"
          >
            <p className="mb-3 text-xs font-medium tracking-wider uppercase">
              Tag Line
            </p>
            <p className="mb-12 font-semibold text-muted-foreground lg:text-xl">
              Nam vitae molestie arcu. Quisque eu libero orci. Aliquam imperdiet
              magna nec massa consectetur, id interdum ante congue.
            </p>
            <div className="flex w-fit items-center gap-4 rounded-full border border-primary px-6 py-4 group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />{" "}
              Learn more
            </div>
          </a>
          <a
            href="#"
            className="group flex flex-col justify-center overflow-clip rounded-2xl bg-accent px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12"
          >
            <p className="mb-3 text-xs font-medium tracking-wider uppercase">
              Tag Line
            </p>
            <p className="mb-12 font-semibold text-muted-foreground lg:text-xl">
              Nam vitae molestie arcu. Quisque eu libero orci. Aliquam imperdiet
              magna nec massa consectetur, id interdum ante congue.
            </p>
            <div className="flex w-fit items-center gap-4 rounded-full border border-primary px-6 py-4 group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />{" "}
              Learn more
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export { Feature75 };
