import { Calendar, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Blog13Props {
  className?: string;
}

const Blog13 = ({ className }: Blog13Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <Badge variant="outline">Articles</Badge>
          <h1 className="text-4xl font-semibold text-balance">
            Discover the latest trends
          </h1>
          <p className="text-muted-foreground">
            Explore our blog for insightful articles, personal reflections and
            ideas that inspire action on the topics you care about.
          </p>
          <a href="#" className="flex items-center gap-1 text-sm font-semibold">
            View All Blogs
            <ChevronRight className="h-full w-4" />
          </a>
        </div>
        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1536735561749-fc87494598cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxNzd8fHx8fHwyfHwxNzIzNjM0NDc0fA&ixlib=rb-4.0.3&q=80&w=1080"
                alt="placeholder"
                className="aspect-video w-full rounded-lg object-cover"
              />
              <Badge
                variant="secondary"
                className="absolute top-4 right-4 bg-background/70 px-3 py-1 text-sm backdrop-blur-sm"
              >
                Business
              </Badge>
            </div>
            <div className="flex h-full flex-col justify-between p-4">
              <h2 className="mb-5 text-xl font-semibold">
                How to build a successful brand and business
              </h2>
              <div className="flex justify-between gap-6 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  September, 23, 2024
                </span>
                <a href="#" className="flex items-center gap-1">
                  Read more
                  <ChevronRight className="h-full w-3" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1653288973812-81d1951b8127?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="placeholder"
                className="aspect-video w-full rounded-lg object-cover"
              />
              <Badge
                variant="secondary"
                className="absolute top-4 right-4 bg-background/70 px-3 py-1 text-sm backdrop-blur-sm"
              >
                Design
              </Badge>
            </div>
            <div className="flex h-full flex-col justify-between p-4">
              <h2 className="mb-5 text-xl font-semibold">
                The difference between UI and UX
              </h2>
              <div className="flex justify-between gap-6 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  April, 07, 2024
                </span>
                <a href="#" className="flex items-center gap-1">
                  Read more
                  <ChevronRight className="h-full w-3" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1563952532949-3d1a874ad614?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="placeholder"
                className="aspect-video w-full rounded-lg object-cover"
              />
              <Badge
                variant="secondary"
                className="absolute top-4 right-4 bg-background/70 px-3 py-1 text-sm backdrop-blur-sm"
              >
                Marketing
              </Badge>
            </div>
            <div className="flex h-full flex-col justify-between p-4">
              <h2 className="mb-5 text-xl font-semibold">
                Optimizing your website for SEO and getting more traffic
              </h2>
              <div className="flex justify-between gap-6 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  August, 31, 2024
                </span>
                <a href="#" className="flex items-center gap-1">
                  Read more
                  <ChevronRight className="h-full w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Blog13 };
