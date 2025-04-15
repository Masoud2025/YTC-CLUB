'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Define plan types
interface Feature {
  title: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: Feature[];
  popular: boolean;
  badge?: string;
}

export default function PricingPlans() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'monthly',
  );
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  // Plans data
  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'پایه',
      description: 'برای کاربران تازه‌کار و آشنایی با سیستم',
      price: {
        monthly: 0,
        yearly: 0,
      },
      features: [
        { title: 'جستجو در تمام آگهی‌ها', included: true },
        { title: 'مشاهده ۳ آگهی در روز', included: true },
        { title: 'دسترسی به مقالات آموزشی', included: true },
        { title: 'مشاهده اطلاعات تماس', included: false },
        { title: 'ذخیره آگهی‌های مورد علاقه', included: false },
        { title: 'اطلاع‌رسانی آگهی‌های جدید', included: false },
        { title: 'ارسال رزومه مستقیم', included: false },
        { title: 'پشتیبانی اختصاصی', included: false },
      ],
      popular: false,
    },
    {
      id: 'plus',
      name: 'پلاس',
      description: 'برای کاربران حرفه‌ای و جویندگان جدی کار',
      price: {
        monthly: 149000,
        yearly: 1490000,
      },
      features: [
        { title: 'جستجو در تمام آگهی‌ها', included: true },
        { title: 'مشاهده نامحدود آگهی', included: true },
        { title: 'دسترسی به مقالات آموزشی', included: true },
        { title: 'مشاهده اطلاعات تماس', included: true },
        { title: 'ذخیره آگهی‌های مورد علاقه', included: true },
        { title: 'اطلاع‌رسانی آگهی‌های جدید', included: true },
        { title: 'ارسال رزومه مستقیم', included: false },
        { title: 'پشتیبانی اختصاصی', included: false },
      ],
      popular: true,
      badge: 'محبوب‌ترین',
    },
    {
      id: 'pro',
      name: 'حرفه‌ای',
      description: 'برای متخصصان و افراد فعال در صنعت محتوا',
      price: {
        monthly: 299000,
        yearly: 2990000,
      },
      features: [
        { title: 'جستجو در تمام آگهی‌ها', included: true },
        { title: 'مشاهده نامحدود آگهی', included: true },
        { title: 'دسترسی به مقالات آموزشی', included: true },
        { title: 'مشاهده اطلاعات تماس', included: true },
        { title: 'ذخیره آگهی‌های مورد علاقه', included: true },
        { title: 'اطلاع‌رسانی آگهی‌های جدید', included: true },
        { title: 'ارسال رزومه مستقیم', included: true },
        { title: 'پشتیبانی اختصاصی', included: true },
      ],
      popular: false,
    },
  ];

  // Format price with Persian numerals
  const formatPrice = (price: number): string => {
    if (price === 0) return 'رایگان';

    // Convert to Persian numerals
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const formattedPrice = price
      .toString()
      .replace(/\d/g, digit => persianDigits[parseInt(digit)]);

    // Add thousand separators
    const withSeparators = formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return `${withSeparators} تومان`;
  };

  // Calculate savings percentage for yearly billing
  const calculateSavings = (
    monthlyPrice: number,
    yearlyPrice: number,
  ): number => {
    if (monthlyPrice === 0) return 0;
    const monthlyCost = monthlyPrice * 12;
    return Math.round(((monthlyCost - yearlyPrice) / monthlyCost) * 100);
  };

  return (
    <div className="min-h-screen bg-[#282A2A] text-gray-100 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            طرح‌های اشتراک یوتیوب کلاب
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            با اشتراک پلاس و حرفه‌ای، به تمامی امکانات دسترسی داشته باشید و
            فرصت‌های شغلی مناسب خود را پیدا کنید.
          </p>

          {/* Billing Toggle */}
          <div className="mt-10 inline-flex items-center bg-[#353737] p-1 rounded-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              پرداخت ماهانه
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              پرداخت سالانه
              {billingCycle === 'yearly' && (
                <span className="mr-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                  ۲۰٪ تخفیف
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map(plan => {
            const isHovered = hoveredPlan === plan.id;
            const yearlyDiscount = calculateSavings(
              plan.price.monthly,
              plan.price.yearly,
            );

            return (
              <motion.div
                key={plan.id}
                className={`relative rounded-2xl overflow-hidden ${
                  plan.popular
                    ? 'border-2 border-blue-500'
                    : 'border border-gray-700'
                }`}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: plans.indexOf(plan) * 0.1 }}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute top-0 left-0 right-0 bg-green-600 text-white text-center text-sm py-1 font-medium">
                    {plan.badge}
                  </div>
                )}

                <div
                  className={`p-8 bg-[#353737] h-full flex flex-col ${
                    plan.badge ? 'pt-12' : ''
                  }`}
                >
                  {/* Plan Header */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-400 mb-6">{plan.description}</p>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-white">
                        {formatPrice(plan.price[billingCycle])}
                      </span>
                      {plan.price[billingCycle] > 0 && (
                        <span className="mr-2 text-gray-400">
                          {billingCycle === 'monthly' ? '/ ماهانه' : '/ سالانه'}
                        </span>
                      )}
                    </div>

                    {/* Yearly discount note */}
                    {billingCycle === 'yearly' && yearlyDiscount > 0 && (
                      <p className="mt-2 text-green-500 text-sm">
                        صرفه‌جویی {yearlyDiscount}٪ با پرداخت سالانه
                      </p>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div
                          className={`mt-1 ml-3 rounded-full p-1 ${
                            feature.included
                              ? 'bg-blue-600/20 text-blue-400'
                              : 'bg-gray-700/30 text-gray-500'
                          }`}
                        >
                          {feature.included ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          className={
                            feature.included ? 'text-gray-300' : 'text-gray-500'
                          }
                        >
                          {feature.title}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-3 rounded-lg font-bold transition-all transform ${
                      isHovered ? 'scale-[1.02] shadow-lg' : ''
                    } ${
                      plan.popular
                        ? 'bg-[blue-600] hover:bg-blue-700 text-white'
                        : plan.id === 'basic'
                        ? 'bg-gray-700 hover:bg-gray-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                  >
                    {plan.id === 'basic' ? 'شروع رایگان' : 'انتخاب طرح'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-white text-center">
            سوالات متداول
          </h2>

          <div className="space-y-6">
            <div className="bg-[#353737] rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">
                چگونه می‌توانم اشتراک خود را ارتقا دهم؟
              </h3>
              <p className="text-gray-400">
                شما می‌توانید در هر زمان از حساب کاربری خود، طرح اشتراک را ارتقا
                دهید. تفاوت قیمت به صورت متناسب محاسبه خواهد شد.
              </p>
            </div>

            <div className="bg-[#353737] rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">
                آیا می‌توانم اشتراک خود را لغو کنم؟
              </h3>
              <p className="text-gray-400">
                بله، شما می‌توانید در هر زمان اشتراک خود را لغو کنید. اشتراک شما
                تا پایان دوره پرداخت شده فعال خواهد ماند.
              </p>
            </div>

            <div className="bg-[#353737] rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">
                چه روش‌های پرداختی پشتیبانی می‌شوند؟
              </h3>
              <p className="text-gray-400">
                ما پرداخت از طریق درگاه‌های بانکی، کارت‌های شتاب، کیف پول و
                پرداخت ارزی را پشتیبانی می‌کنیم.
              </p>
            </div>

            <div className="bg-[#353737] rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">
                اگر از اشتراک خود راضی نبودم چه کنم؟
              </h3>
              <p className="text-gray-400">
                ما ضمانت بازگشت وجه ۷ روزه داریم. اگر به هر دلیلی از اشتراک خود
                راضی نبودید، می‌توانید درخواست بازگشت وجه دهید.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-24 bg-[#353737] rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
                <Image
                  src="/sampleUser.jpg"
                  width={90}
                  height={90}
                  alt="کاربر یوتیوب کلاب"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="text-yellow-400 flex mb-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-gray-300 text-lg italic mb-4">
                با اشتراک پلاس یوتیوب کلاب، توانستم به راحتی با کارفرماهای مختلف
                ارتباط برقرار کنم و در کمتر از یک ماه، یک پروژه ادیت ویدیو با
                درآمد عالی پیدا کنم. هزینه اشتراک در مقایسه با فرصت‌هایی که به
                دست آوردم، بسیار ناچیز بود.
              </blockquote>
              <div>
                <p className="font-bold text-white">امیر حسینی</p>
                <p className="text-gray-400 text-sm">
                  ادیتور ویدیو و موشن گرافیست
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            آماده شروع هستید؟
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            همین امروز اشتراک خود را فعال کنید و به هزاران فرصت شغلی در حوزه
            تولید محتوا دسترسی داشته باشید.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
              شروع اشتراک پلاس
            </button>
            <button className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors">
              مشاهده تمام مزایا
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
