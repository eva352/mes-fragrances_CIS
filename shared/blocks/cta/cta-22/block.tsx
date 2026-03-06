"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    email: z.string().email("Invalid email address"),
  })
  .required({ email: true });

interface Cta22Props {
  className?: string;
}

const Cta22 = ({ className }: Cta22Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="dark relative h-[350px] overflow-hidden rounded-xl bg-background text-white md:col-span-2">
            <div className="flex h-full flex-row p-4 sm:p-8 md:p-12">
              <div className="relative z-10 w-full self-center px-2 text-center sm:w-auto sm:flex-1 sm:px-0 md:text-left">
                <h1 className="mb-4 text-3xl font-bold sm:mb-6 sm:text-2xl md:text-3xl">
                  Download the notes app of tomorrow today.
                </h1>
                <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 md:justify-start">
                  <Button>
                    <FaApple />
                    <span>Download for iOS</span>
                  </Button>
                  <Button variant="outline" className="border border-white">
                    <FaGooglePlay />
                    <span>Download for Android</span>
                  </Button>
                </div>
              </div>
              {/* Phone section */}
              <div className="relative z-10 hidden md:block">
                <div className="absolute top-0 left-1/2 h-[120%] w-[69%] -translate-x-1/2 overflow-hidden rounded-t-[32px]">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-7-tall.svg"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="relative z-10 h-[350px] overflow-hidden">
                  <img
                    className="h-[600px] w-auto max-w-none"
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mockups/phone-2.png"
                    width={340}
                    height={600}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden h-[350px] items-center justify-center rounded-xl bg-muted p-6 sm:flex sm:p-8 md:p-12">
            <div className="w-full">
              <h2 className="mb-2 text-xl font-semibold sm:text-2xl">
                Subscribe to our weekly newsletter
              </h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipiscing elidolor
                mattis sit phasellus.
              </p>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="space-y-4">
                  <Controller
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name} className="sr-only">
                          Email
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          type="email"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter your email"
                          className="w-full bg-background focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta22 };
