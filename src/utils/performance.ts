import { useState, useEffect } from 'react';

export function usePerformanceMode() {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    const checkPerformance = () => {
      // Basic check for mobile/tablet
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      // Check for hardware concurrency (CPU cores)
      const cores = navigator.hardwareConcurrency || 4;
      
      // Check for memory if available (Chrome/Android)
      // @ts-ignore
      const memory = navigator.deviceMemory || 4;

      // If mobile and low cores/memory, consider it low-end
      if (isMobile && (cores < 4 || memory < 4)) {
        setIsLowEnd(true);
      }
      
      // Also check for reduced motion preference
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) {
        setIsLowEnd(true);
      }
    };

    checkPerformance();
  }, []);

  return { isLowEnd };
}
