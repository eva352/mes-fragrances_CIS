import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature28Props {
  className?: string;
}

const Feature28 = ({ className }: Feature28Props) => {
  return (
    <section className={cn("bg-gray-50 py-32 dark:bg-background", className)}>
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="rounded-lg border bg-muted p-4 md:p-6">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
                alt="placeholder"
                className="aspect-video max-h-[500px] w-full rounded-lg object-cover"
              />
            </div>
            <div className="p-6">
              <div className="mb-1 flex items-center gap-2 font-semibold">
                Copy paste components <Badge>New</Badge>
              </div>
              <p className="text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                laboriosam voluptatibus temporibus doloremque laudantium.
              </p>
              <a href="#" className="mt-4 flex items-center gap-2 font-medium">
                Learn more
                <ChevronRight className="w-4" />
              </a>
            </div>
          </div>
          <div>
            <div className="rounded-lg border bg-muted p-4 md:p-6">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
                alt="placeholder"
                className="aspect-video max-h-[500px] w-full rounded-lg object-cover"
              />
            </div>
            <div className="p-6">
              <p className="mb-1 flex items-center gap-2 font-semibold">
                100% customizable
              </p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                laboriosam voluptatibus temporibus doloremque laudantium.
              </p>
              <a href="#" className="mt-4 flex items-center gap-2 font-medium">
                Learn more
                <ChevronRight className="w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature28 };
