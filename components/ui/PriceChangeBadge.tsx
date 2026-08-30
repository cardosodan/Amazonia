import { formatPct } from "@/lib/format";

export function PriceChangeBadge({ value, label }: { value: number; label?: string }) {
  const positive = value >= 0;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium tabular-nums"
      style={{
        color: positive ? "var(--color-positive)" : "var(--color-negative)",
        background: positive ? "color-mix(in srgb, var(--color-positive) 14%, transparent)" : "color-mix(in srgb, var(--color-negative) 14%, transparent)",
        border: `1px solid ${positive ? "var(--color-positive)" : "var(--color-negative)"}33`,
      }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className={positive ? "" : "rotate-180"}>
        <path d="M5 0L10 8H0L5 0Z" fill="currentColor" />
      </svg>
      {formatPct(value)}
      {label ? <span className="text-mist-dim font-normal">{label}</span> : null}
    </span>
  );
}
