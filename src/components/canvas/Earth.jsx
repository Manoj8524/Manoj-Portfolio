import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("./earth-cartoon/source/earth.glb");
  const ref = useRef();

  // Rotate the Earth continuously
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.001; // Adjust rotation speed as needed
    }
  });

  return (
    <primitive
      ref={ref}
      object={earth.scene}
      scale={1.5} // Adjust the size of the Earth
      position-y={0}
    />
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="always" // Ensure continuous rendering for rotation
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OrbitControls
          enableZoom={true} // Allow zooming in/out
          maxPolarAngle={Math.PI} // Allow full vertical rotation
          minPolarAngle={0} // No restriction on rotation
        />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
