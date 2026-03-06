import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature79Props {
  className?: string;
}

const Feature79 = ({ className }: Feature79Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container flex flex-col items-center gap-16 sm:gap-20 md:gap-24 lg:px-16">
        <div className="text-center">
          <p className="mb-6 text-xs font-medium tracking-wider uppercase">
            Tag Line
          </p>
          <h3 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            Feature group
          </h3>
          <p className="text-muted-foreground lg:max-w-2xl lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
            doloremque mollitia fugiat omnis! Porro facilis quo animi
            consequatur. Explicabo.
          </p>
        </div>
        <div className="flex flex-col gap-y-12 md:col-span-2 md:grid md:grid-cols-2 md:gap-x-6 lg:gap-8">
          <a
            href="#"
            className="group overflow-clip rounded-t-xl border border-border transition-shadow hover:shadow-lg md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]"
          >
            <div>
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                alt="placeholder"
                className="aspect-16/9 h-full w-full object-cover object-center"
              />
            </div>
            <div className="px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
              <p className="mb-6 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                Featured
              </p>
              <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                Cras sagittis sollicitudin lobortis
              </h3>
              <p className="mb-8 text-muted-foreground lg:text-lg">
                Nam vitae molestie arcu. Quisque eu libero orci. Aliquam
                imperdiet magna nec massa consectetur, id interdum ante congue.
              </p>
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </a>
          <div className="flex flex-col justify-between gap-y-12 md:px-8 lg:px-10">
            <a
              href="#"
              className="group flex flex-col justify-between gap-4 border border-border px-8 py-8 md:flex-row md:items-center md:border-0 md:border-b md:px-0 md:py-10 lg:py-12"
            >
              <h3 className="mb-3 text-lg font-semibold md:mb-0 md:text-xl">
                Quisque eu libero orci. Aliquam imperdiet magna nec massa
                consectetur
              </h3>
              <div className="flex w-fit items-center rounded-full border-0 border-border transition-transform group-hover:translate-x-1 md:border md:px-6 md:py-3 md:group-hover:bg-primary md:group-hover:text-primary-foreground">
                <ArrowRight className="size-4" />
              </div>
            </a>
            <a
              href="#"
              className="group flex flex-col justify-between gap-4 border border-border px-8 py-8 md:flex-row md:items-center md:border-0 md:border-b md:px-0 md:py-10 lg:py-12"
            >
              <h3 className="mb-3 text-lg font-semibold md:mb-0 md:text-xl">
                Aliquam imperdiet magna nec massa consectetur
              </h3>
              <div className="flex w-fit items-center rounded-full border-0 border-border transition-transform group-hover:translate-x-1 md:border md:px-6 md:py-3 md:group-hover:bg-primary md:group-hover:text-primary-foreground">
                <ArrowRight className="size-4" />
              </div>
            </a>
            <a
              href="#"
              className="group flex flex-col justify-between gap-4 border border-border px-8 py-8 md:flex-row md:items-center md:border-0 md:border-b md:px-0 md:py-10 lg:py-12"
            >
              <h3 className="mb-3 text-lg font-semibold md:mb-0 md:text-xl">
                Nam vitae molestie arcu. Quisque eu libero orci
              </h3>
              <div className="flex w-fit items-center rounded-full border-0 border-border transition-transform group-hover:translate-x-1 md:border md:px-6 md:py-3 md:group-hover:bg-primary md:group-hover:text-primary-foreground">
                <ArrowRight className="size-4" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature79 };
