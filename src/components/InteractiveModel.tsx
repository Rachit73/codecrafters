import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float, Environment, PerspectiveCamera, Text, useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';
import { LOGO_URL } from '../constants';
import { Loader2 } from 'lucide-react';

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-10 h-10 text-accent-primary animate-spin" />
        <span className="text-accent-primary font-mono text-xs uppercase tracking-widest">Loading 3D Model...</span>
      </div>
    </Html>
  );
}

function ScreenContent() {
  const logoTexture = useTexture(LOGO_URL);
  const logoRef = useRef<THREE.Group>(null);
  const [logoPulse, setLogoPulse] = useState(1);
  const timeRef = useRef(0);
  
  const quotes = [
    "WE BUILD THE DIGITAL FUTURE",
    "CODE IS POETRY IN MOTION",
    "DESIGNING TOMORROW, TODAY",
    "TURNING IDEAS INTO REALITY",
    "CRAFTING PIXELS WITH PASSION"
  ];
  
  const [currentQuote, setCurrentQuote] = useState(0);
  const [quoteOpacity, setQuoteOpacity] = useState(0);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;
    
    // Logo animation
    if (logoRef.current) {
      logoRef.current.position.y = Math.sin(t * 2) * 0.05 + 0.3;
      setLogoPulse(Math.sin(t * 3) * 0.05 + 1);
    }
    
    // Quote animation logic (Fade in/out cycle)
    const cycleTime = 4; // 4 seconds per quote
    const progress = (t % cycleTime) / cycleTime;
    
    if (progress < 0.1) setQuoteOpacity(progress * 10); // Fade in
    else if (progress > 0.9) setQuoteOpacity((1 - progress) * 10); // Fade out
    else setQuoteOpacity(1); // Stay visible
    
    // Change quote index
    const newIdx = Math.floor(t / cycleTime) % quotes.length;
    if (newIdx !== currentQuote) setCurrentQuote(newIdx);
  });

  return (
    <group position={[0, 1.7, 0.11]}>
      {/* Screen Background - Solid Dark Blue/Black */}
      <mesh>
        <planeGeometry args={[5.2, 3.2]} />
        <meshBasicMaterial color="#020617" />
      </mesh>

      {/* Animated Grid Effect */}
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[5.2, 3.2]} />
        <meshBasicMaterial color="#00F5D4" transparent opacity={0.05} wireframe />
      </mesh>

      {/* Logo Overlay */}
      <group ref={logoRef}>
        <mesh scale={[logoPulse, logoPulse, 1]}>
          <planeGeometry args={[0.8, 0.8]} />
          <meshBasicMaterial map={logoTexture} transparent opacity={0.9} />
        </mesh>

        <Text
          position={[0, -0.8, 0.01]}
          fontSize={0.5}
          color="white"
          fontWeight="bold"
        >
          Code Crafter
        </Text>
        
        <Text
          position={[0, -1.2, 0.01]}
          fontSize={0.15}
          color="#00F5D4"
          letterSpacing={0.2}
        >
          TECHNOLOGIES
        </Text>
      </group>

      {/* Animated Quote Ticker */}
      <group position={[0, -1.4, 0.01]}>
        <Text
          fontSize={0.12}
          color="#00F5D4"
          fillOpacity={quoteOpacity}
        >
          {quotes[currentQuote]}
        </Text>
      </group>
      
      {/* Scanning Line */}
      <ScanningLine />
      
      {/* Screen Vignette Overlay */}
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[5.2, 3.2]} />
        <meshBasicMaterial color="black" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function ScanningLine() {
  const ref = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta;
    if (ref.current) {
      ref.current.position.y = ((timeRef.current % 2) - 1) * 1.6;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, 0.02]}>
      <planeGeometry args={[5.2, 0.05]} />
      <meshBasicMaterial color="#00F5D4" transparent opacity={0.5} />
    </mesh>
  );
}

function Laptop() {
  return (
    <group position={[0, -1.2, 0]}>
      {/* Base */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[5.4, 0.2, 3.8]} />
        <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Keyboard Area */}
      <mesh position={[0, 0.21, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.8, 1.8]} />
        <meshStandardMaterial color="#1a202c" roughness={0.8} />
      </mesh>

      {/* Lid */}
      <group position={[0, 0.2, -1.9]} rotation={[-0.2, 0, 0]}>
        {/* Lid Casing */}
        <mesh position={[0, 1.7, 0.05]}>
          <boxGeometry args={[5.4, 3.4, 0.1]} />
          <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Screen Bezel */}
        <mesh position={[0, 1.7, 0.101]}>
          <planeGeometry args={[5.2, 3.2]} />
          <meshStandardMaterial color="#000000" />
        </mesh>

        <Suspense fallback={
          <mesh position={[0, 1.7, 0.105]}>
            <planeGeometry args={[5.2, 3.2]} />
            <meshBasicMaterial color="#020617" />
          </mesh>
        }>
          <ScreenContent />
        </Suspense>
      </group>
    </group>
  );
}

export default function InteractiveModel() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div 
      className="w-full h-[400px] md:h-[600px] cursor-grab active:cursor-grabbing relative z-20 overflow-hidden"
      style={{ touchAction: 'pan-y' }}
    >
      <Canvas 
        dpr={[1, 2]} 
        shadows={{ type: THREE.PCFShadowMap }} // Fixed deprecation warning
        gl={{ antialias: true, alpha: true }}
        style={{ touchAction: 'pan-y', pointerEvents: 'auto', cursor: 'grab' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} color="#00F5D4" intensity={2} />
        
        <Environment preset="city" />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          makeDefault
        />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <Suspense fallback={<Loader />}>
            <group scale={isMobile ? 0.65 : 1}>
              <Laptop />
            </group>
          </Suspense>
        </Float>

        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
      </Canvas>
      
    </div>
  );
}
