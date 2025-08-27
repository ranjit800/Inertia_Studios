import React from "react";
import Marquee from "react-fast-marquee";

const items = [
  "Case Studies",
  "Featured Projects",
  "Case Studies",
  "Featured Projects",
  "Case Studies",
  "Featured Projects",
  "Case Studies",
  "Featured Projects",
];

const MarqueeComponent = () => {
  return (
    <div className="w-full flex  mt-10 py-4  border-t-2 border-black">
      <Marquee
        pauseOnHover={false}
        speed={100} // Increased speed from 50 to 100
        gradient={false}
        style={{ gap: 0 }} // Remove any default gap
        className="!gap-0"
      >
        {items.map((item, idx) => (
          <span
            key={idx}
            className="inline-block md:px-16 px-6 md:text-7xl text-4xl font-neue  text-black uppercase"
            style={{ marginLeft: 0, marginRight: 0 }}
          >
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeComponent;
