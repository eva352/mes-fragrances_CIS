"use client";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsCards1Props {
  className?: string;
}

const TabsCards1 = ({ className }: TabsCards1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <Tabs className="w-full max-w-2xl" defaultValue="featured">
          <TabsList>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
          <TabsContent value="featured">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <Badge className="mb-3" variant="secondary">
                  Featured
                </Badge>
                <h3 className="mb-2 text-lg font-semibold">Building Modern Web Apps</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Learn how to build modern web applications with the latest technologies and best practices.
                </p>
                <Button size="sm" variant="outline">
                  Learn More
                </Button>
              </div>
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <Badge className="mb-3" variant="secondary">
                  Featured
                </Badge>
                <h3 className="mb-2 text-lg font-semibold">Advanced TypeScript</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Master advanced TypeScript concepts and patterns for building robust applications.
                </p>
                <Button size="sm" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="popular">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <Badge className="mb-3">Popular</Badge>
                <h3 className="mb-2 text-lg font-semibold">React Best Practices</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Discover the most popular patterns and practices used by React developers worldwide.
                </p>
                <Button size="sm" variant="outline">
                  Learn More
                </Button>
              </div>
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <Badge className="mb-3">Popular</Badge>
                <h3 className="mb-2 text-lg font-semibold">API Design Principles</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Learn how to design clean, maintainable, and scalable APIs that developers love.
                </p>
                <Button size="sm" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="recent">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <Badge className="mb-3" variant="outline">
                  New
                </Badge>
                <h3 className="mb-2 text-lg font-semibold">Next.js 15 Features</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Explore the latest features and improvements in Next.js 15 and how to use them.
                </p>
                <Button size="sm" variant="outline">
                  Learn More
                </Button>
              </div>
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <Badge className="mb-3" variant="outline">
                  New
                </Badge>
                <h3 className="mb-2 text-lg font-semibold">Tailwind CSS Updates</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Learn about the newest additions to Tailwind CSS and how they can improve your workflow.
                </p>
                <Button size="sm" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export { TabsCards1 };

export default TabsCards1;
