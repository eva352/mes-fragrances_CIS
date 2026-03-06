import { CheckCircle, Edit, List, MessagesSquare, Timer } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Feature87Props {
  className?: string;
}

const Feature87 = ({ className }: Feature87Props) => {
  return (
    <section className={cn("relative py-32", className)}>
      <div className="pointer-events-none absolute inset-0 z-10 bg-[50%_0] bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/shadow-overlay.png')] bg-no-repeat"></div>
      <div className="container p-6 md:p-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="flex flex-col justify-between gap-8">
            <div>
              <Badge variant="outline">For Professionals</Badge>
              <h2 className="my-9 text-3xl font-medium md:text-5xl">
                Better Team.
                <br />
                <span className="text-muted-foreground">less meetings.</span>
              </h2>
              <p className="text-muted-foreground">
                Shared platforms empower teams and partners to track progress,
                provide feedback, and approve tasks, reducing meetings and
                updates, allowing you to focus on the bigger picture.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MessagesSquare className="h-auto w-4" />
                Discussions
              </div>
              <Separator />
              <div className="flex items-center gap-2 text-muted-foreground">
                <Edit className="h-auto w-4" />
                Feedback
              </div>
              <Separator />
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="h-auto w-4" />
                Approvals
              </div>
              <Separator />
              <div className="flex items-center gap-2 text-muted-foreground">
                <List className="h-auto w-4" />
                Task Management
              </div>
              <Separator />
              <div className="flex items-center gap-2 text-muted-foreground">
                <Timer className="h-auto w-4" />
                Progress Tracking
              </div>
              <Separator />
            </div>
          </div>
          <div className="flex aspect-square w-full items-center justify-center overflow-hidden bg-muted px-6 md:px-8 lg:col-span-2">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
              alt="placeholder"
              className="max-h-[550px] w-full translate-x-1/4 rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature87 };
