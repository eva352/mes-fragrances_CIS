import { cn } from "@/lib/utils";

interface About2Props {
  className?: string;
}

const About2 = ({ className }: About2Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="flex flex-col gap-28">
        <div className="container flex flex-col gap-10 text-center md:gap-24">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            <h1 className="text-4xl font-medium md:text-6xl">Our Background</h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Discover how our solution simplifies complex processes, making it
              easier to manage key operations and deliver exceptional
              experiences.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-12">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
              alt="placeholder"
              className="size-full max-h-96 rounded-xl object-cover md:col-span-5"
            />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
              alt="placeholder"
              className="size-full max-h-96 rounded-xl object-cover md:col-span-4"
            />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
              alt="placeholder"
              className="size-full max-h-96 rounded-xl object-cover md:col-span-3"
            />
          </div>
        </div>
        <div className="container flex flex-col gap-16">
          <h2 className="max-w-3xl text-4xl font-medium md:text-5xl">
            We excel in our field, but skill isn&apos;t everything we offer.
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            <div className="flex flex-col gap-6 border-b pb-8">
              <p className="text-4xl font-medium md:text-5xl">21M</p>
              <p className="text-muted-foreground">Global Reach of Users</p>
            </div>
            <div className="flex flex-col gap-6 border-b pb-8">
              <p className="text-4xl font-medium md:text-5xl">12+</p>
              <p className="text-muted-foreground">Years of Expertise</p>
            </div>
            <div className="flex flex-col gap-6 border-b pb-8">
              <p className="text-4xl font-medium md:text-5xl">654</p>
              <p className="text-muted-foreground">Projects Completed</p>
            </div>
            <div className="flex flex-col gap-6 border-b pb-8">
              <p className="text-4xl font-medium md:text-5xl">113k+</p>
              <p className="text-muted-foreground">Monthly Active Users</p>
            </div>
            <div className="flex flex-col gap-6 border-b pb-8">
              <p className="text-4xl font-medium md:text-5xl">461k</p>
              <p className="text-muted-foreground">Registered Accounts</p>
            </div>
            <div className="flex flex-col gap-6 border-b pb-8">
              <p className="text-4xl font-medium md:text-5xl">98+</p>
              <p className="text-muted-foreground">Daily Users</p>
            </div>
          </div>
        </div>
        <div className="bg-muted/50 py-24">
          <div className="container flex flex-col items-center gap-11">
            <p className="text-center text-xl font-medium">
              Trusted by leading product teams worldwide.
            </p>
            <div className="grid grid-cols-2 gap-x-7 gap-y-12 lg:grid-cols-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                  alt="logo"
                  className="h-8 w-auto md:h-14"
                />
                <p className="text-xl font-semibold md:text-4xl">Acme</p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg"
                  alt="logo"
                  className="h-8 w-auto md:h-14"
                />
                <p className="text-xl font-semibold md:text-4xl">Creative</p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-3.svg"
                  alt="logo"
                  className="h-8 w-auto md:h-14"
                />
                <p className="text-xl font-semibold md:text-4xl">Octan</p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-4.svg"
                  alt="logo"
                  className="h-8 w-auto md:h-14"
                />
                <p className="text-xl font-semibold md:text-4xl">Newco</p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-5.svg"
                  alt="logo"
                  className="h-8 w-auto md:h-14"
                />
                <p className="text-xl font-semibold md:text-4xl">Contoso</p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-6.svg"
                  alt="logo"
                  className="h-8 w-auto md:h-14"
                />
                <p className="text-xl font-semibold md:text-4xl">Fabrikam</p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                  alt="logo"
                  className="h-8 w-auto md:h-14"
                />
                <p className="text-xl font-semibold md:text-4xl">Litware</p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg"
                  alt="logo"
                  className="h-8 w-auto md:h-14"
                />
                <p className="text-xl font-semibold md:text-4xl">Northwind</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container flex flex-col items-center gap-14">
          <h2 className="text-center text-4xl font-semibold md:text-5xl">
            See the Benefits Firsthand
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="grid grid-cols-1 gap-6 md:col-span-2 md:grid-cols-2 md:flex-row lg:col-span-1 lg:grid-cols-1 lg:flex-col">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                alt="placeholder"
                className="max-h-96 w-full rounded-xl object-cover"
              />
              <div className="flex flex-col justify-center rounded-xl bg-muted p-8">
                <p className="mb-2 text-4xl font-medium">21M</p>
                <p className="mb-6 font-semibold">Global Users</p>
                <p className="text-muted-foreground">
                  Streamline tasks and boost efficiency by up to 80% using our
                  tools.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                alt="placeholder"
                className="h-full rounded-xl object-cover"
              />
              <div className="absolute right-6 bottom-6 left-6 rounded-xl bg-background p-4">
                <div className="mb-4 flex items-center gap-2">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                    alt="placeholder"
                    className="h-7 w-auto"
                  />
                  <span className="text-lg font-semibold">Acme.</span>
                </div>
                <p className="mb-6 text-sm">
                  Our solution helps you reduce costs by half with improved
                  operations.
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="font-medium">John Doe,</span>
                  <span className="text-sm text-muted-foreground">
                    CEO at Acme.
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="rounded-xl bg-muted p-8">
                <p className="mb-2 text-4xl font-medium">97%</p>
                <p className="mb-6 font-semibold">Minimized Errors</p>
                <p className="text-muted-foreground">
                  Achieve greater accuracy and efficiency with our advanced
                  toolkit.
                </p>
              </div>
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
                alt="placeholder"
                className="max-h-96 rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About2 };
