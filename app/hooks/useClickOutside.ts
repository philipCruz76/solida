import { useEffect, RefObject } from 'react';

/**
 * Custom hook that triggers a callback when a click occurs outside of the specified element.
 * 
 * @param ref - React ref object pointing to the element to monitor
 * @param callback - Function to call when a click outside is detected
 * @param enabled - Whether the click outside detection is active (default: true)
 * 
 * @example
 * ```tsx
 * const menuRef = useRef(null);
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * useClickOutside(menuRef, () => {
 *   if (isOpen) setIsOpen(false);
 * }, isOpen);
 * ```
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => void,
  enabled = true
): void {
  useEffect(() => {
    if (!enabled) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, enabled]);
} 