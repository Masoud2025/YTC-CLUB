'use client';
// components/YouTubeClubIntro.tsx
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaPlay,
  FaPause,
  FaExpand,
  FaVolumeUp,
  FaVolumeMute,
} from 'react-icons/fa';

const YouTubeClubIntro: React.FC = () => {
  const [containerRef, containerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [videoRef, videoInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [textRef, textInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Video player state
  const videoElement = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Video player controls
  const togglePlay = () => {
    if (videoElement.current) {
      if (isPlaying) {
        videoElement.current.pause();
      } else {
        videoElement.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoElement.current) {
      videoElement.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullScreen = () => {
    if (videoElement.current) {
      if (videoElement.current.requestFullscreen) {
        videoElement.current.requestFullscreen();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoElement.current) {
      setCurrentTime(videoElement.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoElement.current) {
      setDuration(videoElement.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (videoElement.current) {
      videoElement.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <section ref={containerRef} className="py-20 px-6  font-[vazir]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={containerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Custom Video Player on the left */}
          <motion.div
            ref={videoRef}
            initial={{ opacity: 0, x: -100 }}
            animate={
              videoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }
            }
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="w-full md:w-1/2 order-2 md:order-1"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl bg-[#141843]"
            >
              {/* Video Element */}
              <video
                ref={videoElement}
                className="w-full h-full object-cover"
                poster="/images/youtube-club-thumbnail.jpg" // Replace with your thumbnail image
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={togglePlay}
              >
                <source src="/videos/youtube-club-intro.mp4" type="video/mp4" />{' '}
                {/* Replace with your actual video path */}
                Your browser does not support the video tag.
              </video>

              {/* Play/Pause Overlay Button */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    className="bg-[#0165FC] text-white w-16 h-16 rounded-full flex items-center justify-center"
                  >
                    <FaPlay className="text-2xl ml-1" />
                  </motion.button>
                </div>
              )}

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity">
                {/* Progress Bar */}
                <div className="flex items-center mb-2">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-gray-400 rounded-lg appearance-none cursor-pointer accent-[#0165FC]"
                  />
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-[#0165FC] transition-colors"
                    >
                      {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-[#0165FC] transition-colors"
                    >
                      {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>
                    <span className="text-white text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  <button
                    onClick={handleFullScreen}
                    className="text-white hover:text-[#0165FC] transition-colors"
                  >
                    <FaExpand />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text content on the right */}
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, x: 100 }}
            animate={textInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full md:w-1/2 order-1 md:order-2"
          >
            <h2 className="text-4xl font-bold mb-6 text-white text-center">
              معرفی کامل یوتیوب کلاب
            </h2>
            <p className="text-lg text-white mb-6 leading-relaxed text-right">
              داخل این ویدیو شما به طور کامل با سایت یوتیوب کلاب و قسمت های
              مختلف سایت و کاربرد های مختلف اون آشنا میشیم.
            </p>
            <div className="w-20 h-1 bg-[#0165FC] mb-8"></div>
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              خدمات ما
            </h3>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#141843' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              onClick={togglePlay}
              className="bg-[#0165FC] text-white font-medium py-3 px-8 rounded-lg hover:bg-[#141843] transition-colors mt-4 text-center"
            >
              مشاهده ویدیو
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default YouTubeClubIntro;
