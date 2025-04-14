'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface PortfolioItemProps {
  imageSrc: string;
  buttonHref: string;
  alt: string;
}

const PortfolioSection: React.FC = () => {
  // Creating an array of 18 portfolio items
  const portfolioItems = Array(18)
    .fill(null)
    .map((_, index) => ({
      imageSrc: index % 2 === 0 ? '/worksamples.png' : '/worksamples2.png',
      buttonHref: `/portfolio/project-${index + 1}`,
      alt: index % 2 === 0 ? 'طراحی وبسایت شرکتی' : 'اپلیکیشن موبایل',
    }));

  return (
    <section className="py-5 container mx-auto px-2">
      <div className="flex flex-col items-center mb-8">
        {/* YouTube Logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="48"
          height="48"
          fill="#1877F2" // YouTube logo in blue color
          className="mb-3"
        >
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
        </svg>

        {/* Header Text */}
        <h2 className="text-2xl font-bold text-center mb-2">
          نمونه کار های ادیت یوتیوب
        </h2>

        {/* Instruction Text */}
        <p className="text-center text-gray-600 mb-6">
          روی تصویر ها کلیک کنید تا وارد ویدیوی یوتیوب بشید
        </p>
      </div>

      <div
        dir="rtl"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 551px)',
          rowGap: '10px',
          columnGap: 0,
          lineHeight: 0,
          maxWidth: '100%',
          overflowX: 'auto',
          justifyContent: 'center',
        }}
      >
        {portfolioItems.map((item, index) => (
          <div
            key={index}
            style={{
              width: '551px',
              height: '311px',
              position: 'relative',
              fontSize: 0,
              lineHeight: 0,
            }}
          >
            <Link
              href={item.buttonHref}
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                position: 'relative',
              }}
            >
              <Image
                src={item.imageSrc}
                alt={item.alt}
                fill
                sizes="551px"
                priority={index < 4}
                style={{
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
