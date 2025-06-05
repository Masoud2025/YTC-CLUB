/* eslint-disable @next/next/no-html-link-for-pages */
'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function VerifyContent() {
  const [message, setMessage] = useState('در حال بررسی پرداخت...');
  const searchParams = useSearchParams();

  useEffect(() => {
    const authority = searchParams.get('Authority');
    const status = searchParams.get('Status');

    fetch(`/api/zarinpal/verify?Authority=${authority}&Status=${status}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMessage(`پرداخت با موفقیت انجام شد! کد رهگیری: ${data.ref_id}`);
        } else {
          setMessage(`پرداخت ناموفق بود: ${data.message}`);
        }
      });
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-10 max-w-md text-center border border-gray-300">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">
          نتیجه پرداخت
        </h1>
        <p className="text-lg text-gray-600">{message}</p>
        <div className="mt-8">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            بازگشت به صفحه اصلی
          </a>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <div className="bg-white rounded-lg shadow-md p-10 max-w-md text-center border border-gray-300">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800">
              نتیجه پرداخت
            </h1>
            <p className="text-lg text-gray-600">در حال بارگذاری...</p>
          </div>
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
