import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta32Props {
  heading: string;
  highlightHeading: string;
  description: string;
  buttons?: {
    primary?: { text: string; url: string };
    secondary?: { text: string; url: string };
  };
  stats: { label: string; description: string }[];
  className?: string;
}

const Cta32 = ({
  heading = "Supercharge your ",
  highlightHeading = "workflow today",
  description = "Automate repetitive tasks, gain real-time insights, and collaborate seamlessly with your team. Optimizing your operations in just a few clicks.",
  buttons = {
    primary: {
      text: "Get Started",
      url: "https://www.shadcnblocks.com",
    },
    secondary: {
      text: "Learn More",
      url: "https://www.shadcnblocks.com",
    },
  },
  stats = [
    { label: "99.9%", description: "system uptime guaranteed" },
    { label: "10k+", description: "companies using our platform" },
    { label: "1M+", description: "automated tasks run daily" },
  ],
  className,
}: Cta32Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="relative z-10 container grid border-2 border-dashed border-muted p-0 md:grid-cols-2">
        <div className="relative m-2 flex flex-col justify-center gap-6 overflow-hidden rounded-lg border border-primary bg-background/70 p-8 backdrop-blur-sm lg:m-8">
          {/* Pattern background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-100">
            <img
              alt="pattern"
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
              className="[mask-image:radial-gradient(circle_at_top_right,black,transparent_100%)]"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight">
              {heading}
              <span className="text-primary">{highlightHeading}</span>
            </h2>
            <p className="mt-2 text-muted-foreground">{description}</p>
          </div>

          <div className="relative z-10 flex gap-4">
            {buttons.primary && (
              <Button asChild>
                <a href={buttons.primary.url}>{buttons.primary.text}</a>
              </Button>
            )}
            {buttons.secondary && (
              <Button variant="outline" asChild>
                <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
              </Button>
            )}
          </div>
        </div>

        <div className="grid border-t-2 border-dashed border-muted md:border-t-0 md:border-l-2">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="border-b-2 border-dashed border-muted p-6 last:border-0"
            >
              <p className="text-2xl font-bold text-primary">{stat.label}</p>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Cta32 };
