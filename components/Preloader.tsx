'use client';

import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const [lifting, setLifting] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('sk_preloader_seen');
    if (!seen) {
      // Async timer callback is safe from cascading render warning
      const startTimer = setTimeout(() => {
        setVisible(true);
      }, 0);

      const liftTimer = setTimeout(() => {
        setLifting(true);
      }, 1400);

      const endTimer = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem('sk_preloader_seen', 'true');
      }, 2300);

      return () => {
        clearTimeout(startTimer);
        clearTimeout(liftTimer);
        clearTimeout(endTimer);
      };
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#141414] text-white transition-transform duration-800 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        lifting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="font-serif-luxury text-3xl sm:text-4xl font-light tracking-[0.25em] uppercase text-white/95">
          SK <span className="text-[#8A9A74] font-normal">BUILDERS</span>
        </div>
        <p className="font-sans-editorial text-[11px] uppercase tracking-[0.3em] text-white/50">
          Hyderabad
        </p>

        {/* 3 sequential dots */}
        <div className="flex items-center gap-2 mt-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8A9A74] animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#8A9A74] animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#8A9A74] animate-bounce" />
        </div>
      </div>
    </div>
  );
}
