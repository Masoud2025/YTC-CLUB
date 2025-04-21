'use client';
import React, { useState } from 'react';
import Image from 'next/image';

// داده‌های پک‌های آموزشی
const editingPacks = [
  {
    id: 'premiere-pro-basics',
    title: 'پک آموزش مقدماتی پریمیر پرو',
    image: '/packImage.jpg',
    price: '۵۹۰,۰۰۰',
    discountPrice: '۳۹۰,۰۰۰',
    level: 'مقدماتی',
    duration: '۸ ساعت',
    description:
      'در این دوره شما با مفاهیم پایه و اصول اولیه نرم افزار پریمیر پرو آشنا خواهید شد.',
    includes: [
      '۴۵ ویدیوی آموزشی',
      '۱۰ پروژه عملی',
      'فایل‌های تمرینی',
      'گواهی پایان دوره',
    ],
    hasDiscount: true,
  },
  {
    id: 'after-effects-pack',
    title: 'پک جامع افکت‌های متحرک افترافکت',
    image: '/packImage.jpg',
    price: '۸۹۰,۰۰۰',
    discountPrice: '۶۹۰,۰۰۰',
    level: 'پیشرفته',
    duration: '۱۲ ساعت',
    description: 'مجموعه کامل آموزش موشن گرافیک و جلوه‌های ویژه در افترافکت',
    includes: [
      '۶۰ ویدیوی آموزشی',
      '۲۰ پروژه عملی',
      'پلاگین‌های کاربردی',
      'پشتیبانی ۳ ماهه',
    ],
    hasDiscount: true,
  },
  // ... سایر پک‌ها
];

export default function EditingPacksPage() {
  const [cartItems, setCartItems] = useState<string[]>([]);

  const handleAddToCart = (e: React.MouseEvent, packId: string) => {
    e.stopPropagation();
    if (!cartItems.includes(packId)) {
      setCartItems([...cartItems, packId]);
      alert('محصول به سبد خرید اضافه شد');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12" dir="rtl">
      <h1 className="text-3xl font-bold text-center mb-4">
        پک‌های آموزش تدوین ویدیو
      </h1>
      <p className="text-gray-600 text-center mb-12">
        مجموعه کامل آموزش‌ها و ابزارهای مورد نیاز برای تدوین حرفه‌ای ویدیو
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {editingPacks.map(pack => (
          <EditingPackCard
            key={pack.id}
            pack={pack}
            isInCart={cartItems.includes(pack.id)}
            onAddToCart={e => handleAddToCart(e, pack.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface EditingPackCardProps {
  pack: {
    id: string;
    title: string;
    image: string;
    price: string;
    discountPrice: string;
    level: string;
    duration: string;
    description: string;
    includes: string[];
    hasDiscount: boolean;
  };
  isInCart: boolean;
  onAddToCart: (e: React.MouseEvent) => void;
}

function EditingPackCard({
  pack,
  isInCart,
  onAddToCart,
}: EditingPackCardProps) {
  return (
    <div className="relative group" style={{ width: '251px', height: '383px' }}>
      {/* Main Card Content */}
      <div className="absolute inset-0 bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 group-hover:blur-sm">
        <div
          className="relative mx-auto"
          style={{ width: '211px', height: '211px', marginTop: '20px' }}
        >
          <Image
            src={pack.image}
            alt={pack.title}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            sizes="211px"
          />
          <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {pack.level}
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-base font-bold mb-2 line-clamp-2 text-center h-12">
            {pack.title}
          </h2>

          <div className="flex flex-col items-center justify-center mt-4">
            <div className="flex flex-col items-center mb-3">
              {pack.hasDiscount && (
                <span className="text-gray-400 line-through text-sm mb-1">
                  {pack.price} تومان
                </span>
              )}
              <span className="text-blue-600 font-bold text-lg">
                {pack.discountPrice} تومان
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Details */}
      <div className="absolute inset-0 bg-black/80 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col text-white">
        <h3 className="font-bold text-lg mb-2">{pack.title}</h3>
        <p className="text-sm text-gray-300 mb-4">{pack.description}</p>

        <div className="mb-4">
          <div className="flex items-center mb-2">
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">{pack.duration}</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">{pack.level}</span>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="text-sm font-bold mb-2">این دوره شامل:</h4>
          <ul className="text-xs text-gray-300 space-y-1">
            {pack.includes.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="ml-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={onAddToCart}
          className={`
            w-full px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center justify-center
            ${
              isInCart
                ? 'bg-green-500 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }
          `}
        >
          {isInCart ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              در سبد خرید
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
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
              افزودن به سبد
            </>
          )}
        </button>
      </div>
    </div>
  );
}
