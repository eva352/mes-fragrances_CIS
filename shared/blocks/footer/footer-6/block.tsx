import { cn } from "@/lib/utils";

const sitemap = [
  {
    title: "Company",
    links: [
      {
        title: "About Us",
        href: "#",
      },
      {
        title: "Careers",
        href: "#",
      },
      {
        title: "Contact",
        href: "#",
      },
      {
        title: "Press",
        href: "#",
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        title: "Help Center",
        href: "#",
      },
      {
        title: "Community",
        href: "#",
      },
      {
        title: "Status",
        href: "#",
      },
      {
        title: "API Docs",
        href: "#",
      },
    ],
  },
];

interface Footer6Props {
  className?: string;
}

const Footer6 = ({ className }: Footer6Props) => {
  return (
    <section className={cn("py-16", className)}>
      <div className="container">
        <footer>
          <div className="relative mb-8 flex w-full flex-col gap-x-28 gap-y-8 md:flex-row md:justify-between md:gap-y-0">
            <div className="max-w-96">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-lg border border-border bg-accent p-2">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                    alt="placeholder logo"
                    className="size-12 h-full w-full object-contain object-center"
                  />
                </div>
                <h3 className="text-xl font-bold">Shadcnblocks.com</h3>
              </div>
              <p className="text-base font-medium text-muted-foreground">
                Components made easy.
              </p>
            </div>
            <div className="flex flex-col items-start gap-x-20 gap-y-14 xl:flex-row">
              <div className="inline-grid w-fit grid-cols-1 gap-x-20 gap-y-14 sm:grid-cols-2">
                {sitemap.map((section) => (
                  <div key={section.title} className="h-fit w-min">
                    <h4 className="mb-6 text-base font-semibold whitespace-nowrap">
                      {section.title}
                    </h4>
                    <ul className="space-y-3 text-base font-medium text-muted-foreground">
                      {section.links.map((link) => (
                        <li key={link.title}>
                          <a
                            href={link.href}
                            className="text-base whitespace-nowrap hover:text-accent-foreground"
                          >
                            {link.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-baseline justify-between gap-8 border-t border-border pt-8 md:flex-row md:gap-16">
            <div className="text-xs text-muted-foreground sm:text-sm">
              &copy; Shadcnblocks.com 2024
            </div>
            <div className="flex flex-col items-start gap-4 text-xs text-muted-foreground sm:text-sm md:flex-row lg:items-center">
              <a href="#" className="hover:text-accent-foreground">
                Terms & Conditions
              </a>
              <a href="#" className="hover:text-accent-foreground">
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer6 };
