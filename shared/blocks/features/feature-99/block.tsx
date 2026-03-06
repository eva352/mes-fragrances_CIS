import { cn } from "@/lib/utils";

interface Feature99Props {
  className?: string;
}

const Feature99 = ({ className }: Feature99Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-20">
          <div className="flex h-fit items-center gap-2.5 text-lg whitespace-nowrap">
            <span className="size-3 shrink-0 rounded-full bg-green-500"></span>
            Get started
          </div>
          <div>
            <h2 className="mb-11 text-3xl lg:text-5xl">Quick Setup Guide</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col gap-1 border-l pr-4 pl-4 md:pl-8">
                <span className="font-mono text-4xl lg:text-6xl">1</span>
                <h3 className="mt-2 text-xl font-medium">
                  Integrate your HR platform effortlessly
                </h3>
                <p className="text-sm text-muted-foreground">
                  Our platform supports 38 HR systems, ensuring a smooth
                  connection in just two minutes.
                </p>
              </div>
              <div className="flex flex-col gap-1 border-l pr-4 pl-4 md:pl-8">
                <span className="font-mono text-4xl lg:text-6xl">2</span>
                <h3 className="mt-2 text-xl font-medium">
                  Sync employees with ease{" "}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Automatically import your team into our system, enabling you
                  to start analyzing the data instantly.
                </p>
              </div>
              <div className="flex flex-col gap-1 border-l pr-4 pl-4 md:pl-8">
                <span className="font-mono text-4xl lg:text-6xl">3</span>
                <h3 className="mt-2 text-xl font-medium">
                  Dive into insights and manage your team
                </h3>
                <p className="text-sm text-muted-foreground">
                  Whether you work solo or with a team, explore benchmarks,
                  review offers, and streamline leveling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature99 };
