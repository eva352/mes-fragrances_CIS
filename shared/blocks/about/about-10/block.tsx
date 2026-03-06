import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

const profile = {
  title: "SaaS Startup",
  subtitle: "Building the future of productivity",
  bio: `We're a team of passionate innovators building cutting-edge SaaS solutions that help businesses streamline their operations and boost productivity. Our mission is to create software that not only solves today's problems but anticipates tomorrow's challenges.`,
  vision: `We believe in the power of technology to transform how businesses operate. Our goal is to build intuitive, scalable solutions that grow with our customers and adapt to their evolving needs.`,
  outro: `Join thousands of businesses that trust our platform to power their success. Let's build something amazing together.`,
  team: [
    { id: "01", item: "Sarah Chen", type: "CEO & Co-founder" },
    { id: "02", item: "Marcus Rodriguez", type: "CTO & Co-founder" },
    { id: "03", item: "Emily Watson", type: "Head of Product" },
    { id: "04", item: "David Kim", type: "Lead Engineer" },
    { id: "05", item: "Lisa Thompson", type: "Head of Design" },
    { id: "06", item: "Alex Johnson", type: "Head of Marketing" },
    { id: "07", item: "Rachel Green", type: "Head of Sales" },
  ],
};

interface About10Props {
  className?: string;
}

const About10 = ({ className }: About10Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col-reverse gap-5 md:flex-row md:gap-12">
          <div className="w-full md:w-1/3 md:pr-4">
            <div className="sticky top-20 md:p-6">
              <div className="mb-8">
                <div className="mb-6 flex items-center gap-4">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/futuristic-device-design-qcufu.png"
                    alt="SaaS Startup Team"
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{profile.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {profile.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              <nav>
                <div className="py-4">
                  <div className="group flex p-0 text-start text-xl font-medium hover:bg-transparent sm:text-2xl">
                    <span className="border-b-2 border-border pb-0.5 transition-colors">
                      Contact Us
                    </span>
                    <ArrowUpRight className="ml-1 h-6 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </nav>
            </div>
          </div>

          <div className="w-full md:w-2/3 md:p-6">
            <div className="max-w-4xl">
              <h1 className="mb-12 text-7xl font-semibold">About Us</h1>

              <div className="space-y-12">
                <p className="w-full text-2xl leading-[36px] font-medium md:max-w-2xl">
                  {profile.bio}
                </p>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                  <h2 className="text-2xl font-medium">Core Philosophy</h2>
                  <p className="leading-relaxed">{profile.vision}</p>
                </div>

                <div className="my-12">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw12.jpeg"
                    alt="SaaS startup office"
                    className="rounded-2xl object-cover"
                  />
                </div>

                <div>
                  <h2 className="mb-8 text-2xl font-medium">Our Team</h2>
                  <div className="space-y-6">
                    {profile.team.map(({ id, item, type }) => (
                      <div
                        key={id}
                        className="flex items-center justify-between border-b py-4"
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-sm text-muted-foreground">
                            {id}
                          </span>
                          <span className="text-base">{item}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-16">
                  <p className="leading-relaxed">{profile.outro}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About10 };
