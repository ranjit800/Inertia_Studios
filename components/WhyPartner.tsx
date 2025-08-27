"use client"
import React, { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import arrow from '../public/asset/arrow.svg'; 
import arrowsBorder from '../public/asset/border.svg';
import Image from 'next/image';

const WhyPartner = () => {
  // Animation controls for the two arrows
  const arrowOutControls = useAnimation();
  const arrowInControls = useAnimation();
  const spaceControls = useAnimation();

  // State for hover
  const [isHovered, setIsHovered] = React.useState(false);

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
    <section className="hidden md:block w-full bg-white text-black px-6 lg:px-12 py-20 md:py-32">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-16 items-start">
        
        {/* Left Column */}
        <div className="md:col-span-3">
          <h2 className="font-neue text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
            WHY LEADING BRANDS <br />
            PARTNER WITH INERTIA.
          </h2>
          <div className="text-4xl mt-16">
            <span>
              <Image src={arrow} alt="Arrow Down" width={40} height={40} className='flex rotate-90' />
            </span>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2">
          <p className="text-base md:text-lg leading-relaxed mb-12">
            From CGI product films to viral 3D billboards, we are pioneering 3D Imagery & Motion Design that redefines visual storytelling. See how we help brands make a mark.
          </p>
          <a
            href="#"
            className="inline-flex items-center group text-black"
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
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
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
              Discover More Work
            </motion.span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyPartner;