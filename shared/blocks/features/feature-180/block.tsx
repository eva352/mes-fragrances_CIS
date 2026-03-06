import {
  BarChart,
  Bell,
  Bot,
  Check,
  List,
  MessageCircleOff,
  MessageSquare,
  Target,
  Users,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature180Props {
  className?: string;
}

const Feature180 = ({ className }: Feature180Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-5 pb-20 text-center">
          <Badge variant="outline">How it works</Badge>
          <h1 className="text-3xl font-medium text-pretty md:text-5xl">
            The Best way to optimize your sales team
          </h1>
          <p className="text-muted-foreground">
            We use AI to automate the process of finding and contacting
            prospects and then follow up with them.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 md:gap-5">
          <div className="flex flex-col items-center gap-5 md:gap-9">
            <div className="flex items-center gap-3">
              <X className="h-6 text-red-400" />
              <p className="text-xl font-medium">Without Acme</p>
            </div>
            <div className="h-full w-full rounded-md border p-9">
              <ul className="flex flex-col gap-8 font-medium text-primary/70">
                <li className="flex items-start gap-4">
                  <Users className="h-6 shrink-0" />
                  <p>Limited user targeting capabilities</p>
                </li>
                <li className="flex items-start gap-4">
                  <MessageSquare className="h-6 shrink-0" />
                  <p>Generic automated communication</p>
                </li>
                <li className="flex items-start gap-4">
                  <MessageCircleOff className="h-6 shrink-0" />
                  <p>Low engagement metrics</p>
                </li>
                <li className="flex items-start gap-4">
                  <List className="h-6 shrink-0" />
                  <p>Inefficient resource utilization</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5 md:gap-9">
            <div className="flex items-center gap-3">
              <Check className="h-6 text-lime-400" />
              <p className="text-xl font-medium">With Acme</p>
            </div>
            <div className="w-full rounded-md bg-linear-to-br from-primary via-primary/20 via-30% to-primary p-0.5">
              <div className="rounded-sm bg-background p-9">
                <ul className="flex flex-col gap-8 font-medium">
                  <li className="flex items-start gap-4">
                    <Target className="h-6 shrink-0" />
                    <p>Advanced targeting for optimal sales prospects</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <Bot className="h-6 shrink-0" />
                    <p>AI-powered personalized communication</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <Bell className="h-6 shrink-0" />
                    <p>Automated follow-ups with high engagement</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <BarChart className="h-6 shrink-0" />
                    <p>Optimized sales team performance and results</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature180 };
