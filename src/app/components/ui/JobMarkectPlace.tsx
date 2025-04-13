'use client';
// components/JobMarketplace.tsx
import React from 'react';
import { FaSearch, FaEdit } from 'react-icons/fa';
import Image from 'next/image';

const JobMarketplace: React.FC = () => {
  return (
    <section className="py-24 px-6 font-[vazir]" dir="rtl">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6 text-white">
          بازار کار یوتیوب کلاب
        </h2>
        <p className="text-lg text-white max-w-3xl mx-auto">
          فرصت‌های شغلی مرتبط با تولید محتوا و یوتیوب را در اینجا پیدا کنید یا
          آگهی استخدام خود را ثبت کنید
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center gap-10">
        {/* Job Seeker Button */}
        <div className="w-full md:w-[633px] h-[274px] bg-[#242525] rounded-xl flex overflow-hidden hover:bg-[#0165FC] transition-colors cursor-pointer">
          {/* Left side - Text */}
          <div className="w-1/2 p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-3 text-white">کارجو هستم</h3>
            <p className="text-white mb-6">
              به دنبال فرصت‌های شغلی در حوزه تولید محتوا و یوتیوب
            </p>
            <div className="flex items-center text-white">
              <FaSearch className="ml-2" />
              <span>مشاهده فرصت‌های شغلی</span>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="w-1/2 relative">
            <Image
              src="/karjohastam.png"
              alt="Job Seeker"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Employer Button */}
        <div className="w-full md:w-[633px] h-[274px] bg-[#242525] rounded-xl flex overflow-hidden hover:bg-[#0165FC] transition-colors cursor-pointer">
          {/* Left side - Text */}
          <div className="w-1/2 p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-3 text-white">کارفرما هستم</h3>
            <p className="text-white mb-6">
              ثبت آگهی استخدام و جذب متخصصان حوزه تولید محتوا
            </p>
            <div className="flex items-center text-white">
              <FaEdit className="ml-2" />
              <span>ثبت آگهی استخدام</span>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="w-1/2 relative">
            <Image
              src="/employe.png"
              alt="Employer"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobMarketplace;
