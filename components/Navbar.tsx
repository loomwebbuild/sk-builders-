'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { BUSINESS_INFO, NAV_LINKS } from '@/lib/constants';
import Logo from '@/components/Logo';
import { usePageTransition } from '@/components/PageTransitionProvider';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);
  const { navigateWithTransition } = usePageTransition();

  // Reset mobile menu during render if route changes
  if (pathname !== currentPath) {
    setCurrentPath(pathname);
    setMobileMenuOpen(false);
  }

  // Scroll listener for 80px threshold
  useEffect(() => {
    const handleScroll = () => {
      const isPast80 = window.scrollY > 80;
      setScrolled(isPast80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const hasDarkHero = true;
  const isSolid = scrolled;
  const isLightText = hasDarkHero && !scrolled;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigateWithTransition(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isSolid
            ? 'bg-[#FBFBF9]/95 backdrop-blur-md py-4 border-b border-[rgba(20,20,20,0.06)] shadow-xs'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div className="shrink-0">
            <Logo
              variant={isLightText ? 'light' : 'dark'}
              onClick={() => {
                if (pathname !== '/') navigateWithTransition('/');
              }}
            />
          </div>

          {/* Zone 2: Desktop Nav Links (small-caps wide-tracked thin links) */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-9"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`group relative py-1 text-[11px] font-medium tracking-[0.24em] uppercase transition-colors duration-200 whitespace-nowrap shrink-0 ${
                    isLightText
                      ? isActive
                        ? 'text-white'
                        : 'text-white/75 hover:text-white'
                      : isActive
                      ? 'text-[#141414]'
                      : 'text-[#555550] hover:text-[#141414]'
                  }`}
                >
                  {link.label}
                  {/* Sliding active/hover underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] transition-all duration-300 ease-out ${
                      isLightText ? 'bg-[#8A9A74]' : 'bg-[#5B6748]'
                    } ${
                      isActive
                        ? 'w-full opacity-100'
                        : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action CTA */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              className={`group inline-flex items-center gap-2 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-300 rounded-none whitespace-nowrap shrink-0 ${
                isLightText
                  ? 'bg-white/10 hover:bg-white text-white hover:text-[#141414] border border-white/20 hover:border-white'
                  : 'bg-[#141414] hover:bg-[#5B6748] text-white border border-[#141414] hover:border-[#5B6748]'
              }`}
            >
              <span>Let&apos;s Chat</span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className={`p-2 transition-colors duration-200 focus:outline-none ${
                isLightText ? 'text-white' : 'text-[#141414]'
              }`}
            >
              <div className="w-6 flex flex-col gap-1.5 items-end">
                <span
                  className={`h-[1.5px] w-6 transition-colors duration-300 ${
                    isLightText ? 'bg-white' : 'bg-[#141414]'
                  }`}
                />
                <span
                  className={`h-[1.5px] w-4 transition-colors duration-300 ${
                    isLightText ? 'bg-white' : 'bg-[#141414]'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      <div
        aria-hidden={!mobileMenuOpen}
        className={`fixed inset-0 z-[9999] bg-[#141414] text-white flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] md:hidden ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        {/* Top bar inside mobile overlay */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
          <Logo variant="light" onClick={() => setMobileMenuOpen(false)} />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            className="p-2 text-white/70 hover:text-white transition-colors focus:outline-none"
          >
            <span className="font-sans-editorial text-xs tracking-[0.2em] uppercase">
              Close [✕]
            </span>
          </button>
        </div>

        {/* Large Stacked Nav Links with Staggered Reveal */}
        <div className="px-8 py-10 flex flex-col gap-6">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/40">
            Navigation
          </p>
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`group flex items-baseline justify-between py-2 border-b border-white/10 transition-colors ${
                    isActive ? 'text-[#8A9A74]' : 'text-white hover:text-[#8A9A74]'
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs font-mono text-white/40">
                      0{idx + 1}
                    </span>
                    <span className="font-serif-luxury text-3xl font-light tracking-wide">
                      {link.label}
                    </span>
                  </div>
                  <span className="text-sm transition-transform duration-300 group-hover:translate-x-1 text-white/40 group-hover:text-white">
                    →
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Let's Chat primary CTA inside mobile menu */}
          <div className="pt-4">
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#5B6748] hover:bg-[#4E583E] text-white text-xs font-medium uppercase tracking-[0.2em] transition-colors"
            >
              <span>Let&apos;s Chat</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Bottom details inside mobile menu */}
        <div className="px-8 py-6 border-t border-white/10 bg-[#0e0e0e] flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>{BUSINESS_INFO.city}</span>
            <a
              href={BUSINESS_INFO.phoneTel}
              className="hover:text-white transition-colors"
            >
              {BUSINESS_INFO.phoneFormatted}
            </a>
          </div>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <a
              href={BUSINESS_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Facebook
            </a>
            <span>·</span>
            <a
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <span>·</span>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
