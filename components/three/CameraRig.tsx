"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollProgressRef, sceneStops, totalJourneyDepth } from "./sceneLayout";

const tmpTarget = new THREE.Vector3();
const tmpLook = new THREE.Vector3();

/**
 * Move a câmera continuamente ao longo do "rio" conforme o scroll,
 * sem cortes — cada parada (hero + produtos) é só um ponto de referência
 * numa curva contínua, nunca um corte de câmera.
 */
export function CameraRig() {
  const { camera } = useThree();
  const smoothed = useRef(0);

  useFrame((_, delta) => {
    smoothed.current = THREE.MathUtils.damp(smoothed.current, scrollProgressRef.current, 4.5, delta);
    const progress = smoothed.current;

    const z = -progress * totalJourneyDepth;

    // Interpola x/y suavemente entre as duas paradas mais próximas do z atual,
    // para o zigue-zague lateral do "rio" e a descida gradual da câmera.
    const stopIndex = Math.min(sceneStops.length - 2, Math.floor(progress * (sceneStops.length - 1)));
    const localT = progress * (sceneStops.length - 1) - stopIndex;
    const a = sceneStops[stopIndex];
    const b = sceneStops[stopIndex + 1] ?? a;

    tmpTarget.set(
      THREE.MathUtils.lerp(a.x, b.x, localT),
      THREE.MathUtils.lerp(a.y, b.y, localT),
      z + 7,
    );
    camera.position.lerp(tmpTarget, 1 - Math.pow(0.001, delta));

    tmpLook.set(
      THREE.MathUtils.lerp(a.x, b.x, localT) * 0.4,
      THREE.MathUtils.lerp(a.y, b.y, localT) * 0.25,
      z,
    );
    camera.lookAt(tmpLook);
  });

  return null;
}
