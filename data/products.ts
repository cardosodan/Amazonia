import type { Product, ProductWithStats } from "@/types/product";
import raw from "./products.json";

/**
 * Fase 1 (portfólio): dados mockados, estruturados como se viessem de uma
 * API real. Basta trocar este import por um fetch para os boletins da
 * CONAB / CEASA-AM / SEPROR-AM quando a Fase 2 estiver pronta — a forma
 * (Product[]) permanece a mesma.
 */
export const products = raw as unknown as Product[];

function pctChange(from: number, to: number) {
  if (from === 0) return 0;
  return ((to - from) / from) * 100;
}

/** Deriva estatísticas (preço atual, variação semanal/mensal, índice de volume) a partir do histórico. */
export function withStats(product: Product): ProductWithStats {
  const history = product.history;
  const last = history[history.length - 1];
  const weekAgo = history[Math.max(0, history.length - 2)];
  const monthAgo = history[Math.max(0, history.length - 5)];

  // Índice de volume ilustrativo (Fase 1): derivado da posição relativa do
  // preço atual dentro da série, só para permitir ordenar o comparador.
  const prices = history.map((p) => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const volumeIndex = max === min ? 50 : Math.round(((last.price - min) / (max - min)) * 100);

  return {
    ...product,
    currentPrice: last.price,
    weeklyChangePct: Math.round(pctChange(weekAgo.price, last.price) * 10) / 10,
    monthlyChangePct: Math.round(pctChange(monthAgo.price, last.price) * 10) / 10,
    volumeIndex,
  };
}

export const productsWithStats: ProductWithStats[] = products.map(withStats);

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
