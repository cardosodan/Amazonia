"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { productsWithStats } from "@/data/products";
import { sceneStops } from "./sceneLayout";

/** Pontos de origem pulsantes no mapa do Hero — um por produto, com um "ping" que se expande. */
export function OriginPoints() {
  const coreRefs = useRef<(THREE.Mesh | null)[]>([]);
  const pingRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    coreRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.6 + i * 1.1) * 0.3;
      mesh.scale.setScalar(pulse);
    });
    pingRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const t = ((state.clock.elapsedTime * 0.5 + i * 0.37) % 1.4) / 1.4;
      mesh.scale.setScalar(0.6 + t * 3.2);
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = Math.max(0, 0.55 * (1 - t));
    });
  });

  return (
    <group>
      {productsWithStats.map((product, i) => {
        const stop = sceneStops[i + 1];
        // espalha os pontos de origem perto do início do rio, no Hero,
        // para reforçar a leitura de "mapa com pontos de origem"
        const heroX = stop.x * 1.5;
        const heroZ = -1.5 - i * 1.9;
        return (
          <group key={product.id} position={[heroX, 0.06, heroZ]}>
            <mesh ref={(el) => { coreRefs.current[i] = el; }}>
              <sphereGeometry args={[0.34, 16, 16]} />
              <meshStandardMaterial color="#e6c583" emissive="#c8a35c" emissiveIntensity={1.6} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.5, 0.6, 28]} />
              <meshBasicMaterial color="#e6c583" transparent opacity={0.75} />
            </mesh>
            <mesh ref={(el) => { pingRefs.current[i] = el; }} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.45, 0.56, 28]} />
              <meshBasicMaterial color="#e6c583" transparent opacity={0.5} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
