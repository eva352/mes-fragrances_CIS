import { cn } from "@/lib/utils";

interface CaseStudies1Props {
  className?: string;
}

const CaseStudies1 = ({ className }: CaseStudies1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto grid max-w-2xl gap-6 lg:max-w-5xl lg:grid-cols-2">
          <a
            href="#"
            className="group relative row-span-2 flex aspect-square h-full flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-md lg:aspect-auto lg:p-10"
          >
            <img
              src="https://images.unsplash.com/photo-1623496258831-091279081ac5?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="placeholder"
              className="absolute inset-0 h-full w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/10"></div>
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-wordmark-white.svg"
              alt="logo"
              className="isolate h-7 w-fit"
            />
            <h2 className="isolate max-w-sm text-lg font-semibold text-white lg:text-xl lg:font-semibold">
              Discover how our solutions drive business growth
            </h2>
          </a>
          <a
            href="#"
            className="group relative flex aspect-3/2 h-full flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-md md:aspect-2/1 lg:p-10"
          >
            <img
              src="https://images.unsplash.com/photo-1572733438515-8f143a854f72?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="placeholder"
              className="absolute inset-0 h-full w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/10"></div>
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-wordmark-white.svg"
              alt="logo"
              className="isolate h-9 w-fit"
            />
            <h2 className="isolate max-w-sm text-lg font-semibold text-white lg:text-xl lg:font-semibold">
              Learn how our platform enhances business performance
            </h2>
          </a>
          <a
            href="#"
            className="group relative flex aspect-3/2 h-full flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-md md:aspect-2/1 lg:p-10"
          >
            <img
              src="https://images.unsplash.com/photo-1648665336208-def77a1ec189?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="placeholder"
              className="absolute inset-0 h-full w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/10"></div>
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-wordmark-white.svg"
              alt="logo"
              className="isolate h-8 w-fit"
            />
            <h2 className="isolate max-w-sm text-lg font-semibold text-white lg:text-xl lg:font-semibold">
              Discover how our tools empower your business for the future
            </h2>
          </a>
          <a
            href="#"
            className="group relative flex aspect-3/2 h-full flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-md md:aspect-2/1 lg:p-10"
          >
            <img
              src="https://images.unsplash.com/photo-1648665336176-7cb286e77d63?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="placeholder"
              className="absolute inset-0 h-full w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/10"></div>
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-wordmark-white.svg"
              alt="logo"
              className="isolate h-7 w-fit"
            />
            <h2 className="isolate max-w-sm text-lg font-semibold text-white lg:text-xl lg:font-semibold">
              Explore how our services can benefit your business
            </h2>
          </a>
          <a
            href="#"
            className="group relative row-span-2 flex aspect-square h-full flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-md lg:aspect-auto lg:p-10"
          >
            <img
              src="https://images.unsplash.com/photo-1647418413367-5ef9301153d9?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="placeholder"
              className="absolute inset-0 h-full w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/10"></div>
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/nextjs-wordmark-white.svg"
              alt="logo"
              className="isolate h-6 w-fit"
            />
            <h2 className="isolate max-w-sm text-lg font-semibold text-white lg:text-xl lg:font-semibold">
              See how our offerings boost your success in business
            </h2>
          </a>
          <a
            href="#"
            className="group relative flex aspect-3/2 h-full flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-md md:aspect-2/1 lg:p-10"
          >
            <img
              src="https://images.unsplash.com/photo-1647517649469-ba454dc72896?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="placeholder"
              className="absolute inset-0 h-full w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/10"></div>
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/supabase-wordmark-white.svg"
              alt="logo"
              className="isolate h-8 w-fit"
            />
            <h2 className="isolate max-w-sm text-lg font-semibold text-white lg:text-xl lg:font-semibold">
              Learn how our services can elevate your success in business growth
            </h2>
          </a>
        </div>
      </div>
    </section>
  );
};

export { CaseStudies1 };
