/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  downloadLinks: Array<{
    id: string;
    title: string;
    url: string;
    fileSize: string;
  }>;
  isActive: boolean;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch courses from API
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/courses');

      if (!response.ok) {
        throw new Error('خطا در دریافت پک‌ها');
      }

      const data = await response.json();
      // Filter only active courses for public view
      setCourses(data.filter((course: Course) => course.isActive));
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('خطا در دریافت اطلاعات پک‌ها');
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const handleDownload = (course: Course) => {
    // Navigate to course page for download
    window.location.href = `/course/${course.id}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent relative mt-[10%] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">در حال بارگذاری پک‌ها...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-transparent relative mt-[10%] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchCourses}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent relative mt-[10%]">
      {/* Subtle Glass Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            پک‌های رایگان آموزشی
          </h1>
          <p className="text-gray-300">
            مجموعه کامل پک‌های رایگان یوتیوب و تولید محتوا
          </p>
        </div>

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">هیچ پکی یافت نشد</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {courses.map(course => (
              <motion.div key={course.id} variants={itemVariants}>
                <Card course={course} onDownload={handleDownload} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

interface CardProps {
  course: Course;
  onDownload: (course: Course) => void;
}

function Card({ course, onDownload }: CardProps) {
  return (
    <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 group aspect-square flex flex-col transform hover:-translate-y-2 hover:scale-105">
      {/* Square Image Container */}
      <div className="relative flex-1 w-full overflow-hidden">
        <div className="relative w-full h-full p-3">
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-2 right-2">
          <span className="bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {course.category}
          </span>
        </div>

        {/* Free Badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-green-500/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            رایگان
          </span>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Download Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onDownload(course)}
            className="backdrop-blur-xl bg-green-500/90 hover:bg-green-600/90 border border-white/30 rounded-full p-4 transition-all duration-200 shadow-2xl transform scale-75 group-hover:scale-100 hover:shadow-green-500/25"
            title="دانلود رایگان"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-shrink-0 flex items-center justify-center text-center">
        <h3 className="font-bold text-white line-clamp-2 text-sm leading-tight hover:text-gray-300 transition-colors duration-300">
          {course.title}
        </h3>
      </div>

      {/* Animated Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-green-400 via-white to-green-400 transition-all duration-300 transform origin-center scale-x-0 group-hover:scale-x-100" />
    </div>
  );
}
