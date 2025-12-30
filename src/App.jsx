import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Panorama from "./components/Panorama";
import { useRef, useState } from "react";

// Define your scenes
const scenes = [
  { id: "lobby", image: "/panos/lobb2.jpg" },
  { id: "hall", image: "/panos/3.jpg" },
];

export default function App() {
  const [currentScene, setCurrentScene] = useState(scenes[0]);
  const controlsRef = useRef();
  const materialRef = useRef();

  const resetView = () => {
    if (controlsRef.current) controlsRef.current.reset();
  };

  return (
    <>
      <div style={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}>
        <button onClick={resetView} style={{ marginRight: 5 }}>Reset View</button>
        <button onClick={() =>
          setCurrentScene(currentScene.id === "lobby" ? scenes[1] : scenes[0])
        }>
          Switch Panorama
        </button>
      </div>

      <Canvas camera={{ position: [0, 0, 0.01], near: 0.1, far: 2000 }}>
        <Panorama imageUrl={currentScene.image} materialRef={materialRef} />
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          rotateSpeed={0.5}
          enableDamping={true}
          dampingFactor={0.1}
        />
      </Canvas>
    </>
  );
}
