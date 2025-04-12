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
    <footer className="w-full mt-auto relative" dir="rtl">
      {/* Wavy Shape Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform -translate-y-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-24"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className={theme === 'dark' ? 'fill-indigo-900' : 'fill-indigo-600'}
          ></path>
        </svg>
      </div>

      {/* Footer Content */}
      <div
        className={`pt-16 ${
          theme === 'dark' ? 'bg-indigo-900' : 'bg-indigo-600'
        } text-white`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
            {/* Column 1: About Us */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">درباره ما</h3>
              <p className="text-indigo-100 mb-4 text-sm leading-relaxed">
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
                  className="text-white hover:text-pink-300 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="h-6 w-6" />
                </Link>
                <Link
                  href="https://youtube.com/youtubeclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-red-300 transition-colors"
                  aria-label="YouTube"
                >
                  <FaYoutube className="h-6 w-6" />
                </Link>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">دسترسی سریع</h3>
              <ul className="space-y-2">
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
                      className="text-indigo-100 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">
                اطلاعات تماس
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FiMapPin className="h-5 w-5 text-indigo-300 mt-0.5 ml-2" />
                  <span className="text-indigo-100 text-sm">
                    تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج نگین، طبقه
                    ۱۰، واحد ۱۰۰۵
                  </span>
                </li>
                <li className="flex items-center">
                  <FiPhone className="h-5 w-5 text-indigo-300 ml-2" />
                  <Link
                    href="tel:+982188776655"
                    className="text-indigo-100 hover:text-white transition-colors text-sm"
                  >
                    ۰۲۱-۸۸۷۷۶۶۵۵
                  </Link>
                </li>
                <li className="flex items-center">
                  <FiMail className="h-5 w-5 text-indigo-300 ml-2" />
                  <Link
                    href="mailto:info@youtubeclub.ir"
                    className="text-indigo-100 hover:text-white transition-colors text-sm"
                  >
                    info@youtubeclub.ir
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Trust Badges */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">
                نماد های اعتماد
              </h3>
              <div className="flex flex-col space-y-4">
                {/* Enamad Logo */}
                <Link
                  href="https://enamad.ir/verify.aspx?id=123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white p-2 rounded-md shadow-sm hover:shadow-md transition-shadow"
                  aria-label="نماد اعتماد الکترونیکی"
                >
                  <div className="relative h-24 w-24">
                    <Image
                      src="/enamadLogo.webp"
                      alt="نماد اعتماد الکترونیکی"
                      fill
                      sizes="96px"
                      className="object-contain"
                    />
                  </div>
                </Link>

                {/* ZarinPal Logo */}
                <Link
                  href="https://www.zarinpal.com/trustlogo/123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white p-2 rounded-md shadow-sm hover:shadow-md transition-shadow"
                  aria-label="درگاه پرداخت زرین‌پال"
                >
                  <div className="relative h-24 w-24">
                    <Image
                      src="/zarinpal-1.webp"
                      alt="درگاه پرداخت زرین‌پال"
                      fill
                      sizes="96px"
                      className="object-contain"
                    />
                  </div>
                </Link>

                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center space-x-2 space-x-reverse mt-4 text-white hover:text-indigo-200 transition-colors"
                  aria-label={
                    theme === 'dark' ? 'روشن کردن تم' : 'تاریک کردن تم'
                  }
                >
                  {theme === 'dark' ? (
                    <>
                      <FiSun className="h-5 w-5" />
                      <span className="text-sm">تم روشن</span>
                    </>
                  ) : (
                    <>
                      <FiMoon className="h-5 w-5" />
                      <span className="text-sm">تم تاریک</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="py-6 border-t border-indigo-500 dark:border-indigo-800">
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
