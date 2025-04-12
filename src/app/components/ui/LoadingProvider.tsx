/* eslint-disable @typescript-eslint/no-unused-vars */
// app/components/providers/LoadingProvider.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import GlobalLoadingSpinner from '../ui/GlobalLoadingSpinner';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track navigation changes to show/hide loading spinner
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => {
      // Add a small delay to make the loading state more visible
      // and less jarring for quick page loads
      setTimeout(() => setLoading(false), 300);
    };

    // Listen for route changes
    window.addEventListener('beforeunload', handleStart);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleStart);
    };
  }, []);

  // Reset loading state when the route changes
  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {isLoading && <GlobalLoadingSpinner />}
      {children}
    </LoadingContext.Provider>
  );
}
