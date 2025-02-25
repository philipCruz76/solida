import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the page has been scrolled beyond a certain threshold.
 * 
 * @param threshold - The scroll position threshold in pixels (default: 20)
 * @returns A boolean indicating whether the page has been scrolled beyond the threshold
 * 
 * @example
 * ```tsx
 * const isScrolled = useScrollDetection(50);
 * // Use isScrolled to conditionally apply styles or behaviors
 * ```
 */
export function useScrollDetection(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    // Function to check if we've scrolled past the threshold
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };
    
    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);
  
  return scrolled;
} 