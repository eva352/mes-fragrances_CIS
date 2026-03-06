import { cn } from "@/lib/utils";

interface Feature37Props {
  className?: string;
}

const Feature37 = ({ className }: Feature37Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          <div className="flex flex-col justify-between rounded-lg bg-accent md:col-span-2">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
              alt="placeholder"
              className="aspect-video h-full max-h-72 w-full"
            />
            <div className="p-6">
              <p className="mb-3 text-lg font-semibold">
                Lorem ipsum dolor sit.
              </p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                laboriosam voluptatibus temporibus doloremque laudantium.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-lg bg-accent md:col-span-3">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
              alt="placeholder"
              className="aspect-video h-full max-h-72 w-full"
            />
            <div className="p-6">
              <p className="mb-3 text-lg font-semibold">
                Lorem ipsum dolor sit.
              </p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                laboriosam voluptatibus temporibus doloremque laudantium.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-lg bg-accent md:col-span-3">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
              alt="placeholder"
              className="aspect-video h-full max-h-72 w-full"
            />
            <div className="p-6">
              <p className="mb-3 text-lg font-semibold">
                Lorem ipsum dolor sit.
              </p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                laboriosam voluptatibus temporibus doloremque laudantium.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-lg bg-accent md:col-span-2">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg"
              alt="placeholder"
              className="aspect-video h-full max-h-72 w-full"
            />
            <div className="p-6">
              <p className="mb-3 text-lg font-semibold">
                Lorem ipsum dolor sit.
              </p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                laboriosam voluptatibus temporibus doloremque laudantium.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature37 };
