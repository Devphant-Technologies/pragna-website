"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(badgeRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.3 })
      .fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, '-=0.5')
      .fromTo(subtextRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.8')
      .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6');
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[#FDF8F5]">
        <img
          src="/assets/hero01.jpg"
          alt="Pragna Group Speciality Chemicals"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Multi-layer gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDF8F5]/80 via-[#FDF8F5]/20 to-transparent"></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 right-[10%] w-80 h-80 rounded-full bg-brand-mint/[0.03] blur-[100px] animate-float"></div>
      <div className="absolute bottom-1/4 right-[20%] w-60 h-60 rounded-full bg-brand-cyan/[0.04] blur-[80px] animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-7 max-w-3xl">
          <span ref={badgeRef} className="inline-flex items-center space-x-2.5 text-xs font-bold text-brand-mint tracking-[0.25em] uppercase opacity-0">


          </span>

          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[0.98] md:leading-[0.95] tracking-tight text-[#0D0D39] opacity-0"
          >
            Catalyzing growth in <br className="hidden md:inline" />
            speciality chemicals
          </h1>

          <p
            ref={subtextRef}
            className="text-lg md:text-xl text-brand-text-muted leading-relaxed font-light font-sans max-w-2xl opacity-0"
          >
            A premier manufacturer and exporter of speciality agrochemicals, dyes, and pharmaceutical intermediates, delivering world-class custom synthesis solutions.
          </p>

          <div ref={ctaRef} className="pt-2 flex items-center space-x-4 opacity-0">
            <Link href="/about" className="inline-flex items-center gap-3 px-8 py-3.5 border border-[#0D0D39] text-[#0D0D39] text-[13px] font-bold uppercase tracking-[0.1em] rounded-full hover:bg-[#0D0D39]/5 transition-all duration-300 group">
              <span>Explore Our Journey</span>
              <span className="flex items-center justify-center bg-[#0D0D39]/10 rounded-full p-1.5 transition-all duration-300 group-hover:translate-x-1">
                <svg className="h-4 w-4 text-[#0D0D39]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link href="/products/speciality-chemicals" className="inline-flex items-center gap-2 px-6 py-3 border border-black/15 text-black text-xs font-semibold uppercase tracking-[0.1em] rounded-full hover:bg-black/5 transition-all duration-300">
              <span>View Products</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60 animate-bounce">
        <span className="text-[9px] uppercase tracking-widest text-[#0D0D39] font-semibold">Scroll Down</span>
        <svg className="h-4 w-4 text-[#0D0D39]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
