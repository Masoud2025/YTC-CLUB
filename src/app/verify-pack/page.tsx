/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function VerifyPackContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>(
    'loading',
  );
  const [message, setMessage] = useState('');
  const [packInfo, setPackInfo] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const authority = searchParams.get('Authority');
    const status = searchParams.get('Status');
    const packId = searchParams.get('packId');

    if (authority && status && packId) {
      verifyPayment(authority, status, packId);
    } else {
      setStatus('failed');
      setMessage('اطلاعات پرداخت ناقص است');
    }
  }, [searchParams]);

  const verifyPayment = async (
    authority: string,
    paymentStatus: string,
    packId: string,
  ) => {
    try {
      if (paymentStatus !== 'OK') {
        setStatus('failed');
        setMessage('پرداخت لغو شد یا با خطا مواجه شد');
        return;
      }

      // Use fetch instead of axios
      const response = await fetch('/api/verify-pack-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authority,
          packId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setMessage('پرداخت با موفقیت انجام شد!');
        setPackInfo(result.packInfo);

        // Redirect to pack page after 3 seconds
        setTimeout(() => {
          router.push(`/pack/${packId}`);
        }, 3000);
      } else {
        setStatus('failed');
        setMessage(result.message || 'خطا در تایید پرداخت');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setStatus('failed');
      setMessage('خطا در تایید پرداخت');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      dir="rtl"
    >
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
        {status === 'loading' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-bold mb-2">در حال تایید پرداخت...</h2>
            <p className="text-gray-600">لطفاً صبر کنید</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-xl font-bold text-green-600 mb-2">
              پرداخت موفق!
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>
            {packInfo && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-green-700">
                  پک <strong>{packInfo.title}</strong> با موفقیت خریداری شد
                </p>
              </div>
            )}
            <p className="text-sm text-gray-500 mb-4">
              در حال انتقال به صفحه پک...
            </p>
            <button
              onClick={() => router.push(`/pack/${searchParams.get('packId')}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              مشاهده پک خریداری شده
            </button>
          </div>
        )}

        {status === 'failed' && (
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">✗</div>
            <h2 className="text-xl font-bold text-red-600 mb-2">
              پرداخت ناموفق
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/editing-packs')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                بازگشت به فروشگاه
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                تلاش مجدد
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyPackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <VerifyPackContent />
    </Suspense>
  );
}
