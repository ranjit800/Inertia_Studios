// components/Footer.tsx
import React from "react";
import Image from "next/image";
import Logo from "@/public/asset/Logo.svg";
import arrow from "@/public/asset/arrow.svg";
import arrowsBorder from "@/public/asset/border.svg";

const Footer = () => {
  return (
    // Responsive background and text colors: black/white by default, switching on large screens
    <footer className="font-neue w-full bg-black text-white lg:bg-white lg:text-black px-6 lg:px-12 py-12">
      {/* Top Border with responsive color */}
      <div className="border-t border-white lg:border-black"></div>

      {/* Top Section */}
      <div className="flex justify-between items-start pt-10 md:flex-row flex-col md:gap-0 gap-10">
        {/* Left Side */}
        <div>
          <p className="uppercase text-xs tracking-[0.2em] mb-6">(CONTACT)</p>
          {/* Aligned Heading with responsive adjustments */}
          <h2 className="text-3xl sm:text-xl md:text-6xl lg:text-7xl font-medium tracking-tighter">
            READY TO DISCUSS
            <br />
            {/* On mobile, the span is a block. On desktop, it's inline with a margin for alignment */}
            <span className="block sm:inline sm:ml-[5.5ch]">YOUR NEXT PROJECT?</span>
          </h2>
        </div>

        {/* Right Side - Large Arrow Icon */}
        <div className=" relative w-24 h-24 flex-shrink-0">
          <Image
            src={arrowsBorder}
            alt="Arrow Border"
            layout="fill"
            className="object-contain invert lg:invert-0" // Invert color for dark bg
          />
          <Image
            src={arrow}
            alt="Arrow"
            width={50}
            height={50}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 invert lg:invert-0 rotate-45" // Invert color
          />
        </div>
      </div>

      {/* Divider with responsive color */}
      <hr className="border-white lg:border-black my-12" />

      {/* Middle Section - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 text-sm">
        {/* Column 1 */}
        <div>
          <a href="#contact" className="flex items-center gap-2 group">
            <div className="relative w-5 h-5 flex-shrink-0">
              <Image
                src={arrowsBorder}
                alt="Arrow Border"
                layout="fill"
                className="object-contain invert lg:invert-0" // Invert color
              />
              <Image
                src={arrow}
                alt="Arrow"
                width={10}
                height={10}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 invert lg:invert-0" // Invert color
              />
            </div>
            <span className="uppercase font-medium tracking-wider group-hover:underline">
              Work With Us
            </span>
          </a>
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-2">Hello</h4>
            <p className="leading-relaxed">hello@weareinertia.com</p>
            <p className="leading-relaxed">
              17 Willow Street, <br /> London, EC2A 4BH
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-2">Opening Hours</h4>
            <p className="leading-relaxed">
              Monday to Friday <br /> 9AM - 6PM
            </p>
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-2">
          <h4 className="font-bold uppercase tracking-wider mb-2">Social</h4>
          <a href="#" className="block hover:underline">Instagram</a>
          <a href="#" className="block hover:underline">LinkedIn</a>
          <a href="#" className="block hover:underline">Behance</a>
        </div>

        {/* Column 4 */}
        <div className="space-y-2">
          <h4 className="font-bold uppercase tracking-wider mb-2">Other</h4>
          <a href="#" className="block hover:underline">Supplier T&amp;C&apos;s</a>
          <a href="#" className="block hover:underline">Privacy Policy</a>
          <a href="#" className="block hover:underline">Careers</a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-24 text-xs text-gray-400 lg:text-gray-600">
        <div className="mb-4 md:mb-0">
          {/* Invert logo color on dark background */}
          <Image src={Logo} alt="Inertia Logo" width={100} height={25} className="invert lg:invert-0" />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-x-8 gap-y-2 text-center">
            <p>All content © Inertia Studios Ltd 2025</p>
            <p>Website by Okey Studio</p>
        </div>
        <div className="mt-4 md:mt-0">
          <a href="#top" className="flex items-center gap-2 group">
            <span className="uppercase font-medium tracking-wider group-hover:underline">
              Back to top
            </span>
            <span>↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
