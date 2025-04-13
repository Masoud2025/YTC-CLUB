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
      className="w-[1440px] h-[100px] bg-[#2655A6] mx-auto flex items-center justify-center"
      dir="rtl"
    >
      <div className="flex justify-between items-center w-full px-20">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-4xl text-white mb-1">{stat.icon}</div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-white">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBanner;
