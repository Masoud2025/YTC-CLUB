'use client';
import React from 'react';
import Image from 'next/image';

export default function CourseIntroduction() {
  const handleAddToCart = () => {
    // Add your cart functionality here
    alert('دوره به سبد خرید اضافه شد');
    // In a real app, you'd use a proper cart system and toast notifications
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800 border-b border-gray-200 pb-4">
            توضیحات کامل دوره
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Course details on the left for desktop, bottom for mobile */}
            <div className="lg:w-1/2 order-2 lg:order-1">
              <h2 className="text-xl font-bold text-blue-700 mb-4">
                معرفی دوره : Magic Designer (طراح جادویی)
              </h2>

              <div className="space-y-6 text-gray-700">
                <div>
                  <p className="mb-2 text-lg font-semibold">
                    💡اما این دوره راجب چیه؟
                  </p>
                  <p className="leading-relaxed">
                    داخل این دوره شما قراره طراحی تامنیل با موبایل رو به صورت
                    حرفه ایی از صفر تا صد یاد بگیرید و از این راه کسب درآمد
                    داشته داشته باشید
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-lg font-semibold">
                    🔹️این دوره شامل چهار فصله :
                  </p>
                  <ul className="space-y-2 mr-6 list-disc">
                    <li>۱ - آشنایی با محیط پیکس‌آرت</li>
                    <li>۲ - اصول و نکات طراحی</li>
                    <li>۳ - آموزش طراحی تامنیل</li>
                    <li>۴ - کسب درآمد (مستقل باش)</li>
                  </ul>
                </div>

                <div>
                  <p className="mb-2 text-lg font-semibold">
                    🔻سوالات احتمالی؟!
                  </p>
                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="font-bold">۱ - دوره کجا قرار گرفته ؟</p>
                      <p>
                        داخل یه گروه تلگرامی موضوع بندی شده قرار گرفته و شما
                        دسترسی خیلی سریع و راحتی به دوره دارید
                      </p>
                    </div>
                    <div>
                      <p className="font-bold">۲ - دوره پشتیبانی داره ؟</p>
                      <p>
                        بله این دوره به صورت دائمی پشتیبانی داره و اگه سوالی
                        براتون پیش بیاد میتونید با بنده در ارتباط باشید
                      </p>
                    </div>
                    <div>
                      <p className="font-bold">۳ - دوره آپدیت داره ؟</p>
                      <p>
                        دوره فعلا نیازی به آپدیت نداره اما ممکنه در آینده آپدیت
                        بشه
                      </p>
                    </div>
                    <div>
                      <p className="font-bold">۴ - دوره فقط با موبایله؟</p>
                      <p>
                        بله دوره کاملا با موبایل ضبط شده و فقط نیاز به یه موبایل
                        داره
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex flex-col sm:flex-row justify-between items-center bg-blue-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center mb-4 sm:mb-0">
                    <div className="ml-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">مدت زمان دوره</p>
                      <p className="font-bold text-gray-800">
                        ۴ ساعت و ۳۰ دقیقه
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="ml-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">سطح دوره</p>
                      <p className="font-bold text-gray-800">
                        مبتدی تا پیشرفته
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 line-through text-sm">
                      ۵۹۹,۰۰۰ تومان
                    </p>
                    <p className="text-2xl font-bold text-blue-700">
                      ۳۹۹,۰۰۰ تومان
                    </p>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    افزودن به سبد خرید
                  </button>
                </div>
              </div>
            </div>

            {/* Course image on the right for desktop, top for mobile */}
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="relative h-80 md:h-96 lg:h-full rounded-xl overflow-hidden">
                <Image
                  src="/courses/magic-designer-thumbnail.jpg"
                  alt="دوره طراح جادویی - Magic Designer"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-6">
                  <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg inline-block self-start">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-500 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-bold">
                        پرفروش‌ترین دوره سال ۱۴۰۴
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-600">تعداد دانشجو</p>
                  <p className="font-bold text-blue-700">+۱۲۰۰</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-600">رضایت دانشجویان</p>
                  <p className="font-bold text-green-700">۹۵٪</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-600">تعداد جلسات</p>
                  <p className="font-bold text-purple-700">۲۴</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
