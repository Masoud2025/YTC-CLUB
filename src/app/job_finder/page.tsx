'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Define the Job type
interface Job {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  contactInfo: {
    phone?: string;
    telegram?: string;
    email?: string;
  };
  location: string;
  category: string;
  postedDate: string;
}

// Sample jobs data
const jobsData: Job[] = [
  {
    id: '1',
    title: 'ادیتور ویدیو یوتیوب',
    description:
      'به یک ادیتور حرفه‌ای برای تدوین ویدیوهای یوتیوب نیازمندیم. تسلط به پریمیر و افترافکت الزامی است. امکان دورکاری وجود دارد.',
    imageUrl: '/sampleUser.jpg',
    contactInfo: {
      phone: '09123456789',
      telegram: '@videoeditor_hire',
    },
    location: 'تهران (دورکاری)',
    category: 'ادیت ویدیو',
    postedDate: '۱۴۰۴/۰۱/۱۵',
  },
  {
    id: '2',
    title: 'طراح تامنیل یوتیوب',
    description:
      'استودیو تولید محتوا به یک طراح تامنیل با سابقه و خلاق نیازمند است. آشنایی با اصول طراحی و تسلط به فتوشاپ ضروری است.',
    imageUrl: '/sampleUser2.jpg',
    contactInfo: {
      phone: '09187654321',
      telegram: '@thumbnail_jobs',
      email: 'jobs@studio.com',
    },
    location: 'اصفهان',
    category: 'طراحی گرافیک',
    postedDate: '۱۴۰۴/۰۱/۲۰',
  },
  {
    id: '3',
    title: 'تولیدکننده محتوا اینستاگرام',
    description:
      'یک برند فعال در زمینه لوازم خانگی به دنبال تولیدکننده محتوا برای اینستاگرام است. توانایی ایده‌پردازی و تولید محتوای جذاب الزامی است.',
    imageUrl: '/images/jobs/instagram-creator.jpg',
    contactInfo: {
      phone: '09361234567',
      telegram: '@content_creator_job',
    },
    location: 'شیراز',
    category: 'تولید محتوا',
    postedDate: '۱۴۰۴/۰۱/۱۸',
  },
  {
    id: '4',
    title: 'مدیر کانال یوتیوب',
    description:
      'به یک مدیر کانال یوتیوب با تجربه برای مدیریت کامل یک کانال آموزشی نیازمندیم. آشنایی با سئو یوتیوب و استراتژی محتوا الزامی است.',
    imageUrl: '/images/jobs/youtube-manager.jpg',
    contactInfo: {
      phone: '09129876543',
      email: 'hire@youtubeagency.com',
    },
    location: 'مشهد (دورکاری)',
    category: 'مدیریت محتوا',
    postedDate: '۱۴۰۴/۰۱/۱۰',
  },
  {
    id: '5',
    title: 'فیلمبردار محتوای تیک تاک',
    description:
      'استودیو تولید محتوای دیجیتال به دنبال فیلمبردار خلاق برای ساخت محتوای تیک تاک است. آشنایی با ترندهای روز تیک تاک الزامی است.',
    imageUrl: '/images/jobs/tiktok-videographer.jpg',
    contactInfo: {
      telegram: '@tiktok_studio',
      email: 'careers@tiktokcreators.ir',
    },
    location: 'تبریز',
    category: 'فیلمبرداری',
    postedDate: '۱۴۰۴/۰۱/۲۲',
  },
];

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(jobsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('همه');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedContactInfo, setSelectedContactInfo] = useState<null | {
    title: string;
    contactInfo: unknown;
  }>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPlusUser, setIsPlusUser] = useState(false);

  // Get unique categories
  const categories = [
    'همه',
    ...Array.from(new Set(jobsData.map(job => job.category))),
  ];

  // Filter jobs based on search term and category
  useEffect(() => {
    let filteredJobs = jobsData;

    if (searchTerm) {
      filteredJobs = filteredJobs.filter(
        job =>
          job.title.includes(searchTerm) ||
          job.description.includes(searchTerm) ||
          job.location.includes(searchTerm),
      );
    }

    if (selectedCategory !== 'همه') {
      filteredJobs = filteredJobs.filter(
        job => job.category === selectedCategory,
      );
    }

    setJobs(filteredJobs);
  }, [searchTerm, selectedCategory]);

  const handleContactClick = (job: Job) => {
    if (isLoggedIn && isPlusUser) {
      // If user is logged in and has plus account, show contact info
      // In a real app, you might want to track this action
    } else {
      // Show login/upgrade modal
      setSelectedContactInfo({
        title: job.title,
        contactInfo: job.contactInfo,
      });
      setShowLoginModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#282A2A] text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl text-center font-bold mb-2 text-white">
          فرصت‌های شغلی
        </h1>
        <p className="text-gray-400 text-center mb-8">
          جدیدترین فرصت‌های شغلی در حوزه تولید محتوا و رسانه‌های اجتماعی
        </p>

        {/* Search and Filter Section */}
        <div className="bg-[#353737] rounded-xl p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="جستجو در فرصت‌های شغلی..."
                  className="w-full bg-[#302f2f] text-white px-4 py-3 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <div className="absolute right-4 top-3.5 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="w-full md:w-64">
              <select
                className="w-full bg-[#302f2f] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Jobs List - Single column layout with scroll */}
        {jobs.length > 0 ? (
          <div className="flex flex-col gap-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-[#353737] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h2 className="text-xl font-bold text-white mb-2">
                        {job.title}
                      </h2>
                      <div className="flex items-center mb-2">
                        <span className="bg-[#0F3F77] text-white text-xs font-bold px-2 py-1 rounded mr-2">
                          {job.category}
                        </span>
                        <span className="text-xs text-gray-400">
                          {job.postedDate}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-gray-300">{job.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6">{job.description}</p>

                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        {Object.keys(job.contactInfo).map(type => (
                          <div
                            key={type}
                            className="flex items-center mb-1 last:mb-0"
                          >
                            {type === 'phone' && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400 ml-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                            )}
                            {type === 'telegram' && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400 ml-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm-3.5 14.5c-.128 0-.256-.049-.354-.146-.195-.195-.195-.512 0-.707l3.5-3.5-3.5-3.5c-.195-.195-.195-.512 0-.707s.512-.195.707 0l3.5 3.5 3.5-3.5c.195-.195.512-.195.707 0s.195.512 0 .707l-3.5 3.5 3.5 3.5c.195.195.195.512 0 .707s-.512.195-.707 0l-3.5-3.5-3.5 3.5c-.098.098-.226.146-.354.146z" />
                              </svg>
                            )}
                            {type === 'email' && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400 ml-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                            )}
                            <span className="text-gray-400 text-sm">
                              {isPlusUser
                                ? job.contactInfo[
                                    type as keyof typeof job.contactInfo
                                  ]
                                : '●●●●●●●●●●●'}
                            </span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => handleContactClick(job)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold ${
                          isPlusUser
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-[#0F3F77] hover:bg-blue-700 text-white'
                        }`}
                      >
                        {isPlusUser
                          ? 'مشاهده اطلاعات تماس'
                          : 'نمایش اطلاعات تماس'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl p-10 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-bold text-gray-300 mb-2">
              نتیجه‌ای یافت نشد
            </h3>
            <p className="text-gray-400">
              لطفا معیارهای جستجوی خود را تغییر دهید.
            </p>
          </div>
        )}
      </div>

      {/* Login/Upgrade Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-xl p-6 max-w-md w-full"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">
                اطلاعات تماس مخفی است
              </h3>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-gray-700 rounded-lg p-4 mb-4">
                <p className="text-gray-300 mb-2">
                  برای مشاهده اطلاعات تماس آگهی:
                </p>
                <p className="text-white font-bold">
                  {selectedContactInfo?.title}
                </p>
              </div>

              <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="bg-[#0F3F77] rounded-full p-2 ml-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-400 mb-1">
                      اشتراک پلاس فعال کنید
                    </h4>
                    <p className="text-gray-300 text-sm">
                      با فعال‌سازی اشتراک پلاس به تمامی اطلاعات تماس آگهی‌ها
                      دسترسی خواهید داشت.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-colors"
                onClick={() => {
                  // In a real app, this would navigate to the subscription page
                  setIsPlusUser(true);
                  setIsLoggedIn(true);
                  setShowLoginModal(false);
                }}
              >
                فعال‌سازی اشتراک پلاس
              </button>

              <button
                className="bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-bold transition-colors"
                onClick={() => {
                  // In a real app, this would navigate to the login page
                  setIsLoggedIn(true);
                  setShowLoginModal(false);
                }}
              >
                ورود / ثبت‌نام
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
