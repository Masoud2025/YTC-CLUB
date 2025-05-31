'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ name, phone }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setMsg(data.message || data.error);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="نام"
        className="border p-2 w-full"
      />
      <input
        type="tel"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder="شماره موبایل"
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2">
        ورود / ثبت‌نام
      </button>
      {msg && <p>{msg}</p>}
    </form>
  );
}
