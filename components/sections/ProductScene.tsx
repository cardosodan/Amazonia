"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import type { ProductWithStats } from "@/types/product";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { PriceChangeBadge } from "@/components/ui/PriceChangeBadge";
import { PriceChart } from "@/components/charts/PriceChart";
import { formatBRL } from "@/lib/format";

export function ProductScene({ product, index }: { product: ProductWithStats; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const alignEnd = index % 2 === 1;

  useEffect(() => {
    ensureGsapRegistered();
    const el = sectionRef.current;
    if (!el) return;
    const items = el.querySelectorAll("[data-reveal]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={product.slug}
      className={`relative flex min-h-[125vh] items-center section-pad py-24 ${alignEnd ? "justify-end" : "justify-start"}`}
    >
      <div className="panel w-full max-w-lg rounded-2xl p-7 sm:p-9">
        <p data-reveal className="font-mono text-xs tracking-[0.25em] uppercase text-gold mb-2">
          {product.kicker} · {product.origin.region}
        </p>
        <h3 data-reveal className="font-display text-4xl sm:text-5xl text-mist">
          {product.name}
        </h3>
        <p data-reveal className="mt-3 text-mist-dim leading-relaxed">
          {product.description}
        </p>

        <div data-reveal className="mt-7 flex flex-wrap items-end gap-x-4 gap-y-2">
          <AnimatedNumber
            value={product.currentPrice}
            format={(n) => formatBRL(n)}
            className="font-display text-4xl sm:text-5xl text-mist tabular-nums"
          />
          <span className="pb-1.5 text-sm text-mist-dim">{product.unit}</span>
        </div>

        <div data-reveal className="mt-3 flex flex-wrap gap-2">
          <PriceChangeBadge value={product.weeklyChangePct} label="semana" />
          <PriceChangeBadge value={product.monthlyChangePct} label="mês" />
        </div>

        <div data-reveal className="mt-7">
          <PriceChart history={product.history} accent={product.accent} height={160} />
        </div>

        <div data-reveal className="mt-7 border-t border-mist/10 pt-5">
          <p className="text-sm leading-relaxed text-mist-dim">
            <span className="text-gold">◆ </span>
            {product.contextFact}
          </p>
          <p className="mt-3 text-xs text-mist-dim/70">
            Origem: {product.origin.municipalities.join(", ")} — às margens do {product.origin.waterway}
          </p>
        </div>
      </div>
    </section>
  );
}
