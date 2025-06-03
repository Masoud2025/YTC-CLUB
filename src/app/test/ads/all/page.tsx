/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';

export default function ApprovedAds() {
  const [ads, setAds] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/ads/approved')
      .then(res => res.json())
      .then(data => setAds(data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">آگهی‌های تایید شده</h2>
      {ads.length === 0 ? (
        <p>هیچ آگهی‌ای وجود ندارد.</p>
      ) : (
        ads.map((ad, i) => (
          <div key={i} className="border p-2 mb-2">
            <h3>{ad.title}</h3>
            <p>{ad.desc}</p>
          </div>
        ))
      )}
    </div>
  );
}
