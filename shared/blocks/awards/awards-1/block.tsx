import React from "react";

import { cn } from "@/lib/utils";

interface Awards1Props {
  className?: string;
}

const Awards1 = ({ className }: Awards1Props) => {
  const awards = [
    {
      name: "CSS Design Awards Winner",
      description: "Recognized for excellence in web design and functionality.",
      year: "2024",
    },
    {
      name: "Awwwards Site of the Day",
      description:
        "Featured for outstanding creativity and innovation in web development.",
      year: "2023",
    },
    {
      name: "Best UI/UX Design",
      description:
        "Awarded for exceptional user experience and interface design.",
      year: "2023",
    },
    {
      name: "Web Design Excellence",
      description:
        "Honored for superior design quality and technical implementation.",
      year: "2022",
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container space-y-10 lg:space-y-20">
        <div className="w-full grid-cols-6 gap-10 lg:grid">
          <div />
          <h1 className="col-span-4 text-5xl font-semibold tracking-tighter lg:pl-10 lg:text-8xl">
            Milestones
          </h1>
        </div>
        <div className="grid-cols-6 gap-10 space-y-12 lg:grid lg:space-y-0">
          <p className="flex-center hidden h-12 items-center text-foreground/40 lg:flex">
            Achievements
          </p>
          <div className="col-span-5 lg:pl-10">
            <table className="w-full border-collapse">
              <thead>
                <tr className="h-12 border-b text-left text-sm text-foreground/40">
                  <th className="font-normal">Name of the Award</th>
                  <th className="font-normal">Description</th>
                  <th className="text-left text-right font-normal">Year</th>
                </tr>
              </thead>
              <tbody>
                {awards.map((award, index) => (
                  <tr
                    key={index}
                    className="h-20 border-b text-left text-sm text-foreground/40"
                  >
                    <td className="text-lg font-medium tracking-tight text-foreground lg:text-xl">
                      {award.name}
                    </td>
                    <td>{award.description}</td>
                    <td className="text-right text-foreground">{award.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Awards1 };
