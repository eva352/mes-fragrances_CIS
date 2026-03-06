import { Instagram, Linkedin, Twitter } from "lucide-react";

import { cn } from "@/lib/utils";

const sections = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Calendar", href: "#" },
      { name: "Conferencing", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Contact", href: "#" },
      { name: "Faq", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Pricing", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
];

interface Footer11Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  className?: string;
}
const Footer11 = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  className,
}: Footer11Props) => {
  return (
    <section className={cn("py-16 md:py-24 lg:py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-8 py-4 md:flex-row lg:py-8">
          {/* Logo */}
          <div className="w-full md:w-auto">
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                alt={logo.alt}
                title={logo.title}
                className="h-8"
              />
              <h2 className="text-lg font-semibold">{logo.title}</h2>
            </a>
          </div>

          {/* Menu */}
          <div className="w-full md:w-auto">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:flex md:gap-12 lg:gap-16">
              {sections.map((section, sectionIdx) => (
                <div key={sectionIdx} className="min-w-[120px]">
                  <h3 className="text-muted-foreground-subtle text-sm font-semibold">
                    {section.title}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx} className="hover:text-primary">
                        <a href={link.href}>{link.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div>
                <h3 className="text-muted-foreground-subtle text-sm font-semibold">
                  Social
                </h3>

                <div className="text-muted-foreground-subtle mt-4 flex gap-4">
                  <a
                    href="https://instagram.com"
                    aria-label="Instagram"
                    className="hover:text-primary"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="https://twitter.com"
                    aria-label="Twitter"
                    className="hover:text-primary"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href="https://Linkedin.com"
                    aria-label="Linkedin"
                    className="hover:text-primary"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/shadcnblocks-giant-text.png"
            className="w-full"
            alt="Shadcnblocks"
          />
        </div>
      </div>
    </section>
  );
};

export { Footer11 };
