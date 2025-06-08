'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Sample card data - replace with your actual data
const cardData = [
  {
    id: 1,
    title: 'دوره جامع یوتیوب',
    description: 'آموزش کامل ساخت و مدیریت کانال یوتیوب از صفر تا صد',
    image: '/footbaly.jpg',
    slug: 'youtube-course',
  },
  {
    id: 2,
    title: 'پک طراحی تامبنیل',
    description: 'مجموعه کامل قالب‌های آماده برای طراحی تامبنیل حرفه‌ای',
    image: '/footbaly.jpg',
    slug: 'thumbnail-pack',
  },
  {
    id: 3,
    title: 'آموزش ادیت ویدیو',
    description: 'تدوین حرفه‌ای ویدیو با پریمیر و افترافکت',
    image: '/footbaly.jpg',
    slug: 'video-editing',
  },
  {
    id: 4,
    title: 'پک موشن گرافیک',
    description: 'مجموعه انیمیشن‌های آماده برای ویدیوهای یوتیوب',
    image: '/footbaly.jpg',
    slug: 'motion-graphics',
  },
  {
    id: 5,
    title: 'دوره مانتیزه کردن',
    description: 'آموزش کسب درآمد از یوتیوب و استراتژی‌های مانتیزه کردن',
    image: '/footbaly.jpg',
    slug: 'monetization',
  },
  {
    id: 6,
    title: 'پک صوتی یوتیوب',
    description: 'مجموعه موسیقی و افکت‌های صوتی مخصوص ویدیوهای یوتیوب',
    image: '/footbaly.jpg',
    slug: 'audio-pack',
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[#282A2A] text-gray-100 mt-[5em]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cardData.map((card, index) => (
            <Card key={card.id} card={card} index={index} />
          ))}
        </div>
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
    slug: string;
  };
  index: number;
}

function Card({ card, index }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-[#353737]/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-gray-700/50"
    >
      {/* Square Image Container */}
      <div className="relative aspect-square w-full">
        <Image
          src={card.image}
          alt={card.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold mb-2 text-white line-clamp-2">
          {card.title}
        </h2>
        <p className="text-gray-300 mb-4 text-sm line-clamp-3 leading-relaxed">
          {card.description}
        </p>

        <Link
          href={`/courses/${card.slug}`}
          className="block w-full bg-[#0F3F77] hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-300 text-center hover:shadow-lg"
        >
          مشاهده دوره
        </Link>
      </div>
    </motion.div>
  );
}
