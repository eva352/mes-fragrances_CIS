import {
  Blocks,
  Fingerprint,
  LayoutPanelTop,
  MessageCircleMore,
  Users,
  Workflow,
} from "@/components/icons";

import { cn } from "@/lib/utils";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  {
    title: "Communication",
    image: "/blocks/features/feature-52/placeholder-1.svg",
    icon: (
      <MessageCircleMore
        className="size-6 text-primary lg:size-8"
        strokeWidth={1.5}
      />
    ),
  },
  {
    title: "Integrations",
    image: "/blocks/features/feature-52/placeholder-2.svg",
    icon: (
      <Blocks className="size-6 text-primary lg:size-8" strokeWidth={1.5} />
    ),
  },
  {
    title: "Collaboration",
    image: "/blocks/features/feature-52/placeholder-3.svg",
    icon: <Users className="size-6 text-primary lg:size-8" strokeWidth={1.5} />,
  },
  {
    title: "Automation",
    image: "/blocks/features/feature-52/placeholder-4.svg",
    icon: (
      <Workflow className="size-6 text-primary lg:size-8" strokeWidth={1.5} />
    ),
  },
  {
    title: "Customization",
    image: "/blocks/features/feature-52/placeholder-5.svg",
    icon: (
      <LayoutPanelTop
        className="size-6 text-primary lg:size-8"
        strokeWidth={1.5}
      />
    ),
  },
  {
    title: "Security",
    image: "/blocks/features/feature-52/placeholder-6.svg",
    icon: (
      <Fingerprint
        className="size-6 text-primary lg:size-8"
        strokeWidth={1.5}
      />
    ),
  },
];

interface Feature52Props {
  className?: string;
}

const Feature52 = ({ className }: Feature52Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <Tabs defaultValue="feature-1">
          <TabsList className="flex h-full w-full flex-wrap justify-between gap-2 bg-background p-0">
            {tabs.map((tab, index) => (
              <TabsTrigger
                key={index}
                value={`feature-${index + 1}`}
                className="flex flex-1 flex-col items-start justify-start gap-2 rounded-md border border-border bg-muted px-2 py-4 text-left whitespace-normal text-primary hover:border-primary/40 hover:ring-1 hover:ring-input data-[state=active]:border data-[state=active]:border-primary/60 data-[state=active]:bg-background lg:py-6"
              >
                <div className="flex w-full flex-col items-center gap-4">
                  {tab.icon}
                  <p className="text-sm font-semibold lg:text-base">
                    {tab.title}
                  </p>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab, index) => (
            <TabsContent key={index} value={`feature-${index + 1}`}>
              <img
                src={tab.image}
                alt=""
                className="aspect-video w-full rounded-md object-cover"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export { Feature52 };

export default Feature52;
