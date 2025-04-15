'use client';
import React from 'react';
import Image from 'next/image';

// Sample data for the cards
const resourceData = [
  {
    id: 1,
    title: 'قالب تامبنیل یوتیوب',
    image: '/resources/thumbnail-template-1.jpg',
    fileSize: '۱۵ مگابایت',
    fileType: 'PSD',
    downloadUrl: '/downloads/youtube-thumbnail-template-1.zip',
  },
  {
    id: 2,
    title: 'پک آیکون‌های شبکه‌های اجتماعی',
    image: '/resources/social-icons-pack.jpg',
    fileSize: '۸ مگابایت',
    fileType: 'PNG + SVG',
    downloadUrl: '/downloads/social-icons-pack.zip',
  },
  {
    id: 3,
    title: 'فونت فارسی یکان',
    image: '/resources/yekan-font.jpg',
    fileSize: '۲ مگابایت',
    fileType: 'TTF + WOFF',
    downloadUrl: '/downloads/yekan-font.zip',
  },
  {
    id: 4,
    title: 'افکت‌های صوتی یوتیوب',
    image: '/resources/sound-effects.jpg',
    fileSize: '۴۵ مگابایت',
    fileType: 'MP3',
    downloadUrl: '/downloads/youtube-sound-effects.zip',
  },
  {
    id: 5,
    title: 'قالب اینترو آماده',
    image: '/resources/intro-template.jpg',
    fileSize: '۱۲۰ مگابایت',
    fileType: 'AEP',
    downloadUrl: '/downloads/intro-template.zip',
  },
  {
    id: 6,
    title: 'پک موشن گرافیک',
    image: '/resources/motion-graphics-pack.jpg',
    fileSize: '۲۵۰ مگابایت',
    fileType: 'MOV + AEP',
    downloadUrl: '/downloads/motion-graphics-pack.zip',
  },
];

export default function DownloadResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading font-bold text-center mb-12">
        منابع و فایل‌های دانلودی
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resourceData.map(resource => (
          <DownloadCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}

interface DownloadCardProps {
  resource: {
    id: number;
    title: string;
    image: string;
    fileSize: string;
    fileType: string;
    downloadUrl: string;
  };
}

function DownloadCard({ resource }: DownloadCardProps) {
  const handleDownload = () => {
    // You can add analytics tracking or other logic here
    console.log(`Downloading ${resource.title}`);

    // Create a direct download link
    const link = document.createElement('a');
    link.href = resource.downloadUrl;
    link.download = resource.downloadUrl.split('/').pop() || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all hover:shadow-xl">
      <div className="relative h-48 w-full">
        <Image
          src={resource.image}
          alt={resource.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h2 className="text-xl font-heading font-bold mb-3">
          {resource.title}
        </h2>

        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center text-gray-600 text-sm">
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
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>{resource.fileType}</span>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
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
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
            <span>{resource.fileSize}</span>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
        >
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          دانلود فایل
        </button>
      </div>
    </div>
  );
}
