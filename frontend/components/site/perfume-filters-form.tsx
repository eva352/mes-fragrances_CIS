"use client";

import { useState } from "react";
import Link from "next/link";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { PerfumeFilterOptions } from "@/lib/api/public-perfumes";

function clampRange(value: [number, number], min: number, max: number): [number, number] {
  const nextMin = Math.max(min, Math.min(value[0], max));
  const nextMax = Math.max(nextMin, Math.min(value[1], max));
  return [nextMin, nextMax];
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function toggleValue(values: string[], value: string, checked: boolean) {
  if (checked) {
    return values.includes(value) ? values : [...values, value];
  }

  return values.filter((item) => item !== value);
}

export function PerfumeFiltersForm({
  action,
  query,
  filters,
  selectedGenders,
  selectedBrands,
  selectedFamilies,
  minPrice,
  maxPrice,
  clearHref,
}: {
  action: string;
  query: string;
  filters: PerfumeFilterOptions;
  selectedGenders: string[];
  selectedBrands: string[];
  selectedFamilies: string[];
  minPrice: number | null;
  maxPrice: number | null;
  clearHref: string;
}) {
  const genderOptions = filters.genders ?? [];
  const brandOptions = filters.brands ?? [];
  const familyOptions = filters.families ?? [];
  const priceFloor = Math.floor(filters.priceRange.min ?? 0);
  const priceCeiling = Math.ceil(filters.priceRange.max ?? priceFloor);
  const hasPriceRange = priceCeiling > priceFloor;
  const initialRange = clampRange(
    [minPrice ?? priceFloor, maxPrice ?? priceCeiling],
    priceFloor,
    priceCeiling,
  );

  const [genders, setGenders] = useState(selectedGenders);
  const [brands, setBrands] = useState(selectedBrands);
  const [families, setFamilies] = useState(selectedFamilies);
  const [brandQuery, setBrandQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>(initialRange);
  const normalizedBrandQuery = brandQuery.trim().toLowerCase();
  const defaultOpenSections = [
    ...(selectedBrands.length ? ["brands"] : []),
    ...(selectedFamilies.length ? ["families"] : []),
  ];
  const visibleBrands = brandOptions.filter((option) => {
    if (!normalizedBrandQuery) {
      return true;
    }
    return option.label.toLowerCase().includes(normalizedBrandQuery);
  });

  return (
    <form
      action={action}
      className="space-y-6 rounded-[2rem] border border-[hsla(var(--mf-line),0.88)] bg-[hsla(var(--mf-cream),0.86)] p-5 shadow-[0_24px_60px_rgba(168,135,131,0.10)] backdrop-blur"
    >
      {query ? <input type="hidden" name="q" value={query} /> : null}
      {genders.map((value) => (
        <input key={`gender-${value}`} type="hidden" name="gender" value={value} />
      ))}
      {brands.map((value) => (
        <input key={`brand-${value}`} type="hidden" name="brand" value={value} />
      ))}
      {families.map((value) => (
        <input key={`family-${value}`} type="hidden" name="family" value={value} />
      ))}
      {hasPriceRange ? (
        <>
          <input type="hidden" name="minPrice" value={String(priceRange[0])} />
          <input type="hidden" name="maxPrice" value={String(priceRange[1])} />
        </>
      ) : null}

      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--mf-ink-soft))]">Filtres</p>
        <h2 className="font-serif text-3xl text-[hsl(var(--mf-ink))]">Affiner la sélection</h2>
        <p className="text-sm leading-6 text-[hsl(var(--mf-ink-soft))]">
          Le filtrage interroge directement la base parfum et les prix disponibles.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-[hsl(var(--mf-ink))]">Genre</p>
        <div className="space-y-3">
          {genderOptions.length ? (
            genderOptions.map((option) => {
              const checked = genders.includes(option.value);
              return (
                <label key={option.value} className="flex cursor-pointer items-start gap-3 rounded-[1.1rem] border border-[hsla(var(--mf-line),0.74)] bg-white/55 px-3 py-3">
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(value) => {
                      setGenders((current) => toggleValue(current, option.value, value === true));
                    }}
                    className="mt-0.5 border-[hsla(var(--mf-line),0.95)] data-[state=checked]:bg-[hsl(var(--mf-rose-strong))] data-[state=checked]:text-white"
                  />
                  <span className="flex-1">
                    <span className="text-sm font-medium text-[hsl(var(--mf-ink))]">{option.label}</span>
                    <span className="mt-1 block text-xs text-[hsl(var(--mf-ink-soft))]">{option.count} parfum{option.count > 1 ? "s" : ""}</span>
                  </span>
                </label>
              );
            })
          ) : (
            <p className="text-sm text-[hsl(var(--mf-ink-soft))]">Genres bientôt disponibles.</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-[hsl(var(--mf-ink))]">Prix</p>
          {hasPriceRange ? (
            <span className="text-xs text-[hsl(var(--mf-ink-soft))]">
              {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
            </span>
          ) : null}
        </div>
        {hasPriceRange ? (
          <div className="space-y-4 rounded-[1.4rem] border border-[hsla(var(--mf-line),0.74)] bg-white/55 px-4 py-4">
            <Slider
              min={priceFloor}
              max={priceCeiling}
              step={1}
              value={priceRange}
              onValueChange={(value) => {
                if (value.length === 2) {
                  setPriceRange(clampRange([value[0] ?? priceFloor, value[1] ?? priceCeiling], priceFloor, priceCeiling));
                }
              }}
              className="py-1"
            />
            <div className="flex items-center justify-between text-xs text-[hsl(var(--mf-ink-soft))]">
              <span>{formatPrice(priceFloor)}</span>
              <span>{formatPrice(priceCeiling)}</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[hsl(var(--mf-ink-soft))]">Aucune donnée de prix exploitable pour le moment.</p>
        )}
      </div>

      <Accordion type="multiple" defaultValue={defaultOpenSections} className="space-y-3">
        <AccordionItem value="brands" className="overflow-hidden rounded-[1.4rem] border border-[hsla(var(--mf-line),0.74)] bg-white/55 px-4">
          <AccordionTrigger className="py-4 text-left text-sm font-medium text-[hsl(var(--mf-ink))] hover:no-underline">
            <span>Marque</span>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-3">
              <Input
                value={brandQuery}
                onChange={(event) => setBrandQuery(event.target.value)}
                placeholder="Rechercher une marque"
                className="rounded-[1rem] border-[hsla(var(--mf-line),0.74)] bg-white/80"
              />
              <div className="max-h-[22rem] space-y-3 overflow-y-auto pr-1">
                {visibleBrands.length ? (
                  visibleBrands.map((option) => {
                    const checked = brands.includes(option.value);
                    return (
                      <label key={option.value} className="flex cursor-pointer items-start gap-3 rounded-[1.1rem] border border-[hsla(var(--mf-line),0.74)] bg-white/70 px-3 py-3">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(value) => {
                            setBrands((current) => toggleValue(current, option.value, value === true));
                          }}
                          className="mt-0.5 border-[hsla(var(--mf-line),0.95)] data-[state=checked]:bg-[hsl(var(--mf-rose-strong))] data-[state=checked]:text-white"
                        />
                        <span className="flex-1">
                          <span className="text-sm font-medium text-[hsl(var(--mf-ink))]">{option.label}</span>
                          <span className="mt-1 block text-xs text-[hsl(var(--mf-ink-soft))]">{option.count} parfum{option.count > 1 ? "s" : ""}</span>
                        </span>
                      </label>
                    );
                  })
                ) : (
                  <p className="text-sm text-[hsl(var(--mf-ink-soft))]">Aucune marque ne correspond à cette recherche.</p>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="families" className="overflow-hidden rounded-[1.4rem] border border-[hsla(var(--mf-line),0.74)] bg-white/55 px-4">
          <AccordionTrigger className="py-4 text-left text-sm font-medium text-[hsl(var(--mf-ink))] hover:no-underline">
            <span>Famille olfactive</span>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="max-h-[22rem] space-y-3 overflow-y-auto pr-1">
              {familyOptions.length ? (
                familyOptions.map((option) => {
                  const checked = families.includes(option.value);
                  return (
                    <label key={option.value} className="flex cursor-pointer items-start gap-3 rounded-[1.1rem] border border-[hsla(var(--mf-line),0.74)] bg-white/70 px-3 py-3">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(value) => {
                          setFamilies((current) => toggleValue(current, option.value, value === true));
                        }}
                        className="mt-0.5 border-[hsla(var(--mf-line),0.95)] data-[state=checked]:bg-[hsl(var(--mf-rose-strong))] data-[state=checked]:text-white"
                      />
                      <span className="flex-1">
                        <span className="text-sm font-medium text-[hsl(var(--mf-ink))]">{option.label}</span>
                        <span className="mt-1 block text-xs text-[hsl(var(--mf-ink-soft))]">{option.count} parfum{option.count > 1 ? "s" : ""}</span>
                      </span>
                    </label>
                  );
                })
              ) : (
                <p className="text-sm text-[hsl(var(--mf-ink-soft))]">Familles bientôt disponibles.</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" className="flex-1 rounded-full px-5 shadow-[0_16px_28px_rgba(178,140,146,0.18)]">
          Appliquer les filtres
        </Button>
        <Button asChild variant="outline" className="rounded-full px-5">
          <Link href={clearHref}>Réinitialiser</Link>
        </Button>
      </div>
    </form>
  );
}
