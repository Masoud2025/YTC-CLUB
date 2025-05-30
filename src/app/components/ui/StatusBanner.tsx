'use client';
import React from 'react';
import { FaBusinessTime, FaUsers, FaPaintBrush } from 'react-icons/fa';

const StatsBanner: React.FC = () => {
  const stats = [
    {
      icon: <FaBusinessTime />,
      value: '+۴',
      label: 'سال تجربه کاری',
    },
    {
      icon: <FaUsers />,
      value: 'حرفه‌ای',
      label: 'اعضای تیم',
    },
    {
      icon: <FaPaintBrush />,
      value: '+۵۰۰',
      label: 'پروژه طراحی',
    },
  ];

  return (
    <div
      className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] rounded-2xl sm:rounded-3xl lg:rounded-4xl bg-[#2655A6] mx-auto py-6 sm:py-8 md:py-10 flex items-center justify-center"
      dir="rtl"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 gap-8 sm:gap-6 md:gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center min-w-0 flex-1"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-2 sm:mb-3">
              {stat.icon}
            </div>
            <div className="space-y-1">
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white leading-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-white/90 leading-tight px-2">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBanner;
