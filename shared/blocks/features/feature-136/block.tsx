import { Calendar, Target, Trophy, Users } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Feature136Props {
  className?: string;
}

const Feature136 = ({ className }: Feature136Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid place-content-center gap-10 lg:grid-cols-2">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-4 lg:items-start">
            <Badge
              variant="outline"
              className="flex items-center gap-1 px-2.5 py-1.5 text-sm"
            >
              <Trophy className="h-auto w-4" />
              Key Aspects
            </Badge>
            <h2 className="text-center text-3xl font-semibold lg:text-left lg:text-4xl">
              Boost Productivity with Core Tools
            </h2>
            <p className="text-center text-muted-foreground lg:text-left lg:text-lg">
              Our platform offers dynamic tools for project management, helping
              teams work smarter and achieve success with ease. We focus on
              delivering user-friendly solutions that enhance collaboration and
              streamline operations.
            </p>

            <div className="mt-9 flex w-full flex-col justify-center gap-6 md:flex-row lg:justify-start">
              <div className="flex justify-between gap-6">
                <div className="mx-auto">
                  <p className="mb-1.5 text-3xl font-bold">4.2M+</p>
                  <p className="text-muted-foreground">Installs</p>
                </div>
                <Separator orientation="vertical" className="h-auto" />
                <div className="mx-auto">
                  <p className="mb-1.5 text-3xl font-bold">221k+</p>
                  <p className="text-muted-foreground">Users Active</p>
                </div>
              </div>
              <Separator
                orientation="vertical"
                className="hidden h-auto md:block"
              />
              <Separator orientation="horizontal" className="block md:hidden" />
              <div className="flex justify-between gap-6">
                <div className="mx-auto">
                  <p className="mb-1.5 text-3xl font-bold">4.9</p>
                  <p className="text-muted-foreground">User Rating</p>
                </div>
                <Separator orientation="vertical" className="h-auto" />
                <div className="mx-auto">
                  <p className="mb-1.5 text-3xl font-bold">40+</p>
                  <p className="text-muted-foreground">Countries</p>
                </div>
              </div>
            </div>
          </div>
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="placeholder"
            className="ml-auto max-h-[450px] w-full rounded-xl object-cover"
          />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <div className="gap flex flex-col gap-3 rounded-lg border p-6">
              <div className="flex flex-col items-center gap-2 lg:flex-row">
                <Calendar className="h-auto w-6" />
                <h3 className="text-center text-lg font-medium lg:text-left">
                  Why Select Us?
                </h3>
              </div>
              <p className="text-center text-sm text-muted-foreground md:text-base lg:text-left">
                We provide a full set of management tools, including ways to
                collaborate easily.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="gap flex flex-col gap-3 rounded-lg border p-6">
              <div className="flex flex-col items-center gap-2 lg:flex-row">
                <Target className="h-auto w-6" />
                <h3 className="text-center text-lg font-medium lg:text-left">
                  Our Purpose
                </h3>
              </div>
              <p className="text-center text-sm text-muted-foreground md:text-base lg:text-left">
                Our goal is to simplify workflows and help teams achieve more
                with ease.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="gap flex flex-col gap-3 rounded-lg border p-6">
              <div className="flex flex-col items-center gap-2 lg:flex-row">
                <Users className="h-auto w-6" />
                <h3 className="text-center text-lg font-medium lg:text-left">
                  About Us
                </h3>
              </div>
              <p className="text-center text-sm text-muted-foreground md:text-base lg:text-left">
                Our team is dedicated to offering high-quality solutions with
                passion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature136 };
