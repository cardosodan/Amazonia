"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ensureGsapRegistered, ScrollTrigger } from "@/lib/gsap";
import { scrollProgressRef } from "@/components/three/sceneLayout";

const Scene3DBackground = dynamic(
  () => import("@/components/three/Scene3DBackground").then((m) => m.Scene3DBackground),
  { ssr: false },
);

/**
 * Envolve o Hero + as cenas de produto num único trecho de scroll contínuo.
 * O fundo 3D fixo lê o progresso desse trecho para mover a câmera sem cortes;
 * fora dele (Comparador, Fontes, Footer) o fundo 3D simplesmente desaparece.
 */
export function Journey({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    ensureGsapRegistered();
    if (!wrapperRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      },
      onLeave: () => setVisible(false),
      onEnterBack: () => setVisible(true),
      onEnter: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
    });

    return () => trigger.kill();
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 -z-10 transition-opacity duration-700 ease-out"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <Scene3DBackground />
      </div>
      <div ref={wrapperRef}>{children}</div>
    </>
  );
}
