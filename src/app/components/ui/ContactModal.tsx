/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FiX, FiPhone, FiMail } from 'react-icons/fi';

interface ContactModalProps {
  job: any;
  onClose: () => void;
}

export default function ContactModal({ job, onClose }: ContactModalProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('کپی شد!');
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[#353737] rounded-2xl w-full max-w-md"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">اطلاعات تماس</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Job Info */}
          <div className="bg-[#302f2f] rounded-lg p-4 mb-6">
            <h4 className="font-bold text-white mb-2">{job.title}</h4>
            <div className="flex items-center text-gray-400 text-sm">
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs mr-2">
                {job.category}
              </span>
              <span>{job.location}</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            {job.contactInfo.phone && (
              <div className="flex items-center justify-between bg-[#302f2f] rounded-lg p-4">
                <div className="flex items-center">
                  <FiPhone className="w-5 h-5 text-green-400 ml-3" />
                  <div>
                    <p className="text-gray-400 text-sm">تلفن</p>
                    <p className="text-white font-mono">
                      {job.contactInfo.phone}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(job.contactInfo.phone)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                >
                  کپی
                </button>
              </div>
            )}

            {job.contactInfo.telegram && (
              <div className="flex items-center justify-between bg-[#302f2f] rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center ml-3">
                    <span className="text-white text-xs font-bold">T</span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">تلگرام</p>
                    <p className="text-white font-mono">
                      {job.contactInfo.telegram}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(job.contactInfo.telegram)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                >
                  کپی
                </button>
              </div>
            )}

            {job.contactInfo.email && (
              <div className="flex items-center justify-between bg-[#302f2f] rounded-lg p-4">
                <div className="flex items-center">
                  <FiMail className="w-5 h-5 text-red-400 ml-3" />
                  <div>
                    <p className="text-gray-400 text-sm">ایمیل</p>
                    <p className="text-white font-mono">
                      {job.contactInfo.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(job.contactInfo.email)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                >
                  کپی
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            {job.contactInfo.phone && (
              <a
                href={`tel:${job.contactInfo.phone}`}
                className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-lg font-bold transition-colors"
              >
                تماس تلفنی
              </a>
            )}

            {job.contactInfo.telegram && (
              <a
                href={`https://t.me/${job.contactInfo.telegram.replace(
                  '@',
                  '',
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-bold transition-colors"
              >
                ارسال پیام در تلگرام
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
