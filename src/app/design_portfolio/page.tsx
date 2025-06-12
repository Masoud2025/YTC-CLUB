'use client';
import React, { useState } from 'react';
import Image from 'next/image';

// Define image categories and their data
const CATEGORIES = {
  CHALLENGE_VLOG: 'challenge_vlog',
  GAMING: 'gaming',
  OTHER: 'other',
} as const;

// Define types
type CategoryType = (typeof CATEGORIES)[keyof typeof CATEGORIES];

interface ImageData {
  id: string;
  src: string;
  alt: string;
}

type ImagesData = {
  [K in CategoryType]: ImageData[];
};

const ThumbnailGallery = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>(
    CATEGORIES.CHALLENGE_VLOG,
  );
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Sample image data with categories
  const allImages: ImagesData = {
    [CATEGORIES.CHALLENGE_VLOG]: Array(16)
      .fill(null)
      .map(
        (_, i): ImageData => ({
          id: `challenge-${i}`,
          src: `/thumbnails/challenge-${i + 1}.png`,
          alt: `نمونه تامنیل چالش ولاگ ${i + 1}`,
        }),
      ),
    [CATEGORIES.GAMING]: Array(16)
      .fill(null)
      .map(
        (_, i): ImageData => ({
          id: `gaming-${i}`,
          src: `/thumbnails/gaming-${i + 1}.png`,
          alt: `نمونه تامنیل گیم ${i + 1}`,
        }),
      ),
    [CATEGORIES.OTHER]: Array(16)
      .fill(null)
      .map(
        (_, i): ImageData => ({
          id: `other-${i}`,
          src: `/thumbnails/other-${i + 1}.png`,
          alt: `نمونه تامنیل سایر ${i + 1}`,
        }),
      ),
  };

  // Get current images based on active category
  const currentImages: ImageData[] = allImages[activeCategory];

  // Handle image click
  const handleImageClick = (image: ImageData): void => {
    setSelectedImage(image);
  };

  // Handle close modal
  const handleCloseModal = (): void => {
    setSelectedImage(null);
    setIsFullscreen(false);
  };

  // Handle fullscreen toggle
  const handleFullscreen = (): void => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle download image
  const handleDownload = async (): Promise<void> => {
    if (!selectedImage) return;

    try {
      const response = await fetch(selectedImage.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedImage.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  // Handle image error
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ): void => {
    const target = e.currentTarget;
    target.src = '/challenge-1.png';
  };

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      {/* Header */}
      <h2
        className="text-3xl font-bold text-center mb-8"
        style={{ color: '#1877F2' }}
      >
        نمونه های طراحی تامنیل
      </h2>

      {/* Filter Buttons */}
      <div className="flex justify-center mb-8 gap-4">
        <button
          className={`px-6 py-2 rounded-full transition-colors ${
            activeCategory === CATEGORIES.OTHER
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={() => setActiveCategory(CATEGORIES.OTHER)}
        >
          سایر سبک
        </button>
        <button
          className={`px-6 py-2 rounded-full transition-colors ${
            activeCategory === CATEGORIES.GAMING
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={() => setActiveCategory(CATEGORIES.GAMING)}
        >
          سبک گیم
        </button>
        <button
          className={`px-6 py-2 rounded-full transition-colors ${
            activeCategory === CATEGORIES.CHALLENGE_VLOG
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={() => setActiveCategory(CATEGORIES.CHALLENGE_VLOG)}
        >
          سبک چالش ولاگ
        </button>
      </div>

      {/* Image Grid - 16:9 aspect ratio */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {currentImages.slice(0, 16).map((image: ImageData) => (
          <div
            key={image.id}
            className="cursor-pointer hover:scale-105 transition-transform duration-300"
            style={{
              width: '100%',
              aspectRatio: '16/9',
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
            onClick={() => handleImageClick(image)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: 'cover',
              }}
              onError={handleImageError}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
          }}
          onClick={handleCloseModal}
        >
          <div
            className={`relative ${
              isFullscreen
                ? 'w-screen h-screen'
                : 'max-w-4xl max-h-[80vh] w-full mx-4'
            }`}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {/* Image Container */}
            <div
              className={`relative ${
                isFullscreen ? 'w-full h-full' : 'w-full h-full'
              }`}
              style={{
                aspectRatio: isFullscreen ? 'auto' : '16/9',
              }}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                sizes={isFullscreen ? '100vw' : '80vw'}
                style={{
                  objectFit: isFullscreen ? 'contain' : 'cover',
                }}
                className="rounded-lg"
              />
            </div>

            {/* Control Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
                title="بستن"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="absolute bottom-4 right-4 flex gap-2">
              {/* Fullscreen Button */}
              <button
                onClick={handleFullscreen}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                title={isFullscreen ? 'خروج از تمام صفحه' : 'تمام صفحه'}
              >
                {isFullscreen ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 3V5H5V8H3V5C3 3.89543 3.89543 3 5 3H8ZM21 8V5C21 3.89543 20.1046 3 19 3H16V5H19V8H21ZM3 16V19C3 20.1046 3.89543 21 5 21H8V19H5V16H3ZM21 16V19C21 20.1046 20.1046 21 19 21H16V19H19V16H21Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 14H5V19H10V17H7V14ZM12 14H14V17H17V19H12V14ZM17 10V7H14V5H19V10H17ZM10 5V7H7V10H5V5H10Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </button>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors"
                title="دانلود تصویر"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15M17 10L12 15M12 15L7 10M12 15V3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThumbnailGallery;
