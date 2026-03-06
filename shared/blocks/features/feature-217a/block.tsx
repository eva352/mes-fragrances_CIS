import { Eye, Keyboard, LucideIcon, Volume2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Item {
  title: string;
  summary: string;
  icon: LucideIcon;
}

const FEATURES: Array<Item> = [
  {
    title: "Keyboard Navigation",
    summary:
      "Ensure all interactive elements are accessible via keyboard alone, allowing users with motor impairments to navigate easily and efficiently without a mouse.",
    icon: Keyboard,
  },
  {
    title: "Screen Reader Friendly",
    summary:
      "Use semantic HTML and proper ARIA labels to help screen readers convey structure and meaning clearly to users with visual impairments.",
    icon: Volume2,
  },
  {
    title: "Color Contrast Check",
    summary:
      "Maintain strong color contrast between text and background to support users with low vision and improve readability across different lighting conditions.",
    icon: Eye,
  },
];

const FeatureItem = ({ title, summary, icon: Icon }: Item) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Icon className="size-7 stroke-muted-foreground" />
      <div className="max-w-xs text-center text-xl font-semibold">{title}</div>
      <div className="max-w-lg text-center text-base text-muted-foreground">
        {summary}
      </div>
    </div>
  );
};

interface Feature217aProps {
  className?: string;
}

const Feature217a = ({ className }: Feature217aProps) => {
  return (
    <section className={cn("", className)}>
      <div
        className="relative bg-cover bg-center bg-no-repeat py-10 after:absolute after:inset-0 after:z-10 after:block after:size-full after:bg-black/40 after:content-[''] md:py-16 xl:px-6 xl:py-28"
        style={{
          backgroundImage:
            "url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/futuristic-device-design-qcufu.png')",
        }}
      >
        <div className="relative z-20 container">
          <div className="flex flex-col items-center justify-center gap-12 text-center">
            <div className="flex max-w-4xl flex-col gap-5">
              <h2 className="text-2xl tracking-tight text-white md:text-7xl">
                Incredible AI-powered video editing
              </h2>
              <div className="text-lg font-medium tracking-tight text-white">
                Accessibility ensures digital content is usable by all,
                including people with disabilities, by following inclusive
                design practices and meeting standards like WCAG for equal user
                experience.
              </div>
            </div>
            <div className="max-w-xl">
              <AspectRatio
                ratio={0.80239521}
                className="w-full overflow-hidden rounded-xl shadow-xl"
              >
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
                  alt=""
                  className="block size-full object-cover object-center"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="grid items-start gap-8 py-20 lg:grid-cols-3">
          {FEATURES.map((item) => (
            <FeatureItem key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature217a };
