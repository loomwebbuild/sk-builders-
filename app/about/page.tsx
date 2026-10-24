'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePageTransition } from '@/components/PageTransitionProvider';
import { BUSINESS_INFO, IMAGES } from '@/lib/constants';
import { Phone, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const { navigateWithTransition } = usePageTransition();
  const heroRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const parallaxImg1Ref = useRef<HTMLDivElement>(null);
  const parallaxImg2Ref = useRef<HTMLDivElement>(null);
  const pinnedSectionRef = useRef<HTMLDivElement>(null);
  const pinnedContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(
        '.about-stagger',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.14,
          ease: 'power3.out',
          delay: 0.15,
        }
      );

      // Parallax image 1
      if (parallaxImg1Ref.current) {
        gsap.to(parallaxImg1Ref.current, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: parallaxImg1Ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Parallax image 2
      if (parallaxImg2Ref.current) {
        gsap.to(parallaxImg2Ref.current, {
          y: -75,
          ease: 'none',
          scrollTrigger: {
            trigger: parallaxImg2Ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // Pinned background section with text scrolling over it
      if (pinnedSectionRef.current) {
        ScrollTrigger.create({
          trigger: pinnedSectionRef.current,
          start: 'top top',
          end: '+=100%',
          pin: '.pinned-bg-layer',
          pinSpacing: false,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    navigateWithTransition(href);
  };

  return (
    <div className="bg-[#FBFBF9] text-[#141414] overflow-hidden">
      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        className="relative pt-36 sm:pt-44 pb-20 sm:pb-24 bg-[#141414] text-white"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <span className="about-stagger text-[11px] uppercase tracking-[0.28em] text-[#8A9A74] font-medium block mb-4">
            About SK Builders
          </span>

          <h1 className="about-stagger font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-[1.1] max-w-4xl text-balance">
            Creating spaces for <span className="text-[#8A9A74] italic font-normal">better</span> life in {BUSINESS_INFO.city}.
          </h1>

          <p className="about-stagger mt-6 text-sm sm:text-base text-white/70 max-w-2xl font-light leading-relaxed">
            As a dedicated real estate developer in Hyderabad, SK Builders focuses exclusively on crafting environments that elevate living through architectural integrity and spatial discipline.
          </p>
        </div>
      </section>

      {/* 2. THREE PARAGRAPHS & TWO PARALLAX IMAGES */}
      <section
        ref={narrativeRef}
        className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-8 md:px-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          {/* Left Column: 3 Curated Paragraphs */}
          <div className="lg:col-span-6 space-y-10">
            <div>
              <span className="text-xs font-mono text-[#5B6748] tracking-widest block mb-2">01</span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#141414] mb-4">
                Our Foundational Philosophy
              </h2>
              <p className="text-[#555550] text-sm sm:text-base leading-relaxed font-light">
                SK Builders is a real estate developer in Hyderabad guided by a singular mandate: creating spaces for better life. We shape thoughtfully planned environments where enduring architecture meets everyday living, creating homes that respect privacy, light, and natural surroundings.
              </p>
            </div>

            <div className="pt-4 border-t border-[rgba(20,20,20,0.06)]">
              <span className="text-xs font-mono text-[#5B6748] tracking-widest block mb-2">02</span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#141414] mb-4">
                Four Pillars of Development
              </h2>
              <p className="text-[#555550] text-sm sm:text-base leading-relaxed font-light">
                Our portfolio centers upon four distinct property types: luxury villas designed for expansive private sanctuaries, contemporary residential developments, bespoke independent homes tailored for lasting autonomy, and planned plotted developments with infrastructure-ready parcel layouts.
              </p>
            </div>

            <div className="pt-4 border-t border-[rgba(20,20,20,0.06)]">
              <span className="text-xs font-mono text-[#5B6748] tracking-widest block mb-2">03</span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#141414] mb-4">
                Dedicated to Hyderabad
              </h2>
              <p className="text-[#555550] text-sm sm:text-base leading-relaxed font-light">
                By focusing on proportion, natural daylight, and harmonious living environments, every space we deliver in Hyderabad is built to provide an elevated standard of living for you and your family.
              </p>
            </div>

            <div className="pt-6">
              <a
                href="/offerings"
                onClick={(e) => handleLinkClick(e, '/offerings')}
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#141414] hover:text-[#5B6748] transition-colors"
              >
                <span>Discover our offerings</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Two Parallax Images at Different Speeds */}
          <div className="lg:col-span-6 relative h-[560px] sm:h-[640px] md:h-[720px] w-full">
            {/* Top parallax image */}
            <div
              ref={parallaxImg1Ref}
              className="absolute left-0 top-0 w-4/5 sm:w-3/4 h-3/5 overflow-hidden shadow-2xl bg-neutral-200"
            >
              <Image
                src={IMAGES.villa}
                alt="Architectural Villa by SK Builders in Hyderabad"
                fill
                sizes="(max-width: 768px) 80vw, 40vw"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/15" />
            </div>

            {/* Bottom parallax image (higher offset speed) */}
            <div
              ref={parallaxImg2Ref}
              className="absolute right-0 bottom-4 w-2/3 sm:w-3/5 h-1/2 overflow-hidden shadow-2xl border-4 border-[#FBFBF9] bg-neutral-200"
            >
              <Image
                src={IMAGES.independentHome}
                alt="Independent Home Design in Hyderabad"
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

      {/* 3. PINNED BACKGROUND SECTION WITH TEXT SCROLLING OVER IT */}
      <section
        ref={pinnedSectionRef}
        className="relative min-h-[160vh] bg-[#141414] text-white"
      >
        {/* Pinned background layer */}
        <div className="pinned-bg-layer absolute inset-0 w-full h-screen overflow-hidden">
          <Image
            src={IMAGES.residential}
            alt="SK Builders Residential Development Exterior"
            fill
            sizes="100vw"
            referrerPolicy="no-referrer"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/75 to-black/60 pointer-events-none" />
        </div>

        {/* Content scrolling smoothly over the pinned background */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 md:px-12 pt-36 pb-48 flex flex-col items-center">
          <div className="my-24 p-8 sm:p-12 md:p-16 bg-[#141414]/90 backdrop-blur-md border border-white/10 max-w-2xl text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#8A9A74] block mb-3 font-medium">
              Architectural Standard
            </span>
            <blockquote className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-light text-white leading-snug">
              “Creating spaces for <span className="text-[#8A9A74] italic">better</span> life is our sole compass in every Hyderabad development.”
            </blockquote>
            <p className="mt-6 text-xs uppercase tracking-[0.22em] text-white/50">
              SK Builders · Hyderabad
            </p>
          </div>

          <div className="my-16 p-8 sm:p-12 md:p-16 bg-[#141414]/90 backdrop-blur-md border border-white/10 max-w-2xl text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#8A9A74] block mb-3 font-medium">
              Spatial Balance
            </span>
            <p className="font-serif-luxury text-xl sm:text-2xl font-light text-white/90 leading-relaxed">
              Every villa, residential layout, independent home, and plotted enclave is shaped with uncompromising attention to spatial generosity and enduring permanence.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CLOSING CTA */}
      <section className="py-24 sm:py-32 bg-[#FBFBF9] text-[#141414] border-t border-[rgba(20,20,20,0.06)]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
          <span className="text-[11px] uppercase tracking-[0.28em] text-[#5B6748] font-medium block mb-4">
            Inquire Today
          </span>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-light text-[#141414] tracking-tight leading-tight text-balance">
            Looking for your next <span className="text-[#5B6748] italic">space</span> in {BUSINESS_INFO.city}?
          </h2>

          <p className="mt-6 text-sm sm:text-base text-[#666660] max-w-xl mx-auto font-light leading-relaxed">
            Connect with us to explore luxury villas, residential communities, independent homes, or plotted developments in Hyderabad.
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
