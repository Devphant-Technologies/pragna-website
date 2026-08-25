"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeatureCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple header fade-in when showing
      const headerElements = [badgeRef.current, headingRef.current, lineRef.current].filter(Boolean);
      gsap.fromTo(headerElements, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
      });

      if (!cardsRef.current) return;
      const cards = cardsRef.current.children;
      gsap.fromTo(cards, { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      icon: (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Quality Assurance',
      desc: 'Every product undergoes rigorous testing with purity levels above 99% through GC, HPLC, and KF analysis methods, meeting global pharmacopeia standards.',
    },
    {
      icon: (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: 'Innovation & R&D',
      desc: 'Dedicated laboratories engaged in process development, process optimization, and new chemical entity screening from conceptualization to commercialization.',
    },
    {
      icon: (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Sustainability',
      desc: 'Green process technologies, zero-compromise environmental standards, and eco-conscious engineering practices driving decarbonization across operations.',
    },
  ];

  return (
    <section ref={sectionRef} className="pt-10 pb-28 bg-[#FDF8F5] relative overflow-hidden">
      <div className="absolute top-20 left-[5%] w-96 h-96 rounded-full bg-brand-mint/[0.02] blur-[120px]"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span ref={badgeRef} className="inline-flex items-center space-x-2 text-xs font-bold text-brand-mint tracking-[0.25em] uppercase opacity-0">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-mint blink-dot"></span>
            <span>Our Pillars</span>
          </span>
          <h2 ref={headingRef} className="text-3xl md:text-5xl font-bold text-black mt-4 opacity-0 leading-tight tracking-tight">
            Built on <span className="text-brand-cyan">strong foundations</span>
          </h2>
          <div ref={lineRef} className="w-14 h-1 rounded-full bg-gradient-to-r from-brand-mint to-brand-cyan mx-auto mt-4 opacity-0"></div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover rounded-2xl p-10 flex flex-col space-y-6 opacity-0 group relative overflow-hidden z-10"
            >
              {/* Top-left expanding hover background */}
              <div className="absolute top-0 left-0 w-0 h-0 bg-[#E8F5E9] rounded-br-full group-hover:w-[300%] group-hover:h-[300%] transition-all duration-700 ease-out z-0 pointer-events-none" />

              {/* Top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-mint/0 via-brand-mint/50 to-brand-mint/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

              <div className="h-14 w-14 rounded-2xl bg-brand-mint/10 flex items-center justify-center text-brand-mint group-hover:bg-brand-mint group-hover:text-black transition-all duration-400 relative z-10">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold text-black group-hover:text-brand-cyan transition-colors duration-300 relative z-10">{pillar.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light flex-grow relative z-10">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
