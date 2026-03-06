import { Lightbulb, ShieldCheck } from "lucide-react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { cn } from "@/lib/utils";

interface Feature228Props {
  className?: string;
}

const Feature228 = ({ className }: Feature228Props) => {
  return (
    <section className={cn("bg-muted/50 py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-0">
          <div className="lg:pr-16">
            <h2 className="mb-5 text-5xl md:text-7xl md:leading-20">
              Smart Home,
              <br />
              Smart Life
            </h2>
            <p className="text-lg text-muted-foreground">
              Transform your living space with intelligent technology that
              adapts to your lifestyle and enhances your daily experiences.
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-10">
              <div>
                <span className="mb-4 grid size-12 place-items-center rounded-lg bg-muted-foreground/10">
                  <Lightbulb />
                </span>
                <h3 className="mb-2.5 text-sm font-semibold">
                  Intelligent Lighting
                </h3>
                <p className="text-sm text-muted-foreground">
                  Control brightness, color, and schedules with smart lighting
                  that responds to your routines and saves energy.
                </p>
              </div>
              <div>
                <span className="mb-4 grid size-12 place-items-center rounded-lg bg-muted-foreground/10">
                  <ShieldCheck />
                </span>
                <h3 className="mb-2.5 text-sm font-semibold">
                  Advanced Security
                </h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your home from anywhere with smart cameras, sensors,
                  and alerts that keep your property protected 24/7.
                </p>
              </div>
              <div>
                <div className="mb-4 flex gap-4">
                  <span className="grid size-12 place-items-center rounded-lg border border-border bg-primary">
                    <FaApple className="size-6 text-background" />
                  </span>
                  <span className="grid size-12 place-items-center rounded-lg border border-border bg-background">
                    <FcGoogle className="size-6" />
                  </span>
                </div>
                <h3 className="mb-2.5 text-sm font-semibold">
                  Ecosystem Integration
                </h3>
                <p className="text-sm text-muted-foreground">
                  Seamlessly connect with Apple and Google ecosystems for a
                  unified experience across all your devices.
                </p>
              </div>
              <div>
                <div className="mb-4 flex gap-4">
                  <span className="grid size-12 place-items-center rounded-lg border border-border bg-background">
                    <img
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/x.svg"
                      alt="logo"
                      className="size-6"
                    />
                  </span>
                  <span className="grid size-12 place-items-center rounded-lg border border-border bg-background">
                    <img
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/facebook-icon.svg"
                      alt="logo"
                      className="size-6"
                    />
                  </span>
                </div>
                <h3 className="mb-2.5 text-sm font-semibold">
                  Social Connectivity
                </h3>
                <p className="text-sm text-muted-foreground">
                  Share your content instantly across major social platforms
                  including X and Facebook with one-click publishing.
                </p>
              </div>
            </div>
          </div>
          <div className="flex h-full flex-col gap-6 sm:max-h-[440px] sm:flex-row xl:max-h-[550px]">
            <div className="flex flex-col gap-6">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                alt="placeholder"
                className="aspect-video rounded-2xl border border-border object-cover"
              />
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
                alt="placeholder"
                className="ml-auto aspect-video flex-1 rounded-2xl border border-border object-cover sm:aspect-auto sm:w-2/3"
              />
            </div>
            <div className="min-h-[580px] rounded-4xl border border-border p-2 sm:min-h-0 sm:max-w-56 sm:shrink-0 xl:max-w-72">
              <div className="flex h-full flex-col rounded-3xl border border-border bg-background px-1.5 pt-3 pb-1.5">
                <div className="mx-auto mb-3 h-4 w-16 rounded-full bg-muted-foreground/15 xl:h-5 xl:w-20" />
                <div className="flex-1">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                    alt="placeholder"
                    className="h-full rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature228 };
