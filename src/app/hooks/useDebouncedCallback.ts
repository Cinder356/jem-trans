import { useCallback, useEffect, useRef } from 'react';

/**
 * A hook that delays invoking a function until after wait milliseconds have elapsed
 * since the last time the debounced function was invoked.
 *
 * @param callback The function to debounce
 * @param delay The delay in milliseconds
 * @returns [debouncedCallback, cancelCallback]
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): [(...args: Parameters<T>) => void, () => void] {
  // Use a ref to store the latest callback.
  // This allows us to use the latest callback without changing the dependency array of the wrapped function.
  const callbackRef = useRef<T>(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Update the ref whenever the callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // The debounced function
  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      // Clear previous timer
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timer
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );

  // The cancel function to prevent the callback from firing
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Cleanup on unmount to prevent memory leaks
  useEffect(() => {
    return () => cancel();
  }, [cancel]);

  return [debouncedCallback, cancel];
}
