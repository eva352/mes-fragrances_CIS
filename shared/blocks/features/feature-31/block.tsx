import { cn } from "@/lib/utils";

interface Feature31Props {
  className?: string;
}

const Feature31 = ({ className }: Feature31Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-medium md:mb-11 md:text-7xl">
            Let&apos;s Make Your Space Beautiful
          </h1>
          <p className="font-medium md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            nisi accusantium voluptate aspernatur minima.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <div className="order-1 flex h-full items-center rounded-lg bg-muted">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
              alt="placeholder"
              className="aspect-video w-full object-cover"
            />
          </div>
          <div className="order-3 h-full rounded-lg bg-muted md:px-10 md:pt-10">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg"
              alt="placeholder"
              className="h-full rounded-t-lg object-cover"
            />
          </div>
          <div className="order-2 -mt-6 max-w-[412px] md:order-3">
            <p className="mb-6 text-sm text-muted-foreground md:mb-12">
              Lorem ipsum dolor sit amet.
            </p>
            <h3 className="mb-3 text-2xl font-medium md:mb-6">
              Perfect for Any Space
            </h3>
            <p className="mb-6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi
              distinctio maiores sint cupiditate ab ullam numquam a similique
              vel itaque.
            </p>
            <a href="#" className="font-medium hover:underline">
              Learn how to get started
            </a>
          </div>
          <div className="order-4 -mt-6 max-w-[412px] md:order-3">
            <p className="mb-6 text-sm text-muted-foreground md:mb-12">
              Lorem ipsum dolor sit amet.
            </p>
            <h3 className="mb-3 text-2xl font-medium md:mb-6">
              Modern and Sleek Design
            </h3>
            <p className="mb-6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi
              distinctio maiores sint cupiditate ab ullam numquam a similique
              vel itaque.
            </p>
            <a href="#" className="font-medium hover:underline">
              Learn to customize your space
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature31 };
