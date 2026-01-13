import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Хук useDebounce с возможностью отмены.
 *
 * @param value Значение для дебаунса.
 * @param delay Задержка в мс.
 * @returns Кортеж [debouncedValue, cancelFunction]
 */
function useDebounce<T>(value: T, delay: number): [T, () => void] {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  // Используем ref для хранения ID таймера, чтобы он не сбрасывался при ререндере
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Функция отмены: очищает таймер, если он запущен
  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Если значение изменилось, сначала отменяем предыдущий таймер
    cancel();

    // Запускаем новый таймер
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Очистка при размонтировании или изменении зависимостей
    return cancel;
  }, [value, delay, cancel]);

  return [debouncedValue, cancel];
}

export default useDebounce;
