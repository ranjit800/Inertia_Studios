// components/WhyPartner.tsx

import React from 'react';

const WhyPartner = () => {
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
            <span>↓</span>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2">
          <p className="text-base md:text-lg leading-relaxed mb-12">
            From CGI product films to viral 3D billboards, we are pioneering 3D Imagery & Motion Design that redefines visual storytelling. See how we help brands make a mark.
          </p>
          <a href="#" className="inline-flex items-center space-x-3 text-sm font-bold uppercase tracking-wider group text-black">
            {/* Custom Icon SVG */}
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 17V7H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Discover More Work</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyPartner;