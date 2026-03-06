import { Square } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface TestimonialProps {
  comment: string;
  name: string;
  designation: string;
  image: string;
  className?: string;
}

const Testimonial = ({
  comment,
  name,
  designation,
  image,
  className,
}: TestimonialProps) => {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <p className="text-base font-light text-muted-foreground md:text-lg">
        {comment}
      </p>
      <div className="flex items-center gap-2">
        <img src={image} alt={name} className="size-10 rounded" />
        <div className="flex flex-col">
          <p className="text-sm md:text-base">{name}</p>
          <p className="text-sm font-light text-muted-foreground md:text-base">
            {designation}
          </p>
        </div>
      </div>
    </div>
  );
};

const FormGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

interface BookADemo3Props {
  badge?: string;
  heading?: string;
  description?: string;
  testimonial?: TestimonialProps;
  poweredBy?: string;
  className?: string;
}

const BookADemo3 = ({
  badge = "Get started",
  heading = "See DevFlow in action",
  description = "Book a demo with one of our platform experts to see how DevFlow can streamline your development workflow.",
  testimonial = {
    comment:
      '"DevFlow transformed our development process. The automated CI/CD pipelines and real-time collaboration features have increased our team\'s productivity by 40%."',
    name: "Alex Chen",
    designation: "Lead Developer @ TechStart",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/portraits/alexander-hipp-iEEBWgY_6lA-unsplash.jpg",
  },
  poweredBy = "DevFlow",
  className,
}: BookADemo3Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-10">
          <div className="flex max-w-lg flex-col gap-5">
            <div className="flex w-fit items-center gap-1.5 border-b border-dashed pb-2 text-xs md:text-sm">
              <Square fill="currentColor" size={7} className="opacity-60" />

              <p className="opacity-60">{badge}</p>
            </div>
            <h3 className="text-3xl font-medium md:text-4xl">{heading}</h3>
            <p className="text-base font-light md:text-lg">{description}</p>
            <div className="my-4 h-1 max-w-32 border-b border-dashed" />
            <Testimonial {...testimonial} />
          </div>
          <Card className="relative overflow-hidden bg-muted/70 px-6">
            <div className="absolute top-5 -right-15 flex w-50 rotate-45 flex-col items-center justify-center bg-foreground py-1 text-background shadow-lg">
              <span className="text-xs font-light">Powered by</span>
              <span className="text-xs sm:text-sm">{poweredBy}</span>
            </div>
            <form className="flex flex-col gap-8">
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type="text"
                  placeholder="Jordan Martinez"
                  className="bg-background"
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="jordan.martinez@techstart.com"
                  className="bg-background"
                />
              </FormGroup>
              <FormGroup>
                <Label>Where are you located?</Label>
                <Select>
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="es">Spain</SelectItem>
                    <SelectItem value="it">Italy</SelectItem>
                    <SelectItem value="nl">Netherlands</SelectItem>
                    <SelectItem value="se">Sweden</SelectItem>
                    <SelectItem value="no">Norway</SelectItem>
                    <SelectItem value="dk">Denmark</SelectItem>
                    <SelectItem value="fi">Finland</SelectItem>
                    <SelectItem value="ch">Switzerland</SelectItem>
                    <SelectItem value="at">Austria</SelectItem>
                    <SelectItem value="be">Belgium</SelectItem>
                    <SelectItem value="ie">Ireland</SelectItem>
                    <SelectItem value="pt">Portugal</SelectItem>
                    <SelectItem value="pl">Poland</SelectItem>
                    <SelectItem value="cz">Czech Republic</SelectItem>
                    <SelectItem value="hu">Hungary</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="nz">New Zealand</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                    <SelectItem value="kr">South Korea</SelectItem>
                    <SelectItem value="sg">Singapore</SelectItem>
                    <SelectItem value="hk">Hong Kong</SelectItem>
                    <SelectItem value="in">India</SelectItem>
                    <SelectItem value="cn">China</SelectItem>
                    <SelectItem value="br">Brazil</SelectItem>
                    <SelectItem value="mx">Mexico</SelectItem>
                    <SelectItem value="ar">Argentina</SelectItem>
                    <SelectItem value="cl">Chile</SelectItem>
                    <SelectItem value="co">Colombia</SelectItem>
                    <SelectItem value="pe">Peru</SelectItem>
                    <SelectItem value="za">South Africa</SelectItem>
                    <SelectItem value="ng">Nigeria</SelectItem>
                    <SelectItem value="ke">Kenya</SelectItem>
                    <SelectItem value="eg">Egypt</SelectItem>
                    <SelectItem value="ma">Morocco</SelectItem>
                    <SelectItem value="il">Israel</SelectItem>
                    <SelectItem value="ae">United Arab Emirates</SelectItem>
                    <SelectItem value="sa">Saudi Arabia</SelectItem>
                    <SelectItem value="tr">Turkey</SelectItem>
                    <SelectItem value="ru">Russia</SelectItem>
                    <SelectItem value="ua">Ukraine</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>What is your current CI/CD solution?</Label>
                <Select>
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem value="no-ci-cd">
                      No CI/CD pipeline yet
                    </SelectItem>
                    <SelectItem value="manual-deployment">
                      Manual deployment
                    </SelectItem>
                    <SelectItem value="github-actions">
                      GitHub Actions
                    </SelectItem>
                    <SelectItem value="jenkins">Jenkins</SelectItem>
                    <SelectItem value="custom-ci-cd">
                      Custom CI/CD pipeline
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="gitlab-ci">GitLab CI</SelectItem>
                  </SelectContent>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>How can we help?</Label>
                <Textarea
                  placeholder="Describe your development workflow challenges..."
                  className="bg-background"
                />
              </FormGroup>
              <FormGroup>
                <Label>How did you hear about us?</Label>
                <Select>
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="events-and-webinars">
                      Events & Webinars
                    </SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="search-engine">Search Engine</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormGroup>
              <Button type="submit">Submit</Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export { BookADemo3 };
