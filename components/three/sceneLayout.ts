import { productsWithStats } from "@/data/products";

/** Profundidade (em unidades Three.js) de cada "parada" da câmera ao longo do rio. */
export const SEGMENT_DEPTH = 16;

export interface SceneStop {
  key: string;
  label: string;
  z: number;
  x: number;
  y: number;
}

/** Parada 0 é o Hero (mapa geral, câmera alta); as seguintes seguem a ordem dos produtos, mais próximas do "chão". */
export const sceneStops: SceneStop[] = [
  { key: "hero", label: "Mapa geral", z: 0, x: 0, y: 6.2 },
  ...productsWithStats.map((product, index) => ({
    key: product.slug,
    label: product.name,
    z: -(index + 1) * SEGMENT_DEPTH,
    // pequeno zigue-zague lateral para simular o curso de um rio
    x: index % 2 === 0 ? 2.4 : -2.4,
    y: 3.2,
  })),
];

export const totalJourneyDepth = SEGMENT_DEPTH * productsWithStats.length;

/** Referência mutável (fora do ciclo de render do React) com o progresso 0..1 do scroll. */
export const scrollProgressRef = { current: 0 };
