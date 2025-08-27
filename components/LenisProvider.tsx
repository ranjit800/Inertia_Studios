"use client";

import { useEffect } from "react";
import Lenis from "lenis";

type LenisProviderProps = {
  children: React.ReactNode;
};

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      gestureOrientation: "vertical",
    });

    let animationFrameId: number;

    const onRaf = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(onRaf);
    };

    animationFrameId = requestAnimationFrame(onRaf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}


