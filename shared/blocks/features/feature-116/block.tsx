import { Atom, ChevronRight, Settings, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature116Props {
  className?: string;
}

const Feature116 = ({ className }: Feature116Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="mb-4 text-center text-4xl font-semibold">
          Dynamic Layouts
        </h1>
        <p className="text-center text-muted-foreground">
          Adapt the box to suit any purpose
        </p>
        <div className="grid grid-cols-1 gap-y-5 pt-14 xl:grid-cols-3 xl:grid-rows-2 xl:gap-x-5 xl:gap-y-0">
          <a
            href="#"
            className="group relative col-span-2 row-span-3 overflow-hidden rounded-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1653288973812-81d1951b8127?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="placeholder"
              className="h-full max-h-[580px] w-full rounded-xl object-cover object-center"
            />
            <div className="absolute top-0 right-0 bottom-0 left-0 translate-y-20 rounded-xl bg-linear-to-t from-primary to-transparent transition-transform duration-300 group-hover:translate-y-0"></div>
            <div className="absolute top-0 flex h-full w-full flex-col justify-between p-7">
              <span className="ml-auto flex w-fit items-center gap-1 p-2.5 text-sm font-semibold text-background">
                <Atom className="h-auto w-6" />
                Sustainability Focus
              </span>
              <div className="flex flex-col gap-5 text-background">
                <h4 className="text-2xl font-semibold lg:text-3xl">
                  Build stunning websites with ease
                </h4>
                <p className="flex items-center gap-1 font-medium">
                  Get started today
                  <ChevronRight className="h-auto w-4" />
                </p>
              </div>
            </div>
          </a>
          <div className="grid gap-y-5 xl:row-span-2">
            <a href="#" className="group relative overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1647715360138-33fb6fe68539?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="placeholder"
                className="h-full max-h-44 w-full rounded-xl object-cover object-center"
              />
              <div className="absolute top-0 right-0 bottom-0 left-0 translate-y-10 rounded-xl bg-linear-to-t from-primary to-transparent opacity-80 transition-transform duration-300 group-hover:translate-y-0"></div>
              <div className="absolute top-0 flex h-full w-full flex-col justify-between p-7">
                <span className="ml-auto flex w-fit items-center gap-1 p-2.5 text-sm font-semibold text-background">
                  <Settings className="h-auto w-6" />
                  Options
                </span>
                <div className="flex flex-col gap-5 text-background">
                  <h4 className="text-2xl font-semibold lg:text-3xl">
                    Explore now
                  </h4>
                  <p className="flex items-center gap-1 font-medium">
                    Explore all features
                    <ChevronRight className="h-auto w-4" />
                  </p>
                </div>
              </div>
            </a>
            <a
              href="#"
              className="group relative row-span-2 overflow-hidden rounded-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1563952532949-3d1a874ad614?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="placeholder"
                className="h-full max-h-96 w-full rounded-xl object-cover object-center"
              />
              <div className="absolute top-0 right-0 bottom-0 left-0 translate-y-20 rounded-xl bg-linear-to-t from-primary to-transparent transition-transform duration-300 group-hover:translate-y-0"></div>
              <div className="absolute top-0 flex h-full w-full flex-col justify-between p-7">
                <span className="ml-auto flex w-fit items-center gap-1 p-2.5 text-sm font-semibold text-background">
                  <Zap className="h-auto w-6 fill-background" />
                  Latest Collection
                </span>
                <div className="flex flex-col gap-5 text-background">
                  <h4 className="text-2xl font-semibold lg:text-3xl">
                    Redefine your industry leadership.
                  </h4>
                  <p className="flex items-center gap-1 font-medium">
                    Shop now
                    <ChevronRight className="h-auto w-4" />
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature116 };
