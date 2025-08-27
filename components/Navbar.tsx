// components/Navbar.tsx

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/public/asset/Logo.svg";

// --- Animation Variants ---
const listVariants = {
  open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};
const listItemVariants = {
  open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
  closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } },
};
const underlineVariants = {
  open: { scaleX: 1 },
  closed: { scaleX: 0 },
};


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // This effect handles body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  // --- THIS IS THE NEW CODE TO FIX THE RESIZE BUG ---
  useEffect(() => {
    const handleResize = () => {
      // Tailwind's 'md' breakpoint is 768px
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    // Listen for window resize events
    window.addEventListener('resize', handleResize);
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // The empty dependency array means this effect runs only once

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Capabilities", href: "#capabilities" },
    { name: "Insights", href: "#insights" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed top-0 left-0 w-full z-50 bg-transparent px-6 lg:px-12 py-4 flex items-center justify-between"
      >
        <div className="flex items-center">
          <Link href="/">
            <Image src={Logo} alt="Inertia Logo" width={100} height={40} priority />
          </Link>
        </div>
        <div className="font-neue hidden md:flex items-center space-x-8 font-semibold uppercase text-sm tracking-wide">
          {navLinks.slice(0, 4).map((link) => (
            <a key={link.name} href={link.href} className="hover:opacity-70 transition">
              {link.name}
            </a>
          ))}
          <a href="#contact" className="flex items-center space-x-1 font-bold underline underline-offset-4 hover:opacity-70 transition">
            <span>↘</span>
            <span>Contact</span>
          </a>
        </div>
        <div className="md:hidden z-50">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <div className="w-6 h-6 flex flex-col justify-around items-center">
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="block h-0.5 w-full bg-black"
              ></motion.span>
              <motion.span
                animate={{ opacity: isOpen ? 0 : 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="block h-0.5 w-full bg-black"
              ></motion.span>
              <motion.span
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="block h-0.5 w-full bg-black"
              ></motion.span>
            </div>
          </button>
        </div>
      </motion.nav>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 w-full h-screen bg-[#F0F0F0] text-black p-6 pt-20 z-40 flex flex-col"
          >
            {/* <div className="flex justify-between items-center mb-16">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Image src={Logo} alt="Inertia Logo" width={100} height={40} />
              </Link>
            </div> */}
            <motion.ul
              variants={listVariants}
              initial="closed"
              animate="open"
              className="flex flex-col space-y-4"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.name}
                  variants={listItemVariants}
                  className="overflow-hidden"
                >
                  <a href={link.href} onClick={() => setIsOpen(false)} 
                     className="block font-neue text-4xl font-semibold uppercase pb-4">
                    {link.name}
                  </a>
                  <motion.div
                    className="h-px w-full bg-black origin-left"
                    variants={underlineVariants}
                    transition={{ duration: 0.6, ease: "easeIn" }}
                  />
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-auto text-sm font-neue">
              <p className="mb-2">+44(0) 2034 887 342</p>
              <p className="mb-4">→ hello@weareinertia.com</p>
              <p>17 WILLOW STREET,</p>
              <p>LONDON, EC2A 4BH</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;