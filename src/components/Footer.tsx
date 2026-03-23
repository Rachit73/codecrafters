import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, MessageCircle } from 'lucide-react';
import { LOGO_URL } from '../constants';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import LegalModal from './LegalModal';

interface FooterProps {
  setActiveSection: (section: string) => void;
}

export default function Footer({ setActiveSection }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { lenis } = useSmoothScroll();
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'privacy' | 'terms' }>({
    isOpen: false,
    type: 'privacy'
  });

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openLegalModal = (e: React.MouseEvent, type: 'privacy' | 'terms') => {
    e.preventDefault();
    setLegalModal({ isOpen: true, type });
  };

  return (
    <footer className="bg-bg-secondary border-t border-white/5 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="md:col-span-2">
            <button 
              onClick={(e) => handleNavClick(e, 'home')} 
              className="text-2xl font-display font-bold text-text-primary flex items-center gap-3 group mb-6 inline-flex cursor-pointer bg-transparent border-none p-0"
            >
              <img 
                src={LOGO_URL} 
                alt="Code Crafter Logo" 
                className="w-10 h-10 object-contain"
                referrerPolicy="no-referrer"
              />
              <span>Code Crafter</span>
            </button>
            <p className="text-text-secondary leading-relaxed max-w-md">
              Crafting powerful, scalable, and innovative tech solutions for modern businesses. We turn ideas into reality through code and design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-semibold text-text-primary mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Services', 'About', 'Portfolio', 'Contact'].map((link) => (
                <li key={link}>
                  <button 
                    onClick={(e) => handleNavClick(e, link.toLowerCase())}
                    className="text-text-secondary hover:text-accent-primary transition-colors duration-300 inline-block relative group cursor-pointer bg-transparent border-none p-0"
                  >
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-primary transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-lg font-display font-semibold text-text-primary mb-6">Connect</h4>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: '#' },
                { icon: MessageCircle, href: 'https://wa.me/919022141119' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={social.href}
                  className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-text-secondary hover:text-accent-primary hover:border-accent-primary/50 transition-colors duration-300 neon-glow-hover will-change-transform transform-gpu"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-secondary">
            &copy; {currentYear} Code Crafter Technologies. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-text-secondary">
            <button 
              onClick={(e) => openLegalModal(e, 'privacy')}
              className="hover:text-accent-primary transition-colors bg-transparent border-none p-0 cursor-pointer"
            >
              Privacy Policy
            </button>
            <button 
              onClick={(e) => openLegalModal(e, 'terms')}
              className="hover:text-accent-primary transition-colors bg-transparent border-none p-0 cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      <LegalModal 
        isOpen={legalModal.isOpen} 
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })} 
        type={legalModal.type} 
      />
    </footer>
  );
}
