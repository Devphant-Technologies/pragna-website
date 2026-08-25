"use client";

import { useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageBanner from '@/components/ui/PageBanner';
import SectionHeader from '@/components/ui/SectionHeader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ManufacturingFacilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const extraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Overview section staggers
      if (overviewRef.current) {
        const panels = overviewRef.current.querySelectorAll('.facility-card');
        gsap.fromTo(
          panels,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: overviewRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Capabilities staggers
      if (statsRef.current) {
        const leftPanel = statsRef.current.querySelector('.capabilities-panel');
        const rightPanel = statsRef.current.querySelector('.etp-panel');

        gsap.fromTo(
          leftPanel,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.fromTo(
          rightPanel,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const infrastructure = [
    { label: 'Total Industrial Area', value: '3,00,000 Sq. mtr', icon: '📐' },
    { label: 'Total Production Volume', value: '2000 kL', icon: '🛢️' },
    { label: 'Stainless Steel Reactors (SSR)', value: '4 kL to 12.5 kL', icon: '⚛️' },
    { label: 'Glass-Lined Reactors (GLR)', value: '3 kL to 20 kL', icon: '🧪' },
    { label: 'Hydrogenation Reactors', value: '4 kL to 10 kL (20-40 Bar)', icon: '🌪️' },
  ];

  const utilities = [
    { label: 'Chilling Capacity', value: 'Down to -30°C', icon: '❄️' },
    { label: 'Cooling Capacity', value: 'Down to 10°C', icon: '💧' },
    { label: 'Steam Utility (LPS)', value: 'Up to 130°C', icon: '💨' },
    { label: 'Thermic Fluid Heater', value: 'Up to 250°C', icon: '🔥' },
    { label: 'Nitrogen Utility', value: 'In-house generation', icon: '🎈' },
  ];

  const capabilities = [
    'Chlorination', 'Bromination', 'Coupling Reaction', 'Condensation Reaction',
    'Grignard Reactions', 'Hydrogenation Reaction', 'Friedel-Crafts Alkylation',
    'Photochemical Reactions', 'Catalytic Reaction', 'Amination', 'Oxidation', 'Nitration',
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main ref={containerRef} className="flex-grow bg-[#FDF8F5] text-foreground transition-colors duration-300 pb-24">
        {/* Banner */}
        <PageBanner
          title="Manufacturing Facilities"
          subtitle="High-capacity infrastructure supporting custom synthesis and toll manufacturing"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Company', href: '/about' },
            { label: 'Manufacturing Facilities' }
          ]}
        />

        {/* Facilities Overview */}
        <section ref={overviewRef} className="max-w-[1400px] mx-auto px-4 py-16 -mt-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Infrastructure Grid */}
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold dark:text-white text-slate-900 flex items-center space-x-2.5 font-serif">
                <span>🏭</span>
                <span>Assets & Equipment Details</span>
              </h2>
              <div className="w-14 h-1 rounded-full bg-gradient-to-r from-brand-mint to-brand-cyan"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {infrastructure.map((inf, i) => (
                  <div
                    key={i}
                    className="facility-card p-6 dark:bg-[#0B1626]/50 bg-white/70 border dark:border-white/5 border-slate-200 rounded-2xl space-y-3 shadow-lg hover:border-brand-mint/30 hover:scale-[1.03] transition-all duration-350 opacity-0 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-mint/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="text-3xl dark:bg-slate-900/60 bg-slate-100 p-2 rounded-xl inline-block group-hover:scale-110 transition-transform">{inf.icon}</span>
                    <div>
                      <p className="dark:text-slate-500 text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">{inf.label}</p>
                      <p className="dark:text-white text-slate-900 font-bold text-base font-serif">{inf.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Utilities Grid */}
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold dark:text-white text-slate-900 flex items-center space-x-2.5 font-serif">
                <span>⚡</span>
                <span>Industrial Utilities</span>
              </h2>
              <div className="w-14 h-1 rounded-full bg-gradient-to-r from-brand-mint to-brand-cyan"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {utilities.map((ut, i) => (
                  <div
                    key={i}
                    className="facility-card p-6 dark:bg-[#0B1626]/50 bg-white/70 border dark:border-white/5 border-slate-200 rounded-2xl space-y-3 shadow-lg hover:border-brand-mint/30 hover:scale-[1.03] transition-all duration-350 opacity-0 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-mint/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="text-3xl dark:bg-slate-900/60 bg-slate-100 p-2 rounded-xl inline-block group-hover:scale-110 transition-transform">{ut.icon}</span>
                    <div>
                      <p className="dark:text-slate-500 text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">{ut.label}</p>
                      <p className="dark:text-white text-slate-900 font-bold text-base font-serif">{ut.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Capabilities and Focus */}
        <section ref={statsRef} className="max-w-[1400px] mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Reaction Capabilities */}
            <div className="capabilities-panel lg:col-span-2 glass-card p-8 rounded-2xl border dark:border-white/5 border-slate-200 shadow-2xl space-y-6 opacity-0">
              <h3 className="font-bold dark:text-white text-slate-900 text-xl flex items-center space-x-2.5 font-serif">
                <span>⚗️</span>
                <span>Process Reaction Capabilities</span>
              </h3>
              <p className="dark:text-brand-text-muted text-slate-600 text-sm leading-relaxed font-light">
                Our facilities are engineered to carry out complex chemical transformations under high safety and thermal limits, including high-pressure hydrogenation, chlorination, and low-temperature chilling reactions.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {capabilities.map((cap, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2 dark:bg-slate-900/40 bg-slate-50 px-4 py-3.5 rounded-xl border dark:border-white/5 border-slate-200 text-xs font-semibold dark:text-slate-300 text-slate-700 hover:border-brand-mint/20 transition-all duration-300 shadow-sm"
                  >
                    <span className="text-brand-mint font-bold">•</span>
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Effluent Treatment Plant */}
            <div className="etp-panel lg:col-span-1 glass-card dark:text-white text-slate-800 p-8 rounded-2xl border dark:border-white/5 border-slate-200 shadow-2xl flex flex-col justify-between hover:border-brand-mint/20 transition-all duration-300 opacity-0 group relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-mint/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="space-y-5">
                <span className="text-4xl dark:bg-slate-900/50 bg-slate-50 p-2.5 rounded-xl inline-block group-hover:scale-110 transition-transform">🌱</span>
                <h3 className="font-bold text-lg dark:text-white text-slate-900 font-serif">Environmental Compliance</h3>
                <p className="dark:text-brand-text-muted text-slate-600 text-sm leading-relaxed font-light">
                  We own and operate our own Effluent Treatment Plant (ETP) that fully complies with state pollution control board norms and statutory environmental requirements.
                </p>
                <p className="dark:text-brand-text-muted text-slate-600 text-sm leading-relaxed font-light">
                  Green process technology is utilized across all reaction lines to reduce waste and recycle key catalysts wherever possible.
                </p>
              </div>
              <div className="pt-8 border-t dark:border-white/5 border-slate-200 text-brand-mint text-xs font-bold uppercase tracking-wider font-mono">
                Zero Discharge Standards
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
