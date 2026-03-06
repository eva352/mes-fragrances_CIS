"use client";

import { Check, X as XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProductSpec {
  name: string;
  values: (string | boolean)[];
}

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  badge?: string;
}

interface CompareProducts1Props {
  products?: Product[];
  specs?: ProductSpec[];
  className?: string;
}

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Wireless Pro Headphones",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/Modern-White-Headphones-1.png",
    price: 299.99,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Studio Monitor Plus",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/Sleek-Black-Headphones-1.jpeg",
    price: 249.99,
    originalPrice: 279.99,
    rating: 4.5,
  },
  {
    id: "3",
    name: "Essential Audio",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/Modern-Headphones-1.jpeg",
    price: 149.99,
    rating: 4.2,
  },
];

const DEFAULT_SPECS: ProductSpec[] = [
  { name: "Driver Size", values: ["40mm", "50mm", "40mm"] },
  {
    name: "Frequency Response",
    values: ["20Hz-20kHz", "10Hz-40kHz", "20Hz-20kHz"],
  },
  { name: "Active Noise Cancellation", values: [true, true, false] },
  { name: "Battery Life", values: ["30 hours", "24 hours", "20 hours"] },
  { name: "Wireless", values: [true, true, true] },
  { name: "Bluetooth Version", values: ["5.3", "5.2", "5.0"] },
  { name: "Foldable Design", values: [true, false, true] },
  { name: "Weight", values: ["250g", "280g", "220g"] },
  { name: "Included Case", values: [true, true, false] },
  { name: "Warranty", values: ["2 years", "2 years", "1 year"] },
];

const CompareProducts1 = ({
  products = DEFAULT_PRODUCTS,
  specs = DEFAULT_SPECS,
  className,
}: CompareProducts1Props) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const renderValue = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="size-5 text-emerald-600" />
      ) : (
        <XIcon className="size-5 text-muted-foreground" />
      );
    }
    return value;
  };

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Compare Products
          </h2>
          <p className="mt-2 text-muted-foreground">
            See how our products stack up against each other
          </p>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b-0 hover:bg-transparent">
                <TableHead className="w-48 border-r" />
                {products.map((product, index) => (
                  <TableHead
                    key={product.id}
                    className={cn(
                      "min-w-[200px] text-center",
                      index < products.length - 1 && "border-r",
                    )}
                  >
                    <div className="pb-4">
                      <div className="mx-auto size-48 overflow-hidden rounded-lg bg-muted">
                        <AspectRatio ratio={1}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="size-full object-cover"
                          />
                        </AspectRatio>
                      </div>
                      <div className="-mt-3 flex h-6 items-center justify-center">
                        {product.badge && (
                          <Badge className="mx-auto">{product.badge}</Badge>
                        )}
                      </div>
                      <h3 className="mt-2 text-lg leading-tight font-semibold">
                        {product.name}
                      </h3>
                      <div className="flex min-h-[1.5rem] items-center justify-center gap-2">
                        <span className="text-lg">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-amber-500">★</span>
                        <span className="text-sm">{product.rating}</span>
                      </div>
                      <Button className="mt-4 w-full" size="sm">
                        Add to Cart
                      </Button>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {specs.map((spec, index) => (
                <TableRow key={index}>
                  <TableCell className="border-r font-medium">
                    {spec.name}
                  </TableCell>
                  {spec.values.map((value, vIndex) => (
                    <TableCell
                      key={vIndex}
                      className={cn(
                        "text-center",
                        vIndex < spec.values.length - 1 && "border-r",
                      )}
                    >
                      <div className="flex items-center justify-center">
                        {renderValue(value)}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export { CompareProducts1 };
