import { Facebook, Github, Linkedin, Twitter } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

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
    title: "Tools",
    links: [
      { name: "Plans", href: "#" },
      { name: "Safety", href: "#" },
      { name: "Partners", href: "#" },
    ],
  },
  {
    title: "Docs",
    links: [
      { name: "Help", href: "#" },
      { name: "API", href: "#" },
      { name: "Guide", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Updates", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
      { name: "DPA", href: "#" },
      { name: "Cookies", href: "#" },
      { name: "Trust", href: "#" },
      { name: "Prefs", href: "#" },
    ],
  },
];

interface Footer16Props {
  className?: string;
}

const Footer16 = ({ className }: Footer16Props) => {
  return (
    <section className={cn("dark bg-background pt-32", className)}>
      <footer className="container">
        <div className="grid gap-10 pb-6 md:grid-cols-2 md:pb-0">
          <div className="flex flex-col justify-start gap-8">
            {/* Logo */}
            <a href="https://shadcnblocks.com">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark-white.svg"
                alt="Shadcnblocks"
                title="Shadcnblocks"
                className="h-11"
              />
            </a>
            <div className="flex items-center justify-start gap-4 md:flex-row">
              {SOCIAL_LINKS.map((item, i) => (
                <Button
                  key={`social-link-${i}`}
                  size="icon"
                  variant="secondary"
                >
                  <a href={item.href}>
                    <item.icon className="size-4 lg:size-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
          <div>
            <div className="hidden md:flex md:gap-10 lg:gap-24 xl:gap-32">
              {NAVIGATION.map((section) => (
                <div className="flex flex-col gap-4" key={section.title}>
                  <h6 className="mb-2 text-sm font-semibold text-foreground uppercase">
                    {section.title}
                  </h6>
                  {section.links.map((link) => (
                    <a
                      className="text-sm font-medium text-muted-foreground transition-colors duration-200 ease-in-out hover:text-foreground"
                      key={link.name}
                      href={link.href}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              ))}
            </div>
            <div className="md:hidden">
              <Accordion type="single" collapsible className="w-full">
                {NAVIGATION.map((section, i) => (
                  <AccordionItem value={`item-${i}`} key={section.title}>
                    <AccordionTrigger className="py-4 text-sm text-foreground uppercase hover:no-underline">
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2">
                      {section.links.map((link) => (
                        <a
                          className="text-sm font-medium text-muted-foreground transition-colors duration-200 ease-in-out hover:text-foreground"
                          key={link.name}
                          href={link.href}
                        >
                          {link.name}
                        </a>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
        <div className="overflow-hidden">
          <img
            className="w-full translate-y-2 opacity-10 md:translate-y-4 lg:translate-y-6 xl:translate-y-8"
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/shadcnblocks-giant-white-text.svg"
            alt=""
          />
        </div>
      </footer>
    </section>
  );
};

export { Footer16 };
