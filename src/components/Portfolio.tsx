import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { usePerformanceMode } from '../utils/performance';

const projects = [
  {
    title: 'E-Commerce Storefront',
    category: 'Frontend',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Scalable API Architecture',
    category: 'Backend',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'High-Performance Data Pipeline',
    category: 'Database',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'FinTech Dashboard',
    category: 'SaaS',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Cloud Infrastructure Setup',
    category: 'Hosting',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Brand Identity & Domain',
    category: 'Domain',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Product Launch Campaign',
    category: 'Video Ad',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Event Marketing Materials',
    category: 'Promotional Poster',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Startup Growth Strategy',
    category: 'Business Guidance',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Portfolio() {
  const { isLowEnd } = usePerformanceMode();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isLowEnd ? 0 : 0.1,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, scale: isLowEnd ? 1 : 0.95, y: isLowEnd ? 0 : 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section id="portfolio" className="py-24 relative z-10">
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
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer will-change-transform gpu"
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

              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-bg-secondary via-bg-secondary/50 to-transparent transition-opacity duration-500 ${!isLowEnd ? 'opacity-60 group-hover:opacity-80' : 'opacity-70'}`} />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className={`${!isLowEnd ? 'translate-y-8 opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100' : 'opacity-100'} transition-all duration-500 ease-out will-change-transform gpu`}>
                  <span className="text-accent-primary text-sm font-medium tracking-wider uppercase mb-2 block">
                    {project.category}
                  </span>
                  <h4 className="text-2xl font-display font-bold text-text-primary mb-4">
                    {project.title}
                  </h4>
                  <a href="#" className="inline-flex items-center gap-2 text-text-primary hover:text-accent-primary transition-colors duration-300">
                    View Project <ExternalLink size={16} />
                  </a>
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
          className="mt-16 text-center will-change-[transform,opacity] transform-gpu"
        >
          <a href="#" className="px-8 py-4 rounded-full glass border border-accent-primary text-accent-primary hover:bg-accent-primary/10 transition-all duration-300 neon-glow-hover inline-flex">
            View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
}
