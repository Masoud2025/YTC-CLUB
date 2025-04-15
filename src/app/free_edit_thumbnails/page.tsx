'use client';
import React, { useState } from 'react';
import Image from 'next/image';

// Sample video data - replace with your actual data
const videoData = [
  {
    id: 1,
    title: 'چگونه در یوتیوب به ۱۰۰۰ سابسکرایبر برسیم',
    thumbnail: '/videos/thumbnail-1.jpg',
    videoUrl: '/videos/video-1.mp4',
    duration: '۱۲:۳۵',
    views: '۱۴ هزار بازدید',
    uploadTime: '۲ هفته پیش',
    channelName: 'یوتیوب کلاب',
    channelAvatar: '/avatars/channel-1.jpg',
  },
  {
    id: 2,
    title: 'آموزش طراحی تامبنیل حرفه‌ای برای ویدیوهای یوتیوب',
    thumbnail: '/videos/thumbnail-2.jpg',
    videoUrl: '/videos/video-2.mp4',
    duration: '۲۱:۰۸',
    views: '۸.۵ هزار بازدید',
    uploadTime: '۱ ماه پیش',
    channelName: 'یوتیوب کلاب',
    channelAvatar: '/avatars/channel-1.jpg',
  },
  {
    id: 3,
    title: 'بهترین دوربین‌ها برای یوتیوبرها در سال ۲۰۲۵',
    thumbnail: '/videos/thumbnail-3.jpg',
    videoUrl: '/videos/video-3.mp4',
    duration: '۱۸:۲۲',
    views: '۲۳ هزار بازدید',
    uploadTime: '۳ روز پیش',
    channelName: 'یوتیوب کلاب',
    channelAvatar: '/avatars/channel-1.jpg',
  },
  {
    id: 4,
    title: 'ترفندهای سئو برای رشد کانال یوتیوب',
    thumbnail: '/videos/thumbnail-4.jpg',
    videoUrl: '/videos/video-4.mp4',
    duration: '۱۵:۴۵',
    views: '۱۰ هزار بازدید',
    uploadTime: '۱ هفته پیش',
    channelName: 'یوتیوب کلاب',
    channelAvatar: '/avatars/channel-1.jpg',
  },
  {
    id: 5,
    title: 'آموزش ادیت ویدیو با پریمیر پرو - قسمت اول',
    thumbnail: '/videos/thumbnail-5.jpg',
    videoUrl: '/videos/video-5.mp4',
    duration: '۲۵:۱۰',
    views: '۱۸ هزار بازدید',
    uploadTime: '۲ ماه پیش',
    channelName: 'یوتیوب کلاب',
    channelAvatar: '/avatars/channel-1.jpg',
  },
  {
    id: 6,
    title: 'چگونه از یوتیوب کسب درآمد کنیم - آموزش کامل',
    thumbnail: '/videos/thumbnail-6.jpg',
    videoUrl: '/videos/video-6.mp4',
    duration: '۳۲:۱۵',
    views: '۴۵ هزار بازدید',
    uploadTime: '۳ هفته پیش',
    channelName: 'یوتیوب کلاب',
    channelAvatar: '/avatars/channel-1.jpg',
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
    <div className="container mx-auto px-4 py-8">
      {/* Video Player Section - Shows when a video is selected */}
      {selectedVideo && (
        <div className="mb-12 bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
          <div className="relative aspect-video w-full">
            <video
              src={selectedVideo.videoUrl}
              className="w-full h-full object-contain"
              controls
              autoPlay={isPlaying}
              poster={selectedVideo.thumbnail}
            >
              مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
            </video>
          </div>

          <div className="p-6 text-white">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-heading font-bold">
                {selectedVideo.title}
              </h1>
              <button
                onClick={handleCloseVideo}
                className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full"
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

            <div className="flex items-center mt-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ml-3">
                <Image
                  src={selectedVideo.channelAvatar}
                  alt={selectedVideo.channelName}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div>
                <p className="font-bold">{selectedVideo.channelName}</p>
                <p className="text-gray-400 text-sm">
                  {selectedVideo.views} • {selectedVideo.uploadTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Grid Section */}
      <h2 className="text-2xl font-heading font-bold mb-6">ویدیوهای آموزشی</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videoData.map(video => (
          <VideoCard
            key={video.id}
            video={video}
            onSelect={() => handleVideoSelect(video)}
          />
        ))}
      </div>
    </div>
  );
}

interface VideoCardProps {
  video: (typeof videoData)[0];
  onSelect: () => void;
}

function VideoCard({ video, onSelect }: VideoCardProps) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onSelect}
    >
      <div className="relative aspect-video">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>

      <div className="p-4">
        <div className="flex">
          <div className="relative w-9 h-9 rounded-full overflow-hidden ml-3 flex-shrink-0">
            <Image
              src={video.channelAvatar}
              alt={video.channelName}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-1">
              {video.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {video.channelName}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              {video.views} • {video.uploadTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
