import { ArrowRight } from "@/components/icons";

import { cn } from "@/lib/utils";

interface Feature81Props {
  className?: string;
}

const Feature81 = ({ className }: Feature81Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container flex flex-col items-center gap-8 md:gap-16 lg:px-16">
        <div className="flex flex-col items-center text-center">
          <p className="mb-6 text-xs font-medium tracking-wider uppercase">
            Tag Line
          </p>
          <h3 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            Feature group
          </h3>
          <p className="mb-8 text-muted-foreground lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
            doloremque mollitia fugiat omnis! Porro facilis quo animi
            consequatur. Explicabo.
          </p>
        </div>
        <div className="grid w-full grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          <a
            href="#"
            className="group relative col-span-2 overflow-clip rounded-lg sm:max-lg:col-span-1"
          >
            <img
              src="/blocks/features/feature-81/photo-1536735561749-fc87494598cb"
              alt="placeholder"
              className="absolute h-full w-full object-cover object-center"
            />
            <div className="relative flex h-full w-full flex-col items-start justify-between gap-4 bg-black/60 px-4 py-5 transition-colors hover:bg-black/70 sm:aspect-[3/2] md:p-6 lg:p-8">
              <img
                src="/blocks/features/feature-81/shadcn-ui-wordmark.svg"
                alt="placeholder logo"
                className="mb-8 h-6 max-w-48 invert sm:h-8 md:h-10"
              />
              <div className="flex items-center text-xs font-medium text-white md:text-base lg:text-lg">
                Read more{" "}
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </a>
          <a href="#" className="group relative overflow-clip rounded-lg">
            <img
              src="/blocks/features/feature-81/photo-1548324215-9133768e4094"
              alt="placeholder"
              className="absolute h-full w-full object-cover object-center"
            />
            <div className="relative flex h-full w-full flex-col items-start justify-between gap-4 bg-black/60 px-4 py-5 transition-colors hover:bg-black/70 sm:aspect-[3/2] md:p-6 lg:p-8">
              <img
                src="/blocks/features/feature-81/astro-wordmark.svg"
                alt="placeholder logo"
                className="mb-8 h-6 invert sm:h-8 md:h-10"
              />
              <div className="flex items-center text-xs font-medium text-white md:text-base lg:text-lg">
                Read more{" "}
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </a>
          <a href="#" className="group relative overflow-clip rounded-lg">
            <img
              src="/blocks/features/feature-81/photo-1550070881-a5d71eda5800"
              alt="placeholder"
              className="absolute h-full w-full object-cover object-center"
            />
            <div className="relative flex h-full w-full flex-col items-start justify-end gap-4 bg-black/50 px-4 py-5 transition-colors hover:bg-black/70 sm:aspect-[2/1] md:p-6 lg:p-8">
              <div className="flex items-center justify-end text-xs font-medium text-white md:text-base lg:text-lg">
                Read more{" "}
                <ArrowRight className="ml-2 size-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export { Feature81 };

export default Feature81;
