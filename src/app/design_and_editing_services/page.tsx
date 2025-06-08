'use client';
import React from 'react';
import Image from 'next/image';

export default function YouTubeClubServices() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      {/* Top Section - Services Introduction */}
      <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20   mt-[5em]">
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white text-center lg:text-right leading-tight">
            خدمات تیم یوتیوب کلاب برای شما
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white text-center lg:text-right">
            تیم یوتیوب کلاب به صورت کامل کارهای یوتیوب و اینستاگرام و تیک تاک
            شما رو به عهده میگیره و به شما کمک میکنه تا در کار خود پیشرفت کنید و
            به نتیجه دلخواهتون برسید
          </p>
        </div>
        <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center">
          <div className="relative w-48 h-32 sm:w-64 sm:h-40 md:w-80 md:h-48 lg:w-full lg:h-64">
            <a
              href="https://www.aparat.com/v/i8142ox"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/buster.png"
                alt="تیم یوتیوب کلاب"
                fill
                style={{ objectFit: 'contain' }}
                className="rounded-xl hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-gray-200 mb-8 sm:mb-12 lg:mb-16"></div>

      {/* Services Grid */}
      <div className="mb-8 sm:mb-12 lg:mb-16">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 lg:mb-10 text-white text-center">
          خدمات ادیت ویدیو
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Service Card 1 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg lg:rounded-xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 min-h-[250px] sm:min-h-[280px] lg:min-h-[320px]">
            <div className="p-4 sm:p-6 lg:p-8 text-center h-full flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-white">
                  طراحی تامنیل
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white leading-relaxed">
                  طراحی تامنیل‌های جذاب و حرفه‌ای برای افزایش نرخ کلیک و جذب
                  مخاطب بیشتر برای ویدیوهای شما
                </p>
              </div>
            </div>
          </div>

          {/* Service Card 2 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg lg:rounded-xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 min-h-[250px] sm:min-h-[280px] lg:min-h-[320px]">
            <div className="p-4 sm:p-6 lg:p-8 text-center h-full flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-white">
                  خدمات ادیت ویدیو
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white leading-relaxed">
                  ادیت حرفه‌ای ویدیوها با بالاترین کیفیت، افکت‌های ویژه،
                  ترانزیشن‌های جذاب و تدوین اصولی
                </p>
              </div>
            </div>
          </div>

          {/* Service Card 3 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg lg:rounded-xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 sm:col-span-2 lg:col-span-1 min-h-[250px] sm:min-h-[280px] lg:min-h-[320px]">
            <div className="p-4 sm:p-6 lg:p-8 text-center h-full flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-white">
                  خدمات صفر تا صد
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white leading-relaxed">
                  مدیریت کامل کانال، تولید محتوا، ادیت، طراحی تامنیل، سئو و
                  بهینه‌سازی ویدیوها برای رشد کانال شما
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-gray-200 mb-8 sm:mb-12 lg:mb-16"></div>

      {/* Instructors Section */}
      <div>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 lg:mb-10 text-white text-center">
          مدرسان تیم یوتیوب کلاب
        </h2>

        {/* Mobile: 2 columns, Tablet+: 2 columns */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* Instructor 1 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg lg:rounded-xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 min-h-[320px] sm:min-h-[350px] lg:min-h-[400px]">
            <div className="p-3 sm:p-6 lg:p-8 text-center h-full flex flex-col">
              <div className="flex justify-center mb-3 sm:mb-6">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36">
                  <Image
                    src="/IliaTarah.png"
                    alt="ایلیاطراحی - مدرس یوتیوب کلاب"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-full"
                  />
                </div>
              </div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 sm:mb-3 text-white">
                ایلیاطراحی
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-white mb-2 sm:mb-3">
                طراح گرافیک
              </p>
              <p className="text-xs sm:text-sm md:text-base text-white leading-relaxed flex-grow">
                متخصص در طراحی تامنیل‌های جذاب و حرفه‌ای
              </p>
            </div>
          </div>

          {/* Instructor 2 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg lg:rounded-xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 min-h-[320px] sm:min-h-[350px] lg:min-h-[400px]">
            <div className="p-3 sm:p-6 lg:p-8 text-center h-full flex flex-col">
              <div className="flex justify-center mb-3 sm:mb-6">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36">
                  <Image
                    src="/aliEditor.png"
                    alt="علی ادیتور - مدرس یوتیوب کلاب"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-full"
                  />
                </div>
              </div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 sm:mb-3 text-white">
                علی ادیتور
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-white mb-2 sm:mb-3">
                ادیتور ویدیو
              </p>
              <p className="text-xs sm:text-sm md:text-base text-white leading-relaxed flex-grow">
                متخصص ادیت ویدیو با سال‌ها تجربه
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
