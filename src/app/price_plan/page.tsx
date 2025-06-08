/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Define plan types
interface Feature {
  title: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: {
    monthly: number;
  };
  features: Feature[];
  popular: boolean;
}

export default function PricingPlans() {
  // Plans data - simplified to just 2 plans with monthly pricing only
  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'پایه',
      price: {
        monthly: 0,
      },
      features: [
        { title: 'جستجو در تمام آگهی‌ها', included: true },
        { title: 'مشاهده اطلاعات تماس', included: false },
      ],
      popular: false,
    },
    {
      id: 'plus',
      name: 'پلاس',
      price: {
        monthly: 149000,
      },
      features: [
        { title: 'جستجو در تمام آگهی‌ها', included: true },
        { title: 'مشاهده اطلاعات تماس', included: true },
      ],
      popular: true,
    },
  ];

  // Format price with Persian numerals
  const formatPrice = (price: number): string => {
    if (price === 0) return 'رایگان';

    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const formattedPrice = price
      .toString()
      .replace(/\d/g, digit => persianDigits[parseInt(digit)]);

    const withSeparators = formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${withSeparators} تومان`;
  };

  return (
    <div className="min-h-screen bg-[#282A2A] text-gray-100 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            طرح‌های اشتراک
          </h1>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative rounded-2xl overflow-hidden backdrop-blur-sm ${
                plan.popular
                  ? 'border-2 border-blue-500 bg-[#353737]/90'
                  : 'border border-gray-700/50 bg-[#353737]/80'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center text-sm py-2 font-medium">
                  محبوب‌ترین
                </div>
              )}

              <div
                className={`p-8 h-full flex flex-col ${
                  plan.popular ? 'pt-16' : ''
                }`}
              >
                {/* Plan Header */}
                <div className="mb-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-white">
                      {formatPrice(plan.price.monthly)}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className={`ml-3 rounded-full p-1 ${
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

                {/* CTA Button - Only show for Plus plan */}
                {plan.id === 'plus' && (
                  <button className="w-full py-3 rounded-lg font-bold transition-all hover:scale-[1.02] bg-blue-600 hover:bg-blue-700 text-white">
                    انتخاب طرح
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
