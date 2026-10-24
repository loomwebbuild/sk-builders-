'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePageTransition } from '@/components/PageTransitionProvider';
import { BUSINESS_INFO, IMAGES, OFFERINGS_DATA } from '@/lib/constants';
import { ArrowDown, ArrowUpRight, Phone, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const { navigateWithTransition } = usePageTransition();
  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const parallaxImg1Ref = useRef<HTMLDivElement>(null);
  const parallaxImg2Ref = useRef<HTMLDivElement>(null);
  const offeringsRef = useRef<HTMLDivElement>(null);

  // Desktop active hover offering image
  const [activeOfferingIndex, setActiveOfferingIndex] = useState(0);
  // Mobile expanded offering accordion
  const [expandedMobileIndex, setExpandedMobileIndex] = useState<number | null>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero headline staggered line reveal
      gsap.fromTo(
        '.hero-stagger',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.2,
        }
      );

      // Intro section reveals
      if (introRef.current) {
        gsap.fromTo(
          introRef.current.querySelectorAll('.reveal-intro'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: introRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Parallax on image 1 (scrub max 15%)
      if (parallaxImg1Ref.current) {
        gsap.to(parallaxImg1Ref.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: parallaxImg1Ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Parallax on image 2 (different speed, max 15%)
      if (parallaxImg2Ref.current) {
        gsap.to(parallaxImg2Ref.current, {
          y: -70,
          ease: 'none',
          scrollTrigger: {
            trigger: parallaxImg2Ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // Offerings list reveal
      if (offeringsRef.current) {
        gsap.fromTo(
          offeringsRef.current.querySelectorAll('.offering-row'),
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: offeringsRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    navigateWithTransition(href);
  };

  return (
    <div className="relative bg-[#FBFBF9] text-[#141414] overflow-hidden">
      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[640px] w-full flex items-center justify-center overflow-hidden bg-[#141414]"
      >
        {/* Full-viewport background image with slow scale-down */}
        <div className="absolute inset-0 w-full h-full animate-slow-scale overflow-hidden">
          <Image
            src={IMAGES.hero}
            alt="SK Builders Luxury Architectural Villa Exterior in Hyderabad"
            fill
            priority
            sizes="100vw"
            referrerPolicy="no-referrer"
            className="object-cover object-center scale-105"
          />
          {/* Dark gradient overlay on hero */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/35 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center pt-16">
          {/* Subline */}
          <p className="hero-stagger font-sans-editorial text-xs sm:text-sm font-medium tracking-[0.28em] uppercase text-white/70 mb-4 sm:mb-6">
            Real Estate Developer in {BUSINESS_INFO.city}
          </p>

          {/* Staggered Line Reveal Headline */}
          <h1 className="hero-stagger font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[1.08] max-w-4xl text-balance">
            Creating spaces for{' '}
            <span className="text-[#8A9A74] italic font-normal">better</span> life.
          </h1>

          <p className="hero-stagger mt-6 text-sm sm:text-base text-white/75 max-w-xl mx-auto font-light leading-relaxed">
            Villas, residential developments, independent homes, and plotted developments crafted with architectural discipline in {BUSINESS_INFO.city}.
          </p>

          {/* Hero Action Buttons */}
          <div className="hero-stagger mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white text-[#141414] hover:bg-[#8A9A74] hover:text-white text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300"
            >
              <span>Let&apos;s Chat</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            <a
              href={BUSINESS_INFO.phoneTel}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium uppercase tracking-[0.2em] border border-white/25 transition-all duration-300"
            >
              <Phone className="w-3.5 h-3.5 text-[#8A9A74]" />
              <span>Call now</span>
            </a>
          </div>
        </div>

        {/* Bobbing Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 pointer-events-none animate-bobbing">
          <span className="text-[10px] tracking-[0.25em] uppercase font-light">Scroll</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </div>
      </section>

      {/* 2. INTRO SECTION */}
      <section
        ref={introRef}
        className="py-24 sm:py-32 md:py-36 max-w-7xl mx-auto px-6 sm:px-8 md:px-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="reveal-intro text-[11px] uppercase tracking-[0.28em] text-[#5B6748] font-medium block mb-4">
              Our Vision
            </span>

            <h2 className="reveal-intro font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#141414] leading-[1.15] text-balance">
              Spaces designed for the <span className="text-[#5B6748] italic">life</span> you want.
            </h2>

            <p className="reveal-intro mt-6 text-[#555550] text-sm sm:text-base leading-relaxed font-light">
              SK Builders is a real estate developer in Hyderabad dedicated to creating spaces for better life. We shape thoughtfully planned environments across luxury villas, residential communities, independent homes, and plotted developments—rooted in spatial generosity, enduring craftsmanship, and natural balance.
            </p>

            <div className="reveal-intro mt-8 pt-4">
              <a
                href="/about"
                onClick={(e) => handleLinkClick(e, '/about')}
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-medium text-[#141414] hover:text-[#5B6748] transition-colors"
              >
                <span>Read more</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          {/* Right Parallax Images Column */}
          <div className="lg:col-span-6 relative h-[480px] sm:h-[540px] md:h-[600px] w-full">
            {/* Image 1: Main Parallax Card */}
            <div
              ref={parallaxImg1Ref}
              className="absolute left-0 top-0 w-3/4 sm:w-2/3 h-3/4 shadow-xl overflow-hidden bg-neutral-200"
            >
              <Image
                src={IMAGES.villa}
                alt="SK Builders Architectural Travertine Villa in Hyderabad"
                fill
                sizes="(max-width: 768px) 80vw, 40vw"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/15" />
            </div>

            {/* Image 2: Secondary Offset Parallax Card */}
            <div
              ref={parallaxImg2Ref}
              className="absolute right-0 bottom-0 w-3/5 sm:w-1/2 h-2/3 shadow-2xl overflow-hidden border-4 border-[#FBFBF9] bg-neutral-200"
            >
              <Image
                src={IMAGES.independentHome}
                alt="SK Builders Modern Independent Home Architecture in Hyderabad"
                fill
                sizes="(max-width: 768px) 60vw, 30vw"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. OFFERINGS SECTION */}
      <section
        ref={offeringsRef}
        className="py-24 sm:py-32 bg-[#141414] text-white"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-white/10">
            <div>
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#8A9A74] font-medium block mb-3">
                Disciplined Developments
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight">
                Our Curated <span className="text-[#8A9A74] italic">Offerings</span>
              </h2>
            </div>
            <a
              href="/offerings"
              onClick={(e) => handleLinkClick(e, '/offerings')}
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors"
            >
              <span>Explore All Offerings</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* Desktop & Mobile Offerings Container */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Numbered Rows List */}
            <div className="lg:col-span-7 flex flex-col divide-y divide-white/10">
              {OFFERINGS_DATA.map((offering, idx) => {
                const isActive = activeOfferingIndex === idx;
                const isExpanded = expandedMobileIndex === idx;

                return (
                  <div
                    key={offering.id}
                    onMouseEnter={() => setActiveOfferingIndex(idx)}
                    className="offering-row group py-7 transition-colors duration-300"
                  >
                    {/* Desktop & Mobile Header Bar */}
                    <div
                      onClick={() => setExpandedMobileIndex(isExpanded ? null : idx)}
                      className="cursor-pointer flex items-center justify-between gap-4"
                    >
                      <div className="flex items-baseline gap-6 sm:gap-8">
                        <span className="font-mono text-xs sm:text-sm tracking-wider text-[#8A9A74]">
                          {offering.id}
                        </span>
                        <h3 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-white group-hover:text-[#8A9A74] transition-colors duration-300">
                          {offering.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3">
                        <a
                          href="/offerings"
                          onClick={(e) => handleLinkClick(e, '/offerings')}
                          aria-label={`View ${offering.title} details`}
                          className="w-9 h-9 rounded-none border border-white/15 flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-[#8A9A74] transition-all duration-300"
                        >
                          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      </div>
                    </div>

                    {/* Brief Headline visible on desktop hover or mobile accordion */}
                    <p className="mt-3 text-sm text-white/60 font-light max-w-xl pl-10 sm:pl-14 hidden lg:block">
                      {offering.headline}
                    </p>

                    {/* Mobile Tap-to-expand details */}
                    <div
                      className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out pl-10 ${
                        isExpanded ? 'max-h-96 pt-4 opacity-100' : 'max-h-0 pt-0 opacity-0'
                      }`}
                    >
                      <p className="text-xs text-white/70 font-light leading-relaxed mb-4">
                        {offering.description}
                      </p>
                      <div className="relative h-44 w-full overflow-hidden bg-neutral-800 mb-3">
                        <Image
                          src={offering.image}
                          alt={`${offering.title} by SK Builders in Hyderabad`}
                          fill
                          sizes="90vw"
                          referrerPolicy="no-referrer"
                          className="object-cover"
                        />
                      </div>
                      <a
                        href="/offerings"
                        onClick={(e) => handleLinkClick(e, '/offerings')}
                        className="inline-flex items-center gap-1.5 text-xs text-[#8A9A74] uppercase tracking-[0.18em]"
                      >
                        <span>View Offering Details</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Active Offering Preview Image */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl">
                <Image
                  key={OFFERINGS_DATA[activeOfferingIndex].image}
                  src={OFFERINGS_DATA[activeOfferingIndex].image}
                  alt={OFFERINGS_DATA[activeOfferingIndex].title}
                  fill
                  sizes="40vw"
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A9A74] block mb-1">
                    0{activeOfferingIndex + 1} / 04
                  </span>
                  <p className="font-serif-luxury text-xl text-white font-light">
                    {OFFERINGS_DATA[activeOfferingIndex].title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA SECTION */}
      <section className="py-24 sm:py-32 bg-[#FBFBF9] text-[#141414] border-t border-[rgba(20,20,20,0.06)]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
          <span className="text-[11px] uppercase tracking-[0.28em] text-[#5B6748] font-medium block mb-4">
            Connect With Us
          </span>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-light text-[#141414] tracking-tight leading-tight text-balance">
            Looking for your next <span className="text-[#5B6748] italic">space</span> in {BUSINESS_INFO.city}?
          </h2>

          <p className="mt-6 text-sm sm:text-base text-[#666660] max-w-xl mx-auto font-light leading-relaxed">
            Whether you are considering a luxury villa, residential community, independent home, or plotted development, our team in Hyderabad is ready to assist you.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-[#141414] hover:bg-[#5B6748] text-white text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300"
            >
              <span>Let&apos;s Chat</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            <a
              href={BUSINESS_INFO.phoneTel}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-transparent hover:bg-[#141414] text-[#141414] hover:text-white text-xs font-medium uppercase tracking-[0.2em] border border-[#141414] transition-all duration-300"
            >
              <Phone className="w-3.5 h-3.5 text-[#5B6748] group-hover:text-white" />
              <span>Call now</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
