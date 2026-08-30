"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface AnimatedNumberProps {
  value: number;
  format: (n: number) => string;
  className?: string;
  duration?: number;
}

/**
 * Número que "conta" ao entrar no viewport e recebe um pequeno tique
 * animado ao passar o mouse — a microinteração pedida no briefing.
 */
export function AnimatedNumber({ value, format, className, duration = 1.4 }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const state = useRef({ val: 0 });
  const hasAnimatedIn = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = format(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedIn.current) {
          hasAnimatedIn.current = true;
          gsap.to(state.current, {
            val: value,
            duration,
            ease: "power3.out",
            onUpdate: () => {
              if (el) el.textContent = format(state.current.val);
            },
          });
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, format, duration]);

  const handleHover = () => {
    const el = ref.current;
    if (!el || !hasAnimatedIn.current) return;
    gsap.fromTo(
      state.current,
      { val: value * 0.92 },
      {
        val: value,
        duration: 0.55,
        ease: "power2.out",
        onUpdate: () => {
          if (el) el.textContent = format(state.current.val);
        },
      },
    );
  };

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={handleHover}
      onFocus={handleHover}
      tabIndex={0}
    />
  );
}
