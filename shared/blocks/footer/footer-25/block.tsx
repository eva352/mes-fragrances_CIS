import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const data = {
  logo: {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "blocks for shadcn/ui",
    title: "Shadcnblocks.com",
    url: "https://www.shadcnblocks.com",
  },
  tagline: "Let's Connect",
  personalMessage:
    "I'm passionate about creating beautiful, functional components that make your projects shine. Let's work together to bring your vision to life.",
  ctaText: "Schedule a call",
  contact: {
    phone: "+1 (555) 123-4567",
    email: "hello@artiststudio.com",
    location: "NYC",
    timezone: "EST",
  },
  menuItems: [
    {
      title: "Portfolio",
      links: [
        { text: "Overview", url: "#" },
        { text: "Projects", url: "#" },
        { text: "Pricing", url: "#" },
        { text: "About", url: "#" },
      ],
    },
    {
      title: "Social",
      links: [
        { text: "Twitter", url: "#" },
        { text: "Instagram", url: "#" },
        { text: "LinkedIn", url: "#" },
      ],
    },
  ],
  copyright: "© 2025 Shadcnblocks.com. All rights reserved.",
  bottomLinks: [
    { text: "Terms and Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
  ],
};

interface Footer25Props {
  className?: string;
}

const Footer25 = ({ className }: Footer25Props) => {
  return (
    <section
      className={cn("bg-cover bg-center bg-no-repeat py-32", className)}
      style={{
        backgroundImage:
          "url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/daniel-leone-g30P1zcOzXo-unsplash.jpg')",
      }}
    >
      <div className="container">
        <div className="mx-auto max-w-7xl rounded-lg bg-background p-8 shadow-lg md:p-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            <div className="lg:col-span-1">
              <div className="mb-4 flex items-center gap-4">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/cool-dude.jpg"
                  alt="Artist profile"
                  className="h-16 w-16 rounded-full object-cover"
                />
                <h3 className="text-2xl font-medium">Let's Chat</h3>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {data.personalMessage}
              </p>
              <Button>{data.ctaText}</Button>
            </div>
            {data.menuItems.map((menu, idx) => (
              <div key={idx}>
                <h3 className="mb-4 text-sm font-medium tracking-wider text-primary uppercase">
                  {menu.title}
                </h3>
                <ul className="space-y-3">
                  {menu.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.url}
                        className="border-b border-transparent text-muted-foreground transition-all duration-300 ease-in-out hover:border-primary hover:text-primary"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="mb-4 text-sm font-medium tracking-wider text-primary uppercase">
                Contact
              </h3>
              <ul className="space-y-3">
                <li className="text-muted-foreground">{data.contact.phone}</li>
                <li className="text-muted-foreground">{data.contact.email}</li>
                <li className="text-muted-foreground">
                  {data.contact.location} • {data.contact.timezone}
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
            <p className="text-sm text-muted-foreground">{data.copyright}</p>
            <div className="flex gap-4">
              {data.bottomLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Footer25 };
