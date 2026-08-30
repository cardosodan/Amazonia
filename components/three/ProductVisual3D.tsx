"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ProductId } from "@/types/product";
import { reducedMotionRef } from "./sceneLayout";

interface ProductVisual3DProps {
  id: ProductId;
  position: [number, number, number];
}

/**
 * Representação procedural leve de cada produto — nada de modelos GLTF
 * pesados: só primitivas de baixo poligono compostas para sugerir a forma.
 */
export function ProductVisual3D({ id, position }: ProductVisual3DProps) {
  const group = useRef<THREE.Group>(null);
  // Semente determinística (a partir da posição) para desfasar rotação/respiração
  // entre visuais sem depender de Math.random durante a renderização.
  const seed = useMemo(() => (position[0] * 3 + position[2] * 0.7) % (Math.PI * 2), [position]);

  const baseScale = 1.7;

  useFrame((state) => {
    if (!group.current) return;
    // Com "menos movimento" pedido, mantém o objeto parado (sem giro/respiração
    // automáticos) — só a câmera continua se movendo, e isso é resposta ao scroll.
    if (reducedMotionRef.current) {
      group.current.rotation.y = seed;
      group.current.scale.setScalar(baseScale);
      return;
    }
    group.current.rotation.y = state.clock.elapsedTime * 0.18 + seed;
    const breathe = baseScale + Math.sin(state.clock.elapsedTime * 0.9 + seed) * 0.05;
    group.current.scale.setScalar(breathe);
  });

  return (
    <group ref={group} position={position} scale={baseScale}>
      {VISUALS[id]()}
    </group>
  );
}

function AcaiVisual() {
  const berries = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const angle = (i / 14) * Math.PI * 2 + (i % 3);
        const radius = 0.55 + (i % 3) * 0.18;
        const height = Math.sin(i * 1.7) * 0.5;
        return [Math.cos(angle) * radius, height, Math.sin(angle) * radius] as [number, number, number];
      }),
    [],
  );
  return (
    <group>
      {berries.map((p, i) => (
        <mesh key={i} position={p}>
          <icosahedronGeometry args={[0.26, 1]} />
          <meshStandardMaterial color="#241a2e" roughness={0.35} metalness={0.25} emissive="#3a2a4a" emissiveIntensity={0.15} />
        </mesh>
      ))}
      <mesh position={[0, 1.1, 0]} rotation={[0, 0, Math.PI * 0.06]}>
        <cylinderGeometry args={[0.04, 0.05, 1.4, 6]} />
        <meshStandardMaterial color="#4a3626" roughness={0.8} />
      </mesh>
    </group>
  );
}

function CastanhaVisual() {
  const nuts = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => {
        const angle = (i / 9) * Math.PI * 2;
        return [Math.cos(angle) * 0.5, Math.sin(i * 2.1) * 0.3, Math.sin(angle) * 0.5] as [number, number, number];
      }),
    [],
  );
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.85, 12, 10]} />
        <meshStandardMaterial color="#4a3626" roughness={0.9} />
      </mesh>
      {nuts.map((p, i) => (
        <mesh key={i} position={p} rotation={[i, i * 0.4, 0]}>
          <coneGeometry args={[0.16, 0.42, 6]} />
          <meshStandardMaterial color="#8a5a3c" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function PeixeVisual() {
  return (
    <group>
      <mesh scale={[1.3, 0.62, 0.68]}>
        <sphereGeometry args={[0.85, 20, 16]} />
        <meshStandardMaterial color="#3a5a4e" roughness={0.35} metalness={0.4} />
      </mesh>
      <mesh position={[-1.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.5, 0.6, 4]} />
        <meshStandardMaterial color="#2c463c" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0.15, 0.5, 0]} rotation={[0.3, 0, -0.4]}>
        <coneGeometry args={[0.08, 0.55, 4]} />
        <meshStandardMaterial color="#c8a35c" roughness={0.5} />
      </mesh>
    </group>
  );
}

function GuaranaVisual() {
  const seeds = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        const radius = 0.6;
        return [Math.cos(angle) * radius, Math.sin(i * 1.3) * 0.45, Math.sin(angle) * radius] as [number, number, number];
      }),
    [],
  );
  return (
    <group>
      {seeds.map((p, i) => (
        <group key={i} position={p}>
          <mesh>
            <sphereGeometry args={[0.24, 14, 12]} />
            <meshStandardMaterial color="#7a1f1f" roughness={0.4} />
          </mesh>
          {/* O "olho" branco-e-preto característico da semente de guaraná */}
          <mesh position={[0.16, 0.1, 0.16]} scale={0.6}>
            <sphereGeometry args={[0.2, 10, 8]} />
            <meshStandardMaterial color="#f3ede0" roughness={0.5} />
          </mesh>
          <mesh position={[0.22, 0.14, 0.22]} scale={0.32}>
            <sphereGeometry args={[0.2, 8, 6]} />
            <meshStandardMaterial color="#100a08" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function MadeiraVisual() {
  const logs = [0, 1, 2, 3];
  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      {logs.map((row) => (
        <mesh key={row} position={[0, row * 0.62 - 0.9 + (row % 2 === 0 ? 0.3 : 0), 0]}>
          <cylinderGeometry args={[0.32, 0.32, 2.2, 14]} />
          <meshStandardMaterial color={row % 2 === 0 ? "#6b4a30" : "#7c5836"} roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

const VISUALS: Record<ProductId, () => React.JSX.Element> = {
  acai: AcaiVisual,
  castanha: CastanhaVisual,
  peixe: PeixeVisual,
  guarana: GuaranaVisual,
  madeira: MadeiraVisual,
};
