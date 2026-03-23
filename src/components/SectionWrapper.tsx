import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export default function SectionWrapper({ 
  children, 
  id, 
  className = "", 
  threshold = 0.1,
  once = true 
}: SectionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    amount: threshold, 
    once: once,
    margin: "0px 0px -100px 0px"
  });
  
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isInView && !isRendered) {
      setIsRendered(true);
    }
  }, [isInView, isRendered]);

  return (
    <section 
      ref={ref} 
      id={id} 
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="will-change-transform gpu"
      >
        {/* Only render children if they have been in view at least once to save memory/CPU */}
        {isRendered ? children : <div className="min-h-[200px]" />}
      </motion.div>
    </section>
  );
}
