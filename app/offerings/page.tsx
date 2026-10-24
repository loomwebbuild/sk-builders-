'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePageTransition } from '@/components/PageTransitionProvider';
import { BUSINESS_INFO, OFFERINGS_DATA } from '@/lib/constants';
import { ArrowUpRight, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function OfferingsPage() {
  const { navigateWithTransition } = usePageTransition();
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '.offerings-hero-stagger',
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

      // Each full section reveals smoothly on scroll
      const sections = document.querySelectorAll('.offering-section-block');
      sections.forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll('.reveal-elem'),
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
            },
          }
        );
      });
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
        className="relative pt-36 sm:pt-44 pb-20 sm:pb-28 bg-[#141414] text-white"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <span className="offerings-hero-stagger text-[11px] uppercase tracking-[0.28em] text-[#8A9A74] font-medium block mb-4">
            Disciplined Developments
          </span>

          <h1 className="offerings-hero-stagger font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-[1.1] max-w-4xl text-balance">
            Our property <span className="text-[#8A9A74] italic font-normal">offerings</span> in {BUSINESS_INFO.city}.
          </h1>

          <p className="offerings-hero-stagger mt-6 text-sm sm:text-base text-white/70 max-w-2xl font-light leading-relaxed">
            Discover four distinct development categories shaped by SK Builders—each conceptualized with architectural precision, spatial balance, and enduring materials.
          </p>
        </div>
      </section>

      {/* 2. FOUR FULL OFFERINGS SECTIONS */}
      <div ref={containerRef} className="divide-y divide-[rgba(20,20,20,0.06)]">
        {OFFERINGS_DATA.map((offering, idx) => {
          const isEven = idx % 2 === 1;
          const contactUrl = `/contact?interest=${encodeURIComponent(
            offering.title === 'Plotted Developments' ? 'Plot' : offering.title
          )}`;

          return (
            <section
              key={offering.id}
              id={offering.slug}
              className="offering-section-block py-24 sm:py-32 md:py-36 max-w-7xl mx-auto px-6 sm:px-8 md:px-12"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content Column */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="reveal-elem flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs text-[#5B6748] tracking-widest">
                      {offering.id}
                    </span>
                    <span className="text-neutral-300">/</span>
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#5B6748] font-medium">
                      {offering.tag}
                    </span>
                  </div>

                  <h2 className="reveal-elem font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#141414] leading-[1.15] text-balance">
                    {offering.title}
                  </h2>

                  <p className="reveal-elem mt-6 text-sm sm:text-base text-[#555550] leading-relaxed font-light">
                    {offering.description}
                  </p>

                  <div className="reveal-elem mt-8 pt-4">
                    <a
                      href={contactUrl}
                      onClick={(e) => handleLinkClick(e, contactUrl)}
                      className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[#141414] hover:bg-[#5B6748] text-white text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300"
                    >
                      <span>Let&apos;s Chat</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </div>

                {/* Large Visual Asset Column */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="reveal-elem relative aspect-4/3 lg:aspect-16/10 w-full overflow-hidden bg-neutral-200 shadow-xl group">
                    <Image
                      src={offering.image}
                      alt={`${offering.title} in Hyderabad by SK Builders`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      referrerPolicy="no-referrer"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white/90">
                      <span className="text-xs uppercase tracking-[0.2em] font-light">
                        {BUSINESS_INFO.city} · SK Builders
                      </span>
                      <span className="font-mono text-xs text-[#8A9A74]">
                        {offering.id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* 3. CLOSING CTA */}
      <section className="py-24 sm:py-32 bg-[#141414] text-white border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
          <span className="text-[11px] uppercase tracking-[0.28em] text-[#8A9A74] font-medium block mb-4">
            Connect
          </span>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-tight text-balance">
            Ready to discuss your next <span className="text-[#8A9A74] italic">space</span>?
          </h2>

          <p className="mt-6 text-sm sm:text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed">
            Our team in Hyderabad is ready to guide you through our villas, residential spaces, independent homes, and plotted developments.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-[#5B6748] hover:bg-[#4E583E] text-white text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300"
            >
              <span>Let&apos;s Chat</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            <a
              href={BUSINESS_INFO.phoneTel}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-xs font-medium uppercase tracking-[0.2em] border border-white/20 transition-all duration-300"
            >
              <Phone className="w-3.5 h-3.5 text-[#8A9A74]" />
              <span>Call now</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
