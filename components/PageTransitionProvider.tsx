'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface TransitionContextType {
  navigateWithTransition: (href: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
  navigateWithTransition: () => {},
  isTransitioning: false,
});

export const usePageTransition = () => useContext(TransitionContext);

export default function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [panelPhase, setPanelPhase] = useState<'idle' | 'covering' | 'uncovering'>('idle');

  const navigateWithTransition = (href: string) => {
    // If same route, ignore
    if (href === pathname || (href === '/' && pathname === '/')) {
      return;
    }

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      router.push(href);
      return;
    }

    setIsTransitioning(true);
    setPanelPhase('covering');

    // Wipe in
    setTimeout(() => {
      router.push(href);
      window.scrollTo(0, 0);

      // Start wiping out
      setTimeout(() => {
        setPanelPhase('uncovering');
        setTimeout(() => {
          setIsTransitioning(false);
          setPanelPhase('idle');
        }, 500);
      }, 100);
    }, 450);
  };

  // Reset if route changes from browser back/forward
  useEffect(() => {
    if (panelPhase === 'covering') {
      const timer = setTimeout(() => {
        setPanelPhase('uncovering');
        setTimeout(() => {
          setIsTransitioning(false);
          setPanelPhase('idle');
        }, 450);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [pathname, panelPhase]);

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, isTransitioning }}>
      {children}

      {/* Charcoal panel wipe overlay */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-[99990] bg-[#141414] pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          panelPhase === 'idle'
            ? 'translate-y-full opacity-0'
            : panelPhase === 'covering'
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-100'
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif-luxury text-xl sm:text-2xl text-white/40 tracking-[0.25em] uppercase">
            SK BUILDERS
          </span>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
