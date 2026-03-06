import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";

interface Feature29Props {
  className?: string;
}

const Feature29 = ({ className }: Feature29Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <div className="order-1 flex flex-col gap-2 rounded-lg border p-2">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
              alt="placeholder"
              className="aspect-video w-full rounded-lg border object-cover"
            />
            <Separator />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
              alt="placeholder"
              className="aspect-video w-full rounded-lg border object-cover"
            />
          </div>
          <div className="order-3 rounded-lg border p-2">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
              alt="placeholder"
              className="h-full w-full rounded-lg border object-cover"
            />
          </div>
          <div className="order-2 -mt-6 max-w-[412px] md:order-3">
            <p className="mb-6 text-sm text-muted-foreground md:mb-12">
              Lorem ipsum dolor sit amet.
            </p>
            <h3 className="mb-3 text-2xl font-medium md:mb-6">
              Quality and Durability
            </h3>
            <p className="mb-6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi
              distinctio maiores sint cupiditate ab ullam numquam a similique
              vel itaque.
            </p>
            <a href="#" className="font-medium hover:underline">
              Learn more about our process
            </a>
          </div>
          <div className="order-4 -mt-6 max-w-[412px] md:order-3">
            <p className="mb-6 text-sm text-muted-foreground md:mb-12">
              Lorem ipsum dolor sit amet.
            </p>
            <h3 className="mb-3 text-2xl font-medium md:mb-6">
              Transform Your Space a Reality
            </h3>
            <p className="mb-6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi
              distinctio maiores sint cupiditate ab ullam numquam a similique
              vel itaque.
            </p>
            <a href="#" className="font-medium hover:underline">
              Learn more about our process
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature29 };
