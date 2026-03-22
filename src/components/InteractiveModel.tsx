import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, ContactShadows, Float, Environment } from '@react-three/drei';

function Laptop() {
  return (
    <group position={[0, -1.2, 0]}>
      {/* Base */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[5.4, 0.2, 3.8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Keyboard Area */}
      <mesh position={[0, 0.21, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.8, 1.8]} />
        <meshStandardMaterial color="#020617" roughness={0.8} />
      </mesh>
      
      {/* Trackpad */}
      <mesh position={[0, 0.21, 1.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 0.8]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} />
      </mesh>

      {/* Lid */}
      <group position={[0, 0.2, -1.9]} rotation={[-0.2, 0, 0]}>
        {/* Lid Casing */}
        <mesh position={[0, 1.7, 0.05]}>
          <boxGeometry args={[5.4, 3.4, 0.1]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Screen Bezel */}
        <mesh position={[0, 1.7, 0.101]}>
          <planeGeometry args={[5.2, 3.2]} />
          <meshStandardMaterial color="#000000" roughness={0.1} />
        </mesh>

        {/* Screen Content (HTML) */}
        <Html
          transform
          scale={0.01}
          position={[0, 1.7, 0.11]}
          rotation={[0, 0, 0]}
          wrapperClass="pointer-events-none"
        >
          <div className="w-[520px] h-[320px] bg-black rounded-md overflow-hidden relative flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(0,245,212,0.2)]">
            {/* Background Video */}
            <video
              src="https://cdn.dribbble.com/userupload/11922111/file/original-132b5cc39e9320a1269284e086c39652.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            
            {/* Overlay Content (Logo & Animation) */}
            <div className="relative z-10 flex flex-col items-center justify-center bg-black/20 w-full h-full backdrop-blur-[1px]">
              <div className="animate-[pulse_3s_ease-in-out_infinite] flex flex-col items-center">
                <div className="animate-[bounce_2s_infinite] mb-4">
                  <span className="text-[#00F5D4] text-7xl font-bold" style={{ textShadow: '0 0 30px rgba(0,245,212,0.8)' }}>
                    {`{ }`}
                  </span>
                </div>
                <h1 className="text-white text-4xl font-display font-bold tracking-widest uppercase mb-2" style={{ textShadow: '0 0 20px rgba(0,245,212,0.8)' }}>
                  CodeCrafters
                </h1>
              </div>
              
              <div className="mt-6 px-6 py-2 border border-[#00F5D4] text-[#00F5D4] rounded-full text-lg font-semibold animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_15px_rgba(0,245,212,0.5)] bg-black/50">
                System Active
              </div>
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}

export default function InteractiveModel() {
  return (
    <div className="w-full h-[350px] md:h-[500px] cursor-grab active:cursor-grabbing relative z-20">
      <Canvas camera={{ position: [0, 1.5, 8], fov: 45 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, -10]} color="#3B82F6" intensity={2} />
        
        {/* Environment map is CRUCIAL for metal materials to be visible */}
        <Environment preset="city" />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />

        <Float rotationIntensity={0.2} floatIntensity={0.5} speed={2}>
          <Laptop />
        </Float>

        <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={15} blur={2.5} far={4.5} resolution={256} frames={1} />
      </Canvas>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-accent-primary/60 tracking-widest uppercase pointer-events-none animate-pulse bg-bg-secondary/50 px-4 py-2 rounded-full glass">
        Drag to rotate
      </div>
    </div>
  );
}
