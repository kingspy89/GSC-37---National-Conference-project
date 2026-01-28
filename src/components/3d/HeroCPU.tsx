import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const HeroCore = ({ position, color, delay }: { position: [number, number, number]; color: string; delay: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5 + delay;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.5, 0.15, 0.5]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

const FloatingParticle = ({ index }: { index: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const speed = 0.5 + Math.random() * 0.5;
  const offset = Math.random() * Math.PI * 2;
  const radius = 1.5 + Math.random() * 2;

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed + offset;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.5;
      meshRef.current.position.z = Math.sin(t) * radius;
    }
  });

  const colors = ["#00ffff", "#a855f7", "#3b82f6", "#ec4899"];

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.03 + Math.random() * 0.02, 8, 8]} />
      <meshStandardMaterial
        color={colors[index % colors.length]}
        emissive={colors[index % colors.length]}
        emissiveIntensity={1}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

const HeroCPUModel = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const corePositions: [number, number, number][] = [
    [-0.4, 0, -0.4],
    [0.4, 0, -0.4],
    [-0.4, 0, 0.4],
    [0.4, 0, 0.4],
  ];

  const coreColors = ["#00ffff", "#a855f7", "#3b82f6", "#ec4899"];

  return (
    <group ref={groupRef}>
      {/* CPU Base */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[1.5, 0.15, 1.5]} />
        <meshStandardMaterial
          color="#0a0a0f"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Cores */}
      {corePositions.map((pos, index) => (
        <HeroCore
          key={index}
          position={pos}
          color={coreColors[index]}
          delay={index * 0.5}
        />
      ))}

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingParticle key={i} index={i} />
      ))}
    </group>
  );
};

export const HeroCPU = () => {
  return (
    <div className="w-full h-full absolute inset-0" style={{ opacity: 0.6 }}>
      <Canvas camera={{ position: [0, 2, 4], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#00ffff" />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#a855f7" />
        
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <HeroCPUModel />
        </Float>
      </Canvas>
    </div>
  );
};
