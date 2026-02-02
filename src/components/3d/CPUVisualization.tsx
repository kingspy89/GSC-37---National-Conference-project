import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Trail, RoundedBox, Stars, Environment, PerspectiveCamera, Grid, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// --- Realistic Components ---

const HeatSpreader = ({ position, color }: { position: [number, number, number]; color: string }) => {
  return (
    <group position={position}>
      {/* Nickel Plated Heat Spreader (IHS) */}
      <RoundedBox args={[1.4, 0.1, 1.4]} radius={0.05} smoothness={4} position={[0, 0.05, 0]}>
        <meshStandardMaterial
          color="#a1a1aa" // Silver/Nickel
          metalness={1}
          roughness={0.3}
          envMapIntensity={2}
        />
      </RoundedBox>

      {/* Top Branding Area */}
      <mesh position={[0, 0.101, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#000" opacity={0.1} transparent />
      </mesh>
    </group>
  );
};

const CPUSubstrate = () => {
  return (
    <group>
      {/* PCB Board - Green/Dark */}
      <RoundedBox args={[2.0, 0.05, 2.0]} radius={0.02} smoothness={2} position={[0, -0.025, 0]}>
        <meshStandardMaterial
          color="#064e3b" // Deep PCB Green
          roughness={0.5}
          metalness={0.1}
        />
      </RoundedBox>

      {/* Gold Contacts / Pads */}
      <mesh position={[0, -0.051, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.8, 1.8]} />
        <meshStandardMaterial
          color="#fbbf24"
          metalness={1}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};

const CapacitorObj = ({ position }: { position: [number, number, number] }) => (
  <mesh position={position}>
    <boxGeometry args={[0.04, 0.02, 0.08]} />
    <meshStandardMaterial color="#d4d4d8" metalness={0.8} roughness={0.2} />
  </mesh>
);

const CapacitorArray = () => {
  // Generate realistic SMD capacitor layout around the CPU center
  const capacitors = useMemo(() => {
    const caps = [];
    const gap = 0.8; // Space for IHS
    for (let x = -0.9; x <= 0.9; x += 0.1) {
      for (let z = -0.9; z <= 0.9; z += 0.1) {
        // Only place outside the center IHS area
        if (Math.abs(x) > gap / 2 || Math.abs(z) > gap / 2) {
          if (Math.random() > 0.7) {
            caps.push(<CapacitorObj key={`${x}-${z}`} position={[x, 0.01, z]} />);
          }
        }
      }
    }
    return caps;
  }, []);
  return <group>{capacitors}</group>;
}

const ThreadSpark = ({ startPos, coreIndex }: { startPos: [number, number, number]; coreIndex: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(Math.random() * 100);

  useFrame((state, delta) => {
    if (meshRef.current) {
      time.current += delta;
      const t = time.current;

      const speed = 4;
      // Quantum-like movement: jumpy erratic orbits
      const r = 0.8 + Math.sin(t * 10) * 0.05;
      const angle = t * speed + coreIndex;

      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const y = Math.sin(t * 5) * 0.1 + 0.2; // Hover around IHS

      meshRef.current.position.set(x, y, z);
    }
  });

  return (
    <Trail width={1.5} length={4} color={new THREE.Color("#ef4444")} attenuation={(t) => t * t}>
      <mesh ref={meshRef} position={startPos}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#ef4444" toneMapped={false} />
      </mesh>
    </Trail>
  );
};

// --- Futuristic AI Chip Components ---

const ThreadParticle = ({ startPos, coreIndex, isSerial, totalThreads }: { startPos: [number, number, number]; coreIndex: number; isSerial: boolean; totalThreads: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Animation Parameters
  const cycleDuration = 3;
  const totalSequenceDuration = isSerial ? totalThreads * cycleDuration : cycleDuration;

  // Random HBM Source (approximate corners)
  const hbmSource = useRef<[number, number, number]>([
    (Math.random() > 0.5 ? 0.8 : -0.8), // X
    0.2,                                // Y (Top of HBM)
    (Math.random() > 0.5 ? 0.5 : -0.5)  // Z (Adjusted for HBM position)
  ]);

  useFrame((state) => {
    if (meshRef.current) {
      const activeTime = state.clock.elapsedTime % totalSequenceDuration;
      let isVisible = true;
      let t = 0; // Local normalized time 0..1

      if (isSerial) {
        const myStartTime = coreIndex * cycleDuration;
        if (activeTime >= myStartTime && activeTime < (myStartTime + cycleDuration)) {
          isVisible = true;
          t = (activeTime - myStartTime) / cycleDuration;
        } else {
          isVisible = false;
        }
      } else {
        t = ((state.clock.elapsedTime + coreIndex * 0.5) % cycleDuration) / cycleDuration;
      }

      meshRef.current.visible = isVisible;
      if (!isVisible) return;

      // --- PATH LOGIC: HBM -> Circuit -> Core -> Processing ---
      const start = hbmSource.current;
      const end = startPos; // Core position

      // Easing function for smooth tech feel
      const ease = (x: number) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

      let x = 0, y = 0, z = 0;

      if (t < 0.6) {
        // TRAVEL PHASE (0% to 60%)
        const travelT = ease(t / 0.6);

        // Manhattan Path: Move X, then Z
        if (travelT < 0.5) {
          // Move X align
          const segmentT = travelT * 2;
          x = THREE.MathUtils.lerp(start[0], end[0], segmentT);
          z = start[2];
          y = 0.08; // Circuit trace height
        } else {
          // Move Z align
          const segmentT = (travelT - 0.5) * 2;
          x = end[0];
          z = THREE.MathUtils.lerp(start[2], end[2], segmentT);
          y = 0.08;
        }
      } else {
        // PROCESS PHASE (60% to 100%)
        // Hover/Dive into Core
        const processT = (t - 0.6) / 0.4;
        x = end[0];
        z = end[2];

        // Bobbing / Sinking effect
        y = 0.08 + Math.sin(processT * Math.PI * 4) * 0.05;

        // "Discharge" scale effect? Handled by trail mostly.
      }

      meshRef.current.position.set(x, y, z);

      // Dynamic Scaling
      const scale = t > 0.9 ? (1 - t) * 10 * 0.1 : 0.1; // Shrink at end
      meshRef.current.scale.setScalar(scale / 0.1); // Normalize scale
    }
  });

  return (
    <Trail
      width={3}
      length={6}
      color={new THREE.Color("#0ea5e9")} // Electric Blue
      attenuation={(t) => t * t}
    >
      <mesh ref={meshRef} position={startPos}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#38bdf8" toneMapped={false} />
        <pointLight intensity={1.5} distance={0.4} decay={2} color="#0ea5e9" />
      </mesh>
    </Trail>
  );
};

const FuturisticCPUModel = ({ threadCount, isRunning, viewMode }: { threadCount: number; isRunning: boolean; viewMode: "single" | "multi" }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Core Layout Logic - Up to 8 Cores (Gold Blocks)
  const cores = useMemo(() => {
    if (viewMode === "single") {
      // HUGE Monolithic Gold Die
      return [{ pos: [0, 0.05, 0] as [number, number, number], scale: [1.2, 1.2] }];
    } else {
      // 8-Core Gold Grid
      const coreList = [];
      const spacing = 0.55;
      for (let i = 0; i < 8; i++) {
        const r = Math.floor(i / 4); // 0 or 1
        const c = i % 4; // 0..3
        const x = (c - 1.5) * spacing;
        const z = (r - 0.5) * spacing * 1.5;
        coreList.push({ pos: [x, 0.05, z] as [number, number, number], scale: [0.35, 0.35] });
      }
      return coreList;
    }
  }, [viewMode]);

  return (
    <group ref={groupRef}>
      {/* --- EXPOSED DIE PACKAGE (Thick Black Frame) --- */}
      {/* We build a frame from 4 bars to create a "cavity" in the center */}
      <group position={[0, 0, 0]}>
        {/* Top Bar */}
        <RoundedBox args={[3.2, 0.2, 0.6]} radius={0.05} position={[0, 0.1, -1.3]}>
          <meshStandardMaterial color="#111" roughness={0.9} metalness={0.1} />
        </RoundedBox>
        {/* Bottom Bar */}
        <RoundedBox args={[3.2, 0.2, 0.6]} radius={0.05} position={[0, 0.1, 1.3]}>
          <meshStandardMaterial color="#111" roughness={0.9} metalness={0.1} />
        </RoundedBox>
        {/* Left Bar */}
        <RoundedBox args={[0.6, 0.2, 2.0]} radius={0.05} position={[-1.3, 0.1, 0]}>
          <meshStandardMaterial color="#111" roughness={0.9} metalness={0.1} />
        </RoundedBox>
        {/* Right Bar */}
        <RoundedBox args={[0.6, 0.2, 2.0]} radius={0.05} position={[1.3, 0.1, 0]}>
          <meshStandardMaterial color="#111" roughness={0.9} metalness={0.1} />
        </RoundedBox>
        {/* Base Floor (The Package Substrate) */}
        <RoundedBox args={[3.2, 0.1, 3.2]} radius={0.05} position={[0, -0.05, 0]}>
          <meshStandardMaterial color="#050505" roughness={0.9} />
        </RoundedBox>
      </group>

      {/* --- GOLDEN INTERNALS (Inside the Cavity) --- */}
      <group position={[0, 0, 0]}>
        {/* Circuit Floor Plane - Dense Gold Traces */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.0, 2.0]} />
          <meshStandardMaterial
            color="#000"
            roughness={0.2}
          />
        </mesh>
        {/* Decorative Gold Pipes/Traces on Floor */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={i} position={[0, 0.02, (i - 6) * 0.15]} rotation={[0, 0, 0]}>
            <boxGeometry args={[2.0, 0.02, 0.04]} />
            <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.1} />
          </mesh>
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={`v-${i}`} position={[(i - 6) * 0.15, 0.02, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[2.0, 0.02, 0.04]} />
            <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.1} />
          </mesh>
        ))}

        {/* CORES: PURE GOLD BLOCKS */}
        {cores.map((core, i) => (
          <group key={i} position={core.pos}>
            {/* The Die Itself */}
            <RoundedBox args={[core.scale[0], 0.08, core.scale[1]]} radius={0.01} smoothness={4}>
              <meshStandardMaterial
                color="#fbbf24"  // GOLD
                metalness={1.0}
                roughness={0.1}
                envMapIntensity={1.5}
              />
            </RoundedBox>
            {/* Top Detail (Etching) */}
            <mesh position={[0, 0.041, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[core.scale[0] * 0.8, core.scale[1] * 0.8]} />
              <meshBasicMaterial color="#b45309" wireframe transparent opacity={0.3} />
            </mesh>

            {/* Active Pulse Glow */}
            {isRunning && (viewMode === "single" || i < threadCount) && (
              <pointLight position={[0, 0.2, 0]} intensity={0.8} color="#f59e0b" distance={1.0} decay={2} />
            )}
          </group>
        ))}
      </group>

      {/* --- SILVER PINS (Edge Detail) --- */}
      <group position={[0, -0.1, 0]}>
        {/* Front Row */}
        {Array.from({ length: 30 }).map((_, i) => (
          <mesh key={`f-${i}`} position={[(i - 15) * 0.08, 0, 1.55]}>
            <boxGeometry args={[0.04, 0.15, 0.04]} />
            <meshStandardMaterial color="#e4e4e7" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
        {/* Back Row */}
        {Array.from({ length: 30 }).map((_, i) => (
          <mesh key={`b-${i}`} position={[(i - 15) * 0.08, 0, -1.55]}>
            <boxGeometry args={[0.04, 0.15, 0.04]} />
            <meshStandardMaterial color="#e4e4e7" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>


      {/* Active Data Streams (PRESERVED ANIMATION) */}
      {isRunning && Array.from({ length: threadCount }).map((_, i) => {
        const isSerial = viewMode === "single";
        const coreConfig = isSerial ? cores[0] : cores[i % cores.length];
        const startPos = [coreConfig.pos[0], 0.5, coreConfig.pos[2]] as [number, number, number];

        return (
          <ThreadParticle
            key={i}
            startPos={startPos}
            coreIndex={i}
            isSerial={isSerial}
            totalThreads={threadCount}
          />
        );
      })}
    </group>
  );
};


// --- Main ---

interface CPUVisualizationProps {
  threadCount: number;
  isRunning: boolean;
  viewMode: "single" | "multi";
}

export const CPUVisualization = ({ threadCount, isRunning, viewMode }: CPUVisualizationProps) => {
  return (
    <div className="w-full h-full min-h-[500px] rounded-lg overflow-hidden bg-gradient-to-br from-zinc-950 to-black border border-zinc-800 shadow-2xl relative">

      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[3, 5, 5]} fov={30} />

        {/* --- High Tech Environment --- */}
        <color attach="background" args={['#050505']} />

        {/* Studio Lighting Setup */}
        <ambientLight intensity={0.3} />
        <spotLight position={[5, 10, 5]} intensity={3} color="#fff" penumbra={1} castShadow />
        <pointLight position={[-5, 5, -5]} intensity={2} color="#3b82f6" /> {/* Cyber Blue Rim */}
        <pointLight position={[5, 2, 5]} intensity={1} color="#ef4444" /> {/* Cyber Red Fill */}

        {/* STATIC FLOAT - Just centering, no movement */}
        <group position={[0, 0, 0]}>
          <FuturisticCPUModel threadCount={threadCount} isRunning={isRunning} viewMode={viewMode} />
        </group>

        {/* Reflections & Shadows */}
        <ContactShadows opacity={0.8} scale={10} blur={2} far={4} color="#000" />
        <Environment preset="city" />

        {/* Grid Floor - Technical */}
        <Grid
          position={[0, -0.5, 0]}
          args={[20, 20]}
          cellColor="#222"
          sectionColor="#444"
          fadeDistance={15}
        />

        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={12}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2} // Strict floor limit
          autoRotate={false} // USER REQUEST: No auto rotate
          target={[0, 0, 0]} // Strict focus on CPU
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};
