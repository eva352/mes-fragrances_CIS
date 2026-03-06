import { cn } from "@/lib/utils";

interface Feature39Props {
  className?: string;
}

const Feature39 = ({ className }: Feature39Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="mb-9 text-3xl font-semibold lg:mb-14 lg:text-4xl">
          Awesome features to start with
        </h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <div>
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
              alt="feature"
              className="aspect-video max-h-96 w-full rounded-lg object-cover"
            />
            <p className="mt-8 mb-2 text-lg font-semibold">Integrations</p>
            <p className="mb-4 text-muted-foreground">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
              eaque corrupti illum sapiente!
            </p>
            <a href="#" className="font-medium underline">
              Learn more
            </a>
          </div>
          <div>
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
              alt="feature"
              className="aspect-video max-h-96 w-full rounded-lg object-cover"
            />
            <p className="mt-8 mb-2 text-lg font-semibold">Analytics</p>
            <p className="mb-4 text-muted-foreground">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
              eaque corrupti illum sapiente!
            </p>
            <a href="#" className="font-medium underline">
              Learn more
            </a>
          </div>
          <div>
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
              alt="feature"
              className="aspect-video max-h-96 w-full rounded-lg object-cover"
            />
            <p className="mt-8 mb-2 text-lg font-semibold">Search & Filter</p>
            <p className="mb-4 text-muted-foreground">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
              eaque corrupti illum sapiente!
            </p>
            <a href="#" className="font-medium underline">
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature39 };
