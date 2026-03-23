import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We provide full-stack web development, mobile app development, UI/UX design, cloud infrastructure setup, and AI integration services. Our team specializes in building scalable, high-performance digital products."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on complexity. A standard web application usually takes 4-8 weeks, while more complex enterprise solutions can take 3-6 months. We prioritize quality and efficiency in every delivery."
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes, we offer comprehensive maintenance and support packages to ensure your application remains secure, up-to-date, and performs optimally after launch."
  },
  {
    question: "Can you help with existing projects?",
    answer: "Absolutely. We can perform security audits, performance optimizations, and feature expansions for existing applications, regardless of the technology stack."
  },
  {
    question: "How do you ensure project security?",
    answer: "We follow industry best practices, including regular security audits, encrypted data storage, secure authentication flows, and automated testing to protect your data and users."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionWrapper id="faq" className="py-24 relative z-10">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl mx-auto px-6"
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-sm font-medium mb-4">
            <HelpCircle size={16} />
            <span>Common Questions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-6">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Questions</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Find answers to common questions about our process, services, and how we can help your business grow.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="glass rounded-2xl border border-white/5 overflow-hidden will-change-transform gpu"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-white/5 bg-transparent border-none cursor-pointer"
              >
                <span className="text-lg font-medium text-text-primary">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="text-accent-primary"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>
              
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-text-secondary leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
