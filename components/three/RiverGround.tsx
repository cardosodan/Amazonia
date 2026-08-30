"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sceneStops, totalJourneyDepth } from "./sceneLayout";

/** Terreno + curso d'água estilizado que acompanha as paradas da câmera. */
export function RiverGround() {
  const waterRef = useRef<THREE.Mesh>(null);

  const riverGeometry = useMemo(() => {
    const points = sceneStops.map((stop) => new THREE.Vector3(stop.x, 0, stop.z));
    // estende um pouco além da última parada para não "acabar" bruscamente
    const last = sceneStops[sceneStops.length - 1];
    points.push(new THREE.Vector3(last.x, 0, last.z - 20));
    const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.4);
    return new THREE.TubeGeometry(curve, 160, 1.5, 10, false);
  }, []);

  useFrame((state) => {
    if (waterRef.current) {
      const material = waterRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.35 + Math.sin(state.clock.elapsedTime * 0.6) * 0.12;
    }
  });

  return (
    <group>
      <mesh position={[0, -0.5, -totalJourneyDepth / 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={false}>
        <planeGeometry args={[46, totalJourneyDepth + 60]} />
        <meshStandardMaterial color="#1b241d" roughness={0.95} />
      </mesh>
      <mesh ref={waterRef} geometry={riverGeometry} position={[0, -0.3, 0]}>
        <meshStandardMaterial
          color="#2c443a"
          emissive="#c8a35c"
          emissiveIntensity={0.35}
          roughness={0.2}
          metalness={0.45}
        />
      </mesh>
    </group>
  );
}
