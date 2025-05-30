'use client';
// components/Services.tsx
import React, { useState } from 'react';
import { FaChevronDown, FaArrowLeft, FaCheck } from 'react-icons/fa';
import Image from 'next/image';

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  features?: string[];
}

const Services: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    if (openDropdown === id) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(id);
    }
  };

  const services: ServiceItem[] = [
    {
      id: 1,
      title: 'ادیت وطراحی جذاب',
      description:
        'طراحی و ادیت حرفه ای یعنی توجه به سلایق و تمایلات همه کاربران هدف محتوای شما',
      features: ['طراحی اختصاصی', 'ادیت حرفه‌ای', 'کیفیت بالا'],
    },
    {
      id: 2,
      title: 'سرعت بالا',
      description: 'طراحی و ادیت در سریع ترین زمان ممکن با بالاترین کیفیت ممکن',
      features: ['تحویل سریع', 'پشتیبانی ۲۴/۷', 'بازنگری رایگان'],
    },
    {
      id: 3,
      title: 'قیمت مناسب',
      description:
        'ارائه خدمات با قیمت مناسب برای تمامی افراد به خصوص یوتیوبر های تازه کار',
      features: ['قیمت رقابتی', 'پکیج‌های متنوع', 'تخفیف ویژه'],
    },
  ];

  return (
    <section
      id="services"
      className="py-8 sm:py-12 lg:py-16 xl:py-24 px-3 sm:px-4 lg:px-6 font-[vazir] overflow-hidden"
      dir="rtl"
    >
      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-12 lg:mb-16 xl:mb-24">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 text-white leading-tight">
          خدمات ما
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-2 leading-relaxed">
          راهکارهای حرفه‌ای برای ارتقای محتوای دیجیتال شما
        </p>
        <div className="w-12 sm:w-16 lg:w-20 xl:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-[#0165FC] to-transparent mx-auto mt-4 sm:mt-6 lg:mt-8"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout */}
        <div className="block lg:hidden">
          {/* Image first on mobile */}
          <div className="mb-6 sm:mb-8">
            <div className="relative h-48 sm:h-64 md:h-80 w-full rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-[#0165FC]/10 to-purple-600/10 backdrop-blur-sm border border-white/10">
              <Image
                src="/services.png"
                alt="Our Services"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Services dropdowns */}
          <div className="space-y-3 sm:space-y-4">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/10 overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-[#0165FC]/30 hover:shadow-lg hover:shadow-[#0165FC]/10"
              >
                <button
                  onClick={() => toggleDropdown(service.id)}
                  className="w-full flex items-center justify-between p-3 sm:p-4 text-white transition-all duration-200 hover:bg-white/5"
                  aria-expanded={openDropdown === service.id}
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-bold transition-all duration-500 ease-out transform ${
                        openDropdown === service.id
                          ? 'bg-[#0165FC] text-white scale-110 shadow-lg shadow-[#0165FC]/30'
                          : 'bg-[#0165FC]/20 text-[#0165FC] scale-100'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-right">
                      {service.title}
                    </h3>
                  </div>
                  <div
                    className={`transition-all duration-500 ease-out transform ${
                      openDropdown === service.id
                        ? 'rotate-180 text-white'
                        : 'rotate-0 text-[#0165FC]'
                    }`}
                  >
                    <FaChevronDown className="text-xs sm:text-sm" />
                  </div>
                </button>

                {/* Animated dropdown content */}
                <div
                  className={`transition-all duration-700 ease-out overflow-hidden ${
                    openDropdown === service.id
                      ? 'max-h-96 opacity-100 transform translate-y-0'
                      : 'max-h-0 opacity-0 transform -translate-y-4'
                  }`}
                >
                  <div className="bg-gradient-to-r from-[#0165FC]/5 to-[#0165FC]/10 border-t border-[#0165FC]/20 p-3 sm:p-4">
                    <div
                      className={`transition-all duration-500 delay-200 ${
                        openDropdown === service.id
                          ? 'opacity-100 transform translate-y-0'
                          : 'opacity-0 transform translate-y-4'
                      }`}
                    >
                      <p className="text-white/90 leading-relaxed text-sm sm:text-base mb-3">
                        {service.description}
                      </p>

                      {service.features && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {service.features.map((feature, idx) => (
                              <span
                                key={idx}
                                className={`inline-flex items-center bg-[#0165FC]/10 text-[#0165FC] px-2 py-1 rounded-full text-xs border border-[#0165FC]/20 transition-all duration-300 delay-${
                                  (idx + 1) * 100
                                } ${
                                  openDropdown === service.id
                                    ? 'opacity-100 transform translate-x-0'
                                    : 'opacity-0 transform translate-x-4'
                                }`}
                                style={{
                                  transitionDelay: `${300 + idx * 100}ms`,
                                }}
                              >
                                <FaCheck className="ml-1 text-xs" />
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        className={`inline-flex items-center bg-gradient-to-r from-[#0165FC] to-[#0165FC]/80 text-white font-medium py-2 px-4 sm:py-2.5 sm:px-6 rounded-lg hover:from-[#0165FC]/90 hover:to-[#0165FC]/70 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#0165FC]/30 text-sm sm:text-base ${
                          openDropdown === service.id
                            ? 'opacity-100 translate-y-0 delay-500'
                            : 'opacity-0 translate-y-4'
                        }`}
                      >
                        اطلاعات بیشتر
                        <FaArrowLeft className="mr-2 text-xs transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:items-start lg:gap-8 xl:gap-12">
          {/* Left side - Dropdowns */}
          <div className="w-1/2 space-y-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-[#0165FC]/30 hover:shadow-xl hover:shadow-[#0165FC]/10"
              >
                <button
                  onClick={() => toggleDropdown(service.id)}
                  className="w-full flex items-center justify-between p-6 text-white transition-all duration-200 hover:bg-white/5"
                  aria-expanded={openDropdown === service.id}
                >
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 ease-out transform ${
                        openDropdown === service.id
                          ? 'bg-[#0165FC] text-white scale-110 shadow-lg shadow-[#0165FC]/30'
                          : 'bg-[#0165FC]/20 text-[#0165FC] scale-100'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <h3 className="text-xl xl:text-2xl font-bold text-right">
                      {service.title}
                    </h3>
                  </div>
                  <div
                    className={`transition-all duration-500 ease-out transform ${
                      openDropdown === service.id
                        ? 'rotate-180 text-white'
                        : 'rotate-0 text-[#0165FC]'
                    }`}
                  >
                    <FaChevronDown />
                  </div>
                </button>

                {/* Animated dropdown content */}
                <div
                  className={`transition-all duration-700 ease-out overflow-hidden ${
                    openDropdown === service.id
                      ? 'max-h-96 opacity-100 transform translate-y-0'
                      : 'max-h-0 opacity-0 transform -translate-y-4'
                  }`}
                >
                  <div className="bg-gradient-to-r from-[#0165FC]/5 to-[#0165FC]/10 border-t border-[#0165FC]/20 p-6">
                    <div
                      className={`transition-all duration-500 delay-200 ${
                        openDropdown === service.id
                          ? 'opacity-100 transform translate-y-0'
                          : 'opacity-0 transform translate-y-4'
                      }`}
                    >
                      <p className="text-white/90 leading-relaxed text-lg xl:text-xl mb-4">
                        {service.description}
                      </p>

                      {service.features && (
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-3">
                            {service.features.map((feature, idx) => (
                              <span
                                key={idx}
                                className={`inline-flex items-center bg-[#0165FC]/10 text-[#0165FC] px-3 py-1.5 rounded-full text-sm border border-[#0165FC]/20 transition-all duration-300 ${
                                  openDropdown === service.id
                                    ? 'opacity-100 transform translate-x-0'
                                    : 'opacity-0 transform translate-x-4'
                                }`}
                                style={{
                                  transitionDelay: `${300 + idx * 100}ms`,
                                }}
                              >
                                <FaCheck className="ml-2 text-xs" />
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        className={`group inline-flex items-center bg-gradient-to-r from-[#0165FC] to-[#0165FC]/80 text-white font-medium py-3 px-8 rounded-lg hover:from-[#0165FC]/90 hover:to-[#0165FC]/70 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#0165FC]/30 ${
                          openDropdown === service.id
                            ? 'opacity-100 translate-y-0 delay-500'
                            : 'opacity-0 translate-y-4'
                        }`}
                      >
                        اطلاعات بیشتر
                        <FaArrowLeft className="mr-3 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Big Image */}
          <div className="w-1/2 sticky top-8">
            <div className="relative h-96 xl:h-[500px] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#0165FC]/10 to-purple-600/10 backdrop-blur-sm border border-white/10 hover:border-[#0165FC]/30 transition-all duration-300">
              <Image
                src="/services.png"
                alt="Our Services"
                fill
                className="object-contain p-6 transition-transform duration-300 hover:scale-105"
                sizes="50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
