// components/WeAreInertia.tsx
"use client"
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';

// Re-using the arrow icons we've used before
import arrow from '../public/asset/arrow.svg';
import arrowsBorder from '../public/asset/border.svg';
// images for Cursor Trailing Image Gallery Effect
import img1 from '../public/asset/weareInertiaImg/img1.avif';
import img2 from '../public/asset/weareInertiaImg/img2.avif';
import img3 from '../public/asset/weareInertiaImg/img3.avif';
import img4 from '../public/asset/weareInertiaImg/img4.avif';
import img5 from '../public/asset/weareInertiaImg/img5.avif';
import img6 from '../public/asset/weareInertiaImg/img6.avif';
import img7 from '../public/asset/weareInertiaImg/img7.avif';
import img8 from '../public/asset/weareInertiaImg/img8.avif';
import img9 from '../public/asset/weareInertiaImg/img9.avif';
import img10 from '../public/asset/weareInertiaImg/img10.avif';
import img11 from '../public/asset/weareInertiaImg/img11.avif';
import img12 from '../public/asset/weareInertiaImg/img12.avif';
import img13 from '../public/asset/weareInertiaImg/img13.avif';
import img14 from '../public/asset/weareInertiaImg/img14.avif';
import img15 from '../public/asset/weareInertiaImg/img15.avif';
import img16 from '../public/asset/weareInertiaImg/img16.avif';
import img17 from '../public/asset/weareInertiaImg/img17.avif';
import img18 from '../public/asset/weareInertiaImg/img18.avif';

const WeAreInertia = () => {
  // Animation controls for the two arrows
  const arrowOutControls = useAnimation();
  const arrowInControls = useAnimation();
  const spaceControls = useAnimation();

  // State for hover
  const [isHovered, setIsHovered] = React.useState(false);

  // Cursor trailing gallery setup
  const sectionRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const lastSpawnTsRef = useRef<number>(0);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const imageIndexRef = useRef<number>(0);
  const TRAIL_WIDTH = 350;
  const TRAIL_HEIGHT = 200;
  const MIN_SPAWN_INTERVAL_MS = 120; // reduce image count by throttling time
  const MIN_SPAWN_DISTANCE_PX = 60; // reduce image count by throttling distance
  const images = [
    img1, img2, img3, img4, img5, img6, img7, img8, img9,
    img10, img11, img12, img13, img14, img15, img16, img17, img18
  ];

  const spawnTrailImage = (x: number, y: number) => {
    if (!overlayRef.current) return;

    const current = images[imageIndexRef.current % images.length];
    imageIndexRef.current += 1;

    const node = document.createElement('img');
    // Use the resolved src from Next image import
    // @ts-expect-error - next/image import provides a src field at runtime
    node.src = current.src || current;
    node.alt = 'trail';
    node.decoding = 'async';
    node.loading = 'eager';
    node.style.position = 'absolute';
    node.style.left = '0px';
    node.style.top = '0px';
    node.style.willChange = 'transform, opacity, clip-path';
    node.style.pointerEvents = 'none';
    node.style.width = `${TRAIL_WIDTH}px`;
    node.style.height = `${TRAIL_HEIGHT}px`;
    node.style.filter = 'saturate(1) contrast(1.05)';
    node.style.transformOrigin = '50% 50%';
    node.style.opacity = '0';

    // Slight random rotation and offset
    const rotation = (Math.random() - 0.5) * 10; // -5deg..5deg
    const offsetX = (Math.random() - 0.5) * 30;
    const offsetY = (Math.random() - 0.5) * 30;

    overlayRef.current.appendChild(node);

    const translate = (tx: number, ty: number, s = 1, r = 0) =>
      `translate(${tx}px, ${ty}px) rotate(${r}deg) scale(${s})`;

    // Center node around cursor by offsetting half width after first frame
    // We animate in 2 phases: reveal then fade out with slight drift
    const revealKeyframes: Keyframe[] = [
      {
        transform: translate(x + offsetX, y + offsetY, 0.86, rotation),
        opacity: 0,
        clipPath: 'inset(50% 50% 50% 50% round 1px)'
      },
      {
        transform: translate(x + offsetX, y + offsetY, 1.0, rotation),
        opacity: 1,
        clipPath: 'inset(0% 0% 0% 0% round 1px)'
      }
    ];

    const fadeKeyframes: Keyframe[] = [
      {
        transform: translate(x + offsetX, y + offsetY, 1.0, rotation),
        opacity: 1
      },
      {
        transform: translate(x + offsetX + 8, y + offsetY + 8, 1.0, rotation),
        opacity: 0
      }
    ];

    const first = node.animate(revealKeyframes, {
      duration: 250,
      easing: 'ease-out',
      fill: 'forwards'
    });

    first.finished
      .then(() =>
        node.animate(fadeKeyframes, { duration: 600, easing: 'ease-in', fill: 'forwards' }).finished
      )
      .finally(() => {
        if (node && node.parentElement) {
          node.parentElement.removeChild(node);
        }
      });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const now = performance.now();
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - TRAIL_WIDTH / 2;
    const y = e.clientY - rect.top - TRAIL_HEIGHT / 2;

    // Distance-based throttle
    const last = lastPosRef.current;
    if (last) {
      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.hypot(dx, dy);
      if (dist < MIN_SPAWN_DISTANCE_PX) {
        return;
      }
    }

    // Time-based throttle
    if (now - lastSpawnTsRef.current < MIN_SPAWN_INTERVAL_MS) return;
    lastSpawnTsRef.current = now;
    lastPosRef.current = { x, y };
    spawnTrailImage(x, y);
  };

  // Mouse enter: animate arrowOut to right/fade out, arrowIn from left to center/fade in, add spacing
  const handleMouseEnter = async () => {
    setIsHovered(true);
    // Animate the outgoing arrow to the right and fade out
    arrowOutControls.start({
      x: '50%',
      opacity: 0,
      transition: { duration: 0.3, ease: 'linear' }
    });
    // Animate the incoming arrow from left to center and fade in
    arrowInControls.start({
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: 'linear' }
    });
    // Animate the space between arrow and text smoothly
    spaceControls.start({
      marginLeft: 32, // 2rem = 32px (tailwind's space-x-8)
      transition: { duration: 0.3, ease: 'linear' }
    });
  };

  // Mouse leave: instantly reset arrows and spacing
  const handleMouseLeave = async () => {
    setIsHovered(false);
    // Instantly move the incoming arrow to the left and hide it
    await arrowInControls.set({ x: '-50%', opacity: 0 });
    // Instantly reset the outgoing arrow to center and visible
    await arrowOutControls.set({ x: 0, opacity: 1 });
    // Instantly reset the space
    await spaceControls.set({ marginLeft: 12 }); // 0.75rem = 12px (tailwind's space-x-3)
  };

  // On mount, set the incoming arrow to hidden/left and spacing to default
  React.useEffect(() => {
    arrowInControls.set({ x: '-50%', opacity: 0 });
    arrowOutControls.set({ x: 0, opacity: 1 });
    spaceControls.set({ marginLeft: 12 });
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-[80vh] w-full flex items-center justify-center md:h-[120vh] bg-white text-black p-8 md:p-12 overflow-hidden md:border-none border-t-[0.5px] border-black "
    >
      {/* Cursor trail overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden
      />
      
     

      {/* Left Vertical Text */}
      <p className="absolute left-10 top-1/2 -translate-y-1/2  origin-center text-xs md:text-sm uppercase tracking-widest  hidden md:block font-neue">
         <span className='font-semibold'>CULTURE IN</span> MOTION
      </p>

      {/* Main Centered Heading */}
      <div className="text-center flex flex-col justify-center items-center gap-6">
        <div className=" text-center text-xs md:text-sm uppercase tracking-wider font-semibold">
          ( WE ARE INERTIA )
        </div>
        <h1 className="font-neue text-[8vw] md:text-[7vw] lg:text-[7.5vw]  leading-[1.1em] tracking-tight">
          HELPING BRANDS <br />
          MOVE THE WORLD <br />
          FORWARD
        </h1>
        <div className='font-neue text-sm  block md:hidden'>
        <span className='font-semibold'>CULTURE IN</span> MOTION
        <br />
        <span className='font-semibold'>IMPACT</span> BY DESIGN
        </div>
      </div>

      {/* Right Vertical Text */}
      <p className="absolute right-10 top-1/2  -translate-y-1/2 origin-center text-xs md:text-sm uppercase tracking-widest font-neue hidden md:block">
        <span className='font-semibold'>IMPACT</span> BY DESIGN
      </p>

      {/* Bottom Center Link */}
      <a
        href="#"
        className="absolute bottom-24 inline-flex items-center group z-20"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          <Image 
            src={arrowsBorder} 
            alt="border" 
            fill
            style={{ objectFit: 'contain' }}
            className="transition-transform duration-500"
          />
          {/* Outgoing arrow (center to right, fade out) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={arrowOutControls}
            initial={{ x: 0, opacity: 1 }}
            style={{ width: '100%', height: '100%' }}
          >
            <Image 
              src={arrow} 
              alt="arrow" 
              width={15}
              height={15}
              style={{ display: 'block' }}
            />
          </motion.div>
          {/* Incoming arrow (from left to center, fade in) */}
          <motion.div
            className="absolute inset-0 flex  items-center justify-center pointer-events-none"
            animate={arrowInControls}
            initial={{ x: '-50%', opacity: 0 }}
            style={{ width: '100%', height: '100%' }}
          >
            <Image 
              src={arrow} 
              alt="arrow" 
              width={15}
              height={15}
              style={{ display: 'block' }}
            />
          </motion.div>
        </div>
        <motion.span
          className="font-neue text-sm uppercase font-bold tracking-wider"
          animate={spaceControls}
          initial={{ marginLeft: 12 }}
          style={{ display: 'inline-block' }}
        >
          <span className="block md:hidden">MAKEIT REAL</span>
          <span className="hidden md:block">LET&apos;S MAKE SOMETHING UNFORGETTABLE</span>
        </motion.span>
      </a>
    </section>
  );
};

export default WeAreInertia;