'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

interface DownloadLink {
  id: string;
  title: string;
  url: string;
  size: string;
  type: 'video' | 'files' | 'document' | 'audio';
}

interface Pack {
  id: string;
  title: string;
  image: string;
  price: number;
  discountPrice: number;
  level: string;
  duration: string;
  description: string;
  includes: string[];
  hasDiscount: boolean;
  isActive: boolean;
  downloadLinks: DownloadLink[];
}

interface UserData {
  name?: string;
  phone?: string;
  email?: string;
}

export default function PackPage() {
  const params = useParams();
  const router = useRouter();
  const [pack, setPack] = useState<Pack | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchPack();
      checkUserAuth();
    }
  }, [params.id]);

  const fetchPack = async () => {
    try {
      const response = await fetch('/api/packs');
      const data = await response.json();
      const foundPack = data.packs.find((p: Pack) => p.id === params.id);

      if (!foundPack) {
        router.push('/editing-packs');
        return;
      }

      setPack(foundPack);
    } catch (error) {
      console.error('Error fetching pack:', error);
      router.push('/editing-packs');
    }
  };

  const checkUserAuth = async () => {
    try {
      const userDataString = localStorage.getItem('USER_DATA');
      if (userDataString) {
        const parsedUserData: UserData = JSON.parse(userDataString);
        if (parsedUserData.phone) {
          setUserData(parsedUserData);
          await checkPurchaseStatus(parsedUserData.phone);
        }
      }
    } catch (error) {
      console.error('Error checking user auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkPurchaseStatus = async (userPhone: string) => {
    try {
      const response = await fetch(
        `/api/purchases?userPhone=${userPhone}&packId=${params.id}`,
      );
      const data = await response.json();
      setHasPurchased(data.hasPurchased);
    } catch (error) {
      console.error('Error checking purchase status:', error);
    }
  };

  const handlePurchase = async () => {
    if (!userData?.phone) {
      alert('برای خرید ابتدا وارد حساب کاربری خود شوید');
      router.push('/login');
      return;
    }

    setPurchaseLoading(true);

    try {
      // Create purchase record
      const purchaseResponse = await fetch('/api/purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packId: pack?.id,
          packTitle: pack?.title,
          userPhone: userData.phone,
          userName: userData.name,
          amount: pack?.discountPrice,
        }),
      });

      const purchaseData = await purchaseResponse.json();

      // Process payment
      const paymentResponse = await fetch('/api/zarinpal-pack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: pack?.discountPrice ? pack.discountPrice * 10 : 0,
          packId: pack?.id,
          packTitle: pack?.title,
          userData: userData,
          purchaseId: purchaseData.id,
        }),
      });

      const paymentData = await paymentResponse.json();

      if (paymentData.url) {
        window.location.href = paymentData.url;
      } else {
        throw new Error(paymentData.error || 'خطا در ایجاد پرداخت');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      alert('خطا در فرآیند خرید');
    } finally {
      setPurchaseLoading(false);
    }
  };

  const formatPrice = (price: number): string => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return price
      .toString()
      .replace(/\d/g, digit => persianDigits[parseInt(digit)]);
  };

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return '🎥';
      case 'files':
        return '📁';
      case 'document':
        return '📄';
      case 'audio':
        return '🎵';
      default:
        return '📎';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!pack) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">پک مورد نظر یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={pack.image}
                  alt={pack.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {pack.level}
                </div>
                {pack.hasDiscount && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    تخفیف
                  </div>
                )}
              </div>
            </div>

            <div className="md:w-2/3">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">
                {pack.title}
              </h1>

              <div className="flex gap-6 mb-4 text-gray-600">
                <div className="flex items-center">
                  <span className="ml-2">⏱️</span>
                  <span>{pack.duration}</span>
                </div>
                <div className="flex items-center">
                  <span className="ml-2">📊</span>
                  <span>{pack.level}</span>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{pack.description}</p>

              <div className="mb-6">
                <h3 className="font-bold mb-3">این پک شامل:</h3>
                <ul className="space-y-2">
                  {pack.includes.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  {pack.hasDiscount && (
                    <span className="text-gray-400 line-through text-lg block">
                      {formatPrice(pack.price)} تومان
                    </span>
                  )}
                  <span className="text-blue-600 font-bold text-2xl">
                    {formatPrice(pack.discountPrice)} تومان
                  </span>
                </div>

                {!hasPurchased && (
                  <button
                    onClick={handlePurchase}
                    disabled={purchaseLoading || !userData}
                    className={`px-8 py-3 rounded-lg font-bold text-lg transition-colors ${
                      !userData
                        ? 'bg-gray-500 text-white cursor-not-allowed'
                        : purchaseLoading
                        ? 'bg-blue-400 text-white cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {purchaseLoading ? 'در حال پردازش...' : 'خرید پک'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Download Links Section */}
        {hasPurchased &&
          pack.downloadLinks &&
          pack.downloadLinks.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-green-600">
                🎉 تبریک! شما این پک را خریداری کرده‌اید
              </h2>
              <p className="text-gray-600 mb-6">
                لینک‌های دانلود شما آماده است. روی هر لینک کلیک کنید تا دانلود
                شروع شود.
              </p>

              <div className="grid gap-4">
                {pack.downloadLinks.map(link => (
                  <div
                    key={link.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl ml-3">
                          {getFileTypeIcon(link.type)}
                        </span>
                        <div>
                          <h3 className="font-medium">{link.title}</h3>
                          <p className="text-sm text-gray-500">
                            حجم: {link.size}
                          </p>
                        </div>
                      </div>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        دانلود
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Not Purchased Message */}
        {!hasPurchased && userData && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-yellow-700 mb-4">
              برای دسترسی به لینک‌های دانلود، ابتدا این پک را خریداری کنید.
            </p>
          </div>
        )}

        {/* Not Logged In Message */}
        {!userData && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <p className="text-blue-700 mb-4">
              برای خرید و دسترسی به محتوا، ابتدا وارد حساب کاربری خود شوید.
            </p>
            <button
              onClick={() => router.push('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              ورود به حساب کاربری
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
