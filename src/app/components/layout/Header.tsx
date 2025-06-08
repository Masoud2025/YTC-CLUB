/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  FiLogOut,
  FiHome,
  FiPackage,
  FiBriefcase,
} from 'react-icons/fi';
import { RiArrowDropDownLine } from 'react-icons/ri';
import './font.css';

type DropdownItem = {
  name: string;
  href: string;
};

type NavLink = {
  name: string;
  href: string;
  dropdown?: DropdownItem[];
  icon?: React.ReactNode;
};

interface UserData {
  name: string;
  phone: string;
  timestamp: number;
}

const navLinks: NavLink[] = [
  {
    name: 'خانه',
    href: '/',
    icon: <FiHome className="w-5 h-5" />,
    dropdown: [
      { name: 'حساب کاربری', href: '/login' },
      { name: 'آشنایی باتیم', href: '/about_us' },
    ],
  },
  {
    name: 'طراحی',
    href: '/courses',
    icon: <FiPackage className="w-5 h-5" />,
    dropdown: [
      { name: 'پک های رایگان طراحی', href: '/free_design_packs' },
      { name: 'آموزش رایگان طراحی', href: '/free_design_tutorial' },
    ],
  },
  {
    name: 'ادیت',
    href: '/blog',
    icon: <FiPackage className="w-5 h-5" />,
    dropdown: [
      { name: 'پک های رایگان ادیت', href: '/free_edit_packs' },
      { name: 'آموزش های رایگان ادیت', href: '/free_edit_thumbnails' },
    ],
  },
  {
    name: 'محصولات',
    href: '/products',
    icon: <FiPackage className="w-5 h-5" />,
    dropdown: [
      { name: 'پک ها', href: '/edit_packs' },
      { name: 'دوره آموزشی', href: '/training_courses' },
      { name: 'خدمات طراحی و ادیت', href: '/design_and_editing_services' },
    ],
  },
  {
    name: 'کسب و کار',
    href: '/contact',
    icon: <FiBriefcase className="w-5 h-5" />,
    dropdown: [
      { name: ' مشاغل یوتیوب', href: '/job_finder' },
      { name: 'اشتراک ویژه', href: '/price_plan' },
    ],
  },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const pathname = usePathname();

  // User authentication states
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState<boolean>(false);

  // Search functionality states
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<
    { text: string; node: Node; count: number }[]
  >([]);
  const [currentResultIndex, setCurrentResultIndex] = useState<number>(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [highlightedElements, setHighlightedElements] = useState<HTMLElement[]>(
    [],
  );

  // Check for user data in localStorage on component mount
  useEffect(() => {
    const checkUserData = () => {
      try {
        const savedUserData = localStorage.getItem('USER_DATA');
        if (savedUserData) {
          const parsedUserData: UserData = JSON.parse(savedUserData);
          setUserData(parsedUserData);
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('USER_DATA');
      }
    };

    checkUserData();

    // Listen for storage changes (in case user logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'USER_DATA') {
        checkUserData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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

  // Focus search input when search modal opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Add keyboard shortcuts for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close search on Escape
      if (e.key === 'Escape' && isSearchOpen) {
        handleCloseSearch();
      }

      // Navigate results with arrow keys
      if (isSearchOpen && searchResults.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          navigateResults('next');
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          navigateResults('prev');
        }
      }

      // Open search with Ctrl+F or Cmd+F
      if ((e.ctrlKey || e.metaKey) && e.key === 'f' && !isSearchOpen) {
        e.preventDefault();
        handleOpenSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, searchResults, currentResultIndex]);

  // Clean up highlights when search is closed
  useEffect(() => {
    return () => {
      clearHighlights();
    };
  }, []);

  const toggleDropdown = (index: number): void => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const closeMenu = (): void => {
    setIsOpen(false);
    setActiveDropdown(null);
    setIsUserDropdownOpen(false);
  };

  const isActive = (href: string): boolean => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Handle user logout
  const handleLogout = (): void => {
    try {
      localStorage.removeItem('USER_DATA');
      setUserData(null);
      closeMenu();
      // Optionally redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Get first name from full name
  const getFirstName = (fullName: string): string => {
    return fullName.split(' ')[0];
  };

  const handleOpenSearch = (): void => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = (): void => {
    setIsSearchOpen(false);
    setSearchTerm('');
    clearHighlights();
    setSearchResults([]);
    setCurrentResultIndex(0);
  };

  const clearHighlights = (): void => {
    // Remove all highlighted elements
    highlightedElements.forEach(el => {
      const parent = el.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent || ''), el);
        parent.normalize(); // Merge adjacent text nodes
      }
    });
    setHighlightedElements([]);
  };

  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    // Clear previous highlights
    clearHighlights();

    // Get all text nodes in the document
    const textNodes: Node[] = [];
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          // Skip script and style elements
          if (
            node.parentNode &&
            ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'INPUT'].includes(
              (node.parentNode as Element).tagName,
            )
          ) {
            return NodeFilter.FILTER_REJECT;
          }

          // Accept non-empty text nodes
          if (node.textContent && node.textContent.trim().length > 0) {
            return NodeFilter.FILTER_ACCEPT;
          }

          return NodeFilter.FILTER_SKIP;
        },
      },
    );

    let currentNode: Node | null;
    while ((currentNode = walker.nextNode())) {
      textNodes.push(currentNode);
    }

    // Find matches
    const results: { text: string; node: Node; count: number }[] = [];
    const searchTermLower = searchTerm.toLowerCase();

    textNodes.forEach(node => {
      const text = node.textContent || '';
      const textLower = text.toLowerCase();
      let count = 0;
      let index = textLower.indexOf(searchTermLower);

      while (index !== -1) {
        count++;
        index = textLower.indexOf(searchTermLower, index + 1);
      }

      if (count > 0) {
        results.push({ text, node, count });
      }
    });

    // Set search results
    setSearchResults(results);

    // Highlight all results
    const newHighlightedElements: HTMLElement[] = [];
    results.forEach(result => {
      const newElements = highlightTextInNode(result.node, searchTerm);
      newHighlightedElements.push(...newElements);
    });
    setHighlightedElements(newHighlightedElements);

    // Focus on first result if any
    if (results.length > 0) {
      setCurrentResultIndex(0);
      scrollToResult(0);
    }
  };

  const highlightTextInNode = (
    node: Node,
    searchText: string,
  ): HTMLElement[] => {
    const text = node.textContent || '';
    const parent = node.parentNode;
    if (!parent) return [];

    const highlightedElements: HTMLElement[] = [];
    const searchTextLower = searchText.toLowerCase();
    const textLower = text.toLowerCase();

    // If no match or parent is not valid, return empty array
    if (textLower.indexOf(searchTextLower) === -1) return [];

    // Create a document fragment to hold the new nodes
    const fragment = document.createDocumentFragment();

    let lastIndex = 0;
    let index = textLower.indexOf(searchTextLower);

    while (index !== -1) {
      // Add text before the match
      if (index > lastIndex) {
        fragment.appendChild(
          document.createTextNode(text.substring(lastIndex, index)),
        );
      }

      // Create highlighted span for the match
      const matchText = text.substring(index, index + searchText.length);
      const highlightSpan = document.createElement('span');
      highlightSpan.textContent = matchText;
      highlightSpan.className = 'bg-yellow-300 text-black px-0.5 rounded';
      highlightSpan.dataset.searchHighlight = 'true';

      fragment.appendChild(highlightSpan);
      highlightedElements.push(highlightSpan);

      lastIndex = index + searchText.length;
      index = textLower.indexOf(searchTextLower, lastIndex);
    }

    // Add remaining text
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
    }

    // Replace the original node with the fragment
    parent.replaceChild(fragment, node);

    return highlightedElements;
  };

  const scrollToResult = (index: number): void => {
    if (index >= 0 && index < highlightedElements.length) {
      const element = highlightedElements[index];

      // Update highlight styles
      highlightedElements.forEach((el, i) => {
        if (i === index) {
          el.className = 'bg-orange-500 text-white px-0.5 rounded';
        } else {
          el.className = 'bg-yellow-300 text-black px-0.5 rounded';
        }
      });

      // Scroll element into view
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const navigateResults = (direction: 'next' | 'prev'): void => {
    if (highlightedElements.length === 0) return;

    let newIndex = currentResultIndex;

    if (direction === 'next') {
      newIndex = (currentResultIndex + 1) % highlightedElements.length;
    } else {
      newIndex =
        (currentResultIndex - 1 + highlightedElements.length) %
        highlightedElements.length;
    }

    setCurrentResultIndex(newIndex);
    scrollToResult(newIndex);
  };

  // Animation variants for mobile menu
  const sidebarVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: '0%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const menuItemVariants = {
    closed: {
      x: 50,
      opacity: 0,
    },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    }),
  };

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 },
  };

  return (
    <div className="flex justify-center mt-2 sm:mt-3 md:mt-5 px-2 sm:px-4">
      <nav
        className={`fixed top-2 sm:top-3 md:top-5 z-50 bg-[#353737] shadow-[5px_5px_15px_rgba(0,0,0,0.3)] rounded-[12px] sm:rounded-[20px] md:rounded-[30px] w-full max-w-[calc(100%-16px)] sm:max-w-[calc(100%-32px)] md:max-w-[1490px] h-[50px] sm:h-[60px] md:h-[85px] lg:h-[100px] transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        dir="rtl"
      >
        <div className="mx-auto px-2 sm:px-4 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo - Right Side */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="LOGO flex items-center"
                onClick={closeMenu}
              >
                <span
                  id="testFont"
                  className="mr-1 text-[14px] xs:text-[16px] sm:text-sm md:text-lg lg:text-2xl whitespace-nowrap"
                >
                  <span id="testFont" className="text-white">
                    یوتیوب{' '}
                  </span>
                  <span id="testFont" className="text-[#468FD5]">
                    کلاب
                  </span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links - Center */}
            <div className="hidden md:flex items-center justify-center flex-1 px-4">
              <div className="flex space-x-1 lg:space-x-3 xl:space-x-4 space-x-reverse">
                {navLinks.map((link, index) => (
                  <div key={index} className="relative group">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-1.5 lg:px-2 xl:px-3 py-2 rounded-md text-xs lg:text-sm xl:text-base font-medium flex items-center transition-all duration-300 whitespace-nowrap
                        ${
                          isActive(link.href)
                            ? 'text-white bg-gray-700 shadow-lg'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                      aria-expanded={
                        activeDropdown === index ? 'true' : 'false'
                      }
                    >
                      {link.name}
                      {link.dropdown && (
                        <motion.div
                          variants={iconVariants}
                          initial="closed"
                          animate={activeDropdown === index ? 'open' : 'closed'}
                          transition={{ duration: 0.3 }}
                        >
                          <RiArrowDropDownLine
                            className="mr-0.5 h-4 w-4 lg:h-5 lg:w-5"
                            aria-hidden="true"
                          />
                        </motion.div>
                      )}
                    </motion.button>

                    {link.dropdown && (
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: { duration: 0.2 },
                          }}
                          exit={{
                            opacity: 0,
                            y: -10,
                            scale: 0.95,
                            transition: { duration: 0.15 },
                          }}
                          className="absolute right-0 mt-1 w-48 rounded-xl shadow-xl bg-[#282A2A] ring-1 ring-black ring-opacity-5 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                          role="menu"
                          aria-orientation="vertical"
                        >
                          <div className="py-2" role="none">
                            {link.dropdown.map((item, idx) => (
                              <motion.div
                                key={idx}
                                whileHover={{ x: 5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                              >
                                <Link
                                  href={item.href}
                                  className="block px-4 py-2 text-sm lg:text-base text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 rounded-lg mx-2"
                                  onClick={closeMenu}
                                  role="menuitem"
                                >
                                  {item.name}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Auth Buttons and Icons - Left Side */}
            <div className="flex items-center">
              {/* User Authentication Section */}
              {userData ? (
                // User is logged in - show user name with dropdown
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="px-2 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 lg:py-2.5 ml-2 sm:ml-3 md:ml-4 lg:ml-6 text-[10px] xs:text-xs sm:text-sm md:text-base font-medium text-white bg-gradient-to-r from-[#175299] to-[#468FD5] rounded-md sm:rounded-lg md:rounded-xl hover:from-[#0f3f77] hover:to-[#175299] focus:outline-none shadow-lg flex items-center transition-all duration-300"
                  >
                    <FiUser
                      className="ml-1 h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-5 lg:w-5"
                      aria-hidden="true"
                    />
                    <span className="max-w-[60px] sm:max-w-[80px] md:max-w-[100px] lg:max-w-[120px] truncate">
                      {getFirstName(userData.name)}
                    </span>
                    <motion.div
                      variants={iconVariants}
                      animate={isUserDropdownOpen ? 'open' : 'closed'}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronDown className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                    </motion.div>
                  </motion.button>

                  {/* User Dropdown Menu */}
                  <AnimatePresence>
                    {isUserDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-48 rounded-xl shadow-xl bg-[#282A2A] ring-1 ring-black ring-opacity-5 z-10"
                        role="menu"
                      >
                        <div className="py-2" role="none">
                          <div className="px-4 py-2 text-sm text-white border-b border-gray-600 mx-2 rounded-lg">
                            <p className="font-medium truncate">
                              {userData.name}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              {userData.phone}
                            </p>
                          </div>
                          <motion.div whileHover={{ x: 5 }}>
                            <Link
                              href="/profile"
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 rounded-lg mx-2 mt-2"
                              onClick={closeMenu}
                              role="menuitem"
                            >
                              پروفایل کاربری
                            </Link>
                          </motion.div>
                          <motion.div whileHover={{ x: 5 }}>
                            <Link
                              href="/dashboard"
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 rounded-lg mx-2"
                              onClick={closeMenu}
                              role="menuitem"
                            >
                              داشبورد
                            </Link>
                          </motion.div>
                          <motion.div whileHover={{ x: 5 }}>
                            <button
                              onClick={handleLogout}
                              className="w-full text-right px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all duration-200 flex items-center rounded-lg mx-2"
                              role="menuitem"
                            >
                              <FiLogOut className="ml-2 h-4 w-4" />
                              خروج از حساب
                            </button>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                // User is not logged in - show login button
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/login"
                    className="px-2 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 lg:py-2.5 ml-2 sm:ml-3 md:ml-4 lg:ml-6 text-[10px] xs:text-xs sm:text-sm md:text-base font-medium text-white bg-gradient-to-r from-[#175299] to-[#468FD5] rounded-md sm:rounded-lg md:rounded-xl hover:from-[#0f3f77] hover:to-[#175299] focus:outline-none shadow-lg flex items-center transition-all duration-300 whitespace-nowrap"
                  >
                    <FiUser
                      className="ml-1 h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-5 lg:w-5"
                      aria-hidden="true"
                    />
                    <span className="hidden xs:inline">ورود / ثبت نام</span>
                    <span className="xs:hidden">ورود</span>
                  </Link>
                </motion.div>
              )}

              {/* Desktop icons with improved spacing */}
              <div className="hidden md:flex items-center space-x-3 lg:space-x-4 xl:space-x-6 space-x-reverse">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-gray-700 transition-all duration-300"
                  aria-label="سبد خرید"
                >
                  <FiShoppingCart className="h-5 w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 text-white hover:text-gray-300 transition-colors" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleOpenSearch}
                  className="p-2 rounded-full hover:bg-gray-700 transition-all duration-300"
                  aria-label="جستجو"
                >
                  <FiSearch className="h-5 w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 text-white hover:text-gray-300 transition-colors" />
                </motion.button>
              </div>

              {/* Mobile icons and menu button */}
              <div className="flex md:hidden items-center space-x-2 sm:space-x-3 space-x-reverse">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 rounded-md hover:bg-gray-700 transition-all duration-300"
                  aria-label="سبد خرید"
                >
                  <FiShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleOpenSearch}
                  className="p-1 rounded-md hover:bg-gray-700 transition-all duration-300"
                  aria-label="جستجو"
                >
                  <FiSearch className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </motion.button>

                {/* Mobile hamburger menu */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-300"
                  aria-expanded={isOpen ? 'true' : 'false'}
                  aria-controls="mobile-menu"
                >
                  <span className="sr-only">
                    {isOpen ? 'بستن منو' : 'باز کردن منو'}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isOpen ? (
                      <FiX
                        className="block h-5 w-5 sm:h-6 sm:w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <FiMenu
                        className="block h-5 w-5 sm:h-6 sm:w-6"
                        aria-hidden="true"
                      />
                    )}
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu - Sliding from right */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={closeMenu}
            />

            {/* Mobile sidebar */}
            <motion.div
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#353737] shadow-2xl z-50 md:hidden"
              dir="rtl"
            >
              {/* Header with logo and close button */}
              <div className="flex items-center justify-between p-6 border-b border-gray-600">
                <div className="flex items-center">
                  <span id="testFont" className="text-lg font-bold">
                    <span className="text-white">یوتیوب </span>
                    <span className="text-[#468FD5]">کلاب</span>
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeMenu}
                  className="p-2 rounded-full hover:bg-gray-700 transition-all duration-300"
                >
                  <FiX className="h-6 w-6 text-white" />
                </motion.button>
              </div>

              {/* Navigation items */}
              <div className="flex-1 overflow-y-auto py-6">
                <div className="px-4 space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      variants={menuItemVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="space-y-1"
                    >
                      <motion.button
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => link.dropdown && toggleDropdown(index)}
                        className={`w-full text-right px-4 py-3 rounded-xl font-medium flex items-center justify-between transition-all duration-300 ${
                          isActive(link.href)
                            ? 'text-white bg-gradient-to-r from-[#175299] to-[#468FD5] shadow-lg'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                        aria-expanded={
                          activeDropdown === index ? 'true' : 'false'
                        }
                      >
                        <div className="flex items-center">
                          <span className="ml-3 text-[#468FD5]">
                            {link.icon}
                          </span>
                          <span className="text-base">{link.name}</span>
                        </div>
                        {link.dropdown && (
                          <motion.div
                            variants={iconVariants}
                            animate={
                              activeDropdown === index ? 'open' : 'closed'
                            }
                            transition={{ duration: 0.3 }}
                          >
                            <FiChevronDown className="h-5 w-5" />
                          </motion.div>
                        )}
                      </motion.button>

                      {/* Dropdown items */}
                      <AnimatePresence>
                        {link.dropdown && activeDropdown === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden bg-gray-800 rounded-xl ml-4 mt-2"
                          >
                            {link.dropdown.map((item, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <Link
                                  href={item.href}
                                  className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 border-b border-gray-700 last:border-b-0"
                                  onClick={closeMenu}
                                >
                                  <span className="mr-2">•</span>
                                  {item.name}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                {/* User section in mobile menu */}
                {userData && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 mx-4 p-4 bg-gray-800 rounded-xl border border-gray-600"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#175299] to-[#468FD5] rounded-full flex items-center justify-center ml-3">
                        <FiUser className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {userData.name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {userData.phone}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <motion.div whileHover={{ x: 5 }}>
                        <Link
                          href="/profile"
                          className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 rounded-lg"
                          onClick={closeMenu}
                        >
                          پروفایل کاربری
                        </Link>
                      </motion.div>
                      <motion.div whileHover={{ x: 5 }}>
                        <Link
                          href="/dashboard"
                          className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 rounded-lg"
                          onClick={closeMenu}
                        >
                          داشبورد
                        </Link>
                      </motion.div>
                      <motion.div whileHover={{ x: 5 }}>
                        <button
                          onClick={handleLogout}
                          className="w-full text-right px-3 py-2 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all duration-200 flex items-center rounded-lg"
                        >
                          <FiLogOut className="ml-2 h-4 w-4" />
                          خروج از حساب
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Action buttons in mobile menu */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 mx-4 space-y-3"
                >
                  {!userData && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href="/login"
                        className="w-full bg-gradient-to-r from-[#175299] to-[#468FD5] text-white font-medium py-3 px-4 rounded-xl hover:from-[#0f3f77] hover:to-[#175299] transition-all duration-300 flex items-center justify-center shadow-lg"
                        onClick={closeMenu}
                      >
                        <FiUser className="ml-2 h-5 w-5" />
                        ورود / ثبت نام
                      </Link>
                    </motion.div>
                  )}

                  <div className="flex space-x-3 space-x-reverse">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-gray-700 text-white font-medium py-3 px-4 rounded-xl hover:bg-gray-600 transition-all duration-300 flex items-center justify-center"
                      aria-label="سبد خرید"
                    >
                      <FiShoppingCart className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleOpenSearch}
                      className="flex-1 bg-gray-700 text-white font-medium py-3 px-4 rounded-xl hover:bg-gray-600 transition-all duration-300 flex items-center justify-center"
                      aria-label="جستجو"
                    >
                      <FiSearch className="h-5 w-5" />
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-20 z-50"
              onClick={handleCloseSearch}
            />

            {/* Search bar at the top */}
            <motion.div
              initial={{ y: -100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -100, opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.4,
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl z-50"
            >
              <div className="bg-[#353737] rounded-2xl shadow-2xl overflow-hidden mx-4">
                <div className="p-3 sm:p-4 md:p-5">
                  <form onSubmit={handleSearch} className="relative">
                    <motion.input
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                      ref={searchInputRef}
                      type="text"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      placeholder="جستجو در صفحه..."
                      className="w-full bg-[#282A2A] text-white px-4 py-3 sm:py-3.5 pr-10 sm:pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#468FD5] text-sm sm:text-base transition-all duration-300"
                      dir="rtl"
                    />
                    <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 space-x-reverse">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => navigateResults('prev')}
                        className="text-gray-400 hover:text-white p-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-md hover:bg-gray-700"
                        disabled={highlightedElements.length === 0}
                        aria-label="نتیجه قبلی"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => navigateResults('next')}
                        className="text-gray-400 hover:text-white p-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-md hover:bg-gray-700"
                        disabled={highlightedElements.length === 0}
                        aria-label="نتیجه بعدی"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="submit"
                        className="text-[#468FD5] hover:text-blue-400 p-1 transition-colors rounded-md hover:bg-gray-700"
                        aria-label="جستجو"
                      >
                        <FiSearch className="h-4 w-4" />
                      </motion.button>
                    </div>
                    <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={handleCloseSearch}
                        className="text-gray-400 hover:text-white transition-all duration-300 p-1 rounded-md hover:bg-gray-700"
                        aria-label="بستن جستجو"
                      >
                        <FiX className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </form>
                </div>

                {/* Search results counter */}
                <AnimatePresence>
                  {highlightedElements.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 py-3 bg-[#282A2A] border-t border-gray-600 text-gray-300 text-xs sm:text-sm flex justify-between items-center"
                    >
                      <span className="font-medium">
                        {currentResultIndex + 1} از {highlightedElements.length}{' '}
                        نتیجه
                      </span>
                      <span className="text-[#468FD5]">
                        {searchResults.reduce(
                          (total, result) => total + result.count,
                          0,
                        )}{' '}
                        مورد یافت شد
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* No results message */}
                <AnimatePresence>
                  {searchTerm && searchResults.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 py-3 bg-[#282A2A] border-t border-gray-600 text-gray-400 text-xs sm:text-sm text-center"
                    >
                      <div className="flex items-center justify-center">
                        <FiSearch className="ml-2 h-4 w-4" />
                        نتیجه‌ای یافت نشد
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
