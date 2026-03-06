import { Building, ChevronRight, Mail, Phone } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description:
      "Have a question or need help? Drop us an email, and we'll respond within 24 hours.",
    contact: "hello@relative.io",
  },
  {
    icon: Phone,
    title: "Phone",
    description:
      "Prefer to chat? Give us a call Monday–Friday, 9 AM–5 PM (PST).",
    contact: "+1 (123) 456-7890",
  },
  {
    icon: Building,
    title: "Office",
    description:
      "Stop by our office @ 123 Productivity Ave, San Francisco, CA 94105",
    contact: (
      <a
        href="#"
        className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
      >
        Get Directions
        <ChevronRight className="size-4" />
      </a>
    ),
  },
];

const formFields = [
  {
    id: "name",
    label: "Name",
    type: "text",
    component: Input,
    required: true,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    component: Input,
    required: true,
  },
  {
    id: "message",
    label: "Message",
    component: Textarea,
    required: true,

    props: {
      placeholder: "Type Your Message...",
      rows: 4,
    },
  },
];
interface Contact9Props {
  className?: string;
}

const Contact9 = ({ className }: Contact9Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-6 py-4 lg:py-8">
          <Badge
            variant="outline"
            className="w-fit gap-1 bg-card px-3 text-sm font-normal tracking-tight shadow-sm"
          >
            <Mail className="size-4" />
            <span>Reach Out</span>
          </Badge>
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
            Get in Touch
          </h2>
          <p className="max-w-[600px] tracking-[-0.32px] text-muted-foreground">
            We're here to help—reach out with any questions or feedback.
          </p>
        </div>

        <div className="flex justify-between gap-10 py-12 max-md:flex-col">
          <form className="flex flex-1 flex-col gap-6">
            {formFields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label className="text-sm font-normal" htmlFor={field.id}>
                  {field.label}
                </Label>
                <field.component
                  id={field.id}
                  type={field.type}
                  required={field.required}
                  className="border-border bg-card"
                  {...field.props}
                />
              </div>
            ))}

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="terms"
                  className="text-sm font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I accept the{" "}
                  <a href="/terms" className="underline">
                    Terms
                  </a>
                </Label>
              </div>
            </div>

            <Button type="submit">Submit</Button>
          </form>

          <div className="grid flex-1 gap-6 self-start lg:grid-cols-2">
            {contactMethods.map((method, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <method.icon className="size-5" />
                  <h3 className="text-2xl tracking-[-0.96px]">
                    {method.title}
                  </h3>
                </div>
                <div className="space-y-2 tracking-[-0.32px]">
                  <p className="text-sm text-muted-foreground">
                    {method.description}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    {method.contact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact9 };
