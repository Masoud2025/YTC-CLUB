/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DiscountProps {
  minDiscount?: number;
  maxDiscount?: number;
  onDiscountGenerated?: (discount: number) => void;
}

const RandomDiscountGenerator: React.FC<DiscountProps> = ({
  minDiscount = 5,
  maxDiscount = 50,
  onDiscountGenerated,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [discount, setDiscount] = useState<number | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [animationComplete, setAnimationComplete] = useState(false);

  // Define our 8 possible discount values
  const discountValues = [5, 10, 15, 20, 25, 30, 40, 50];

  // Generate a coupon code
  const generateCouponCode = (discountValue: number) => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return `TAKHFIF${discountValue}${result}`;
  };

  const generateRandomDiscount = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setDiscount(null);
    setAnimationComplete(false);

    // Choose a random discount from our predefined values
    const randomIndex = Math.floor(Math.random() * discountValues.length);
    const selectedDiscount = discountValues[randomIndex];

    // Set timeout for the final result
    setTimeout(() => {
      setDiscount(selectedDiscount);
      setIsSpinning(false);
      setAnimationComplete(true);

      // Generate and set coupon code
      const code = generateCouponCode(selectedDiscount);
      setCouponCode(code);

      if (onDiscountGenerated) {
        onDiscountGenerated(selectedDiscount);
      }
    }, 3000); // 3 seconds for the animation
  };

  const closeModal = () => {
    setIsOpen(false);
    setDiscount(null);
    setAnimationComplete(false);
  };

  return (
    <>
      {/* Simple CSS for the animation */}
      <style>
        {`
          @keyframes slideNumbers {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          
          .sliding-numbers {
            display: flex;
            animation: slideNumbers 3s linear;
          }
        `}
      </style>

      {/* Button in the bottom left corner */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-gradient-to-r from-purple-800 to-indigo-900 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 z-10 rtl:left-auto rtl:right-4"
        dir="rtl"
      >
        دریافت تخفیف 🎁
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-lg shadow-xl max-w-md w-full overflow-hidden border border-gray-700"
              onClick={e => e.stopPropagation()}
              dir="rtl"
            >
              {/* Modal header */}
              <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-4 text-white">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">تخفیف ویژه</h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal body */}
              <div className="p-6">
                <div className="text-center mb-8">
                  <p className="text-gray-300">
                    برای دریافت تخفیف تصادفی دکمه زیر را فشار دهید
                  </p>
                </div>

                {/* Number slider animation container */}
                <div className="relative h-24 mb-8 bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-inner">
                  {isSpinning ? (
                    <div className="absolute inset-0 flex items-center overflow-hidden">
                      <div className="sliding-numbers">
                        {/* Repeat the discount values multiple times to create a continuous animation */}
                        {[...Array(10)].map((_, repeatIndex) => (
                          <React.Fragment key={repeatIndex}>
                            {discountValues.map((value, i) => (
                              <div
                                key={`${repeatIndex}-${i}`}
                                className="flex-shrink-0 w-24 h-24 flex items-center justify-center text-4xl font-bold"
                                style={{
                                  color: `hsl(${(value * 5) % 360}, 80%, 60%)`,
                                  textShadow: '0 0 10px rgba(255,255,255,0.5)',
                                }}
                              >
                                {value}%
                              </div>
                            ))}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {discount !== null ? (
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                          className="text-5xl font-bold"
                          style={{
                            color: `hsl(${(discount * 5) % 360}, 80%, 60%)`,
                            textShadow: '0 0 15px rgba(255,255,255,0.7)',
                          }}
                        >
                          {discount}%
                        </motion.div>
                      ) : (
                        <span className="text-3xl font-bold text-gray-500">
                          ?
                        </span>
                      )}
                    </div>
                  )}

                  {/* Highlight overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-20"></div>

                    {/* Vertical lines to mark the selection area */}
                    <div className="absolute inset-y-0 left-1/2 transform -translate-x-12 w-px bg-purple-500 opacity-50"></div>
                    <div className="absolute inset-y-0 left-1/2 transform translate-x-12 w-px bg-purple-500 opacity-50"></div>
                  </div>
                </div>

                {/* Spin button */}
                <div className="text-center">
                  <button
                    onClick={generateRandomDiscount}
                    disabled={isSpinning}
                    className={`px-6 py-3 rounded-full font-bold text-white transition-all ${
                      isSpinning
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-600 hover:to-indigo-700 shadow-md hover:shadow-lg'
                    }`}
                  >
                    {isSpinning ? 'در حال انتخاب...' : 'دریافت تخفیف'}
                  </button>
                </div>

                {/* Result section */}
                <AnimatePresence>
                  {animationComplete && discount !== null && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-6 pt-4 border-t border-gray-700"
                    >
                      <div className="text-center">
                        <h4 className="text-xl font-bold text-gray-200 mb-2">
                          تبریک!
                        </h4>
                        <p className="text-gray-300 mb-4">
                          شما برنده{' '}
                          <span className="text-2xl font-bold text-purple-400">
                            {discount}%
                          </span>{' '}
                          تخفیف شدید
                        </p>

                        <div className="bg-gray-800 p-3 rounded-lg mb-4 border border-gray-700">
                          <p className="text-sm text-gray-400 mb-1">
                            کد تخفیف شما:
                          </p>
                          <p className="font-mono font-bold text-gray-200 select-all">
                            {couponCode}
                          </p>
                        </div>

                        <p className="text-sm text-gray-400">
                          این کد را در صفحه پرداخت وارد کنید
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RandomDiscountGenerator;
