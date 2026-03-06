import { ArrowRight, CheckCircle, Mail } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Cta23Props {
  className?: string;
}

const Cta23 = ({ className }: Cta23Props) => {
  return (
    <section className={cn("bg-muted py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-start md:items-center">
          {/* Badge */}
          <Badge>
            <Mail className="mr-2 h-4 w-4" />
            Stay Informed
          </Badge>

          {/* Heading */}
          <h4 className="mt-4 text-2xl font-semibold tracking-tight md:text-center md:text-3xl xl:text-4xl">
            Subscribe to our newsletter
          </h4>

          {/* Description */}
          <p className="mt-2 text-lg font-medium text-muted-foreground md:text-center xl:text-xl">
            Get the <span className="text-primary">latest updates</span>,{" "}
            <span className="text-primary">tips</span>, and{" "}
            <span className="text-primary">exclusive</span> offers from AlignUI.
          </p>

          {/* Form */}
          <form className="mt-5 flex w-full flex-col gap-2 md:w-auto xl:mt-8 xl:gap-3">
            <div className="group relative flex w-full items-center gap-2 rounded-lg px-3 md:w-[416px]">
              <Input
                type="email"
                required
                placeholder="Enter your email..."
                className="bg-background"
              />
              <Button type="submit" aria-label="Submit form">
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </form>

          {/* Features */}
          <div className="mt-5 flex flex-wrap gap-4 md:justify-center xl:mt-8 xl:gap-7">
            <div className="flex items-center gap-2 text-sm xl:text-base">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Weekly updates
            </div>
            <div className="flex items-center gap-2 text-sm xl:text-base">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Exclusive content
            </div>
            <div className="flex items-center gap-2 text-sm xl:text-base">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Early access for features
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta23 };
