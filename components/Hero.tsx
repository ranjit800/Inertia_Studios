"use client"
import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);
  const leftTextRef = useRef<HTMLHeadingElement | null>(null);
  const rightTextRef = useRef<HTMLHeadingElement | null>(null);
  const leftSmallRef = useRef<HTMLSpanElement | null>(null);
  const rightSmallRef = useRef<HTMLSpanElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Transform values for animations
  const videoScale = useTransform(scrollYProgress, [0, 0.7, 0.8, 1], [1, 3, 3, 3]);
  const leftTextX = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rightTextX = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const smallTextOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <>
      {/* Mobile & Tablet layout (<= lg): 100vh, centered video with equal spacing, small texts at bottom */}
      <div className="lg:hidden min-h-[90vh] flex flex-col items-center px-4 text-center">
        <div className="grid grid-rows-3 items-center justify-items-center w-full flex-1 gap-0.5">
          <h1 className="text-[14vw] font-neue" style={{ lineHeight: 1 }}>
            INERTIA
          </h1>
          <div className="w-full max-w-[700px]">
            <div className="w-full aspect-[16/9] overflow-hidden">
              <video
                src="/asset/video/heroVideo.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
          <h1 className="text-[14vw] font-neue" style={{ lineHeight: 1 }}>
            STUDIOS
          </h1>
        </div>
        <div className="pb-6 space-y-1 mt-6 text-sm font-neue font-medium tracking-wide">
          <div>A CREATIVE CGI STUDIO</div>
          <div>- SETTING BRANDS IN MOTION</div>
        </div>
      </div>

      {/* Desktop/tablet layout: original sticky + animated */}
      <div ref={sectionRef} className="hidden lg:block relative w-full" style={{ height: "180vh" }}>
        <div
          ref={stickyRef}
          className="sticky w-full flex items-center justify-center"
          style={{ top: "80px", height: "calc(100vh - 80px)" }}
        >
          {/* Top Left Big Text */}
          <motion.h1
            ref={leftTextRef}
            className="absolute top-0 left-36 text-[11vw] font-neue m-4"
            style={{ lineHeight: 1, x: leftTextX }}
          >
            INERTIA
          </motion.h1>
          {/* Bottom Right Big Text */}
          <motion.h1
            ref={rightTextRef}
            className="absolute bottom-0 right-36 text-[10vw]  font-neue m-4"
            style={{ lineHeight: 1, x: rightTextX }}
          >
            STUDIOS
          </motion.h1>
          {/* Left Center Small Text (Horizontal) */}
          <motion.span
            ref={leftSmallRef}
            className="absolute left-16 top-1/2 -translate-y-1/2 text-sm font-neue font-medium tracking-wide"
            style={{ opacity: smallTextOpacity }}
          >
            A CREATIVE CGI STUDIO
          </motion.span>
          {/* Right Center Small Text (Horizontal) */}
          <span
            ref={rightSmallRef}
            className="absolute right-16 top-1/2 -translate-y-1/2 text-sm font-neue font-medium tracking-wide text-right"
          >
            - SETTING BRANDS IN MOTION
          </span>

          {/* Video wrapper starts small and scales up on scroll */}
          <motion.div
            ref={videoWrapRef}
            className="relative overflow-hidden"
            style={{ 
              width: "68.9vh", 
              height: "40vh",
              transformOrigin: "center center",
              scale: videoScale
            }}
          >
            <video
              src="/asset/video/heroVideo.mp4"
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Hero;

  
