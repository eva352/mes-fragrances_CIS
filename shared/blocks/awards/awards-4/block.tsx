import React from "react";

import { cn } from "@/lib/utils";

interface Awards4Props {
  className?: string;
}

const Awards4 = ({ className }: Awards4Props) => {
  const awards = [
    {
      name: "CSS Design Awards Winner",
      description: "Recognized for excellence in web design and functionality.",
      year: "2024",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    },
    {
      name: "Awwwards Site of the Day",
      description:
        "Featured for outstanding creativity and innovation in web development.",
      year: "2023",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg",
    },
    {
      name: "Best UI/UX Design",
      description:
        "Awarded for exceptional user experience and interface design.",
      year: "2023",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-3.svg",
    },
    {
      name: "Web Design Excellence",
      description:
        "Honored for superior design quality and technical implementation.",
      year: "2022",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-4.svg",
    },
    {
      name: "Mobile App of the Year",
      description:
        "Recognized for innovative mobile design and user experience.",
      year: "2022",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-5.svg",
    },
    {
      name: "Digital Innovation Award",
      description:
        "Celebrated for breakthrough digital solutions and creative technology.",
      year: "2021",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-6.svg",
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container space-y-10 lg:space-y-20">
        <div className="flex w-full items-end justify-between">
          <h1 className="text-5xl font-semibold tracking-tighter lg:text-8xl">
            Awards
          </h1>
          <h2 className="text-lg font-semibold tracking-tighter lg:text-3xl">
            (2015-25©)
          </h2>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="h-12 border-b text-left text-foreground/40">
              <th className="hidden min-w-30 font-normal lg:table-cell lg:min-w-40"></th>
              <th className="font-normal">Name</th>
              <th className="hidden font-normal md:table-cell">Nomination</th>
              <th className="text-left text-right font-normal">Year</th>
            </tr>
          </thead>
          <tbody>
            {awards.map((award, index) => (
              <tr
                key={index}
                className="h-20 border-b text-left text-foreground/40"
              >
                <td className="hidden font-medium tracking-tight text-foreground/50 lg:table-cell">
                  (00{index + 1})
                </td>
                <td className="text-lg font-medium tracking-tight text-foreground lg:text-xl">
                  <div className="flex items-center gap-2">
                    <span className="size-8 rounded-xl bg-foreground object-cover p-1.5">
                      <img src={award.logo} className="invert" alt="" />
                    </span>
                    {award.name}
                  </div>
                </td>
                <td className="hidden md:table-cell">{award.description}</td>
                <td className="text-right text-foreground">{award.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export { Awards4 };
