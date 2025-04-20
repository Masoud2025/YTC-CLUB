'use client';

import { useState } from 'react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, mobile, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('ثبت‌نام با موفقیت انجام شد!');
      setName('');
      setMobile('');
      setPassword('');
    } else {
      setMessage(data.error || 'خطا در ثبت‌نام');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-pink-300-600 rounded shadow">
      <h1 className="text-xl font-bold mb-4">ثبت‌نام</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="نام"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="tel"
          placeholder="شماره موبایل"
          value={mobile}
          onChange={e => setMobile(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'درحال ثبت‌نام...' : 'ثبت‌نام'}
        </button>
      </form>
      {message && (
        <div className="mt-4 text-center text-sm text-red-500">{message}</div>
      )}
    </div>
  );
}
