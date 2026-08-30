"use client";

import { useState } from "react";
import { SceneCanvas } from "./SceneCanvas";
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
 * Fundo 3D fixo, atrás de toda a jornada (Hero + produtos). Em telas sem
 * WebGL, ou quando o usuário pede menos movimento, cai para um gradiente
 * estático — a experiência de dados continua funcionando sem o 3D.
 */
export function Scene3DBackground() {
  // Este componente só é montado no cliente (dynamic import com ssr:false),
  // então checar o DOM direto no lazy initializer do useState é seguro aqui.
  const [supported] = useState(() => hasWebGL());
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  if (!supported || reducedMotion) {
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
      <SceneCanvas dpr={isMobile ? [1, 1] : [1, 1.8]} />
    </div>
  );
}
