import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PUBLIC_PATHS } from "@/lib/site/public-paths";

export function SearchInlineForm({
  action = PUBLIC_PATHS.search,
  defaultValue = "",
  compact = false,
  placeholder = "Rechercher un parfum…",
  hiddenInputs = [],
}: {
  action?: string;
  defaultValue?: string;
  compact?: boolean;
  placeholder?: string;
  hiddenInputs?: Array<{ name: string; value: string }>;
}) {
  return (
    <form action={action} className={compact ? "flex flex-col gap-3 sm:flex-row" : "flex flex-col gap-3 md:flex-row"}>
      {hiddenInputs.map((input, index) => (
        <input key={`${input.name}-${input.value}-${index}`} type="hidden" name={input.name} value={input.value} />
      ))}
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--mf-rose-strong))]" />
        <Input
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="h-12 rounded-full border-[hsl(var(--mf-line))] bg-[hsla(var(--mf-cream),0.96)] pl-11 text-sm text-[hsl(var(--mf-ink))] shadow-[0_16px_32px_rgba(160,131,124,0.10)] placeholder:text-[hsl(var(--mf-ink-soft))]"
        />
      </div>
      <Button type="submit" className="h-12 rounded-full px-6 shadow-[0_16px_28px_rgba(178,140,146,0.18)]">
        Rechercher
      </Button>
    </form>
  );
}
