import { ArrowDownRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";

const items = [
  {
    title: "Data driven design",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    title: "Manage projects end-to-end",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    title: "Build momentum and healthy habits",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
];

interface Feature171Props {
  className?: string;
}

const Feature171 = ({ className }: Feature171Props) => {
  return (
    <section className={cn("bg-secondary py-32", className)}>
      <div className="container">
        {/* Top dashed line with text */}
        <div className="relative flex items-center justify-center">
          <DashedLine className="text-muted-foreground" />
          <span className="absolute bg-secondary px-3 font-mono text-sm font-medium tracking-wide text-muted-foreground max-lg:hidden">
            MEASURE TWICE. CUT ONCE.
          </span>
        </div>

        {/* Content */}
        <div className="mx-auto mt-10 grid max-w-5xl gap-3 lg:mt-24 lg:grid-cols-2">
          <h2 className="text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Made for modern product teams
          </h2>
          <p className="leading-snug font-medium text-muted-foreground">
            Mainline is built on the habits that make the best product teams
            successful: staying focused, moving quickly, and always aiming for
            high-quality work.
          </p>
        </div>

        {/* Features Card */}
        <Card className="mt-8 overflow-hidden rounded-2xl md:mt-12 lg:mt-20">
          <CardContent className="flex p-0 max-lg:flex-col">
            {items.map((item, i) => (
              <div key={i} className="flex flex-1 max-lg:flex-col">
                <div className="ps-6 pt-6 lg:ps-8 lg:pt-8">
                  <div className="relative ps-4">
                    <img
                      src={item.image}
                      alt={`${item.title} interface`}
                      className="aspect-[1.28/1] overflow-hidden rounded-tl-xl object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
                  </div>
                  <a
                    href="#"
                    className="group flex items-center justify-between gap-4 p-6 ps-0! lg:p-8"
                  >
                    <h3 className="text-xl leading-tight font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <ArrowDownRight className="size-6" />
                  </a>
                </div>
                {i < items.length - 1 && (
                  <div className="relative hidden lg:block">
                    <DashedLine orientation="vertical" />
                  </div>
                )}
                {i < items.length - 1 && (
                  <div className="relative block lg:hidden">
                    <DashedLine orientation="horizontal" />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export { Feature171 };

interface DashedLineProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const DashedLine = ({
  orientation = "horizontal",
  className,
}: DashedLineProps) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={cn(
        "relative text-muted-foreground",
        isHorizontal ? "h-px w-full" : "h-full w-px",
        className,
      )}
    >
      <div
        className={cn(
          isHorizontal
            ? [
                "h-px w-full",
                "bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)]",
                "[mask-image:linear-gradient(90deg,transparent,black_25%,black_45%,transparent)]",
              ]
            : [
                "h-full w-px",
                "bg-[repeating-linear-gradient(180deg,transparent,transparent_4px,currentColor_4px,currentColor_8px)]",
                "[mask-image:linear-gradient(180deg,transparent,black_25%,black_45%,transparent)]",
              ],
        )}
      />
    </div>
  );
};
