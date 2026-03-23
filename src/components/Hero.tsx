import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import InteractiveModel from './InteractiveModel';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { usePerformanceMode } from '../utils/performance';

interface HeroProps {
  setActiveSection: (section: string) => void;
}

export default function Hero({ setActiveSection }: HeroProps) {
  const { lenis } = useSmoothScroll();
  const { isLowEnd } = usePerformanceMode();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element && lenis) {
      lenis.scrollTo(element, { offset: -80 });
    }
  };

  const transition = (delay: number) => ({
    duration: isMobile ? 0.6 : 0.8, // Faster on mobile
    delay: isMobile ? delay * 0.5 : delay, // Snappier delay on mobile
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number] // Custom cubic-bezier for smoother feel
  });

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 will-change-transform gpu">
      {/* Background Gradients & Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {!isLowEnd && (
          <>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-accent-primary/10 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen will-change-transform gpu"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent-secondary/5 rounded-full blur-[100px] md:blur-[150px] mix-blend-screen will-change-transform gpu"></div>
          </>
        )}
        {isLowEnd && (
          <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 to-transparent opacity-30 gpu"></div>
        )}
        
        {/* Simple CSS Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,212,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_40%,transparent_100%)] transform-gpu gpu"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Interactive 3D Model */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition(0)}
          className="w-full mb-4 will-change-transform gpu"
        >
          <InteractiveModel />
        </motion.div>

        {/* Text Content */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={transition(0.2)}
          className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight min-h-[2.5em] md:min-h-[2em] will-change-transform gpu"
        >
          Crafting Code, <br className="hidden md:block" />
          <span className="text-accent-primary">
            Scalable Solutions
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={transition(0.4)}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed will-change-transform gpu"
        >
          We build powerful frontend interfaces, robust backend systems, and scalable SaaS products that drive innovation and growth for modern businesses.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={transition(0.6)}
          className="flex flex-col sm:flex-row items-center gap-4 will-change-transform gpu"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleNavClick(e, 'portfolio')}
            className="px-8 py-4 rounded-full bg-accent-primary text-bg-secondary font-semibold flex items-center gap-2 neon-glow hover:bg-accent-primary/90 transition-colors w-full sm:w-auto justify-center cursor-pointer border-none"
          >
            View Our Work
            <ArrowRight size={20} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleNavClick(e, 'contact')}
            className="px-8 py-4 rounded-full glass border border-white/10 text-text-primary font-semibold hover:border-accent-primary/50 hover:text-accent-primary transition-all duration-300 w-full sm:w-auto justify-center flex cursor-pointer"
          >
            Start a Project
          </motion.button>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 will-change-transform gpu"
      >
        <span className="text-xs text-text-secondary uppercase tracking-widest font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-accent-primary to-transparent will-change-transform gpu"
        />
      </motion.div>
    </section>
  );
}
