import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import InteractiveModel from './InteractiveModel';

interface HeroProps {
  setActiveSection: (section: string) => void;
}

export default function Hero({ setActiveSection }: HeroProps) {
  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradients & Particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-secondary/20 rounded-full blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '6s' }}></div>
        
        {/* Simple CSS Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_40%,transparent_100%)]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Interactive 3D Model */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full mb-4"
        >
          <InteractiveModel />
        </motion.div>

        {/* Text Content */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight"
        >
          Crafting Code, <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary neon-text">
            Building Futures
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We build powerful frontend interfaces, robust backend systems, and scalable SaaS products that drive innovation and growth for modern businesses.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4"
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-text-secondary uppercase tracking-widest font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-accent-primary to-transparent"
        />
      </motion.div>
    </section>
  );
}
