'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function Blade({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Main blade */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.15, 1.8, 0.03]} />
        <meshStandardMaterial color="#8b6f47" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Blade tip */}
      <mesh position={[0, 1.8, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.075, 0.3, 4]} />
        <meshStandardMaterial color="#8b6f47" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Handle */}
      <mesh position={[0, -0.4, 0]}>
        <torusGeometry args={[0.3, 0.06, 8, 24, Math.PI * 1.5]} />
        <meshStandardMaterial color="#a0845c" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  )
}

function Scissors({ mouse }: { mouse: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    
    // Floating motion
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.15
    
    // Auto rotation
    groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.1
    groupRef.current.rotation.y = t * 0.15
    
    if (!isMobile) {
      // Follow mouse
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.3,
        0.05
      )
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        mouse.x * 0.2,
        0.05
      )
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} scale={1.2}>
        {/* Pivot screw */}
        <mesh>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#c4a87c" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Blade 1 */}
        <Blade position={[0.08, 0, 0]} rotation={[0, 0, 0.15]} />
        
        {/* Blade 2 */}
        <Blade position={[-0.08, 0, 0.02]} rotation={[0, 0, -0.15]} />
      </group>
    </Float>
  )
}

export default function ScissorsScene() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-3, -3, 2]} intensity={0.4} color="#c4a87c" />
        <pointLight position={[0, 2, 3]} intensity={0.5} color="#fff5e6" />
        <Scissors mouse={mouse} />
      </Canvas>
    </div>
  )
}
