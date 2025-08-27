"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion'
import Image from 'next/image'
import imgageOne from '../public/asset/IdeasSectionImgs/img1.avif'
import imgageTwo from '../public/asset/IdeasSectionImgs/img2.avif'
import imageThree from '../public/asset/IdeasSectionImgs/img3.avif' // extra image
import arrow from '../public/asset/arrow.svg'
import arrowsBorder from '../public/asset/border.svg'

const newsItems = [
  {
    tag: '( AWARDS )',
    text: 'Toblerone (Platinum Award) - A New Dimension of Storytelling',
    image: imgageOne,
    date: '7 Apr 25.',
  },
  {
    tag: '( AWARDS )',
    text: 'Our Marin Bikes Product Film wins x2 Gold at the MUSE Awards',
    image: imageThree,
    date: '12 Mar 25.',
  },
  {
    tag: '( NEWS )',
    text: 'Gemma Garman Steps Up as Executive Producer at Inertia Studios',
    image: imgageTwo,
    date: '28 Feb 25.',
  },
]

const IdeasSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0) // default imageOne initially

  const imageRefs = useRef<Array<HTMLDivElement | null>>([])
  const isAnimatingRef = useRef<boolean>(false)
  const pendingTargetRef = useRef<number | null>(null)
  const tagRef = useRef<HTMLParagraphElement | null>(null)
  const dateRef = useRef<HTMLSpanElement | null>(null)
  const [displayedIndex, setDisplayedIndex] = useState<number>(0)


  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const spacingValue = useTransform(scrollYProgress, [0, 0.5, 1], ["0.5rem", "5rem", "0.5rem"]);
  const spacing = useSpring(spacingValue, {
    stiffness: 400,
    damping: 90,
  });

  // CTA link animation controls (borrowed from WeAreInertia)
  const arrowOutControls = useAnimation()
  const arrowInControls = useAnimation()
  const spaceControls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)

  const handleCtaMouseEnter = async () => {
    setIsHovered(true)
    arrowOutControls.start({ x: '50%', opacity: 0, transition: { duration: 0.3, ease: 'linear' } })
    arrowInControls.start({ x: 0, opacity: 1, transition: { duration: 0.3, ease: 'linear' } })
    spaceControls.start({ marginLeft: 32, transition: { duration: 0.3, ease: 'linear' } })
  }

  const handleCtaMouseLeave = async () => {
    setIsHovered(false)
    await arrowInControls.set({ x: '-50%', opacity: 0 })
    await arrowOutControls.set({ x: 0, opacity: 1 })
    await spaceControls.set({ marginLeft: 12 })
  }

  useEffect(() => {
    arrowInControls.set({ x: '-50%', opacity: 0 })
    arrowOutControls.set({ x: 0, opacity: 1 })
    spaceControls.set({ marginLeft: 12 })
  }, [])


  // Ensure default positioning on mount: active at 0%, others below
  useEffect(() => {
    imageRefs.current.forEach((el, i) => {
      if (!el) return
      el.style.position = 'absolute'
      el.style.inset = '0'
      el.style.willChange = 'transform, opacity'
      el.style.transition = 'none'
      if (i === 0) {
        el.style.transform = 'translateY(0%)'
        el.style.opacity = '1'
        el.style.zIndex = '10'
      } else {
        el.style.transform = 'translateY(100%)'
        el.style.opacity = '0'
        el.style.zIndex = '0'
      }
    })
  }, [])

  const smoothSwap = async (from: number, to: number) => {
    if (from === to) return
    if (isAnimatingRef.current) {
      pendingTargetRef.current = to
      return
    }
    const currentEl = imageRefs.current[from]
    const nextEl = imageRefs.current[to]
    if (!currentEl || !nextEl) return
    isAnimatingRef.current = true
    const direction: 'up' | 'down' = to < from ? 'up' : 'down'

    // Normal roll (translateY) for tag and date (text swap)
    const swapText = (
      el: HTMLElement | null,
      newText: string,
      dir: 'up' | 'down'
    ) => {
      if (!el) return Promise.resolve()
      el.style.willChange = 'transform, opacity'
      const out = el.animate(
        {
          transform: [
            'translateY(0px)',
            dir === 'down' ? 'translateY(-10px)' : 'translateY(10px)'
          ],
          opacity: [1, 0.2],
        },
        { duration: 250, easing: 'cubic-bezier(0.77,0,0.175,1)' }
      )
      return out.finished.then(() => {
        el.textContent = newText
        el.animate(
          {
            transform: [dir === 'down' ? 'translateY(10px)' : 'translateY(-10px)', 'translateY(0px)'],
            opacity: [0.2, 1],
          },
          { duration: 250, easing: 'cubic-bezier(0.77,0,0.175,1)' }
        )
      })
    }
    // Trigger text swaps in parallel (tag + date)
    void swapText(tagRef.current, newsItems[to].tag, direction)
    void swapText(dateRef.current, newsItems[to].date, direction)

    // Prepare next element offscreen with slight scale for a card-shuffle feel
    nextEl.style.transition = 'none'
    nextEl.style.opacity = '1'
    nextEl.style.zIndex = '20'
    nextEl.style.transform = (direction === 'down' ? 'translateY(100%)' : 'translateY(-100%)') + ' scale(1.02)'

    const easing = 'cubic-bezier(0.77,0,0.175,1)'
    const duration = 0.6

    const nextAnim = nextEl.animate(
      { transform: [nextEl.style.transform, 'translateY(0%) scale(1)'] },
      { duration: duration * 1000, easing }
    )
    const currAnim = currentEl.animate(
      {
        transform: [
          'translateY(0%) scale(1)',
          (direction === 'down' ? 'translateY(-100%)' : 'translateY(100%)') + ' scale(0.985)',
        ],
        opacity: [1, 0],
      },
      { duration: duration * 1000, easing }
    )

    try {
      await Promise.all([nextAnim.finished, currAnim.finished])
    } finally {
      // finalize state
      currentEl.style.zIndex = '0'
      nextEl.style.zIndex = '10'
      currentEl.style.transform = direction === 'down' ? 'translateY(-100%)' : 'translateY(100%)'
      currentEl.style.opacity = '0'
      nextEl.style.transform = 'translateY(0%)'
      nextEl.style.opacity = '1'
      setActiveIndex(to)
      setDisplayedIndex(to)
      isAnimatingRef.current = false
      const pending = pendingTargetRef.current
      pendingTargetRef.current = null
      if (pending !== null && pending !== to) {
        // chain the pending request
        smoothSwap(to, pending)
      }
    }
  }

  // Handle hover and set animation direction
  const handleNewsHover = (idx: number) => {
    if (idx === activeIndex) return
    setHoveredIndex(idx)
    smoothSwap(activeIndex, idx)
  }

  // On mouse leave, stop hover; active remains last selected
  const handleNewsLeave = () => {
    setHoveredIndex(null)
    if (activeIndex !== 0) {
      smoothSwap(activeIndex, 0)
    }
  }

  return (
    <section ref={sectionRef} className="w-full bg-white text-black px-6 md:px-2 lg:px-10 py-16">
      {/* Top Heading */}
{/* --- CORRECTED HEADING --- */}
<motion.p className='font-neue text-xl text-center md:text-left md:text-4xl lg:text-5xl tracking-tight'>
        <span>( IDEAS</span>
        <motion.span className="text-one" style={{ marginLeft: spacing }}>
           IN MOTION)
        </motion.span>
      </motion.p>
      {/* --- END CORRECTED HEADING --- */}
      {/* Subheading */}
      <h2 className="mt-4 text-base md:text-3xl font-neue  text-black max-w-xl text-left">
        Explore our latest research, <br /> creative experiments, and studio news.
      </h2>

      {/* Flex Layout (replacing grid) */}
      <div className="mt-12 flex flex-col lg:flex-row md:gap-20 gap-10 ">
        {/* Left Side (Image + Date + absolute bottom-left box) */}
        <div className="relative min-w-0 w-full lg:w-[60%]">
          <p ref={tagRef} className="text-xs uppercase font-medium mb-2">{newsItems[displayedIndex].tag}</p>
          <div className="relative w-full  md:h-[80vh] h-[30vh] overflow-hidden">
            {/* Animated image transition - Motion One */}
            <div className="w-full h-full relative">
              {newsItems.map((item, idx) => (
                <div
                  key={idx}
                  ref={(el) => { imageRefs.current[idx] = el }}
                  className="will-change-transform"
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <Image
                    src={item.image}
                    alt="Ideas Featured"
                    fill
                    className="object-cover"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
            {/* bottom-left absolute box */}
            <div className="absolute bottom-0 md:left-0 right-0 p-2 bg-white  shadow-md md:w-[8vw] w-[15vw] md:h-[8vw] h-[15vw] flex items-center justify-center z-30">
              <div className="relative md:w-[4vw] w-[8vw] md:h-[4vw] h-[8vw]">
                <Image src={arrowsBorder} alt="border" fill className="object-contain"/>
                <Image src={arrow} alt="arrow" width={30} height={30} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45"/>
              </div>
            </div>
          </div>
          <span ref={dateRef} className="absolute top-0 right-0 text-xs md:text-sm uppercase">
            {newsItems[displayedIndex].date}
          </span>
        </div>
{/* for mobile view */}
              <div className='md:hidden font-semibold font-neue'>
                <div className=" font-neue text-xl font-semibold">
                  <p className="leading-snug">{newsItems[0].text}</p>
                </div>
                <div className="mt-10 inline-flex items-center group cursor-pointer select-none"
            onMouseEnter={handleCtaMouseEnter}
            onMouseLeave={handleCtaMouseLeave}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Image src={arrowsBorder} alt="border" fill className="object-contain"/>
              {/* Outgoing arrow */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={arrowOutControls}
                initial={{ x: 0, opacity: 1 }}
                style={{ width: '100%', height: '100%' }}
              >
                <Image src={arrow} alt="arrow" width={12} height={12} style={{ display: 'block' }}/>
              </motion.div>
              {/* Incoming arrow */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={arrowInControls}
                initial={{ x: '-50%', opacity: 0 }}
                style={{ width: '100%', height: '100%' }}
              >
                <Image src={arrow} alt="arrow" width={12} height={12} style={{ display: 'block' }}/>
              </motion.div>
            </div>
            <motion.span
              className="text-xs md:text-sm uppercase font-bold tracking-wider"
              animate={spaceControls}
              initial={{ marginLeft: 12 }}
              style={{ display: 'inline-block' }}
            >
              See All Insights
            </motion.span>
          </div>
              </div>

        {/* Right Side (News List + Bottom Link) */}
        <div className="hidden md:flex flex-col gap-12 pt-5 text-sm md:text-base min-w-0 w-full lg:w-[40%] px-16" onMouseLeave={handleNewsLeave}>
          {newsItems.map((item, idx) => (
            <div
              key={idx}
              className="group cursor-pointer"
              onMouseEnter={() => handleNewsHover(idx)}
            >
              <p className="uppercase text-xs mb-1">{item.tag}</p>
              <p className="leading-snug">{item.text}</p>
              <div
                className="h-[0.5px] bg-gray-900 mt-7 transition-all duration-300 ease-in-out"
                style={{
                  width: (hoveredIndex === null && idx === 0) || hoveredIndex === idx ? '100%' : '0%',
                  transitionProperty: 'width',
                }}
              />
            </div>
          ))}
          {/* Bottom Link with animated arrows and spacing */}
          <div
            className="mt-28 inline-flex items-center group cursor-pointer select-none"
            onMouseEnter={handleCtaMouseEnter}
            onMouseLeave={handleCtaMouseLeave}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Image src={arrowsBorder} alt="border" fill className="object-contain"/>
              {/* Outgoing arrow */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={arrowOutControls}
                initial={{ x: 0, opacity: 1 }}
                style={{ width: '100%', height: '100%' }}
              >
                <Image src={arrow} alt="arrow" width={12} height={12} style={{ display: 'block' }}/>
              </motion.div>
              {/* Incoming arrow */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={arrowInControls}
                initial={{ x: '-50%', opacity: 0 }}
                style={{ width: '100%', height: '100%' }}
              >
                <Image src={arrow} alt="arrow" width={12} height={12} style={{ display: 'block' }}/>
              </motion.div>
            </div>
            <motion.span
              className="text-xs md:text-sm uppercase font-bold tracking-wider"
              animate={spaceControls}
              initial={{ marginLeft: 12 }}
              style={{ display: 'inline-block' }}
            >
              See All Insights
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IdeasSection
