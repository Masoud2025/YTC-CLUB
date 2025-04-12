/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { FiHome, FiSearch, FiHelpCircle } from 'react-icons/fi';

export default function NotFound() {
  const { theme } = useTheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Hide scrollbar when 404 page is shown
  useEffect(() => {
    // Save original styles
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full z-[9999] flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950 dark:to-gray-900"
      dir="rtl"
    >
      <motion.div
        className="w-full max-w-3xl flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Image */}
        <motion.div
          className="relative w-full h-64 sm:h-80 md:h-96 mb-8"
          variants={itemVariants}
        >
          <Image
            src="/404-illustration.svg"
            alt="صفحه یافت نشد"
            fill
            priority
            className="object-contain"
          />
        </motion.div>

        {/* 404 Text */}
        <motion.h1
          className="text-6xl md:text-7xl font-bold text-indigo-600 dark:text-indigo-400 mb-4"
          variants={itemVariants}
        >
          404
        </motion.h1>

        <motion.h2
          className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4"
          variants={itemVariants}
        >
          صفحه مورد نظر یافت نشد!
        </motion.h2>

        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg"
          variants={itemVariants}
        >
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا به آدرس دیگری
          منتقل شده است.
        </motion.p>

        {/* Suggestions */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 w-full max-w-lg"
          variants={itemVariants}
        >
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            پیشنهادات:
          </h3>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300 text-right">
            <li className="flex items-center">
              <FiSearch className="ml-2 text-indigo-500" />
              <span>آدرس URL را بررسی کنید و مطمئن شوید که درست است.</span>
            </li>
            <li className="flex items-center">
              <FiHome className="ml-2 text-indigo-500" />
              <span>به صفحه اصلی بازگردید و از آنجا شروع کنید.</span>
            </li>
            <li className="flex items-center">
              <FiHelpCircle className="ml-2 text-indigo-500" />
              <span>
                با پشتیبانی تماس بگیرید اگر فکر می‌کنید این یک اشتباه است.
              </span>
            </li>
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          variants={itemVariants}
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              بازگشت به صفحه اصلی
            </motion.button>
          </Link>

          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg border border-indigo-600 dark:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
            >
              تماس با پشتیبانی
            </motion.button>
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute -z-10 top-1/4 right-1/4 w-64 h-64 bg-indigo-300 dark:bg-indigo-700 rounded-full filter blur-3xl opacity-30"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute -z-10 bottom-1/4 left-1/4 w-64 h-64 bg-purple-300 dark:bg-purple-700 rounded-full filter blur-3xl opacity-30"
        />
      </motion.div>
    </div>
  );
}
