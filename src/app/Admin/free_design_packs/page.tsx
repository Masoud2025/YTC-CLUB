/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useEffect, useState } from 'react';
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

interface CourseFormData {
  title: string;
  description: string;
  image: string;
  category: string;
  isActive: boolean;
  downloadLinks: Array<{
    id: string;
    title: string;
    url: string;
    fileSize: string;
  }>;
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    description: '',
    image: '/footbaly.jpg',
    category: 'آموزش',
    isActive: true,
    downloadLinks: [],
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/courses');
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingCourse
        ? `/api/courses/${editingCourse.id}`
        : '/api/courses';
      const method = editingCourse ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchCourses();
        resetForm();
        alert(
          editingCourse ? 'پک با موفقیت به‌روزرسانی شد' : 'پک جدید ایجاد شد',
        );
      } else {
        alert('خطا در ذخیره پک');
      }
    } catch (error) {
      console.error('Error saving course:', error);
      alert('خطا در ذخیره پک');
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      image: course.image,
      category: course.category,
      isActive: course.isActive,
      downloadLinks: course.downloadLinks,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این پک اطمینان دارید؟')) return;

    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchCourses();
        alert('پک با موفقیت حذف شد');
      } else {
        alert('خطا در حذف پک');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('خطا در حذف پک');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '/footbaly.jpg',
      category: 'آموزش',
      isActive: true,
      downloadLinks: [],
    });
    setEditingCourse(null);
    setShowForm(false);
  };

  const addDownloadLink = () => {
    const newLink = {
      id: `dl_${Date.now()}`,
      title: '',
      url: '',
      fileSize: '',
    };
    setFormData(prev => ({
      ...prev,
      downloadLinks: [...prev.downloadLinks, newLink],
    }));
  };

  const updateDownloadLink = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      downloadLinks: prev.downloadLinks.map((link, i) =>
        i === index ? { ...link, [field]: value } : link,
      ),
    }));
  };

  const removeDownloadLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      downloadLinks: prev.downloadLinks.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              مدیریت پک‌های رایگان
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              + افزودن پک جدید
            </button>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    {editingCourse ? 'ویرایش پک' : 'افزودن پک جدید'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Basic Info */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      عنوان پک
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={e =>
                        setFormData(prev => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      توضیحات
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={e =>
                        setFormData(prev => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      دسته‌بندی
                    </label>
                    <select
                      value={formData.category}
                      onChange={e =>
                        setFormData(prev => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="آموزش">آموزش</option>
                      <option value="طراحی">طراحی</option>
                      <option value="ویدیو">ویدیو</option>
                      <option value="صوتی">صوتی</option>
                      <option value="موشن گرافیک">موشن گرافیک</option>
                      <option value="تامبنیل">تامبنیل</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      آدرس تصویر
                    </label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={e =>
                        setFormData(prev => ({
                          ...prev,
                          image: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="/path/to/image.jpg"
                    />
                  </div>

                  {/* Download Links Section */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        لینک‌های دانلود
                      </label>
                      <button
                        type="button"
                        onClick={addDownloadLink}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                      >
                        + افزودن لینک
                      </button>
                    </div>

                    {formData.downloadLinks.map((link, index) => (
                      <div
                        key={link.id}
                        className="border border-gray-200 rounded-lg p-3 mb-2"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-600">
                            لینک {index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeDownloadLink(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            حذف
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                          <input
                            type="text"
                            placeholder="عنوان فایل"
                            value={link.title}
                            onChange={e =>
                              updateDownloadLink(index, 'title', e.target.value)
                            }
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                          />
                          <input
                            type="url"
                            placeholder="آدرس دانلود"
                            value={link.url}
                            onChange={e =>
                              updateDownloadLink(index, 'url', e.target.value)
                            }
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                          />
                          <input
                            type="text"
                            placeholder="حجم فایل (مثال: 2.5 GB)"
                            value={link.fileSize}
                            onChange={e =>
                              updateDownloadLink(
                                index,
                                'fileSize',
                                e.target.value,
                              )
                            }
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Active Status */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={e =>
                        setFormData(prev => ({
                          ...prev,
                          isActive: e.target.checked,
                        }))
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="isActive"
                      className="mr-2 text-sm text-gray-700"
                    >
                      پک فعال باشد
                    </label>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
                    >
                      {editingCourse ? 'به‌روزرسانی' : 'ایجاد پک'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-medium"
                    >
                      لغو
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Courses List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    پک
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    دسته‌بندی
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    وضعیت
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    لینک‌ها
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map(course => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-lg object-cover ml-4"
                          src={course.image}
                          alt={course.title}
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {course.title}
                          </div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {course.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {course.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          course.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {course.isActive ? 'فعال' : 'غیرفعال'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course.downloadLinks.length} فایل
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(course)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          ویرایش
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {courses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">هیچ پکی یافت نشد</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
