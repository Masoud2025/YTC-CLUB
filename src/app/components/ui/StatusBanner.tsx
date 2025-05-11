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
      className="w-[80%] rounded-4xl bg-[#2655A6] mx-auto py-8 flex items-center justify-center "
      dir="rtl"
    >
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-8 lg:px-20 gap-6 md:gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl text-white mb-1">
              {stat.icon}
            </div>
            <div className="text-center">
              <div className="text-lg md:text-xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-white">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBanner;
