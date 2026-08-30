"use client";

import { Canvas } from "@react-three/fiber";
import { productsWithStats } from "@/data/products";
import { CameraRig } from "./CameraRig";
import { ProductVisual3D } from "./ProductVisual3D";
import { RiverGround } from "./RiverGround";
import { OriginPoints } from "./OriginPoints";
import { sceneStops } from "./sceneLayout";

export function SceneCanvas({ dpr }: { dpr: [number, number] }) {
  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ fov: 46, near: 0.5, far: 90, position: [0, 6.2, 7] }}
    >
      <color attach="background" args={["#0b0f0c"]} />
      <fog attach="fog" args={["#0b0f0c", 10, 52]} />
      <ambientLight intensity={0.75} color="#cfd9c9" />
      <directionalLight position={[6, 10, 4]} intensity={1.8} color="#f3e6c2" />
      <directionalLight position={[-8, 4, -6]} intensity={0.7} color="#c8a35c" />

      <CameraRig />
      <RiverGround />
      <OriginPoints />

      {productsWithStats.map((product, i) => (
        <ProductVisual3D key={product.id} id={product.id} position={[sceneStops[i + 1].x, 1.1, sceneStops[i + 1].z]} />
      ))}
    </Canvas>
  );
}
