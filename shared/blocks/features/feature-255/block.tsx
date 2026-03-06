import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const contributors = [
  {
    name: "Sarah Johnson",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    title: "Open Source Advocate 💻",
    description:
      "Building innovative solutions with modern tech stacks – passionate about clean code, scalability, and mentoring junior developers.",
  },
  {
    name: "Marcus Rodriguez",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    title: "UI/UX Designer & Creative Thinker 🎨",
    description:
      "Crafting beautiful user experiences that delight and convert – focused on accessibility, user research, and design systems.",
  },
  {
    name: "Emily Chen",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    title: "DevOps Engineer & Cloud Specialist ☁️",
    description:
      "Streamlining deployments and optimizing infrastructure – expert in automation, monitoring, and building resilient systems.",
  },
  {
    name: "David Thompson",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    title: "Product Manager & Strategy Expert 📊",
    description:
      "Turning ideas into successful products that users love – specializing in roadmap planning, user feedback, and data-driven decisions.",
  },
  {
    name: "Luna Patel",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    title: "Performance Optimizer 📱",
    description:
      "Creating smooth mobile experiences across platforms – focused on native performance, user engagement, and cross-platform solutions.",
  },
  {
    name: "Alex Kim",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
    title: "Data Scientist & ML Engineer 🤖",
    description:
      "Extracting insights from complex datasets and building intelligent systems – passionate about predictive modeling and automation.",
  },
];

interface Feature255Props {
  className?: string;
}

const Feature255 = ({ className }: Feature255Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium">Top contributors this month</p>
            <Button variant="outline">View all</Button>
          </div>
          <div className="mt-7">
            <div className="flex flex-col gap-10">
              {contributors.map((contributor, idx) => (
                <div key={idx}>
                  <div className="flex gap-3 md:gap-4">
                    <img
                      src={contributor.image}
                      alt={contributor.name}
                      className="size-10 rounded-lg border border-border md:size-12"
                    />
                    <div>
                      <p className="flex flex-col font-medium md:flex-row md:items-center md:gap-1 md:text-lg">
                        {contributor.name}
                        <span className="text-sm whitespace-nowrap text-muted-foreground md:text-base md:font-normal">
                          {contributor.title}
                        </span>
                      </p>
                      <p className="hidden text-muted-foreground md:block">
                        {contributor.description}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground md:hidden md:text-base">
                    {contributor.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature255 };
