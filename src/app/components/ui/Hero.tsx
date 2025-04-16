'use client';

import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden flex flex-col justify-center items-center">
      <div className="w-full flex flex-col">
        <div className="grid grid-cols-1 items-center">
          {/* Hero Image - Desktop fills viewport, mobile compact */}
          <div className="relative w-full flex flex-col items-center justify-center">
            <div className="relative w-full h-auto sm:h-screen">
              {/* Mobile view (compact) */}
              <div className="block sm:hidden w-full">
                <Image
                  src="/HeroImage.png"
                  alt="یوتیوب کلاب"
                  width={500}
                  height={300}
                  priority
                  className="w-full object-contain"
                />
              </div>

              {/* Desktop view (fill viewport) */}
              <div className="hidden sm:block relative w-full h-[85vh]">
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

            {/* Button - Different positioning for mobile/desktop */}
            <button className="mt-0 sm:mt-4 px-6 sm:px-8 py-2 sm:py-3 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg hover:cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 mb-1 sm:mb-4">
              آشنایی با ما
            </button>

            {/* Bolder Gray Line */}
            <div className="w-full max-w-5xl h-1 bg-gray-300 dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
