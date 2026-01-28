import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

const CPUCore = ({ position, color, isActive }: { position: [number, number, number]; color: string; isActive: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.8, 0.2, 0.8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={isActive ? 0.5 : 0.1}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

const ThreadParticle = ({ startPos, coreIndex }: { startPos: [number, number, number]; coreIndex: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(Math.random() * 100);

  useFrame((state, delta) => {
    if (meshRef.current) {
      time.current += delta;
      const t = time.current;
      
      // Orbit around the core
      const radius = 0.5 + Math.sin(t * 2) * 0.2;
      meshRef.current.position.x = startPos[0] + Math.cos(t * 3 + coreIndex) * radius;
      meshRef.current.position.y = startPos[1] + Math.sin(t * 2) * 0.3;
      meshRef.current.position.z = startPos[2] + Math.sin(t * 3 + coreIndex) * radius;
    }
  });

  return (
    <mesh ref={meshRef} position={startPos}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial
        color="#00ffff"
        emissive="#00ffff"
        emissiveIntensity={1}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

const CPUModel = ({ threadCount, isRunning, viewMode }: { threadCount: number; isRunning: boolean; viewMode: "single" | "multi" }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  const corePositions: [number, number, number][] = viewMode === "single"
    ? [[0, 0, 0]]
    : [
        [-0.6, 0, -0.6],
        [0.6, 0, -0.6],
        [-0.6, 0, 0.6],
        [0.6, 0, 0.6],
      ];

  const coreColors = ["#00ffff", "#a855f7", "#3b82f6", "#ec4899"];

  return (
    <group ref={groupRef}>
      {/* CPU Base */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[2.5, 0.3, 2.5]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Heat Spreader */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial
          color="#333"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Cores */}
      {corePositions.map((pos, index) => (
        <CPUCore
          key={index}
          position={pos}
          color={coreColors[index % coreColors.length]}
          isActive={isRunning && index < threadCount}
        />
      ))}

      {/* Thread Particles */}
      {isRunning &&
        Array.from({ length: Math.min(threadCount, corePositions.length * 2) }).map((_, index) => {
          const coreIndex = index % corePositions.length;
          return (
            <ThreadParticle
              key={index}
              startPos={corePositions[coreIndex]}
              coreIndex={coreIndex}
            />
          );
        })}
    </group>
  );
};

interface CPUVisualizationProps {
  threadCount: number;
  isRunning: boolean;
  viewMode: "single" | "multi";
}

export const CPUVisualization = ({ threadCount, isRunning, viewMode }: CPUVisualizationProps) => {
  return (
    <div className="w-full h-full min-h-[400px] rounded-lg overflow-hidden">
      <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
        <spotLight position={[0, 5, 0]} intensity={0.5} color="#00ffff" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
          <CPUModel threadCount={threadCount} isRunning={isRunning} viewMode={viewMode} />
        </Float>
        
        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={8}
          autoRotate={false}
        />
        
        {/* Grid floor */}
        <gridHelper args={[10, 20, "#333", "#222"]} position={[0, -0.5, 0]} />
      </Canvas>
    </div>
  );
};
