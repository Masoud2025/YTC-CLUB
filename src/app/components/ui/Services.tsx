'use client';
// components/Services.tsx
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';

interface ServiceItem {
  id: number;
  title: string;
  description: string;
}

const Services: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    if (openDropdown === id) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(id);
    }
  };

  const services: ServiceItem[] = [
    {
      id: 1,
      title: 'ادیت وطراحی جذاب ',
      description:
        'طراحی و ادیت حرفه ای یعنی توجه به سلایق و تمایلات همه کاربران هدف محتوای شما',
    },
    {
      id: 2,
      title: 'سرعت بالا',
      description: 'طراحی و ادیت در سریع ترین زمان ممکن با بالاترین کیفیت ممکن',
    },
    {
      id: 3,
      title: 'قیمت مناسب',
      description:
        'ارائه خدمات با قیمت مناسب برای تمامی افراد به خصوص یوتیوبر های تازه کار',
    },
  ];

  return (
    <section id="services" className="py-24 px-6 font-[vazir]" dir="rtl">
      <div className="text-center mb-24">
        <h2 className="text-5xl font-bold mb-6 text-white">خدمات ما</h2>
        <p className="text-2xl text-white max-w-3xl mx-auto">
          راهکارهای حرفه‌ای برای ارتقای محتوای دیجیتال شما
        </p>
        <div className="w-24 h-1 bg-[#0165FC] mx-auto mt-8"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        {/* Left side - Dropdowns */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          {services.map(service => (
            <div key={service.id} className="mb-6">
              <button
                onClick={() => toggleDropdown(service.id)}
                className="w-full flex items-center justify-between bg-[#333737]/20 p-4 rounded-lg text-white"
              >
                <div className="flex items-center">
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
                <FaChevronDown
                  className={`transition-transform ${
                    openDropdown === service.id ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              {openDropdown === service.id && (
                <div className="bg-[#353737]/10 p-4 rounded-b-lg mt-1">
                  <p className="text-white leading-relaxed">
                    {service.description}
                  </p>
                  <button className="mt-4 bg-[#0165FC] text-white font-medium py-2 px-6 rounded-lg hover:bg-[#353737] transition-colors">
                    اطلاعات بیشتر
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side - Big Image */}
        <div className="w-full md:w-1/2 p-6 flex justify-center items-center">
          <div className="relative h-[500px] w-full rounded-2xl overflow-hidden flex justify-center">
            <Image
              src="/services.png"
              alt="Our Services"
              width={600}
              height={500}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
