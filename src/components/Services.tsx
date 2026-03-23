import React from 'react';
import { motion } from 'motion/react';
import { Layout, Server, Database, Cloud, HardDrive, Globe, Video, Megaphone, TrendingUp } from 'lucide-react';
import { usePerformanceMode } from '../utils/performance';

import SectionWrapper from './SectionWrapper';

const services = [
  {
    title: 'Frontend',
    description: 'Crafting beautiful, responsive, and interactive user interfaces using modern web technologies.',
    icon: Layout,
  },
  {
    title: 'Backend',
    description: 'Building robust, scalable, and secure server-side architectures to power your applications.',
    icon: Server,
  },
  {
    title: 'Database',
    description: 'Designing and optimizing data storage solutions for high performance and reliability.',
    icon: Database,
  },
  {
    title: 'SaaS',
    description: 'Developing comprehensive Software as a Service platforms tailored for growth and scalability.',
    icon: Cloud,
  },
  {
    title: 'Hosting',
    description: 'Providing reliable, high-speed hosting solutions to keep your applications running smoothly.',
    icon: HardDrive,
  },
  {
    title: 'Domain',
    description: 'Securing and managing the perfect domain names to establish your brand\'s online presence.',
    icon: Globe,
  },
  {
    title: 'Video Ad',
    description: 'Creating engaging and high-converting video advertisements to captivate your target audience.',
    icon: Video,
  },
  {
    title: 'Promotional Poster',
    description: 'Designing striking promotional materials that effectively communicate your brand message.',
    icon: Megaphone,
  },
  {
    title: 'Business Guidance',
    description: 'Offering strategic insights and expert advice to navigate the digital landscape and accelerate growth.',
    icon: TrendingUp,
  },
];

export default function Services() {
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
    hidden: { opacity: 0, y: isLowEnd ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <SectionWrapper id="services" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: isLowEnd ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 will-change-transform gpu"
        >
          <h2 className="text-sm font-semibold text-accent-primary uppercase tracking-widest mb-2">Our Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-text-primary">
            What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Deliver</span>
          </h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={!isLowEnd ? { y: -10 } : {}}
              className={`glass p-8 rounded-2xl border border-white/5 transition-all duration-300 group relative overflow-hidden will-change-transform gpu ${!isLowEnd ? 'md:hover:neon-border' : ''}`}
            >
              {/* Subtle background glow on hover */}
              {!isLowEnd && (
                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              )}
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl bg-bg-secondary border border-white/10 flex items-center justify-center mb-6 transition-all duration-300 ${!isLowEnd ? 'group-hover:scale-110 group-hover:border-accent-primary/50' : ''}`}>
                  <service.icon className="text-accent-primary" size={28} />
                </div>
                <h4 className={`text-xl font-display font-semibold text-text-primary mb-3 transition-colors duration-300 ${!isLowEnd ? 'group-hover:text-accent-primary' : ''}`}>
                  {service.title}
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
