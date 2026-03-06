"use client";
import { Facebook, Github, Linkedin, Twitter } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

const SOCIAL_LINKS = [
  {
    icon: Github,
    href: "#",
  },
  {
    icon: Linkedin,
    href: "#",
  },
  {
    icon: Facebook,
    href: "#",
  },
  {
    icon: Twitter,
    href: "#",
  },
];

const NAVIGATION = [
  {
    title: "Platform",
    links: [
      { name: "Overview", href: "#" },
      { name: "Use Cases", href: "#" },
    ],
  },
  {
    title: "About Us",
    links: [
      { name: "Team", href: "#" },
      { name: "Support", href: "#" },
      { name: "Legal", href: "#" },
      { name: "Security", href: "#" },
    ],
  },
  {
    title: "Learn",
    links: [
      { name: "Tutorials", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "Quickstart", href: "#" },
    ],
  },
];

interface Footer15Props {
  className?: string;
}

const Footer15 = ({ className }: Footer15Props) => {
  return (
    <section className={cn("py-32", className)}>
      <footer className="container flex flex-col gap-32">
        <div className="flex w-full flex-col justify-between gap-y-24 lg:flex-row">
          <div className="flex shrink-0 grow-0 basis-auto flex-col items-start justify-start gap-6">
            {/* Logo */}
            <a href="https://shadcnblocks.com">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg"
                alt="Shadcnblocks"
                title="Shadcnblocks"
                className="h-10 dark:invert"
              />
            </a>
            <p className="w-full max-w-54 text-base leading-normal text-muted-foreground md:text-lg">
              Enhance and tailor your digital experiences effortlessly, at
              scale.
            </p>
            <div className="flex w-full items-center justify-start gap-7">
              {SOCIAL_LINKS.map((item, i) => (
                <a
                  href={item.href}
                  key={`social-link-${i}`}
                  className="flex size-6 opacity-100 transition-opacity hover:opacity-50"
                >
                  <item.icon className="m-auto size-full stroke-foreground" />
                </a>
              ))}
            </div>
            <div className="pt-6">
              <Badge className="rounded-full border-muted bg-background p-0 text-foreground">
                <a href="#" className="flex items-center gap-2 px-3 py-2">
                  <div className="relative size-[0.4375rem]">
                    <span className="absolute top-1/2 left-1/2 z-10 size-[0.6875rem] -translate-1/2 animate-pulse rounded-full bg-green-400/50" />
                    <span className="absolute top-1/2 left-1/2 z-20 size-full -translate-1/2 rounded-full bg-green-500" />
                  </div>
                  <div className="text-[0.9375rem] leading-none font-normal">
                    All systems operational
                  </div>
                </a>
              </Badge>
            </div>
          </div>
          <div className="flex flex-col gap-24">
            <nav className="flex flex-wrap gap-24 md:gap-40">
              {NAVIGATION.map((section, _) => (
                <div
                  key={section.title}
                  className="flex flex-col items-start justify-start gap-4"
                >
                  <p className="mb-2 text-sm font-semibold text-foreground md:text-base">
                    {section.title}
                  </p>
                  {section.links.map((link, _) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-sm leading-none font-medium text-foreground opacity-50 transition-opacity hover:opacity-100"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-y-4 md:flex-row">
          <div className="text-sm font-medium text-muted-foreground">
            © 2025 shadcnblocks.com
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            Made in the USA{" "}
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/flags/united-states.png"
              alt="California"
              className="h-5 rounded-sm"
            />
          </div>
        </div>
      </footer>
    </section>
  );
};

export { Footer15 };
