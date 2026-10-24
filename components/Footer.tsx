'use client';

import React from 'react';
import { BUSINESS_INFO, NAV_LINKS } from '@/lib/constants';
import Logo from '@/components/Logo';
import { usePageTransition } from '@/components/PageTransitionProvider';
import { Instagram, Facebook, Phone, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const { navigateWithTransition } = usePageTransition();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    navigateWithTransition(href);
  };

  return (
    <footer className="bg-[#141414] text-white pt-20 pb-28 md:pb-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Top Header Row: Logo & Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-14 border-b border-white/10">
          <div>
            <Logo variant="light" />
            <p className="mt-2.5 text-xs tracking-[0.22em] uppercase text-white/50">
              {BUSINESS_INFO.type}
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 sm:gap-9">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="group relative py-1 text-xs font-medium tracking-[0.22em] uppercase text-white/70 hover:text-white transition-colors duration-200"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#8A9A74] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
        </div>

        {/* Middle Details Grid */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 border-b border-white/10">
          {/* Contact Details */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A9A74] font-medium block mb-3">
                Direct Line & WhatsApp
              </span>
              <a
                href={BUSINESS_INFO.phoneTel}
                className="group inline-flex items-center gap-3 text-2xl sm:text-3xl font-light tracking-wide text-white hover:text-[#8A9A74] transition-colors tabular-nums"
              >
                <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8A9A74] group-hover:bg-[#8A9A74] group-hover:text-white transition-all shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </span>
                <span>{BUSINESS_INFO.phoneFormatted}</span>
              </a>
              <p className="mt-3 text-xs text-white/50 font-light">
                Call or message us directly on WhatsApp for inquiries.
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="md:col-span-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A9A74] font-medium block mb-3">
              Location
            </span>
            <p className="text-xl sm:text-2xl font-light text-white tracking-wide">
              {BUSINESS_INFO.city}
            </p>
            <p className="mt-2 text-xs text-white/50 font-light">
              Telangana, India
            </p>
          </div>

          {/* Social Channels & Let's Chat CTA */}
          <div className="md:col-span-4 flex flex-col justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A9A74] font-medium block mb-3">
                Social Presence
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#8A9A74] text-xs text-white/80 hover:text-white transition-all"
                  aria-label="Instagram profile @skbuildershyderabad"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#8A9A74]" />
                  <span>Instagram</span>
                </a>

                <a
                  href={BUSINESS_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#8A9A74] text-xs text-white/80 hover:text-white transition-all"
                  aria-label="Facebook page"
                >
                  <Facebook className="w-3.5 h-3.5 text-[#8A9A74]" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>

            <div>
              <a
                href="/contact"
                onClick={(e) => handleLinkClick(e, '/contact')}
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#8A9A74] hover:text-white transition-colors"
              >
                <span>Let&apos;s Chat</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.</p>
          <p className="tracking-wider uppercase text-[11px] text-white/50">
            {BUSINESS_INFO.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
