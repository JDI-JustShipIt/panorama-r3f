import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { BackSide } from "three";
import { useEffect } from "react";

export default function Panorama({ imageUrl, materialRef }) {
  const texture = useTexture(imageUrl);

  // Reset opacity to 0 whenever image changes
  useEffect(() => {
    if (materialRef?.current) materialRef.current.opacity = 0;
  }, [imageUrl, materialRef]);

  // Fade in animation
  useFrame(() => {
    if (materialRef?.current && materialRef.current.opacity < 1) {
      materialRef.current.opacity += 0.02;
    }
  });

  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        side={BackSide}
        transparent
        opacity={1} // will animate from 0 → 1
      />
    </mesh>
  );
}
