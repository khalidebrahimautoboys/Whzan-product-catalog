import { useState, useEffect } from 'react';

/**
 * Debounces a value - only updates after delay of no changes
 * @param {any} value - Value to debounce
 * @param {number} delay - Delay in ms (default 300)
 * @returns {any} Debounced value
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
