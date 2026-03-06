import { cn } from "@/lib/utils";

import { ScrollableTabsList } from "@/components/shadcnblocks/scrollable-tabslist";
import { ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Feature205Props {
  className?: string;
}

const Feature205 = ({ className }: Feature205Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <Tabs
          defaultValue="efficiency"
          className="grid grid-cols-1 gap-8 rounded-4xl border border-border p-4 lg:grid-cols-2 lg:p-8 xl:gap-20"
        >
          <div className="flex flex-col-reverse justify-between gap-8 lg:flex-col">
            <div>
              <TabsContent
                value="efficiency"
                className="flex animate-in flex-col gap-6 duration-300 fade-in"
              >
                <span className="text-xs text-muted-foreground uppercase">
                  Efficiency
                </span>
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl font-medium">
                    Streamline. Automate. Focus.
                  </h2>
                  <p className="text-muted-foreground">
                    Our AI-powered workspace eliminates repetitive tasks and
                    centralizes your workflow. Spend time on what matters.
                  </p>
                </div>
              </TabsContent>
              <TabsContent
                value="collaboration"
                className="flex animate-in flex-col gap-6 duration-300 fade-in"
              >
                <span className="text-xs text-muted-foreground uppercase">
                  Collaboration
                </span>
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl font-medium">
                    Connect. Create. Collaborate.
                  </h2>
                  <p className="text-muted-foreground">
                    Real-time editing and seamless sharing keep your team in
                    sync. Communication tools built right into your workspace.
                  </p>
                </div>
              </TabsContent>
              <TabsContent
                value="insights"
                className="flex animate-in flex-col gap-6 duration-300 fade-in"
              >
                <span className="text-xs text-muted-foreground uppercase">
                  Insights
                </span>
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl font-medium">
                    Track. Analyze. Optimize.
                  </h2>
                  <p className="text-muted-foreground">
                    Our analytics dashboard visualizes productivity patterns and
                    identifies bottlenecks and areas for improvement.
                  </p>
                </div>
              </TabsContent>
            </div>
            <ScrollableTabsList>
              <TabsList className="mx-auto h-12 rounded-full p-2 lg:mx-0">
                <TabsTrigger
                  value="efficiency"
                  className="h-full rounded-full px-4 py-2"
                >
                  Efficiency
                </TabsTrigger>
                <TabsTrigger
                  value="collaboration"
                  className="h-full rounded-full px-4 py-2"
                >
                  Collaboration
                </TabsTrigger>
                <TabsTrigger
                  value="insights"
                  className="h-full rounded-full px-4 py-2"
                >
                  Insights
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" className="h-2" />
            </ScrollableTabsList>
          </div>
          <div>
            <TabsContent
              value="efficiency"
              className="animate-in duration-300 fade-in"
            >
              <div className="relative">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/annie-spratt-hCb3lIB8L8E-unsplash.jpg"
                  alt="placeholder"
                  className="h-[440px] w-full rounded-3xl object-cover lg:h-[540px]"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 flex flex-col justify-center gap-8 p-6 text-background">
                  <div className="flex flex-col gap-1.5">
                    <p className="text-4xl font-medium lg:text-5xl">40%</p>
                    <p className="font-medium">less time on admin tasks</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-4xl font-medium lg:text-5xl">$720</p>
                    <p className="font-medium">saved per employee monthly</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="collaboration"
              className="animate-in duration-300 fade-in"
            >
              <div className="relative">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/annie-spratt-MChSQHxGZrQ-unsplash.jpg"
                  alt="placeholder"
                  className="h-[440px] w-full rounded-3xl object-cover lg:h-[540px]"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 flex flex-col justify-center gap-8 p-6 text-background">
                  <div className="flex flex-col gap-1.5">
                    <p className="text-4xl font-medium lg:text-5xl">3x</p>
                    <p className="font-medium">faster project completion</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-4xl font-medium lg:text-5xl">87%</p>
                    <p className="font-medium">increase in team engagement</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="insights"
              className="animate-in duration-300 fade-in"
            >
              <div className="relative">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/annie-spratt-AkftcHujUmk-unsplash.jpg"
                  alt="placeholder"
                  className="h-[440px] w-full rounded-3xl object-cover lg:h-[540px]"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 flex flex-col justify-center gap-8 p-6 text-background">
                  <div className="flex flex-col gap-1.5">
                    <p className="text-4xl font-medium lg:text-5xl">65%</p>
                    <p className="font-medium">better resource allocation</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-4xl font-medium lg:text-5xl">28%</p>
                    <p className="font-medium">increased productivity</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export { Feature205 };
