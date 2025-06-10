/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPlus,
  FiHeart,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiUser,
  FiEye,
  FiSend,
  FiCheck,
  FiX,
  FiAlertCircle,
} from 'react-icons/fi';
import JobForm from '../components/ui/JobForm';
import ContactModal from '../components/ui/ContactModal';

interface Job {
  id: string;
  title: string;
  description: string;
  contactInfo: {
    phone?: string;
    telegram?: string;
    email?: string;
  };
  location: string;
  category: string;
  salary: string;
  workType: string;
  experience: string;
  postedDate: string;
  expiryDate: string;
  isPublished: boolean;
  isActive: boolean;
  createdBy: string;
  views: number;
  applications: number;
  tags: string[];
  status?: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  isPlus: boolean;
  favoriteJobs: string[];
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('همه');
  const [showJobForm, setShowJobForm] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [favoriteJobs, setFavoriteJobs] = useState<string[]>([]);
  const [submitStatus, setSubmitStatus] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({ show: false, type: 'success', message: '' });

  // Load user data from localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem('USER_DATA');
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setUserData(user);
      setFavoriteJobs(user.favoriteJobs || []);
    }
  }, []);

  // Load jobs from API
  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      setJobs(data.jobs.filter((job: Job) => job.isPublished && job.isActive));
      setCategories(data.categories);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      searchTerm === '' ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'همه' || job.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Handle contact info display
  const handleContactClick = async (job: Job) => {
    if (!userData) {
      showNotification('error', 'لطفا ابتدا وارد حساب کاربری خود شوید');
      return;
    }

    if (!userData.isPlus) {
      showNotification(
        'error',
        'برای مشاهده اطلاعات تماس، اشتراک پلاس فعال کنید',
      );
      return;
    }

    // Increment view count
    try {
      await fetch(`/api/jobs/${job.id}/view`, { method: 'POST' });
      // Update local job views
      setJobs(prevJobs =>
        prevJobs.map(j => (j.id === job.id ? { ...j, views: j.views + 1 } : j)),
      );
    } catch (error) {
      console.error('Error incrementing views:', error);
    }

    setSelectedJob(job);
    setShowContactModal(true);
  };

  // Handle favorite toggle
  const toggleFavorite = async (jobId: string) => {
    if (!userData) {
      showNotification('error', 'لطفا ابتدا وارد حساب کاربری خود شوید');
      return;
    }

    const isCurrentlyFavorite = favoriteJobs.includes(jobId);
    const newFavorites = isCurrentlyFavorite
      ? favoriteJobs.filter(id => id !== jobId)
      : [...favoriteJobs, jobId];

    setFavoriteJobs(newFavorites);

    // Update localStorage
    const updatedUserData = { ...userData, favoriteJobs: newFavorites };
    localStorage.setItem('USER_DATA', JSON.stringify(updatedUserData));
    setUserData(updatedUserData);

    // Update server
    try {
      await fetch('/api/users/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userData.id,
          jobId,
          action: isCurrentlyFavorite ? 'remove' : 'add',
        }),
      });

      showNotification(
        'success',
        isCurrentlyFavorite
          ? 'از علاقه‌مندی‌ها حذف شد'
          : 'به علاقه‌مندی‌ها اضافه شد',
      );
    } catch (error) {
      console.error('Error updating favorites:', error);
      showNotification('error', 'خطا در به‌روزرسانی علاقه‌مندی‌ها');
      // Revert the change
      setFavoriteJobs(favoriteJobs);
    }
  };

  // Handle job form submission
  const handleJobSubmit = async (jobData: any) => {
    try {
      const response = await fetch('/api/jobs/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...jobData,
          createdBy: userData?.id,
          status: 'pending',
          isPublished: false,
          isActive: false,
        }),
      });

      if (response.ok) {
        showNotification(
          'success',
          'آگهی شما با موفقیت ارسال شد و در انتظار تایید ادمین قرار گرفت',
        );
        setShowJobForm(false);
      } else {
        throw new Error('Failed to submit job');
      }
    } catch (error) {
      console.error('Error submitting job:', error);
      showNotification('error', 'خطا در ارسال آگهی. لطفا دوباره تلاش کنید');
    }
  };

  // Show notification
  const showNotification = (type: 'success' | 'error', message: string) => {
    setSubmitStatus({ show: true, type, message });
    setTimeout(() => {
      setSubmitStatus({ show: false, type: 'success', message: '' });
    }, 5000);
  };

  // Check if user can post jobs
  const canPostJob = () => {
    return userData && (userData.isPremium || userData.isPlus);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#282A2A] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#282A2A] text-gray-100">
      {/* Notification */}
      <AnimatePresence>
        {submitStatus.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50"
          >
            <div
              className={`p-4 rounded-lg shadow-lg flex items-center gap-3 ${
                submitStatus.type === 'success'
                  ? 'bg-green-600 text-white'
                  : 'bg-red-600 text-white'
              }`}
            >
              {submitStatus.type === 'success' ? (
                <FiCheck className="w-5 h-5" />
              ) : (
                <FiAlertCircle className="w-5 h-5" />
              )}
              <span>{submitStatus.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white">فرصت‌های شغلی</h1>
          <p className="text-gray-400 text-lg mb-6">
            جدیدترین فرصت‌های شغلی در حوزه تولید محتوا و رسانه‌های اجتماعی
          </p>

          {/* User Status and Actions */}
          <div className="flex flex-col items-center gap-4 mb-8">
            {userData ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-[#353737] px-4 py-2 rounded-lg">
                  <FiUser className="w-4 h-4 text-blue-400" />
                  <span className="text-white">{userData.name}</span>
                  {userData.isPremium && (
                    <span className="bg-purple-600 text-xs px-2 py-1 rounded">
                      Premium
                    </span>
                  )}
                  {userData.isPlus && (
                    <span className="bg-blue-600 text-xs px-2 py-1 rounded">
                      Plus
                    </span>
                  )}
                </div>

                {canPostJob() && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowJobForm(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center gap-2"
                  >
                    <FiPlus className="w-5 h-5" />
                    ثبت آگهی جدید
                  </motion.button>
                )}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-400 mb-4">
                  برای ثبت آگهی و استفاده از امکانات کامل وارد شوید
                </p>
                <button
                  onClick={() => {
                    // Simulate login - in real app, redirect to login page
                    const sampleUser = {
                      id: `user_${Date.now()}`,
                      name: 'کاربر نمونه',
                      email: 'user@example.com',
                      isPremium: true,
                      isPlus: true,
                      favoriteJobs: [],
                    };
                    localStorage.setItem(
                      'USER_DATA',
                      JSON.stringify(sampleUser),
                    );
                    setUserData(sampleUser);
                    showNotification('success', 'با موفقیت وارد شدید');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                  ورود / ثبت نام
                </button>
              </div>
            )}

            {/* Job Posting Requirements */}
            {!canPostJob() && userData && (
              <div className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-4 text-center">
                <FiAlertCircle className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
                <p className="text-yellow-300 text-sm">
                  برای ثبت آگهی نیاز به اشتراک Premium یا Plus دارید
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Search and Filter */}
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
                <option value="همه">همه دسته‌ها</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count and favorites link */}
          <div className="mt-4 flex justify-between items-center">
            <div className="text-gray-400 text-sm">
              {filteredJobs.length} فرصت شغلی یافت شد
            </div>
            {userData && favoriteJobs.length > 0 && (
              <button
                onClick={() =>
                  (window.location.href = '/dashboard?tab=favorites')
                }
                className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm"
              >
                <FiHeart className="w-4 h-4" />
                {favoriteJobs.length} علاقه‌مندی
              </button>
            )}
          </div>
        </div>

        {/* Jobs List */}
        {filteredJobs.length > 0 ? (
          <div className="grid gap-6">
            {filteredJobs.map((job, index) => (
              <JobCard
                key={job.id}
                job={job}
                index={index}
                isFavorite={favoriteJobs.includes(job.id)}
                onToggleFavorite={() => toggleFavorite(job.id)}
                onContactClick={() => handleContactClick(job)}
                isLoggedIn={!!userData}
                isPlus={userData?.isPlus || false}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl p-10 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-300 mb-2">
              نتیجه‌ای یافت نشد
            </h3>
            <p className="text-gray-400">
              لطفا معیارهای جستجوی خود را تغییر دهید.
            </p>
          </div>
        )}
      </div>

      {/* Job Form Modal */}
      <AnimatePresence>
        {showJobForm && (
          <JobForm
            onClose={() => setShowJobForm(false)}
            onSubmit={handleJobSubmit}
            categories={categories}
            userData={userData}
          />
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && selectedJob && (
          <ContactModal
            job={selectedJob}
            onClose={() => setShowContactModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Job Card Component
interface JobCardProps {
  job: Job;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onContactClick: () => void;
  isLoggedIn: boolean;
  isPlus: boolean;
}

function JobCard({
  job,
  index,
  isFavorite,
  onToggleFavorite,
  onContactClick,
  isLoggedIn,
  isPlus,
}: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-[#353737] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] border border-gray-600 hover:border-blue-500/50"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold text-white line-clamp-1">
                {job.title}
              </h2>
              {isLoggedIn && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onToggleFavorite}
                  className={`p-2 rounded-full transition-colors ${
                    isFavorite
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gray-600 text-gray-300 hover:bg-gray-500 hover:text-red-400'
                  }`}
                >
                  <FiHeart
                    className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`}
                  />
                </motion.button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-[#0F3F77] text-white text-xs font-bold px-3 py-1 rounded-full">
                {job.category}
              </span>
              <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                {job.workType}
              </span>
              <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                {job.experience}
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center text-gray-400 text-sm mb-1">
              <FiEye className="w-4 h-4 ml-1" />
              {job.views} بازدید
            </div>
            <div className="text-xs text-gray-500">
              {new Date(job.postedDate).toLocaleDateString('fa-IR')}
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center text-gray-300">
            <FiMapPin className="w-4 h-4 ml-2 text-blue-400" />
            <span className="text-sm">{job.location}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <FiDollarSign className="w-4 h-4 ml-2 text-green-400" />
            <span className="text-sm">{job.salary}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <FiUser className="w-4 h-4 ml-2 text-purple-400" />
            <span className="text-sm">{job.applications} متقاضی</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-6 line-clamp-3">{job.description}</p>

        {/* Tags */}
        {job.tags && job.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {job.tags.slice(0, 5).map(tag => (
              <span
                key={tag}
                className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded hover:bg-gray-600 transition-colors"
              >
                #{tag}
              </span>
            ))}
            {job.tags.length > 5 && (
              <span className="text-gray-400 text-xs">
                +{job.tags.length - 5} مورد دیگر
              </span>
            )}
          </div>
        )}

        {/* Contact Section */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              {Object.entries(job.contactInfo).map(
                ([type, value]) =>
                  value && (
                    <div key={type} className="flex items-center">
                      {type === 'phone' && (
                        <span className="text-gray-400 text-sm">📞</span>
                      )}
                      {type === 'telegram' && (
                        <span className="text-gray-400 text-sm">📱</span>
                      )}
                      {type === 'email' && (
                        <span className="text-gray-400 text-sm">✉️</span>
                      )}
                      <span className="text-gray-400 text-sm mr-2">
                        {isPlus ? value : '●●●●●●●●●●●'}
                      </span>
                    </div>
                  ),
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onContactClick}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-colors ${
                isPlus
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-[#0F3F77] hover:bg-blue-700 text-white'
              }`}
            >
              {isPlus ? 'مشاهده اطلاعات تماس' : 'نمایش اطلاعات تماس'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
