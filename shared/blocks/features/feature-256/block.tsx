import { cn } from "@/lib/utils";

import { CardSpotlight } from "@/components/aceternity/card-spotlight";

const TOOLS = [
  {
    name: "Shadcn UI",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-icon.svg",
    className: "h-20  ",
  },
  {
    name: "Tailwind CSS",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-icon-black.svg",
    className: "h-14",
  },
  {
    name: "V0",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/v0-icon.svg",
    className: "h-20",
  },
  {
    name: "React",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-icon-black.svg",
    className: "h-20",
  },
  {
    name: "Astro",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-icon.svg",
    className: "h-20",
  },
  {
    name: "Next.js",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/nextjs-icon.svg",
    className: "h-19",
  },
];

const GUIDES = [
  {
    name: "Platform",
    title: "Next.js + TypeScript",
  },
  {
    name: "UI Framework",
    title: "Tailwind CSS",
  },
  {
    name: "Icons & Assets",
    title: "Lucide, Heroicons, GitHub Octicons",
  },
  {
    name: "Tooling",
    title: "Vercel, pnpm, TurboRepo",
  },
];

interface Feature256Props {
  className?: string;
}

const Feature256 = ({ className }: Feature256Props) => {
  return (
    <section className={cn("py-16 sm:py-20 md:py-32", className)}>
      <div className="container flex flex-col gap-16 sm:gap-20 md:gap-24">
        <section>
          <div className="flex flex-col items-start gap-8 md:justify-between lg:flex-row">
            <h2 className="text-3xl font-light tracking-wide sm:text-4xl md:text-5xl lg:w-1/3">
              Developer Tools
            </h2>
            <div className="grid w-full grid-cols-2 gap-4 lg:w-2/3 lg:grid-cols-3">
              {TOOLS.map((logo, idx) => (
                <CardSpotlight
                  key={idx}
                  className="group flex h-40 w-full items-center justify-center rounded-3xl rounded-md border-muted bg-accent transition-all duration-300 hover:border-white/20 hover:bg-black sm:h-44 md:h-48"
                >
                  <img
                    src={logo.image}
                    alt={`Developer tool logo ${idx + 1}`}
                    className={`object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert ${logo.className}`}
                  />
                </CardSpotlight>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-8 md:items-start md:justify-between lg:flex-row">
          <h2 className="text-3xl font-light tracking-wide sm:text-4xl md:text-5xl lg:w-1/3">
            Guides
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:w-2/3">
            {GUIDES.map((item, idx) => (
              <CardSpotlight
                className="group flex h-52 flex-col justify-between rounded-md border-muted bg-accent p-6 transition-all duration-300 hover:border-white/20 hover:bg-black sm:h-64"
                key={idx}
              >
                <div className="w-fit rounded-2xl border border-border px-4 py-2 text-center text-sm transition-all duration-300 group-hover:border-white/30 group-hover:text-white">
                  {item.name}
                </div>
                <div className="text-xl font-medium transition-all duration-300 group-hover:text-white sm:text-2xl">
                  {item.title}
                </div>
              </CardSpotlight>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export { Feature256 };
