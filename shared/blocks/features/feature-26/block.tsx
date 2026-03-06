import {
  Code,
  Infinity as InfinityIcon,
  Lock,
  MessageCircle,
  Text,
  Upload,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const features = [
  {
    title: "100% Secure",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, numquam possimus necessitatibus voluptatem eius.",
    icon: <Lock className="h-5" />,
  },
  {
    title: "24/7 Support",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, numquam possimus necessitatibus voluptatem eius.",
    icon: <MessageCircle className="h-5" />,
  },
  {
    title: "Unlimited Access",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, numquam possimus necessitatibus voluptatem eius.",
    icon: <InfinityIcon className="h-5" />,
  },
  {
    title: "Easy to Use",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, numquam possimus necessitatibus voluptatem eius.",
    icon: <Text className="h-5" />,
  },
  {
    title: "Built for Developers",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, numquam possimus necessitatibus voluptatem eius.",
    icon: <Code className="h-5" />,
  },
  {
    title: "Always Up to Date",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, numquam possimus necessitatibus voluptatem eius.",
    icon: <Upload className="h-5" />,
  },
];

interface Feature26Props {
  className?: string;
}

const Feature26 = ({ className }: Feature26Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <Badge className="mb-6" variant="outline">
          Features
        </Badge>
        <h2 className="text-3xl font-medium">
          Lorem ipsum dolor sit amet consectetur.
        </h2>
        <Separator className="my-16" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div key={idx} className="flex gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent">
                {feature.icon}
              </span>
              <div>
                <h3 className="text-lg font-medium">{feature.title}</h3>
                <p className="leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature26 };
