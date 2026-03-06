import { cn } from "@/lib/utils";

interface Feature163Props {
  className?: string;
}

const Feature163 = ({ className }: Feature163Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 grid-rows-4 gap-4 lg:grid-cols-5 lg:grid-rows-2">
          <div className="col-span-1 row-span-1 flex flex-col rounded-[36px] border border-gray-200 lg:col-span-3">
            <div className="max-w-md px-10 pt-10 pb-16 text-lg">
              <span className="font-semibold">Real-time collaboration.</span>{" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              deserunt enim iste nihil! Voluptatem
            </div>
            <div className="ml-10 flex-1 basis-auto rounded-tl-[36px] rounded-br-[36px] p-1 pr-0 pb-0">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                alt="logo"
                className="h-full w-full rounded-tl-[36px] rounded-br-[36px] object-cover object-bottom transition-all duration-500"
              />
            </div>
          </div>
          <div className="col-span-1 row-span-1 flex flex-col rounded-[36px] border border-gray-200 lg:col-span-2">
            <div className="max-w-md p-10 text-lg">
              <span className="font-semibold">Build from anywhere.</span> Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Quasi deserunt
              enim iste nihil!
            </div>
            <div className="mx-20 flex-1 basis-auto rounded-t-[36px] p-1 pb-0">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                alt="logo"
                className="h-full w-full rounded-t-[36px] object-cover object-bottom transition-all duration-500"
              />
            </div>
          </div>
          <div className="col-span-1 row-span-1 flex flex-col rounded-[36px] border border-gray-200 lg:col-span-2">
            <div className="max-w-md px-10 pt-10 pb-16 text-lg">
              <span className="font-semibold">Permission control.</span> Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Quasi deserunt
              enim
            </div>
            <div className="mr-10 flex-1 basis-auto rounded-tr-[36px] rounded-bl-[36px] p-1 pb-0 pl-0">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
                alt="logo"
                className="h-full w-full rounded-tr-[36px] rounded-bl-[36px] object-cover object-bottom transition-all duration-500"
              />
            </div>
          </div>
          <div className="col-span-1 row-span-1 flex flex-col rounded-[36px] border border-gray-200 lg:col-span-3">
            <div className="max-w-md px-10 pt-10 pb-16 text-lg">
              <span className="font-semibold">Hold that thought.</span> Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Quasi deserunt
              enim iste nihil!
            </div>
            <div className="mx-10 mb-10 flex-1 basis-auto rounded-[36px] p-1">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg"
                alt="logo"
                className="h-full w-full rounded-[36px] object-cover object-bottom transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature163 };
