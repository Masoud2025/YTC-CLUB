'use client';
// components/Services.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';
import { SiAdobepremierepro } from 'react-icons/si';
import Image from 'next/image';

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageSrc: string;
}

const ServiceCard: React.FC<{ service: ServiceItem; index: number }> = ({
  service,
  index,
}) => {
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isEven = index % 2 === 0;

  return (
    <div className="flex flex-col md:flex-row items-center mb-32">
      {/* Service content */}
      <motion.div
        ref={contentRef}
        initial={{ opacity: 0, x: -100 }}
        animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full md:w-1/2 p-6 order-2 md:order-1"
      >
        <div className="flex items-center mb-8">
          <div className="bg-[#141843]/10 rounded-full w-20 h-20 flex items-center justify-center ml-5">
            {service.icon}
          </div>
          <h3 className="text-3xl font-bold text-[#141843]">{service.title}</h3>
        </div>
        <p className="text-gray-600 mb-10 leading-relaxed text-lg">
          {service.description}
        </p>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#141843' }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className="bg-[#0165FC] text-white font-medium py-4 px-10 rounded-lg hover:bg-[#141843] transition-colors text-lg"
        >
          اطلاعات بیشتر
        </motion.button>
      </motion.div>

      {/* Image */}
      <motion.div
        ref={imageRef}
        initial={{ opacity: 0, x: 100 }}
        animate={imageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        className="w-full md:w-1/2 p-6 order-1 md:order-2"
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden shadow-xl"
        >
          <Image
            src={service.imageSrc}
            alt={service.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#141843]/40 to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  );
};

const Services: React.FC = () => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services: ServiceItem[] = [
    {
      id: 1,
      title: 'ساخت تامبنیل',
      description:
        'طراحی تامبنیل‌های جذاب و حرفه‌ای که نرخ کلیک و تعامل ویدیوهای شما را به طور چشمگیری افزایش می‌دهند. با استفاده از تکنیک‌های بصری مدرن، تامبنیل‌هایی خلق می‌کنیم که توجه مخاطب را جلب می‌کند.',
      icon: (
        <MdOutlinePhotoSizeSelectActual className="text-5xl text-[#0165FC]" />
      ),
      imageSrc: '/workSample1.jpg', // Replace with your actual image path
    },
    {
      id: 2,
      title: 'تدوین ویدیو',
      description:
        'خدمات حرفه‌ای تدوین ویدیو با بهره‌گیری از جدیدترین تکنیک‌ها و نرم‌افزارها برای ارتقای کیفیت محتوای شما. از ترنزیشن‌های خلاقانه و افکت‌های ویژه گرفته تا تصحیح رنگ حرفه‌ای، همه را با بالاترین استانداردها ارائه می‌دهیم.',
      icon: <SiAdobepremierepro className="text-5xl text-[#0165FC]" />,
      imageSrc: '/workSample1.jpg', // Replace with your actual image path
    },
  ];

  return (
    <section
      id="services"
      className="py-24 px-6 bg-gray-50 font-[vazir]"
      dir="rtl"
    >
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: -30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-24"
      >
        <h2 className="text-5xl font-bold mb-6 text-[#141843]">خدمات ما</h2>
        <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
          راهکارهای حرفه‌ای برای ارتقای محتوای دیجیتال شما
        </p>
        <div className="w-24 h-1 bg-[#0165FC] mx-auto mt-8"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Services;
