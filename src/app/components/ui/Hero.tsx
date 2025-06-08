'use client';

import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Main container */}
      <div className="w-full flex flex-col items-center mt-[5em] sm:mt-[10em]">
        {/* Image container - smaller desktop size */}
        <div className="relative w-full max-w-none px-0">
          {/* Mobile view */}
          <div className="block sm:hidden w-full mt-[4em]">
            <Image
              src="/HeroImage.png"
              alt="یوتیوب کلاب"
              width={600}
              height={360}
              priority
              className="w-full object-contain"
            />
          </div>

          {/* Desktop view - smaller height */}
          <div className="hidden sm:block relative w-full h-[75vh]">
            <Image
              src="/HeroImage.png"
              alt="یوتیوب کلاب"
              fill
              priority
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Content below image */}
        <div className="w-full flex flex-col items-center mt-4 sm:mt-8">
          {/* Button */}
          <button className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base text-indigo-600 dark:text-indigo-400 font-medium rounded-lg hover:cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 mb-4 sm:mb-6">
            آشنایی با ما
          </button>

          {/* Gray Line - full width */}
          <div className="w-full h-1 bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
