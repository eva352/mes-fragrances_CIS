import { Calendar, ChevronRight, Terminal, Timer, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

const features = [
  {
    description: "Faster than Wire, and more affordable, too.",
    icon: Timer,
    href: "/pricing",
  },
  {
    description: "Send or request funds. FedNow does both.",
    icon: Wallet,
    href: "/pricing",
  },
  {
    description: "API request to creation in seven minutes.",
    icon: Terminal,
    href: "/pricing",
  },
  {
    description: "Settle any time, any day. What Bank holiday?",
    icon: Calendar,
    href: "/pricing",
  },
];

export function Feature194() {
  return (
    <section className="relative py-32">
      <div className="container max-w-5xl">
        <div className="text-center">
          <h3 className="font-mono text-sm font-semibold tracking-widest text-accent-foreground">
            MORE COMPUTER FUGAZI
          </h3>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            And we have an AI chatbot
          </h2>
          <p className="mt-3 text-xl font-medium text-muted-foreground md:text-2xl">
            {`We're betting on agents replacing our staff next year.`}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2.5 md:mt-12 lg:mt-20 lg:grid-cols-4 lg:gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader className="max-md:p-3">
                <feature.icon className="size-8 text-primary" />
                <CardDescription className="mt-4 font-medium text-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto max-md:p-3">
                <Button
                  variant="outline"
                  asChild
                  className="group w-[min(100%,300px)] border-border"
                >
                  <a href={feature.href}>
                    Learn more
                    <span className="sr-only">
                      {" "}
                      about {feature.description.toLowerCase()}
                    </span>
                    <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
