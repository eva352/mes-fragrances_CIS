import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature23Props {
  className?: string;
}

const Feature23 = ({ className }: Feature23Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
          <Badge variant="outline">Features</Badge>
          <h2 className="text-4xl font-medium">
            Various integrations to help you grow your business
          </h2>
          <p className="text-lg text-muted-foreground">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente
            sunt deleniti aliquid voluptates, nihil culpa enim.
          </p>
        </div>
        <div className="mt-20 grid gap-10 lg:grid-cols-3 xl:gap-20">
          <div className="flex flex-col lg:block">
            <div className="h-full max-h-[500px] rounded-lg border bg-muted p-3">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
                alt="placeholder"
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
            <div className="p-6">
              <div className="mb-1 font-semibold">Copy paste components</div>
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
          <div className="flex flex-col lg:block">
            <div className="h-full max-h-[500px] rounded-lg border bg-muted p-3">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg"
                alt="placeholder"
                className="h-full w-full rounded-lg object-cover"
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
          <div className="flex flex-col lg:block">
            <div className="h-full max-h-[500px] rounded-lg border bg-muted p-3">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg"
                alt="placeholder"
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
            <div className="p-6">
              <p className="mb-1 flex items-center gap-2 font-semibold">
                24/7 support
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

export { Feature23 };
