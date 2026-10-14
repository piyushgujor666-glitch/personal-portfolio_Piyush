import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'

function Core({ reduced }) {
  const group = useRef()
  useFrame((state, delta) => {
    if (!group.current) return
    const targetY = reduced ? 0 : state.pointer.x * 0.9
    const targetX = reduced ? 0 : -state.pointer.y * 0.6
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(delta * 3, 1)
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(delta * 3, 1)
    if (!reduced) group.current.rotation.z += delta * 0.08
  })

  const body = (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.15, 64, 64]} />
        <MeshDistortMaterial color="#5b6cff" metalness={0.85} roughness={0.18} distort={reduced ? 0 : 0.28} speed={reduced ? 0 : 1.6} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.75, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.28} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.25, 0.012, 16, 160]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.8} />
      </mesh>
    </group>
  )
  return reduced ? body : <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.9}>{body}</Float>
}

function Stars({ count = 280, reduced }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])
  useFrame((_, delta) => {
    if (ref.current && !reduced) ref.current.rotation.y += delta * 0.02
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#a5b4fc" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function Scene3D({ reduced = false, lite = false }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.6], fov: 45 }}
      dpr={[1, lite ? 1.25 : 1.75]}
      gl={{ antialias: !lite, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reduced ? 'demand' : 'always'}
      aria-label="Interactive 3D abstract sphere"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 4]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-5, -2, 3]} intensity={30} color="#8b5cf6" />
      <pointLight position={[5, -3, -2]} intensity={20} color="#22d3ee" />
      <Core reduced={reduced} />
      {!lite && <Stars reduced={reduced} />}
    </Canvas>
  )
}
