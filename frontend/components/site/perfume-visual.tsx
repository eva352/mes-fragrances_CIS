import { cn } from "@/lib/utils";

function isRenderableImageUrl(value: string | null | undefined) {
  if (!value) return false;
  return value.startsWith("/") || value.startsWith("http://") || value.startsWith("https://");
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function PerfumeVisual({
  name,
  brand,
  imageUrl,
  alt,
  className,
  compact = false,
}: {
  name: string;
  brand: string;
  imageUrl?: string | null;
  alt?: string;
  className?: string;
  compact?: boolean;
}) {
  const hasImage = isRenderableImageUrl(imageUrl);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-[hsla(var(--mf-line),0.7)] bg-[radial-gradient(circle_at_top,_hsla(var(--mf-cream),0.98),_hsla(var(--mf-blush),0.94)_42%,_hsla(var(--mf-petal),0.74)_100%)]",
        compact ? "aspect-[4/5]" : "aspect-[5/6]",
        className,
      )}
    >
      {hasImage ? (
        <>
          <img
            src={imageUrl ?? ""}
            alt={alt || `${brand} ${name}`}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,251,248,0.08),rgba(255,246,244,0.18)_50%,rgba(255,246,244,0.34)_100%)]" />
        </>
      ) : null}

      <div className="absolute inset-x-6 top-6 rounded-full border border-[hsla(var(--mf-line),0.8)] bg-[hsla(var(--mf-cream),0.8)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[hsl(var(--mf-ink-soft))] backdrop-blur">
        {brand}
      </div>

      {!hasImage ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-[hsla(var(--mf-line),0.7)] bg-[hsla(var(--mf-cream),0.82)] text-3xl font-semibold tracking-[0.18em] text-[hsl(var(--mf-ink))] shadow-[0_18px_40px_rgba(176,142,144,0.16)] backdrop-blur">
            {getInitials(name)}
          </div>
        </div>
      ) : null}

      <div className="absolute inset-x-5 bottom-5 rounded-[1.5rem] border border-[hsla(var(--mf-line),0.7)] bg-[hsla(var(--mf-cream),0.82)] px-4 py-3 backdrop-blur">
        <p className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--mf-ink-soft))]">Selection</p>
        <p className="mt-1 text-sm font-semibold text-[hsl(var(--mf-ink))]">{name}</p>
      </div>
    </div>
  );
}
