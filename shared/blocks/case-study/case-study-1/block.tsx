import { GitBranch, Lightbulb } from "lucide-react";

import { cn } from "@/lib/utils";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CaseStudy1Props {
  className?: string;
}

const CaseStudy1 = ({ className }: CaseStudy1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb className="mb-6 lg:mb-10">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Components</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative flex-col gap-10 lg:flex lg:flex-row lg:justify-between">
            <div className="lg:max-w-[692px]">
              <div className="max lg:col-span-2">
                <div>
                  <h1 className="text-3xl font-extrabold text-pretty">
                    Boosting System Reliability by 125% with AI Monitoring
                  </h1>
                  <p className="mt-2 text-lg text-muted-foreground">
                    In a kingdom far away, where laughter once flowed freely, a
                    peculiar tale unfolded about a king who decided to tax the
                    very essence of joy itself - jokes and jest.
                  </p>
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                    alt="placeholder"
                    className="my-8 aspect-video w-full rounded-lg object-cover"
                  />
                  <div className="mb-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
                    <div className="flex flex-col gap-2">
                      <p className="text-4xl font-semibold sm:text-5xl">19%</p>
                      <p className="text-sm text-muted-foreground">
                        increase in user engagement rate
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-4xl font-semibold sm:text-5xl">28%</p>
                      <p className="text-sm text-muted-foreground">
                        growth in customer retention rate
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-4xl font-semibold sm:text-5xl">72%</p>
                      <p className="text-sm text-muted-foreground">
                        satisfaction rate among users and customers
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-4xl font-semibold sm:text-5xl">
                        &gt;85%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        positive feedback received from users
                      </p>
                    </div>
                  </div>
                </div>
                <div className="prose mb-8 max-w-full lg:max-w-prose dark:prose-invert">
                  <h2>How the Tax System Works</h2>
                  <p>
                    The king, seeing how much happier his subjects were,
                    realized the error of his ways and repealed the joke tax.
                    Jokester was declared a hero, and the kingdom lived happily
                    ever after.
                  </p>
                  <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>Royal Decree!</AlertTitle>
                    <AlertDescription>
                      Remember, all jokes must be registered at the Royal Jest
                      Office before telling them
                    </AlertDescription>
                  </Alert>

                  <h2>The People&apos;s Rebellion</h2>
                  <p>
                    The people of the kingdom, feeling uplifted by the laughter,
                    started to tell jokes and puns again, and soon the entire
                    kingdom was in on the joke.
                  </p>
                  <div>
                    <table>
                      <thead>
                        <tr>
                          <th>King&apos;s Treasury</th>
                          <th>People&apos;s happiness</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Empty</td>
                          <td>Overflowing</td>
                        </tr>
                        <tr className="m-0 border-t p-0 even:bg-muted">
                          <td>Modest</td>
                          <td>Satisfied</td>
                        </tr>
                        <tr className="m-0 border-t p-0 even:bg-muted">
                          <td>Full</td>
                          <td>Ecstatic</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p>
                    The king, seeing how much happier his subjects were,
                    realized the error of his ways and repealed the joke tax.
                    Jokester was declared a hero, and the kingdom lived happily
                    ever after.
                  </p>

                  <h2>The King&apos;s Plan</h2>
                  <p>
                    The king thought long and hard, and finally came up with{" "}
                    <a href="#">a brilliant plan</a>: he would tax the jokes in
                    the kingdom.
                  </p>
                  <blockquote>
                    &ldquo;After all,&rdquo; he said, &ldquo;everyone enjoys a
                    good joke, so it&apos;s only fair that they should pay for
                    the privilege.&rdquo;
                  </blockquote>
                  <p>
                    The king&apos;s subjects were not amused. They grumbled and
                    complained, but the king was firm:
                  </p>
                  <ul>
                    <li>1st level of puns: 5 gold coins</li>
                    <li>2nd level of jokes: 10 gold coins</li>
                    <li>3rd level of one-liners : 20 gold coins</li>
                  </ul>
                  <p>
                    As a result, people stopped telling jokes, and the kingdom
                    fell into a gloom. But there was one person who refused to
                    let the king&apos;s foolishness get him down: a court jester
                    named Jokester.
                  </p>
                </div>
              </div>
            </div>
            <div className="h-fit lg:sticky lg:top-8 lg:max-w-80">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg"
                alt="logo"
                className="mb-8 w-36"
              />
              <p className="mb-1.5 text-sm font-semibold">Overview</p>
              <p className="mb-5 text-sm text-muted-foreground">
                Our client implemented our solution to transform their business
                operations, resulting in improved efficiency, enhanced customer
                experience, and significant cost savings across their entire
                organization.
              </p>
              <p className="mb-1.5 text-sm font-semibold">Sector</p>
              <p className="mb-5 text-sm text-muted-foreground">Technology</p>
              <p className="mb-1.5 text-sm font-semibold">Solution</p>
              <Button size="sm" variant="outline">
                <GitBranch className="opacity-60" />
                Enterprise
              </Button>
              <Separator className="my-5" />
              <p className="mb-3 text-sm font-semibold">Want to learn more?</p>
              <Button size="sm">Contact us</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CaseStudy1 };
