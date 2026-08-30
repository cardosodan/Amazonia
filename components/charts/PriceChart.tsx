"use client";

import { useEffect, useId, useMemo, useRef, useState, type MouseEvent } from "react";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/gsap";
import type { PricePoint } from "@/types/product";
import { formatBRL, formatDateShort } from "@/lib/format";

interface PriceChartProps {
  history: PricePoint[];
  accent: string;
  height?: number;
}

interface ChartPoint {
  x: number;
  y: number;
  price: number;
  date: string;
}

/** Curva suave (Catmull-Rom convertida em Bézier cúbica) em vez de linhas retas. */
function smoothPath(points: ChartPoint[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

const PADDING = 12;

export function PriceChart({ history, accent, height = 200 }: PriceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);
  const [width, setWidth] = useState(600);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const gradientId = `chart-fill-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setWidth(Math.round(w));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const points = useMemo<ChartPoint[]>(() => {
    const prices = history.map((p) => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const span = max - min || 1;
    return history.map((p, i) => ({
      x: PADDING + (i / (history.length - 1)) * (width - PADDING * 2),
      y: PADDING + (1 - (p.price - min) / span) * (height - PADDING * 2),
      price: p.price,
      date: p.date,
    }));
  }, [history, width, height]);

  const linePath = useMemo(() => smoothPath(points), [points]);
  const areaPath = useMemo(() => {
    if (!points.length) return "";
    const last = points[points.length - 1];
    const first = points[0];
    return `${linePath} L ${last.x} ${height - PADDING} L ${first.x} ${height - PADDING} Z`;
  }, [linePath, points, height]);

  useEffect(() => {
    ensureGsapRegistered();
    const path = pathRef.current;
    const area = areaRef.current;
    if (!path || !area || !linePath) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.set(area, { autoAlpha: 0 });

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 78%",
      once: true,
      onEnter: () => {
        gsap.to(path, { strokeDashoffset: 0, duration: 1.6, ease: "power2.out" });
        gsap.to(area, { autoAlpha: 1, duration: 1.2, delay: 0.3, ease: "power2.out" });
      },
    });
    return () => st.kill();
  }, [linePath]);

  const hovered = hoverIndex !== null ? points[hoverIndex] : null;

  function handleMove(event: MouseEvent<SVGSVGElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    let closest = 0;
    let closestDist = Infinity;
    points.forEach((p, i) => {
      const d = Math.abs(p.x - x);
      if (d < closestDist) {
        closestDist = d;
        closest = i;
      }
    });
    setHoverIndex(closest);
  }

  return (
    <div ref={containerRef} className="relative w-full select-none">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIndex(null)}
        className="overflow-visible"
        role="img"
        aria-label="Gráfico de variação de preço"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity={0.35} />
            <stop offset="100%" stopColor={accent} stopOpacity={0} />
          </linearGradient>
        </defs>
        <path ref={areaRef} d={areaPath} fill={`url(#${gradientId})`} stroke="none" />
        <path ref={pathRef} d={linePath} fill="none" stroke={accent} strokeWidth={2.5} strokeLinecap="round" />
        {hovered ? (
          <g>
            <line
              x1={hovered.x}
              x2={hovered.x}
              y1={0}
              y2={height}
              stroke={accent}
              strokeOpacity={0.25}
              strokeDasharray="3 4"
            />
            <circle cx={hovered.x} cy={hovered.y} r={4.5} fill={accent} stroke="#0b0f0c" strokeWidth={2} />
          </g>
        ) : null}
      </svg>
      {hovered ? (
        <div
          className="panel pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-lg px-3 py-1.5 text-xs whitespace-nowrap"
          style={{ left: hovered.x, top: -8 }}
        >
          <span className="text-mist-dim">{formatDateShort(hovered.date)}</span>{" "}
          <span className="text-mist font-medium tabular-nums">{formatBRL(hovered.price)}</span>
        </div>
      ) : null}
    </div>
  );
}
