'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiChevronDown,
  FiUser,
  FiMenu,
  FiX,
  FiSearch,
  FiShoppingCart,
} from 'react-icons/fi';
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
  {
    name: 'خانه',
    href: '/',
    dropdown: [
      { name: 'حساب کاربری', href: '/home/sub1' },
      { name: 'آشنایی باتیم', href: '/about_us' },
    ],
  },
  {
    name: 'طراحی',
    href: '/courses',
    dropdown: [
      { name: 'پک های رایگان طراحی', href: '/free_design_packs' },
      { name: 'آموزش رایگان طراحی', href: '/free_design_tutorial' },
    ],
  },
  {
    name: 'ادیت',
    href: '/blog',
    dropdown: [
      { name: 'پک های رایگان ادیت', href: '/free_edit_packs' },
      { name: 'آموزش های رایگان ادیت', href: '/free_edit_thumbnails' },
    ],
  },
  {
    name: 'محصولات',
    href: '/products',
    dropdown: [
      { name: 'پک ها', href: '/edit_packs' },
      { name: 'دوره آموزشی', href: '/training_courses' },
      { name: 'خدمات طراحی و ادیت', href: '/design_and_editing_services' },
    ],
  },
  {
    name: 'کسب و کار',
    href: '/contact',
    dropdown: [
      { name: ' مشاغل یوتیوب', href: '/job_finder' },
      { name: 'اشتراک ویژه', href: '/price_plan' },
    ],
  },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <div className="flex justify-center mt-5">
      <nav
        className="z-50 bg-[#353737] shadow-[5px_5px_15px_rgba(0,0,0,0.3)] rounded-[30px] w-[1529px] h-[100px]"
        dir="rtl"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo - Right Side */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center" onClick={closeMenu}>
                <span className="mr-2 text-2xl font-bold text-white">
                  یتویب <span className="text-[#468FD5]">کلاب</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links - Center */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex space-x-4 space-x-reverse">
                {navLinks.map((link, index) => (
                  <div key={index} className="relative group">
                    <button
                      className={`px-3 py-2 rounded-md text-base font-medium flex items-center transition-colors
                        ${
                          isActive(link.href)
                            ? 'text-gray '
                            : 'text-gray-300 hover:bg-gray-700'
                        }`}
                      aria-expanded={
                        activeDropdown === index ? 'true' : 'false'
                      }
                    >
                      {link.name}
                      {link.dropdown && (
                        <RiArrowDropDownLine
                          className="mr-1 h-6 w-6 transition-transform"
                          aria-hidden="true"
                        />
                      )}
                    </button>

                    {link.dropdown && (
                      <div
                        className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-[#282A2A] ring-1 ring-black ring-opacity-5 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        <div className="py-1" role="none">
                          {link.dropdown.map((item, idx) => (
                            <Link
                              key={idx}
                              href={item.href}
                              className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                              onClick={closeMenu}
                              role="menuitem"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Auth Buttons and Icons - Left Side */}
            <div className="hidden md:flex items-center">
              <Link
                href="/auth"
                className="px-5 py-2.5 text-base font-medium text-white bg-[#175299] rounded-xl hover:bg-[#0f3f77] focus:outline-none shadow-inner shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] flex items-center transition-colors mr-8"
              >
                <FiUser className="ml-2 h-5 w-5" aria-hidden="true" />
                ورود / ثبت نام
              </Link>
              <div className="flex items-center space-x-6 space-x-reverse">
                <FiShoppingCart className="h-7 w-7 text-white cursor-pointer" />
                <FiSearch className="h-7 w-7 text-white cursor-pointer" />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
                      className={`w-full text-right px-3 py-2 rounded-md text-lg font-medium flex items-center justify-between
                        ${
                          isActive(link.href)
                            ? 'text-indigo-400'
                            : 'text-gray-300 hover:bg-gray-700'
                        }`}
                      aria-expanded={
                        activeDropdown === index ? 'true' : 'false'
                      }
                    >
                      {link.name}
                      {link.dropdown && (
                        <FiChevronDown
                          className={`h-5 w-5 transition-transform ${
                            activeDropdown === index
                              ? 'transform rotate-180'
                              : ''
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
                            className="block px-3 py-2 rounded-md text-lg font-medium text-gray-400 hover:bg-gray-700"
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
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center justify-between px-5">
                  <Link
                    href="/auth"
                    className="px-5 py-2.5 text-base font-medium text-white bg-[#175299] rounded-xl hover:bg-[#0f3f77] focus:outline-none shadow-inner shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] flex items-center transition-colors mr-4"
                    onClick={closeMenu}
                  >
                    <FiUser className="ml-2 h-5 w-5" aria-hidden="true" />
                    ورود / ثبت نام
                  </Link>
                  <div className="flex items-center space-x-6 space-x-reverse">
                    <FiShoppingCart className="h-7 w-7 text-white" />
                    <FiSearch className="h-7 w-7 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;
