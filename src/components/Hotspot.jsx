import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function Hotspot({ id, position, onClick }) {
  const ref = useRef();
  const { camera } = useThree();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!ref.current) return;

    // Always face the camera
    ref.current.lookAt(camera.position);

    // Subtle pulse animation
    const scale = hovered
      ? 1.3 + Math.sin(Date.now() * 0.005) * 0.05
      : 1;

    ref.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh
      ref={ref}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        setHovered(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
        setHovered(false);
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        onClick(id);
      }}
    >
      <circleGeometry args={[8, 32]} />
      <meshBasicMaterial
        color={hovered ? "#00ffff" : "#ffffff"}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}
