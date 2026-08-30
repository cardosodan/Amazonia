"use client";

import { useEffect, useState } from "react";
import { SceneCanvas } from "./SceneCanvas";
import { reducedMotionRef } from "./sceneLayout";
import { useIsMobile } from "@/lib/useIsMobile";
import { useReducedMotion } from "@/lib/useReducedMotion";

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Fundo 3D fixo, atrás de toda a jornada (Hero + produtos). Só cai para um
 * gradiente estático quando o dispositivo realmente não tem WebGL — a
 * câmera que percorre o rio é disparada pelo scroll do próprio visitante
 * (não é uma animação automática), então mantemos o mapa mesmo com
 * "Reduzir Movimento" ativo; o que essa preferência desliga é o smooth
 * scroll do Lenis e os laços de "respiração"/pulso ambiente (ver SceneCanvas).
 */
export function Scene3DBackground() {
  // Este componente só é montado no cliente (dynamic import com ssr:false),
  // então checar o DOM direto no lazy initializer do useState é seguro aqui.
  const [supported] = useState(() => hasWebGL());
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

  if (!supported) {
    return (
      <div
        aria-hidden
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, #1b241d 0%, #131a15 45%, #0b0f0c 100%)",
        }}
      />
    );
  }

  return (
    <div aria-hidden className="fixed inset-0 -z-10">
      <SceneCanvas dpr={isMobile ? [1, 1.4] : [1, 2]} />
    </div>
  );
}
