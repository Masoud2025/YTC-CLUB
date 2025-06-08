'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiX, FiDownload } from 'react-icons/fi';

// Sample video data - replace with your actual data
const videoData = [
  {
    id: 1,
    title: 'چگونه در یوتیوب به ۱۰۰۰ سابسکرایبر برسیم',
    thumbnail: '/videos/thumbnail-1.jpg',
    videoUrl: '/videos/video-1.mp4',
    downloadUrl: '/downloads/video-1.zip',
  },
  {
    id: 2,
    title: 'آموزش طراحی تامبنیل حرفه‌ای برای ویدیوهای یوتیوب',
    thumbnail: '/videos/thumbnail-2.jpg',
    videoUrl: '/videos/video-2.mp4',
    downloadUrl: '/downloads/video-2.zip',
  },
  {
    id: 3,
    title: 'بهترین دوربین‌ها برای یوتیوبرها در سال ۲۰۲۵',
    thumbnail: '/videos/thumbnail-3.jpg',
    videoUrl: '/videos/video-3.mp4',
    downloadUrl: '/downloads/video-3.zip',
  },
  {
    id: 4,
    title: 'ترفندهای سئو برای رشد کانال یوتیوب',
    thumbnail: '/videos/thumbnail-4.jpg',
    videoUrl: '/videos/video-4.mp4',
    downloadUrl: '/downloads/video-4.zip',
  },
  {
    id: 5,
    title: 'آموزش ادیت ویدیو با پریمیر پرو - قسمت اول',
    thumbnail: '/videos/thumbnail-5.jpg',
    videoUrl: '/videos/video-5.mp4',
    downloadUrl: '/downloads/video-5.zip',
  },
  {
    id: 6,
    title: 'چگونه از یوتیوب کسب درآمد کنیم - آموزش کامل',
    thumbnail: '/videos/thumbnail-6.jpg',
    videoUrl: '/videos/video-6.mp4',
    downloadUrl: '/downloads/video-6.zip',
  },
];

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<
    null | (typeof videoData)[0]
  >(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoSelect = (video: (typeof videoData)[0]) => {
    setSelectedVideo(video);
    setIsPlaying(true);
    // Scroll to video player with offset
    setTimeout(() => {
      const videoElement = document.getElementById('video-player');
      if (videoElement) {
        videoElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  const handleDownload = (downloadUrl: string, title: string) => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${title}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          <h2 className="text-4xl font-bold text-white mb-4">
            ویدیوهای آموزشی
          </h2>
          <p className="text-gray-300 text-lg">
            مجموعه کاملی از آموزش‌های تخصصی یوتیوب
          </p>
        </motion.div>

        {/* Video Grid - Square Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16"
        >
          {videoData.map(video => (
            <motion.div key={video.id} variants={itemVariants}>
              <VideoCard
                video={video}
                onSelect={() => handleVideoSelect(video)}
                onDownload={() =>
                  handleDownload(video.downloadUrl, video.title)
                }
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Video Player Section - Moved Down */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              id="video-player"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -50 }}
              className="mt-16 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="relative aspect-video w-full">
                <video
                  src={selectedVideo.videoUrl}
                  className="w-full h-full object-contain rounded-t-3xl"
                  controls
                  autoPlay={isPlaying}
                  poster={selectedVideo.thumbnail}
                >
                  مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
                </video>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h1 className="text-3xl font-bold text-white leading-tight">
                    {selectedVideo.title}
                  </h1>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCloseVideo}
                    className="backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
                    aria-label="بستن ویدیو"
                  >
                    <FiX className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="flex justify-end">
                  {/* Download Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      handleDownload(
                        selectedVideo.downloadUrl,
                        selectedVideo.title,
                      )
                    }
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300 shadow-lg backdrop-blur-xl border border-white/20 flex items-center space-x-2 space-x-reverse"
                  >
                    <FiDownload className="w-5 h-5" />
                    <span>دانلود</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface VideoCardProps {
  video: (typeof videoData)[0];
  onSelect: () => void;
  onDownload: () => void;
}

function VideoCard({ video, onSelect, onDownload }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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
          src={video.thumbnail}
          alt={video.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play Button Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
            onClick={onSelect}
            className="backdrop-blur-xl bg-white/20 hover:bg-white/30 border border-white/30 rounded-full p-4 transition-all duration-300 shadow-2xl"
          >
            <FiPlay className="w-6 h-6 text-white ml-1" />
          </motion.button>
        </motion.div>

        {/* Download Button - Top Left */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={e => {
            e.stopPropagation();
            onDownload();
          }}
          className="absolute top-3 left-3 backdrop-blur-xl bg-green-500/80 hover:bg-green-600/80 border border-white/20 text-white p-2 rounded-full shadow-lg transition-all duration-300"
        >
          <FiDownload className="w-3 h-3" />
        </motion.button>
      </div>

      {/* Compact Card Content - Bottom section */}
      <div className="p-4 flex-shrink-0">
        <h3 className="font-bold text-white line-clamp-2 text-sm leading-tight hover:text-gray-300 transition-colors duration-300">
          {video.title}
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
