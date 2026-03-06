import { Facebook, Linkedin, Twitter } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const formFields = [
  {
    label: "Full name",
    name: "fullName",
    placeholder: "First and last name",
    type: "text",
  },
  {
    label: "Work email address",
    name: "email",
    placeholder: "me@company.com",
    type: "email",
  },
  {
    label: "Company name",
    name: "company",
    placeholder: "Company name",
    type: "text",
    optional: true,
  },
  {
    label: "Number of employees",
    name: "employees",
    placeholder: "Company name",
    type: "text",
    optional: true,
  },
  {
    label: "Your message",
    name: "message",
    placeholder: "Write your message",
    type: "textarea",
  },
];

interface Contact11Props {
  className?: string;
}

const Contact11 = ({ className }: Contact11Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container max-w-4xl">
        <h1 className="text-center text-4xl font-semibold tracking-tight sm:text-5xl">
          Contact us
        </h1>
        <p className="mt-4 text-center text-muted-foreground">
          Hopefully this form gets through our spam filters.
        </p>

        <div className="mt-8 flex gap-10 max-md:flex-col md:mt-12 md:divide-x">
          {/* Contact Information */}
          <div className="space-y-10 pr-10 md:gap-20">
            <div>
              <h2 className="text-lg font-semibold">Corporate office</h2>
              <p className="mt-3 font-medium tracking-tight text-muted-foreground">
                1 Carlsberg Close
                <br />
                1260 Hillview, Australia
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Email us</h2>
              <div className="mt-3 space-y-2">
                <div>
                  <p className="text-primary">Careers</p>
                  <a
                    href="#"
                    className="mt-3 tracking-tight text-muted-foreground"
                  >
                    careers@example.com
                  </a>
                </div>
                <div>
                  <p className="text-primary">Press</p>
                  <a
                    href="#"
                    className="mt-3 tracking-tight text-muted-foreground"
                  >
                    press@example.com
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Follow us</h2>
              <div className="mt-3 flex gap-6">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Facebook className="size-6" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Twitter className="size-6" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Linkedin className="size-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Inquiries</h2>
            <form className="mt-5 space-y-5">
              {formFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label>
                    {field.label}
                    {field.optional && (
                      <span className="text-muted-foreground/60">
                        {" "}
                        (optional)
                      </span>
                    )}
                  </Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      name={field.name}
                      placeholder={field.placeholder}
                      className="min-h-[120px] resize-none"
                    />
                  ) : (
                    <Input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact11 };
