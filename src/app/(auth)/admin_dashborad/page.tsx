'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLogIn,
  FiMoon,
  FiSun,
  FiHome,
  FiUsers,
  FiShoppingBag,
  FiSettings,
  FiBarChart2,
  FiLogOut,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { useRouter } from 'next/navigation';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from 'next/image';

// Dashboard components
const AdminDashboard: React.FC = () => {
  // States
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [activePage, setActivePage] = useState<string>('داشبورد');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
      setIsLoggedIn(true);
    }

    // Check system preference for dark mode
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    const savedTheme = localStorage.getItem('adminDarkMode');
    if (savedTheme !== null) {
      setDarkMode(savedTheme === 'true');
    } else {
      setDarkMode(prefersDark);
    }
  }, []);

  // Update document class when dark mode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('adminDarkMode', darkMode.toString());
  }, [darkMode]);

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, you would validate against an API
      if (username === 'admin' && password === 'admin123') {
        setIsLoggedIn(true);
        localStorage.setItem('adminLoggedIn', 'true');
      } else {
        setLoginError('نام کاربری یا رمز عبور اشتباه است');
      }
      setLoading(false);
    }, 1500);
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Dashboard navigation items
  const navItems = [
    { name: 'داشبورد', icon: <FiHome className="w-5 h-5" /> },
    { name: 'کاربران', icon: <FiUsers className="w-5 h-5" /> },
    { name: 'محصولات', icon: <FiShoppingBag className="w-5 h-5" /> },
    { name: 'آمار', icon: <FiBarChart2 className="w-5 h-5" /> },
    { name: 'تنظیمات', icon: <FiSettings className="w-5 h-5" /> },
  ];

  // Sample dashboard data
  const dashboardStats = [
    { title: 'کاربران', value: '۱,۲۵۶', change: '+۱۲٪', positive: true },
    { title: 'سفارشات', value: '۵۶۷', change: '+۸٪', positive: true },
    { title: 'درآمد', value: '۱۲,۴۵۶,۰۰۰', change: '-۲٪', positive: false },
    { title: 'بازدید', value: '۴,۲۳۶', change: '+۲۵٪', positive: true },
  ];

  // Recent users data
  const recentUsers = [
    {
      name: 'علی محمدی',
      email: 'ali@example.com',
      date: '۱۴۰۴/۰۱/۱۵',
      status: 'فعال',
    },
    {
      name: 'مریم حسینی',
      email: 'maryam@example.com',
      date: '۱۴۰۴/۰۱/۱۴',
      status: 'فعال',
    },
    {
      name: 'رضا کریمی',
      email: 'reza@example.com',
      date: '۱۴۰۴/۰۱/۱۲',
      status: 'غیرفعال',
    },
    {
      name: 'سارا احمدی',
      email: 'sara@example.com',
      date: '۱۴۰۴/۰۱/۱۰',
      status: 'فعال',
    },
  ];

  // Recent orders data
  const recentOrders = [
    {
      id: '۱۲۳۴۵',
      product: 'پک طراحی پریمیر',
      price: '۸۹۹,۰۰۰',
      status: 'تکمیل شده',
    },
    {
      id: '۱۲۳۴۴',
      product: 'دوره آموزش ادیت',
      price: '۱,۲۹۹,۰۰۰',
      status: 'در انتظار',
    },
    {
      id: '۱۲۳۴۳',
      product: 'پک افکت صوتی',
      price: '۳۹۹,۰۰۰',
      status: 'تکمیل شده',
    },
    {
      id: '۱۲۳۴۲',
      product: 'اشتراک ویژه',
      price: '۲,۴۹۹,۰۰۰',
      status: 'لغو شده',
    },
  ];

  return (
    <div dir="rtl" className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            <LoginPage
              key="login"
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              handleLogin={handleLogin}
              loginError={loginError}
              loading={loading}
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex h-screen overflow-hidden"
            >
              {/* Sidebar */}
              <AnimatePresence mode="wait">
                {sidebarOpen && (
                  <motion.aside
                    initial={{ x: -300 }}
                    animate={{ x: 0 }}
                    exit={{ x: -300 }}
                    transition={{ duration: 0.3 }}
                    className="w-64 bg-white dark:bg-gray-800 shadow-lg z-20 fixed h-full md:relative md:translate-x-0"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <div className="bg-blue-600 rounded-lg p-1.5">
                            <FiBarChart2 className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-lg font-bold dark:text-white">
                            پنل مدیریت
                          </span>
                        </div>
                        <button
                          onClick={() => setSidebarOpen(false)}
                          className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          <FiX className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex-1 py-6 overflow-y-auto">
                        <nav className="px-4 space-y-1">
                          {navItems.map(item => (
                            <button
                              key={item.name}
                              onClick={() => setActivePage(item.name)}
                              className={`flex items-center w-full px-4 py-3 text-right rounded-lg transition-colors ${
                                activePage === item.name
                                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                            >
                              <span className="ml-3">{item.icon}</span>
                              <span>{item.name}</span>
                            </button>
                          ))}
                        </nav>
                      </div>

                      <div className="p-4 border-t dark:border-gray-700">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-right rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <FiLogOut className="ml-3 w-5 h-5" />
                          <span>خروج از حساب</span>
                        </button>
                      </div>
                    </div>
                  </motion.aside>
                )}
              </AnimatePresence>

              {/* Main content */}
              <div className="flex-1 overflow-x-hidden overflow-y-auto">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm z-10 sticky top-0">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      {!sidebarOpen && (
                        <button
                          onClick={() => setSidebarOpen(true)}
                          className="mr-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          <FiMenu className="w-6 h-6" />
                        </button>
                      )}
                      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                        {activePage}
                      </h1>
                    </div>

                    <div className="flex items-center space-x-4 space-x-reverse">
                      <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                      >
                        {darkMode ? (
                          <FiSun className="w-5 h-5" />
                        ) : (
                          <FiMoon className="w-5 h-5" />
                        )}
                      </button>

                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                          ا
                        </div>
                      </div>
                    </div>
                  </div>
                </header>

                {/* Dashboard content */}
                <main className="p-4 md:p-6">
                  {/* Stats cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {dashboardStats.map((stat, index) => (
                      <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {stat.title}
                            </p>
                            <h3 className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">
                              {stat.value}
                            </h3>
                          </div>
                          <div
                            className={`text-sm font-medium ${
                              stat.positive
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}
                          >
                            {stat.change}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Recent activity section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Recent users */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                    >
                      <div className="px-6 py-4 border-b dark:border-gray-700">
                        <h3 className="font-bold text-gray-800 dark:text-white">
                          کاربران اخیر
                        </h3>
                      </div>
                      <div className="divide-y dark:divide-gray-700">
                        {recentUsers.map((user, index) => (
                          <div key={index} className="px-6 py-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-gray-800 dark:text-white">
                                  {user.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {user.email}
                                </p>
                              </div>
                              <div className="text-left">
                                <span
                                  className={`inline-flex px-2 py-1 text-xs rounded-full ${
                                    user.status === 'فعال'
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                  }`}
                                >
                                  {user.status}
                                </span>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {user.date}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700/30">
                        <button className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                          مشاهده همه کاربران
                        </button>
                      </div>
                    </motion.div>

                    {/* Recent orders */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                    >
                      <div className="px-6 py-4 border-b dark:border-gray-700">
                        <h3 className="font-bold text-gray-800 dark:text-white">
                          سفارشات اخیر
                        </h3>
                      </div>
                      <div className="divide-y dark:divide-gray-700">
                        {recentOrders.map((order, index) => (
                          <div key={index} className="px-6 py-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-gray-800 dark:text-white">
                                  {order.product}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  شماره سفارش: {order.id}
                                </p>
                              </div>
                              <div className="text-left">
                                <p className="font-medium text-gray-800 dark:text-white">
                                  {order.price} تومان
                                </p>
                                <span
                                  className={`inline-flex px-2 py-1 text-xs rounded-full mt-1 ${
                                    order.status === 'تکمیل شده'
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                      : order.status === 'در انتظار'
                                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700/30">
                        <button className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                          مشاهده همه سفارشات
                        </button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Activity chart */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6"
                  >
                    <h3 className="font-bold text-gray-800 dark:text-white mb-4">
                      فعالیت سایت
                    </h3>
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        نمودار فعالیت در اینجا نمایش داده می‌شود
                      </p>
                    </div>
                  </motion.div>
                </main>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Login page component
interface LoginPageProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: (e: React.FormEvent) => void;
  loginError: string;
  loading: boolean;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  handleLogin,
  loginError,
  loading,
  darkMode,
  toggleDarkMode,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900"
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none shadow-sm"
          aria-label={darkMode ? 'روشن کردن تم' : 'تاریک کردن تم'}
        >
          {darkMode ? (
            <FiSun className="w-5 h-5" />
          ) : (
            <FiMoon className="w-5 h-5" />
          )}
        </button>
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                <FiUser className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                ورود به پنل مدیریت
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                لطفا نام کاربری و رمز عبور خود را وارد کنید
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    نام کاربری
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      className="block w-full pr-10 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="نام کاربری خود را وارد کنید"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    رمز عبور
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="block w-full pr-10 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="رمز عبور خود را وارد کنید"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-500 dark:text-gray-400 focus:outline-none"
                      >
                        {showPassword ? (
                          <FiEyeOff className="h-5 w-5" />
                        ) : (
                          <FiEye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {loginError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded-lg text-sm"
                  >
                    {loginError}
                  </motion.div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                      loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <FiLogIn className="ml-2 h-5 w-5" />
                    )}
                    {loading ? 'در حال ورود...' : 'ورود به پنل'}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                نام کاربری: admin | رمز عبور: admin123
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
