'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { IoLogoYoutube } from 'react-icons/io5';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { RiArrowDropDownLine } from 'react-icons/ri';

type DropdownItem = {
  name: string;
  href: string;
};

type NavLink = {
  name: string;
  href: string;
  dropdown?: DropdownItem[];
};

const navLinks: NavLink[] = [
  { name: 'صفحه اصلی', href: '/' },
  {
    name: 'دوره‌ها',
    href: '/courses',
    dropdown: [
      { name: 'برنامه نویسی وب', href: '/courses/web' },
      { name: 'هوش مصنوعی', href: '/courses/ai' },
      { name: 'طراحی رابط کاربری', href: '/courses/ui' },
    ],
  },
  { name: 'مقالات', href: '/blog' },
  {
    name: 'خدمات',
    href: '/services',
    dropdown: [
      { name: 'مشاوره', href: '/services/consulting' },
      { name: 'آموزش خصوصی', href: '/services/private-training' },
    ],
  },
  { name: 'تماس با ما', href: '/contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const pathname = usePathname();

  // Handle navbar visibility on scroll
  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleDropdown = (index: number): void => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const closeMenu = (): void => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const isActive = (href: string): boolean => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Right Side */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center" onClick={closeMenu}>
              <IoLogoYoutube
                className="h-8 w-8 text-red-600"
                aria-hidden="true"
              />
              <span className="mr-2 text-xl font-bold text-gray-800 dark:text-white">
                یوتیوب کلاب
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links - Center */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-4 space-x-reverse">
              {navLinks.map((link, index) => (
                <div key={index} className="relative group">
                  <button
                    onClick={() => link.dropdown && toggleDropdown(index)}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors
                      ${
                        isActive(link.href)
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    aria-expanded={activeDropdown === index ? 'true' : 'false'}
                  >
                    {link.name}
                    {link.dropdown && (
                      <RiArrowDropDownLine
                        className={`mr-1 h-5 w-5 transition-transform ${
                          activeDropdown === index ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </button>

                  {link.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === index && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10"
                          role="menu"
                          aria-orientation="vertical"
                        >
                          <div className="py-1" role="none">
                            {link.dropdown.map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                onClick={closeMenu}
                                role="menuitem"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Auth Buttons - Left Side */}
          <div className="hidden md:flex items-center">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center ml-4 transition-colors"
            >
              <FiUser className="ml-1" aria-hidden="true" />
              ورود
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center transition-colors"
            >
              <HiOutlineUserAdd className="ml-1" aria-hidden="true" />
              ثبت نام
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded={isOpen ? 'true' : 'false'}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">
                {isOpen ? 'بستن منو' : 'باز کردن منو'}
              </span>
              {isOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link, index) => (
                <div key={index}>
                  <button
                    onClick={() => link.dropdown && toggleDropdown(index)}
                    className={`w-full text-right px-3 py-2 rounded-md text-base font-medium flex items-center justify-between
                      ${
                        isActive(link.href)
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    aria-expanded={activeDropdown === index ? 'true' : 'false'}
                  >
                    {link.name}
                    {link.dropdown && (
                      <FiChevronDown
                        className={`h-4 w-4 transition-transform ${
                          activeDropdown === index ? 'transform rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </button>

                  {link.dropdown && activeDropdown === index && (
                    <div className="pr-6 mt-1 space-y-1" role="menu">
                      {link.dropdown.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                          onClick={closeMenu}
                          role="menuitem"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between px-5">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center transition-colors"
                  onClick={closeMenu}
                >
                  <FiUser className="ml-1" aria-hidden="true" />
                  ورود
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center transition-colors"
                  onClick={closeMenu}
                >
                  <HiOutlineUserAdd className="ml-1" aria-hidden="true" />
                  ثبت نام
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
