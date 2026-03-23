import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useSmoothScroll } from '../context/SmoothScrollContext';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    if (isOpen) {
      // Stop Lenis scroll
      if (lenis) lenis.stop();
      // Fallback: prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Start Lenis scroll
      if (lenis) lenis.start();
      // Restore body scroll
      document.body.style.overflow = 'unset';
    }

    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, lenis]);
  const content = {
    privacy: {
      title: 'Privacy Policy',
      sections: [
        {
          heading: '1. Information We Collect',
          text: 'We collect information you provide directly to us, such as when you fill out our contact form. This may include your name, email address, and phone number.'
        },
        {
          heading: '2. How We Use Your Information',
          text: 'We use the information we collect to respond to your inquiries, provide the services you request, and improve our website and services.'
        },
        {
          heading: '3. Data Security',
          text: 'We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or destruction.'
        },
        {
          heading: '4. Third-Party Services',
          text: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law.'
        },
        {
          heading: '5. Cookies',
          text: 'Our website may use cookies to enhance your browsing experience and analyze site traffic. You can choose to disable cookies in your browser settings.'
        }
      ]
    },
    terms: {
      title: 'Terms of Service',
      sections: [
        {
          heading: '1. Acceptance of Terms',
          text: 'By accessing and using this website, you agree to be bound by these Terms of Service and all applicable laws and regulations.'
        },
        {
          heading: '2. Services Provided',
          text: 'Code Crafter Technologies provides digital agency services, including web development, design, and strategic consulting.'
        },
        {
          heading: '3. Intellectual Property',
          text: 'All content on this website, including text, graphics, logos, and code, is the property of Code Crafter Technologies and is protected by intellectual property laws.'
        },
        {
          heading: '4. Limitation of Liability',
          text: 'While we strive for excellence, our services are provided "as is." We do not guarantee specific business outcomes or profits, and we are not liable for any indirect or consequential damages.'
        },
        {
          heading: '5. Governing Law',
          text: 'These terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.'
        }
      ]
    }
  };

  const activeContent = content[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl max-h-[80vh] bg-bg-secondary border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-bg-primary/50">
              <h2 className="text-2xl font-display font-bold text-text-primary">
                {activeContent.title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-text-secondary hover:text-white transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div 
              className="p-6 overflow-y-auto custom-scrollbar overscroll-contain"
              data-lenis-prevent
            >
              <div className="space-y-8">
                {activeContent.sections.map((section, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-accent-primary mb-3">
                      {section.heading}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {section.text}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 pt-6 border-t border-white/5 text-center">
                <p className="text-xs text-text-secondary italic">
                  Last updated: March 2026. For any questions, please contact us via the contact form.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
