"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  LucideIcon,
  MapPin,
  MessageSquareMore,
  Phone,
  Plus,
  Send,
} from "lucide-react";
import { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type NewsletterData = {
  title?: string;
  description?: string;
};

type InfoItem = {
  text: string;
  title: string;
  link?: string;
  icon: LucideIcon;
};

type FooterLink = {
  text: string;
  link?: string;
};

type SocialIcon = {
  title: string;
  light: string;
  dark: string;
};

type SocialLink = {
  link: string;
  icon: SocialIcon;
};

type FooterLinksSection = {
  title: string;
  id: string;
  items: FooterLink[];
};

type FooterDetailsType = {
  image: {
    src: string;
    alt: string;
  };
  homeLink: {
    logo: {
      light: string;
      dark: string;
    };
    link: string;
  };
  title: string;
  description: string;
};

type NewsletterFormProps = NewsletterData;

interface EcommerceFooter19Props {
  newsletter: NewsletterData;
  infoSectionList: InfoItem[];
  footerLinks: FooterLinksSection[];
  footerDetails: FooterDetailsType;
  paymentMethods: string[];
  socialLinks: SocialLink[];
  submenuLinks: {
    text: string;
    link: string;
  }[];
  className?: string;
}

interface FooterLinksSectionProps {
  sections: FooterLinksSection[];
}

interface SocialMediaSectionProps {
  links: SocialLink[];
}

const NEWSLETTER_DATA: NewsletterData = {
  title: "Newsletter",
  description:
    "Join our newsletter for self-care tips, skincare routines, exclusive offers, and early access to our latest clean-beauty essentials.",
};

const INFO_SECTION_DATA: InfoItem[] = [
  {
    title: "Customer Support",
    text: "Mon–Fri, 8am–7pm EST.",
    icon: MessageSquareMore,
  },
  {
    title: "Call Us",
    text: "+1 855-987-4420 (toll-free)",
    link: "tel:+18559874420",
    icon: Phone,
  },
  {
    title: "Email Us",
    text: "support@lumiskin.co",
    link: "mailto:support@lumiskin.co",
    icon: Send,
  },
  {
    title: "Address",
    text: "125 Bloom Avenue, Suite 210, CA",
    icon: MapPin,
  },
];

const FOOTER_LINKS: FooterLinksSection[] = [
  {
    title: "Shop",
    id: "shop",
    items: [
      {
        text: "New Launches",
        link: "#",
      },
      {
        text: "Best Sellers",
        link: "#",
      },
      {
        text: "Skin Type Routines",
        link: "#",
      },
      {
        text: "Gifts & Sets",
        link: "#",
      },
    ],
  },
  {
    title: "Support",
    id: "support",
    items: [
      {
        text: "Contact Us",
        link: "#",
      },
      {
        text: "FAQs",
        link: "#",
      },
      {
        text: "Order Tracking",
        link: "#",
      },
      {
        text: "Returns & Exchanges",
        link: "#",
      },
    ],
  },
  {
    title: "About",
    id: "about",
    items: [
      {
        text: "Our Story",
        link: "#",
      },
      {
        text: "Ingredients",
        link: "#",
      },
      {
        text: "Sustainability",
        link: "#",
      },
      {
        text: "Press",
        link: "#",
      },
    ],
  },
];

const FOOTER_DETAILS = {
  image: {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/promotional/Luxurious-Cosmetic-Display-2.png",
    alt: "",
  },
  homeLink: {
    logo: {
      light: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg",
      dark: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark-white.svg",
    },
    link: "#",
  },
  title: "Where Modern Fashion Meets Comfort",
  description:
    "We design clothing that empowers women to express their individuality through thoughtful details, flattering fits, and beautifully crafted essentials.",
};

const PAYMENT_METHODS = [
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/amazonpay.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/applepay.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/mastercard.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/paypal.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/visa.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/discover.svg",
];

const SOCIAL_ICONS = {
  facebook: {
    title: "Facebook",
    light: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/facebook-icon.svg",
    dark: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/facebook-icon.svg",
  },
  x: {
    title: "X",
    light: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/x.svg",
    dark: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/x.svg",
  },
  instagram: {
    title: "Instagram",
    light: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/instagram-icon.svg",
    dark: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/instagram-icon.svg",
  },
};

const SOCIAL_MEDIA_LINKS = [
  {
    icon: SOCIAL_ICONS.facebook,
    link: "#",
  },
  {
    icon: SOCIAL_ICONS.x,
    link: "#",
  },
  {
    icon: SOCIAL_ICONS.instagram,
    link: "#",
  },
];

const SUBMENU = [
  {
    text: "Shipping Policy",
    link: "#",
  },
  {
    text: "Returns Policy",
    link: "#",
  },
  {
    text: "Terms Of Service",
    link: "#",
  },
  {
    text: "Privacy Policy",
    link: "#",
  },
];

const EcommerceFooter19 = ({
  newsletter = NEWSLETTER_DATA,
  infoSectionList = INFO_SECTION_DATA,
  footerLinks = FOOTER_LINKS,
  footerDetails = FOOTER_DETAILS,
  paymentMethods = PAYMENT_METHODS,
  socialLinks = SOCIAL_MEDIA_LINKS,
  submenuLinks = SUBMENU,
  className,
}: EcommerceFooter19Props) => {
  return (
    <section className={cn("pt-12.5 pb-30", className)}>
      <div className="container space-y-10">
        <div className="grid items-center gap-x-20 gap-y-5 lg:grid-cols-2">
          <div>
            <AspectRatio ratio={2} className="overflow-hidden rounded-2xl">
              <img
                className="block size-full object-cover object-center"
                src={footerDetails.image.src}
                alt={footerDetails.image.alt}
              />
            </AspectRatio>
          </div>
          <div>
            <NewsletterSection {...newsletter} />
          </div>
        </div>
        <InfoSection list={infoSectionList} />
        <div className="grid grid-cols-1 gap-7.5 lg:grid-cols-5 xl:grid-cols-2">
          <div className="space-y-5 lg:max-xl:col-span-2">
            <a
              href={footerDetails.homeLink.link}
              className="inline-block w-full max-w-80"
            >
              <img
                className="w-full dark:hidden"
                src={footerDetails.homeLink.logo.light}
                alt="Logo"
              />
              <img
                className="hidden w-full dark:inline-block"
                src={footerDetails.homeLink.logo.dark}
                alt="Logo"
              />
            </a>
            <p className="max-w-100 text-sm leading-relaxed text-muted-foreground">
              {footerDetails.description}
            </p>
          </div>
          <div className="lg:max-xl:col-span-3">
            <FooterLinksSection sections={footerLinks} />
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-6">
          <div className="space-y-5">
            <Select defaultValue="english">
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Select a Language..." />
              </SelectTrigger>
              <SelectContent align="start">
                <SelectGroup>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="français">Français</SelectItem>
                  <SelectItem value="arabic">Arabic</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <PaymentMethods cards={paymentMethods} />
          </div>
          <div>
            <SocialMediaSection links={socialLinks} />
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-6">
          <p className="text-sm">© 2026 Made with ❤️ by shadcnblocks.com</p>
          <FooterSubMenu links={submenuLinks} />
        </div>
      </div>
    </section>
  );
};

const newsletterFormSchema = z.object({
  email: z.string().email(),
});

type newsletterFormType = z.infer<typeof newsletterFormSchema>;

const NewsletterSection = ({ title, description }: NewsletterFormProps) => {
  const form = useForm({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: newsletterFormType) => {
    console.log(data);
  };

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <h3 className="text-4xl leading-snug font-semibold">{title}</h3>
        <p className="leading-normal">{description}</p>
      </div>
      <div className="space-y-4">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-start gap-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="flex-1" data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Email Address"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button>Subscribe</Button>
          </div>
        </form>
        <p className="text-sm text-muted-foreground">
          By subscribing you agree to the{" "}
          <a className="underline underline-offset-2" href="#">
            Terms of Use
          </a>{" "}
          &{" "}
          <a className="underline underline-offset-2" href="#">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

const InfoSection = ({ list }: { list: InfoItem[] }) => {
  if (!list) return;

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
      {list.map(({ icon: Icon, title, link, text }) => (
        <Card className="rounded-lg px-5 py-6" key={crypto.randomUUID()}>
          <CardContent className="flex items-start gap-3 p-0">
            <div className="shrink-0 basis-7">
              <Icon />
            </div>
            <div className="flex-1 space-y-1">
              <div className="text-sm leading-relaxed">
                <CardTitle className="text-base leading-relaxed font-semibold">
                  {title}
                </CardTitle>
                {link ? (
                  <a
                    className="break-all text-muted-foreground underline"
                    href={link}
                  >
                    {text}
                  </a>
                ) : (
                  <p className="text-muted-foreground">{text}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const FooterLinksSection = ({ sections }: FooterLinksSectionProps) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (!sections) return;

  const allAccordionIds = sections.map(({ id }) => id);

  if (isDesktop) {
    return (
      <Accordion
        value={allAccordionIds}
        type="multiple"
        className="grid grid-cols-3 gap-4"
      >
        <AccordionItems sections={sections} />
      </Accordion>
    );
  } else {
    return (
      <Accordion type="multiple">
        <AccordionItems sections={sections} />
      </Accordion>
    );
  }
};

const AccordionItems = ({ sections }: { sections: FooterLinksSection[] }) => {
  return (
    <Fragment>
      {sections.map(({ id, title, items }) => (
        <AccordionItem
          key={id}
          value={id}
          className="border-b lg:border-transparent"
        >
          <AccordionTrigger className="cursor-auto rounded-none pt-0 pb-4 text-base leading-normal font-bold hover:no-underline max-lg:py-4 [&>svg]:hidden">
            {title}
            <div className="lg:hidden">
              <Plus className="size-5" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-1 max-lg:py-4">
            <ul className="space-y-4 lg:space-y-3">
              {items.map(({ link, text }) => (
                <li
                  className="text-sm leading-tight font-light"
                  key={crypto.randomUUID()}
                >
                  <a
                    href={link}
                    className="hover:underline hover:underline-offset-3"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Fragment>
  );
};

const PaymentMethods = ({ cards }: { cards: string[] }) => {
  return (
    <ul className="flex flex-wrap items-center gap-3">
      {cards.map((card) => (
        <li key={crypto.randomUUID()}>
          <img className="w-9.5" src={card} alt="card" />
        </li>
      ))}
    </ul>
  );
};

const SocialMediaSection = ({ links }: SocialMediaSectionProps) => {
  return (
    <ul className="flex flex-wrap gap-4">
      {links.map(({ icon, link }) => (
        <li key={crypto.randomUUID()}>
          <Button size="icon-lg" asChild className="rounded-full">
            <a href={link}>
              <img
                className="size-4.5 invert dark:invert-0"
                alt={icon.title}
                src={icon.light}
              />
            </a>
          </Button>
        </li>
      ))}
    </ul>
  );
};

const FooterSubMenu = ({ links }: { links: FooterLink[] }) => {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-4">
      {links.map(({ link, text }) => (
        <li key={crypto.randomUUID()}>
          <a href={link} className="text-sm font-light">
            {text}
          </a>
        </li>
      ))}
    </ul>
  );
};

export { EcommerceFooter19 };
