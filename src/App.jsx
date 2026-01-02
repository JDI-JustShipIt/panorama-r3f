import { Canvas } from "@react-three/fiber";
import { useState, useRef } from "react";
import Panorama from "./components/Panorama";
import Hotspot from "./components/Hotspot";
import { scenes } from "./scene";
import StaticLookControls from "./components/StaticLookControl";

export default function App() {
  const [currentSceneId, setCurrentSceneId] = useState("lobby");
  const materialRef = useRef();

  const currentScene = scenes.find((s) => s.id === currentSceneId);

  const handleHotspotClick = (targetSceneId) => {
    setCurrentSceneId(targetSceneId);
  };

  return (
    <Canvas camera={{ position: [0, 0, 0.01], near: 0.1, far: 2000 }}>
      <Panorama imageUrl={currentScene.image} materialRef={materialRef} />
      {currentScene.hotspots.map((h) => (
        <Hotspot
          key={h.id}
          id={h.id}
          position={h.position}
          onClick={() => handleHotspotClick(h.targetSceneId)}
        />
      ))}

      <StaticLookControls sensitivity={0.005} />
    </Canvas>
  );
}
