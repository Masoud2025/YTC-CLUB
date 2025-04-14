'use client';
import React, { useState } from 'react';
import Image from 'next/image';

// Define image categories and their data
const CATEGORIES = {
  CHALLENGE_VLOG: 'challenge_vlog',
  GAMING: 'gaming',
  OTHER: 'other',
};

const ThumbnailGallery = () => {
  const [activeCategory, setActiveCategory] = useState(
    CATEGORIES.CHALLENGE_VLOG,
  );

  // Sample image data with categories
  const allImages = {
    [CATEGORIES.CHALLENGE_VLOG]: Array(16)
      .fill(null)
      .map((_, i) => ({
        id: `challenge-${i}`,
        src: `/thumbnails/challenge-${i + 1}.png`,
        alt: `نمونه تامنیل چالش ولاگ ${i + 1}`,
      })),
    [CATEGORIES.GAMING]: Array(16)
      .fill(null)
      .map((_, i) => ({
        id: `gaming-${i}`,
        src: `/thumbnails/gaming-${i + 1}.png`,
        alt: `نمونه تامنیل گیم ${i + 1}`,
      })),
    [CATEGORIES.OTHER]: Array(16)
      .fill(null)
      .map((_, i) => ({
        id: `other-${i}`,
        src: `/thumbnails/other-${i + 1}.png`,
        alt: `نمونه تامنیل سایر ${i + 1}`,
      })),
  };

  // Get current images based on active category
  const currentImages = allImages[activeCategory];

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
          className={`px-6 py-2 rounded-full ${
            activeCategory === CATEGORIES.OTHER
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => setActiveCategory(CATEGORIES.OTHER)}
        >
          سایر سبک
        </button>
        <button
          className={`px-6 py-2 rounded-full ${
            activeCategory === CATEGORIES.GAMING
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => setActiveCategory(CATEGORIES.GAMING)}
        >
          سبک گیم
        </button>
        <button
          className={`px-6 py-2 rounded-full ${
            activeCategory === CATEGORIES.CHALLENGE_VLOG
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => setActiveCategory(CATEGORIES.CHALLENGE_VLOG)}
        >
          سبک چالش ولاگ
        </button>
      </div>

      {/* Image Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 356px)',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        {currentImages.slice(0, 16).map(image => (
          <div
            key={image.id}
            style={{
              width: '356px',
              height: '253px',
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="356px"
              style={{
                objectFit: 'cover',
              }}
              // Fallback image in case the actual image fails to load
              onError={e => {
                e.currentTarget.src = '/challenge-1.png';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThumbnailGallery;
