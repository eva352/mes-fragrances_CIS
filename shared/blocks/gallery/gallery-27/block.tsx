"use client";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const teamMembers = [
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person1.jpeg",
    title: "Joana Doe",
    designation: "Creative Director",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person2.jpeg",
    title: "John Smith",
    designation: "Lead Developer",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person3.jpeg",
    title: "Alice Johnson",
    designation: "Project Manager",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person4.jpeg",
    title: "Robert Brown",
    designation: "UX Designer",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person5.jpeg",
    title: "Emily White",
    designation: "Marketing Specialist",
  },
];

interface Gallery27Props {
  className?: string;
}

const Gallery27 = ({ className }: Gallery27Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="font-calSans text-6xl">The Team Behind Our Success</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magnam veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliqui
        </p>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="relative w-full pt-15"
        >
          <div className="absolute top-0 right-0 flex h-12 w-20 items-center justify-end gap-2">
            <CarouselPrevious
              variant="default"
              className="absolute left-0 rounded-none"
            />
            <CarouselNext
              variant="default"
              className="absolute right-0 rounded-none"
            />
          </div>
          <CarouselContent>
            {teamMembers.map((member, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <div className="group">
                  <img
                    src={member.src}
                    alt={member.title}
                    className="h-92 w-full object-cover transition-all duration-300 group-hover:translate-y-[-10px]"
                  />
                  <h3 className="mt-4 text-2xl font-semibold">
                    {member.title}
                  </h3>
                  <p className="text-muted-foreground">{member.designation}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Gallery27 };
