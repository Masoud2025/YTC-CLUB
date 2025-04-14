'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PortfolioItemProps {
  imageSrc: string;
  title: string;
  buttonText: string;
  buttonHref: string;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({
  imageSrc,
  title,
  buttonText,
  buttonHref,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden rounded-lg mb-4 flex justify-center">
        <Image
          src={imageSrc}
          alt={title}
          width={247}
          height={174}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
      <div className="flex justify-center w-full">
        <Link
          href={buttonHref}
          className="bg-[#323434] text-blue-400 py-2 px-6 rounded-md hover:bg-[#1d4080] transition-colors"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

const PortfolioSection: React.FC = () => {
  const portfolioItems: PortfolioItemProps[] = [
    {
      imageSrc: '/worksamples.png', // Replace with your actual image path
      title: 'ادیت ویدیو',
      buttonText: 'مشاهده نمونه کار ها',
      buttonHref: '/edit_video_samples',
    },
    {
      imageSrc: '/worksamples2.png', // Replace with your actual image path
      title: ' طراحی تامینل',
      buttonText: 'مشاهده نمونه کار ها',
      buttonHref: '/portfolio/mobile-app',
    },
  ];

  return (
    <section className="py-16 container mx-auto px-4">
      <div className="relative mb-12 flex items-center">
        <div className="flex-grow h-px bg-gray-300"></div>
        <h2 className="text-2xl font-bold mx-4 px-4 absolute right-0">
          نمونه کارهای ما
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" dir="rtl">
        {portfolioItems.map((item, index) => (
          <PortfolioItem
            key={index}
            imageSrc={item.imageSrc}
            title={item.title}
            buttonText={item.buttonText}
            buttonHref={item.buttonHref}
          />
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
