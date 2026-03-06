import { CreditCard, Layout, Menu, Pointer, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Feature113Props {
  className?: string;
}

const Feature113 = ({ className }: Feature113Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div>
        <div className="container flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">Top-notch Craft</Badge>
          <h2 className="text-3xl font-semibold md:text-4xl">Shape tomorrow</h2>
          <p className="text-muted-foreground">
            Join us to build flawless web solutions.
          </p>
        </div>
        <div>
          <Tabs defaultValue="tab-1" className="mt-14">
            <div className="container flex justify-center">
              <TabsList>
                <TabsTrigger value="tab-1" className="flex items-center gap-2">
                  <Zap className="hidden h-auto w-4 shrink-0 sm:block" />
                  Speed
                </TabsTrigger>
                <TabsTrigger value="tab-2" className="flex items-center gap-2">
                  <Pointer className="hidden h-auto w-4 shrink-0 sm:block" />
                  Flexible
                </TabsTrigger>
                <TabsTrigger value="tab-3" className="flex items-center gap-2">
                  <Layout className="hidden h-auto w-4 shrink-0 sm:block" />
                  Advanced
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="container mt-10 max-w-7xl rounded-2xl bg-muted/70 p-8 md:mt-14 lg:p-16">
              <TabsContent
                value="tab-1"
                className="mt-0 grid place-items-center gap-20 lg:grid-cols-2 lg:gap-10"
              >
                <div className="flex flex-col gap-5">
                  <Badge variant="outline" className="w-fit bg-background">
                    Modern Tactics
                  </Badge>
                  <h3 className="text-3xl font-semibold lg:text-5xl">
                    Make your site a true standout.
                  </h3>
                  <p className="text-muted-foreground lg:text-lg">
                    Discover new web trends that help you craft sleek, highly
                    functional sites that drive traffic and convert leads into
                    customers.
                  </p>
                  <Button className="mt-2.5 w-fit gap-2" size="lg">
                    See Plans
                    <CreditCard className="h-auto w-4" />
                  </Button>
                </div>
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
                  alt="placeholder"
                  className="max-h-96 rounded-xl"
                />
              </TabsContent>
              <TabsContent
                value="tab-2"
                className="mt-0 grid place-items-center gap-20 lg:grid-cols-2 lg:gap-10"
              >
                <div className="flex flex-col gap-5">
                  <Badge variant="outline" className="w-fit bg-background">
                    Expert Features
                  </Badge>
                  <h3 className="text-3xl font-semibold lg:text-5xl">
                    Boost your site with top-tier design.
                  </h3>
                  <p className="text-muted-foreground lg:text-lg">
                    Use stellar design to easily engage users and strengthen
                    their loyalty. Create a seamless experience that keeps them
                    coming back for more.
                  </p>
                  <Button className="mt-2.5 w-fit gap-2" size="lg">
                    See Tools
                    <Menu className="h-auto w-4" />
                  </Button>
                </div>
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg"
                  alt="placeholder"
                  className="max-h-96 rounded-xl"
                />
              </TabsContent>
              <TabsContent
                value="tab-3"
                className="mt-0 grid place-items-center gap-20 lg:grid-cols-2 lg:gap-10"
              >
                <div className="flex flex-col gap-5">
                  <Badge variant="outline" className="w-fit bg-background">
                    Elite Solutions
                  </Badge>
                  <h3 className="text-3xl font-semibold lg:text-5xl">
                    Build an advanced web experience.
                  </h3>
                  <p className="text-muted-foreground lg:text-lg">
                    Lift your brand with modern tech that grabs attention and
                    drives action. Create a digital experience that stands out
                    from the crowd.
                  </p>
                  <Button className="mt-2.5 w-fit gap-2" size="lg">
                    See Options
                    <Zap className="h-auto w-4" />
                  </Button>
                </div>
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg"
                  alt="placeholder"
                  className="max-h-96 rounded-xl"
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export { Feature113 };
