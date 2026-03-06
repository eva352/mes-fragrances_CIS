"use client";

import { Code, GitBranch, List, WandSparkles } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const integrations = [
  {
    image:
      "https://images.unsplash.com/photo-1653288973812-81d1951b8127?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    logo: <Code strokeWidth={1} className="h-5 w-5" />,
    title: "Build",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas laboriosam, tempore amet esse",
  },
  {
    image:
      "https://images.unsplash.com/photo-1572733438515-8f143a854f72?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    logo: <GitBranch strokeWidth={1} className="h-5 w-5" />,
    title: "Refine",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas laboriosam, tempore amet esse",
  },
  {
    image:
      "https://images.unsplash.com/photo-1546414701-81cc6963c67f?q=80&w=2144&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    logo: <List strokeWidth={1} className="h-5 w-5" />,
    title: "Work",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas laboriosam, tempore amet esse",
  },
  {
    image:
      "https://images.unsplash.com/photo-1623496258831-091279081ac5?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    logo: <WandSparkles strokeWidth={1} className="h-5 w-5" />,
    title: "Report",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas laboriosam, tempore amet esse",
  },
];

interface Feature160Props {
  className?: string;
}

const Feature160 = ({ className }: Feature160Props) => {
  const [cardNumber, setCardNumber] = useState(0);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-20 max-w-lg">
          <h1 className="mb-4 text-6xl font-bold lg:text-[52px]">
            A CRM created to be your own.
          </h1>
          <h3 className="text-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
            cupiditate commodi vitae nostrum facilis qui?
          </h3>
        </div>
        <Tabs
          className="border-opacity-100 rounded-3xl border border-gray-200 px-5 pt-4 sm:px-10 sm:pt-9"
          defaultValue="0"
        >
          <TabsList className="mb-14 grid h-full grid-cols-1 gap-x-8 gap-y-6 bg-transparent p-0 md:grid-cols-2 lg:grid-cols-4">
            {integrations.map((item, index) => (
              <TabsTrigger
                key={index}
                value={index.toString()}
                onClick={() => setCardNumber(index)}
                className={`${index === cardNumber ? "opacity-100" : "opacity-50"} block cursor-pointer border-0 text-left whitespace-normal transition-all duration-500 hover:opacity-80 data-[state=active]:shadow-none`}
              >
                <div className="mb-2 flex items-center gap-2">
                  {item.logo}
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                </div>
                <p className="text-base font-medium">{item.description}</p>
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="rounded-t-[28px] p-1 pb-0">
            {integrations.map((item, index) => (
              <TabsContent value={index.toString()} key={index} className="m-0">
                <img
                  src={item.image}
                  alt="logo"
                  className="max-h-[400px] w-full rounded-t-[28px] object-cover object-bottom transition-all duration-500"
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export { Feature160 };
