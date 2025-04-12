// app/hooks/usePageLoading.ts
'use client';

import { useEffect } from 'react';
import { useLoading } from '../components/ui/LoadingProvider';

export default function usePageLoading(
  isLoading: boolean = true,
  duration: number = 1000,
) {
  const { setLoading } = useLoading();

  useEffect(() => {
    if (isLoading) {
      setLoading(true);

      const timer = setTimeout(() => {
        setLoading(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isLoading, duration, setLoading]);
}
