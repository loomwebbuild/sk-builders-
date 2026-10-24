'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollContextType {
  getLenis: () => Lenis | null;
  scrollTo: (
    target: string | HTMLElement,
    options?: { offset?: number; immediate?: boolean; duration?: number }
  ) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  getLenis: () => null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerHandler = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerHandler);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerHandler);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Handle route change: reset scroll to top & refresh ScrollTrigger
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  const scrollTo = (
    target: string | HTMLElement,
    options?: { offset?: number; immediate?: boolean; duration?: number }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    } else {
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' });
      } else if (target) {
        target.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' });
      }
    }
  };

  const getLenis = () => lenisRef.current;

  return (
    <SmoothScrollContext.Provider value={{ getLenis, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
