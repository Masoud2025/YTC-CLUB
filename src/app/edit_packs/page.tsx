'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Sample editing packs data
const editingPacks = [
  {
    id: 'premiere-pro-basics',
    title: 'پک آموزش مقدماتی پریمیر پرو',
    image: '/packs/premiere-pro-basics.jpg',
    shortDescription:
      'آموزش صفر تا صد مقدماتی نرم‌افزار پریمیر پرو برای تدوین ویدیو',
    price: '۲۹۰,۰۰۰',
    discountPrice: '۲۴۹,۰۰۰',
    level: 'مقدماتی',
    duration: '۸ ساعت',
    includes: [
      '۴۵ ویدیوی آموزشی',
      '۱۰ پروژه عملی',
      'فایل‌های تمرینی',
      'گواهی پایان دوره',
    ],
    tags: ['پریمیر پرو', 'تدوین ویدیو', 'مقدماتی'],
  },
  {
    id: 'after-effects-transitions',
    title: 'پک ترنزیشن‌های افتر افکت',
    image: '/packs/after-effects-transitions.jpg',
    shortDescription:
      '۵۰ ترنزیشن حرفه‌ای و آماده برای افتر افکت با آموزش نحوه استفاده',
    price: '۳۵۰,۰۰۰',
    discountPrice: '۲۹۹,۰۰۰',
    level: 'متوسط',
    duration: '۳ ساعت',
    includes: [
      '۵۰ ترنزیشن آماده',
      'آموزش نصب و استفاده',
      'پروژه‌های نمونه',
      'پشتیبانی ۳ ماهه',
    ],
    tags: ['افتر افکت', 'ترنزیشن', 'موشن گرافیک'],
  },
  {
    id: 'davinci-resolve-color-grading',
    title: 'پک کالرگریدینگ داوینچی ریزالو',
    image: '/packs/davinci-resolve-color-grading.jpg',
    shortDescription:
      'آموزش حرفه‌ای کالرگریدینگ با داوینچی ریزالو به همراه پریست‌های آماده',
    price: '۴۲۰,۰۰۰',
    discountPrice: '۳۷۹,۰۰۰',
    level: 'پیشرفته',
    duration: '۱۰ ساعت',
    includes: [
      '۶۰ ویدیوی آموزشی',
      '۲۰ پریست آماده',
      'پروژه‌های نمونه',
      'فایل‌های تمرینی',
      'پشتیبانی ۶ ماهه',
    ],
    tags: ['داوینچی ریزالو', 'کالرگریدینگ', 'تصحیح رنگ'],
  },
  {
    id: 'final-cut-pro-masterclass',
    title: 'مسترکلاس فاینال کات پرو',
    image: '/packs/final-cut-pro-masterclass.jpg',
    shortDescription:
      'دوره جامع و پیشرفته فاینال کات پرو برای تدوین فیلم و ویدیو',
    price: '۳۸۰,۰۰۰',
    discountPrice: '۳۴۹,۰۰۰',
    level: 'متوسط تا پیشرفته',
    duration: '۱۲ ساعت',
    includes: [
      '۷۰ ویدیوی آموزشی',
      '۱۵ پروژه عملی',
      'افکت‌های آماده',
      'گواهی پایان دوره',
    ],
    tags: ['فاینال کات پرو', 'تدوین فیلم', 'مک'],
  },
  {
    id: 'sound-design-pack',
    title: 'پک طراحی صدا برای ویدیو',
    image: '/packs/sound-design-pack.jpg',
    shortDescription:
      'آموزش طراحی و میکس صدا برای ویدیو به همراه کتابخانه افکت‌های صوتی',
    price: '۲۷۰,۰۰۰',
    discountPrice: '۲۳۹,۰۰۰',
    level: 'متوسط',
    duration: '۶ ساعت',
    includes: [
      '۳۰ ویدیوی آموزشی',
      '۵۰۰ افکت صوتی',
      'پروژه‌های نمونه',
      'آموزش ادوبی آدیشن',
    ],
    tags: ['طراحی صدا', 'میکس صدا', 'افکت صوتی'],
  },
  {
    id: 'youtube-editing-pack',
    title: 'پک تدوین ویدیوهای یوتیوب',
    image: '/packs/youtube-editing-pack.jpg',
    shortDescription: 'مجموعه کامل آموزش و ابزارهای تدوین ویدیو برای یوتیوبرها',
    price: '۳۲۰,۰۰۰',
    discountPrice: '۲۸۹,۰۰۰',
    level: 'مبتدی تا متوسط',
    duration: '۹ ساعت',
    includes: [
      '۵۰ ویدیوی آموزشی',
      'قالب‌های آماده',
      'ترنزیشن‌های مخصوص',
      'موسیقی بدون کپی‌رایت',
    ],
    tags: ['یوتیوب', 'تدوین ویدیو', 'کانتنت کریتور'],
  },
];

export default function EditingPacksPage() {
  const [cartItems, setCartItems] = useState<string[]>([]);

  const handleAddToCart = (e: React.MouseEvent, packId: string) => {
    e.stopPropagation(); // Prevent navigation when clicking the button

    if (!cartItems.includes(packId)) {
      setCartItems([...cartItems, packId]);
      // Show a toast notification
      alert(`پک ${packId} به سبد خرید اضافه شد`);
      // In a real app, you'd use a proper toast notification system
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading font-bold text-center mb-4">
        پک‌های آموزش تدوین ویدیو
      </h1>
      <p className="text-gray-600 text-center mb-12">
        مجموعه کامل آموزش‌ها و ابزارهای مورد نیاز برای تدوین حرفه‌ای ویدیو
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    shortDescription: string;
    price: string;
    discountPrice: string;
    level: string;
    tags: string[];
  };
  isInCart: boolean;
  onAddToCart: (e: React.MouseEvent) => void;
}

function EditingPackCard({
  pack,
  isInCart,
  onAddToCart,
}: EditingPackCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/editing-packs/${pack.id}`);
  };

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all hover:shadow-xl cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative h-52 w-full">
        <Image
          src={pack.image}
          alt={pack.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {pack.level}
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {pack.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className="text-xl font-heading font-bold mb-3">{pack.title}</h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {pack.shortDescription}
        </p>

        <div className="flex justify-between items-center mb-5">
          <div className="flex flex-col">
            <span className="text-gray-400 line-through text-sm">
              {pack.price} تومان
            </span>
            <span className="text-blue-600 font-bold">
              {pack.discountPrice} تومان
            </span>
          </div>

          <button
            onClick={onAddToCart}
            className={`
              px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center
              ${
                isInCart
                  ? 'bg-green-100 text-green-700 border border-green-200'
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
    </div>
  );
}

// This is a separate component that would be in another file
// for the detailed page of each editing pack
export function EditingPackDetailPage({ params }: { params: { id: string } }) {
  const packId = params.id;
  const pack = editingPacks.find(p => p.id === packId);

  if (!pack) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-heading font-bold mb-4">
          پک مورد نظر یافت نشد
        </h1>
        <Link href="/editing-packs" className="text-blue-600 hover:underline">
          بازگشت به صفحه پک‌های آموزشی
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/editing-packs"
        className="flex items-center text-blue-600 hover:underline mb-8"
      >
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        بازگشت به صفحه پک‌های آموزشی
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={pack.image}
            alt={pack.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {pack.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl font-heading font-bold mb-4">{pack.title}</h1>
          <p className="text-gray-600 mb-6">{pack.shortDescription}</p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600 ml-2"
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
                <span className="text-gray-700">مدت زمان: {pack.duration}</span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span className="text-gray-700">سطح: {pack.level}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-3">این پک شامل:</h3>
            <ul className="space-y-2">
              {pack.includes.map((item, index) => (
                <li key={index} className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 ml-2"
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
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center mb-8">
            <div className="flex flex-col">
              <span className="text-gray-400 line-through text-sm">
                {pack.price} تومان
              </span>
              <span className="text-blue-600 text-2xl font-bold">
                {pack.discountPrice} تومان
              </span>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center">
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

          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-500 ml-2 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-gray-700">
              پس از خرید، دسترسی به این پک به صورت مادام‌العمر برای شما فعال
              خواهد شد و می‌توانید از طریق پنل کاربری خود به آن دسترسی داشته
              باشید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
