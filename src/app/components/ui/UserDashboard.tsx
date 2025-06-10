/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiClock, FiX, FiAlertCircle, FiCheck } from 'react-icons/fi';

interface UserDashboardProps {
  userData: any;
}

export default function UserDashboard({ userData }: UserDashboardProps) {
  const [userJobs, setUserJobs] = useState([]);
  const [favoriteJobs, setFavoriteJobs] = useState([]);
  const [rejectedJobs, setRejectedJobs] = useState([]);
  const [selectedTab, setSelectedTab] = useState<
    'my-jobs' | 'favorites' | 'rejected'
  >('my-jobs');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, [userData]);

  const loadUserData = async () => {
    try {
      // Load user's jobs
      const jobsResponse = await fetch(`/api/users/${userData.id}/jobs`);
      const jobsData = await jobsResponse.json();
      setUserJobs(jobsData.jobs || []);

      // Load favorite jobs
      const favoritesResponse = await fetch(
        `/api/users/${userData.id}/favorites`,
      );
      const favoritesData = await favoritesResponse.json();
      setFavoriteJobs(favoritesData.jobs || []);

      // Load rejected jobs
      const rejectedResponse = await fetch(
        `/api/users/${userData.id}/rejected`,
      );
      const rejectedData = await rejectedResponse.json();
      setRejectedJobs(rejectedData.jobs || []);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (jobId: string) => {
    try {
      await fetch('/api/users/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userData.id, jobId, action: 'remove' }),
      });
      setFavoriteJobs(favoriteJobs.filter((job: any) => job.id !== jobId));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#282A2A] text-gray-100 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">پنل کاربری</h1>
          <p className="text-gray-400">مدیریت آگهی‌ها و علاقه‌مندی‌های شما</p>
        </div>

        {/* User Info */}
        <div className="bg-[#353737] rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                {userData.name}
              </h2>
              <p className="text-gray-400">{userData.email}</p>
            </div>
            <div className="flex gap-2">
              {userData.isPremium && (
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Premium
                </span>
              )}
              {userData.isPlus && (
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Plus
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 space-x-reverse mb-6">
          <button
            onClick={() => setSelectedTab('my-jobs')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'my-jobs'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            آگهی‌های من ({userJobs.length})
          </button>
          <button
            onClick={() => setSelectedTab('favorites')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'favorites'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            علاقه‌مندی‌ها ({favoriteJobs.length})
          </button>
          <button
            onClick={() => setSelectedTab('rejected')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'rejected'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            رد شده ({rejectedJobs.length})
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {selectedTab === 'my-jobs' && <MyJobsTab jobs={userJobs} />}
          {selectedTab === 'favorites' && (
            <FavoritesTab jobs={favoriteJobs} onRemove={removeFromFavorites} />
          )}
          {selectedTab === 'rejected' && (
            <RejectedJobsTab jobs={rejectedJobs} />
          )}
        </div>
      </div>
    </div>
  );
}

// My Jobs Tab Component
function MyJobsTab({ jobs }: { jobs: any[] }) {
  return (
    <div>
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#353737] rounded-xl p-6 mb-4"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {job.title}
                </h3>
                <div className="flex items-center space-x-4 space-x-reverse text-sm">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded">
                    {job.category}
                  </span>
                  <span className="text-gray-400">{job.location}</span>
                </div>
              </div>
              <div className="flex items-center">
                {job.isPublished ? (
                  <div className="flex items-center text-green-400">
                    <FiCheck className="w-4 h-4 ml-1" />
                    <span className="text-sm">منتشر شده</span>
                  </div>
                ) : (
                  <div className="flex items-center text-yellow-400">
                    <FiClock className="w-4 h-4 ml-1" />
                    <span className="text-sm">در انتظار تایید</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-gray-300 mb-4 line-clamp-2">{job.description}</p>

            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>{new Date(job.createdAt).toLocaleDateString('fa-IR')}</span>
              <div className="flex space-x-4 space-x-reverse">
                <span>{job.views || 0} بازدید</span>
                <span>{job.applications || 0} متقاضی</span>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="text-center py-12 text-gray-400">
          <FiClock className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold mb-2">آگهی‌ای ثبت نکرده‌اید</h3>
          <p>برای ثبت آگهی جدید از دکمه "افزودن آگهی جدید" استفاده کنید</p>
        </div>
      )}
    </div>
  );
}

// Favorites Tab Component
function FavoritesTab({
  jobs,
  onRemove,
}: {
  jobs: any[];
  onRemove: (id: string) => void;
}) {
  return (
    <div>
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#353737] rounded-xl p-6 mb-4"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {job.title}
                </h3>
                <div className="flex items-center space-x-4 space-x-reverse text-sm">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded">
                    {job.category}
                  </span>
                  <span className="text-gray-400">{job.location}</span>
                  <span className="text-gray-400">{job.salary}</span>
                </div>
              </div>
              <button
                onClick={() => onRemove(job.id)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-300 mb-4 line-clamp-2">{job.description}</p>

            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>
                {new Date(job.postedDate).toLocaleDateString('fa-IR')}
              </span>
              <div className="flex space-x-4 space-x-reverse">
                <span>{job.views || 0} بازدید</span>
                <span>{job.applications || 0} متقاضی</span>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="text-center py-12 text-gray-400">
          <FiHeart className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold mb-2">آگهی علاقه‌مندی ندارید</h3>
          <p>آگهی‌های مورد علاقه خود را با کلیک روی قلب ذخیره کنید</p>
        </div>
      )}
    </div>
  );
}

// Rejected Jobs Tab Component
function RejectedJobsTab({ jobs }: { jobs: any[] }) {
  return (
    <div>
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#353737] rounded-xl p-6 mb-4 border-l-4 border-red-500"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {job.title}
                </h3>
                <div className="flex items-center space-x-4 space-x-reverse text-sm">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded">
                    {job.category}
                  </span>
                  <span className="text-gray-400">{job.location}</span>
                </div>
              </div>
              <div className="flex items-center text-red-400">
                <FiAlertCircle className="w-4 h-4 ml-1" />
                <span className="text-sm">رد شده</span>
              </div>
            </div>

            <p className="text-gray-300 mb-4 line-clamp-2">{job.description}</p>

            {job.rejectionReason && (
              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-3 mb-4">
                <h4 className="text-red-400 font-bold text-sm mb-1">
                  دلیل رد:
                </h4>
                <p className="text-gray-300 text-sm">{job.rejectionReason}</p>
              </div>
            )}

            <div className="text-sm text-gray-400">
              رد شده در: {new Date(job.updatedAt).toLocaleDateString('fa-IR')}
            </div>
          </motion.div>
        ))
      ) : (
        <div className="text-center py-12 text-gray-400">
          <FiCheck className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold mb-2">آگهی رد شده‌ای ندارید</h3>
          <p>تمام آگهی‌های شما تایید شده‌اند</p>
        </div>
      )}
    </div>
  );
}
