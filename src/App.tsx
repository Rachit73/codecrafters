/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SmoothScrollProvider, useSmoothScroll } from './context/SmoothScrollContext';
import { throttle } from './utils/eventUtils';

function AppContent() {
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = throttle(() => {
      setShowBackToTop(window.scrollY > 500);
    }, 100);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setActiveSection('home');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero setActiveSection={setActiveSection} />;
      case 'services':
        return <Services />;
      case 'about':
        return <About />;
      case 'portfolio':
        return <Portfolio />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-secondary text-text-primary selection:bg-accent-primary/30 selection:text-accent-primary flex flex-col">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-grow pt-20">
        {renderSection()}
      </main>
      <Footer setActiveSection={setActiveSection} />
      <Chatbot />

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full bg-accent-primary text-bg-secondary flex items-center justify-center neon-glow hover:bg-accent-primary/90 transition-colors shadow-lg cursor-pointer border-none will-change-transform gpu"
            title="Back to top"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <SmoothScrollProvider>
      <AppContent />
    </SmoothScrollProvider>
  );
}
