import { type SVGProps, useId } from "react";

import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const items = [
  {
    title: (
      <>
        Unparalleled
        <br />
        VAR flexibility
      </>
    ),
    description: [
      "VAR is often known for its lengthy processing times. At Charter, we focus on achieving the fastest VAR transfers—often completed within hours.",
      "Unlike traditional banks and middleware, we connect directly with the Federal Reserve to ensure the fastest, most transparent transfers possible.",
    ],
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
      alt: "Code snippet",
    },
    imagePosition: "content",
    className:
      "flex flex-col pl-6 py-6 overflow-hidden md:col-span-3 md:flex-row gap-6 md:gap-12",
    headerClassName: "flex-2 p-0 md:flex-1",
    contentClassName:
      "relative w-full self-start p-0 overflow-hidden rounded-l-xl border md:flex-1",
  },
  {
    title: "Unparalleled VAR flexibility",
    description: [
      "VAR has a reputation for taking too long. At Charter, we optimise for the fastest VAR transfers possible — often in a matter of hours.",
      "Unlike legacy banks and middleware providers, we have a direct connection to the Federal Reserve to facilitate the quickest transfers.",
    ],
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
      alt: "VAR Process Flow",
      className: "aspect-[2/1.1] rounded-xl",
    },
    className: "md:col-span-2 flex flex-col justify-center",
    contentClassName: "flex items-center justify-center",
    imagePosition: "content",
  },
  {
    title: "Unparalleled VAR flexibility",
    description: [
      "VAR has a reputation for taking too long. At Charter, we optimise for the fastest VAR transfers possible — often in a matter of hours.",
    ],
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
      alt: "VAR Process Diagram",
      className: "aspect-2/1 rounded-xl flex-1 self-center mb-6",
    },
    className: "md:col-span-2",
    headerClassName: "h-full",
    imagePosition: "header",
  },
  {
    title: "Unparalleled VAR flexibility",
    description: [
      "Unlike traditional banks and middleware, we connect directly with the Federal Reserve to ensure the fastest, most transparent transfers possible.",
    ],
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
      alt: "Code snippet",
    },
    imagePosition: "content",
    className: "overflow-hidden md:col-span-3 ",
    headerClassName: "",
    contentClassName:
      "relative aspect-[2/1.25] mt-4 p-0 ml-8 w-full md:max-w-[400px] lg:max-w-[500px] overflow-hidden md:mx-auto rounded-t-xl",
  },
];

export const Feature193 = () => {
  return (
    <section className="relative overflow-hidden py-32">
      <h3 className="container font-mono text-sm font-semibold tracking-widest text-accent-foreground">
        WHY CHARTER?
      </h3>

      <div className="relative z-10 container mt-8 grid grid-cols-1 gap-6 md:grid-cols-5">
        {items.map((item, index) => (
          <Card
            key={index}
            className={cn("col-span-1 shadow-xl", item.className)}
          >
            <CardHeader className={item.headerClassName}>
              {item.imagePosition === "header" && (
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  className={cn("object-cover", item.image.className)}
                />
              )}
              <CardTitle className="mt-0! text-3xl">{item.title}</CardTitle>
              {item.description.map((desc, i) => (
                <CardDescription
                  key={i}
                  className="mt-3 text-base leading-snug font-medium"
                >
                  {desc}
                </CardDescription>
              ))}
            </CardHeader>
            <CardContent className={item.contentClassName}>
              {item.imagePosition === "content" && (
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  className={cn(
                    "self-center object-cover",
                    item.image.className,
                  )}
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Background decoration */}
      <>
        <div className="absolute inset-0">
          <div className="absolute top-1/2 size-[700px] -translate-y-1/2 rounded-full bg-gradient-1/30 blur-[300px] will-change-transform" />
          <div className="absolute top-1/2 right-0 size-[700px] -translate-y-1/2 -rotate-12 rounded-full bg-gradient-2/15 blur-[300px] will-change-transform" />
          <div className="absolute right-20 bottom-10 h-[500px] w-[800px] -rotate-12 rounded-full bg-gradient-3/[0.06] blur-[100px] will-change-transform" />
        </div>
        <div className="absolute -inset-x-20 top-0 [mask-image:radial-gradient(circle_at_center,black_0%,black_20%,transparent_85%)]">
          <PlusSigns className="h-full w-full text-foreground/[0.05]" />
        </div>
      </>
    </section>
  );
};

interface PlusSignsProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

const PlusSigns = ({ className, ...props }: PlusSignsProps) => {
  const GAP = 16;
  const STROKE_WIDTH = 1;
  const PLUS_SIZE = 6;
  const id = useId();
  const patternId = `plus-pattern-${id}`;

  return (
    <svg width={GAP * 2} height={GAP * 2} className={className} {...props}>
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={GAP}
          height={GAP}
          patternUnits="userSpaceOnUse"
        >
          <line
            x1={GAP / 2}
            y1={(GAP - PLUS_SIZE) / 2}
            x2={GAP / 2}
            y2={(GAP + PLUS_SIZE) / 2}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
          />
          <line
            x1={(GAP - PLUS_SIZE) / 2}
            y1={GAP / 2}
            x2={(GAP + PLUS_SIZE) / 2}
            y2={GAP / 2}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};
