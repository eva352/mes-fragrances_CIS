"use client";

import {
  ArrowRight,
  Check,
  Plus,
  ShoppingCart,
  X as XIcon,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  highlights: string[];
}

interface CompareProducts3Props {
  products?: Product[];
  maxProducts?: number;
  className?: string;
}

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Earbuds",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/Modern-White-Headphones-1.png",
    price: 199.99,
    rating: 4.8,
    reviews: 2341,
    highlights: [
      "Active Noise Cancellation",
      "30hr battery with case",
      "Spatial Audio",
      "IPX4 water resistant",
    ],
  },
  {
    id: "2",
    name: "Sport Earbuds Pro",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/Sleek-Black-Headphones-1.jpeg",
    price: 149.99,
    originalPrice: 179.99,
    rating: 4.5,
    reviews: 1892,
    highlights: [
      "Secure fit for sports",
      "24hr battery with case",
      "IPX7 waterproof",
      "Ambient sound mode",
    ],
  },
  {
    id: "3",
    name: "Essential Wireless Buds",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/Modern-Headphones-1.jpeg",
    price: 79.99,
    rating: 4.2,
    reviews: 956,
    highlights: [
      "Touch controls",
      "18hr battery with case",
      "Voice assistant",
      "Compact design",
    ],
  },
];

const CompareProducts3 = ({
  products = DEFAULT_PRODUCTS,
  maxProducts = 4,
  className,
}: CompareProducts3Props) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(products);

  const removeProduct = (id: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const canAddMore = selectedProducts.length < maxProducts;

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Compare Products
            </h2>
            <p className="mt-1 text-muted-foreground">
              Select up to {maxProducts} products to compare
            </p>
          </div>
          {selectedProducts.length > 0 && (
            <Button
              variant="ghost"
              onClick={() => setSelectedProducts([])}
              className="text-destructive hover:text-destructive"
            >
              Clear All
            </Button>
          )}
        </div>

        <ScrollArea className="w-full">
          <div className="flex gap-4 pb-4">
            {selectedProducts.map((product) => (
              <Card key={product.id} className="w-72 shrink-0 gap-0 p-0">
                <CardContent className="p-0">
                  {/* Remove Button */}
                  <div className="relative">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-2 right-2 z-10 size-7"
                      onClick={() => removeProduct(product.id)}
                    >
                      <XIcon className="size-4" />
                    </Button>
                    <div className="aspect-square bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="size-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="p-4">
                    {/* Name & Price */}
                    <h3 className="leading-tight font-semibold">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-lg font-bold">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="mt-2 flex items-center gap-1 text-sm">
                      <span className="text-amber-500">★</span>
                      <span className="font-medium">{product.rating}</span>
                      <span className="text-muted-foreground">
                        ({product.reviews.toLocaleString()} reviews)
                      </span>
                    </div>

                    <Separator className="my-4" />

                    {/* Highlights */}
                    <div className="space-y-2">
                      {product.highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Add to Cart */}
                    <Button className="mt-4 w-full">
                      <ShoppingCart className="mr-2 size-4" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add Product Card */}
            {canAddMore && (
              <Card className="w-72 shrink-0 cursor-pointer gap-0 border-dashed p-0 transition-colors hover:border-primary hover:bg-muted/50">
                <CardContent className="flex h-full min-h-[400px] flex-col items-center justify-center p-4 text-center">
                  <div className="mb-3 flex size-16 items-center justify-center rounded-full bg-muted">
                    <Plus className="size-6 text-muted-foreground" />
                  </div>
                  <p className="font-medium">Add Product</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Select another product to compare
                  </p>
                  <Button variant="outline" className="mt-4">
                    Browse Products
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

export { CompareProducts3 };
