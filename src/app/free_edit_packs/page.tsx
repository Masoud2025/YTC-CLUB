'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';

// Sample data for the cards
const resourceData = [
  {
    id: 1,
    title: 'قالب تامبنیل یوتیوب',
    image: '/footbaly.jpg',
    downloadUrl: '/downloads/youtube-thumbnail-template-1.zip',
  },
  {
    id: 2,
    title: 'پک آیکون‌های شبکه‌های اجتماعی',
    image: '/footbaly.jpg',
    downloadUrl: '/downloads/social-icons-pack.zip',
  },
  {
    id: 3,
    title: 'فونت فارسی یکان',
    image: '/footbaly.jpg',
    downloadUrl: '/downloads/yekan-font.zip',
  },
  {
    id: 4,
    title: 'افکت‌های صوتی یوتیوب',
    image: '/footbaly.jpg',
    downloadUrl: '/downloads/youtube-sound-effects.zip',
  },
  {
    id: 5,
    title: 'قالب اینترو آماده',
    image: '/footbaly.jpg',
    downloadUrl: '/downloads/intro-template.zip',
  },
  {
    id: 6,
    title: 'پک موشن گرافیک',
    image: '/footbaly.jpg',
    downloadUrl: '/downloads/motion-graphics-pack.zip',
  },
];

export default function DownloadResourcesPage() {
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

  return (
    <div className="min-h-screen bg-transparent relative">
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

      <div className="relative z-10 container mx-auto px-4 py-8 mt-[10%]">
        {/* Resources Grid - Square Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {resourceData.map(resource => (
            <motion.div key={resource.id} variants={itemVariants}>
              <DownloadCard resource={resource} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

interface DownloadCardProps {
  resource: {
    id: number;
    title: string;
    image: string;
    downloadUrl: string;
  };
}

function DownloadCard({ resource }: DownloadCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleDownload = () => {
    console.log(`Downloading ${resource.title}`);

    const link = document.createElement('a');
    link.href = resource.downloadUrl;
    link.download = resource.downloadUrl.split('/').pop() || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 group aspect-square flex flex-col transform hover:-translate-y-2 hover:scale-105"
    >
      {/* Square Image Container - Takes most of the card */}
      <div className="relative flex-1 w-full overflow-hidden">
        {/* Image with padding to keep it contained */}
        <div className="relative w-full h-full p-3">
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <Image
              src={resource.image}
              alt={resource.title}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          </div>
        </div>

        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Single Download Button - Centered */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={handleDownload}
            className={`backdrop-blur-xl bg-green-500/90 hover:bg-green-600/90 border border-white/30 rounded-full p-4 transition-all duration-200 shadow-2xl transform ${
              isHovered ? 'scale-100' : 'scale-75'
            }`}
          >
            <FiDownload className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Compact Card Content - Bottom section with centered text */}
      <div className="p-4 flex-shrink-0 flex items-center justify-center text-center">
        <h3 className="font-bold text-white line-clamp-2 text-sm leading-tight hover:text-gray-300 transition-colors duration-300">
          {resource.title}
        </h3>
      </div>

      {/* Animated Bottom Border */}
      <div
        className={`h-1 bg-gradient-to-r from-gray-400 via-white to-gray-400 transition-all duration-300 transform origin-center ${
          isHovered ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    </div>
  );
}
