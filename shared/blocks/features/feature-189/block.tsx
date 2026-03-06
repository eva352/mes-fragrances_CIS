"use client";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Feature189Props {
  className?: string;
}

const Feature189 = ({ className }: Feature189Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative mb-8 lg:mb-0">
            {/* Middle Image */}
            <div className="relative -top-12 z-10 mx-auto w-[50%] sm:w-[35%]">
              <img
                alt="Placeholder 2"
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                className="h-[200px] rounded-lg object-cover shadow-lg sm:h-[300px]"
              />
            </div>
            {/* Left Image */}
            <div className="absolute top-8 left-0 z-0 w-[50%] -rotate-12 sm:w-[35%]">
              <img
                alt="Placeholder 1"
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                className="h-[200px] rounded-lg object-cover shadow-lg sm:h-[300px]"
              />
            </div>
            {/* Right Image */}
            <div className="absolute top-8 right-0 z-20 w-[50%] rotate-12 sm:w-[35%]">
              <img
                alt="Placeholder 3"
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
                className="h-[200px] rounded-lg object-cover shadow-lg sm:h-[300px]"
              />
            </div>
          </div>

          {/* Right Side: Content Section */}
          <div className="max-w-xl max-lg:mx-auto lg:ml-auto">
            <h2 className="text-2xl font-medium text-black sm:text-3xl md:text-4xl lg:max-w-[80%]">
              Transform your business with our tools
            </h2>

            {/* List of Features */}
            <div className="mt-6 grid gap-6 sm:mt-10 sm:gap-10">
              {/* Feature 1 */}
              <div className="flex items-start gap-4">
                <div>
                  <p className="font-semibold text-black">Boost productivity</p>
                  <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                    Automate repetitive tasks and streamline your workflow to
                    focus on what truly matters.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4">
                <div>
                  <p className="font-semibold text-black">
                    Real-time collaboration
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                    Work seamlessly with your team, no matter where they are,
                    with real-time updates and communication.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4">
                <div>
                  <p className="font-semibold text-black">Advanced analytics</p>
                  <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                    Gain insights into your performance with powerful analytics
                    and data-driven decision-making tools.
                  </p>
                </div>
              </div>
            </div>

            {/* Button */}
            <Button
              variant="secondary"
              className="mt-6 flex items-center gap-1 sm:mt-10"
            >
              Learn more
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature189 };
