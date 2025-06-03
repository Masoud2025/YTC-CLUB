'use client';
import { useEffect, useState } from 'react';

type Ad = {
  title: string;
  desc: string;
};

export default function PendingAdsPage() {
  const [pendingAds, setPendingAds] = useState<Ad[]>([]);

  useEffect(() => {
    fetch('/api/ads/pending')
      .then(res => res.json())
      .then(setPendingAds);
  }, []);

  const approveAd = async (ad: Ad) => {
    await fetch('/api/ads/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ad),
    });

    // حذف از لیست در صفحه
    setPendingAds(pendingAds.filter(a => a.title !== ad.title));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">آگهی‌های در صف تایید</h2>
      {pendingAds.map((ad, i) => (
        <div key={i} className="border p-2 mb-2">
          <h3>{ad.title}</h3>
          <p>{ad.desc}</p>
          <button
            className="bg-green-500 text-white px-4 py-1 mt-2 rounded"
            onClick={() => approveAd(ad)}
          >
            تایید آگهی
          </button>
        </div>
      ))}
    </div>
  );
}
