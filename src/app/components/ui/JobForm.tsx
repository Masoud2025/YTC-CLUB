/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// components/ui/JobForm.tsx
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiSend, FiAlertCircle } from 'react-icons/fi';

interface JobFormProps {
  onClose: () => void;
  onSubmit: (jobData: any) => Promise<void>; // ← Fixed: Now accepts jobData parameter
  categories: string[];
  userData: any;
}

interface FormData {
  title: string;
  description: string;
  location: string;
  category: string;
  salary: string;
  workType: string;
  experience: string;
  contactInfo: {
    phone: string;
    telegram: string;
    email: string;
  };
  tags: string[];
}

export default function JobForm({
  onClose,
  onSubmit,
  categories,
  userData,
}: JobFormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    location: '',
    category: categories[0] || '',
    salary: '',
    workType: 'تمام وقت',
    experience: 'بدون تجربه',
    contactInfo: {
      phone: '',
      telegram: '',
      email: '',
    },
    tags: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tagInput, setTagInput] = useState('');

  const workTypes = ['تمام وقت', 'پاره وقت', 'پروژه‌ای', 'دورکاری', 'حضوری'];
  const experienceLevels = [
    'بدون تجربه',
    '۱-۲ سال',
    '۲-۳ سال',
    '۳-۵ سال',
    'بیش از ۵ سال',
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name.startsWith('contactInfo.')) {
      const contactField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [contactField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form data
    if (!formData.title.trim()) {
      setError('عنوان آگهی الزامی است');
      return;
    }

    if (!formData.description.trim()) {
      setError('توضیحات آگهی الزامی است');
      return;
    }

    if (!formData.location.trim()) {
      setError('موقعیت مکانی الزامی است');
      return;
    }

    if (
      !formData.contactInfo.phone &&
      !formData.contactInfo.telegram &&
      !formData.contactInfo.email
    ) {
      setError('حداقل یک روش تماس را وارد کنید');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData); // ← Fixed: Now passes formData to parent
    } catch (error) {
      setError('خطا در ارسال آگهی. لطفا دوباره تلاش کنید');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#353737] rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">ثبت آگهی جدید</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-4 mb-6 flex items-center gap-3">
            <FiAlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-300">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-white font-bold mb-2">
              عنوان آگهی *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full bg-[#302f2f] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="مثال: ادیتور ویدیو با تجربه"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-bold mb-2">توضیحات *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full bg-[#302f2f] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="توضیحات کامل درباره شغل، مهارت‌های مورد نیاز و..."
              required
            />
          </div>

          {/* Category and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-bold mb-2">
                دسته‌بندی *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-[#302f2f] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-bold mb-2">
                موقعیت مکانی *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full bg-[#302f2f] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="مثال: تهران، اصفهان، دورکاری"
                required
              />
            </div>
          </div>

          {/* Work Type and Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-bold mb-2">
                نوع همکاری
              </label>
              <select
                name="workType"
                value={formData.workType}
                onChange={handleInputChange}
                className="w-full bg-[#302f2f] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {workTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-bold mb-2">
                سطح تجربه
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full bg-[#302f2f] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {experienceLevels.map(level => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-white font-bold mb-2">حقوق</label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              className="w-full bg-[#302f2f] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="مثال: ۵-۱۰ میلیون تومان، توافقی"
            />
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-white font-bold mb-2">
              اطلاعات تماس *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="tel"
                name="contactInfo.phone"
                value={formData.contactInfo.phone}
                onChange={handleInputChange}
                className="w-full bg-[#302f2f] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="شماره تلفن"
              />
              <input
                type="text"
                name="contactInfo.telegram"
                value={formData.contactInfo.telegram}
                onChange={handleInputChange}
                className="w-full bg-[#302f2f] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="آیدی تلگرام"
              />
              <input
                type="email"
                name="contactInfo.email"
                value={formData.contactInfo.email}
                onChange={handleInputChange}
                className="w-full bg-[#302f2f] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ایمیل"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-white font-bold mb-2">برچسب‌ها</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                className="flex-1 bg-[#302f2f] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="برچسب جدید"
                onKeyPress={e =>
                  e.key === 'Enter' && (e.preventDefault(), addTag())
                }
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                افزودن
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-red-400 hover:text-red-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <FiSend className="w-4 h-4" />
              )}
              {loading ? 'در حال ارسال...' : 'ارسال آگهی'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
