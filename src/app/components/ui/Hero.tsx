'use client';

import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950 dark:to-gray-900 pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="w-full">
        <div className="grid grid-cols-1 gap-12 items-center">
          {/* Hero Image - Moved Up with negative margin */}
          <div className="order-1 relative w-full -mt-8 md:-mt-16 flex flex-col items-center">
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] flex justify-center">
              <div className="relative w-full h-full">
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

            {/* Button - Now above the line with no background */}
            <button className="px-8 py-3 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 mb-4">
              آشنایی با ما
            </button>

            {/* Bolder Gray Line */}
            <div className="w-full max-w-4xl h-1 bg-gray-300 dark:bg-gray-700"></div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-1/4 right-1/4 w-64 h-64 bg-indigo-300 dark:bg-indigo-700 rounded-full filter blur-3xl opacity-30" />
            <div className="absolute -z-10 bottom-1/4 left-1/4 w-64 h-64 bg-purple-300 dark:bg-purple-700 rounded-full filter blur-3xl opacity-30" />
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 md:h-16"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white dark:fill-gray-900"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
