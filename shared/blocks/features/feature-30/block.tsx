import { cn } from "@/lib/utils";

interface Feature30Props {
  className?: string;
}

const Feature30 = ({ className }: Feature30Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-16 md:grid md:grid-cols-3 md:gap-10">
          <div className="order-1 flex h-full items-end rounded-lg bg-muted pt-10 pr-5 md:pt-20 md:pr-10">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
              alt="placeholder"
              className="h-full w-full rounded-tr-lg object-cover"
            />
          </div>
          <div className="order-3 rounded-lg bg-muted pt-10 pl-5 md:order-2 md:col-span-2 md:pt-20 md:pl-10">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-8.svg"
              alt="placeholder"
              className="max-h-[500px] w-full rounded-tl-lg object-cover"
            />
          </div>
          <div className="order-2 -mt-6 md:order-3">
            <p className="mb-6 text-sm text-muted-foreground md:mb-12">
              Lorem ipsum dolor sit amet.
            </p>
            <h3 className="mb-3 text-2xl font-medium md:mb-6">
              Quality and Durability
            </h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi
              distinctio maiores sint cupiditate ab ullam numquam a similique
              vel itaque.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature30 };
