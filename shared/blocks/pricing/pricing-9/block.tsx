"use client";

import { CheckIcon, Info, MinusIcon } from "lucide-react";
import { Fragment, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TierName = "Free" | "Pro" | "Premium";

interface Tier {
  name: string;
  price: string;
  annualPrice: string;
  description: string;
}

interface Feature {
  name: string;
  tiers: Partial<Record<TierName, boolean>>;
  tooltip?: string;
}

interface Section {
  name: string;
  features: Feature[];
}

const tiers: Tier[] = [
  {
    name: "Free",
    price: "$0",
    annualPrice: "$0",
    description: "Quis suspendisse ut fermentum neque vivamus.",
  },
  {
    name: "Pro",
    price: "$10",
    annualPrice: "$100",
    description: "Quis eleifend a tincidunt pellentesque.",
  },
  {
    name: "Premium",
    price: "$15",
    annualPrice: "$150",
    description: "Orci volutpat ut sed sed neque, dui eget.",
  },
];
const sections: Section[] = [
  {
    name: "Key Features",
    features: [
      {
        name: "Live Collaboration",
        tiers: { Free: true, Pro: true, Premium: true },
        tooltip: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        name: "Unlimited projects",
        tiers: { Free: true, Pro: true, Premium: true },
        tooltip: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        name: "Custom permissions",
        tiers: { Pro: true, Premium: true },
        tooltip: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        name: "Team members",
        tiers: {
          Premium: true,
        },
        tooltip: "Lorem ipsum dolor sit amet, consectetur",
      },
    ],
  },
  {
    name: "Reporting",
    features: [
      {
        name: "Basic reports",
        tiers: { Free: true, Pro: true, Premium: true },
        tooltip: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        name: "Advanced reports",
        tiers: { Pro: true, Premium: true },
        tooltip: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        name: "Custom reports",
        tiers: { Premium: true },
        tooltip: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        name: "Export data",
        tiers: { Premium: true },
        tooltip: "Lorem ipsum dolor sit amet, consectetur",
      },
    ],
  },
];

interface Pricing9Props {
  className?: string;
}

const Pricing9 = ({ className }: Pricing9Props) => {
  const [isAnnual, setIsAnnual] = useState(false);
  return (
    <section className={cn("py-24 sm:py-32", className)}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Choose Your Plan
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
          Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et
          quasi.
        </p>
        <div className="mt-10 flex flex-col items-center gap-2 lg:hidden">
          <span className="flex items-center gap-3 text-base font-medium">
            Annual
            <Switch
              checked={isAnnual}
              onCheckedChange={() => setIsAnnual(!isAnnual)}
            />
            Monthly
          </span>
        </div>

        <div className="mx-auto mt-12 max-w-md space-y-8 sm:mt-16 lg:hidden">
          {tiers.map((tier) => (
            <Card key={tier.name} className="p-8">
              <CardHeader className="p-0">
                <div className="flex flex-col gap-2 text-center">
                  <span className="text-xl leading-7 font-bold uppercase">
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                  </span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {tier.description}
                  </span>
                </div>
                <div className="flex flex-col justify-center gap-x-1 pt-8 text-center">
                  <span className="text-4xl font-bold">
                    {isAnnual ? tier.annualPrice : tier.price}
                  </span>
                  <span className="text-sm leading-6 text-muted-foreground">
                    /month
                  </span>
                </div>
              </CardHeader>
              <Button className="mt-8 w-full">Buy plan</Button>
              <CardContent className="p-0">
                <ul className="mt-10 space-y-4 text-sm leading-6">
                  <TooltipProvider>
                    {sections.map((section) => (
                      <li key={section.name}>
                        <ul role="list" className="space-y-4">
                          {section.features.map(
                            (feature) =>
                              feature.tiers[tier.name as TierName] && (
                                <li
                                  key={feature.name}
                                  className="flex items-center justify-between"
                                >
                                  <span className="flex items-center gap-3">
                                    <CheckIcon className="h-5 w-5 flex-none" />
                                    <span>{feature.name}</span>
                                  </span>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Info className="ml-1 h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      {feature.tooltip}
                                    </TooltipContent>
                                  </Tooltip>
                                </li>
                              ),
                          )}
                        </ul>
                      </li>
                    ))}
                  </TooltipProvider>
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="isolate mt-20 hidden lg:block">
          <div className="relative -mx-8">
            {tiers.map((tier, idx) => (
              <div
                className="absolute inset-x-4 inset-y-0 -z-10 flex"
                key={tier.name}
              >
                <div
                  className="flex w-1/4 px-4"
                  style={{
                    marginLeft: `${(idx + 1) * 25}%`,
                  }}
                >
                  <div className="w-full border-x" />
                </div>
              </div>
            ))}
            <table className="w-full table-fixed border-separate border-spacing-x-8 text-left">
              <thead>
                <tr>
                  <td />
                  {tiers.map((tier) => (
                    <th key={tier.name} className="px-6 pt-6 xl:px-8 xl:pt-8">
                      <div className="flex flex-col gap-2 text-center">
                        <span className="text-xl leading-7 font-bold uppercase">
                          {tier.name}
                        </span>
                        <span className="text-sm font-normal text-muted-foreground">
                          {tier.description}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-normal text-muted-foreground">
                        Billings
                      </p>
                      <span className="flex items-center gap-3 text-base font-medium">
                        Annual
                        <Switch
                          checked={isAnnual}
                          onCheckedChange={() => setIsAnnual(!isAnnual)}
                        />
                        Monthly
                      </span>
                    </div>
                  </th>
                  {tiers.map((tier) => (
                    <td key={tier.name} className="px-6 pt-10 xl:px-8">
                      <div className="flex flex-col justify-center gap-x-1 text-center">
                        <span className="text-4xl font-bold">
                          {isAnnual ? tier.annualPrice : tier.price}
                        </span>
                        <span className="text-sm leading-6 text-muted-foreground">
                          /month
                        </span>
                      </div>
                      <Button className="mt-8 w-full">Get Started</Button>
                    </td>
                  ))}
                </tr>
                {sections.map((section, sectionIdx) => (
                  <Fragment key={section.name}>
                    <tr>
                      <th
                        className={cn(
                          "pb-4 text-sm leading-6 font-semibold",
                          sectionIdx === 0 ? "pt-8" : "pt-16",
                        )}
                      >
                        {section.name}
                      </th>
                    </tr>
                    <TooltipProvider delayDuration={200}>
                      {section.features.map((feature) => (
                        <tr key={feature.name}>
                          <th className="flex items-center justify-between py-4 text-sm leading-6 font-normal">
                            {feature.name}
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="ml-1 h-4 w-4 text-muted-foreground hover:text-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>{feature.tooltip}</TooltipContent>
                            </Tooltip>
                          </th>
                          {tiers.map((tier) => (
                            <td key={tier.name} className="px-6 py-4 xl:px-8">
                              <>
                                {feature.tiers[tier.name as TierName] ? (
                                  <CheckIcon className="mx-auto h-5 w-5" />
                                ) : (
                                  <MinusIcon className="mx-auto h-5 w-5 text-muted-foreground" />
                                )}
                              </>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </TooltipProvider>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
export { Pricing9 };
