/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { ChevronUp, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SmoothScrollProvider, useSmoothScroll } from './context/SmoothScrollContext';
import { throttle } from './utils/eventUtils';

// Lazy load non-critical sections
const Services = lazy(() => import('./components/Services'));
const About = lazy(() => import('./components/About'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));
const Chatbot = lazy(() => import('./components/Chatbot'));

const LoadingFallback = () => (
  <div className="w-full h-[400px] flex items-center justify-center text-accent-primary">
    <Loader2 className="animate-spin" size={32} />
  </div>
);

function AppContent() {
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'services': return <Services />;
      case 'about': return <About />;
      case 'portfolio': return <Portfolio />;
      case 'faq': return <FAQ />;
      case 'contact': return <Contact />;
      case 'home':
      default: return <Hero setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-secondary text-text-primary selection:bg-accent-primary/30 selection:text-accent-primary flex flex-col">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="flex-grow pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Suspense fallback={<LoadingFallback />}>
              {renderSection()}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setActiveSection={setActiveSection} />
      
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>

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
