# Índice Amazônia

Site conceitual e imersivo que transforma a cotação de produtos regionais da
Amazônia (açaí, castanha-do-pará, tambaqui, guaraná e madeira certificada) em
uma jornada visual — em vez de mais um boletim institucional em PDF.

## Stack

- **Next.js 16** (App Router, React 19)
- **React Three Fiber + drei** — cenário 3D procedural (rio, mapa, produtos)
- **GSAP + ScrollTrigger** — storytelling vinculado ao scroll
- **Lenis** — smooth scroll
- **Tailwind CSS v4** — paleta terrosa/verde-floresta com acento dourado

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura

```
app/                     # rotas do App Router (layout, page, estilos globais)
components/
  sections/               # Hero, ProductScene, Comparator, Sources, Footer, Journey
  three/                  # cenário 3D: câmera, rio, pontos de origem, visuais por produto
  charts/                 # PriceChart (SVG animado com GSAP)
  ui/                     # AnimatedNumber, PriceChangeBadge, SectionHeading
  providers/              # SmoothScrollProvider (Lenis + GSAP ticker)
data/
  products.json           # dados mockados, no formato de uma API real
  products.ts             # tipagem + estatísticas derivadas (variação, volume)
lib/                      # formatação, registro do GSAP, hooks de mídia
types/                    # tipos compartilhados (Product, PricePoint, ...)
```

## Dados

**Fase 1 (este protótipo):** os preços vêm de `data/products.json`, estruturados
exatamente como se chegassem de uma API real — histórico semanal, variação,
origem, fonte e frequência de atualização por produto.

**Fase 2 (produto real):** troca do import estático por coleta/API dos
boletins da CONAB, CEASA-AM e SEPROR-AM, sem alterar o formato consumido
pelos componentes.

## Performance

- 3D construído inteiramente com primitivas de baixo polígono (sem modelos
  GLTF pesados) e câmera única compartilhada entre as cenas.
- DPR e geometria reduzidos automaticamente em telas mobile/touch.
- Fallback estático (gradiente CSS) quando não há WebGL ou o usuário pede
  menos movimento (`prefers-reduced-motion`).

---

Um projeto **DCodes**.
