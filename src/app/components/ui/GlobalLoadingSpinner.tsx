// app/components/ui/GlobalLoadingSpinner.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function GlobalLoadingSpinner() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          {/* Main spinner */}
          <motion.div
            className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />

          {/* Inner spinner (counter-rotating) */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-8 h-8 -mt-4 -ml-4 border-4 border-purple-500 border-t-transparent rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <motion.p
          className="mt-4 text-indigo-600 dark:text-indigo-400 font-medium text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          در حال بارگذاری...
        </motion.p>
      </motion.div>
    </div>
  );
}
