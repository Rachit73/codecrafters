import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float, Environment, PerspectiveCamera, Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { LOGO_URL } from '../constants';
import { usePerformanceMode } from '../utils/performance';

// Preload the logo texture to avoid async delay
useTexture.preload(LOGO_URL);

function ScreenContent({ isLowEnd }: { isLowEnd: boolean }) {
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
      if (!isLowEnd) setLogoPulse(Math.sin(t * 3) * 0.05 + 1);
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
        <meshBasicMaterial color="#000000" />
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
          color="#00F5D4"
          fontWeight="bold"
        >
          Code Crafter
        </Text>
        
        {!isLowEnd && (
          <Text
            position={[0, -1.2, 0.01]}
            fontSize={0.15}
            color="#00F5D4"
            letterSpacing={0.2}
          >
            TECHNOLOGIES
          </Text>
        )}
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
      {!isLowEnd && <ScanningLine />}
      
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

function Keyboard({ isLowEnd }: { isLowEnd: boolean }) {
  const timeRef = useRef(0);
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  
  const rows = 5;
  const cols = 14;
  const keySize = 0.28;
  const gap = 0.05;
  const startX = -((cols - 1) * (keySize + gap)) / 2;
  const startZ = -((rows - 1) * (keySize + gap)) / 2;

  const brandingText = "CODE CRAFTER";
  const brandingRow = 2; 
  const brandingStartCol = 1; 

  const tempObject = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  const frameRef = useRef(0);
  useFrame((state, delta) => {
    timeRef.current += delta;
    frameRef.current++;
    if (!instancedMeshRef.current || isLowEnd || frameRef.current % 2 !== 0) return;

    let idx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const isSpace = r === 4 && c >= 4 && c <= 9;
        if (r === 4 && (c > 4 && c <= 9)) continue;

        const x = startX + c * (keySize + gap);
        const z = startZ + r * (keySize + gap);
        
        const isBrandingKey = r === brandingRow && c >= brandingStartCol && c < brandingStartCol + brandingText.length;
        const brandingCharIdx = isBrandingKey ? c - brandingStartCol : -1;
        
        const wave = Math.sin(timeRef.current * 6 - brandingCharIdx * 0.8) * 0.5 + 0.5;
        
        tempObject.position.set(isSpace ? startX + 6.5 * (keySize + gap) : x, 0.05, z);
        tempObject.scale.set(isBrandingKey ? 1.1 : 1, isBrandingKey ? 1.4 : 1, isBrandingKey ? 1.1 : 1);
        tempObject.updateMatrix();
        instancedMeshRef.current.setMatrixAt(idx, tempObject.matrix);

        if (isBrandingKey) {
          const intensity = 0.5 + wave * 0.5;
          tempColor.setRGB(0, 0.96 * intensity, 0.83 * intensity);
          instancedMeshRef.current.setColorAt(idx, tempColor);
        } else {
          tempColor.set("#1e293b");
          instancedMeshRef.current.setColorAt(idx, tempColor);
        }
        idx++;
      }
    }
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    if (instancedMeshRef.current.instanceColor) instancedMeshRef.current.instanceColor.needsUpdate = true;
  });

  // For low-end, just render a static keyboard base
  if (isLowEnd) {
    return (
      <group position={[0, 0.22, -0.2]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4.8, 1.8]} />
          <meshStandardMaterial color="#475569" roughness={0.8} />
        </mesh>
      </group>
    );
  }

  return (
    <group position={[0, 0.22, -0.2]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.8, 1.8]} />
        <meshStandardMaterial color="#475569" roughness={0.8} metalness={0.2} />
      </mesh>

      <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, rows * cols]}>
        <boxGeometry args={[keySize, 0.08, keySize]} />
        <meshStandardMaterial roughness={0.1} metalness={0.8} />
      </instancedMesh>
      
      {/* Branding Text Overlay (Simplified) */}
      <group>
        {brandingText.split('').map((char, i) => (
          <Text
            key={i}
            position={[startX + (brandingStartCol + i) * (keySize + gap), 0.15, startZ + brandingRow * (keySize + gap)]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.2}
            color="#00F5D4"
            fontWeight="bold"
          >
            {char}
          </Text>
        ))}
      </group>
    </group>
  );
}

function Laptop({ isLowEnd }: { isLowEnd: boolean }) {
  return (
    <group position={[0, -1.2, 0]}>
      {/* Base */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[5.4, 0.2, 3.8]} />
          <meshStandardMaterial 
            color="#cbd5e1" 
            metalness={isLowEnd ? 0.5 : 1} 
            roughness={0.2} 
          />
        </mesh>
      
      {/* Keyboard Area */}
      <Keyboard isLowEnd={isLowEnd} />

      {/* Lid */}
      <group position={[0, 0.2, -1.9]} rotation={[-0.2, 0, 0]}>
        {/* Lid Casing */}
          <mesh position={[0, 1.7, 0.05]}>
            <boxGeometry args={[5.4, 3.4, 0.1]} />
            <meshStandardMaterial 
              color="#cbd5e1" 
              metalness={isLowEnd ? 0.5 : 1} 
              roughness={0.2} 
            />
          </mesh>
        
        {/* Screen Bezel */}
        <mesh position={[0, 1.7, 0.101]}>
          <planeGeometry args={[5.2, 3.2]} />
          <meshStandardMaterial color="#000000" roughness={0.5} />
        </mesh>

        <ScreenContent isLowEnd={isLowEnd} />
      </group>
    </group>
  );
}

export default React.memo(function InteractiveModel() {
  const { isLowEnd } = usePerformanceMode();
  const [isMobile, setIsMobile] = useState(false);
  const controlsRef = useRef<any>(null);
  const [autoRotateSpeed, setAutoRotateSpeed] = useState(4);
  const lastAzimuthRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Custom component to handle the logic inside Canvas
  function Scene() {
    useFrame(() => {
      if (controlsRef.current && !isLowEnd) {
        const controls = controlsRef.current;
        
        // If user is interacting, track the direction
        if (controls.active) {
          const currentAzimuth = controls.getAzimuthalAngle();
          const delta = currentAzimuth - lastAzimuthRef.current;
          
          // Normalize delta for wrapping
          let normalizedDelta = delta;
          if (delta > Math.PI) normalizedDelta -= Math.PI * 2;
          if (delta < -Math.PI) normalizedDelta += Math.PI * 2;

          if (Math.abs(normalizedDelta) > 0.001) {
            setAutoRotateSpeed(normalizedDelta > 0 ? -4 : 4);
          }
          lastAzimuthRef.current = currentAzimuth;
        } else {
          lastAzimuthRef.current = controls.getAzimuthalAngle();
        }
      }
    });

    return (
      <>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
        <ambientLight intensity={isLowEnd ? 0.8 : 0.6} />
        {!isLowEnd && (
          <>
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2.5} castShadow />
            <directionalLight position={[0, 10, 5]} intensity={1.5} color="#00F5D4" />
            <pointLight position={[-10, -10, -10]} color="#00F5D4" intensity={1.5} />
            <pointLight position={[0, 5, -5]} intensity={2} color="#00F5D4" />
            <pointLight position={[5, 0, 5]} intensity={1.5} color="#00F5D4" />
          </>
        )}
        {isLowEnd && (
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#00F5D4" />
        )}
        
        <Environment preset="studio" />
        
        <OrbitControls
          ref={controlsRef}
          autoRotate={!isLowEnd}
          autoRotateSpeed={autoRotateSpeed}
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

        <Float speed={isLowEnd ? 0 : 1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <group scale={isMobile ? 0.78 : 1}>
            <Laptop isLowEnd={isLowEnd} />
          </group>
        </Float>

        {!isLowEnd && <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />}
      </>
    );
  }

  return (
    <div 
      className="w-full h-[450px] md:h-[600px] cursor-grab active:cursor-grabbing relative z-20 overflow-hidden"
      style={{ touchAction: 'pan-y' }}
    >
      <Canvas 
        dpr={isLowEnd ? 1 : (isMobile ? [1, 1.2] : [1, 2])}
        shadows={!isLowEnd}
        gl={{ 
          antialias: !isLowEnd, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ touchAction: 'pan-y', pointerEvents: 'auto', cursor: 'grab' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
});
