/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Define plan types
interface Feature {
  title: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: {
    monthly: number;
  };
  features: Feature[];
  popular: boolean;
}

interface UserData {
  name?: string;
  phone?: string;
  email?: string;
  [key: string]: any;
}

export default function PricingPlans() {
  const [loading, setLoading] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  // Check user authentication on component mount
  useEffect(() => {
    checkUserAuthentication();
  }, []);

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
    // You can customize this path based on your login page route
    router.push('/login');
  };

  // Plans data - simplified to just 2 plans with monthly pricing only
  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'پایه',
      price: {
        monthly: 0,
      },
      features: [
        { title: 'جستجو در تمام آگهی‌ها', included: true },
        { title: 'مشاهده اطلاعات تماس', included: false },
      ],
      popular: false,
    },
    {
      id: 'plus',
      name: 'پلاس',
      price: {
        monthly: 149000,
      },
      features: [
        { title: 'جستجو در تمام آگهی‌ها', included: true },
        { title: 'مشاهده اطلاعات تماس', included: true },
      ],
      popular: true,
    },
  ];

  // Format price with Persian numerals
  const formatPrice = (price: number): string => {
    if (price === 0) return 'رایگان';

    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const formattedPrice = price
      .toString()
      .replace(/\d/g, digit => persianDigits[parseInt(digit)]);

    const withSeparators = formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${withSeparators} تومان`;
  };

  // Handle payment with authentication check
  const handlePayment = async (plan: Plan) => {
    // Check if user is authenticated
    if (!userData || !userData.name || !userData.phone) {
      // Show alert and redirect to login
      alert('برای خرید طرح ابتدا وارد حساب کاربری خود شوید');
      redirectToLogin();
      return;
    }

    if (plan.price.monthly === 0) {
      // Handle free plan
      alert(`طرح رایگان برای ${userData.name} با موفقیت فعال شد!`);
      return;
    }

    setLoading(plan.id);

    try {
      const response = await fetch('/api/zarinpal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: plan.price.monthly * 10, // Convert to Rial (Toman * 10)
          planId: plan.id,
          planName: plan.name,
          userData: userData, // Send user data with payment request
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
      setLoading(null);
    }
  };

  // Show loading spinner while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#282A2A] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">در حال بررسی احراز هویت...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#282A2A] text-gray-100 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            طرح‌های اشتراک
          </h1>

          {/* Show user info if authenticated */}
          {userData && userData.name && (
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 max-w-md mx-auto mb-6">
              <p className="text-blue-300 text-sm">
                خوش آمدید،{' '}
                <span className="font-bold text-white">{userData.name}</span>
              </p>
              {userData.phone && (
                <p className="text-blue-300/80 text-xs mt-1">
                  شماره تماس: {userData.phone}
                </p>
              )}
            </div>
          )}

          {/* Show warning if not authenticated */}
          {!userData && (
            <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4 max-w-md mx-auto mb-6">
              <p className="text-yellow-300 text-sm mb-2">
                برای خرید طرح ابتدا وارد حساب کاربری خود شوید
              </p>
              <button
                onClick={redirectToLogin}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                ورود به حساب کاربری
              </button>
            </div>
          )}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative rounded-2xl overflow-hidden backdrop-blur-sm ${
                plan.popular
                  ? 'border-2 border-blue-500 bg-[#353737]/90'
                  : 'border border-gray-700/50 bg-[#353737]/80'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center text-sm py-2 font-medium">
                  محبوب‌ترین
                </div>
              )}

              <div
                className={`p-8 h-full flex flex-col ${
                  plan.popular ? 'pt-16' : ''
                }`}
              >
                {/* Plan Header */}
                <div className="mb-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-white">
                      {formatPrice(plan.price.monthly)}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className={`ml-3 rounded-full p-1 ${
                          feature.included
                            ? 'bg-blue-600/20 text-blue-400'
                            : 'bg-gray-700/30 text-gray-500'
                        }`}
                      >
                        {feature.included ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className={
                          feature.included ? 'text-gray-300' : 'text-gray-500'
                        }
                      >
                        {feature.title}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handlePayment(plan)}
                  disabled={loading === plan.id}
                  className={`w-full py-3 rounded-lg font-bold transition-all hover:scale-[1.02] ${
                    !userData
                      ? 'bg-gray-600 hover:bg-gray-700 text-white'
                      : plan.price.monthly === 0
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading === plan.id ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                      در حال پردازش...
                    </div>
                  ) : !userData ? (
                    'ورود برای خرید'
                  ) : plan.price.monthly === 0 ? (
                    'فعال کردن طرح رایگان'
                  ) : (
                    'انتخاب طرح'
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
