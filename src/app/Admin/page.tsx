'use client';
import { useState } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const correctPassword = '1234'; // رمز ساده

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthorized(true);
    } else {
      alert('رمز اشتباه است');
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
          <h1 className="text-lg font-bold mb-2">ورود به پنل ادمین</h1>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="رمز عبور"
            className="border p-2 rounded w-full mb-2"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            ورود
          </button>
        </form>
      </div>
    );
  }

  // محتوا بعد از ورود موفق
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">🎉 خوش آمدی ادمین!</h1>
      <p>اینجا می‌تونی لیست کاربران یا محصولات رو ببینی و مدیریت کنی.</p>

      {/* لینک به صفحات دیگه پنل */}
      <ul className="mt-4 list-disc list-inside space-y-1">
        <li>
          <a className="text-blue-600 underline" href="/admin/users">
            محصولات
          </a>
        </li>
        <li>
          <a className="text-blue-600 underline" href="Admin/AdminSeeUsers">
            کاربران
          </a>
        </li>
      </ul>
    </div>
  );
}
