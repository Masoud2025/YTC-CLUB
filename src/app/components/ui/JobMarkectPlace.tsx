'use client';
// components/JobMarketplace.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaSearch, FaFileAlt, FaBriefcase, FaEdit } from 'react-icons/fa';

const JobMarketplace: React.FC = () => {
  const [containerRef, containerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.7,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section ref={containerRef} className="py-24 px-6 font-[vazir]" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={
          containerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }
        }
        transition={{ duration: 0.8 }}
        className="text-center mb-16 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-6 text-white">
          بازار کار یوتیوب کلاب
        </h2>
        <p className="text-lg text-white">
          فرصت‌های شغلی مرتبط با تولید محتوا و یوتیوب را در اینجا پیدا کنید یا
          آگهی استخدام خود را ثبت کنید
        </p>
        <div className="w-24 h-1 bg-[#0165FC] mx-auto mt-8"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Job Seeker Card */}
          <motion.div
            custom={0}
            initial="hidden"
            animate={containerInView ? 'visible' : 'hidden'}
            variants={cardVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 p-8 flex flex-col h-full"
          >
            <div className="bg-[#141843]/10 w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <FaBriefcase className="text-3xl text-[#0165FC]" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#141843]">
              کارجو هستم
            </h3>
            <p className="text-gray-600 mb-8 flex-grow">
              به دنبال فرصت‌های شغلی در حوزه تولید محتوا، ادیت ویدیو، طراحی
              تامبنیل و سایر مشاغل مرتبط با یوتیوب هستید؟ آگهی‌های استخدام را
              مشاهده کنید.
            </p>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: '#141843' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="bg-[#0165FC] text-white font-medium py-4 px-6 rounded-lg hover:bg-[#141843] transition-colors w-full flex items-center justify-center"
              >
                <FaSearch className="ml-2" />
                دیدن آگهی‌ها
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="bg-transparent text-[#0165FC] font-medium py-3 px-6 rounded-lg border-2 border-[#0165FC] hover:bg-[#0165FC]/10 transition-colors w-full flex items-center justify-center"
              >
                <FaFileAlt className="ml-2" />
                ارسال رزومه
              </motion.button>
            </div>
          </motion.div>

          {/* Employer Card */}
          <motion.div
            custom={1}
            initial="hidden"
            animate={containerInView ? 'visible' : 'hidden'}
            variants={cardVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 p-8 flex flex-col h-full"
          >
            <div className="bg-[#141843]/10 w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <FaEdit className="text-3xl text-[#0165FC]" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#141843]">
              کارفرما هستم
            </h3>
            <p className="text-gray-600 mb-8 flex-grow">
              به دنبال نیروی متخصص در زمینه تولید محتوا، ادیت ویدیو یا طراحی
              تامبنیل هستید؟ آگهی استخدام خود را ثبت کنید تا با بهترین متخصصان
              این حوزه ارتباط برقرار کنید.
            </p>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: '#141843' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="bg-[#0165FC] text-white font-medium py-4 px-6 rounded-lg hover:bg-[#141843] transition-colors w-full flex items-center justify-center"
              >
                <FaEdit className="ml-2" />
                ثبت آگهی
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="bg-transparent text-[#0165FC] font-medium py-3 px-6 rounded-lg border-2 border-[#0165FC] hover:bg-[#0165FC]/10 transition-colors w-full flex items-center justify-center"
              >
                <FaBriefcase className="ml-2" />
                مشاهده رزومه‌ها
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={
            containerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
          }
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl font-bold text-[#0165FC] mb-2">۲۵۰+</div>
            <div className="text-gray-600">فرصت شغلی فعال</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl font-bold text-[#0165FC] mb-2">۱۲۰+</div>
            <div className="text-gray-600">کارفرمای فعال</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl font-bold text-[#0165FC] mb-2">۸۵۰+</div>
            <div className="text-gray-600">کارجوی متخصص</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl font-bold text-[#0165FC] mb-2">۹۰٪</div>
            <div className="text-gray-600">نرخ موفقیت استخدام</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JobMarketplace;
