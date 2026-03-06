import React from "react";

import { cn } from "@/lib/utils";

interface About9Props {
  className?: string;
}

const About9 = ({ className }: About9Props) => {
  return (
    <section className={cn("py-16 md:py-32", className)}>
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h1 className="mb-6 max-w-4xl text-3xl leading-tight font-medium tracking-tight md:text-4xl">
            Hi, were a team of developers with a passion for building scalable
            and efficient web applications.
          </h1>

          <div className="mb-8 flex justify-center">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/nubelson-fernandes-tAJYoec13xk-unsplash.jpg"
              alt="Team at work"
              className="w-full rounded-sm object-cover"
            />
          </div>

          <div className="mx-auto mb-16 flex w-full max-w-6xl flex-col justify-between gap-12 md:flex-row">
            <div className="text-base font-medium">
              <span className="block text-muted-foreground">
                Full Stack Developer
              </span>
              <span className="font-semibold text-foreground">
                San Francisco CA
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/flags/united-states.png"
                  alt="United States"
                  className="h-4 w-4"
                />
              </span>
            </div>

            <div className="mt-8 w-full md:mt-0 md:w-2/3">
              <p className="font-base w-full text-lg leading-[28px] text-muted-foreground md:w-3/4">
                I am a passionate and innovative Full Stack Developer with over
                6 years of experience in building scalable web applications. My
                journey began with a fascination for problem-solving and a deep
                interest in emerging technologies.
                <br />
                <br />
                Specializing in React, Node.js, and cloud technologies, I've
                helped startups and enterprises build robust digital solutions.
                From e-commerce platforms to SaaS applications, I focus on
                creating user-centric experiences with clean, maintainable code
                architecture.
              </p>

              <div className="mt-12">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/nastuh-abootalebi-eHD8Y1Znfpk-unsplash.jpg"
                  alt="Work environment"
                  className="w-full rounded-sm object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About9 };
