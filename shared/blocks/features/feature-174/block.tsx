import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

type FadeDirection = "right" | "bottom" | "top";

type ItemType = {
  title: string;
  description: string;
  image: { src: string; alt: string; className: string };
  fade: FadeDirection[];
  containerClassName?: string;
};

const ITEMS: ItemType[] = [
  {
    title: "Reusable templates.",
    description:
      "Draft lightning-fast documents with our Smart Instructions and Templates.",
    containerClassName: "flex-1",
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
      alt: "Cycle 37 graph showing Scope, Started, and Completed metrics",
      className:
        "lg:translate-x-20 translate-x-6 md:translate-x-10 rounded-b-none",
    },
    fade: ["right"],
  },
  {
    title: "Simplify your stack.",
    description: "No more Confluence, SharePoint, or Microsoft Word.",
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
      alt: "Triage interface showing issue management options",
      className: "lg:translate-x-20 translate-x-6 md:translate-x-10",
    },
    fade: ["right", "bottom"],
  },
  {
    title: "Access controls.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do.",
    containerClassName: "mb-10 translate-x-6 md:translate-x-10",
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
      alt: "Access controls interface showing People, Compliance, and Security options",
      className: "",
    },
    fade: ["right", "top"],
  },
  {
    title: "Task chat.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    containerClassName: "mx-10 my-6 aspect-280/83 ",
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
      alt: "Task chat interface showing a conversation",
      className: "",
    },
    fade: [],
  },
  {
    title: "Cycle analysis.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    containerClassName: "mb-10 mx-10 lg:mx-20 aspect-230/124",
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
      alt: "Cycle analysis showing backlog priorities and statistics",
      className: "",
    },
    fade: [],
  },
];

interface Feature174Props {
  className?: string;
}

const Feature174 = ({ className }: Feature174Props) => {
  return (
    <section className={cn("bg-muted py-32", className)}>
      <div className="container">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl">
          Streamline your resource allocation and execution
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 md:mt-12 md:max-h-[800px] md:grid-cols-6 md:grid-rows-5 lg:mt-20">
          {ITEMS.map((item, i) => {
            const gridClasses = {
              0: "md:col-span-3 md:row-span-3",
              1: "md:col-span-3 md:row-span-3 md:col-start-4",
              2: "md:col-span-2 md:row-span-2 md:row-start-4",
              3: "md:col-span-2 md:row-span-2 md:col-start-3 md:row-start-4",
              4: "md:col-span-2 md:row-span-2 md:col-start-5 md:row-start-4",
            }[i];
            return <Item key={i} {...item} className={gridClasses} />;
          })}
        </div>
      </div>
    </section>
  );
};

const Item = ({
  title,
  description,
  image,
  fade = [],
  className,
  containerClassName,
}: ItemType & { className?: string }) => {
  return (
    <Card
      className={cn(
        "relative flex max-h-[400px] flex-col overflow-hidden border-none px-0 text-lg shadow-none md:max-h-none",
        className,
      )}
    >
      <CardHeader className="mb-2">
        <h3 className="inline leading-tight font-semibold text-balance">
          {title}{" "}
          <span className="font-medium text-muted-foreground">
            {description}
          </span>
        </h3>
      </CardHeader>

      <CardContent
        className={cn("relative flex overflow-hidden p-0", containerClassName)}
      >
        {fade.includes("right") && (
          <div className="absolute inset-0 z-10 bg-linear-to-r from-transparent via-transparent to-background" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 z-10 bg-linear-to-b from-transparent via-transparent to-background" />
        )}
        {fade.includes("top") && (
          <div className="absolute inset-0 z-10 bg-linear-to-t from-transparent via-transparent to-background" />
        )}
        <img
          src={image.src}
          alt={image.alt}
          className={cn(
            "flex-1 rounded-xl border object-cover",
            image.className,
          )}
        />
      </CardContent>
    </Card>
  );
};

export { Feature174 };
