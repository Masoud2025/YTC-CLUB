'use client';

import { useState } from 'react';

export default function Home() {
  const [step, setStep] = useState<'phone' | 'verify'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const sendCode = async () => {
    setMessage('در حال ارسال...');
    const res = await fetch('/api/send-code', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage('✅ کد ارسال شد.');
      setStep('verify');
    } else {
      setMessage('❌ خطا در ارسال پیامک');
    }
  };

  const verifyCode = async () => {
    setMessage('در حال بررسی...');
    const res = await fetch('/api/verify-code', {
      method: 'POST',
      body: JSON.stringify({ phone, code }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage('✅ تأیید شد!');
    } else {
      setMessage('❌ کد نادرست است.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
        {step === 'phone' ? (
          <>
            <h1 className="text-xl font-bold mb-4 text-center">
              ورود با شماره
            </h1>
            <input
              type="tel"
              placeholder="مثلاً 09121234567"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <button
              onClick={sendCode}
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              ارسال کد
            </button>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold mb-4 text-center">
              کد تأیید را وارد کنید
            </h1>
            <input
              type="text"
              placeholder="کد ۶ رقمی"
              value={code}
              onChange={e => setCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <button
              onClick={verifyCode}
              className="w-full bg-green-600 text-white py-2 rounded-lg"
            >
              تأیید
            </button>
          </>
        )}
        <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
      </div>
    </main>
  );
}
