"use client";

import { useMemo, useState } from "react";
import { productsWithStats } from "@/data/products";
import type { ProductWithStats } from "@/types/product";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PriceChangeBadge } from "@/components/ui/PriceChangeBadge";
import { formatBRL } from "@/lib/format";

type SortKey = "currentPrice" | "weeklyChangePct" | "monthlyChangePct" | "volumeIndex";

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "currentPrice", label: "Preço" },
  { key: "weeklyChangePct", label: "Variação semanal" },
  { key: "monthlyChangePct", label: "Variação mensal" },
  { key: "volumeIndex", label: "Índice de volume" },
];

export function Comparator() {
  const [sortKey, setSortKey] = useState<SortKey>("weeklyChangePct");
  const [sortDir, setSortDir] = useState<1 | -1>(-1);

  const rows = useMemo(() => {
    return [...productsWithStats].sort((a, b) => (a[sortKey] - b[sortKey]) * sortDir);
  }, [sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((dir) => (dir === 1 ? -1 : 1) as 1 | -1);
    } else {
      setSortKey(key);
      setSortDir(-1);
    }
  }

  return (
    <section className="relative section-pad py-28 md:py-36">
      <SectionHeading
        kicker="Painel comparativo"
        title="Todos os produtos, lado a lado"
        description="Ordene por preço, variação ou volume para ver o que está se movendo no rio essa semana."
      />

      <div className="panel mt-12 overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-mist/10 text-xs uppercase tracking-widest text-mist-dim">
              <th className="px-5 py-4 font-normal">Produto</th>
              {COLUMNS.map((col) => (
                <th key={col.key} className="px-5 py-4 font-normal">
                  <button
                    type="button"
                    onClick={() => handleSort(col.key)}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-gold"
                  >
                    {col.label}
                    <span className={`transition-transform ${sortKey === col.key && sortDir === 1 ? "rotate-180" : ""}`}>
                      {sortKey === col.key ? "▲" : "—"}
                    </span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((product) => (
              <ComparatorRow key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ComparatorRow({ product }: { product: ProductWithStats }) {
  return (
    <tr className="border-b border-mist/5 last:border-0 transition-colors hover:bg-mist/[0.03]">
      <td className="px-5 py-4">
        <a href={`#${product.slug}`} className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: product.accent }} />
          <span>
            <span className="block text-mist font-medium">{product.name}</span>
            <span className="block text-xs text-mist-dim">{product.unit}</span>
          </span>
        </a>
      </td>
      <td className="px-5 py-4 tabular-nums text-mist">{formatBRL(product.currentPrice)}</td>
      <td className="px-5 py-4">
        <PriceChangeBadge value={product.weeklyChangePct} />
      </td>
      <td className="px-5 py-4">
        <PriceChangeBadge value={product.monthlyChangePct} />
      </td>
      <td className="px-5 py-4">
        <div className="h-1.5 w-28 overflow-hidden rounded-full bg-mist/10">
          <div
            className="h-full rounded-full"
            style={{ width: `${product.volumeIndex}%`, background: "var(--color-gold)" }}
          />
        </div>
      </td>
    </tr>
  );
}
