import React from 'react';
import { motion } from 'motion/react';
import Founder3DCard from './Founder3DCard';

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-bg-secondary/50">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-accent-secondary/10 rounded-full blur-[80px] md:blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-accent-primary/10 rounded-full blur-[60px] md:blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent-primary font-mono text-sm tracking-wider uppercase mb-2"
          >
            Who We Are
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-6"
          >
            The Minds Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Code Crafter</span>
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary max-w-3xl mx-auto text-lg leading-relaxed"
          >
            Code Crafter is a modern digital agency focused on crafting powerful, scalable, and innovative tech solutions. We blend cutting-edge technology with premium design to help businesses thrive in the digital age.
          </motion.p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Founder 1: Vineet Tiwari */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col"
          >
            <div className="h-[400px] rounded-2xl overflow-hidden glass border border-white/10 mb-8 relative group">
              <Founder3DCard color="#00F5D4" delay={0.2} />
              <div className="absolute inset-0 border-2 border-accent-primary/0 group-hover:border-accent-primary/50 transition-colors duration-500 rounded-2xl pointer-events-none" />
            </div>
            
            <div className="px-2">
              <h4 className="text-3xl font-display font-bold text-text-primary mb-2">Vineet Tiwari</h4>
              <p className="text-accent-primary font-medium text-lg mb-4 tracking-wide uppercase text-sm">Founder & Owner</p>
              <p className="text-text-secondary leading-relaxed">
                Vineet is the visionary force behind Code Crafter. With a deep passion for software architecture and innovative design, he leads the agency's mission to transform complex problems into elegant, scalable digital solutions. His expertise in full-stack development ensures that every project is built on a solid, future-proof foundation.
              </p>
            </div>
          </motion.div>

          {/* Founder 2: Pratyush Mishra */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col md:mt-16"
          >
            <div className="h-[400px] rounded-2xl overflow-hidden glass border border-white/10 mb-8 relative group">
              <Founder3DCard color="#3B82F6" delay={0.4} />
              <div className="absolute inset-0 border-2 border-accent-secondary/0 group-hover:border-accent-secondary/50 transition-colors duration-500 rounded-2xl pointer-events-none" />
            </div>
            
            <div className="px-2">
              <h4 className="text-3xl font-display font-bold text-text-primary mb-2">Pratyush Mishra</h4>
              <p className="text-accent-secondary font-medium text-lg mb-4 tracking-wide uppercase text-sm">CEO & Co-Founder</p>
              <p className="text-text-secondary leading-relaxed">
                Pratyush drives the strategic vision and operational excellence at Code Crafter. Combining a sharp business acumen with a profound understanding of emerging technologies, he bridges the gap between client goals and technical execution. He is dedicated to delivering premium user experiences and measurable business outcomes.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
