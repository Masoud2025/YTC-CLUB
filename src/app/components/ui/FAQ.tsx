'use client';
// components/FAQ.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const FAQ: React.FC = () => {
  // State to track which question is currently open
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  // FAQ data
  const faqItems = [
    {
      id: 1,
      question: 'دوره ها آپدیت میشه؟',
      answer:
        'بله، تمامی دوره‌های ما به صورت منظم آپدیت می‌شوند. با خرید هر دوره، دسترسی به تمامی آپدیت‌های آینده آن دوره را به صورت رایگان خواهید داشت. ما همواره تلاش می‌کنیم محتوای دوره‌ها را با آخرین تکنولوژی‌ها و روش‌های روز همگام نگه داریم.',
    },
    {
      id: 2,
      question: 'دوره و پک ها کجا آپلود شده؟',
      answer:
        'دوره‌ها و پک‌های آموزشی ما در سرورهای اختصاصی با پهنای باند بالا آپلود شده‌اند. پس از خرید، می‌توانید از طریق پنل کاربری خود به تمامی محتوا دسترسی داشته باشید. همچنین امکان دانلود ویدیوها برای تماشای آفلاین نیز وجود دارد.',
    },
    {
      id: 3,
      question: 'چطور نمونه کار درست کنیم؟',
      answer:
        'برای ساخت نمونه کار، توصیه می‌کنیم ابتدا دوره‌های پایه را مشاهده کرده و تمرین‌های عملی را انجام دهید. سپس می‌توانید با استفاده از پروژه‌های واقعی که در دوره‌های پیشرفته آموزش داده می‌شود، نمونه کارهای حرفه‌ای برای خود بسازید. همچنین در بخش انجمن سایت، راهنمایی‌های لازم برای ساخت نمونه کار مناسب ارائه شده است.',
    },
    {
      id: 4,
      question: 'چطور با شما در ارتباط باشیم؟',
      answer:
        'شما می‌توانید از طرق مختلف با ما در ارتباط باشید: از طریق فرم تماس در وب‌سایت، ایمیل پشتیبانی info@youtubeclub.ir، شماره تماس پشتیبانی، و همچنین کانال‌های ارتباطی ما در شبکه‌های اجتماعی مانند تلگرام، اینستاگرام و واتس‌اپ. تیم پشتیبانی ما در اسرع وقت به سؤالات شما پاسخ خواهد داد.',
    },
    {
      id: 5,
      question: 'چطور اولین پروژمون رو بگیریم؟',
      answer:
        'برای گرفتن اولین پروژه، پیشنهاد می‌کنیم ابتدا نمونه کارهای خود را در پلتفرم‌های فریلنسری مانند پونیشا و فریلنسر ثبت کنید. همچنین می‌توانید از بخش فرصت‌های شغلی سایت ما استفاده کنید که در آن کارفرمایان پروژه‌های خود را ثبت می‌کنند. شرکت در چالش‌های ما و شبکه‌سازی با سایر اعضای انجمن نیز می‌تواند به شما در یافتن اولین پروژه کمک کند.',
    },
  ];

  // Toggle function for opening/closing questions
  const toggleQuestion = (id: number) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <section className="py-20 px-6  " dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">سوالات متداول</h2>
          <p className="text-lg text-white">پاسخ به سوالات رایج شما</p>
          <div className="w-24 h-1 bg-[#0165FC] mx-auto mt-6"></div>
        </div>

        <div className="space-y-4">
          {faqItems.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item.id * 0.1 }}
              className="border  rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleQuestion(item.id)}
                className={`w-full text-right p-5 flex justify-between items-center transition-colors ${
                  openQuestion === item.id
                    ? 'bg-[#353737] text-white'
                    : 'bg-[#353737] text-white hover:bg-gray-700'
                }`}
              >
                <span className="font-bold text-lg">{item.question}</span>
                <motion.div
                  animate={{ rotate: openQuestion === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown
                    className={`${
                      openQuestion === item.id ? 'text-white' : 'text-[#0165FC]'
                    }`}
                  />
                </motion.div>
              </button>

              <AnimatePresence>
                {openQuestion === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 bg-[#353737] border-t border-gray-200 text-white leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-white mb-6">
            سوال دیگری دارید؟ با ما در تماس باشید
          </p>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#141843' }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="bg-[#0165FC] text-white font-medium py-3 px-8 rounded-lg hover:bg-[#141843] transition-colors"
          >
            تماس با پشتیبانی
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
