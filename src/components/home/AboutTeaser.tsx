"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current, { x: -60, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(rightRef.current, { x: 60, opacity: 0, scale: 0.9 }, {
        x: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pt-10 pb-28 bg-[#FDF8F5] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(126,194,66,0.5) 1px, transparent 0)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left — Text */}
          <div ref={leftRef} className="lg:col-span-7 space-y-6 opacity-0">
            <span className="inline-flex items-center space-x-2 text-xs font-bold text-brand-mint tracking-[0.25em] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-mint blink-dot"></span>
              <span>About Pragna Group</span>
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-black leading-tight">
              Innovative process chemistry for <span className="text-brand-cyan">sustainable solutions</span>
            </h2>
            <div className="w-14 h-1 rounded-full bg-gradient-to-r from-brand-mint to-brand-cyan"></div>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed font-light">
              Since 1999, Pragna Group has been at the forefront of chemical manufacturing, delivering high-purity speciality intermediates, dyes, and bulk API precursors to clients globally. With state-of-the-art research centers and eco-conscious engineering practices, we solve complex synthesis challenges seamlessly.
            </p>
            <div className="pt-3">
              <Link href="/about" className="btn-primary">
                <span>Explore Our Journey</span>
                <span className="flex items-center justify-center bg-brand-blue/15 rounded-full p-1.5">
                  <svg className="h-3.5 w-3.5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Right — Image Composition */}
          <div ref={rightRef} className="lg:col-span-5 flex justify-center opacity-0">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              <div className="absolute inset-[-15px] border border-brand-cyan/15 rounded-full animate-spin-slow pointer-events-none"></div>
              <div className="absolute inset-[-30px] border border-brand-mint/8 rounded-full pointer-events-none"></div>
              <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-brand-cyan/15 glow-blue">
                <video
                  src="/assets/molecule_video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-xl animate-float">
                <span className="text-2xl font-bold text-brand-mint">25+</span>
                <span className="text-xs text-slate-600 block">Years of Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
