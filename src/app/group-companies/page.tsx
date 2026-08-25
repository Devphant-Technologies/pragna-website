"use client";

import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageBanner from '@/components/ui/PageBanner';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GroupCompanies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedLoc, setSelectedLoc] = useState<'ALL' | 'ANKLESHWAR' | 'DAHEJ' | 'PANOLI'>('ALL');

  const companies = [
    { name: 'PRAGNA CHEMICAL INDUSTRIES', loc: 'ANKLESHWAR', since: '1999', desc: 'Manufacturing of Dyes & Intermediates', address: 'Plot No.2303/A, GIDC Estate, Ankleshwar-393002.', logo: '/assets/pragna_chemical_industries.png' },
    { name: 'PRAGNA DYECHEM PVT LTD', loc: 'ANKLESHWAR', since: '2006', desc: 'Manufacturing of Bulk Drugs & Speciality Chemicals & Intermediates', address: 'Plot No.1210, GIDC Estate, Ankleshwar-393002.', logo: '/assets/pragna_dyechem.png' },
    { name: 'PRAGNA LIFE SCIENCE LLP', loc: 'PANOLI', since: '2012', desc: 'Manufacturing of Speciality & Fine Chemicals & Intermediates', address: 'Plot No.409/B/2, GIDC Estate, Panoli - 394116.', logo: '/assets/pragna_life_science.png' },
    { name: 'PRAGNA PHARMA PVT LTD', loc: 'DAHEJ', since: '2017', desc: 'Manufacturing of Speciality & Fine Chemicals & Agro Chemicals Intermediates', address: 'Plot No.D2/CH/224 & D2/CH/224/1 GIDC, DAHEJ-2, Near Jolva, Tal-Vagra, Dist-Bharuch-392130.', logo: '/assets/pragna_pharma_pvt_ltd.png' },
    { name: 'GREEN LEAF CHEM TECH PVT LTD', loc: 'DAHEJ', since: '2021', desc: 'Manufacturing of Pharma & Pharma Intermediates', address: 'Plot No.D2/CH/231 & D2/CH/232 GIDC, DAHEJ-2, Near Jolva, Tal-Vagra, Dist-Bharuch-392130.', logo: '/assets/green_leaf_tech_logo.png' },
    { name: 'PRAGNA CHEM TECH PVT LTD', loc: 'ANKLESHWAR', since: '2022', desc: 'Manufacturing of Dyes & Intermediates', address: 'Plot No.707/D, GIDC Estate, Ankleshwar-393002.', logo: '/assets/pragna_group.png' },
    { name: 'PRAGNA SPECIALITY PVT LTD', loc: 'DAHEJ', since: '2023', desc: 'Manufacturing of Speciality & Agro Chemicals', address: 'Plot No.D2/CH/223 GIDC, DAHEJ-2, Near Jolva, Tal-Vagra, Dist-Bharuch-392130.', logo: '/assets/pragna_speciality.png' },
    { name: 'SHREE RAMKRISHNA CHEM TECH PVT LTD', loc: 'DAHEJ', since: '2023', desc: 'Manufacturing of Pharma & Pharma Intermediates', address: 'Plot No.D2/CH/170/1 GIDC, DAHEJ-2, Near Jolva, Tal-Vagra, Dist-Bharuch-392130.', logo: '/assets/pragna_group.png' },
    { name: 'PRAGNA FINE CHEM PVT LTD', loc: 'DAHEJ', since: '2023', desc: 'Manufacturing of Chemical, Petrochemical & Pharma Intermediates', address: 'Plot No.D2/CH/149/4 GIDC, DAHEJ-2, Near Jolva, Tal-Vagra, Dist-Bharuch-392130.', logo: '/assets/pragna_group.png' },
  ];

  // Re-trigger entrance animation when cards layout mount or filter shifts
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!gridRef.current) return;
      const cards = gridRef.current.children;
      
      // Kill any active triggers before animating to prevent overlaps
      ScrollTrigger.getAll().forEach(t => t.kill());

      gsap.fromTo(
        cards,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [selectedLoc]);

  const filteredCompanies = selectedLoc === 'ALL'
    ? companies
    : companies.filter(c => c.loc.toUpperCase() === selectedLoc);

  const locations: ('ALL' | 'ANKLESHWAR' | 'DAHEJ' | 'PANOLI')[] = ['ALL', 'ANKLESHWAR', 'DAHEJ', 'PANOLI'];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main ref={containerRef} className="flex-grow bg-[#FDF8F5] text-foreground transition-colors duration-300 pb-24 font-sans">
        <style dangerouslySetInnerHTML={{ __html: `
          .flip-card-container {
            perspective: 1000px;
          }
          .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            transform-style: preserve-3d;
          }
          .flip-card-container:hover .flip-card-inner {
            transform: rotateY(180deg);
          }
          .flip-card-front, .flip-card-back {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          .flip-card-back {
            transform: rotateY(180deg);
          }
        ` }} />

        {/* Banner */}
        <PageBanner
          title="Group of Companies"
          subtitle="9 dedicated entities providing world-class industrial chemical solutions"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Group of Companies' }
          ]}
        />

        {/* Filter Tabs Section */}
        <section className="max-w-[1200px] mx-auto px-4 mt-8 relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 py-2 border-b border-slate-200/50 dark:border-white/5 mb-10 select-none">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLoc(loc)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedLoc === loc
                    ? 'bg-[#0575D7] text-white shadow-md shadow-[#0575D7]/20 border border-transparent scale-102'
                    : 'bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5 text-[#0D0D39] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80'
                }`}
              >
                {loc === 'ALL' ? 'All Entities' : loc}
              </button>
            ))}
          </div>
        </section>

        {/* Grid List */}
        <section className="max-w-[1200px] mx-auto px-4 relative z-10">
          <div
            ref={gridRef}
            key={selectedLoc}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCompanies.map((comp, i) => (
              <div
                key={comp.name}
                className="flip-card-container w-full h-[360px] group opacity-0"
              >
                <div className="flip-card-inner">
                  {/* Front Side */}
                  <div className="flip-card-front bg-white dark:bg-slate-900/40 rounded-[24px] border border-slate-200/50 dark:border-white/5 p-6 md:p-8 flex flex-col justify-between shadow-lg group-hover:shadow-2xl overflow-hidden relative">
                    {/* Top Accent Gradient Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0575D7] via-[#29B6F6] to-[#7EC242]"></div>

                    <div className="space-y-6">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-white/5">
                          Est. {comp.since}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest text-[#7EC242] bg-[#7EC242]/5 border border-[#7EC242]/20">
                          {comp.loc}
                        </span>
                      </div>

                      {/* Main Title & Description */}
                      <div className="space-y-2">
                        <h3 className="font-bold text-base text-[#0D0D39] dark:text-white leading-snug tracking-tight">
                          {comp.name}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed font-light font-sans">
                          {comp.desc}
                        </p>
                      </div>
                    </div>

                    {/* Address Block */}
                    <div className="pt-5 border-t border-slate-200/60 dark:border-white/5 flex items-start space-x-3 text-xs text-slate-500 dark:text-slate-400 font-light font-sans mt-6">
                      <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-[#0575D7]">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                      </div>
                      <span className="leading-snug pt-1">{comp.address}</span>
                    </div>
                  </div>

                  {/* Back Side (Shows Logo) */}
                  <div className="flip-card-back bg-white dark:bg-slate-900/40 rounded-[24px] border border-slate-200/50 dark:border-white/5 p-6 flex flex-col items-center justify-center shadow-lg group-hover:shadow-2xl overflow-hidden relative">
                    {/* Top Accent Gradient Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7EC242] via-[#29B6F6] to-[#0575D7]"></div>

                    <div className="flex flex-col items-center justify-center text-center space-y-4">
                      {/* Logo (Direct Larger Rendering) */}
                      <img
                        src={comp.logo}
                        alt={`${comp.name} Logo`}
                        className="h-24 w-52 object-contain filter group-hover:scale-105 transition-transform duration-300 dark:brightness-110"
                      />
                      
                      <div className="space-y-1">
                        <p className="font-bold text-xs text-[#0D0D39] dark:text-white tracking-wider max-w-[200px] leading-tight">
                          {comp.name}
                        </p>
                        <p className="text-[9px] text-[#7EC242] uppercase tracking-widest font-bold font-mono">
                          {comp.loc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
