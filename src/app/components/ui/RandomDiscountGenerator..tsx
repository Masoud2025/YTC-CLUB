/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGift, FiRotateCw, FiX, FiRefreshCw } from 'react-icons/fi';

interface WheelSegment {
  id: number;
  label: string;
  percentage: number;
  color: string;
  angle: number;
  textColor?: string;
}

const LuckyWheelModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<WheelSegment | null>(null);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [hasSpun, setHasSpun] = useState(false); // Track if user has already spun
  const wheelRef = useRef<HTMLDivElement>(null);

  // Check localStorage on component mount
  useEffect(() => {
    const spinStatus = localStorage.getItem('luckyWheelSpun');
    if (spinStatus === 'true') {
      setHasSpun(true);
    }
  }, []);

  // Define wheel segments with your specifications
  const segments: WheelSegment[] = [
    {
      id: 1,
      label: '5%',
      percentage: 5,
      color: '#FF6B6B',
      angle: 45,
      textColor: '#FFFFFF',
    },
    {
      id: 2,
      label: '15%',
      percentage: 15,
      color: '#4ECDC4',
      angle: 45,
      textColor: '#FFFFFF',
    },
    {
      id: 3,
      label: '2%',
      percentage: 2,
      color: '#45B7D1',
      angle: 45,
      textColor: '#FFFFFF',
    },
    {
      id: 4,
      label: '10%',
      percentage: 10,
      color: '#96CEB4',
      angle: 45,
      textColor: '#FFFFFF',
    },
    {
      id: 5,
      label: '25%',
      percentage: 25,
      color: '#FFEAA7',
      angle: 45,
      textColor: '#2D3436',
    },
    {
      id: 6,
      label: '15%',
      percentage: 15,
      color: '#DDA0DD',
      angle: 45,
      textColor: '#FFFFFF',
    },
    {
      id: 7,
      label: '30%',
      percentage: 30,
      color: '#FF7675',
      angle: 45,
      textColor: '#FFFFFF',
    },
    {
      id: 8,
      label: '10%',
      percentage: 10,
      color: '#74B9FF',
      angle: 45,
      textColor: '#FFFFFF',
    },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowWinnerModal(false);
  };

  const spinWheel = () => {
    if (hasSpun || isSpinning) return;

    setIsSpinning(true);
    setHasSpun(true);

    // Save to localStorage that user has spun
    localStorage.setItem('luckyWheelSpun', 'true');

    // Generate random spin (multiple full rotations + random angle)
    const spins = Math.floor(Math.random() * 5) + 5; // 5-10 full rotations
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + spins * 360 + randomAngle;

    setRotation(totalRotation);

    // Calculate winner after spin completes
    setTimeout(() => {
      const normalizedAngle = (360 - (totalRotation % 360)) % 360;
      const segmentAngle = 360 / segments.length;
      const winnerIndex = Math.floor(normalizedAngle / segmentAngle);
      const winnerSegment = segments[winnerIndex];

      setWinner(winnerSegment);
      setIsSpinning(false);
      setShowWinnerModal(true);

      // Save winner to localStorage
      localStorage.setItem('luckyWheelWinner', JSON.stringify(winnerSegment));
    }, 4000); // 4 seconds spin duration
  };

  const closeWinnerModal = () => {
    setShowWinnerModal(false);
  };

  const resetWheel = () => {
    // Clear localStorage and reset state
    localStorage.removeItem('luckyWheelSpun');
    localStorage.removeItem('luckyWheelWinner');
    setRotation(0);
    setWinner(null);
    setHasSpun(false);
    setIsSpinning(false);
    setShowWinnerModal(false);
  };

  // Load winner from localStorage if exists
  useEffect(() => {
    const savedWinner = localStorage.getItem('luckyWheelWinner');
    if (savedWinner) {
      setWinner(JSON.parse(savedWinner));
    }
  }, []);

  return (
    <>
      {/* Floating Button - Fixed position at right bottom */}
      <motion.button
        onClick={openModal}
        className={`fixed right-6 bottom-6 z-40 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group ${
          hasSpun
            ? 'bg-gradient-to-r from-gray-400 to-gray-600'
            : 'bg-gradient-to-r from-yellow-400 to-orange-500'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      >
        <div className="relative">
          {hasSpun ? (
            <FiGift className="text-2xl" />
          ) : (
            <>
              <FiGift className="text-2xl" />
              {/* Pulsing effect only if not spun */}
              <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-20"></div>
            </>
          )}
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 bottom-1/2 transform translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {hasSpun ? 'نتیجه چرخ شانس' : 'چرخ شانس'}
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
        </div>
      </motion.button>

      {/* Main Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50"
              onClick={closeModal}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 left-4 text-white/70 hover:text-white transition-colors z-10"
                >
                  <FiX className="text-2xl" />
                </button>

                {/* Content */}
                <div className="flex flex-col items-center justify-center">
                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-4xl font-bold text-white mb-6 text-center"
                    style={{ fontFamily: 'inherit' }}
                  >
                    🎰 چرخ شانس یوتیوب کلاب
                  </motion.h1>

                  {/* Status Message */}
                  {hasSpun && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg"
                    >
                      <p className="text-yellow-200 text-sm text-center">
                        {winner
                          ? `شما قبلاً چرخ را چرخانده‌اید و ${winner.label} تخفیف برنده شده‌اید!`
                          : 'شما قبلاً چرخ را چرخانده‌اید'}
                      </p>
                    </motion.div>
                  )}

                  {/* Wheel Container */}
                  <div className="relative mb-6">
                    {/* Pointer */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
                      <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-l-transparent border-r-transparent border-b-red-500 drop-shadow-lg"></div>
                    </div>

                    {/* Wheel */}
                    <motion.div
                      ref={wheelRef}
                      className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full border-6 border-yellow-400 shadow-2xl overflow-hidden bg-white ${
                        hasSpun ? 'opacity-75' : ''
                      }`}
                      animate={{ rotate: rotation }}
                      transition={{
                        duration: isSpinning ? 4 : 0,
                        ease: isSpinning ? [0.17, 0.67, 0.12, 0.99] : 'linear',
                      }}
                    >
                      {/* Wheel Segments */}
                      {segments.map((segment, index) => {
                        const angle = (360 / segments.length) * index;
                        const nextAngle = (360 / segments.length) * (index + 1);

                        // Calculate path for each segment
                        const startAngleRad = (angle * Math.PI) / 180;
                        const endAngleRad = (nextAngle * Math.PI) / 180;

                        const radius = 50; // 50% of the container
                        const x1 = 50 + radius * Math.cos(startAngleRad);
                        const y1 = 50 + radius * Math.sin(startAngleRad);
                        const x2 = 50 + radius * Math.cos(endAngleRad);
                        const y2 = 50 + radius * Math.sin(endAngleRad);

                        const largeArcFlag = nextAngle - angle > 180 ? 1 : 0;

                        const pathData = [
                          `M 50 50`, // Move to center
                          `L ${x1} ${y1}`, // Line to start of arc
                          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, // Arc
                          `Z`, // Close path
                        ].join(' ');

                        return (
                          <div key={segment.id} className="absolute inset-0">
                            <svg
                              className="w-full h-full"
                              viewBox="0 0 100 100"
                            >
                              <path
                                d={pathData}
                                fill={segment.color}
                                stroke="#fff"
                                strokeWidth="0.5"
                              />
                            </svg>

                            {/* Text positioned in the middle of each segment */}
                            <div
                              className="absolute inset-0 flex items-center justify-center pointer-events-none"
                              style={{
                                transform: `rotate(${
                                  angle + 360 / segments.length / 2
                                }deg)`,
                                transformOrigin: '50% 50%',
                              }}
                            >
                              <span
                                className="font-bold text-sm md:text-lg absolute"
                                style={{
                                  color: segment.textColor,
                                  transform: 'translateY(-60px) rotate(0deg)',
                                  textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                                  fontSize: 'clamp(12px, 2.5vw, 18px)',
                                }}
                              >
                                {segment.label}
                              </span>
                            </div>
                          </div>
                        );
                      })}

                      {/* Center Circle */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-yellow-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                        <FiGift className="text-lg md:text-2xl text-gray-800" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Spin Button */}
                  <motion.button
                    onClick={spinWheel}
                    disabled={hasSpun || isSpinning}
                    className={`mb-4 px-6 py-3 rounded-full font-bold text-base md:text-lg transition-all duration-300 flex items-center gap-2 ${
                      !hasSpun && !isSpinning
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                        : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    }`}
                    whileHover={!hasSpun && !isSpinning ? { scale: 1.05 } : {}}
                    whileTap={!hasSpun && !isSpinning ? { scale: 0.95 } : {}}
                  >
                    <FiRotateCw
                      className={`text-xl ${isSpinning ? 'animate-spin' : ''}`}
                    />
                    {isSpinning
                      ? 'در حال چرخش...'
                      : hasSpun
                      ? 'شما قبلاً چرخانده‌اید'
                      : 'چرخاندن چرخ'}
                  </motion.button>

                  {/* Reset Button (for testing/admin purposes) */}
                  <motion.button
                    onClick={resetWheel}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiRefreshCw className="text-sm" />
                    ریست کامل (تست)
                  </motion.button>

                  {/* Instructions */}
                  <div className="mt-4 text-center text-white/80 max-w-md">
                    {!hasSpun ? (
                      <>
                        <p className="text-xs md:text-sm">
                          روی دکمه "چرخاندن چرخ" کلیک کنید و شانس خود را امتحان
                          کنید!
                        </p>
                        <p className="text-xs mt-1 opacity-75">
                          ⚠️ توجه: فقط یک بار می‌توانید چرخ را بچرخانید
                        </p>
                      </>
                    ) : (
                      <p className="text-xs md:text-sm opacity-75">
                        شما قبلاً از این فرصت استفاده کرده‌اید
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Winner Modal */}
      <AnimatePresence>
        {showWinnerModal && winner && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-60"
              onClick={closeWinnerModal}
            />

            {/* Winner Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 md:p-8 shadow-2xl z-60 max-w-sm w-full mx-4"
            >
              {/* Close Button */}
              <button
                onClick={closeWinnerModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FiX className="text-xl" />
              </button>

              {/* Content */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl"
                  style={{ backgroundColor: winner.color }}
                >
                  🎉
                </motion.div>

                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                  تبریک! 🎊
                </h2>

                <p className="text-base text-gray-600 mb-4">شما برنده شدید:</p>

                <div
                  className="text-3xl md:text-4xl font-bold mb-4 p-3 rounded-xl"
                  style={{
                    backgroundColor: winner.color,
                    color: winner.textColor,
                  }}
                >
                  {winner.label} تخفیف
                </div>

                <p className="text-xs text-gray-500 mb-6">
                  از این تخفیف برای خرید محصولات استفاده کنید
                </p>

                <motion.button
                  onClick={closeWinnerModal}
                  className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-full font-bold hover:from-green-500 hover:to-blue-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  عالی! 👍
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LuckyWheelModal;
