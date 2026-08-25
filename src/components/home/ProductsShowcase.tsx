"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/ui/SectionHeader';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProductsShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!cardsRef.current) return;
      const cards = cardsRef.current.children;
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const exhibitions = [
    {
      id: 'trade-summit',
      name: 'Agribusiness Global Trade Summit',
      date: '05-06 August 2026',
      stall: 'STALL NO. 203',
      location: 'Las Vegas, Nevada, USA',
      logo: '/assets/trade_summit_logo.png',
      glowColor: 'group-hover:bg-emerald-500/10',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
      accentBar: 'from-emerald-400 to-teal-500',
    },
    {
      id: 'cphi-india',
      name: 'CPHI Delhi',
      date: '23-25 November 2026',
      stall: 'STALL NO. 1G54',
      location: 'IICC, Delhi, India',
      logo: '/assets/cphi_india_logo.png',
      glowColor: 'group-hover:bg-blue-500/10',
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',
      accentBar: 'from-blue-400 to-indigo-500',
    },
    {
      id: 'cphi-china',
      name: 'CPHI China',
      date: '16-18 June 2027',
      stall: 'Hall no. 5.2 (52J33)',
      location: 'National Exhibition and Convention Center, Shanghai, China',
      logo: '/assets/cphi_china_logo.png',
      glowColor: 'group-hover:bg-red-500/10',
      tagColor: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',
      accentBar: 'from-red-400 to-rose-500',
    }
  ];

  return (
    <section ref={sectionRef} className="pt-10 pb-28 bg-[#FDF8F5] relative overflow-hidden font-sans">
      {/* Background glow orb */}
      <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-brand-mint/[0.02] blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-20">
          <SectionHeader
            badge="Global Presence"
            title="Meet Us at"
            highlight="Global Events"
            subtitle="We participate in leading international exhibitions and summits to engage with global industry leaders and showcase our process chemistry capabilities."
            align="center"
          />
        </div>

        {/* Exhibition Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {exhibitions.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-slate-900/40 rounded-[24px] border border-slate-200/50 dark:border-white/5 p-6 md:p-8 flex flex-col justify-between min-h-[380px] opacity-0 group relative overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 z-10"
            >
              {/* Center-expanding hover background */}
              <div className="absolute inset-0 bg-[#0D0D39] rounded-[24px] scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-center z-0 pointer-events-none" />

              {/* Radial Blur Glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${event.glowColor} z-0`}></div>
              
              {/* Top Accent Line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${event.accentBar} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-10`}></div>

              <div className="space-y-6 relative z-10">
                {/* Logo (Direct Larger Rendering) */}
                <div className="flex justify-center select-none py-2">
                  <img
                    src={event.logo}
                    alt={`${event.name} Logo`}
                    className="h-20 w-auto object-contain filter group-hover:scale-105 transition-transform duration-300 dark:brightness-110"
                  />
                </div>

                {/* Event Name */}
                <h3 className="text-lg font-bold text-[#0D0D39] dark:text-white group-hover:text-white leading-tight transition-colors duration-300">
                  {event.name}
                </h3>

                {/* Details List */}
                <div className="space-y-3.5 font-sans pt-1">
                  {/* Date Tag */}
                  <div className="flex items-center space-x-3 text-xs text-slate-600 group-hover:text-slate-200 dark:text-slate-350 transition-colors duration-300">
                    <svg className="h-4.5 w-4.5 text-[#0575D7] group-hover:text-[#7EC242] shrink-0 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-semibold text-sm">{event.date}</span>
                  </div>

                  {/* Stall Tag */}
                  <div className="flex items-center space-x-3 text-xs text-slate-650 group-hover:text-slate-200 dark:text-slate-350 transition-colors duration-300">
                    <svg className="h-4.5 w-4.5 text-[#7EC242] group-hover:text-[#29B6F6] shrink-0 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="font-bold text-[#0D0D39] group-hover:text-white dark:text-slate-200 text-sm transition-colors duration-300">{event.stall}</span>
                  </div>
                </div>
              </div>

              {/* Location Block */}
              <div className="pt-5 border-t border-slate-200/60 dark:border-white/5 flex items-start space-x-2.5 text-xs text-slate-550 group-hover:text-slate-300 dark:text-slate-400 font-light font-sans relative z-10 mt-6 shrink-0 transition-colors duration-300">
                <div className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-white/10 flex items-center justify-center shrink-0 text-[#0575D7] group-hover:text-[#29B6F6] transition-colors duration-300">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <span className="leading-snug pt-0.5">{event.location}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
