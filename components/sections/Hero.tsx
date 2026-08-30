"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    ensureGsapRegistered();
    const el = rootRef.current;
    if (!el) return;
    const items = el.querySelectorAll("[data-intro]");

    if (reducedMotion) {
      gsap.set(items, { autoAlpha: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 36 },
        { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.14, delay: 0.15 },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={rootRef} className="relative flex min-h-screen flex-col justify-between section-pad pt-32 pb-10">
      <div className="max-w-3xl">
        <p data-intro className="font-mono text-xs tracking-[0.3em] uppercase text-gold mb-6">
          Cotações vivas da floresta em pé
        </p>
        <h1 className="font-display text-[13vw] sm:text-7xl md:text-8xl leading-[0.92] text-mist">
          <span data-intro className="block">Índice</span>
          <span data-intro className="block text-gradient-gold">Amazônia</span>
        </h1>
        <p data-intro className="mt-8 max-w-xl text-lg sm:text-xl text-mist-dim leading-relaxed">
          Açaí, castanha-do-pará, tambaqui, guaraná e madeira certificada — os preços que hoje
          se perdem em boletins institucionais, aqui viram uma jornada visual pelo rio, a
          floresta e a feira.
        </p>
      </div>

      <div data-intro className="flex items-center gap-3 text-mist-dim">
        <span className="relative flex h-9 w-5 items-start justify-center rounded-full border border-mist-dim/40 p-1">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-scroll-cue" />
        </span>
        <span className="font-mono text-xs tracking-[0.2em] uppercase">Role para explorar</span>
      </div>
    </section>
  );
}
