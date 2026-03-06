import React from "react";

import { cn } from "@/lib/utils";

import { LinkPreview } from "@/components/shadcnblocks/link-preview";

interface Feature288Props {
  className?: string;
}

const Feature288 = ({ className }: Feature288Props) => {
  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container w-full">
        <h1 className="mt-10 text-center text-3xl font-semibold tracking-tight text-muted-foreground/40 md:text-4xl">
          Build faster with
          <LinkPreview url="https://shadcnblocks.com" className="px-1">
            Shadcnblocks
          </LinkPreview>{" "}
          designed for real-world apps. Whether you're using{" "}
          <LinkPreview url="https://tailwindcss.com" className="px-1">
            TailwindCSS
          </LinkPreview>
          ,{" "}
          <LinkPreview url="https://www.typescriptlang.org" className="px-1">
            TypeScript
          </LinkPreview>
          , or integrating{" "}
          <LinkPreview url="https://www.framer.com/motion" className="px-1">
            Framer Motion
          </LinkPreview>
          <br />
          <br />
          Every block is customizable, responsive, and optimized for frameworks
          like{" "}
          <LinkPreview url="https://nextjs.org" className="px-1">
            Next.js
          </LinkPreview>{" "}
          and{" "}
          <LinkPreview url="https://ui.shadcn.com" className="px-1">
            shadcn/ui
          </LinkPreview>{" "}
          — giving you a powerful UI toolkit that scales with your project.
        </h1>
      </div>
    </section>
  );
};

export { Feature288 };
