import { cn } from "@/lib/utils";

interface Feature66Props {
  className?: string;
}

const Feature66 = ({ className }: Feature66Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container flex flex-col items-start gap-8 lg:gap-12 lg:px-16">
        <h3 className="text-3xl font-semibold text-pretty md:text-4xl lg:max-w-3xl lg:text-5xl">
          Feature group
        </h3>
        <div className="grid w-full grid-cols-1 gap-4 max-md:grid-rows-[1fr_1fr] md:grid-cols-2 lg:gap-6">
          <a href="#" className="h-full">
            <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl bg-red-100 md:aspect-5/4 lg:aspect-16/9">
              <img
                src="https://images.unsplash.com/photo-1548324215-9133768e4094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMzF8fHx8fHwyfHwxNzIzNDM1MzA1fA&ixlib=rb-4.0.3&q=80&w=1080"
                alt="placeholder"
                className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 mt-auto max-h-[50%] min-h-[50%] bg-[linear-gradient(transparent,var(--primary)_80%)] mix-blend-multiply" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-primary-foreground md:p-8">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg"
                  alt="placeholder logo"
                  className="mb-3 h-8 invert"
                />
                <p className="text-xl font-semibold text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </a>
          <a href="#" className="h-full">
            <div className="group relative h-full min-h-[27rem] w-full overflow-hidden rounded-xl md:aspect-5/4 lg:aspect-16/9">
              <img
                src="https://images.unsplash.com/photo-1550070881-a5d71eda5800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjV8fHx8fHwyfHwxNzIzNDM1Mjk4fA&ixlib=rb-4.0.3&q=80&w=1080"
                alt="placeholder"
                className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-x-0 bottom-0 mt-auto max-h-[50%] min-h-[50%] bg-[linear-gradient(transparent,var(--primary)_80%)] mix-blend-multiply" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-primary-foreground md:p-8">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/nextjs-wordmark.svg"
                  alt="placeholder logo"
                  className="mb-3 h-8 invert"
                />
                <p className="text-xl font-semibold text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export { Feature66 };
