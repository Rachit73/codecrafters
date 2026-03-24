import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, X } from 'lucide-react';
import { usePerformanceMode } from '../utils/performance';

import SectionWrapper from './SectionWrapper';

const projects = [
  {
    title: 'Food Sector',
    category: 'Industry',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    subProjects: [
      { name: 'K-Bites', url: 'https://k-bites.vercel.app/' },
      { name: 'Sai Pure Veg', url: 'https://saipureveg.vercel.app/' },
      { name: 'Gopal Residency', url: 'https://gopal-residency-web.vercel.app/' }
    ]
  },
  {
    title: 'Health Sector',
    category: 'Industry',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    subProjects: [
      { name: 'Dentista', url: 'https://dentista-two-blond.vercel.app/' },
      { name: 'Holy Dent', url: 'https://holydent.vercel.app/' },
      { name: 'Mujahid Dental', url: 'https://mujahiddental.vercel.app/' }
    ]
  },
  {
    title: 'Commercial Sector',
    category: 'Industry',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    subProjects: [
      { name: 'Blu Orpin', url: 'https://blu-orpin.vercel.app/' },
      { name: 'Vineet Tiwari Portfolio', url: 'https://vineet-tiwari.vercel.app/' },
      { name: 'Shaby\'s Fitness', url: 'https://shaby-s-fitness-center.vercel.app/' }
    ]
  },
];

export default function Portfolio() {
  const { isLowEnd } = usePerformanceMode();
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isLowEnd ? 0 : 0.05,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, scale: isLowEnd ? 1 : 0.98, y: isLowEnd ? 0 : 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <SectionWrapper id="portfolio" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: isLowEnd ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 will-change-transform gpu"
        >
          <h2 className="text-sm font-semibold text-accent-primary uppercase tracking-widest mb-2">Our Work</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-text-primary">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Projects</span>
          </h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 will-change-transform gpu"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onClick={() => setSelectedProject(project)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer border border-white/5 will-change-transform gpu"
            >
              {/* Image */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className={`w-full h-full object-cover transition-transform duration-700 ease-out ${!isLowEnd ? 'group-hover:scale-110' : ''}`}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlay - Reduced opacity to ensure image visibility */}
              <div className={`absolute inset-0 bg-gradient-to-t from-bg-secondary via-bg-secondary/40 to-transparent transition-opacity duration-500 ${!isLowEnd ? 'opacity-40 group-hover:opacity-70' : 'opacity-50'}`} />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className={`${!isLowEnd ? 'translate-y-4 opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100' : 'opacity-100'} transition-all duration-500 ease-out will-change-transform gpu`}>
                  <span className="text-accent-primary text-sm font-medium tracking-wider uppercase mb-2 block">
                    {project.category}
                  </span>
                  <h4 className="text-2xl font-display font-bold text-text-primary mb-6">
                    {project.title}
                  </h4>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent-primary text-bg-secondary font-semibold text-sm hover:bg-accent-primary/90 transition-all duration-300 shadow-lg shadow-accent-primary/20"
                  >
                    View Project <ExternalLink size={16} />
                  </button>
                </div>
              </div>

              {/* Hover Border Glow */}
              {!isLowEnd && (
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent-primary/50 rounded-2xl transition-colors duration-500 pointer-events-none" />
              )}
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 text-center will-change-transform gpu"
        >
          <a href="#contact" className="px-8 py-4 rounded-full glass border border-accent-primary text-accent-primary hover:bg-accent-primary/10 transition-all duration-300 neon-glow-hover inline-flex">
            Start Your Project
          </a>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-bg-secondary/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-bg-primary border border-white/10 p-8 rounded-3xl max-w-md w-full shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-primary to-accent-secondary" />
              
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors p-2 rounded-full hover:bg-white/5"
              >
                <X size={24} />
              </button>
              
              <h4 className="text-2xl font-display font-bold text-text-primary mb-2">{selectedProject.title}</h4>
              <p className="text-text-secondary text-sm mb-8">Explore our successful implementations in this sector.</p>
              
              <div className="space-y-4">
                {selectedProject.subProjects.map((sub, i) => (
                  <motion.a 
                    key={i}
                    href={sub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-accent-primary/50 transition-all cursor-pointer group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary font-bold text-xs">
                        0{i + 1}
                      </div>
                      <span className="text-text-primary group-hover:text-accent-primary transition-colors font-medium">{sub.name}</span>
                    </div>
                    <ExternalLink size={16} className="text-text-secondary group-hover:text-accent-primary transition-colors" />
                  </motion.a>
                ))}
              </div>
              
              <button 
                onClick={() => setSelectedProject(null)}
                className="w-full mt-8 py-3 rounded-xl bg-white/5 text-text-primary hover:bg-white/10 transition-colors font-semibold text-sm"
              >
                Close Details
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
