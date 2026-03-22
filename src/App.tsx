/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

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
    </div>
  );
}
