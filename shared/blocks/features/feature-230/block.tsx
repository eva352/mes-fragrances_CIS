import { Cpu, Database, Globe, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";

const features = [
  {
    title: "Globally Distributed",
    description:
      "Deploy applications close to your users. Our network spans multiple regions, ensuring low latency and high availability worldwide.",
    icon: Globe,
  },
  {
    title: "Scalable Compute",
    description:
      "Adapt resources on demand. Handle traffic spikes and complex workloads effortlessly with our flexible computing options.",
    icon: Cpu,
  },
  {
    title: "Managed Databases",
    description:
      "Focus on your application, not database administration. Reliable, scalable, and secure managed database solutions.",
    icon: Database,
  },
  {
    title: "Layered Security",
    description:
      "Protect your data and applications with comprehensive security measures, from network firewalls to DDoS mitigation.",
    icon: ShieldCheck,
  },
];

interface Feature230Props {
  className?: string;
}

const Feature230 = ({ className }: Feature230Props) => {
  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="relative container">
        <div className="absolute -top-px left-1/2 h-px w-screen -translate-x-1/2 bg-border" />
        <img
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
          alt="placeholder"
          className="relative left-1/2 aspect-video max-h-[680px] w-screen max-w-none -translate-x-1/2 rounded-b-xl border-b border-border object-cover lg:static lg:max-w-full lg:translate-x-0 lg:border-x"
        />
        <div className="mt-20 grid gap-8 lg:grid-cols-10">
          <div className="lg:col-span-4">
            <h2 className="mb-8 text-5xl font-medium text-balance md:text-7xl">
              Build Scalable Cloud Apps
            </h2>
            <p className="text-xl text-muted-foreground">
              Our platform provides the infrastructure and tools you need to
              launch and grow your applications. Focus on innovation, we handle
              the complexity.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-6">
            {features.map((feature, idx) => (
              <div key={idx}>
                <feature.icon className="size-6" />
                <h3 className="mt-4 text-lg font-medium">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature230 };
