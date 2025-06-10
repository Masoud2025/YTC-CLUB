/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// User data interface
interface UserData {
  name?: string;
  phone?: string;
  email?: string;
  [key: string]: any;
}

// Pack interface
interface EditingPack {
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
}

export default function EditingPacksPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState<string | null>(null);
  const [editingPacks, setEditingPacks] = useState<EditingPack[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch packs from API
  useEffect(() => {
    fetchPacks();
    checkUserAuthentication();
  }, []);

  const fetchPacks = async () => {
    try {
      const response = await fetch('/api/packs');
      const data = await response.json();
      setEditingPacks(data.packs.filter((pack: EditingPack) => pack.isActive));
    } catch (error) {
      console.error('Error fetching packs:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkUserAuthentication = () => {
    try {
      const userDataString = localStorage.getItem('USER_DATA');
      if (userDataString) {
        const parsedUserData: UserData = JSON.parse(userDataString);

        // Check if user has required fields (name and phone)
        if (parsedUserData.name && parsedUserData.phone) {
          setUserData(parsedUserData);
        } else {
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      setUserData(null);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  // Redirect to login if user is not authenticated
  const redirectToLogin = () => {
    router.push('/login');
  };

  // Format price with Persian numerals
  const formatPrice = (price: number): string => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const formattedPrice = price
      .toString()
      .replace(/\d/g, digit => persianDigits[parseInt(digit)]);

    const withSeparators = formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${withSeparators}`;
  };

  // Handle direct purchase
  const handleBuyNow = async (pack: any) => {
    // Check if user is authenticated
    if (!userData || !userData.name || !userData.phone) {
      alert('برای خرید پک آموزشی ابتدا وارد حساب کاربری خود شوید');
      redirectToLogin();
      return;
    }

    setLoadingPayment(pack.id);

    try {
      const response = await fetch('/api/zarinpal-pack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: pack.discountPrice * 10, // Convert to Rial (Toman * 10)
          packId: pack.id,
          packTitle: pack.title,
          userData: userData,
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to ZarinPal
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'خطا در ایجاد پرداخت');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('خطا در برقراری ارتباط با درگاه پرداخت');
    } finally {
      setLoadingPayment(null);
    }
  };

  // Show loading spinner while checking authentication or loading packs
  if (isCheckingAuth || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12" dir="rtl">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
        پک‌های آموزش تدوین ویدیو
      </h1>
      <p className="text-gray-600 text-center mb-6 md:mb-8 text-sm md:text-base px-4">
        مجموعه کامل آموزش‌ها و ابزارهای مورد نیاز برای تدوین حرفه‌ای ویدیو
      </p>

      {/* Show user info if authenticated */}
      {userData && userData.name && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4 max-w-md mx-auto mb-6 md:mb-8">
          <p className="text-blue-700 text-sm text-center">
            خوش آمدید، <span className="font-bold">{userData.name}</span>
          </p>
        </div>
      )}

      {/* Show warning if not authenticated */}
      {!userData && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 md:p-4 max-w-md mx-auto mb-6 md:mb-8">
          <p className="text-yellow-700 text-sm mb-2 text-center">
            برای خرید پک‌های آموزشی ابتدا وارد حساب کاربری خود شوید
          </p>
          <div className="text-center">
            <button
              onClick={redirectToLogin}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              ورود به حساب کاربری
            </button>
          </div>
        </div>
      )}

      {/* No packs message */}
      {editingPacks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">هیچ پک آموزشی موجود نیست</p>
        </div>
      )}

      {/* Mobile-first responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
        {editingPacks.map(pack => (
          <EditingPackCard
            key={pack.id}
            pack={pack}
            onBuyNow={() => handleBuyNow(pack)}
            formatPrice={formatPrice}
            isAuthenticated={!!userData}
            isLoading={loadingPayment === pack.id}
          />
        ))}
      </div>
    </div>
  );
}

interface EditingPackCardProps {
  pack: EditingPack;
  onBuyNow: () => void;
  formatPrice: (price: number) => string;
  isAuthenticated: boolean;
  isLoading: boolean;
}

function EditingPackCard({
  pack,
  onBuyNow,
  formatPrice,
  isAuthenticated,
  isLoading,
}: EditingPackCardProps) {
  return (
    <div className="relative group w-full max-w-sm mx-auto">
      {/* Main Card Content */}
      <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 group-hover:shadow-xl">
        {/* Image Container - Responsive */}
        <Link href={`/pack/${pack.id}`}>
          <div className="relative w-full aspect-square p-4 cursor-pointer">
            <div className="relative w-full h-full">
              <Image
                src={pack.image}
                alt={pack.title}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
        </Link>

        {/* Content */}
        <div className="p-4">
          <Link href={`/pack/${pack.id}`}>
            <h2 className="text-base md:text-lg font-bold mb-3 text-center line-clamp-2 min-h-[3rem] cursor-pointer hover:text-blue-600 transition-colors">
              {pack.title}
            </h2>
          </Link>

          {/* Rest of the existing content remains the same */}
          {/* ... existing pack info, description, includes, price, and button ... */}

          {/* Update the button section */}
          <div className="flex gap-2">
            <Link
              href={`/pack/${pack.id}`}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-bold text-sm transition-colors flex items-center justify-center"
            >
              مشاهده جزئیات
            </Link>
            <button
              onClick={onBuyNow}
              disabled={!isAuthenticated || isLoading}
              className={`
                flex-1 px-4 py-3 rounded-lg font-bold text-sm transition-colors flex items-center justify-center
                ${
                  !isAuthenticated
                    ? 'bg-gray-500 text-white cursor-not-allowed'
                    : isLoading
                    ? 'bg-blue-400 text-white cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }
              `}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                  پردازش...
                </>
              ) : !isAuthenticated ? (
                'ورود'
              ) : (
                'خرید فوری'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
