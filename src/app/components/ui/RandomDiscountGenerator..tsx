/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGift, FiRotateCw, FiX, FiRefreshCw, FiZap } from 'react-icons/fi';

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
  const [hasSpun, setHasSpun] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spinStatus = localStorage.getItem('luckyWheelSpun');
    if (spinStatus === 'true') {
      setHasSpun(true);
    }
  }, []);

  const segments: WheelSegment[] = [
    {
      id: 1,
      label: '5%',
      percentage: 5,
      color: '#FF6B35',
      angle: 45,
      textColor: '#FFFFFF',
    },
    {
      id: 2,
      label: '10%',
      percentage: 10,
      color: '#FFD23F',
      angle: 45,
      textColor: '#2D3436',
    },
    {
      id: 3,
      label: '15%',
      percentage: 15,
      color: '#EE6C4D',
      angle: 45,
      textColor: '#FFFFFF',
    },
    {
      id: 4,
      label: '20%',
      percentage: 20,
      color: '#9B59B6',
      angle: 45,
      textColor: '#FFFFFF',
    },
    {
      id: 5,
      label: '25%',
      percentage: 25,
      color: '#FF5733',
      angle: 45,
      textColor: '#FFFFFF',
    },
    {
      id: 6,
      label: '30%',
      percentage: 30,
      color: '#FFC300',
      angle: 45,
      textColor: '#2D3436',
    },
    {
      id: 7,
      label: '35%',
      percentage: 35,
      color: '#DAF7A6',
      angle: 45,
      textColor: '#2D3436',
    },
    {
      id: 8,
      label: '40%',
      percentage: 40,
      color: '#C70039',
      angle: 45,
      textColor: '#FFFFFF',
    },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setShowWinnerModal(false);
  };

  const spinWheel = () => {
    if (hasSpun || isSpinning) return;

    setIsSpinning(true);
    setHasSpun(true);
    localStorage.setItem('luckyWheelSpun', 'true');

    const spins = Math.floor(Math.random() * 5) + 5;
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + spins * 360 + randomAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      const normalizedAngle = (360 - (totalRotation % 360)) % 360;
      const segmentAngle = 360 / segments.length;
      const winnerIndex = Math.floor(normalizedAngle / segmentAngle);
      const winnerSegment = segments[winnerIndex];

      setWinner(winnerSegment);
      setIsSpinning(false);
      setShowWinnerModal(true);
      localStorage.setItem('luckyWheelWinner', JSON.stringify(winnerSegment));

      // Add the discount to local storage
      const userDataString = localStorage.getItem('USER_DATA'); // Retrieve from local storage
      const userData = userDataString ? JSON.parse(userDataString) : {}; // Check for null

      userData.discount = winnerSegment.percentage; // Store the discount percentage
      localStorage.setItem('USER_DATA', JSON.stringify(userData));

      // Remove the discount after 1 hour (3600000 milliseconds)
      setTimeout(() => {
        const updatedUserDataString = localStorage.getItem('USER_DATA'); // Retrieve from local storage
        const updatedUserData = updatedUserDataString
          ? JSON.parse(updatedUserDataString)
          : {}; // Check for null
        delete updatedUserData.discount; // Remove the discount
        localStorage.setItem('USER_DATA', JSON.stringify(updatedUserData));
      }, 3600000); // 1 hour
    }, 4000);
  };

  const closeWinnerModal = () => setShowWinnerModal(false);

  const resetWheel = () => {
    localStorage.removeItem('luckyWheelSpun');
    localStorage.removeItem('luckyWheelWinner');
    setRotation(0);
    setWinner(null);
    setHasSpun(false);
    setIsSpinning(false);
    setShowWinnerModal(false);
  };

  useEffect(() => {
    const savedWinner = localStorage.getItem('luckyWheelWinner');
    if (savedWinner) {
      setWinner(JSON.parse(savedWinner));
    }
  }, []);

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={openModal}
        className={`fixed right-4 bottom-4 z-40 text-white p-4 rounded-2xl shadow-2xl transition-all duration-300 ${
          hasSpun
            ? 'bg-gradient-to-br from-gray-600 to-gray-800'
            : 'bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
        }`}
        whileHover={{ scale: 1.1, rotate: 3 }}
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
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <FiZap className="text-2xl" />
              </motion.div>
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl blur opacity-30 animate-pulse"></div>
            </>
          )}
        </div>
      </motion.button>

      {/* Main Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-md z-50"
              onClick={closeModal}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 md:p-10 max-w-lg w-full shadow-2xl border border-gray-200">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 ">
                  <div></div>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>

                {/* Status Alert */}
                {hasSpun && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-orange-400 rounded-lg"
                  >
                    <div className="flex items-center">
                      <FiGift className="text-orange-500 mr-3" />
                      <p className="text-orange-800 text-sm font-medium">
                        {winner
                          ? `تبریک! شما ${winner.label} تخفیف برنده شدید 🎉
                          کد تخفیف به طور خودکار رو خرید شما اعمال میشود ، توجه در 24 ساعت آینده کد غیر فعال میشود`
                          : 'شما قبلاً در این قرعه‌کشی شرکت کرده‌اید'}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Wheel Section */}
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    {/* Wheel */}
                    <motion.div
                      ref={wheelRef}
                      className="relative w-72 h-72 rounded-full border-8 border-gray-300 shadow-xl overflow-hidden bg-white"
                      animate={{ rotate: rotation }}
                      transition={{
                        duration: isSpinning ? 4 : 0,
                        ease: isSpinning ? [0.17, 0.67, 0.12, 0.99] : 'linear',
                      }}
                      style={{
                        filter: hasSpun ? 'grayscale(0.3)' : 'none',
                      }}
                    >
                      {/* Segments */}
                      {segments.map((segment, index) => {
                        const angle = (360 / segments.length) * index;
                        const nextAngle = (360 / segments.length) * (index + 1);
                        const startAngleRad = (angle * Math.PI) / 180;
                        const endAngleRad = (nextAngle * Math.PI) / 180;
                        const radius = 50;
                        const x1 = 50 + radius * Math.cos(startAngleRad);
                        const y1 = 50 + radius * Math.sin(startAngleRad);
                        const x2 = 50 + radius * Math.cos(endAngleRad);
                        const y2 = 50 + radius * Math.sin(endAngleRad);
                        const largeArcFlag = nextAngle - angle > 180 ? 1 : 0;

                        const pathData = [
                          `M 50 50`,
                          `L ${x1} ${y1}`,
                          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                          `Z`,
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
                                stroke="#ffffff"
                                strokeWidth="0.3"
                              />
                            </svg>
                            <div
                              className="absolute inset-0 flex items-center justify-center pointer-events-none"
                              style={{
                                transform: `rotate(${
                                  angle + 360 / segments.length / 2
                                }deg)`,
                                transformOrigin: '50% 50%',
                                zIndex: 10,
                              }}
                            >
                              <span
                                className="font-bold text-xl absolute"
                                style={{
                                  color: segment.textColor,
                                  transform: 'translateY(-55px) rotate(0deg)',
                                  textAlign: 'right', // Align text to the right
                                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                                }}
                              >
                                {segment.label}
                              </span>
                            </div>
                          </div>
                        );
                      })}

                      {/* Center Hub */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                        <motion.div
                          animate={isSpinning ? { rotate: 360 } : {}}
                          transition={{
                            duration: 1,
                            repeat: isSpinning ? Infinity : 0,
                            ease: 'linear',
                          }}
                        >
                          <FiZap className="text-2xl text-white" />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Winner Indicator */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      برنده
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <motion.button
                    onClick={spinWheel}
                    disabled={hasSpun || isSpinning}
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                      !hasSpun && !isSpinning
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    whileHover={!hasSpun && !isSpinning ? { scale: 1.02 } : {}}
                    whileTap={!hasSpun && !isSpinning ? { scale: 0.98 } : {}}
                  >
                    <motion.div
                      animate={isSpinning ? { rotate: 360 } : {}}
                      transition={{
                        duration: 1,
                        repeat: isSpinning ? Infinity : 0,
                        ease: 'linear',
                      }}
                    >
                      <FiRotateCw className="text-xl" />
                    </motion.div>
                    {isSpinning
                      ? 'در حال چرخش...'
                      : hasSpun
                      ? 'شما قبلاً شرکت کرده‌اید'
                      : 'شروع بازی'}
                  </motion.button>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60"
              onClick={closeWinnerModal}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.3, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.3, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-8 shadow-2xl z-60 max-w-sm w-full mx-4 border-4 border-yellow-400"
            >
              <button
                onClick={closeWinnerModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX className="text-xl" />
              </button>

              <div className="text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl shadow-xl"
                  style={{ backgroundColor: winner.color }}
                >
                  🎊
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-gray-800 mb-3"
                >
                  تبریک! 🎉
                </motion.h2>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.4,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  className="text-5xl font-bold mb-4 p-4 rounded-2xl text-white shadow-lg"
                  style={{ backgroundColor: winner.color }}
                >
                  {winner.label}
                </motion.div>

                <p className="text-gray-600 mb-2">تخفیف ویژه برای شما!</p>
                <p className="text-xs text-gray-500 mb-8 bg-gray-50 p-3 rounded-lg">
                  🎁 این کد تخفیف را در خرید بعدی خود استفاده کنید
                </p>

                <motion.button
                  onClick={closeWinnerModal}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-2xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  فوق‌العاده! 🚀
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
