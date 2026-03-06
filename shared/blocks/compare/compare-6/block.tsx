"use client";

import { CircleCheck, CircleMinus, CircleX } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Compare6Props {
  className?: string;
}

const Compare6 = ({ className }: Compare6Props) => {
  const comparisonData = {
    features: [
      "Initial cost",
      "Scalability",
      "Performance",
      "Maintenance",
      "Data recovery",
      "Lifespan",
    ],
    models: [
      {
        name: "SSD",
        attributes: [
          { value: "Medium to high", status: "negative" },
          { value: "Limited by size", status: "neutral" },
          { value: "Very fast", status: "positive" },
          { value: "Low maintenance", status: "positive" },
          { value: "Challenging", status: "negative" },
          { value: "5-7 years", status: "neutral" },
        ],
      },
      {
        name: "Cloud Storage",
        attributes: [
          { value: "Pay-as-you-go", status: "positive" },
          { value: "Unlimited scaling", status: "positive" },
          { value: "Depends on connection", status: "neutral" },
          { value: "Managed service", status: "positive" },
          { value: "Provider dependent", status: "neutral" },
          { value: "Indefinite", status: "positive" },
        ],
      },
      {
        name: "NAS",
        attributes: [
          { value: "High upfront", status: "negative" },
          { value: "Expandable", status: "positive" },
          { value: "Network limited", status: "neutral" },
          { value: "Regular upkeep", status: "negative" },
          { value: "Built-in redundancy", status: "positive" },
          { value: "7-10 years", status: "positive" },
        ],
      },
    ],
  };

  const [selectedTab, setSelectedTab] = useState(comparisonData.models[0].name);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <Tabs
          defaultValue={comparisonData.models[0].name}
          onValueChange={setSelectedTab}
          className="mb-6 block md:hidden"
        >
          <TabsList className="w-full">
            {comparisonData.models.map((model, idx) => (
              <TabsTrigger key={idx} value={model.name}>
                {model.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="[&>div]:overflow-visible">
          <Table className="table-fixed [&_td]:border [&_th]:border">
            <TableHeader>
              <TableRow>
                <TableHead className="sticky top-0 mb-24 w-1/4 bg-background p-5 text-base font-medium text-primary after:absolute after:right-0 after:-bottom-px after:left-0 after:h-px after:bg-border">
                  Feature
                </TableHead>
                {comparisonData.models.map((model, idx) => (
                  <TableHead
                    key={idx}
                    className={cn(
                      "sticky top-0 mb-24 w-1/4 bg-background p-5 text-center text-base font-medium text-primary after:absolute after:right-0 after:-bottom-px after:left-0 after:h-px after:bg-border md:table-cell",
                      model.name !== selectedTab ? "hidden" : "",
                    )}
                  >
                    {model.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.features.map((feature, rowIdx) => (
                <TableRow key={rowIdx}>
                  <TableCell className="p-5 font-semibold whitespace-normal">
                    {feature}
                  </TableCell>
                  {comparisonData.models.map((model, colIdx) => (
                    <TableCell
                      key={colIdx}
                      className={cn(
                        "p-5 text-center whitespace-normal md:table-cell",
                        model.name !== selectedTab ? "hidden" : "",
                      )}
                    >
                      <div className="flex flex-col items-center gap-1 text-muted-foreground">
                        {model.attributes[rowIdx].status === "positive" && (
                          <span className="flex size-8 items-center justify-center rounded-full border border-green-200 bg-green-100">
                            <CircleCheck className="size-4 text-green-700" />
                          </span>
                        )}
                        {model.attributes[rowIdx].status === "negative" && (
                          <span className="flex size-8 items-center justify-center rounded-full border border-red-200 bg-red-100">
                            <CircleX className="size-4 text-red-700" />
                          </span>
                        )}
                        {model.attributes[rowIdx].status === "neutral" && (
                          <span className="flex size-8 items-center justify-center rounded-full border border-amber-200 bg-amber-100">
                            <CircleMinus className="size-4 text-amber-700" />
                          </span>
                        )}

                        {model.attributes[rowIdx].value}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export { Compare6 };
