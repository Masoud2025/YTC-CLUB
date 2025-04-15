'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Sample card data - replace with your actual data
const cardData = [
  {
    id: 1,
    title: 'دوره جامع یوتیوب',
    description: 'آموزش کامل ساخت و مدیریت کانال یوتیوب از صفر تا صد',
    image: '/footbaly.jpg',
    price: '۲,۹۹۰,۰۰۰ تومان',
    slug: 'youtube-course',
  },
  {
    id: 2,
    title: 'پک طراحی تامبنیل',
    description: 'مجموعه کامل قالب‌های آماده برای طراحی تامبنیل حرفه‌ای',
    image: '/footbaly.jpg',
    price: '۱,۴۹۰,۰۰۰ تومان',
    slug: 'thumbnail-pack',
  },
  {
    id: 3,
    title: 'آموزش ادیت ویدیو',
    description: 'تدوین حرفه‌ای ویدیو با پریمیر و افترافکت',
    image: '/footbaly.jpg',
    price: '۱,۹۹۰,۰۰۰ تومان',
    slug: 'video-editing',
  },
  {
    id: 4,
    title: 'پک موشن گرافیک',
    description: 'مجموعه انیمیشن‌های آماده برای ویدیوهای یوتیوب',
    image: '/footbaly.jpg',
    price: '۱,۲۹۰,۰۰۰ تومان',
    slug: 'motion-graphics',
  },
  {
    id: 5,
    title: 'دوره مانتیزه کردن',
    description: 'آموزش کسب درآمد از یوتیوب و استراتژی‌های مانتیزه کردن',
    image: '/footbaly.jpg',
    price: '۲,۴۹۰,۰۰۰ تومان',
    slug: 'monetization',
  },
  {
    id: 6,
    title: 'پک صوتی یوتیوب',
    description: 'مجموعه موسیقی و افکت‌های صوتی مخصوص ویدیوهای یوتیوب',
    image: '/footbaly.jpg',
    price: '۹۹۰,۰۰۰ تومان',
    slug: 'audio-pack',
  },
];

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading font-bold text-center mb-12 text-blue-700">
        دوره‌ها و پک‌های آموزشی
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cardData.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

interface CardProps {
  card: {
    id: number;
    title: string;
    description: string;
    image: string;
    price: string;
    slug: string;
  };
}

function Card({ card }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
      <div className="relative h-48 w-full">
        <Image
          src={card.image}
          alt={card.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-6">
        <h2 className="text-xl font-heading font-bold mb-2">{card.title}</h2>
        <p className="text-gray-600 mb-4 text-sm h-12 overflow-hidden">
          {card.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold">{card.price}</span>
          <Link
            href={`/courses/${card.slug}`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            مشاهده دوره
          </Link>
        </div>
      </div>
    </div>
  );
}
