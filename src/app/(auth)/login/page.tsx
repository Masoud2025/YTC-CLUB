/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser,
  FiPhone,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiAlertCircle,
  FiLoader,
  FiArrowRight,
} from 'react-icons/fi';

interface UserData {
  name: string;
  phone: string;
  timestamp: number;
}

export default function LoginPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUserData = localStorage.getItem('USER_DATA');
    if (savedUserData) {
      try {
        const userData: UserData = JSON.parse(savedUserData);
        setName(userData.name || '');
        setPhone(formatPhoneNumber(userData.phone || ''));
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('USER_DATA');
      }
    }
  }, []);

  // Save user data to localStorage
  const saveUserDataToStorage = (userData: { name: string; phone: string }) => {
    try {
      const userDataWithTimestamp: UserData = {
        name: userData.name,
        phone: userData.phone,
        timestamp: Date.now(),
      };
      localStorage.setItem('USER_DATA', JSON.stringify(userDataWithTimestamp));
    } catch (error) {
      console.error('Error saving user data to localStorage:', error);
    }
  };

  // Get user data from localStorage
  const getUserDataFromStorage = (): UserData | null => {
    try {
      const savedData = localStorage.getItem('USER_DATA');
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (error) {
      console.error('Error getting user data from localStorage:', error);
    }
    return null;
  };

  // Clear user data from localStorage
  const clearUserDataFromStorage = () => {
    try {
      localStorage.removeItem('USER_DATA');
    } catch (error) {
      console.error('Error clearing user data from localStorage:', error);
    }
  };

  // Iranian phone number validation
  const validateIranianPhone = (phoneNumber: string): boolean => {
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const iranianMobileRegex = /^(\+98|0098|98|0)?9[0-9]{9}$/;
    return iranianMobileRegex.test(cleanPhone);
  };

  // Format phone number for display
  const formatPhoneNumber = (value: string): string => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length <= 4) {
      return cleanValue;
    } else if (cleanValue.length <= 7) {
      return `${cleanValue.slice(0, 4)} ${cleanValue.slice(4)}`;
    } else if (cleanValue.length <= 11) {
      return `${cleanValue.slice(0, 4)} ${cleanValue.slice(
        4,
        7,
      )} ${cleanValue.slice(7)}`;
    }
    return `${cleanValue.slice(0, 4)} ${cleanValue.slice(
      4,
      7,
    )} ${cleanValue.slice(7, 11)}`;
  };

  // Normalize phone number for API
  const normalizePhoneNumber = (phoneNumber: string): string => {
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.startsWith('98') && cleanPhone.length === 12) {
      return '0' + cleanPhone.slice(2);
    } else if (cleanPhone.startsWith('0098') && cleanPhone.length === 13) {
      return '0' + cleanPhone.slice(4);
    } else if (cleanPhone.startsWith('+98') && cleanPhone.length === 13) {
      return '0' + cleanPhone.slice(3);
    } else if (cleanPhone.startsWith('9') && cleanPhone.length === 10) {
      return '0' + cleanPhone;
    }
    return cleanPhone;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanValue = value.replace(/\D/g, '');

    if (cleanValue.length <= 11) {
      const formattedValue = formatPhoneNumber(cleanValue);
      setPhone(formattedValue);
      if (phoneError) {
        setPhoneError('');
      }
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const persianEnglishRegex = /^[\u0600-\u06FF\u200C\u200D a-zA-Z]*$/;

    if (persianEnglishRegex.test(value) || value === '') {
      setName(value);
      if (nameError) {
        setNameError('');
      }
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;

    if (!name.trim()) {
      setNameError('نام الزامی است');
      isValid = false;
    } else if (name.trim().length < 2) {
      setNameError('نام باید حداقل ۲ کاراکتر باشد');
      isValid = false;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone) {
      setPhoneError('شماره موبایل الزامی است');
      isValid = false;
    } else if (!validateIranianPhone(cleanPhone)) {
      setPhoneError('شماره موبایل معتبر نیست. مثال: 09123456789');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMsg('');

    try {
      const normalizedPhone = normalizePhoneNumber(phone);

      saveUserDataToStorage({
        name: name.trim(),
        phone: normalizedPhone,
      });

      const res = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify({
          name: name.trim(),
          phone: normalizedPhone,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      setMsg(data.message || data.error);

      // Check if login was successful
      if (res.ok && !data.error) {
        // Show success message briefly then redirect
        setTimeout(() => {
          window.location.href = '/'; // Redirect to home page
        }, 1500); // Wait 1.5 seconds to show success message
      }
    } catch (error) {
      setMsg('خطا در اتصال به سرور');
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gray-900">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-6 shadow-2xl"
            >
              <FiUser className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2"
            >
              خوش آمدید
            </motion.h1>
            <motion.p variants={itemVariants} className="text-gray-400 text-lg">
              برای ادامه، اطلاعات خود را وارد کنید
            </motion.p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white/90 text-right"
                  >
                    نام کامل
                  </label>
                  <div className="relative">
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      id="name"
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="نام خود را وارد کنید"
                      className={`w-full px-4 py-4 pr-12 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 text-right placeholder-white/50 text-white ${
                        nameError ? 'border-red-400/50 bg-red-500/10' : ''
                      } ${
                        focusedField === 'name'
                          ? 'shadow-lg shadow-blue-500/25'
                          : ''
                      }`}
                      required
                    />
                    <motion.div
                      animate={{
                        scale: focusedField === 'name' ? 1.2 : 1,
                        color: nameError
                          ? '#f87171'
                          : focusedField === 'name'
                          ? '#60a5fa'
                          : '#9ca3af',
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      <FiUser className="w-5 h-5" />
                    </motion.div>

                    {/* Success indicator */}
                    <AnimatePresence>
                      {name.length >= 2 && !nameError && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2"
                        >
                          <FiCheck className="w-5 h-5 text-green-400" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <AnimatePresence>
                    {nameError && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        className="overflow-hidden"
                      >
                        <p className="text-red-400 text-sm text-right flex items-center justify-end space-x-2 space-x-reverse bg-red-500/10 backdrop-blur-xl border border-red-400/20 rounded-xl p-3">
                          <FiAlertCircle className="w-4 h-4" />
                          <span>{nameError}</span>
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Phone Input */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-white/90 text-right"
                  >
                    شماره موبایل
                  </label>
                  <div className="relative">
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="0912 345 6789"
                      className={`w-full px-4 py-4 pr-12 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 text-right placeholder-white/50 text-white ${
                        phoneError ? 'border-red-400/50 bg-red-500/10' : ''
                      } ${
                        focusedField === 'phone'
                          ? 'shadow-lg shadow-blue-500/25'
                          : ''
                      }`}
                      required
                      dir="ltr"
                    />
                    <motion.div
                      animate={{
                        scale: focusedField === 'phone' ? 1.2 : 1,
                        color: phoneError
                          ? '#f87171'
                          : focusedField === 'phone'
                          ? '#60a5fa'
                          : '#9ca3af',
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      <FiPhone className="w-5 h-5" />
                    </motion.div>

                    {/* Success indicator */}
                    <AnimatePresence>
                      {validateIranianPhone(phone.replace(/\D/g, '')) &&
                        !phoneError && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2"
                          >
                            <FiCheck className="w-5 h-5 text-green-400" />
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </div>

                  <AnimatePresence>
                    {phoneError && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        className="overflow-hidden"
                      >
                        <p className="text-red-400 text-sm text-right flex items-center justify-end space-x-2 space-x-reverse bg-red-500/10 backdrop-blur-xl border border-red-400/20 rounded-xl p-3">
                          <FiAlertCircle className="w-4 h-4" />
                          <span>{phoneError}</span>
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-2xl relative overflow-hidden group"
                >
                  {/* Button background animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    layoutId="buttonBg"
                  />

                  <div className="relative z-10 flex items-center justify-center space-x-3 space-x-reverse">
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        >
                          <FiLoader className="w-5 h-5" />
                        </motion.div>
                        <span>در حال پردازش...</span>
                      </>
                    ) : (
                      <>
                        <span>ورود / ثبت‌نام</span>
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <FiArrowRight className="w-5 h-5" />
                        </motion.div>
                      </>
                    )}
                  </div>
                </motion.button>

                {/* Message Display */}
                <AnimatePresence>
                  {msg && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -20 }}
                      className={`p-4 rounded-2xl text-center font-medium backdrop-blur-xl border ${
                        msg.includes('خطا') || msg.includes('error')
                          ? 'bg-red-500/10 text-red-300 border-red-400/20'
                          : 'bg-green-500/10 text-green-300 border-green-400/20'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2 space-x-reverse">
                        {msg.includes('خطا') || msg.includes('error') ? (
                          <FiAlertCircle className="w-5 h-5" />
                        ) : (
                          <FiCheck className="w-5 h-5" />
                        )}
                        <span>{msg}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
