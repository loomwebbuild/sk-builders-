'use client';

import React from 'react';
import { BUSINESS_INFO } from '@/lib/constants';
import { Phone, MessageCircle } from 'lucide-react';

export default function MobileStickyBar() {
  return (
    <aside
      aria-label="Quick contact actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#141414]/95 backdrop-blur-md border-t border-white/10 px-4 py-2.5 shadow-2xl"
    >
      <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
        {/* Secondary CTA: Call now */}
        <a
          href={BUSINESS_INFO.phoneTel}
          className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white/10 hover:bg-white/15 text-white text-xs font-medium uppercase tracking-[0.15em] border border-white/15 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-[#8A9A74]" />
          <span>Call now</span>
        </a>

        {/* Primary CTA: Let's Chat → */}
        <a
          href={BUSINESS_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#5B6748] hover:bg-[#4E583E] text-white text-xs font-medium uppercase tracking-[0.15em] transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Let&apos;s Chat</span>
          <span>→</span>
        </a>
      </div>
    </aside>
  );
}
