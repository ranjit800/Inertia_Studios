"use client"; // This component needs to be client-side due to useState and useRef

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VideoSection = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    setIsVideoModalOpen(true);
    // Play video when modal opens
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleCloseModal = () => {
    // Pause video when modal closes
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset video to start
    }
    setIsVideoModalOpen(false);
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      
      {/* Background Video (Silent and Looping) */}
      <video
        src="/asset/video/videoForSection.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover z-10"
        autoPlay
        loop
        muted // This video remains muted
        playsInline
      />

      {/* Dark Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/50 z-20"></div> {/* Slightly darker overlay */}

      {/* Play Showreel Button */}
      <div className="relative z-30 w-full h-full flex items-end justify-start p-8 md:p-12">
        <button
          onClick={handlePlayClick}
          className="flex items-center space-x-3 text-white uppercase text-xl md:text-sm  font-neue tracking-wider hover:text-gray-300 transition-colors duration-200 focus:outline-none"
        >
          {/* Custom Play Icon (SVG) */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5V19L19 12L8 5Z"/>
          </svg>
          <span>PLAY SHOWREEL</span>
        </button>
      </div>

      {/* Full-screen Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4 md:p-8"
            onClick={handleCloseModal} // Click anywhere on the modal to close
          >
            {/* The actual video player for the modal */}
            <video
              ref={videoRef}
              src="/asset/video/videoForSection.mp4"
              className="max-w-full max-h-full object-contain" // object-contain to fit within modal
              controls // Show video controls (play, pause, volume, fullscreen toggle)
              autoPlay // Auto-play when opened
              playsInline
              // Muted is removed here so sound plays
              onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking video controls
            />
            
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white text-3xl md:text-4xl leading-none z-50 hover:text-gray-300 transition-colors duration-200 focus:outline-none"
              aria-label="Close video"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default VideoSection;