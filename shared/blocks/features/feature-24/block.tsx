import { ChevronRight, LayoutTemplate } from "lucide-react";

import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";

interface Feature24Props {
  className?: string;
}

const Feature24 = ({ className }: Feature24Props) => {
  return (
    <section className={cn("mb-32 border-b pt-32", className)}>
      <div className="container max-w-7xl">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <LayoutTemplate className="size-5 text-primary" />
            <p>UI Components</p>
          </div>
          <a href="#" className="hover:text-primary hover:underline">
            Learn more
            <ChevronRight className="ml-2 inline-block size-4" />
          </a>
        </div>
        <Separator className="mt-3 mb-8" />
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <h2 className="text-3xl font-medium md:w-1/2">
            Use our UI components to build your website faster
          </h2>
          <p className="leading-7 text-muted-foreground md:w-1/2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae
            praesent, ad ullam quis cupiditate atque maxime alias eaque
            repellendus perferendis, nemo repudiandae.
          </p>
        </div>
        <img
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg"
          alt="placeholder"
          className="mt-10 aspect-video w-full rounded-t-lg object-cover lg:mt-16"
        />
      </div>
    </section>
  );
};

export { Feature24 };
