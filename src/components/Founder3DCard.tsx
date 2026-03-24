import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

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
  return (
    <div className="w-full h-full relative z-0 cursor-grab active:cursor-grabbing bg-gradient-to-b from-transparent to-black/20">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        <pointLight position={[-5, 0, 5]} color={color} intensity={2} />
        <HumanAnimeAvatar color={color} delay={delay} />
        <ContactShadows position={[0, -2.0, 0]} opacity={0.5} scale={10} blur={2} far={4} resolution={256} frames={1} />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
      </Canvas>
      
      {/* Decorative glow */}
      <div 
        className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-[30px] md:blur-[50px] opacity-20 pointer-events-none"
        style={{ backgroundColor: color }}
      />
    </div>
  );
});
