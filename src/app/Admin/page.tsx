'use client';
import { useState } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const correctPassword = 'Admin123';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 500));

    if (password === correctPassword) {
      setIsAuthorized(true);
    } else {
      setError('رمز عبور اشتباه است!');
    }
    setIsLoading(false);
  };

  const adminMenuItems = [
    {
      title: 'محصولات',
      href: '/admin/products',
      icon: '🎁',
      color: 'bg-blue-400',
    },
    {
      title: 'کاربران',
      href: '/admin/users',
      icon: '👨‍👩‍👧‍👦',
      color: 'bg-green-400',
    },
    {
      title: 'پک‌های ویژه',
      href: '/admin/packs',
      icon: '⭐',
      color: 'bg-yellow-400',
    },
    {
      title: 'ویدیوها',
      href: '/admin/videos',
      icon: '📺',
      color: 'bg-red-400',
    },
  ];

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-3xl font-bold text-blue-600 mb-2">پنل مدیر</h1>
            <p className="text-gray-600">رمز عبور را وارد کن</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="رمز عبور"
                className="w-full p-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-400 focus:outline-none"
                required
              />
            </div>

            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded-2xl text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-colors disabled:bg-gray-400"
            >
              {isLoading ? '⏳ صبر کن...' : '🚀 ورود'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              رمز: <span className="font-bold text-blue-600">Admin123</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">👑</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">پنل مدیر</h1>
                <p className="text-gray-600">سلام مدیر عزیز!</p>
              </div>
            </div>
            <button
              onClick={() => setIsAuthorized(false)}
              className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-xl font-bold"
            >
              🚪 خروج
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            چه کاری می‌خوای انجام بدی؟
          </h2>
          <p className="text-gray-600">روی هر کدوم کلیک کن</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminMenuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="group bg-white rounded-3xl shadow-md hover:shadow-lg border-2 border-gray-100 hover:border-gray-200 transition-all duration-200 transform hover:scale-105 p-8"
            >
              <div className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 ${item.color} rounded-full mb-4 group-hover:scale-110 transition-transform`}
                >
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600">
                  {item.title}
                </h3>
              </div>
            </a>
          ))}
        </div>

        {/* Simple Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div className="text-3xl mb-2">👥</div>
            <p className="text-2xl font-bold text-gray-800">150</p>
            <p className="text-sm text-gray-600">کاربر</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div className="text-3xl mb-2">🎁</div>
            <p className="text-2xl font-bold text-gray-800">25</p>
            <p className="text-sm text-gray-600">محصول</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div className="text-3xl mb-2">⭐</div>
            <p className="text-2xl font-bold text-gray-800">8</p>
            <p className="text-sm text-gray-600">پک ویژه</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div className="text-3xl mb-2">📺</div>
            <p className="text-2xl font-bold text-gray-800">42</p>
            <p className="text-sm text-gray-600">ویدیو</p>
          </div>
        </div>
      </div>
    </div>
  );
}
