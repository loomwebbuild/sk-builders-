'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BUSINESS_INFO } from '@/lib/constants';
import { Phone, Instagram, Facebook, Check, AlertCircle, MessageCircle } from 'lucide-react';
import gsap from 'gsap';

const INTEREST_OPTIONS = [
  'Villa',
  'Residential',
  'Independent home',
  'Plot',
  'Not sure yet',
] as const;

function ContactForm() {
  const searchParams = useSearchParams();
  const initialInterest = searchParams?.get('interest') || 'Not sure yet';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: INTEREST_OPTIONS.includes(initialInterest as any)
      ? initialInterest
      : 'Not sure yet',
    message: '',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
  }>({});

  const [touched, setTouched] = useState<{
    name?: boolean;
    phone?: boolean;
  }>({});

  const [submitted, setSubmitted] = useState(false);

  const [prevInterestParam, setPrevInterestParam] = useState(initialInterest);

  if (initialInterest !== prevInterestParam) {
    setPrevInterestParam(initialInterest);
    if (INTEREST_OPTIONS.includes(initialInterest as any)) {
      setFormData((prev) => ({ ...prev, interest: initialInterest }));
    }
  }

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
    return cleaned.length >= 10;
  };

  const handleBlur = (field: 'name' | 'phone') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field: 'name' | 'phone', value: string) => {
    if (field === 'name') {
      if (!value.trim() || value.trim().length < 2) {
        setErrors((prev) => ({ ...prev, name: 'Please enter your full name.' }));
        return false;
      } else {
        setErrors((prev) => {
          const { name, ...rest } = prev;
          return rest;
        });
        return true;
      }
    }

    if (field === 'phone') {
      if (!value.trim() || !validatePhone(value)) {
        setErrors((prev) => ({
          ...prev,
          phone: 'Please enter a valid 10-digit phone number.',
        }));
        return false;
      } else {
        setErrors((prev) => {
          const { phone, ...rest } = prev;
          return rest;
        });
        return true;
      }
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({ name: true, phone: true });
    const isNameValid = validateField('name', formData.name);
    const isPhoneValid = validateField('phone', formData.phone);

    if (!isNameValid || !isPhoneValid) {
      return;
    }

    // Build pre-filled WhatsApp message
    const lines = [
      `Hello SK Builders,`,
      ``,
      `Name: ${formData.name.trim()}`,
      `Phone: ${formData.phone.trim()}`,
      `Interest: ${formData.interest}`,
    ];

    if (formData.message.trim()) {
      lines.push(`Message: ${formData.message.trim()}`);
    }

    const encodedText = encodeURIComponent(lines.join('\n'));
    const whatsappUrl = `https://wa.me/917666643433?text=${encodedText}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Show success state
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      interest: 'Not sure yet',
      message: '',
    });
    setTouched({});
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="bg-[#141414] text-white p-8 sm:p-12 border border-white/10 shadow-2xl">
        <div className="w-12 h-12 bg-[#5B6748]/20 border border-[#8A9A74] flex items-center justify-center text-[#8A9A74] mb-6">
          <Check className="w-6 h-6" />
        </div>
        <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-white mb-3">
          Message Ready on WhatsApp
        </h3>
        <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
          Thank you, <span className="text-white font-normal">{formData.name}</span>. We&apos;ve initiated WhatsApp with your pre-filled inquiry for{' '}
          <span className="text-[#8A9A74]">{formData.interest}</span>. Please click send in WhatsApp to dispatch your message directly to our team.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <a
            href={`https://wa.me/917666643433?text=${encodeURIComponent(
              `Hello SK Builders,\nName: ${formData.name}\nPhone: ${formData.phone}\nInterest: ${formData.interest}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#5B6748] hover:bg-[#4E583E] text-white text-xs font-medium uppercase tracking-[0.2em] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open WhatsApp Again</span>
          </a>

          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-white/20 hover:border-white text-white/80 hover:text-white text-xs font-medium uppercase tracking-[0.2em] transition-colors"
          >
            Send Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Name Input */}
      <div>
        <label
          htmlFor="contact-name"
          className="block text-xs uppercase tracking-[0.2em] font-medium text-[#141414] mb-2"
        >
          Your Name <span className="text-[#5B6748]">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (touched.name) validateField('name', e.target.value);
          }}
          onBlur={() => handleBlur('name')}
          placeholder="e.g. Arjun Reddy"
          aria-invalid={touched.name && !!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={`w-full bg-white px-4 py-3.5 text-sm text-[#141414] border focus:outline-none transition-colors ${
            touched.name && errors.name
              ? 'border-red-500 focus:border-red-600'
              : 'border-[#141414]/15 focus:border-[#5B6748]'
          }`}
        />
        {touched.name && errors.name && (
          <p id="name-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.name}</span>
          </p>
        )}
      </div>

      {/* Phone Input */}
      <div>
        <label
          htmlFor="contact-phone"
          className="block text-xs uppercase tracking-[0.2em] font-medium text-[#141414] mb-2"
        >
          Phone Number <span className="text-[#5B6748]">*</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => {
            setFormData({ ...formData, phone: e.target.value });
            if (touched.phone) validateField('phone', e.target.value);
          }}
          onBlur={() => handleBlur('phone')}
          placeholder="e.g. 7666643433 or +91 98765 43210"
          aria-invalid={touched.phone && !!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          className={`w-full bg-white px-4 py-3.5 text-sm text-[#141414] border focus:outline-none transition-colors ${
            touched.phone && errors.phone
              ? 'border-red-500 focus:border-red-600'
              : 'border-[#141414]/15 focus:border-[#5B6748]'
          }`}
        />
        {touched.phone && errors.phone && (
          <p id="phone-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.phone}</span>
          </p>
        )}
      </div>

      {/* Interest Dropdown */}
      <div>
        <label
          htmlFor="contact-interest"
          className="block text-xs uppercase tracking-[0.2em] font-medium text-[#141414] mb-2"
        >
          Property Interest
        </label>
        <select
          id="contact-interest"
          value={formData.interest}
          onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
          className="w-full bg-white px-4 py-3.5 text-sm text-[#141414] border border-[#141414]/15 focus:border-[#5B6748] focus:outline-none transition-colors"
        >
          {INTEREST_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Short Message Input */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs uppercase tracking-[0.2em] font-medium text-[#141414] mb-2"
        >
          Short Message
        </label>
        <textarea
          id="contact-message"
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us what you are looking for..."
          className="w-full bg-white px-4 py-3 text-sm text-[#141414] border border-[#141414]/15 focus:border-[#5B6748] focus:outline-none transition-colors resize-none"
        />
      </div>

      {/* Submit Button & WhatsApp Clarification Line */}
      <div className="pt-2">
        <button
          type="submit"
          className="group w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#141414] hover:bg-[#5B6748] text-white text-xs font-medium uppercase tracking-[0.22em] transition-all duration-300"
        >
          <span>Let&apos;s Chat</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>

        {/* Required clarification line directly under button */}
        <p className="mt-3 text-center text-xs text-[#666660] font-light">
          We&apos;ll open WhatsApp so you can send this to us directly.
        </p>
      </div>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="bg-[#FBFBF9] text-[#141414] overflow-hidden">
      {/* 1. HERO HEADER */}
      <section className="relative pt-36 sm:pt-44 pb-16 sm:pb-20 bg-[#141414] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <span className="text-[11px] uppercase tracking-[0.28em] text-[#8A9A74] font-medium block mb-4">
            Direct Inquiries
          </span>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-[1.1] max-w-3xl text-balance">
            Let&apos;s talk about your <span className="text-[#8A9A74] italic font-normal">next</span> space.
          </h1>

          <p className="mt-6 text-sm sm:text-base text-white/70 max-w-xl font-light leading-relaxed">
            Reach out directly to discuss our villas, residential developments, independent homes, and plotted developments in {BUSINESS_INFO.city}.
          </p>
        </div>
      </section>

      {/* 2. FORM & DIRECT DETAILS SPLIT */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Form with Suspense for SearchParams */}
          <div className="lg:col-span-7 bg-[#F4F4F0] p-8 sm:p-12 border border-[rgba(20,20,20,0.06)] shadow-xs">
            <Suspense fallback={<div className="py-12 text-center text-xs text-[#666660]">Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Right Column: Direct Details beside form (Strictly allowed business details) */}
          <div className="lg:col-span-5 space-y-10 lg:pl-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#5B6748] font-medium block mb-2">
                Developer Location
              </span>
              <p className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#141414]">
                {BUSINESS_INFO.city}
              </p>
              <p className="mt-1 text-xs text-[#666660] font-light">
                Real Estate Developer, {BUSINESS_INFO.city}
              </p>
            </div>

            <div className="pt-6 border-t border-[rgba(20,20,20,0.08)]">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#5B6748] font-medium block mb-2">
                Direct Line & WhatsApp
              </span>
              <a
                href={BUSINESS_INFO.phoneTel}
                className="font-serif-luxury text-2xl sm:text-3xl text-[#141414] hover:text-[#5B6748] transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5 text-[#5B6748]" />
                <span>{BUSINESS_INFO.phoneFormatted}</span>
              </a>
              <p className="mt-2 text-xs text-[#666660] font-light">
                Call or message us anytime on WhatsApp.
              </p>
            </div>

            <div className="pt-6 border-t border-[rgba(20,20,20,0.08)]">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#5B6748] font-medium block mb-3">
                Social Channels
              </span>
              <div className="space-y-3">
                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 bg-white border border-[rgba(20,20,20,0.08)] hover:border-[#5B6748] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Instagram className="w-4 h-4 text-[#5B6748]" />
                    <span className="text-xs uppercase tracking-[0.16em] font-medium text-[#141414]">
                      Instagram
                    </span>
                  </div>
                  <span className="text-xs text-[#666660] group-hover:text-[#141414]">
                    {BUSINESS_INFO.instagramHandle} →
                  </span>
                </a>

                <a
                  href={BUSINESS_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 bg-white border border-[rgba(20,20,20,0.08)] hover:border-[#5B6748] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Facebook className="w-4 h-4 text-[#5B6748]" />
                    <span className="text-xs uppercase tracking-[0.16em] font-medium text-[#141414]">
                      Facebook
                    </span>
                  </div>
                  <span className="text-xs text-[#666660] group-hover:text-[#141414]">
                    SK Builders Profile →
                  </span>
                </a>
              </div>
            </div>

            <div className="pt-4 p-5 bg-[#5B6748]/10 border border-[#5B6748]/20">
              <p className="font-serif-luxury text-base text-[#141414] font-light leading-relaxed">
                “{BUSINESS_INFO.tagline}”
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#5B6748]">
                SK Builders
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
