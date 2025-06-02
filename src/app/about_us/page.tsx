'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaTelegram,
  FaInstagram,
  FaCheckCircle,
  FaHeadset,
  FaLock,
  FaSync,
  FaBriefcase,
} from 'react-icons/fa';

export default function AboutUs() {
  const [projectCount, setProjectCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const targetCount = 500;

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000; // 2 seconds
          const step = 30; // Update every 30ms
          const increment = Math.ceil(targetCount / (duration / step));

          const timer = setInterval(() => {
            start += increment;
            if (start >= targetCount) {
              setProjectCount(targetCount);
              clearInterval(timer);
            } else {
              setProjectCount(start);
            }
          }, step);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 },
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Banner Section */}
      <div className="relative rounded-lg overflow-hidden mb-8 md:mb-16 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="flex flex-col lg:flex-row min-h-[300px] md:min-h-[400px]">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 md:p-10 text-white order-2 lg:order-1">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center lg:text-right">
              درباره یوتیوب کلاب
            </h1>
            <p className="text-sm md:text-base lg:text-lg leading-relaxed text-center lg:text-right">
              یوتیوب کلاب با هدف آموزش و توسعه مهارت‌های دیجیتال به خصوص در
              زمینه تولید محتوای ویدیویی و یوتیوب تاسیس شده است. ما با ارائه
              دوره‌های آموزشی باکیفیت و پشتیبانی مداوم، به شما کمک می‌کنیم تا در
              مسیر موفقیت گام بردارید.
            </p>
          </div>

          {/* Banner Image */}
          <div className="w-full lg:w-1/2 relative flex items-center justify-center p-6 md:p-10 order-1 lg:order-2">
            <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64">
              <Image
                src="/aboutUs.png"
                alt="یوتیوب کلاب"
                fill
                style={{ objectFit: 'contain', transform: 'scaleX(-1)' }}
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Features Section */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8 md:mb-16" dir="rtl">
        {/* Projects Counter */}
        <div ref={counterRef} className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 text-center h-full border border-gray-100">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-blue-700">
              پروژه تحویل شده
            </h3>
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600">
              +{projectCount}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 h-full border border-gray-100">
            <ul className="space-y-4 md:space-y-6">
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 text-xl md:text-2xl ml-3 flex-shrink-0" />
                <span className="text-base md:text-lg">بالاترین سطح تدریس</span>
              </li>
              <li className="flex items-center">
                <FaHeadset className="text-blue-500 text-xl md:text-2xl ml-3 flex-shrink-0" />
                <span className="text-base md:text-lg">پشتیبانی همیشگی</span>
              </li>
              <li className="flex items-center">
                <FaLock className="text-purple-500 text-xl md:text-2xl ml-3 flex-shrink-0" />
                <span className="text-base md:text-lg">
                  دسترسی همیشگی به دوره و پک ها
                </span>
              </li>
              <li className="flex items-center">
                <FaSync className="text-orange-500 text-xl md:text-2xl ml-3 flex-shrink-0" />
                <span className="text-base md:text-lg">
                  آپدیت همیشگی دوره و پک ها
                </span>
              </li>
              <li className="flex items-center">
                <FaBriefcase className="text-red-500 text-xl md:text-2xl ml-3 flex-shrink-0" />
                <span className="text-base md:text-lg">
                  معرفی های پروژه برای کار
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir="rtl">
        {/* Instagram */}
        <div className="w-full">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg shadow-lg p-6 md:p-8 text-white h-full">
            <div className="flex items-center justify-center mb-6">
              <FaInstagram className="text-4xl md:text-5xl" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-center mb-4">
              اینستاگرام
            </h3>
            <p className="text-center text-sm md:text-base leading-relaxed mb-6">
              اینستاگرام یوتیوب کلاب برای با خبر شدن از جایزه ها و پک های رایگان
            </p>
            <div className="text-center">
              <Link
                href="https://instagram.com/youtubeclub"
                className="inline-block bg-white text-purple-600 px-4 md:px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors text-sm md:text-base"
              >
                دنبال کنید
              </Link>
            </div>
          </div>
        </div>

        {/* Telegram */}
        <div className="w-full">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-lg p-6 md:p-8 text-white h-full">
            <div className="flex items-center justify-center mb-6">
              <FaTelegram className="text-4xl md:text-5xl" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-center mb-4">
              تلگرام
            </h3>
            <p className="text-center text-sm md:text-base leading-relaxed mb-6">
              تلگرام یوتیوب کلاب برای اخبار جدید پک ها و دوره های سایت
            </p>
            <div className="text-center">
              <Link
                href="https://t.me/youtubeclub"
                className="inline-block bg-white text-blue-600 px-4 md:px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors text-sm md:text-base"
              >
                عضویت
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
