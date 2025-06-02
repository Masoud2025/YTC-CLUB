'use client';
import React from 'react';
import Image from 'next/image';

export default function YouTubeClubServices() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Top Section - Services Introduction */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white text-right">
            خدمات تیم یوتیوب کلاب برای شما
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-white text-right">
            تیم یوتیوب کلاب به صورت کامل کارهای یوتیوب و اینستاگرام و تیک تاک
            شما رو به عهده میگیره و به شما کمک میکنه تا در کار خود پیشرفت کنید و
            به نتیجه دلخواهتون برسید
          </p>
        </div>
        <div className="md:w-1/2">
          <div className="relative w-full h-32 md:h-48">
            <Image
              src="/buster.png"
              alt="تیم یوتیوب کلاب"
              width={200}
              height={200}
              style={{ objectFit: 'cover' }}
              className="rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-gray-200 mb-12 md:mb-16"></div>

      {/* Services Grid */}
      <div className="mb-12 md:mb-16">
        <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-gray-800 text-center">
          خدمات ادیت ویدیو
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Service Card 1 */}
          <div className="bg-white rounded-lg md:rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 min-h-[280px] md:min-h-[320px]">
            <div className="p-6 md:p-8 text-center h-full flex flex-col">
              <div className="flex justify-center mb-4 md:mb-6">
                <div className="relative w-24 h-24 md:w-28 md:h-28">
                  <Image
                    src="/images/thumbnail-design.jpg"
                    alt="طراحی تامنیل"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-800">
                طراحی تامنیل
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed flex-grow">
                طراحی تامنیل‌های جذاب و حرفه‌ای برای افزایش نرخ کلیک و جذب مخاطب
                بیشتر برای ویدیوهای شما
              </p>
              <div className="mt-4 md:mt-6">
                <a
                  href="#"
                  className="text-blue-600 font-bold flex items-center justify-center text-sm md:text-base"
                >
                  مشاهده نمونه کارها
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Service Card 2 */}
          <div className="bg-white rounded-lg md:rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 min-h-[280px] md:min-h-[320px]">
            <div className="p-6 md:p-8 text-center h-full flex flex-col">
              <div className="flex justify-center mb-4 md:mb-6">
                <div className="relative w-24 h-24 md:w-28 md:h-28">
                  <Image
                    src="/images/video-editing.jpg"
                    alt="خدمات ادیت ویدیو"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-800">
                خدمات ادیت ویدیو
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed flex-grow">
                ادیت حرفه‌ای ویدیوها با بالاترین کیفیت، افکت‌های ویژه،
                ترانزیشن‌های جذاب و تدوین اصولی
              </p>
              <div className="mt-4 md:mt-6">
                <a
                  href="#"
                  className="text-blue-600 font-bold flex items-center justify-center text-sm md:text-base"
                >
                  مشاهده نمونه کارها
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Service Card 3 */}
          <div className="bg-white rounded-lg md:rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 sm:col-span-2 lg:col-span-1 min-h-[280px] md:min-h-[320px]">
            <div className="p-6 md:p-8 text-center h-full flex flex-col">
              <div className="flex justify-center mb-4 md:mb-6">
                <div className="relative w-24 h-24 md:w-28 md:h-28">
                  <Image
                    src="/images/full-service.jpg"
                    alt="خدمات صفر تا صد"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-800">
                خدمات صفر تا صد
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed flex-grow">
                مدیریت کامل کانال، تولید محتوا، ادیت، طراحی تامنیل، سئو و
                بهینه‌سازی ویدیوها برای رشد کانال شما
              </p>
              <div className="mt-4 md:mt-6">
                <a
                  href="#"
                  className="text-blue-600 font-bold flex items-center justify-center text-sm md:text-base"
                >
                  مشاهده نمونه کارها
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-gray-200 mb-12 md:mb-16"></div>

      {/* Instructors Section */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-white text-center">
          مدرسان تیم یوتیوب کلاب
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8">
          {/* Instructor 1 */}
          <div className=" rounded-lg md:rounded-xl shadow-lg overflow-hidden min-h-[320px] md:min-h-[380px]">
            <div className="p-4 md:p-8 text-center h-full flex flex-col">
              <div className="flex justify-center mb-3 md:mb-4">
                <div className="relative min-w-[4em] h-40 md:w-24 md:h-24">
                  <Image src="/IliaTarah.png" alt="مدرس یوتیوب کلاب" fill />
                </div>
              </div>
              <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 text-white">
                ایلیاطراحی
              </h3>
              <p className="text-xs md:text-base text-white mb-2 md:mb-4">
                متخصص ادیت ویدیو و موشن گرافیک
              </p>
              <p className="text-xs md:text-base text-white leading-relaxed mb-3 md:mb-4 flex-grow">
                بیش از ۵ سال سابقه در زمینه تولید محتوای ویدیویی و ادیت حرفه‌ای
                برای یوتیوبرهای بزرگ ایرانی. متخصص در نرم‌افزارهای پریمیر پرو،
                افتر افکت و فتوشاپ.
              </p>
              <div className="flex space-x-3 space-x-reverse justify-center">
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-6 md:w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
                <a href="#" className="text-purple-600 hover:text-purple-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-6 md:w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Instructor 2 */}
          <div className=" rounded-lg md:rounded-xl shadow-lg overflow-hidden min-h-[320px] md:min-h-[380px]">
            <div className="p-4 md:p-8 text-center h-full flex flex-col">
              <div className="flex justify-center mb-3 md:mb-4">
                <div className="relative w-20 h-20 md:w-24 md:h-24">
                  <Image
                    src="/aliEditor.png"
                    alt="مدرس یوتیوب کلاب"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-full"
                  />
                </div>
              </div>
              <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 text-white">
                علی ادیتور
              </h3>
              <p className="text-xs md:text-base text-white mb-2 md:mb-4">
                متخصص استراتژی محتوا و سئو یوتیوب
              </p>
              <p className="text-xs md:text-base text-white leading-relaxed mb-3 md:mb-4 flex-grow">
                کارشناس ارشد بازاریابی دیجیتال با تجربه ۷ ساله در زمینه تولید
                محتوا و استراتژی رشد کانال‌های یوتیوب. متخصص در سئو ویدیو، تحلیل
                آمار و افزایش نرخ تعامل.
              </p>
              <div className="flex space-x-3 space-x-reverse justify-center">
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-6 md:w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
                <a href="#" className="text-purple-600 hover:text-purple-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-6 md:w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
