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

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            منابع و فایل‌های دانلودی
          </h1>
          <p className="text-gray-300 text-lg">
            مجموعه کاملی از منابع و ابزارهای مفید
          </p>
        </motion.div>

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
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group aspect-square flex flex-col"
    >
      {/* Square Image - Takes most of the card */}
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={resource.image}
          alt={resource.title}
          fill
          className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Download Button - Centered */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
            onClick={handleDownload}
            className="backdrop-blur-xl bg-green-500/80 hover:bg-green-600/80 border border-white/30 rounded-full p-4 transition-all duration-300 shadow-2xl"
          >
            <FiDownload className="w-6 h-6 text-white" />
          </motion.button>
        </motion.div>

        {/* Download Button - Top Right Corner */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={e => {
            e.stopPropagation();
            handleDownload();
          }}
          className="absolute top-3 right-3 backdrop-blur-xl bg-green-500/80 hover:bg-green-600/80 border border-white/20 text-white p-2 rounded-full shadow-lg transition-all duration-300"
        >
          <FiDownload className="w-3 h-3" />
        </motion.button>
      </div>

      {/* Compact Card Content - Bottom section with centered text */}
      <div className="p-4 flex-shrink-0 flex items-center justify-center text-center">
        <h3 className="font-bold text-white line-clamp-2 text-sm leading-tight hover:text-gray-300 transition-colors duration-300">
          {resource.title}
        </h3>
      </div>

      {/* Animated Bottom Border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        className="h-1 bg-gradient-to-r from-gray-400 via-white to-gray-400 origin-center transition-all duration-500"
      />
    </motion.div>
  );
}
