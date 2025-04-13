'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { FiMail, FiPhone, FiMapPin, FiSun, FiMoon } from 'react-icons/fi';
import { FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <footer className="w-full mt-auto relative bg-[#2A2C2C]" dir="rtl">
      {/* Theme Toggle - Moved to top for better visibility */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-indigo-700 text-white hover:bg-indigo-600 transition-colors duration-200 flex items-center justify-center"
          aria-label={theme === 'dark' ? 'روشن کردن تم' : 'تاریک کردن تم'}
        >
          {theme === 'dark' ? (
            <FiSun className="h-5 w-5" />
          ) : (
            <FiMoon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Footer Content */}
      <div className="pt-12 text-white" style={{ backgroundColor: '#1C1A47' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 pb-10">
            {/* Column 1: About Us */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 border-b border-indigo-500 pb-2">
                درباره ما
              </h3>
              <p className="text-indigo-100 mb-6 text-sm leading-relaxed">
                یوتیوب کلاب یک پلتفرم آموزشی آنلاین است که با هدف ارتقای سطح
                دانش و مهارت‌های برنامه‌نویسی و طراحی وب در ایران راه‌اندازی شده
                است. ما به شما کمک می‌کنیم تا با آموزش‌های کاربردی و پروژه‌محور،
                مسیر یادگیری خود را سریع‌تر طی کنید.
              </p>
              <div className="flex space-x-4 space-x-reverse">
                <Link
                  href="https://instagram.com/youtubeclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-pink-300 transition-colors p-2 bg-indigo-800 rounded-full"
                  aria-label="Instagram"
                >
                  <FaInstagram className="h-5 w-5" />
                </Link>
                <Link
                  href="https://youtube.com/youtubeclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-red-300 transition-colors p-2 bg-indigo-800 rounded-full"
                  aria-label="YouTube"
                >
                  <FaYoutube className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 border-b border-indigo-500 pb-2">
                دسترسی سریع
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'صفحه اصلی', href: '/' },
                  { name: 'دوره‌های آموزشی', href: '/courses' },
                  { name: 'مقالات', href: '/blog' },
                  { name: 'درباره ما', href: '/about' },
                  { name: 'تماس با ما', href: '/contact' },
                  { name: 'قوانین و مقررات', href: '/terms' },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-indigo-100 hover:text-white transition-colors text-sm flex items-center"
                    >
                      <span className="inline-block w-1.5 h-1.5 bg-indigo-300 rounded-full ml-2"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 border-b border-indigo-500 pb-2">
                اطلاعات تماس
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FiMapPin className="h-5 w-5 text-indigo-300 mt-0.5 ml-3 flex-shrink-0" />
                  <span className="text-indigo-100 text-sm">
                    تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج نگین، طبقه
                    ۱۰، واحد ۱۰۰۵
                  </span>
                </li>
                <li className="flex items-center">
                  <FiPhone className="h-5 w-5 text-indigo-300 ml-3 flex-shrink-0" />
                  <Link
                    href="tel:+982188776655"
                    className="text-indigo-100 hover:text-white transition-colors text-sm"
                  >
                    ۰۲۱-۸۸۷۷۶۶۵۵
                  </Link>
                </li>
                <li className="flex items-center">
                  <FiMail className="h-5 w-5 text-indigo-300 ml-3 flex-shrink-0" />
                  <Link
                    href="mailto:info@youtubeclub.ir"
                    className="text-indigo-100 hover:text-white transition-colors text-sm"
                  >
                    info@youtubeclub.ir
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Trust Badges - UPDATED with centered images on white background */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 border-b border-indigo-500 pb-2">
                نماد های اعتماد
              </h3>
              <div className="flex flex-row md:flex-col gap-4">
                {/* Enamad Logo - Centered on white background */}
                <Link
                  href="https://enamad.ir/verify.aspx?id=123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                  aria-label="نماد اعتماد الکترونیکی"
                >
                  <div className="bg-white rounded-md p-1 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                    <div className="relative w-14 h-14 md:w-18 md:h-18">
                      <Image
                        src="/enamadLogo.webp"
                        alt="نماد اعتماد الکترونیکی"
                        fill
                        sizes="(max-width: 768px) 56px, 72px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </Link>

                {/* ZarinPal Logo - Centered on white background */}
                <Link
                  href="https://www.zarinpal.com/trustlogo/123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                  aria-label="درگاه پرداخت زرین‌پال"
                >
                  <div className="bg-white rounded-md p-1 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                    <div className="relative w-14 h-14 md:w-18 md:h-18">
                      <Image
                        src="/zarinpal-1.webp"
                        alt="درگاه پرداخت زرین‌پال"
                        fill
                        sizes="(max-width: 768px) 56px, 72px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="py-4 border-t border-indigo-700 mt-4">
            <p className="text-center text-sm text-indigo-100">
              © {new Date().getFullYear()} یوتیوب کلاب. تمامی حقوق محفوظ است.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
