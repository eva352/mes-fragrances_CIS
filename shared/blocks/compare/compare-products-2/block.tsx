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

interface CompareProducts2Props {
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
];

const DEFAULT_SPECS: ProductSpec[] = [
  { name: "Driver Size", values: ["40mm", "50mm"] },
  {
    name: "Frequency Response",
    values: ["20Hz-20kHz", "10Hz-40kHz"],
  },
  { name: "Active Noise Cancellation", values: [true, true] },
  { name: "Battery Life", values: ["30 hours", "24 hours"] },
  { name: "Wireless", values: [true, true] },
  { name: "Bluetooth Version", values: ["5.3", "5.2"] },
  { name: "Foldable Design", values: [true, false] },
  { name: "Weight", values: ["250g", "280g"] },
  { name: "Included Case", values: [true, true] },
  { name: "Warranty", values: ["2 years", "2 years"] },
];

const CompareProducts2 = ({
  products = DEFAULT_PRODUCTS,
  specs = DEFAULT_SPECS,
  className,
}: CompareProducts2Props) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const renderValue = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="size-4 text-emerald-600" />
      ) : (
        <XIcon className="size-4 text-muted-foreground" />
      );
    }
    return <span className="text-sm font-medium">{value}</span>;
  };

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Compare Products
          </h2>
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="border-b hover:bg-transparent">
                <TableHead className="w-64 bg-muted/50 px-6 py-8 font-semibold">
                  <span className="text-sm tracking-wider text-muted-foreground uppercase">
                    Specifications
                  </span>
                </TableHead>
                {products.map((product, index) => (
                  <TableHead
                    key={product.id}
                    className={cn(
                      "min-w-[280px] bg-muted/30 px-6 py-8",
                      index < products.length - 1 && "border-l",
                    )}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="size-24 shrink-0 overflow-hidden rounded-md bg-background">
                          <AspectRatio ratio={1}>
                            <img
                              src={product.image}
                              alt={product.name}
                              className="size-full object-cover"
                            />
                          </AspectRatio>
                        </div>
                        <div className="flex-1 space-y-2">
                          {product.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {product.badge}
                            </Badge>
                          )}
                          <h3 className="text-lg leading-tight font-semibold">
                            {product.name}
                          </h3>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs text-muted-foreground line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <span className="text-amber-500">★</span>
                            <span className="font-medium">
                              {product.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full" size="sm" variant="outline">
                        Add to Cart
                      </Button>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {specs.map((spec, index) => (
                <TableRow
                  key={index}
                  className={cn(
                    "border-b hover:bg-muted/30",
                    index % 2 === 0 && "bg-muted/20",
                  )}
                >
                  <TableCell className="px-6 py-5 font-medium">
                    {spec.name}
                  </TableCell>
                  {spec.values.map((value, vIndex) => (
                    <TableCell
                      key={vIndex}
                      className={cn(
                        "px-6 py-5 text-center",
                        vIndex < spec.values.length - 1 && "border-l",
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

export { CompareProducts2 };
