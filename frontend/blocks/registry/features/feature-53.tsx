import { cn } from "@/lib/utils";

const items = [
  {
    title: "Next.js",
    image: (
      <img
        src="/blocks/features/feature-53/nextjs-wordmark.svg"
        alt="next.js"
        className="mt-2.5 max-h-12 lg:mt-0 dark:invert"
      />
    ),
  },
  {
    title: "React",
    image: (
      <img
        src="/blocks/features/feature-53/react-wordmark.svg"
        alt="react"
        className="mt-2.5 max-h-9 lg:mt-0 lg:max-h-12"
      />
    ),
  },
  {
    title: "Shadcn/ui",
    image: (
      <img
        src="/blocks/features/feature-53/shadcn-ui-wordmark.svg"
        alt="shadcn/ui"
        className="mt-2.5 max-h-5 lg:mt-0 lg:max-h-7 dark:invert"
      />
    ),
  },
  {
    title: "Supabase",
    image: (
      <>
        <img
          src="/blocks/features/feature-53/supabase-wordmark.svg"
          alt="supabase"
          className="mt-2.5 max-h-6 lg:mt-0 lg:max-h-9 dark:hidden"
        />
        <img
          src="/blocks/features/feature-53/supabase-wordmark-dark.svg"
          alt="supabase"
          className="mt-2.5 hidden max-h-6 lg:mt-0 lg:max-h-9 dark:block"
        />
      </>
    ),
  },
  {
    title: "Vercel",
    image: (
      <img
        src="/blocks/features/feature-53/vercel-wordmark.svg"
        className="mt-2.5 max-h-5 lg:mt-0 lg:max-h-8 dark:invert"
        alt="vercel"
      />
    ),
  },
  {
    title: "Tailwind",
    image: (
      <>
        <img
          src="/blocks/features/feature-53/tailwind-wordmark-light.svg"
          alt="tailwind"
          className="mt-2.5 max-h-5 lg:mt-0 lg:max-h-6 dark:hidden"
        />
        <img
          src="/blocks/features/feature-53/tailwind-wordmark-dark.svg"
          alt="tailwind"
          className="mt-2.5 hidden max-h-5 lg:mt-0 lg:max-h-6 dark:block"
        />
      </>
    ),
  },
  {
    title: "Astro",
    image: (
      <img
        src="/blocks/features/feature-53/astro-wordmark.svg"
        alt="astro"
        className="mt-2.5 max-h-7 lg:mt-0 lg:max-h-9 dark:invert"
      />
    ),
  },
  {
    title: "GitHub",
    image: (
      <img
        src="/blocks/features/feature-53/github-wordmark.svg"
        alt="github"
        className="mt-2.5 max-h-6 lg:mt-0 lg:max-h-9 dark:invert"
      />
    ),
  },
];

interface Feature53Props {
  className?: string;
}

const Feature53 = ({ className }: Feature53Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
          {items.map((item, index) => (
            <div key={index} className="bg-background">
              <div className="relative mx-4 flex min-h-[150px] flex-col items-center justify-center lg:min-h-[280px]">
                <p className="absolute top-4 left-0 font-mono text-xs">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className="ml-2">{item.title}</span>
                </p>
                {item.image}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature53 };

export default Feature53;
