import { useRef } from 'react';

export function useValue<T>(value: T) {
  const cache = useRef<T>(value);
  return cache.current;
}
