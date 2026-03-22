import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D, Center, Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedText() {
  const textRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (textRef.current) {
      // Smooth scale entrance animation
      textRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
    }
  });

  return (
    <Center>
      <Text3D
        ref={textRef as any}
        font="https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json"
        size={1.2}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        scale={[0, 0, 0]} // Start at 0 for animation
      >
        CodeCrafters
        <meshStandardMaterial 
          color="#E6F1FF" 
          emissive="#00F5D4" 
          emissiveIntensity={0.5} 
          roughness={0.2} 
          metalness={0.8} 
        />
      </Text3D>
    </Center>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) ring1Ref.current.rotation.x = t * 0.5;
    if (ring2Ref.current) ring2Ref.current.rotation.y = t * 0.3;
    if (ring3Ref.current) ring3Ref.current.rotation.z = t * 0.2;
  });

  return (
    <>
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={1.5} 
        maxPolarAngle={Math.PI / 1.5} 
        minPolarAngle={Math.PI / 3}
      />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#3B82F6" intensity={5} />
      <pointLight position={[10, 0, 0]} color="#00F5D4" intensity={5} />

      <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={150} scale={15} size={2} speed={0.4} opacity={0.5} color="#00F5D4" />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
        <group ref={groupRef as any}>
          <AnimatedText />

          {/* Techy rings */}
          <mesh ref={ring1Ref as any} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[5, 0.01, 16, 100]} />
            <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={2} wireframe />
          </mesh>
          <mesh ref={ring2Ref as any} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
            <torusGeometry args={[6, 0.01, 16, 100]} />
            <meshStandardMaterial color="#00F5D4" emissive="#00F5D4" emissiveIntensity={2} wireframe />
          </mesh>
          <mesh ref={ring3Ref as any} rotation={[-Math.PI / 3, -Math.PI / 4, 0]}>
            <torusGeometry args={[7, 0.02, 16, 100]} />
            <meshStandardMaterial color="#E6F1FF" transparent opacity={0.1} wireframe />
          </mesh>
          
          {/* Central glowing core behind text */}
          <mesh>
            <icosahedronGeometry args={[3, 1]} />
            <meshStandardMaterial color="#020617" wireframe transparent opacity={0.3} />
          </mesh>
        </group>
      </Float>
    </>
  );
}

export default function InteractiveModel() {
  return (
    <div className="w-full h-[300px] md:h-[450px] cursor-grab active:cursor-grabbing relative z-20">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <Scene />
      </Canvas>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-accent-primary/60 tracking-widest uppercase pointer-events-none animate-pulse">
        Drag to rotate
      </div>
    </div>
  );
}
