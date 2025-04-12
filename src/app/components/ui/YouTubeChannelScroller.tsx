'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface CircularScrollerProps {
  speed?: number;
  size?: number;
}

const CircularScroller: React.FC<CircularScrollerProps> = ({
  speed = 20,
  size = 80,
}) => {
  // Use the same image for all circles
  const imageSrc = '/zarinpal-1.webp';

  // Create an array of 8 items
  const circles = Array(8).fill(null);

  // Calculate total width of one set
  const itemWidth = size + 16; // image size + margins
  const oneSetWidth = itemWidth * circles.length;

  return (
    <div className="w-full overflow-hidden">
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
          // Render 3 sets of circles
          circles.map((__, circleIndex) => (
            <div
              key={`set${setIndex}-${circleIndex}`}
              className="flex-shrink-0 mx-2"
              style={{ width: size, height: size }}
            >
              <Link
                href="#"
                className="block rounded-full overflow-hidden h-full w-full"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={imageSrc}
                    alt="Zarinpal"
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
