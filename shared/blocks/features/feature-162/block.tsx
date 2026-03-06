import { cn } from "@/lib/utils";

interface Feature162Props {
  className?: string;
}

const Feature162 = ({ className }: Feature162Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-4 flex flex-col gap-16 rounded-[36px] border border-gray-200 pt-10 pl-10 md:flex-row">
          <div className="max-w-96 text-lg">
            <span className="font-semibold">
              Always connected to your data.
            </span>{" "}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, cum!
          </div>
          <div className="w-full rounded-tl-[36px] rounded-br-[36px] p-1 pr-0 pb-0">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
              alt="logo"
              className="max-h-[450px] w-full rounded-tl-[36px] rounded-br-[36px] object-cover object-bottom transition-all duration-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-1">
          <div className="flex flex-col rounded-[36px] border border-gray-200">
            <div className="p-10 text-lg">
              <span className="font-semibold">A CRM for any use case.</span>{" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium officiis nam et deserunt, eos neque.
            </div>
            <div className="flex-1 basis-auto">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                alt="logo"
                className="h-full w-full rounded-b-[36px] object-cover transition-all duration-500"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex-1 basis-auto rounded-[36px]">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
                alt="logo"
                className="h-full w-full rounded-[36px] object-cover transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature162 };
