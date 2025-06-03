'use client';
import { useState } from 'react';

export default function AdForm() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await fetch('/api/ads/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, desc }),
    });
    alert('آگهی ثبت شد');
    setTitle('');
    setDesc('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="عنوان"
        className="border p-2 w-full"
      />
      <textarea
        value={desc}
        onChange={e => setDesc(e.target.value)}
        placeholder="توضیحات"
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-1">
        ثبت آگهی
      </button>
    </form>
  );
}
