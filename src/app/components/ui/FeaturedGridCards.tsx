'use client';
import React from 'react';
import { FaYoutube, FaBriefcase, FaChartLine } from 'react-icons/fa';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isHighlighted?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  isHighlighted = false,
}) => {
  return (
    <div
      className={`rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col items-center transition-all duration-300 hover:scale-105 ${
        isHighlighted
          ? 'bg-[#0165FC] shadow-[0_0_20px_rgba(1,101,252,0.5)] hover:shadow-[0_0_30px_rgba(1,101,252,0.7)]'
          : 'bg-transparent hover:bg-white/5 border border-transparent hover:border-[#0165FC]/20'
      }`}
    >
      {/* Icon with responsive sizing */}
      <div
        className={`text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 p-2 sm:p-3 lg:p-4 rounded-full transition-colors duration-300 ${
          isHighlighted
            ? 'text-white bg-white/10'
            : 'text-[#0165FC] hover:bg-[#0165FC]/10'
        }`}
      >
        {icon}
      </div>

      {/* Title with responsive text sizing */}
      <h3
        className={`text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 w-full text-right leading-tight ${
          isHighlighted ? 'text-white' : 'text-white'
        }`}
      >
        {title}
      </h3>

      {/* Description with responsive text sizing */}
      <p
        className={`text-sm sm:text-base lg:text-lg leading-relaxed w-full text-right ${
          isHighlighted ? 'text-white/90' : 'text-gray-300'
        }`}
      >
        {description}
      </p>
    </div>
  );
};

const FeatureGrid: React.FC = () => {
  const features = [
    {
      icon: <FaYoutube />,
      title: 'برندسازی',
      description:
        'برندینگ و کیفیت بالای خود را با یک طراحی و ادیت حرفه‌ای به همه نشان دهید.',
    },
    {
      icon: <FaBriefcase />,
      title: 'کسب کار',
      description:
        'اگه طراح یا ادیتور هستید یا حتی کارفرما هستید قسمت مشاغل یوتیوب میتونه ارتباط سریع و راحتی رو بین کارفرما و کارجو برقرار کنه.',
    },
    {
      icon: <FaChartLine />,
      title: 'افزایش مهارت',
      description:
        'با استفاده از دوره های آموزشی و پک ها میتونید کیفت کار خودتون رو به حداکثر برسونید.',
    },
  ];

  return (
    <div className="py-8 sm:py-12 lg:py-16">
      <div
        dir="rtl"
        className="container mx-auto px-4 sm:px-6 lg:px-8 font-[Vazir]"
      >
        {/* Header Section with responsive spacing and text */}
        <div className="mb-8 sm:mb-12 lg:mb-16 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 leading-tight px-2">
            <span className="text-[#0165FC]">یوتیوب</span> کلاب مناسب تولید
            کنندگان محتوا
          </h2>
          {/* Decorative line */}
          <div className="h-0.5 sm:h-1 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-transparent via-[#0165FC] to-transparent mx-auto"></div>
        </div>

        {/* Grid with responsive columns and spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${
                // Make middle card full width on small screens when we have 2 columns
                index === 1 &&
                'sm:col-span-2 lg:col-span-1 sm:max-w-md sm:mx-auto lg:max-w-none'
              }`}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                isHighlighted={index === 1} // Only highlight the middle card
              />
            </div>
          ))}
        </div>

        {/* Optional: Add a call-to-action section */}
        <div className="mt-8 sm:mt-12 lg:mt-16 text-center">
          <div className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-[#0165FC]/20 to-purple-600/20 rounded-full border border-[#0165FC]/30">
            <span className="text-sm sm:text-base text-white/80">
              همین الان شروع کنید
            </span>
            <div className="mr-2 w-2 h-2 bg-[#0165FC] rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid;
