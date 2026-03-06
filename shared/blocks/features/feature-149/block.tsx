"use client";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Feature149Props {
  className?: string;
}

const Feature149 = ({ className }: Feature149Props) => {
  return (
    <section className={cn("py-12 md:py-32", className)}>
      <div className="container px-4 md:px-6">
        <div className="relative flex flex-col md:flex-row md:gap-0">
          {/* Background image - positioned absolutely */}
          <img
            src="https://images.unsplash.com/photo-1653288973812-81d1951b8127?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Background image"
            className="absolute top-0 left-0 z-[-1] h-full w-full rounded-2xl object-cover"
          />

          {/* Left panel */}
          <div
            className="group relative flex h-[300px] w-full cursor-pointer flex-col items-start gap-6 p-6 md:h-[600px] md:w-1/2 md:p-10 md:transition-[width] hover:md:w-2/3"
            onClick={() => {
              window.scrollTo({ top: 0 });
            }}
          >
            <div className="md:backdrop-blur-0 md:group-hover:backdrop-blur-0 absolute top-0 left-0 z-[-1] h-full w-full rounded-t-[20px] bg-linear-to-b from-black/40 to-black/30 backdrop-filter transition-all duration-500 ease-out group-hover:from-black/30 group-hover:to-black/20 group-hover:backdrop-blur-[2px] md:rounded-2xl md:from-black/40 md:to-black/30 md:transition-colors md:duration-300 group-hover:md:from-black/50 group-hover:md:to-black/40" />
            <Button
              variant="outline"
              className="rounded-full border-white/20 bg-background/10 text-white hover:bg-background/20"
            >
              CRM Software
            </Button>
            <h1 className="text-3xl font-bold text-white md:text-5xl">
              Streamline Sales
            </h1>
            <p className="max-w-md text-left text-white/90">
              Streamline your sales process with our innovative CRM software.
              Manage leads, track interactions, and boost your sales efficiency.
            </p>
          </div>

          {/* Desktop divider - only visible on desktop */}
          <div className="relative hidden h-[600px] w-5 bg-background md:block">
            <div className="absolute top-0 left-[-40px] h-[40px] w-[40px] rounded-[1rem] shadow-[10px_-10px_0_0_#fff]" />
            <div className="absolute top-0 right-[-40px] h-[40px] w-[40px] rounded-[1rem] shadow-[-10px_-10px_0_0_#fff]" />
            <div className="absolute bottom-0 left-[-40px] h-[40px] w-[40px] rounded-[1rem] shadow-[10px_10px_0_0_#fff]" />
            <div className="absolute right-[-40px] bottom-0 h-[40px] w-[40px] rounded-[1rem] shadow-[-10px_10px_0_0_#fff]" />
          </div>

          {/* Right panel */}
          <div
            className="group relative flex h-[300px] w-full cursor-pointer flex-col items-start gap-6 p-6 md:h-[600px] md:w-1/2 md:items-end md:p-10 md:transition-[width] hover:md:w-2/3"
            onClick={() => {
              console.log("click");
            }}
          >
            <div className="md:backdrop-blur-0 md:group-hover:backdrop-blur-0 absolute top-0 left-0 z-[-1] h-full w-full rounded-b-[20px] bg-linear-to-t from-black/40 to-black/30 backdrop-filter transition-all duration-500 ease-out group-hover:from-black/30 group-hover:to-black/20 group-hover:backdrop-blur-[2px] md:rounded-2xl md:from-black/40 md:to-black/30 md:transition-colors md:duration-300 group-hover:md:from-black/50 group-hover:md:to-black/40" />
            <Button
              variant="outline"
              className="rounded-full border-white/20 bg-background/10 text-white hover:bg-background/20"
            >
              Analytics Suite
            </Button>
            <h1 className="text-left text-3xl font-bold text-white md:text-right md:text-5xl">
              Measure Success
            </h1>
            <p className="max-w-md text-left text-white/90 md:text-right">
              Enhance customer satisfaction and retention with our powerful CRM
              tools. Analyze data and make informed decisions to drive growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature149 };
