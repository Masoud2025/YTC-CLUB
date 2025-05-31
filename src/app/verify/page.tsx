'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function VerifyPage() {
  const params = useSearchParams();
  const [message, setMessage] = useState('در حال بررسی پرداخت...');

  useEffect(() => {
    const authority = params.get('payman_authority');
    const status = params.get('status');

    if (!authority || status !== 'OK') {
      setMessage('پرداخت ناموفق بود یا لغو شد.');
      return;
    }

    const verify = async () => {
      const res = await fetch('/api/zarinpal/verify', {
        method: 'POST',
        body: JSON.stringify({ authority }),
      });
      const data = await res.json();

      if (data.success) {
        setMessage('پرداخت موفق بود ✅. کد پیگیری: ' + data.signature);
      } else {
        setMessage('خطا در تأیید پرداخت ❌');
      }
    };

    verify();
  }, []);

  return (
    <div className="p-6 text-center text-[5em]  text-red-400">
      <h1>{message}</h1>
    </div>
  );
}
