"use client";

import { Check } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Contact17Props {
  className?: string;
}

const Contact17 = ({ className }: Contact17Props) => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      companySize: "",
      message: "",
      referrer: "",
    },
  });

  const onSubmit = (data: {
    firstName: string;
    lastName: string;
    email: string;
    companySize: string;
    message: string;
    referrer: string;
  }) => {
    console.log(data);
    // Add your form submission logic here
  };

  return (
    <section className={cn("bg-muted/50 py-32", className)}>
      <div className="container">
        <span className="text-xs text-muted-foreground">GET STARTED /</span>
        <div className="mt-8 grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-2 lg:grid-rows-[min-content_1fr]">
          <h2 className="order-1 text-4xl font-medium tracking-tight md:order-none md:text-5xl">
            Get in touch
          </h2>
          <div className="order-2 md:order-none md:row-span-2">
            <div className="rounded-lg border border-border bg-background p-6">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-6 sm:grid-cols-2"
              >
                <Controller
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                      <Input {...field} id={field.name} placeholder="Alex" />
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                      <Input {...field} id={field.name} placeholder="Smith" />
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        placeholder="alex.smith@example.com"
                      />
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        Project Budget
                      </FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger id={field.name} className="w-full">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5k-15k">$5K - $15K</SelectItem>
                          <SelectItem value="15k-30k">$15K - $30K</SelectItem>
                          <SelectItem value="30k-50k">$30K - $50K</SelectItem>
                          <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                          <SelectItem value="100k-250k">
                            $100K - $250K
                          </SelectItem>
                          <SelectItem value="250k+">$250K+</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <Field className="sm:col-span-2">
                      <FieldLabel htmlFor={field.name}>Message</FieldLabel>
                      <Textarea
                        {...field}
                        id={field.name}
                        placeholder="Tell us about your project..."
                      />
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="referrer"
                  render={({ field }) => (
                    <Field className="sm:col-span-2">
                      <FieldLabel htmlFor={field.name}>
                        How did you find us?
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        placeholder="Google / Referral"
                      />
                    </Field>
                  )}
                />
                <Button type="submit" className="sm:col-span-2">
                  Submit
                </Button>
                <p className="text-xs text-muted-foreground sm:col-span-2">
                  You acknowledge that you've reviewed and agreed to our{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>
                </p>
              </form>
            </div>
          </div>
          <div className="order-3 my-6 md:order-none">
            <ul className="space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-background">
                  <Check className="size-4" />
                </span>
                Share your project goals and requirements
              </li>
              <li className="flex items-center gap-2">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-background">
                  <Check className="size-4" />
                </span>
                Receive a tailored proposal
              </li>
              <li className="flex items-center gap-2">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-background">
                  <Check className="size-4" />
                </span>
                Schedule a strategy consultation
              </li>
            </ul>
            <p className="my-6 font-bold">
              Trusted by +3000 businesses worldwide
            </p>
            <div className="grid grid-cols-2 place-items-center gap-8 md:grid-cols-4">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg"
                alt="placeholder"
                className="max-w-24 dark:invert"
              />
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg"
                alt="placeholder"
                className="max-w-24 dark:invert"
              />
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg"
                alt="placeholder"
                className="max-w-24 dark:invert"
              />
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg"
                alt="placeholder"
                className="max-w-24 dark:invert"
              />
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg"
                alt="placeholder"
                className="max-w-24 dark:invert"
              />
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg"
                alt="placeholder"
                className="max-w-24 dark:invert"
              />
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-7.svg"
                alt="placeholder"
                className="max-w-24 dark:invert"
              />
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-8.svg"
                alt="placeholder"
                className="max-w-24 dark:invert"
              />
            </div>
          </div>
        </div>
        <div className="mt-16 grid gap-8 md:gap-12 lg:w-1/2 lg:grid-cols-2">
          <div>
            <h3 className="mb-1.5 font-bold">FAQ</h3>
            <p className="text-sm text-muted-foreground">
              Browse our collection of{" "}
              <a href="#" className="text-primary underline hover:underline">
                Frequently Asked Questions
              </a>{" "}
              about our process and project delivery.
            </p>
          </div>
          <div>
            <h3 className="mb-1.5 font-bold">Resources</h3>
            <p className="text-sm text-muted-foreground">
              Access our library and connect with designers in our{" "}
              <a href="#" className="text-primary underline hover:underline">
                resource center
              </a>{" "}
              filled with whitepapers and tutorials.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact17 };
