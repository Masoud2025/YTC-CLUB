'use client';
import React, { useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { FaYoutube, FaBriefcase, FaChartLine } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.1 * index,
      ease: 'easeOut',
    },
  }),
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  index,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px 0px',
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className="bg-[#1A1A42] rounded-xl shadow-lg p-6 flex flex-col items-center border border-[#0165FC]/20 relative overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      custom={index}
      whileHover={{
        y: -5,
        boxShadow: '0 10px 25px rgba(1, 101, 252, 0.2)',
        transition: { duration: 0.2 },
      }}
    >
      {/* Decorative gradient element */}
      <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br from-[#0165FC]/30 to-transparent blur-xl"></div>

      <motion.div
        className="text-5xl text-[#0165FC] mb-6 p-4 rounded-full bg-[#1A1A42]/50 border border-[#0165FC]/30 relative z-10"
        whileHover={{ rotate: 5, scale: 1.1 }}
      >
        {icon}
      </motion.div>

      <h3 className="text-xl font-bold mb-3 text-white w-full text-right relative z-10">
        {title}
      </h3>
      <p className="text-gray-300 leading-relaxed w-full text-right relative z-10">
        {description}
      </p>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#0165FC] to-transparent w-full"></div>
    </motion.div>
  );
};

const FeatureGrid: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const headerControls = useAnimation();

  useEffect(() => {
    if (inView) {
      headerControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
      });
    }
  }, [headerControls, inView]);

  const features = [
    {
      icon: <FaYoutube />,
      title: 'برندسازی',
      description:
        'برندینگ و کیفیت بالای خود را با یک طراحی و ادیت حرفه‌ای به همه نشان دهید.',
    },
    {
      icon: <FaBriefcase />,
      title: 'کسب کار',
      description:
        'اگه طراح یا ادیتور هستید یا حتی کارفرما هستید قسمت مشاغل یوتیوب میتونه ارتباط سریع و راحتی رو بین کارفرما و کارجو برقرار کنه.',
    },
    {
      icon: <FaChartLine />,
      title: 'افزایش مهارت',
      description:
        'با استفاده از دوره های آموزشی و پک ها میتونید کیفت کار خودتون رو به حداکثر برسونید.',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#14143A] to-[#1A1A42] py-16">
      <div dir="rtl" className="container mx-auto px-4 font-[Vazir] relative">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#0165FC]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#0165FC]/5 rounded-full blur-3xl"></div>

        <motion.div
          ref={ref}
          className="mb-16 text-center relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={headerControls}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            یوتیوب کلاب مناسب تولید کنندگان محتوا
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#0165FC] to-transparent mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid;
