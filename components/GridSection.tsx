// components/GridStructure.tsx

"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useSpring, useScroll, useTransform } from 'framer-motion';

//arrow and arrowbox import here
import arrow from '../public/asset/arrow.svg';
import arrowsBorder from '../public/asset/border.svg';

// Helper component for hover-play video
const HoverVideo: React.FC<React.VideoHTMLAttributes<HTMLVideoElement>> = (props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <video
      ref={videoRef}
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // Remove autoPlay, only play on hover
      autoPlay={undefined}
      muted
      loop
      playsInline
      // Optionally, show poster or black frame when not hovered
      style={props.style}
      className={props.className}
    />
  );
};

const GridStructure = () => {
  // Link hover animation controls (match WeAreInertia)
  const arrowOutControls = useAnimation();
  const arrowInControls = useAnimation();
  const spaceControls = useAnimation();

  const handleMouseEnter = async () => {
    // Outgoing arrow: slide right, fade out
    arrowOutControls.start({
      x: '50%',
      opacity: 0,
      transition: { duration: 0.3, ease: 'linear' }
    });
    // Incoming arrow: from left to center, fade in
    arrowInControls.start({
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: 'linear' }
    });
    // Text spacing increases smoothly
    spaceControls.start({
      marginLeft: 32,
      transition: { duration: 0.3, ease: 'linear' }
    });
  };

  const handleMouseLeave = async () => {
    // Reset instantly to base state
    await arrowInControls.set({ x: '-50%', opacity: 0 });
    await arrowOutControls.set({ x: 0, opacity: 1 });
    await spaceControls.set({ marginLeft: 12 });
  };

  React.useEffect(() => {
    arrowInControls.set({ x: '-50%', opacity: 0 });
    arrowOutControls.set({ x: 0, opacity: 1 });
    spaceControls.set({ marginLeft: 12 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Mobile/Tablet scroll spring animation setup ---
  // We'll use a ref for the mobile section and useScroll/useTransform for scrollYProgress
  const mobileSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mobileSectionRef,
    offset: ["start end", "end start"]
  });
  // Map scroll progress [0, 1] to translateY [0, 40] px (downward)
  const ySpring = useSpring(useTransform(scrollYProgress, [0, 1], [0, 40]), {
    stiffness: 130,
    damping: 18,
    mass: 0.5
  });

  return (
    <>
      {/* Desktop View (>=1024px) */}
      <section className="w-full min-h-screen hidden lg:block">
        <div className="container mx-auto h-[200vh] grid grid-cols-3 grid-rows-12 text-black font-bold text-2xl">
          {/* ... (The first 4 divs of your grid are unchanged) ... */}
          <div className="col-span-2 row-span-4 flex items-center justify-center">
            <div className="h-full w-full flex items-center justify-center">
              <HoverVideo
                src="/asset/video/shoesVideo.mp4"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="row-span-8 col-start-3  flex items-center justify-center">
            <div className='flex flex-col w-full h-full'>
              <div className=' flex-1 flex items-center justify-center' style={{ flexBasis: "70%", height: "70%" }}>
                <HoverVideo
                  src="/asset/video/secondSecVideoTwo.mp4"
                  className="w-full h-full object-cover"
                />
              </div>
              <div id='textDiv1' className=' flex-1 p-4' style={{ flexBasis: "30%", height: "30%" }}>
                <h3 className="font-neue text-lg font-semibold uppercase">
                  JOHNNIE WALKER<sup className="text-xs ml-1">02</sup>
                </h3>
                <p className="text-sm uppercase tracking-wider opacity-70">
                  LEVELS OF LIASON
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-2 row-span-4 row-start-5 flex items-center justify-center">
            <div className='flex h-full w-full'>
              <div className='p-4' style={{ flexBasis: "40%", width: "40%" }}>
                <h3 className="font-neue text-lg font-semibold uppercase">
                  PUMA RUNNING<sup className="text-xs ml-1">01</sup>
                </h3>
                <p className="text-sm uppercase tracking-wider opacity-70">
                  FAST RB
                </p>
              </div>
              <div className=' flex items-center justify-center' style={{ flexBasis: "60%", width: "60%" }}>
                <HoverVideo
                  src="/asset/video/videoThree.mp4"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="col-span-2 row-span-4 col-start-2 row-start-9  flex items-center justify-center">
            <div className="flex w-full h-full">
              <div style={{ flexBasis: "30%", width: "30%" }} className="h-full p-4">
                <h3 className="font-neue text-lg font-semibold uppercase">
                  TIFFANY & CO<sup className="text-xs ml-1">03</sup>
                </h3>
                <p className="text-sm uppercase tracking-wider opacity-70">
                  WITH LOVE, SINCE 1837
                </p>
              </div>
              <div style={{ flexBasis: "70%", width: "70%" }} className="h-full flex items-center justify-center">
                <HoverVideo
                  src="/asset/video/videoShoes2.mp4"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="row-span-4 col-start-1 row-start-9   relative p-4">
            <a
              href="#"
              className="absolute bottom-4 left-4 inline-flex items-center group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                <Image 
                  src={arrowsBorder} 
                  alt="border" 
                  fill
                  style={{ objectFit: 'contain' }}
                  className="transition-transform duration-500"
                />
                {/* Outgoing arrow */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  animate={arrowOutControls}
                  initial={{ x: 0, opacity: 1 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <Image src={arrow} alt="arrow" width={15} height={15} style={{ display: 'block' }} />
                </motion.div>
                {/* Incoming arrow */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  animate={arrowInControls}
                  initial={{ x: '-50%', opacity: 0 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <Image src={arrow} alt="arrow" width={15} height={15} style={{ display: 'block' }} />
                </motion.div>
              </div>
              <motion.span
                className=" font-neue text-sm uppercase font-bold tracking-wider"
                animate={spaceControls}
                initial={{ marginLeft: 12 }}
                style={{ display: 'inline-block' }}
              >
                Explore More
              </motion.span>
            </a>
          </div>
        </div>
      </section>

      {/* Mobile & Tablet View (<1024px) */}
      <section
        className="w-full min-h-screen max-h-auto block lg:hidden"
        ref={mobileSectionRef}
      >
        <div className="container mx-auto py-8 flex flex-col gap-8">
          {/* Row 1: PUMA RUNNING */}
          <div className="flex flex-col w-full">
            <motion.div
              className="w-full aspect-[16/10] overflow-hidden mb-2"
              style={{ y: ySpring }}
            >
             <HoverVideo
                src="/asset/video/shoesVideo.mp4"
                className="w-full h-full object-cover"
              />

            </motion.div>
            <div className="p-2 bg-white z-20">
              <h3 className="font-neue text-base font-semibold uppercase">
                PUMA RUNNING<sup className="text-xs ml-1">01</sup>
              </h3>
              <p className="text-xs uppercase tracking-wider opacity-70">
                FAST RB
              </p>
            </div>
          </div>
          {/* Row 4: Extra Video (videoThree) */}
          <div className="flex flex-col w-full">
            <motion.div
              className="w-full aspect-[16/10] overflow-hidden mb-2"
              style={{ y: ySpring }}
            >
              <HoverVideo
                src="/asset/video/videoThree.mp4"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="p-2 bg-white z-20">
              <h3 className="font-neue text-base font-semibold uppercase">
                PUMA RUNNING<sup className="text-xs ml-1">01</sup>
              </h3>
              <p className="text-xs uppercase tracking-wider opacity-70">
                FAST RB
              </p>
            </div>
          </div>
          {/* Row 2: JOHNNIE WALKER */}
          <div className="flex flex-col w-full">
            <motion.div
              className="w-full aspect-[16/12] overflow-hidden mb-2"
              style={{ y: ySpring }}
            >
              <HoverVideo
                src="/asset/video/secondSecVideoTwo.mp4"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="p-2 bg-white z-20">
              <h3 className="font-neue text-base font-semibold uppercase">
                JOHNNIE WALKER<sup className="text-xs ml-1">02</sup>
              </h3>
              <p className="text-xs uppercase tracking-wider opacity-70">
                LEVELS OF LIASON
              </p>
            </div>
          </div>
          {/* Row 3: TIFFANY & CO */}
          <div className="flex flex-col w-full">
            <motion.div
              className="w-full aspect-[16/10] overflow-hidden mb-2"
              style={{ y: ySpring }}
            >
              <HoverVideo
                src="/asset/video/videoShoes2.mp4"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="p-2 bg-white z-20">
              <h3 className="font-neue text-base font-semibold uppercase">
                TIFFANY & CO<sup className="text-xs ml-1">03</sup>
              </h3>
              <p className="text-xs uppercase tracking-wider opacity-70">
                WITH LOVE, SINCE 1837
              </p>
            </div>
          </div>
          
          {/* Explore More Button */}
          <div className="flex justify-center mt-6">
            <a
              href="#"
              className="inline-flex items-center group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                <Image 
                  src={arrowsBorder} 
                  alt="border" 
                  fill
                  style={{ objectFit: 'contain' }}
                  className="transition-transform duration-500"
                />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  animate={arrowOutControls}
                  initial={{ x: 0, opacity: 1 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <Image src={arrow} alt="arrow" width={15} height={15} style={{ display: 'block' }} />
                </motion.div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  animate={arrowInControls}
                  initial={{ x: '-50%', opacity: 0 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <Image src={arrow} alt="arrow" width={15} height={15} style={{ display: 'block' }} />
                </motion.div>
              </div>
              <motion.span
                className=" font-neue text-sm uppercase font-bold tracking-wider"
                animate={spaceControls}
                initial={{ marginLeft: 12 }}
                style={{ display: 'inline-block' }}
              >
                Explore More
              </motion.span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default GridStructure;