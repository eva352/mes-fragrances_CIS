import {
  CheckIcon,
  HeadphonesIcon,
  PuzzleIcon,
  ShieldCheckIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const featureGroups = [
  {
    title: "Security",
    icon: ShieldCheckIcon,
    features: [
      "Two-factor authentication",
      "End-to-end encryption",
      "Regular security audits",
      "Role-based access control",
      "Data backup & recovery",
    ],
  },
  {
    title: "Integration & APIs",
    icon: PuzzleIcon,
    features: [
      "REST API access",
      "Webhook support",
      "Third-party integrations",
      "Custom API endpoints",
      "Developer documentation",
    ],
  },
  {
    title: "Support & Resources",
    icon: HeadphonesIcon,
    features: [
      "Priority email support",
      "Video tutorials library",
      "Knowledge base access",
      "Community forums",
      "Regular webinars",
    ],
  },
];

interface Feature229Props {
  className?: string;
}

const Feature229 = ({ className }: Feature229Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="max-w-5xl text-4xl text-balance md:text-6xl">
          Security, Integration, and Expert Support
        </h2>
        <div className="mt-16 grid gap-16 md:mt-20 md:grid-cols-3 md:gap-6">
          {featureGroups.map((group, idx) => (
            <div key={idx}>
              <span className="flex size-12 items-center justify-center rounded-xl bg-muted">
                <group.icon className="size-5" />
              </span>
              <h3 className="my-6 font-semibold">{group.title}</h3>
              <ul className="space-y-4">
                {group.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckIcon className="size-4 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature229 };
