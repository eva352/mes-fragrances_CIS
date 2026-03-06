import {
  ArrowRight,
  Clock,
  FileText,
  Lock,
  MessageSquare,
  Paperclip,
  Presentation,
  Shield,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const list = [
  {
    icon: Lock,
    text: "Enterprise-grade SSO integration",
  },
  {
    icon: FileText,
    text: "Flexible billing and invoicing",
  },
  {
    icon: Shield,
    text: "Comprehensive security assessment",
  },
  {
    icon: Paperclip,
    text: "Custom service-level agreement",
  },
  {
    icon: Users,
    text: "Personalized account management",
  },
  {
    icon: Presentation,
    text: "Hands-on onboarding sessions",
  },
  {
    icon: Clock,
    text: "SLA-backed priority assistance",
  },
  {
    icon: MessageSquare,
    text: "Real-time chat with support team",
  },
];

const List = () => {
  return (
    <ul
      className={cn(
        "grid max-w-[36.25rem] grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2",
      )}
    >
      {list.map((item, i) => (
        <li key={`cta-item-${i}`} className="flex items-center gap-3">
          <item.icon className="size-5 stroke-white" />
          <div className="text-sm text-white">{item.text}</div>
        </li>
      ))}
    </ul>
  );
};

interface Cta28Props {
  className?: string;
}

const Cta28 = ({ className }: Cta28Props) => {
  return (
    <section
      className={cn("dark bg-background py-32 text-foreground", className)}
    >
      <div className="container">
        <div className="relative grid grid-cols-1 overflow-hidden rounded-[0.75rem] px-8 pt-10 pb-12 xl:grid-cols-2 xl:px-15.5 xl:pb-15.5">
          <div className="flex flex-col gap-6 md:gap-9">
            <p className="font-serif text-4xl md:text-6xl lg:text-7xl">
              <span className="block">Enterprise:</span>A solution for all
            </p>
            <p className="text-lg md:text-xl lg:text-2xl">
              Empower every teammate — and produce more videos!
            </p>
            <List />
            <div>
              <Button size="lg" className="w-full md:w-fit">
                Get in touch to discover more!
                <ArrowRight />
              </Button>
            </div>
          </div>
          <div className="hidden xl:block">
            <div className="absolute top-0 right-0 h-[40.9375rem] w-[36.875rem]">
              <div className="absolute top-0 right-0 aspect-[1.15] w-[14.375rem] opacity-60">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/fabian-centeno-njeVb6E3XB8-unsplash.jpg"
                  alt=""
                  className="size-full object-cover object-center"
                />
              </div>
              <div className="absolute top-50 right-0 z-10 aspect-[0.709248555] w-[17.5rem] overflow-hidden rounded-tl-md">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jason-goodman-ZJlfUi5rTDU-unsplash.jpg"
                  alt=""
                  className="size-full object-cover object-center"
                />
              </div>
              <div className="absolute top-60 right-0 aspect-[1.353211009] w-[36.875rem] overflow-hidden rounded-tl-2xl opacity-25">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/redd-f-5U_28ojjgms-unsplash.jpg"
                  alt=""
                  className="size-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta28 };
