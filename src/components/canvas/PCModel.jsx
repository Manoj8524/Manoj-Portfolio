import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("./macbook/scene.gltf"); // Load MacBook model
  const ref = useRef();

  // Rotate the model
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.001; // Adjust rotation speed
    }
  });

  return (
    <primitive
      ref={ref}
      object={earth.scene}
      scale={[15, 15, 15]} // Increase size of the model
      position={[0, -2, 0]} // Center the model
      rotation={[0, Math.PI / 2, 0]} // Set initial rotation for front view
    />
  );
};

const PCModel = () => {
  return (
    <Canvas
      shadows={false} // Disable shadows for better performance
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 3, 8], // Adjusted camera for a better front view
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OrbitControls
          autoRotate={false} // Disable auto-rotation for manual control
          enableZoom={true} // Allow zooming
          maxPolarAngle={Math.PI} // Allow full vertical rotation
          minPolarAngle={0} // No restriction for vertical rotation
          enablePan={true} // Enable panning for complete freedom
        />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default PCModel;
