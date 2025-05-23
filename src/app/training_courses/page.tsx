'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define TypeScript interfaces for our data
interface Course {
  id: number;
  title: string;
  image: string;
  price: string;
  discount: string;
  students: string;
  rating: string;
  slug: string;
  description?: string; // Optional description for modal
  instructor?: string; // Optional instructor for modal
  duration?: string; // Optional duration for modal
}

export default function CourseGrids() {
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // State for showing more courses
  const [showMoreDesign, setShowMoreDesign] = useState<boolean>(false);
  const [showMoreThumbnail, setShowMoreThumbnail] = useState<boolean>(false);

  // State for tracking if we're on mobile
  const [isMobile, setIsMobile] = useState<boolean>(true);

  // Effect to handle window resize and set mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sample course data for the design courses section
  const designCourses: Course[] = [
    {
      id: 1,
      title: 'فتوشاپ پیشرفته',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7',
      price: '۳۴۹,۰۰۰',
      discount: '۴۹۹,۰۰۰',
      students: '۸۵۰',
      rating: '۴.۸',
      slug: '/courses/advanced-photoshop',
      description:
        'در این دوره آموزشی، تکنیک‌های پیشرفته فتوشاپ را فرا خواهید گرفت. از جمله روتوش حرفه‌ای، ترکیب تصاویر، ایجاد افکت‌های خاص و بهینه‌سازی گردش کار.',
      instructor: 'سعید محمدی',
      duration: '۲۴ ساعت',
    },
    {
      id: 2,
      title: 'طراحی UI/UX',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d',
      price: '۴۲۹,۰۰۰',
      discount: '۵۹۹,۰۰۰',
      students: '۷۲۰',
      rating: '۴.۹',
      slug: '/courses/ui-ux-design',
      description:
        'این دوره جامع طراحی رابط کاربری و تجربه کاربری، اصول طراحی مدرن و کاربرپسند را به شما آموزش می‌دهد. از طراحی وایرفریم تا پروتوتایپ نهایی.',
      instructor: 'مریم حسینی',
      duration: '۳۲ ساعت',
    },
    {
      id: 3,
      title: 'ادیت عکس حرفه‌ای',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
      price: '۲۹۹,۰۰۰',
      discount: '۳۹۹,۰۰۰',
      students: '۱۲۵۰',
      rating: '۴.۷',
      slug: '/courses/professional-photo-editing',
      description:
        'در این دوره، اصول پیشرفته ویرایش عکس را خواهید آموخت. از تنظیم رنگ و نور گرفته تا روتوش پرتره و ایجاد ترکیب‌های خلاقانه.',
      instructor: 'علی رضایی',
      duration: '۱۸ ساعت',
    },
    {
      id: 4,
      title: 'ایلاستریتور از صفر تا صد',
      image: 'https://images.unsplash.com/photo-1626785774625-ddcdce97e5ca',
      price: '۳۸۹,۰۰۰',
      discount: '۵۴۹,۰۰۰',
      students: '۶۸۰',
      rating: '۴.۸',
      slug: '/courses/illustrator-complete',
      description:
        'این دوره کامل ایلاستریتور، از مفاهیم پایه تا تکنیک‌های پیشرفته را پوشش می‌دهد. طراحی لوگو، ایجاد الگوها، و طراحی برداری حرفه‌ای را یاد بگیرید.',
      instructor: 'نیما کریمی',
      duration: '۲۸ ساعت',
    },
    {
      id: 5,
      title: 'طراحی لوگو حرفه‌ای',
      image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea',
      price: '۴۴۹,۰۰۰',
      discount: '۵۹۹,۰۰۰',
      students: '۹۱۰',
      rating: '۴.۹',
      slug: '/courses/professional-logo-design',
      description:
        'در این دوره، اصول طراحی لوگوی حرفه‌ای را خواهید آموخت. از مفهوم‌سازی اولیه تا اجرای نهایی، همراه با تکنیک‌های برندینگ موثر.',
      instructor: 'سارا احمدی',
      duration: '۲۲ ساعت',
    },
    {
      id: 6,
      title: 'اصول رنگ‌شناسی در طراحی',
      image: 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0',
      price: '۲۷۹,۰۰۰',
      discount: '۳۴۹,۰۰۰',
      students: '۷۵۰',
      rating: '۴.۶',
      slug: '/courses/color-theory-design',
      description:
        'این دوره به شما کمک می‌کند تا اصول علمی و هنری رنگ‌شناسی را درک کنید. ترکیب‌های رنگی موثر، روانشناسی رنگ‌ها و کاربرد آن‌ها در طراحی را یاد بگیرید.',
      instructor: 'امیر توکلی',
      duration: '۱۶ ساعت',
    },
    // Additional courses for "show more"
    {
      id: 7,
      title: 'طراحی کاراکتر دیجیتال',
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42',
      price: '۳۹۹,۰۰۰',
      discount: '۵۴۹,۰۰۰',
      students: '۵۳۰',
      rating: '۴.۸',
      slug: '/courses/digital-character-design',
      description:
        'در این دوره، اصول طراحی کاراکتر دیجیتال را از پایه تا پیشرفته خواهید آموخت. از طراحی اولیه تا رنگ‌آمیزی و انیمیشن پایه.',
      instructor: 'مهدی رضوی',
      duration: '۲۶ ساعت',
    },
    {
      id: 8,
      title: 'ساخت موشن گرافیک',
      image: 'https://images.unsplash.com/photo-1551503766-ac63dfa6401c',
      price: '۴۵۹,۰۰۰',
      discount: '۵۹۹,۰۰۰',
      students: '۴۸۰',
      rating: '۴.۷',
      slug: '/courses/motion-graphics',
      description:
        'در این دوره، اصول ساخت موشن گرافیک را با استفاده از نرم‌افزارهای حرفه‌ای خواهید آموخت. انیمیشن‌های گرافیکی جذاب برای ویدیوها و تبلیغات بسازید.',
      instructor: 'زهرا محمودی',
      duration: '۳۰ ساعت',
    },
  ];

  // Sample course data for the thumbnail courses section
  const thumbnailCourses: Course[] = [
    {
      id: 1,
      title: 'طراحی تامنیل یوتیوب',
      image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868',
      price: '۳۷۹,۰۰۰',
      discount: '۵۴۹,۰۰۰',
      students: '۹۳۰',
      rating: '۴.۹',
      slug: '/courses/youtube-thumbnail-design',
      description:
        'در این دوره، اصول طراحی تامنیل‌های جذاب برای یوتیوب را خواهید آموخت. تامنیل‌هایی که نرخ کلیک را افزایش می‌دهند و بازدیدکنندگان را جذب می‌کنند.',
      instructor: 'حسین علوی',
      duration: '۱۴ ساعت',
    },
    {
      id: 2,
      title: 'ساخت کاور اینستاگرام',
      image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb',
      price: '۲۸۹,۰۰۰',
      discount: '۳۸۹,۰۰۰',
      students: '۸۴۰',
      rating: '۴.۸',
      slug: '/courses/instagram-cover-creation',
      description:
        'این دوره به شما آموزش می‌دهد چگونه کاورهای حرفه‌ای برای پست‌ها و استوری‌های اینستاگرام طراحی کنید که توجه مخاطبان را جلب کند.',
      instructor: 'فاطمه نوری',
      duration: '۱۲ ساعت',
    },
    {
      id: 3,
      title: 'طراحی بنر تبلیغاتی',
      image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490',
      price: '۳۱۹,۰۰۰',
      discount: '۴۴۹,۰۰۰',
      students: '۷۶۰',
      rating: '۴.۷',
      slug: '/courses/advertising-banner-design',
      description:
        'در این دوره، اصول طراحی بنرهای تبلیغاتی موثر را خواهید آموخت. از طراحی بنرهای وب گرفته تا بنرهای شبکه‌های اجتماعی و تبلیغاتی.',
      instructor: 'محمد صادقی',
      duration: '۱۶ ساعت',
    },
    {
      id: 4,
      title: 'کاور پادکست حرفه‌ای',
      image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618',
      price: '۲۵۹,۰۰۰',
      discount: '۳۴۹,۰۰۰',
      students: '۵۶۰',
      rating: '۴.۶',
      slug: '/courses/podcast-cover-design',
      description:
        'این دوره به شما آموزش می‌دهد چگونه کاورهای جذاب و حرفه‌ای برای پادکست طراحی کنید که در پلتفرم‌های مختلف پادکست متمایز باشد.',
      instructor: 'رضا کاظمی',
      duration: '۱۰ ساعت',
    },
    {
      id: 5,
      title: 'ساخت مینیاتور برای بلاگ',
      image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040',
      price: '۲۹۹,۰۰۰',
      discount: '۳۹۹,۰۰۰',
      students: '۶۲۰',
      rating: '۴.۷',
      slug: '/courses/blog-thumbnail-creation',
      description:
        'در این دوره، نحوه طراحی تصاویر شاخص جذاب برای مقالات وبلاگ را خواهید آموخت. تصاویری که خواننده را به کلیک و خواندن مقاله ترغیب می‌کنند.',
      instructor: 'سمیرا حیدری',
      duration: '۱۴ ساعت',
    },
    {
      id: 6,
      title: 'طراحی کاور کتاب الکترونیکی',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c',
      price: '۳۴۹,۰۰۰',
      discount: '۴۴۹,۰۰۰',
      students: '۵۸۰',
      rating: '۴.۸',
      slug: '/courses/ebook-cover-design',
      description:
        'این دوره به شما آموزش می‌دهد چگونه جلدهای حرفه‌ای و جذاب برای کتاب‌های الکترونیکی طراحی کنید که باعث افزایش فروش و جذب مخاطب شود.',
      instructor: 'علی اکبری',
      duration: '۱۸ ساعت',
    },
    // Additional courses for "show more"
    {
      id: 7,
      title: 'طراحی تامنیل برای آپارات',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c',
      price: '۲۶۹,۰۰۰',
      discount: '۳۶۹,۰۰۰',
      students: '۴۲۰',
      rating: '۴.۵',
      slug: '/courses/aparat-thumbnail-design',
      description:
        'در این دوره، اصول طراحی تامنیل‌های جذاب برای ویدیوهای آپارات را خواهید آموخت. با تکنیک‌های بومی‌سازی شده برای مخاطب ایرانی.',
      instructor: 'نیما رضایی',
      duration: '۱۲ ساعت',
    },
    {
      id: 8,
      title: 'طراحی کاور برای لینکدین',
      image: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c',
      price: '۲۸۹,۰۰۰',
      discount: '۳۸۹,۰۰۰',
      students: '۳۸۰',
      rating: '۴.۶',
      slug: '/courses/linkedin-cover-design',
      description:
        'این دوره به شما آموزش می‌دهد چگونه کاورهای حرفه‌ای برای پروفایل لینکدین طراحی کنید که تصویر حرفه‌ای شما را تقویت کند.',
      instructor: 'مریم صالحی',
      duration: '۱۰ ساعت',
    },
  ];

  // Function to handle opening the course detail modal
  const openCourseModal = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  // Course card component for reusability
  const CourseCard = ({ course }: { course: Course }) => (
    <div className="bg-[#2A2C2C] rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl">
      <div className="relative h-36 sm:h-40 md:h-48">
        <Image
          src={course.image}
          alt={course.title}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-yellow-500 text-xs font-bold text-black px-2 py-1 rounded-md">
          پرفروش
        </div>
      </div>
      <div className="p-3 md:p-4">
        <h3 className="text-white font-bold text-sm md:text-lg mb-2 line-clamp-1">
          {course.title}
        </h3>
        <div className="flex justify-between items-center mb-2 md:mb-3">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 md:h-4 md:w-4 text-yellow-500 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-yellow-500 text-xs md:text-sm">
              {course.rating}
            </span>
          </div>
          <div className="text-gray-400 text-xs md:text-sm">
            {course.students} دانشجو
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 line-through text-xs">
              {course.discount} تومان
            </p>
            <p className="text-blue-500 font-bold text-xs md:text-base">
              {course.price} تومان
            </p>
          </div>
          <button
            onClick={() => openCourseModal(course)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 md:px-3 md:py-1.5 rounded-lg transition-colors"
          >
            مشاهده دوره
          </button>
        </div>
      </div>
    </div>
  );

  // Modal component for course details
  const CourseDetailModal = () => {
    if (!selectedCourse) return null;

    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          isModalOpen ? 'block' : 'hidden'
        }`}
      >
        <div
          className="absolute inset-0 bg-black opacity-75"
          onClick={() => setIsModalOpen(false)}
        ></div>
        <div
          className="bg-[#2A2C2C] rounded-xl overflow-hidden shadow-2xl z-10 w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto"
          dir="rtl"
        >
          <div className="relative h-48 md:h-64">
            <Image
              src={selectedCourse.image}
              alt={selectedCourse.title}
              fill
              style={{ objectFit: 'cover' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end justify-center pb-6">
              <h2 className="text-white font-bold text-xl md:text-2xl px-4 text-center">
                {selectedCourse.title}
              </h2>
            </div>
            <button
              className="absolute top-4 left-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
              onClick={() => setIsModalOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6"
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

          <div className="p-4 md:p-6">
            <div className="flex flex-wrap justify-between items-center mb-4 md:mb-6">
              <div className="mb-2 md:mb-0 w-1/2 md:w-auto">
                <span className="text-gray-400 text-sm">مدرس: </span>
                <span className="text-white font-medium text-sm md:text-base">
                  {selectedCourse.instructor}
                </span>
              </div>
              <div className="mb-2 md:mb-0 w-1/2 md:w-auto">
                <span className="text-gray-400 text-sm">مدت دوره: </span>
                <span className="text-white font-medium text-sm md:text-base">
                  {selectedCourse.duration}
                </span>
              </div>
              <div className="mb-2 md:mb-0 w-1/2 md:w-auto">
                <span className="text-gray-400 text-sm">دانشجویان: </span>
                <span className="text-white font-medium text-sm md:text-base">
                  {selectedCourse.students} نفر
                </span>
              </div>
              <div className="flex items-center mb-2 md:mb-0 w-1/2 md:w-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-5 md:w-5 text-yellow-500 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-yellow-500 font-medium text-sm md:text-base">
                  {selectedCourse.rating}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-white font-bold text-lg md:text-xl mb-2 md:mb-3">
                توضیحات دوره
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {selectedCourse.description}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-white font-bold text-lg md:text-xl mb-2 md:mb-3">
                سرفصل‌های دوره
              </h3>
              <ul className="text-gray-300 space-y-1 md:space-y-2 text-sm md:text-base">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 text-blue-500 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>مقدمه و آشنایی با ابزارهای مورد نیاز</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 text-blue-500 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>اصول طراحی و ترکیب‌بندی</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 text-blue-500 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>کار با رنگ‌ها و افکت‌ها</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 text-blue-500 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>تکنیک‌های پیشرفته</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 text-blue-500 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>پروژه‌های عملی و کاربردی</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center bg-[#353737] p-4 rounded-lg">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-400 line-through text-sm">
                  {selectedCourse.discount} تومان
                </p>
                <p className="text-blue-500 font-bold text-xl md:text-2xl">
                  {selectedCourse.price} تومان
                </p>
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors w-full md:w-auto">
                ثبت‌نام در دوره
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-2 md:px-4 py-4 md:py-8" dir="rtl">
      {/* Main grid container - different layouts for mobile vs desktop */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4">
        {/* Right side: Design Courses */}
        <div className="bg-[#353737] rounded-xl md:rounded-2xl shadow-xl overflow-hidden p-2 md:p-6">
          <h2 className="text-base md:text-xl lg:text-2xl font-bold mb-2 md:mb-6 text-white text-center border-b border-gray-700 pb-2 md:pb-4">
            دوره های ادیت و طراحی
          </h2>

          {/* Mobile: 1 column, Desktop: 1-2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">
            {designCourses
              .slice(
                0,
                showMoreDesign ? designCourses.length : isMobile ? 3 : 6,
              )
              .map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>

          <div className="mt-2 md:mt-6 text-center">
            {!showMoreDesign && designCourses.length > (isMobile ? 3 : 6) ? (
              <button
                onClick={() => setShowMoreDesign(true)}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 md:py-2.5 px-3 md:px-6 rounded-lg transition-colors text-xs md:text-base"
              >
                مشاهده دوره‌های بیشتر
              </button>
            ) : (
              <Link
                href="/courses/design"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 md:py-2.5 px-3 md:px-6 rounded-lg transition-colors text-xs md:text-base"
              >
                مشاهده همه دوره‌ها
              </Link>
            )}
          </div>
        </div>

        {/* Left side: Thumbnail Courses */}
        <div className="bg-[#353737] rounded-xl md:rounded-2xl shadow-xl overflow-hidden p-2 md:p-6">
          <h2 className="text-base md:text-xl lg:text-2xl font-bold mb-2 md:mb-6 text-white text-center border-b border-gray-700 pb-2 md:pb-4">
            دوره های تامنیل و کاور
          </h2>

          {/* Mobile: 1 column, Desktop: 1-2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">
            {thumbnailCourses
              .slice(
                0,
                showMoreThumbnail ? thumbnailCourses.length : isMobile ? 3 : 6,
              )
              .map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>

          <div className="mt-2 md:mt-6 text-center">
            {!showMoreThumbnail &&
            thumbnailCourses.length > (isMobile ? 3 : 6) ? (
              <button
                onClick={() => setShowMoreThumbnail(true)}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 md:py-2.5 px-3 md:px-6 rounded-lg transition-colors text-xs md:text-base"
              >
                مشاهده دوره‌های بیشتر
              </button>
            ) : (
              <Link
                href="/courses/thumbnails"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 md:py-2.5 px-3 md:px-6 rounded-lg transition-colors text-xs md:text-base"
              >
                مشاهده همه دوره‌ها
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Course Detail Modal */}
      {isModalOpen && <CourseDetailModal />}
    </div>
  );
}
