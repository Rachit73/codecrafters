import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export default function HeroAnimation() {
  const nodes = Array.from({ length: 15 });

  return (
    <div className="relative w-full h-96 flex items-center justify-center overflow-hidden">
      {/* Neural Network Nodes */}
      <div className="relative w-96 h-96">
        {nodes.map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 384 - 192, 
              y: Math.random() * 384 - 192,
              opacity: 0 
            }}
            animate={{ 
              x: Math.random() * 384 - 192, 
              y: Math.random() * 384 - 192,
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute w-3 h-3 bg-accent-primary rounded-full shadow-[0_0_15px_rgba(0,245,212,0.9)]"
          />
        ))}
        
        {/* Central Core */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 m-auto w-32 h-32 border-2 border-accent-primary/30 rounded-full flex items-center justify-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(0,245,212,0.5)]">
            <span className="text-bg-secondary text-4xl font-bold font-display">{`{ }`}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
