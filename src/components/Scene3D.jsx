import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function Core() {
  const ref = React.useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.18;
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, state.pointer.y * 0.2, 3, delta);
    ref.current.rotation.z = THREE.MathUtils.damp(ref.current.rotation.z, -state.pointer.x * 0.18, 3, delta);
  });
  return <Float speed={1.15} rotationIntensity={0.3} floatIntensity={0.7}>
    <mesh ref={ref} scale={1.52}>
      <icosahedronGeometry args={[1, 5]} />
      <MeshDistortMaterial color="#7b86ff" roughness={0.22} metalness={0.72} distort={0.28} speed={1.5} />
    </mesh>
    <mesh scale={1.9} rotation={[0.9, 0.25, 0.5]}>
      <torusGeometry args={[1.5, 0.012, 12, 180]} />
      <meshStandardMaterial color="#65e6d4" metalness={0.8} roughness={0.28} />
    </mesh>
    <mesh scale={2.2} rotation={[0.3, 0.8, 1.05]}>
      <torusGeometry args={[1.5, 0.008, 8, 160]} />
      <meshStandardMaterial color="#9e75ff" metalness={0.7} roughness={0.3} />
    </mesh>
  </Float>;
}
export default function Scene3D() {
  return <motion.div className="scene-wrap" initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
    <div className="scene-glow" />
    <Suspense fallback={<div className="scene-fallback"><span>PG</span></div>}>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6.2], fov: 42 }} gl={{ alpha: true, antialias: true }} aria-label="Animated abstract 3D object">
        <ambientLight intensity={1.1} />
        <pointLight position={[4, 3, 4]} intensity={32} color="#8e8cff" />
        <pointLight position={[-4, -2, 2]} intensity={16} color="#56e7d3" />
        <Core />
        <Stars radius={22} depth={12} count={280} factor={1.2} fade speed={0.3} />
        <Environment preset="city" />
      </Canvas>
    </Suspense>
    <div className="scene-tag"><span className="live-dot" /> CREATIVE ENGINEERING / 001</div>
  </motion.div>;
}