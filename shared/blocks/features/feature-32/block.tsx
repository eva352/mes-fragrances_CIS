import { cn } from "@/lib/utils";

interface Feature32Props {
  className?: string;
}

const Feature32 = ({ className }: Feature32Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="mb-14 text-center text-4xl font-medium lg:text-7xl">
          Loved by clients
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-accent p-16 md:col-span-2 lg:col-span-2 lg:row-span-2">
            <div className="flex h-full flex-col justify-between gap-14">
              <q className="pt-8 text-2xl font-medium lg:pt-14 lg:text-4xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dignissimos ipsum perspiciatis consectetur assumenda incidunt.
              </q>
              <div className="text-sm">
                <p className="font-semibold">John Doe</p>
                <p>CEO, Company Example</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-accent p-10">
            <div className="flex flex-col gap-14">
              <q className="text-lg font-medium">
                Lorem ipsum dolor sit amet consecte adipisicing elit.
              </q>
              <div className="text-sm">
                <p className="font-semibold">John Doe</p>
                <p>CEO, Company Example</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-accent p-10">
            <div className="flex flex-col gap-14">
              <q className="text-lg font-medium">
                Lorem ipsum dolor sit amet consecte adipisicing elit.
              </q>
              <div className="text-sm">
                <p className="font-semibold">John Doe</p>
                <p>CEO, Company Example</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature32 };
