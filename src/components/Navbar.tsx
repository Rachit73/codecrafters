import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'About', id: 'about' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <button 
          onClick={(e) => handleNavClick(e, 'home')} 
          className="text-2xl font-display font-bold text-text-primary flex items-center gap-2 group cursor-pointer bg-transparent border-none p-0"
        >
          <span className="text-accent-primary group-hover:neon-text transition-all duration-300">{`{ }`}</span>
          CodeCrafters
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`transition-colors duration-300 text-sm font-medium relative group cursor-pointer bg-transparent border-none p-0 ${
                activeSection === link.id ? 'text-accent-primary' : 'text-text-secondary hover:text-accent-primary'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-accent-primary transition-all duration-300 neon-glow ${
                activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
          ))}
          <button
            onClick={(e) => handleNavClick(e, 'contact')}
            className="px-6 py-2 rounded-full border border-accent-primary text-accent-primary hover:bg-accent-primary/10 transition-all duration-300 neon-glow-hover text-sm font-medium cursor-pointer bg-transparent"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-text-primary hover:text-accent-primary transition-colors cursor-pointer bg-transparent border-none p-0"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 glass border-t border-white/10 py-4 px-6 flex flex-col gap-4 shadow-2xl"
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`transition-colors py-2 text-lg font-medium text-left cursor-pointer bg-transparent border-none p-0 ${
                activeSection === link.id ? 'text-accent-primary' : 'text-text-primary hover:text-accent-primary'
              }`}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={(e) => handleNavClick(e, 'contact')}
            className="mt-2 px-6 py-3 rounded-lg bg-accent-primary/10 border border-accent-primary text-accent-primary text-center font-medium neon-glow cursor-pointer"
          >
            Get Started
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}
