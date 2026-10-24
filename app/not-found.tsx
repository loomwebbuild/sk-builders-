'use client';

import React from 'react';
import Link from 'next/link';
import { usePageTransition } from '@/components/PageTransitionProvider';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const { navigateWithTransition } = usePageTransition();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#FBFBF9] px-6 py-28">
      <div className="max-w-xl mx-auto text-center flex flex-col items-center">
        <span className="font-serif-luxury text-7xl sm:text-8xl md:text-9xl font-light text-[#5B6748]/60 tracking-wider">
          404
        </span>
        <h1 className="mt-4 font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-light text-[#141414] tracking-tight">
          The space you are looking for does not <span className="text-[#5B6748] italic">exist</span>.
        </h1>
        <p className="mt-4 text-sm font-normal text-[#666660] max-w-md mx-auto leading-relaxed">
          The page may have moved or the address may be incorrect. Return to our curated real estate portfolio in Hyderabad.
        </p>

        <div className="mt-10">
          <button
            type="button"
            onClick={() => navigateWithTransition('/')}
            className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[#141414] hover:bg-[#5B6748] text-white text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to home</span>
          </button>
        </div>
      </div>
    </div>
  );
}
