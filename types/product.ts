export type ProductId =
  | "acai"
  | "castanha"
  | "peixe"
  | "guarana"
  | "madeira";

export interface PricePoint {
  /** ISO date (YYYY-MM-DD) */
  date: string;
  /** Price in BRL for the product's reference unit */
  price: number;
}

export interface ProductSource {
  label: string;
  org: string;
  url: string;
  updateFrequency: string;
}

export interface Product {
  id: ProductId;
  slug: string;
  /** Display name */
  name: string;
  /** Short scientific / local name shown as a kicker */
  kicker: string;
  /** Reference unit for the price, e.g. "R$/kg", "R$/saca 60kg" */
  unit: string;
  /** Origin description */
  origin: {
    region: string;
    waterway: string;
    municipalities: string[];
  };
  /** One highlighted contextual fact, e.g. "80% da produção sai de X municípios" */
  contextFact: string;
  /** Accent color used for this product's scene (hex) */
  accent: string;
  /** Secondary accent / gradient partner */
  accentSoft: string;
  /** Historical price series, oldest first */
  history: PricePoint[];
  source: ProductSource;
  /** Short one-line description of the product for the hero map + comparator */
  description: string;
}

export interface ProductWithStats extends Product {
  currentPrice: number;
  weeklyChangePct: number;
  monthlyChangePct: number;
  volumeIndex: number;
}
