"use client";

import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const logoCount = 29;
const logoPaths: string[] = Array.from({ length: logoCount }, (_, index) => {
  const logoIndex = index + 1;
  return `/asset/logoMarqueeImgs/logo${logoIndex}.svg`;
});

const LogoMarquee = () => {
  return (
    <div className="w-full">
      <Marquee pauseOnHover={false} speed={180} gradient={false} className="!gap-0">
        {logoPaths.map((src, idx) => (
          <div key={idx} className="mx-10 flex items-center">
            <Image src={src} alt={`Logo ${idx + 1}`} width={100} height={36} />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default LogoMarquee;
