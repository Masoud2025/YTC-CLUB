/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiX, FiDownload, FiGift } from 'react-icons/fi';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  videoUrl: string;
  downloadUrl: string;
  category: string;
  duration: string;
  fileSize: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

interface VideoData {
  videos: Video[];
  categories: string[];
}

export default function VideosPage() {
  const [videoData, setVideoData] = useState<Video[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<number | null>(null);

  // Load videos from JSON
  useEffect(() => {
    const loadVideos = async () => {
      try {
        const response = await fetch('/api/videos');
        const data: VideoData = await response.json();
        setVideoData(data.videos.filter(video => video.isActive));
        setCategories(data.categories);
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    setIsPlaying(true);
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

  const handleDownload = async (
    downloadUrl: string,
    title: string,
    videoId: number,
  ) => {
    setDownloading(videoId);
    try {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${title}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setTimeout(() => setDownloading(null), 1000);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white mt-4 text-center">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent relative">
      {/* Subtle Glass Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <FiGift className="w-8 h-8 text-green-400" />
            <h2 className="text-4xl font-bold text-white">
              ویدیوهای آموزشی رایگان
            </h2>
          </div>
          <p className="text-gray-300 text-lg">
            مجموعه کاملی از آموزش‌های تخصصی یوتیوب - کاملاً رایگان
          </p>
          <div className="mt-4 backdrop-blur-xl bg-green-500/20 border border-green-400/30 rounded-full px-6 py-2 inline-block">
            <span className="text-green-300 font-semibold">
              {videoData.length} ویدیو آموزشی رایگان
            </span>
          </div>
        </motion.div>

        {/* Video Grid */}
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
                  handleDownload(video.downloadUrl, video.title, video.id)
                }
                isDownloading={downloading === video.id}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Video Player Section */}
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
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-white leading-tight mb-2">
                      {selectedVideo.title}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-4">
                      <span className="backdrop-blur-xl bg-white/10 px-3 py-1 rounded-full">
                        {selectedVideo.category}
                      </span>
                      <span>{selectedVideo.duration}</span>
                      <span>{selectedVideo.fileSize}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedVideo.description}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCloseVideo}
                    className="backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white p-3 rounded-full transition-all duration-300 shadow-lg ml-4"
                    aria-label="بستن ویدیو"
                  >
                    <FiX className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      handleDownload(
                        selectedVideo.downloadUrl,
                        selectedVideo.title,
                        selectedVideo.id,
                      )
                    }
                    disabled={downloading === selectedVideo.id}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold px-8 py-3 rounded-2xl transition-all duration-300 shadow-lg backdrop-blur-xl border border-white/20 flex items-center space-x-2 space-x-reverse"
                  >
                    {downloading === selectedVideo.id ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>در حال دانلود...</span>
                      </>
                    ) : (
                      <>
                        <FiDownload className="w-5 h-5" />
                        <span>دانلود رایگان</span>
                      </>
                    )}
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
  video: Video;
  onSelect: () => void;
  onDownload: () => void;
  isDownloading: boolean;
}

function VideoCard({
  video,
  onSelect,
  onDownload,
  isDownloading,
}: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group aspect-square flex flex-col"
    >
      {/* Square Image */}
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="group-hover:scale-110 transition-transform duration-700"
        />

        {/* Free Badge */}
        <div className="absolute top-3 right-3 backdrop-blur-xl bg-green-500/80 border border-white/20 text-white px-2 py-1 rounded-full text-xs font-bold">
          رایگان
        </div>

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

        {/* Download Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={e => {
            e.stopPropagation();
            onDownload();
          }}
          disabled={isDownloading}
          className="absolute top-3 left-3 backdrop-blur-xl bg-green-500/80 hover:bg-green-600/80 disabled:bg-gray-500/80 border border-white/20 text-white p-2 rounded-full shadow-lg transition-all duration-300"
        >
          {isDownloading ? (
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
          ) : (
            <FiDownload className="w-3 h-3" />
          )}
        </motion.button>

        {/* Video Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex justify-between items-center text-xs text-white">
            <span>{video.duration}</span>
            <span>{video.fileSize}</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-shrink-0">
        <div className="mb-2">
          <span className="text-xs text-green-400 font-semibold">
            {video.category}
          </span>
        </div>
        <h3 className="font-bold text-white line-clamp-2 text-sm leading-tight hover:text-gray-300 transition-colors duration-300">
          {video.title}
        </h3>
      </div>

      {/* Animated Bottom Border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        className="h-1 bg-gradient-to-r from-green-400 via-white to-green-400 origin-center transition-all duration-500"
      />
    </motion.div>
  );
}
