'use client';
import React, { useState, useEffect } from 'react';

interface EditingPack {
  downloadLinks: { title: string; url: string; size: string; type: string }[];
  id: string;
  title: string;
  image: string;
  price: number;
  discountPrice: number;
  level: string;
  duration: string;
  description: string;
  includes: string[];
  hasDiscount: boolean;
  isActive: boolean;
  createdAt: string;
}

export default function AdminPacksPage() {
  const [packs, setPacks] = useState<EditingPack[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPack, setEditingPack] = useState<EditingPack | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    image: '/packImage.jpg',
    price: 0,
    discountPrice: 0,
    level: 'مقدماتی',
    duration: '',
    description: '',
    includes: [''],
    hasDiscount: false,
    isActive: true,
    downloadLinks: [{ title: '', url: '', size: '', type: 'video' }], // Add this line
  });

  useEffect(() => {
    fetchPacks();
  }, []);
  // Add these functions for managing download links
  const addDownloadLink = () => {
    setFormData({
      ...formData,
      downloadLinks: [
        ...formData.downloadLinks,
        { title: '', url: '', size: '', type: 'video' },
      ],
    });
  };

  const removeDownloadLink = (index: number) => {
    const newLinks = formData.downloadLinks.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      downloadLinks: newLinks,
    });
  };

  const updateDownloadLink = (index: number, field: string, value: string) => {
    const newLinks = [...formData.downloadLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFormData({
      ...formData,
      downloadLinks: newLinks,
    });
  };
  const fetchPacks = async () => {
    try {
      const response = await fetch('/api/packs');
      const data = await response.json();
      setPacks(data.packs || []);
    } catch (error) {
      console.error('Error fetching packs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = editingPack ? 'PUT' : 'POST';
      const body = editingPack ? { ...formData, id: editingPack.id } : formData;

      const response = await fetch('/api/packs', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        fetchPacks();
        resetForm();
        alert(
          editingPack
            ? 'پک با موفقیت بروزرسانی شد'
            : 'پک جدید با موفقیت ایجاد شد',
        );
      } else {
        alert('خطا در ذخیره پک');
      }
    } catch (error) {
      console.error('Error saving pack:', error);
      alert('خطا در ذخیره پک');
    }
  };

  const handleEdit = (pack: EditingPack) => {
    setEditingPack(pack);
    setFormData({
      title: pack.title,
      image: pack.image,
      price: pack.price,
      discountPrice: pack.discountPrice,
      level: pack.level,
      duration: pack.duration,
      description: pack.description,
      includes: pack.includes,
      hasDiscount: pack.hasDiscount,
      isActive: pack.isActive,
      downloadLinks: pack.downloadLinks || [
        { title: '', url: '', size: '', type: 'video' },
      ], // Add this line
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('آیا مطمئن هستید که می‌خواهید این پک را حذف کنید؟')) {
      return;
    }

    try {
      const response = await fetch(`/api/packs?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchPacks();
        alert('پک با موفقیت حذف شد');
      } else {
        alert('خطا در حذف پک');
      }
    } catch (error) {
      console.error('Error deleting pack:', error);
      alert('خطا در حذف پک');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      image: '/packImage.jpg',
      price: 0,
      discountPrice: 0,
      level: 'مقدماتی',
      duration: '',
      description: '',
      includes: [''],
      hasDiscount: false,
      isActive: true,
      downloadLinks: [{ title: '', url: '', size: '', type: 'video' }], // Add this line
    });
    setEditingPack(null);
    setShowForm(false);
  };

  const addIncludeField = () => {
    setFormData({
      ...formData,
      includes: [...formData.includes, ''],
    });
  };

  const removeIncludeField = (index: number) => {
    const newIncludes = formData.includes.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      includes: newIncludes,
    });
  };

  const updateIncludeField = (index: number, value: string) => {
    const newIncludes = [...formData.includes];
    newIncludes[index] = value;
    setFormData({
      ...formData,
      includes: newIncludes,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">مدیریت پک‌های آموزشی</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
        >
          افزودن پک جدید
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingPack ? 'ویرایش پک' : 'افزودن پک جدید'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">عنوان</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  تصویر (URL)
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={e =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    قیمت اصلی (تومان)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        price: parseInt(e.target.value),
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    قیمت تخفیفی (تومان)
                  </label>
                  <input
                    type="number"
                    value={formData.discountPrice}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        discountPrice: parseInt(e.target.value),
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">سطح</label>
                  <select
                    value={formData.level}
                    onChange={e =>
                      setFormData({ ...formData, level: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="مقدماتی">مقدماتی</option>
                    <option value="متوسط">متوسط</option>
                    <option value="پیشرفته">پیشرفته</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    مدت زمان
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={e =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="مثال: ۸ ساعت"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  توضیحات
                </label>
                <textarea
                  value={formData.description}
                  onChange={e =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  شامل موارد:
                </label>
                {formData.includes.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={e => updateIncludeField(index, e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="مثال: ۴۵ ویدیوی آموزشی"
                      required
                    />
                    {formData.includes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIncludeField(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                      >
                        حذف
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addIncludeField}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  افزودن مورد جدید
                </button>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.hasDiscount}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        hasDiscount: e.target.checked,
                      })
                    }
                    className="ml-2"
                  />
                  دارای تخفیف
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={e =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="ml-2"
                  />
                  فعال
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
                >
                  {editingPack ? 'بروزرسانی' : 'ایجاد پک'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium"
                >
                  لغو
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Packs List */}
      <div className="grid gap-6">
        {packs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">هیچ پک آموزشی موجود نیست</p>
          </div>
        ) : (
          packs.map(pack => (
            <div
              key={pack.id}
              className={`bg-white rounded-lg shadow-md border p-6 ${
                !pack.isActive ? 'opacity-60' : ''
              }`}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-48 h-48 relative bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={pack.image}
                    alt={pack.title}
                    className="w-full h-full object-cover"
                  />
                  {!pack.isActive && (
                    <div className="absolute inset-0 bg-red-500 bg-opacity-20 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                        غیرفعال
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{pack.title}</h3>
                      <div className="flex gap-4 text-sm text-gray-600 mb-2">
                        <span>سطح: {pack.level}</span>
                        <span>مدت: {pack.duration}</span>
                        <span>
                          تاریخ ایجاد:{' '}
                          {new Date(pack.createdAt).toLocaleDateString('fa-IR')}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(pack)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                      >
                        ویرایش
                      </button>
                      <button
                        onClick={() => handleDelete(pack.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        حذف
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{pack.description}</p>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">شامل موارد:</h4>
                    <ul className="text-sm text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-1">
                      {pack.includes.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <span className="ml-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      {pack.hasDiscount && (
                        <span className="text-gray-400 line-through">
                          {pack.price.toLocaleString()} تومان
                        </span>
                      )}
                      <span className="text-blue-600 font-bold text-lg">
                        {pack.discountPrice.toLocaleString()} تومان
                      </span>
                      {pack.hasDiscount && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                          تخفیف
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">ID: {pack.id}</div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Download Links Section */}
      <div>
        <label className="block text-sm font-medium mb-1">
          لینک‌های دانلود:
        </label>
        {formData.downloadLinks.map((link, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 mb-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium mb-1">عنوان</label>
                <input
                  type="text"
                  value={link.title}
                  onChange={e =>
                    updateDownloadLink(index, 'title', e.target.value)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  placeholder="مثال: ویدیوهای آموزشی - قسمت اول"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">
                  نوع فایل
                </label>
                <select
                  value={link.type}
                  onChange={e =>
                    updateDownloadLink(index, 'type', e.target.value)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="video">ویدیو</option>
                  <option value="files">فایل‌ها</option>
                  <option value="document">سند</option>
                  <option value="audio">صوتی</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium mb-1">
                  لینک دانلود
                </label>
                <input
                  type="url"
                  value={link.url}
                  onChange={e =>
                    updateDownloadLink(index, 'url', e.target.value)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  placeholder="https://example.com/download/file.zip"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">
                  حجم فایل
                </label>
                <input
                  type="text"
                  value={link.size}
                  onChange={e =>
                    updateDownloadLink(index, 'size', e.target.value)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  placeholder="مثال: 2.5 GB"
                />
              </div>
            </div>
            {formData.downloadLinks.length > 1 && (
              <button
                type="button"
                onClick={() => removeDownloadLink(index)}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                حذف لینک
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addDownloadLink}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
        >
          افزودن لینک دانلود
        </button>
      </div>
    </div>
  );
}
