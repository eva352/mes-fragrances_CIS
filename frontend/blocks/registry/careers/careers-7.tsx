import { Button } from "@/components/ui/button";

export const Careers7 = () => {
  const jobCategories = [
    {
      name: "Engineering",
      jobs: [
        { title: "iOS Developer", location: "Remote" },
        { title: "Backend Engineer", location: "Remote" },
        { title: "Frontend Engineer", location: "Remote" },
      ],
    },
    {
      name: "Design",
      jobs: [
        { title: "Senior Designer", location: "Remote" },
        { title: "Staff Designer", location: "Remote" },
        { title: "Designer", location: "Remote" },
      ],
    },
  ];

  return (
    <section className="container max-w-5xl py-32">
      <div className="border-t pt-5">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-semibold tracking-tight md:text-4xl">
            Join us
          </h2>
          <p className="mt-4 max-w-2xl pb-10 text-2xl text-muted-foreground md:pb-12 md:text-3xl lg:pb-15">
            We work together from all over the world.
          </p>

          {jobCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="border-b border-foreground py-6 text-lg font-semibold">
                {category.name}
              </h3>
              <div className="">
                {category.jobs.map((job, jobIndex) => (
                  <div
                    key={`${categoryIndex}-${jobIndex}`}
                    className="flex items-center justify-between gap-10 border-b py-3 md:gap-16 lg:gap-28"
                  >
                    <h4 className="flex-1 font-medium">{job.title}</h4>
                    <p className="text-muted-foreground">{job.location}</p>
                    <Button variant="outline" asChild>
                      <a href="#">View listing</a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
