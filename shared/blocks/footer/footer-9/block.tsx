import { CircleCheck, LifeBuoy, Linkedin } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#" },
      { name: "Tasks", href: "#" },
      { name: "Calendar", href: "#" },
      { name: "Conferencing", href: "#" },
      { name: "Invoicing", href: "#" },
      { name: "Security", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Roadmap", href: "#" },
      { name: "Changelog", href: "#" },
      { name: "Resources", href: "#" },
    ],
  },
  {
    title: "Case Studies",
    links: [
      { name: "Shadcn", href: "#" },
      { name: "React", href: "#" },
      { name: "Tailwind", href: "#" },
    ],
  },
  {
    title: "Integrations",
    links: [
      { name: "Hubspot", href: "#" },
      { name: "Slack", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About ", href: "#" },
      { name: "Company", href: "#" },
      { name: "Support", href: "#" },
      { name: "Book a demo", href: "#" },
    ],
  },
];

interface Footer9Props {
  className?: string;
}

const Footer9 = ({ className }: Footer9Props) => {
  return (
    <section className={cn("bg-muted py-32", className)}>
      <div className="container">
        <footer>
          <div className="mb-14 flex flex-col justify-between gap-11 md:items-start xl:flex-row xl:items-center xl:gap-6">
            <div>
              <h1 className="mb-4 text-4xl font-semibold">Get More Done.</h1>
              <p className="mb-8 text-xl text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
              <div className="flex items-center gap-3">
                <Button>Start for free</Button>
                <Button variant="outline">Compare plans</Button>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-6 rounded-2xl bg-background p-6 shadow-lg md:flex-row">
              <div className="flex flex-col items-center justify-center p-10">
                <div className="flex text-6xl font-semibold">
                  0<div className="h-full text-xl">€</div>
                </div>
                <div className="text-sm">Free forever</div>
              </div>
              <div className="h-[1px] w-full bg-muted-foreground/30 md:h-auto md:w-[1px]" />
              <ul className="flex flex-col justify-center space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2 font-medium hover:text-primary">
                  <CircleCheck className="h-5 w-5 text-primary" />
                  <p className="text-gray-400">1 Team Member</p>
                </li>
                <li className="flex items-center gap-2 font-medium hover:text-primary">
                  <CircleCheck className="h-5 w-5 text-primary" />
                  <p className="text-gray-400">Unlimited Downloads</p>
                </li>
                <li className="flex items-center gap-2 font-medium hover:text-primary">
                  <CircleCheck className="h-5 w-5 text-primary" />
                  <p className="text-gray-400">100GB Space</p>
                </li>
                <li className="flex items-center gap-2 font-medium hover:text-primary">
                  <CircleCheck className="h-5 w-5 text-primary" />
                  <p className="text-gray-400">Basic Support</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 border-t pt-20 lg:grid-cols-5">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t pt-8 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center">
            <ul className="flex justify-center gap-4 lg:justify-start">
              <li className="hover:text-primary">
                <a href="#">Privacy</a>
              </li>
              <li className="hover:text-primary">
                <a href="#">Terms</a>
              </li>
              <li className="hover:text-primary">
                <a href="#">Imprint</a>
              </li>
              <li>
                <p className="text-gray-400">
                  © 2024 Shadcnblocks.com. All rights reserved.
                </p>
              </li>
            </ul>
            <ul className="flex items-center justify-center gap-4 lg:justify-start">
              <li>
                <p className="text-black">Follow us:</p>
              </li>
              <li>
                <Button className="gap-2 rounded-full" variant="outline">
                  <Linkedin className="h-4 w-4" />
                  Linkedin
                </Button>
              </li>
              <li>
                <Button className="gap-2 rounded-full" variant="outline">
                  <LifeBuoy className="h-4 w-4" />
                  Product Hunt
                </Button>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer9 };
