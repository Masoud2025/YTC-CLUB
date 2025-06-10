'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash2, FiSave, FiX } from 'react-icons/fi';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  videoUrl: string;
  downloadUrl: string;
  category: string;
  duration: string;
  fileSize: string;
  description: string;
  tags: string[];
  isActive: boolean;
}

export default function VideoManager() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load videos
  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const response = await fetch('/api/videos');
      const data = await response.json();
      setVideos(data.videos);
      setCategories(data.categories);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create video
  const createVideo = async (videoData: Omit<Video, 'id'>) => {
    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(videoData),
      });

      if (response.ok) {
        await loadVideos();
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error creating video:', error);
    }
  };

  // Update video
  const updateVideo = async (id: number, videoData: Partial<Video>) => {
    try {
      const response = await fetch(`/api/videos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(videoData),
      });

      if (response.ok) {
        await loadVideos();
        setEditingVideo(null);
      }
    } catch (error) {
      console.error('Error updating video:', error);
    }
  };

  // Delete video
  const deleteVideo = async (id: number) => {
    if (confirm('آیا مطمئن هستید؟')) {
      try {
        const response = await fetch(`/api/videos/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await loadVideos();
        }
      } catch (error) {
        console.error('Error deleting video:', error);
      }
    }
  };

  if (loading) {
    return <div className="text-center p-8">در حال بارگذاری...</div>;
  }

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">مدیریت ویدیوها</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" />
          افزودن ویدیو
        </motion.button>
      </div>

      {/* Video List */}
      <div className="space-y-4">
        {videos.map(video => (
          <motion.div
            key={video.id}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {video.title}
                </h3>
                <div className="flex gap-4 text-sm text-gray-300">
                  <span>{video.category}</span>
                  <span>{video.duration}</span>
                  <span>{video.fileSize}</span>
                  <span
                    className={
                      video.isActive ? 'text-green-400' : 'text-red-400'
                    }
                  >
                    {video.isActive ? 'فعال' : 'غیرفعال'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setEditingVideo(video)}
                  className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg"
                >
                  <FiEdit className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => deleteVideo(video.id)}
                  className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg"
                >
                  <FiTrash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Form Modal */}
      {(showForm || editingVideo) && (
        <VideoForm
          video={editingVideo}
          categories={categories}
          onSave={
            editingVideo
              ? data => updateVideo(editingVideo.id, data)
              : createVideo
          }
          onCancel={() => {
            setShowForm(false);
            setEditingVideo(null);
          }}
        />
      )}
    </div>
  );
}

// Video Form Component
interface VideoFormProps {
  video?: Video | null;
  categories: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (data: any) => void;
  onCancel: () => void;
}

function VideoForm({ video, categories, onSave, onCancel }: VideoFormProps) {
  const [formData, setFormData] = useState({
    title: video?.title || '',
    thumbnail: video?.thumbnail || '',
    videoUrl: video?.videoUrl || '',
    downloadUrl: video?.downloadUrl || '',
    category: video?.category || categories[0] || '',
    duration: video?.duration || '',
    fileSize: video?.fileSize || '',
    description: video?.description || '',
    tags: video?.tags?.join(', ') || '',
    isActive: video?.isActive ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      tags: formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">
            {video ? 'ویرایش ویدیو' : 'افزودن ویدیو جدید'}
          </h3>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-white/10 rounded-lg text-white"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              عنوان
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={e =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                دسته‌بندی
              </label>
              <select
                value={formData.category}
                onChange={e =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full p-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                مدت زمان
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={e =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="w-full p-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400"
                placeholder="15:30"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              توضیحات
            </label>
            <textarea
              value={formData.description}
              onChange={e =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 h-24"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={e =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isActive" className="text-sm text-gray-300">
              فعال
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                لینک تصویر
              </label>
              <input
                type="url"
                value={formData.thumbnail}
                onChange={e =>
                  setFormData({ ...formData, thumbnail: e.target.value })
                }
                className="w-full p-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400"
                placeholder="/videos/thumbnail-1.jpg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                حجم فایل
              </label>
              <input
                type="text"
                value={formData.fileSize}
                onChange={e =>
                  setFormData({ ...formData, fileSize: e.target.value })
                }
                className="w-full p-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400"
                placeholder="250 MB"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              لینک ویدیو
            </label>
            <input
              type="url"
              value={formData.videoUrl}
              onChange={e =>
                setFormData({ ...formData, videoUrl: e.target.value })
              }
              className="w-full p-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400"
              placeholder="/videos/video-1.mp4"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              لینک دانلود
            </label>
            <input
              type="url"
              value={formData.downloadUrl}
              onChange={e =>
                setFormData({ ...formData, downloadUrl: e.target.value })
              }
              className="w-full p-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400"
              placeholder="/downloads/video-1.zip"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              تگ‌ها (با کاما جدا کنید)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={e => setFormData({ ...formData, tags: e.target.value })}
              className="w-full p-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400"
              placeholder="یوتیوب, آموزش, طراحی"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FiSave className="w-4 h-4" />
              {video ? 'بروزرسانی' : 'ایجاد'}
            </motion.button>

            <motion.button
              type="button"
              onClick={onCancel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl transition-all duration-300"
            >
              لغو
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
