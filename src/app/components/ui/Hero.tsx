'use client';

import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden  dark:to-gray-900 flex flex-col justify-center items-center">
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 grid grid-cols-1 items-center">
          {/* Hero Image - Slightly smaller than previous version but still larger than original */}
          <div className="relative w-full flex flex-col items-center justify-center flex-1">
            <div className="relative w-full h-[65vh] sm:h-[70vh] md:h-[75vh]">
              <Image
                src="/HeroImage.png"
                alt="یوتیوب کلاب"
                fill
                priority
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Button - Now above the line with no background */}
            <button className="px-8 py-3 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg hover:cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 mb-4">
              آشنایی با ما
            </button>

            {/* Bolder Gray Line */}
            <div className="w-full max-w-5xl h-1 bg-gray-300 dark:bg-gray-700"></div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-1/4 right-1/4 w-64 h-64 bg-indigo-300 dark:bg-indigo-700 rounded-full filter blur-3xl opacity-30" />
            <div className="absolute -z-10 bottom-1/4 left-1/4 w-64 h-64 bg-purple-300 dark:bg-purple-700 rounded-full filter blur-3xl opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
