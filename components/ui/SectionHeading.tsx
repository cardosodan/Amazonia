"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";

interface SectionHeadingProps {
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}

export function SectionHeading({ kicker, title, description, align = "left" }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureGsapRegistered();
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll("[data-reveal]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={align === "center" ? "text-center mx-auto" : ""}>
      <p data-reveal className="font-mono text-xs tracking-[0.25em] uppercase text-gold mb-3">
        {kicker}
      </p>
      <h2 data-reveal className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-mist">
        {title}
      </h2>
      {description ? (
        <p data-reveal className="mt-5 max-w-xl text-mist-dim text-lg leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
