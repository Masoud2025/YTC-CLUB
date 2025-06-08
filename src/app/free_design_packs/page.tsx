/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const handleDownload = (card: any) => {
    // Replace this with your actual download logic
    console.log('Downloading:', card.title);

    // Example: Create a download link
    // const link = document.createElement('a');
    // link.href = `/downloads/${card.slug}.zip`; // Your download URL
    // link.download = `${card.title}.zip`;
    // link.click();
  };

  return (
    <div className="min-h-screen bg-transparent relative mt-[10%]">
      {/* Subtle Glass Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Very subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Courses Grid - Square Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {cardData.map(card => (
            <motion.div key={card.id} variants={itemVariants}>
              <Card card={card} onDownload={handleDownload} />
            </motion.div>
          ))}
        </motion.div>
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
  onDownload: (card: any) => void;
}

function Card({ card, onDownload }: CardProps) {
  return (
    <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 group aspect-square flex flex-col transform hover:-translate-y-2 hover:scale-105">
      {/* Square Image Container - Takes most of the card */}
      <div className="relative flex-1 w-full overflow-hidden">
        {/* Image with padding to keep it contained */}
        <div className="relative w-full h-full p-3">
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Download Button - Centered */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onDownload(card)}
            className="backdrop-blur-xl bg-green-500/90 hover:bg-green-600/90 border border-white/30 rounded-full p-4 transition-all duration-200 shadow-2xl transform scale-75 group-hover:scale-100 hover:shadow-green-500/25"
            title="دانلود"
          >
            {/* Download Icon */}
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Compact Card Content - Bottom section with centered text */}
      <div className="p-4 flex-shrink-0 flex items-center justify-center text-center">
        <h3 className="font-bold text-white line-clamp-2 text-sm leading-tight hover:text-gray-300 transition-colors duration-300">
          {card.title}
        </h3>
      </div>

      {/* Animated Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-green-400 via-white to-green-400 transition-all duration-300 transform origin-center scale-x-0 group-hover:scale-x-100" />
    </div>
  );
}
