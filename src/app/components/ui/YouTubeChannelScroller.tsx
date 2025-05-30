/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface CircularScrollerProps {
  speed?: number;
  size?: number;
}

// Define a type for the social media image data
interface SocialMediaImage {
  id: number;
  src: string;
  alt: string;
  href: string;
}

const CircularScroller: React.FC<CircularScrollerProps> = ({
  speed = 20,
  size = 180, // Default size for larger screens
}) => {
  // State to track current screen size for responsive sizing
  const [currentSize, setCurrentSize] = useState(size);
  const [currentMargin, setCurrentMargin] = useState(12);

  // Create an array of image objects with all the information you need
  const socialMediaImages: SocialMediaImage[] = [
    {
      id: 1,
      src: '/youtubechanel.png',
      alt: 'YouTube Channel',
      href: 'https://youtube.com/yourchannel',
    },
    {
      id: 2,
      src: '/youtubechanel1.png',
      alt: 'Instagram Profile',
      href: 'https://instagram.com/yourprofile',
    },
    {
      id: 3,
      src: '/youtubechanel2.png',
      alt: 'Twitter Account',
      href: 'https://twitter.com/youraccount',
    },
    {
      id: 4,
      src: '/youtubechanel3.png',
      alt: 'Facebook Page',
      href: 'https://facebook.com/yourpage',
    },
    {
      id: 5,
      src: '/youtubechanel4.png',
      alt: 'LinkedIn Profile',
      href: 'https://linkedin.com/in/yourprofile',
    },
    {
      id: 6,
      src: '/youtubechanel5.png',
      alt: 'TikTok Account',
      href: 'https://tiktok.com/@youraccount',
    },
    {
      id: 7,
      src: '/youtubechanel6.png',
      alt: 'Pinterest Profile',
      href: 'https://pinterest.com/yourprofile',
    },
    {
      id: 8,
      src: '/youtubechanel7.png',
      alt: 'Snapchat Account',
      href: 'https://snapchat.com/add/yourusername',
    },
    {
      id: 9,
      src: '/youtubechanel8.png',
      alt: 'Snapchat Account',
      href: 'https://snapchat.com/add/yourusername',
    },
    {
      id: 10,
      src: '/youtubechanel9.png',
      alt: 'Snapchat Account',
      href: 'https://snapchat.com/add/yourusername',
    },
  ];

  // State to track container width for centering calculation
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Effect to get container width on client side and handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }

      // Responsive sizing based on screen width
      if (window.innerWidth < 480) {
        // Extra small mobile
        setCurrentSize(60);
        setCurrentMargin(6);
      } else if (window.innerWidth < 640) {
        // Small mobile
        setCurrentSize(80);
        setCurrentMargin(8);
      } else if (window.innerWidth < 768) {
        // Large mobile / small tablet
        setCurrentSize(100);
        setCurrentMargin(10);
      } else if (window.innerWidth < 1024) {
        // Tablet
        setCurrentSize(130);
        setCurrentMargin(12);
      } else if (window.innerWidth < 1280) {
        // Small desktop
        setCurrentSize(150);
        setCurrentMargin(14);
      } else {
        // Large desktop
        setCurrentSize(size);
        setCurrentMargin(16);
      }
    };

    // Initial call
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [size]);

  // Calculate total width of one set based on current size
  const itemWidth = currentSize + currentMargin * 2; // image size + margins
  const oneSetWidth = itemWidth * socialMediaImages.length;

  return (
    <div className="w-full px-2 sm:px-4 lg:px-6">
      {/* YouTube Icon and Title Section */}
      <div className="flex flex-col items-center mb-6 sm:mb-8 lg:mb-10">
        {/* YouTube Icon - Responsive sizing */}
        <div className="mb-3 sm:mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
            viewBox="0 0 24 24"
            fill="#0165FC"
          >
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
        </div>
        {/* Title in Persian with responsive text sizing */}
        <h2
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center text-white px-4 leading-relaxed"
          style={{ direction: 'rtl' }}
        >
          چند تا از یوتیوبر هایی که با تیم ما همکاری کردن
        </h2>
      </div>

      {/* Circular Scroller with fade effect */}
      <div
        className="w-full max-w-7xl mx-auto relative overflow-hidden"
        ref={containerRef}
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          height: `${currentSize + 20}px`, // Add some padding
        }}
      >
        <motion.div
          className="flex items-center"
          animate={{
            x: [-oneSetWidth / 2, -oneSetWidth - oneSetWidth / 2],
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          }}
          style={{
            width: `${oneSetWidth * 3}px`, // 3 sets of images
          }}
        >
          {[...Array(3)].map((_, setIndex) =>
            // Render 3 sets of social media images
            socialMediaImages.map(imageData => (
              <div
                key={`set${setIndex}-${imageData.id}`}
                className="flex-shrink-0"
                style={{
                  width: currentSize,
                  height: currentSize,
                  marginLeft: currentMargin,
                  marginRight: currentMargin,
                }}
              >
                <Link
                  href={imageData.href}
                  className="block rounded-full overflow-hidden h-full w-full hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={imageData.src}
                      alt={imageData.alt}
                      fill
                      className="object-cover"
                      sizes={`${currentSize}px`}
                      priority={setIndex === 1} // Only prioritize the middle set
                    />
                  </div>
                </Link>
              </div>
            )),
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CircularScroller;
