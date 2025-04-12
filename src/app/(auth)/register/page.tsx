/* eslint-disable @typescript-eslint/no-unused-vars */
// app/register/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiGithub,
} from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import { useLoading } from '../../components/ui/LoadingProvider';

export default function RegisterPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { setLoading } = useLoading();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!name || !email || !password || !confirmPassword) {
      setError('لطفا تمام فیلدها را پر کنید.');
      return;
    }

    if (password !== confirmPassword) {
      setError('رمز عبور و تکرار آن باید یکسان باشند.');
      return;
    }

    if (!acceptTerms) {
      setError('لطفا قوانین و مقررات را مطالعه و قبول کنید.');
      return;
    }

    // Show loading state
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Here you would typically register with your backend
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password }),
      // });

      // if (!response.ok) throw new Error('Registration failed');

      // Redirect to login page or dashboard
      router.push('/login?registered=true');
    } catch (err) {
      setError('ثبت نام ناموفق بود. لطفا دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider: string) => {
    setLoading(true);
    // Simulate social registration
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12"
      dir="rtl"
    >
      <div className="w-full max-w-6xl flex rounded-2xl shadow-lg overflow-hidden">
        {/* Left side - Register Form */}
        <motion.div
          className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-8 md:p-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Logo and heading */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <Link href="/">
              <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                YTC-CLUB
              </h1>
            </Link>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              ایجاد حساب کاربری جدید
            </p>
          </motion.div>

          {/* Error message */}
          {error && (
            <motion.div
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          {/* Register form */}
          <motion.form variants={itemVariants} onSubmit={handleRegister}>
            {/* Name field */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                نام و نام خانوادگی
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 p-3"
                  placeholder="نام و نام خانوادگی"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email field */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                ایمیل
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 p-3"
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                رمز عبور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 p-3"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 flex items-center pl-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  ) : (
                    <FiEye className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password field */}
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                تکرار رمز عبور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 p-3"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 flex items-center pl-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  ) : (
                    <FiEye className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and conditions */}
            <div className="mb-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500"
                    checked={acceptTerms}
                    onChange={e => setAcceptTerms(e.target.checked)}
                    required
                  />
                </div>
                <label
                  htmlFor="terms"
                  className="mr-2 text-sm text-gray-600 dark:text-gray-300"
                >
                  <span>من </span>
                  <Link
                    href="/terms"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    قوانین و مقررات
                  </Link>
                  <span> را مطالعه کرده و می‌پذیرم.</span>
                </label>
              </div>
            </div>

            {/* Register button */}
            <motion.button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm px-5 py-3 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ثبت نام
              <FiArrowRight className="mr-2" />
            </motion.button>
          </motion.form>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="flex items-center my-6"
          >
            <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
            <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">
              یا ثبت نام با
            </span>
            <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
          </motion.div>

          {/* Social register buttons */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-4"
          >
            <motion.button
              type="button"
              className="flex items-center justify-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSocialRegister('google')}
            >
              <FaGoogle className="mr-2 text-red-500" />
              گوگل
            </motion.button>
            <motion.button
              type="button"
              className="flex items-center justify-center bg-gray-800 dark:bg-gray-700 border border-gray-700 dark:border-gray-600 rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 dark:hover:bg-gray-600"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSocialRegister('github')}
            >
              <FiGithub className="mr-2" />
              گیت‌هاب
            </motion.button>
          </motion.div>

          {/* Login link */}
          <motion.p
            variants={itemVariants}
            className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300"
          >
            قبلاً ثبت نام کرده‌اید؟{' '}
            <Link
              href="/login"
              className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              وارد شوید
            </Link>
          </motion.p>
        </motion.div>

        {/* Right side - Image (hidden on mobile) */}
        <motion.div
          className="hidden lg:block lg:w-1/2 relative overflow-hidden"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-700" />

          {/* Decorative shapes */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-32 h-32 bg-white/10 rounded-full"
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-white/10 rounded-full"
            animate={{
              y: [0, 15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
            <motion.div
              className="w-full max-w-md text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-4">به جامعه ما خوش آمدید</h2>
              <p className="mb-8">
                با ثبت نام در YTC-CLUB به جمع بزرگی از طراحان و توسعه‌دهندگان
                بپیوندید و از امکانات ویژه سایت بهره‌مند شوید.
              </p>

              {/* Features */}
              <div className="space-y-4 text-right">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>دسترسی به آموزش‌های اختصاصی</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>اشتراک‌گذاری پروژه‌های خود</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>ارتباط با طراحان و توسعه‌دهندگان</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="w-full"
            >
              <path
                fill="rgba(255,255,255,0.1)"
                fillOpacity="1"
                d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
