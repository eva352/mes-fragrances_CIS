import {
  FileSpreadsheet,
  Flag,
  Layout,
  MessagesSquare,
  Settings,
  Target,
  Timer,
  Wand,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Feature105Props {
  className?: string;
}

const Feature105 = ({ className }: Feature105Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
          <Badge
            variant="outline"
            className="flex items-center gap-1 px-2.5 py-1.5 text-sm"
          >
            <Flag className="h-auto w-4" />
            Highlights
          </Badge>
          <h2 className="text-center text-3xl font-semibold lg:text-4xl">
            Steps to Achieve Your Goals
          </h2>
          <p className="text-center text-muted-foreground lg:text-lg">
            Discover effective strategies to maximize your potential and enhance
            performance. Our platform is designed to help you achieve your
            goals.
          </p>
        </div>
        <div className="mx-auto mt-14 max-w-7xl">
          <Tabs defaultValue="tab-1">
            <div className="max-w-[100vw-4rem] overflow-x-auto">
              <TabsList className="mx-auto flex w-fit justify-center gap-5 border-b">
                <TabsTrigger
                  value="tab-1"
                  className="group -mb-px flex flex-col items-center gap-1.5 px-1 pb-3.5 data-[state=active]:border-b data-[state=active]:border-primary"
                >
                  <span className="flex size-12 items-center justify-center rounded-md bg-muted transition-colors duration-300 group-data-[state=active]:bg-primary group-data-[state=active]:text-background">
                    <Target className="w-7" />
                  </span>
                  <p className="text-sm text-muted-foreground">Aim</p>
                </TabsTrigger>
                <TabsTrigger
                  value="tab-2"
                  className="group -mb-px flex flex-col items-center gap-1.5 px-1 pb-3.5 data-[state=active]:border-b data-[state=active]:border-primary"
                >
                  <span className="flex size-12 items-center justify-center rounded-md bg-muted transition-colors duration-300 group-data-[state=active]:bg-primary group-data-[state=active]:text-background">
                    <Layout className="w-7" />
                  </span>
                  <p className="text-sm text-muted-foreground">Plans</p>
                </TabsTrigger>
                <TabsTrigger
                  value="tab-3"
                  className="group -mb-px flex flex-col items-center gap-1.5 px-1 pb-3.5 data-[state=active]:border-b data-[state=active]:border-primary"
                >
                  <span className="flex size-12 items-center justify-center rounded-md bg-muted transition-colors duration-300 group-data-[state=active]:bg-primary group-data-[state=active]:text-background">
                    <Wand className="w-7" />
                  </span>
                  <p className="text-sm text-muted-foreground">Execution</p>
                </TabsTrigger>
                <TabsTrigger
                  value="tab-4"
                  className="group -mb-px flex flex-col items-center gap-1.5 px-1 pb-3.5 data-[state=active]:border-b data-[state=active]:border-primary"
                >
                  <span className="flex size-12 items-center justify-center rounded-md bg-muted transition-colors duration-300 group-data-[state=active]:bg-primary group-data-[state=active]:text-background">
                    <FileSpreadsheet className="w-7" />
                  </span>
                  <p className="text-sm text-muted-foreground">Files</p>
                </TabsTrigger>
                <TabsTrigger
                  value="tab-5"
                  className="group -mb-px flex flex-col items-center gap-1.5 px-1 pb-3.5 data-[state=active]:border-b data-[state=active]:border-primary"
                >
                  <span className="flex size-12 items-center justify-center rounded-md bg-muted transition-colors duration-300 group-data-[state=active]:bg-primary group-data-[state=active]:text-background">
                    <Timer className="w-7" />
                  </span>
                  <p className="text-sm text-muted-foreground">Monitor</p>
                </TabsTrigger>
                <TabsTrigger
                  value="tab-6"
                  className="group -mb-px flex flex-col items-center gap-1.5 px-1 pb-3.5 data-[state=active]:border-b data-[state=active]:border-primary"
                >
                  <span className="flex size-12 items-center justify-center rounded-md bg-muted transition-colors duration-300 group-data-[state=active]:bg-primary group-data-[state=active]:text-background">
                    <MessagesSquare className="w-7" />
                  </span>
                  <p className="text-sm text-muted-foreground">Comms</p>
                </TabsTrigger>
                <TabsTrigger
                  value="tab-7"
                  className="group -mb-px flex flex-col items-center gap-1.5 px-1 pb-3.5 data-[state=active]:border-b data-[state=active]:border-primary"
                >
                  <span className="flex size-12 items-center justify-center rounded-md bg-muted transition-colors duration-300 group-data-[state=active]:bg-primary group-data-[state=active]:text-background">
                    <Settings className="w-7" />
                  </span>
                  <p className="text-sm text-muted-foreground">Settings</p>
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="mt-5">
              <TabsContent value="tab-1" className="aspect-video">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                  alt="placeholder"
                  className="h-full w-full rounded-xl border object-cover"
                />
              </TabsContent>
              <TabsContent value="tab-2" className="aspect-video">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                  alt="placeholder"
                  className="h-full w-full rounded-xl border object-cover"
                />
              </TabsContent>
              <TabsContent value="tab-3" className="aspect-video">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
                  alt="placeholder"
                  className="h-full w-full rounded-xl border object-cover"
                />
              </TabsContent>
              <TabsContent value="tab-4" className="aspect-video">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg"
                  alt="placeholder"
                  className="h-full w-full rounded-xl border object-cover"
                />
              </TabsContent>
              <TabsContent value="tab-5" className="aspect-video">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg"
                  alt="placeholder"
                  className="h-full w-full rounded-xl border object-cover"
                />
              </TabsContent>
              <TabsContent value="tab-6" className="aspect-video">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg"
                  alt="placeholder"
                  className="h-full w-full rounded-xl border object-cover"
                />
              </TabsContent>
              <TabsContent value="tab-7" className="aspect-video">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                  alt="placeholder"
                  className="h-full w-full rounded-xl border object-cover"
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export { Feature105 };
