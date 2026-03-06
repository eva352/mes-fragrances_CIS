import { CornerDownRight, Mail, Smartphone } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Contact16Props {
  className?: string;
}

const Contact16 = ({ className }: Contact16Props) => {
  return (
    <section
      className={cn("dark bg-background py-32 text-foreground", className)}
    >
      <div className="container">
        <h1 className="text-5xl font-semibold tracking-tight lg:text-8xl">
          Get in Touch
          <sup>*</sup>
        </h1>
        <div className="mt-20 flex flex-col justify-between gap-10 lg:flex-row">
          <div className="w-full max-w-md">
            <p className="tracking-tight text-muted-foreground/50">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              vel ratione natus nihil harum, perferendis sint facilis possimus
              reprehenderit optio!
            </p>
            <div className="mt-10 flex justify-between">
              <a
                className="flex items-center gap-1 text-foreground/40 hover:text-foreground"
                href="tel:+1020020023"
              >
                {" "}
                <Smartphone className="h-4 w-4" /> +102 002 0023
              </a>
              <a
                className="flex items-center gap-1 text-foreground/40 hover:text-foreground"
                href="mailto:hello@company.com"
              >
                {" "}
                <Mail className="h-4 w-4" /> hello@company.com
              </a>
            </div>
          </div>
          <form className="col-span-4 flex w-full flex-col gap-2 lg:pl-30">
            <Input
              type="text"
              placeholder="Name*"
              className="h-19 rounded-none border-0 border-b border-b-foreground/15 !bg-transparent placeholder:text-foreground/20 focus-visible:ring-0"
            />
            <Input
              type="email"
              placeholder="Email*"
              className="h-19 rounded-none border-0 border-b border-b-foreground/15 !bg-transparent placeholder:text-foreground/20 focus-visible:ring-0"
            />
            <Input
              type="text"
              placeholder="Message (Tell us about your project)"
              className="h-19 rounded-none border-0 border-b border-b-foreground/15 !bg-transparent placeholder:text-foreground/20 focus-visible:ring-0"
            />
            <Button
              variant="ghost"
              className="mt-15 flex h-15 items-center justify-start gap-2 text-base"
            >
              <CornerDownRight className="size-6" />
              Get in touch
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export { Contact16 };
