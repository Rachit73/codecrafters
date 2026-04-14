import React from 'react';
import { motion } from 'motion/react';

interface FounderCardProps {
  name: string;
  role: string;
  description: string;
  color: string;
  delay: number;
}

export default function FounderCard({ name, role, description, color, delay }: FounderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col"
    >
      <div className="h-[400px] rounded-2xl overflow-hidden glass border border-white/10 mb-8 relative group bg-bg-primary/30 flex items-center justify-center">
        {/* Decorative background animation */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`
          }}
        />
        <div className="relative z-10 text-6xl font-display font-bold text-white/10 group-hover:text-white/20 transition-colors duration-500">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="absolute inset-0 border-2 border-accent-primary/0 group-hover:border-accent-primary/50 transition-colors duration-500 rounded-2xl pointer-events-none" />
      </div>
      
      <div className="px-2">
        <h4 className="text-3xl font-display font-bold text-text-primary mb-2">{name}</h4>
        <p className="font-medium text-lg mb-4 tracking-wide uppercase text-sm" style={{ color }}>{role}</p>
        <p className="text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
