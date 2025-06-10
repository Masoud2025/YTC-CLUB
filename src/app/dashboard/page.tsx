// app/dashboard/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import UserDashboard from '../components/ui/UserDashboard';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage or your auth system
    const storedUserData = localStorage.getItem('USER_DATA');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#282A2A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-[#282A2A] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            ابتدا وارد شوید
          </h2>
          <p className="text-gray-400 mb-6">
            برای دسترسی به پنل کاربری ابتدا وارد حساب کاربری خود شوید
          </p>
          <button
            onClick={() => (window.location.href = '/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            ورود به حساب کاربری
          </button>
        </motion.div>
      </div>
    );
  }

  return <UserDashboard userData={userData} />;
}
