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
      className={`rounded-xl p-6 flex flex-col items-center ${
        isHighlighted
          ? 'bg-[#0165FC] shadow-[0_0_20px_rgba(1,101,252,0.5)]'
          : 'bg-transparent'
      }`}
    >
      <div className="text-5xl text-[#0165FC] mb-6 p-4">{icon}</div>

      <h3 className="text-xl font-bold mb-3 text-white w-full text-right">
        {title}
      </h3>
      <p className="text-gray-300 leading-relaxed w-full text-right">
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
    <div className="py-16">
      <div dir="rtl" className="container mx-auto px-4 font-[Vazir]">
        <div className="mb-16 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            <span className="text-[#0165FC]">یوتیوب</span> کلاب مناسب تولید
            کنندگان محتوا
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#0165FC] to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              isHighlighted={index === 1} // Only highlight the middle card
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid;
