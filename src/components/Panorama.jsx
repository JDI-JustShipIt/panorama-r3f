import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { BackSide } from "three";
import { useEffect } from "react";
import Hotspot from "./Hotspot";
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
    <>
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
     {/* <mesh
          position={[0, 0, -100]}
          onPointerOver={(e) => { //fires only when the pointer ENTERS the object and hovers.
            document.body.style.cursor = "pointer";
            console.log("Hovering cube", e.point);
          }}
          onPointerOut={() => {
            document.body.style.cursor = "default";
          }}
          onPointerDown={(e) => {
            console.log("Clicked cube at world position:", e.point);
          }}
        >
          <boxGeometry args={[20, 20, 20]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
        <ambientLight intensity={1} /> */}
        {/* <Hotspot
  id="to-hall"
  position={[0, 0, -100]}
  onClick={(id) => console.log("Navigate via", id)}
/> */}

        </>
  );
}
