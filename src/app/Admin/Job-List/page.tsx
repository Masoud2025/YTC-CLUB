/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiCheck,
  FiX,
  FiEye,
  FiEdit,
  FiTrash2,
  FiClock,
  FiUsers,
} from 'react-icons/fi';

interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  createdBy: string;
  isPublished: boolean;
  isActive: boolean;
  views: number;
  applications: number;
  postedDate: string;
  rejectionReason?: string;
}

export default function JobsManager() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [pendingJobs, setPendingJobs] = useState<Job[]>([]);
  const [selectedTab, setSelectedTab] = useState<'published' | 'pending'>(
    'pending',
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      setJobs(data.jobs || []);
      setPendingJobs(data.pendingJobs || []);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveJob = async (jobId: string) => {
    try {
      const response = await fetch(`/api/admin/jobs/${jobId}/approve`, {
        method: 'POST',
      });

      if (response.ok) {
        await loadJobs();
        alert('آگهی تایید شد');
      }
    } catch (error) {
      console.error('Error approving job:', error);
    }
  };

  const rejectJob = async (jobId: string) => {
    const reason = prompt('دلیل رد آگهی را وارد کنید:');
    if (!reason) return;

    try {
      const response = await fetch(`/api/admin/jobs/${jobId}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });

      if (response.ok) {
        await loadJobs();
        alert('آگهی رد شد');
      }
    } catch (error) {
      console.error('Error rejecting job:', error);
    }
  };

  const deleteJob = async (jobId: string) => {
    if (confirm('آیا مطمئن هستید؟')) {
      try {
        const response = await fetch(`/api/jobs/${jobId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await loadJobs();
          alert('آگهی حذف شد');
        }
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  if (loading) {
    return <div className="text-center p-8 text-white">در حال بارگذاری...</div>;
  }

  return (
    <div className="p-6 bg-[#353737] rounded-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">
        مدیریت آگهی‌های شغلی
      </h2>

      {/* Tabs */}
      <div className="flex space-x-1 space-x-reverse mb-6">
        <button
          onClick={() => setSelectedTab('pending')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedTab === 'pending'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
          }`}
        >
          در انتظار تایید ({pendingJobs.length})
        </button>
        <button
          onClick={() => setSelectedTab('published')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedTab === 'published'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
          }`}
        >
          منتشر شده ({jobs.filter(j => j.isPublished).length})
        </button>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {selectedTab === 'pending' ? (
          pendingJobs.length > 0 ? (
            pendingJobs.map(job => (
              <PendingJobCard
                key={job.id}
                job={job}
                onApprove={() => approveJob(job.id)}
                onReject={() => rejectJob(job.id)}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              آگهی در انتظار تایید وجود ندارد
            </div>
          )
        ) : jobs.filter(j => j.isPublished).length > 0 ? (
          jobs
            .filter(j => j.isPublished)
            .map(job => (
              <PublishedJobCard
                key={job.id}
                job={job}
                onDelete={() => deleteJob(job.id)}
              />
            ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            آگهی منتشر شده‌ای وجود ندارد
          </div>
        )}
      </div>
    </div>
  );
}

// Pending Job Card Component
function PendingJobCard({ job, onApprove, onReject }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#302f2f] rounded-xl p-6 border-l-4 border-yellow-500"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-2">{job.title}</h3>
          <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-400">
            <span className="bg-blue-600 text-white px-2 py-1 rounded">
              {job.category}
            </span>
            <span>{job.location}</span>
            <span>توسط: {job.createdBy}</span>
          </div>
        </div>
        <div className="flex items-center text-yellow-400">
          <FiClock className="w-4 h-4 ml-1" />
          <span className="text-sm">در انتظار</span>
        </div>
      </div>

      <p className="text-gray-300 mb-4 line-clamp-2">{job.description}</p>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-400">
          {new Date(job.postedDate).toLocaleDateString('fa-IR')}
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onApprove}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FiCheck className="w-4 h-4" />
            تایید
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReject}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FiX className="w-4 h-4" />
            رد
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Published Job Card Component
function PublishedJobCard({ job, onDelete }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#302f2f] rounded-xl p-6 border-l-4 border-green-500"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-2">{job.title}</h3>
          <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-400">
            <span className="bg-blue-600 text-white px-2 py-1 rounded">
              {job.category}
            </span>
            <span>{job.location}</span>
            <div className="flex items-center">
              <FiEye className="w-4 h-4 ml-1" />
              {job.views} بازدید
            </div>
            <div className="flex items-center">
              <FiUsers className="w-4 h-4 ml-1" />
              {job.applications} متقاضی
            </div>
          </div>
        </div>
        <div className="flex items-center text-green-400">
          <FiCheck className="w-4 h-4 ml-1" />
          <span className="text-sm">منتشر شده</span>
        </div>
      </div>

      <p className="text-gray-300 mb-4 line-clamp-2">{job.description}</p>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-400">
          {new Date(job.postedDate).toLocaleDateString('fa-IR')}
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FiTrash2 className="w-4 h-4" />
            حذف
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
