import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  onClick?: () => void;
}

export default function Logo({ variant = 'dark', className = '', onClick }: LogoProps) {
  const isLight = variant === 'light';

  return (
    <Link
      href="/"
      onClick={onClick}
      className={`group inline-flex items-center gap-2.5 transition-colors duration-300 focus:outline-none ${className}`}
      aria-label="SK Builders Homepage"
    >
      <div className="flex flex-col">
        <span
          className={`font-serif-luxury text-xl sm:text-2xl font-light tracking-[0.22em] uppercase transition-colors duration-300 ${
            isLight ? 'text-white' : 'text-[#141414]'
          }`}
        >
          SK <span className="font-normal">Builders</span>
        </span>
      </div>
      <span
        className={`w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-125 ${
          isLight ? 'bg-[#717F5C]' : 'bg-[#5B6748]'
        }`}
        aria-hidden="true"
      />
    </Link>
  );
}
