import { ArrowUpRight, Facebook, Instagram, Twitter } from "lucide-react";

import { cn } from "@/lib/utils";

import { RainbowButton } from "@/components/magicui/rainbow-button";

interface Footer32Props {
  preHeading: string;
  heading1: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  email: string;
  socialLinks: {
    link1: {
      url: string;
      label: string;
    };
    link2: {
      url: string;
      label: string;
    };
    link3: {
      url: string;
      label: string;
    };
  };
  className?: string;
}

const Footer32 = ({
  preHeading = "Let's connect",
  heading1 = "You want to scale faster? Try Shadcnblocks today.",
  description = "Join thousands of companies already using our platform to scale their operations",
  buttonText = "Get Started Now",
  buttonUrl = "#",
  email = "hello@company.com",
  socialLinks = {
    link1: {
      url: "#",
      label: "Twitter",
    },
    link2: {
      url: "#",
      label: "Instagram",
    },
    link3: {
      url: "#",
      label: "Facebook",
    },
  },
  className,
}: Footer32Props) => {
  return (
    <section className={cn("relative py-32", className)}>
      <div className="relative z-10 container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 text-center">
          {/* Pre-heading with decorative lines */}
          <div className="flex w-full items-center gap-4">
            <div className="h-px flex-1 bg-[linear-gradient(270deg,var(--primary,rgb(255,255,255))_0%,var(--secondary,rgb(0,0,0))_100%)] opacity-50" />
            <p className="text-sm text-muted-foreground italic md:text-base">
              {preHeading}
            </p>
            <div className="h-px flex-1 bg-[linear-gradient(270deg,var(--secondary,rgb(0,0,0))_0%,var(--primary,rgb(255,255,255))_100%)] opacity-50" />
          </div>

          {/* Main heading */}
          <h2 className="md:text-65xl py-6 text-6xl">{heading1}</h2>

          {/* Description */}
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            {description}
          </p>

          <RainbowButton asChild variant="outline">
            <a
              href={buttonUrl}
              className="group relative mt-4 block rounded-lg border bg-white px-8 py-6 text-base transition-all"
            >
              <span className="text-secondary-foreground">{buttonText}</span>
              <ArrowUpRight className="h-4 w-4 text-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </RainbowButton>

          {/* Social Media Links */}
          <div className="flex items-center gap-6 pt-8">
            <a
              href={socialLinks.link1.url}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={socialLinks.link1.label}
            >
              <Twitter className="h-5 w-5" />
            </a>
            <div className="h-4 w-px bg-border" />
            <a
              href={socialLinks.link2.url}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={socialLinks.link2.label}
            >
              <Instagram className="h-5 w-5" />
            </a>
            <div className="h-4 w-px bg-border" />
            <a
              href={socialLinks.link3.url}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={socialLinks.link3.label}
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>

          {/* Support Email */}
          <p className="pt-2 text-sm text-muted-foreground md:text-base">
            <a
              href={`mailto:${email}`}
              className="transition-colors hover:text-foreground"
            >
              {email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export { Footer32 };
