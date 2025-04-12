'use client';
import React from 'react';
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
  size = 80,
}) => {
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

  // Calculate total width of one set
  const itemWidth = size + 16; // image size + margins
  const oneSetWidth = itemWidth * socialMediaImages.length;

  return (
    <div className="w-full overflow-hidden">
      <h1 className="text-center text-[50px]">
        چند تا از یوتیوبر هایی که با تیم ما همکاری کردن
      </h1>
      <motion.div
        className="flex"
        animate={{
          x: -oneSetWidth,
        }}
        initial={{
          x: 0,
        }}
        transition={{
          repeat: Infinity,
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
              className="flex-shrink-0 mx-2"
              style={{ width: size, height: size }}
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
                    sizes={`${size}px`}
                  />
                </div>
              </Link>
            </div>
          )),
        )}
      </motion.div>
    </div>
  );
};

export default CircularScroller;
