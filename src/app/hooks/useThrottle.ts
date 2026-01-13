import { useEffect, useRef, useState } from 'react';

/**
 * Хук для троттлинга значения.
 * Значение будет обновляться не чаще, чем раз в заданный интервал времени.
 *
 * @param value Значение для троттлинга
 * @param interval Интервал в миллисекундах (по умолчанию 500мс)
 * @returns Троттленное значение
 */
export function useThrottle<T>(value: T, interval: number = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const timeElapsed = now - lastExecuted.current;

    // Если прошло достаточно времени с последнего обновления, обновляем сразу
    if (timeElapsed >= interval) {
      setThrottledValue(value);
      lastExecuted.current = now;
    } else {
      // Иначе планируем обновление через оставшееся время
      const timeRemaining = interval - timeElapsed;

      const timerId = setTimeout(() => {
        setThrottledValue(value);
        lastExecuted.current = Date.now();
      }, timeRemaining);

      // Очистка таймера при изменении value или размонтировании
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [value, interval]);

  return throttledValue;
}
