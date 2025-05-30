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

      // Set smaller size for mobile screens
      if (window.innerWidth < 640) {
        // sm breakpoint in Tailwind
        setCurrentSize(100); // Smaller size for mobile
      } else if (window.innerWidth < 768) {
        // md breakpoint
        setCurrentSize(140); // Medium size for tablets
      } else {
        setCurrentSize(size); // Original size for larger screens
      }
    };

    // Initial call
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [size]);

  // Calculate total width of one set based on current size
  const itemWidth = currentSize + 24; // image size + margins
  const oneSetWidth = itemWidth * socialMediaImages.length;

  return (
    <div className="w-full">
      {/* YouTube Icon and Title Section */}
      <div className="flex flex-col items-center mb-10">
        {/* YouTube Icon */}
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="#0165FC"
          >
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
        </div>
        {/* Title in Persian with white text */}
        <h2
          className="text-3xl font-bold text-center text-white"
          style={{ direction: 'rtl' }}
        >
          چند تا از یوتیوبر هایی که با تیم ما همکاری کردن
        </h2>
      </div>

      {/* Circular Scroller with fade effect */}
      <div
        className="w-full max-w-6xl mx-auto relative overflow-hidden"
        ref={containerRef}
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 15%, black 85%, transparent 100%)',
        }}
      >
        <motion.div
          className="flex justify-center"
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
                className="flex-shrink-0 mx-3" // Horizontal margin
                style={{ width: currentSize, height: currentSize }}
              >
                <Link
                  href={imageData.href}
                  className="block rounded-full overflow-hidden h-full w-full"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={imageData.src}
                      alt={imageData.alt}
                      fill
                      className="object-cover"
                      sizes={`${currentSize}px`}
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
