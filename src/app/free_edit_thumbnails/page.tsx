'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Sample video data - replace with your actual data
const videoData = [
  {
    id: 1,
    title: 'چگونه در یوتیوب به ۱۰۰۰ سابسکرایبر برسیم',
    thumbnail: '/videos/thumbnail-1.jpg',
    videoUrl: '/videos/video-1.mp4',
    duration: '۱۲:۳۵',
  },
  {
    id: 2,
    title: 'آموزش طراحی تامبنیل حرفه‌ای برای ویدیوهای یوتیوب',
    thumbnail: '/videos/thumbnail-2.jpg',
    videoUrl: '/videos/video-2.mp4',
    duration: '۲۱:۰۸',
  },
  {
    id: 3,
    title: 'بهترین دوربین‌ها برای یوتیوبرها در سال ۲۰۲۵',
    thumbnail: '/videos/thumbnail-3.jpg',
    videoUrl: '/videos/video-3.mp4',
    duration: '۱۸:۲۲',
  },
  {
    id: 4,
    title: 'ترفندهای سئو برای رشد کانال یوتیوب',
    thumbnail: '/videos/thumbnail-4.jpg',
    videoUrl: '/videos/video-4.mp4',
    duration: '۱۵:۴۵',
  },
  {
    id: 5,
    title: 'آموزش ادیت ویدیو با پریمیر پرو - قسمت اول',
    thumbnail: '/videos/thumbnail-5.jpg',
    videoUrl: '/videos/video-5.mp4',
    duration: '۲۵:۱۰',
  },
  {
    id: 6,
    title: 'چگونه از یوتیوب کسب درآمد کنیم - آموزش کامل',
    thumbnail: '/videos/thumbnail-6.jpg',
    videoUrl: '/videos/video-6.mp4',
    duration: '۳۲:۱۵',
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-[#282A2A] text-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Video Player Section - Shows when a video is selected */}
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-12 bg-[#353737]/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-gray-700/50"
          >
            <div className="relative aspect-video w-full">
              <video
                src={selectedVideo.videoUrl}
                className="w-full h-full object-contain bg-black"
                controls
                autoPlay={isPlaying}
                poster={selectedVideo.thumbnail}
              >
                مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
              </video>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold text-white">
                  {selectedVideo.title}
                </h1>
                <button
                  onClick={handleCloseVideo}
                  className="bg-gray-700/80 hover:bg-gray-600 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
                  aria-label="بستن ویدیو"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl text-center font-bold mb-2 text-white">
            ویدیوهای آموزشی
          </h2>
          <p className="text-gray-400 text-center">
            مجموعه کامل آموزش‌های تولید محتوا و یوتیوب
          </p>
        </div>

        {/* Video Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videoData.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              index={index}
              onSelect={() => handleVideoSelect(video)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface VideoCardProps {
  video: (typeof videoData)[0];
  index: number;
  onSelect: () => void;
}

function VideoCard({ video, index, onSelect }: VideoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-[#353737]/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-gray-700/50 group"
      onClick={onSelect}
    >
      {/* Square Thumbnail Container */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="transition-transform duration-300 group-hover:scale-110"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-medium">
          {video.duration}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="font-bold text-white text-sm line-clamp-3 leading-tight">
          {video.title}
        </h3>
      </div>
    </motion.div>
  );
}
