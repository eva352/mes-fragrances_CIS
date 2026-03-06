import { Eye, Keyboard, LucideIcon, Volume2 } from "lucide-react";

import { cn } from "@/lib/utils";

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

interface Feature217bProps {
  className?: string;
}

const Feature217b = ({ className }: Feature217bProps) => {
  return (
    <section className={cn("", className)}>
      <div
        className="relative bg-cover bg-center bg-no-repeat py-20 after:absolute after:inset-0 after:z-10 after:block after:size-full after:bg-black/50 after:content-[''] md:py-24 xl:py-32"
        style={{
          backgroundImage:
            "url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/futuristic-device-design-qcufu.png')",
        }}
      >
        <div className="relative z-20 container">
          <div className="flex flex-col gap-16">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-6 text-2xl tracking-tight text-white md:text-7xl">
                Incredible AI-powered video editing
              </h2>
              <div className="text-lg font-medium tracking-tight text-white">
                Accessibility ensures digital content is usable by all,
                including people with disabilities, by following inclusive
                design practices and meeting standards like WCAG for equal user
                experience.
              </div>
            </div>

            <div className="grid items-stretch gap-8 lg:grid-cols-3">
              {FEATURES.map((item) => (
                <div
                  key={item.title}
                  className="flex h-full flex-col items-center justify-center gap-4 rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
                >
                  <item.icon className="size-8 stroke-white" />
                  <div className="max-w-sm text-center text-xl font-medium text-white">
                    {item.title}
                  </div>
                  <div className="max-w-sm text-center text-sm text-white/70">
                    {item.summary}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature217b };
