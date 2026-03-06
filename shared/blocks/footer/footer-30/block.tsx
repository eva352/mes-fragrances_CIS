import { CircleArrowOutUpRight } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

const NAVIGATION = [
  { label: "Home", href: "#" },
  { label: "Collection", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Login", href: "#" },
];

const SOCIAL_LINKS = [
  { label: "Linkedin", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Facebook", href: "#" },
];

const FOOTER_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

interface Footer30Props {
  className?: string;
}

const Footer30 = ({ className }: Footer30Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col justify-between gap-15 lg:flex-row">
          <div className="flex flex-col gap-2">
            <a className="font-medium tracking-tight" href="">
              +1 (120) 233-01231
            </a>
            <a
              className="relative text-3xl font-semibold tracking-tight lg:text-4xl"
              href=""
            >
              yo@shadcnblocks.com
            </a>
          </div>
          <div className="flex gap-30">
            <ul className="space-y-1">
              <li className="mb-5 text-sm font-medium tracking-tight text-foreground/40">
                Navigate
              </li>
              {NAVIGATION.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-xl font-semibold tracking-tight"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-1">
              <li className="mb-5 text-sm font-medium tracking-tight text-foreground/40">
                Social
              </li>
              {SOCIAL_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-2 text-xl font-semibold tracking-tight"
                  >
                    {item.label}{" "}
                    <CircleArrowOutUpRight className="size-3.5 text-muted-foreground/50 group-hover:text-foreground" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 text-[13vw] font-semibold tracking-tighter lg:text-right lg:text-[10vw]">
          Shadcnblocks<sup className="font-light">&reg;</sup>{" "}
        </div>
        <div className="dark relative mt-20 flex h-24 w-full flex-col items-center justify-center gap-2 bg-background text-sm tracking-tight text-foreground lg:h-30 lg:flex-row lg:justify-between lg:gap-4 lg:text-base">
          <div className="relative z-2 flex items-center gap-4 lg:gap-10">
            <p className="text-foreground/50">
              &copy;2025 shadcnblocks All rights reserved
            </p>
          </div>
          <div className="relative z-2 flex items-center gap-4 lg:gap-10">
            {FOOTER_LINKS.map((item, index) => (
              <a
                href={item.href}
                className="text-foreground/50 transition-colors hover:text-foreground"
                key={index}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="absolute left-1/2 h-full w-screen -translate-x-1/2 bg-background" />
        </div>
      </div>
    </section>
  );
};

export { Footer30 };
