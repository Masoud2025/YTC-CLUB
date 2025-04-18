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
} from 'react-icons/fi';
import { RiArrowDropDownLine } from 'react-icons/ri';
// import { morabba } from '../../font';
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
      { name: 'حساب کاربری', href: '/login' },
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
  };

  const isActive = (href: string): boolean => {
    return pathname === href || pathname.startsWith(`${href}/`);
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

  return (
    <div className="flex justify-center mt-5">
      <nav
        className="z-50 bg-[#353737] shadow-[5px_5px_15px_rgba(0,0,0,0.3)] rounded-[30px] w-[1529px] h-[100px]"
        dir="rtl"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo - Right Side with Hamburger Menu */}
            <div className="flex-shrink-0 flex items-center">
              {/* Mobile menu button on the right side */}
              <div className="md:hidden flex items-center ml-2">
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

              <Link href="/" className="flex items-center" onClick={closeMenu}>
                <span className="mr-2 text-2xl">
                  <span className={`font-black text-white`}>یوتیوب</span>{' '}
                  <span className={` font-bold text-[#468FD5]`}>کلاب</span>
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
            <div className="flex items-center">
              {/* Login button visible on both mobile and desktop */}
              <Link
                href="/login"
                className="px-5 py-2.5 text-base font-medium text-white bg-[#175299] rounded-xl hover:bg-[#0f3f77] focus:outline-none shadow-inner shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] flex items-center transition-colors mr-4 md:mr-8"
              >
                <FiUser className="ml-2 h-5 w-5" aria-hidden="true" />
                <span className="hidden xs:inline">ورود / ثبت نام</span>
                <span className="xs:hidden">ورود</span>
              </Link>

              {/* Desktop icons */}
              <div className="hidden md:flex items-center space-x-6 space-x-reverse">
                <FiShoppingCart className="h-7 w-7 text-white cursor-pointer" />
                <FiSearch
                  className="h-7 w-7 text-white cursor-pointer"
                  onClick={handleOpenSearch}
                />
              </div>

              {/* Mobile icons */}
              <div className="flex md:hidden items-center space-x-4 space-x-reverse">
                <FiShoppingCart className="h-6 w-6 text-white cursor-pointer" />
                <FiSearch
                  className="h-6 w-6 text-white cursor-pointer"
                  onClick={handleOpenSearch}
                />
              </div>
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
              className="md:hidden bg-[#353737]" // Added background color to the mobile menu
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
                      <div
                        className="bg-[#282A2A] rounded-md mt-1 mb-2"
                        role="menu"
                      >
                        {' '}
                        {/* Added background color to dropdown items */}
                        {link.dropdown.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            className="block px-6 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 border-b border-gray-700 last:border-b-0"
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
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Modal - Very light overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Very light overlay - almost transparent */}
            <div
              className="fixed inset-0 bg-transparent z-50"
              onClick={handleCloseSearch}
            />

            {/* Search bar at the top */}
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50"
            >
              <div className="bg-[#353737] rounded-xl shadow-lg overflow-hidden mx-4">
                <div className="p-4">
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      placeholder="جستجو در صفحه..."
                      className="w-full bg-[#282A2A] text-white px-4 py-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      dir="rtl"
                    />
                    <div className="absolute left-4 top-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => navigateResults('prev')}
                        className="text-gray-400 hover:text-white p-1 mr-1"
                        disabled={highlightedElements.length === 0}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
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
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateResults('next')}
                        className="text-gray-400 hover:text-white p-1 mr-1"
                        disabled={highlightedElements.length === 0}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
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
                      </button>
                      <button
                        type="submit"
                        className="text-blue-500 hover:text-blue-400 p-1"
                      >
                        <FiSearch className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="absolute right-4 top-3">
                      <button
                        type="button"
                        onClick={handleCloseSearch}
                        className="text-gray-400 hover:text-white"
                      >
                        <FiX className="h-5 w-5" />
                      </button>
                    </div>
                  </form>
                </div>

                {/* Search results counter */}
                {highlightedElements.length > 0 && (
                  <div className="px-4 py-2 bg-[#282A2A] text-gray-300 text-sm flex justify-between items-center">
                    <span>
                      {currentResultIndex + 1} از {highlightedElements.length}{' '}
                      نتیجه
                    </span>
                    <span>
                      {searchResults.reduce(
                        (total, result) => total + result.count,
                        0,
                      )}{' '}
                      مورد یافت شد
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
