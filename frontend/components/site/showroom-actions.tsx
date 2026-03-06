"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InsertBlockToPageButton } from "@/components/site/insert-block-to-landing-button";
import type { BlockInstance } from "@/lib/api/site-pages";

type PageOption = {
  id: string;
  slug: string;
  title: string;
  is_home: boolean;
};

function getPageHref(page: PageOption) {
  return page.is_home ? "/site" : `/site/${page.slug}`;
}

export function SiteShowroomActions({
  pages,
  defaultPageSlug,
  block,
}: {
  pages: PageOption[];
  defaultPageSlug?: string;
  block: Omit<BlockInstance, "id">;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fallbackSlug = pages.find((p) => p.is_home)?.slug ?? pages[0]?.slug ?? "";
  const [selectedSlug, setSelectedSlug] = useState(defaultPageSlug || fallbackSlug);

  const selectedPage = useMemo(
    () => pages.find((p) => p.slug === selectedSlug) ?? pages[0],
    [pages, selectedSlug],
  );

  const pageHref = selectedPage ? getPageHref(selectedPage) : "/site";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="min-w-[180px]">
        {pages.length ? (
          <Select
            value={selectedPage?.slug}
            onValueChange={(value) => {
              setSelectedSlug(value);
              const params = new URLSearchParams(searchParams?.toString());
              if (value) {
                params.set("page", value);
              } else {
                params.delete("page");
              }
              const query = params.toString();
              router.replace(query ? `/site/showroom?${query}` : "/site/showroom");
            }}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Choisir une page" />
            </SelectTrigger>
            <SelectContent>
              {pages.map((page) => (
                <SelectItem key={page.id} value={page.slug}>
                  {page.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Select disabled value="">
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Aucune page" />
            </SelectTrigger>
          </Select>
        )}
      </div>
      <Button variant="outline" size="sm" asChild>
        <Link href={pageHref} prefetch={false}>
          Voir la page
        </Link>
      </Button>
      <Button variant="outline" size="sm" asChild>
        <Link href={`/builder/landing?page=${encodeURIComponent(selectedPage?.slug ?? "")}`} prefetch={false}>
          Ouvrir le builder
        </Link>
      </Button>
      {selectedPage ? (
        <InsertBlockToPageButton
          pageSlug={selectedPage.slug}
          pageLabel={selectedPage.is_home ? "la page d’accueil" : `la page ${selectedPage.title}`}
          block={block}
        />
      ) : null}
    </div>
  );
}
