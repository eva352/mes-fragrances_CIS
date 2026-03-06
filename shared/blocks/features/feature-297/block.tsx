import { cn } from "@/lib/utils";

interface Feature297Props {
  className?: string;
}

const Feature297 = ({ className }: Feature297Props) => {
  return (
    <section
      className={cn(
        "py-32 font-handwriting text-background dark:text-foreground",
        className,
      )}
    >
      <div className="container">
        <div className="grid gap-4 md:grid-cols-3">
          <a href="#" className="group relative overflow-hidden rounded-sm">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/kevin-chin-qk4S-s0IX68-unsplash.jpg"
              alt="placeholder"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <span className="text-2xl tracking-wide">001</span>
              <h2 className="text-4xl font-medium tracking-tight">
                Ultimate Privacy
              </h2>
            </div>
          </a>
          <a href="#" className="group relative overflow-hidden rounded-sm">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simon-lee-BRHLD4L1Hag-unsplash.jpg"
              alt="placeholder"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <span className="text-2xl tracking-wide">002</span>
              <h2 className="text-4xl font-medium tracking-tight">
                Multi-Touch Technology
              </h2>
            </div>
          </a>
          <a href="#" className="group relative overflow-hidden rounded-sm">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simon-lee-R_6A6CovgIM-unsplash.jpg"
              alt="placeholder"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <span className="text-2xl tracking-wide">003</span>
              <h2 className="text-4xl font-medium tracking-tight">
                Innovative Engine
              </h2>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export { Feature297 };
