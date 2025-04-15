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
    <div className="container mx-auto px-4 py-8">
      {/* Banner Section */}
      <div
        className="relative rounded-lg overflow-hidden mb-16"
        style={{
          width: '1154px',
          height: '356px',
          maxWidth: '100%',
          margin: '0 auto',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 z-0"></div>

        <div className="flex h-full relative z-10">
          {/* Text Content */}
          <div className="w-1/2 flex flex-col justify-center p-10 text-white">
            <h1 className="text-4xl font-bold mb-4">درباره یوتیوب کلاب</h1>
            <p className="text-lg">
              یوتیوب کلاب با هدف آموزش و توسعه مهارت‌های دیجیتال به خصوص در
              زمینه تولید محتوای ویدیویی و یوتیوب تاسیس شده است. ما با ارائه
              دوره‌های آموزشی باکیفیت و پشتیبانی مداوم، به شما کمک می‌کنیم تا در
              مسیر موفقیت گام بردارید.
            </p>
          </div>

          {/* Banner Image */}
          <div className="w-1/2 relative">
            <Image
              src="/aboutUs.png"
              alt="یوتیوب کلاب"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
          </div>
        </div>
      </div>

      {/* Stats and Features Section */}
      <div className="flex flex-wrap -mx-4 mb-16" dir="rtl">
        {/* Projects Counter */}
        <div ref={counterRef} className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
          <div className=" rounded-lg shadow-lg p-8 text-center h-full">
            <h3 className="text-2xl font-bold mb-4 text-blue-700">
              پروژه تحویل شده
            </h3>
            <div className="text-5xl font-bold text-blue-600">
              +{projectCount}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="w-full md:w-2/3 px-4">
          <div className=" rounded-lg shadow-lg p-8 h-full">
            <ul className="space-y-4">
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 text-2xl mr-3" />
                <span className="text-lg">بالاترین سطح تدریس</span>
              </li>
              <li className="flex items-center">
                <FaHeadset className="text-blue-500 text-2xl mr-3" />
                <span className="text-lg">پشتیبانی همیشگی</span>
              </li>
              <li className="flex items-center">
                <FaLock className="text-purple-500 text-2xl mr-3" />
                <span className="text-lg">دسترسی همیشگی به دوره و پک ها</span>
              </li>
              <li className="flex items-center">
                <FaSync className="text-orange-500 text-2xl mr-3" />
                <span className="text-lg">آپدیت همیشگی دوره و پک ها</span>
              </li>
              <li className="flex items-center">
                <FaBriefcase className="text-red-500 text-2xl mr-3" />
                <span className="text-lg">معرفی های پروژه برای کار</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="flex flex-wrap -mx-4" dir="rtl">
        {/* Instagram */}
        <div className="w-full md:w-1/2 px-4 mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg shadow-lg p-8 text-white">
            <div className="flex items-center justify-center mb-6">
              <FaInstagram className="text-5xl" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">اینستاگرام</h3>
            <p className="text-center">
              اینستاگرام یوتیوب کلاب برای با خبر شدن از جایزه ها و پک های رایگان
            </p>
            <div className="mt-6 text-center">
              <Link
                href="https://instagram.com/youtubeclub"
                className="inline-block bg-white text-purple-600 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                دنبال کنید
              </Link>
            </div>
          </div>
        </div>

        {/* Telegram */}
        <div className="w-full md:w-1/2 px-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-lg p-8 text-white">
            <div className="flex items-center justify-center mb-6">
              <FaTelegram className="text-5xl" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">تلگرام</h3>
            <p className="text-center">
              تلگرام یوتیوب کلاب برای اخبار جدید پک ها و دوره های سایت
            </p>
            <div className="mt-6 text-center">
              <Link
                href="https://t.me/youtubeclub"
                className="inline-block bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors"
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
