import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function StaticLookControls({ sensitivity }) {
  const { camera, gl } = useThree();

  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const yaw = useRef(0); //Mouse drag left/right → change yaw → camera.rotation.y
  const pitch = useRef(0); //Mouse drag up/down → change pitch → camera.rotation.x

  useEffect(() => {
    const dom = gl.domElement;

    const onPointerDown = (e) => {
    //   console.log("Pointer Down at:", e.clientX, e.clientY);
      isDragging.current = true;
      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
        //   console.log("Pointer Up");
      isDragging.current = false;
    };

    const onPointerMove = (e) => {
        // console.log("Pointer Move at:", e.clientX, e.clientY);
      if (!isDragging.current) return;

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;

      lastPos.current = { x: e.clientX, y: e.clientY };

      yaw.current -= dx * sensitivity;
      pitch.current -= dy * sensitivity;

      const limit = THREE.MathUtils.degToRad(89);
      pitch.current = THREE.MathUtils.clamp(pitch.current, -limit, limit);
    };

    dom.addEventListener("pointerdown", onPointerDown);
    dom.addEventListener("pointerup", onPointerUp);
    dom.addEventListener("pointermove", onPointerMove);

    return () => {
      dom.removeEventListener("pointerdown", onPointerDown);
      dom.removeEventListener("pointerup", onPointerUp);
      dom.removeEventListener("pointermove", onPointerMove);
    };
  }, [gl, sensitivity]);

  useFrame(() => {
    camera.rotation.order = "YXZ";
    camera.rotation.y = yaw.current;
    camera.rotation.x = pitch.current;
  });

  return null;
}
