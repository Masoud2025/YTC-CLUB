/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');

  // Iranian phone number validation
  const validateIranianPhone = (phoneNumber: string): boolean => {
    // Remove all non-digit characters
    const cleanPhone = phoneNumber.replace(/\D/g, '');

    // Iranian mobile number patterns
    const iranianMobileRegex = /^(\+98|0098|98|0)?9[0-9]{9}$/;

    return iranianMobileRegex.test(cleanPhone);
  };

  // Format phone number for display
  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digit characters
    const cleanValue = value.replace(/\D/g, '');

    // Add formatting
    if (cleanValue.length <= 4) {
      return cleanValue;
    } else if (cleanValue.length <= 7) {
      return `${cleanValue.slice(0, 4)} ${cleanValue.slice(4)}`;
    } else if (cleanValue.length <= 11) {
      return `${cleanValue.slice(0, 4)} ${cleanValue.slice(
        4,
        7,
      )} ${cleanValue.slice(7)}`;
    }

    return `${cleanValue.slice(0, 4)} ${cleanValue.slice(
      4,
      7,
    )} ${cleanValue.slice(7, 11)}`;
  };

  // Normalize phone number for API
  const normalizePhoneNumber = (phoneNumber: string): string => {
    const cleanPhone = phoneNumber.replace(/\D/g, '');

    // Convert to standard format (09xxxxxxxxx)
    if (cleanPhone.startsWith('98') && cleanPhone.length === 12) {
      return '0' + cleanPhone.slice(2);
    } else if (cleanPhone.startsWith('0098') && cleanPhone.length === 13) {
      return '0' + cleanPhone.slice(4);
    } else if (cleanPhone.startsWith('+98') && cleanPhone.length === 13) {
      return '0' + cleanPhone.slice(3);
    } else if (cleanPhone.startsWith('9') && cleanPhone.length === 10) {
      return '0' + cleanPhone;
    }

    return cleanPhone;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanValue = value.replace(/\D/g, '');

    // Limit to 11 digits max
    if (cleanValue.length <= 11) {
      const formattedValue = formatPhoneNumber(cleanValue);
      setPhone(formattedValue);

      // Clear error when user starts typing
      if (phoneError) {
        setPhoneError('');
      }
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow Persian/English letters and spaces
    const persianEnglishRegex = /^[\u0600-\u06FF\u200C\u200D a-zA-Z]*$/;

    if (persianEnglishRegex.test(value) || value === '') {
      setName(value);
      if (nameError) {
        setNameError('');
      }
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;

    // Name validation
    if (!name.trim()) {
      setNameError('نام الزامی است');
      isValid = false;
    } else if (name.trim().length < 2) {
      setNameError('نام باید حداقل ۲ کاراکتر باشد');
      isValid = false;
    }

    // Phone validation
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone) {
      setPhoneError('شماره موبایل الزامی است');
      isValid = false;
    } else if (!validateIranianPhone(cleanPhone)) {
      setPhoneError('شماره موبایل معتبر نیست. مثال: 09123456789');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMsg('');

    try {
      const normalizedPhone = normalizePhoneNumber(phone);

      const res = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify({
          name: name.trim(),
          phone: normalizedPhone,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      setMsg(data.message || data.error);
    } catch (error) {
      setMsg('خطا در اتصال به سرور');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">خوش آمدید</h1>
          <p className="text-white">برای ادامه وارد حساب کاربری خود شوید</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 text-right"
                >
                  نام کامل
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="نام خود را وارد کنید"
                    className={`w-full px-4 py-3 pr-11 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-right placeholder-gray-400 ${
                      nameError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className={`w-5 h-5 ${
                        nameError ? 'text-red-400' : 'text-gray-400'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
                {nameError && (
                  <p className="text-red-600 text-sm text-right flex items-center justify-end space-x-1 space-x-reverse">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{nameError}</span>
                  </p>
                )}
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 text-right"
                >
                  شماره موبایل
                </label>
                <div className="relative">
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="0912 345 6789"
                    className={`w-full px-4 py-3 pr-11 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-right placeholder-gray-400 ${
                      phoneError
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300'
                    }`}
                    required
                    dir="ltr"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className={`w-5 h-5 ${
                        phoneError ? 'text-red-400' : 'text-gray-400'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                </div>
                {phoneError && (
                  <p className="text-red-600 text-sm text-right flex items-center justify-end space-x-1 space-x-reverse">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{phoneError}</span>
                  </p>
                )}
                <div className="text-xs text-gray-500 text-right">
                  <p>فرمت‌های مجاز:</p>
                  <p>• 09123456789</p>
                  <p>• +989123456789</p>
                  <p>• 00989123456789</p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2 space-x-reverse">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>در حال پردازش...</span>
                  </div>
                ) : (
                  'ورود / ثبت‌نام'
                )}
              </button>

              {/* Message Display */}
              {msg && (
                <div
                  className={`p-4 rounded-xl text-center font-medium ${
                    msg.includes('خطا') || msg.includes('error')
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-green-50 text-green-700 border border-green-200'
                  }`}
                >
                  {msg}
                </div>
              )}
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-sm text-gray-600">
              با ورود به سایت، شما{' '}
              <a
                href="#"
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                قوانین و مقررات
              </a>{' '}
              را می‌پذیرید
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            نیاز به کمک دارید؟{' '}
            <a
              href="#"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              تماس با پشتیبانی
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
