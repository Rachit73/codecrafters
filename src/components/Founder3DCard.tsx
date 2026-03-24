import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, ContactShadows, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { usePerformanceMode } from '../utils/performance';

function Loader() {
  const { progress } = useProgress();
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/20 backdrop-blur-sm z-10">
      <div className="w-12 h-12 border-2 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin" />
    </div>
  );
}

function HumanAnimeAvatar({ color, delay }: { color: string, delay: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const skinColor = "#ffcd94";
  const hairColor = "#1e293b";
  
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      // Entrance scale animation with delay
      const targetScale = 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      
      // Idle breathing/looking
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
      groupRef.current.position.y = Math.sin(t * 2) * 0.05;
    }
  });

  return (
    <group ref={groupRef as any} scale={[0, 0, 0]} position={[0, -0.5, 0]}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        {/* Head */}
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.25, 1.6, 0.65]} rotation={[0, 0, 0]}>
          <capsuleGeometry args={[0.05, 0.1, 4, 8]} />
          <meshBasicMaterial color="#020617" />
        </mesh>
        <mesh position={[0.25, 1.6, 0.65]} rotation={[0, 0, 0]}>
          <capsuleGeometry args={[0.05, 0.1, 4, 8]} />
          <meshBasicMaterial color="#020617" />
        </mesh>
        
        {/* Blush */}
        <mesh position={[-0.35, 1.45, 0.62]} rotation={[0, 0, 0]}>
          <circleGeometry args={[0.08, 16]} />
          <meshBasicMaterial color="#ff9999" transparent opacity={0.5} />
        </mesh>
        <mesh position={[0.35, 1.45, 0.62]} rotation={[0, 0, 0]}>
          <circleGeometry args={[0.08, 16]} />
          <meshBasicMaterial color="#ff9999" transparent opacity={0.5} />
        </mesh>

        {/* Hair */}
        <group position={[0, 1.6, 0]}>
          <mesh position={[0, 0.4, -0.1]}>
            <sphereGeometry args={[0.75, 16, 16]} />
            <meshStandardMaterial color={hairColor} roughness={0.8} />
          </mesh>
          <mesh position={[-0.4, 0.5, 0.4]} rotation={[0, 0, 0.5]}>
            <coneGeometry args={[0.25, 0.8, 8]} />
            <meshStandardMaterial color={hairColor} roughness={0.8} />
          </mesh>
          <mesh position={[0.4, 0.5, 0.4]} rotation={[0, 0, -0.5]}>
            <coneGeometry args={[0.25, 0.8, 8]} />
            <meshStandardMaterial color={hairColor} roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.7, 0.5]} rotation={[0.2, 0, 0]}>
            <coneGeometry args={[0.3, 0.9, 8]} />
            <meshStandardMaterial color={hairColor} roughness={0.8} />
          </mesh>
          {/* Highlight */}
          <mesh position={[-0.2, 0.6, 0.6]} rotation={[0.1, 0, 0.3]}>
            <coneGeometry args={[0.15, 0.7, 8]} />
            <meshStandardMaterial color={color} roughness={0.3} emissive={color} emissiveIntensity={0.5} />
          </mesh>
        </group>

        {/* Neck */}
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.4, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>

        {/* Torso (Jacket) */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 1.2, 16]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>

        {/* Inner Shirt */}
        <mesh position={[0, 0.3, 0.1]}>
          <cylinderGeometry args={[0.48, 0.48, 1.21, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </mesh>

        {/* Arms */}
        <mesh position={[-0.65, 0.3, 0]} rotation={[0, 0, -0.3]}>
          <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
        <mesh position={[0.65, 0.3, 0]} rotation={[0, 0, 0.3]}>
          <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
        
        {/* Hands */}
        <mesh position={[-0.8, -0.15, 0]} rotation={[0, 0, -0.3]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>
        <mesh position={[0.8, -0.15, 0]} rotation={[0, 0, 0.3]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

export default React.memo(function Founder3DCard({ color, delay }: { color: string, delay: number }) {
  const { isLowEnd } = usePerformanceMode();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Delay rendering the heavy canvas to avoid jank during section entrance
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 800 + (delay * 1000)); // Wait for section animation to finish
    return () => clearTimeout(timer);
  }, [delay]);

  if (isLowEnd || !shouldRender) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-bg-primary/50 to-bg-secondary relative overflow-hidden transition-opacity duration-500">
        <div 
          className="w-32 h-32 rounded-full blur-[40px] opacity-20 animate-pulse"
          style={{ backgroundColor: color }}
        />
        {!shouldRender && !isLowEnd && (
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-8 h-8 border-2 border-white/10 border-t-white/30 rounded-full animate-spin" />
          </div>
        )}
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <div className="w-8 h-8 rounded-full" style={{ backgroundColor: color }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative z-0 cursor-grab active:cursor-grabbing bg-gradient-to-b from-transparent to-black/20 animate-in fade-in duration-1000">
      <Suspense fallback={<Loader />}>
        <Canvas 
          camera={{ position: [0, 0, 5.5], fov: 50 }} 
          dpr={1} // Lock DPR to 1 for better performance
          performance={{ min: 0.5 }}
          gl={{ 
            antialias: false, // Disable antialiasing for performance
            powerPreference: "high-performance",
            stencil: false,
            depth: true
          }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} />
          <pointLight position={[-5, 0, 5]} color={color} intensity={2} />
          <HumanAnimeAvatar color={color} delay={delay} />
          <ContactShadows position={[0, -2.0, 0]} opacity={0.5} scale={10} blur={2} far={4} resolution={128} frames={1} />
          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
        </Canvas>
      </Suspense>
      
      {/* Decorative glow */}
      <div 
        className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-[30px] md:blur-[50px] opacity-20 pointer-events-none"
        style={{ backgroundColor: color }}
      />
    </div>
  );
});
