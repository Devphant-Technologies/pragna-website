"use client";

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageBanner from '@/components/ui/PageBanner';
import { Sun, Leaf, Droplets, Zap, Plus, Minus } from 'lucide-react';

interface Initiative {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  imageSrc: string;
}

export default function Sustainability() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const initiatives: Initiative[] = [
    {
      id: 'solar-power',
      title: 'Renewable Energy from Captive Solar Power',
      shortDesc: 'Capturing solar energy to power clean operations.',
      longDesc: 'We have invested heavily in captive solar installations, leveraging sustainable solar power grids to fulfill our electricity requirements. This significantly reduces our reliance on grid power generated from fossil fuels, contributing to a cleaner national energy footprint.',
      icon: <Sun size={24} />,
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-500',
      imageSrc: '/assets/solar.jpg',
    },
    {
      id: 'carbon-footprint',
      title: 'Lower Carbon Footprint through Green Manufacturing',
      shortDesc: 'Optimizing synthesis processes for lower emissions.',
      longDesc: 'Through catalytic synthesis, optimized thermal systems, and modern process chemistry, we minimize thermal load and fuel usage. Our operations prioritize decarbonization pathways to ensure maximum output with minimal atmospheric emissions.',
      icon: <Zap size={24} />,
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-550',
      imageSrc: '/assets/green-manufacturing.jpg',
    },
    {
      id: 'water-recycling',
      title: 'In-House Water Treatment & Water Recycling',
      shortDesc: 'Committed to Zero Liquid Discharge standards.',
      longDesc: 'Water is a vital resource. We utilize our custom Effluent Treatment Plant (ETP) and advanced recycling facilities to recycle process water. Our zero-liquid-discharge philosophy ensures treated water is re-fed back into utility and plant lines.',
      icon: <Droplets size={24} />,
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-500',
      imageSrc: '/assets/water-management.jpeg',
    },
    {
      id: 'social-forestry',
      title: 'Tree Plantation for Social Forestry & Greener Communities',
      shortDesc: 'Nurturing the ecosystem surrounding our hubs.',
      longDesc: 'We proactively participate in massive tree plantation drives across GIDC industrial regions and municipal surroundings. By cultivating green corridors and social forests, we enhance local biodiversity and establish natural carbon sinks.',
      icon: <Leaf size={24} />,
      iconBg: 'bg-green-500/10',
      iconColor: 'text-green-550',
      imageSrc: '/assets/tree-plantation.jpg',
    }
  ];

  const handleImageError = (id: string) => {
    setImageError(prev => ({ ...prev, [id]: true }));
  };

  const currentActiveInit = initiatives[activeIndex];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Main Container set to White background and slate-800 text */}
      <main className="flex-grow bg-white text-slate-800 pb-28 font-sans">
        {/* Banner */}
        <PageBanner
          title="Sustainability Initiatives"
          subtitle="Commitment to eco-conscious chemistry, renewable energy, and community forestry"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Company', href: '/about' },
            { label: 'Sustainability' }
          ]}
        />

        {/* Content Section (No wrapper card, direct white background) */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8 relative z-10">
          <div className="space-y-16">

            {/* Header section with Pragna context */}
            <div className="text-center max-w-4xl mx-auto space-y-4 mb-12">
              <span className="inline-flex items-center space-x-2 text-[11px] font-bold text-brand-mint tracking-[0.25em] uppercase">
                <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse"></span>
                <span>Our Green Commitment</span>
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0D0D39] font-serif leading-[1.15] tracking-tight">
                Pioneering sustainable chemical solutions for global industries
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-light leading-relaxed max-w-3xl mx-auto pt-2">
                We integrate green process engineering, zero liquid discharge effluent treatment, and captive solar installations to support environmental compliance and sustainable growth.
              </p>
              <div className="w-full max-w-md h-px bg-slate-200 mx-auto mt-6"></div>
            </div>

            {/* Split Screen Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

              {/* Left Column: Big active image view + thumbnails below it */}
              <div className="lg:col-span-6 space-y-6">
                {/* Main Large Graphic Screen */}
                <div className="relative w-full aspect-square rounded-[32px] overflow-hidden border border-slate-200 shadow-xl bg-slate-50 flex items-center justify-center">

                  {/* Dynamic image loading with key-trigger fade-in animation */}
                  {!imageError[currentActiveInit.id] ? (
                    <img
                      key={currentActiveInit.id}
                      src={currentActiveInit.imageSrc}
                      alt={currentActiveInit.title}
                      onError={() => handleImageError(currentActiveInit.id)}
                      className="w-full h-full object-cover animate-fade-in transition-all duration-500"
                    />
                  ) : (
                    /* Fallback SVG illustration */
                    <div
                      key={`fallback-${currentActiveInit.id}`}
                      className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-brand-cyan/5 to-transparent flex flex-col items-center justify-center p-8 text-center space-y-4 animate-fade-in"
                    >
                      <div className={`p-6 rounded-full bg-white border border-slate-100 shadow-xl ${currentActiveInit.iconColor} animate-bounce`}>
                        {currentActiveInit.icon}
                      </div>
                      <h4 className="text-base font-bold text-slate-800 font-serif">{currentActiveInit.title}</h4>
                      <p className="text-xs text-slate-500 max-w-xs">{currentActiveInit.shortDesc}</p>
                    </div>
                  )}
                </div>

                {/* Thumbnails Row below the main active preview image */}
                <div className="flex items-center gap-4 py-2">
                  {initiatives.map((init, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <button
                        key={init.id}
                        onClick={() => setActiveIndex(i)}
                        className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer shadow-md shrink-0 hover:scale-105 ${isActive
                            ? 'border-brand-mint scale-102 ring-2 ring-brand-mint/20'
                            : 'border-slate-200 hover:border-slate-300'
                          }`}
                      >
                        {!imageError[init.id] ? (
                          <img
                            src={init.imageSrc}
                            alt={init.title}
                            onError={() => handleImageError(init.id)}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                            {init.icon}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Accordion structure of all 4 initiatives */}
              <div className="lg:col-span-6 space-y-6">
                <div className="divide-y divide-slate-150">
                  {initiatives.map((init, i) => {
                    const isOpen = i === activeIndex;
                    return (
                      <div
                        key={init.id}
                        className="py-6 first:pt-0 last:pb-0 transition-all duration-300"
                      >
                        {/* Title trigger */}
                        <div
                          className="flex items-start justify-between gap-4 cursor-pointer select-none group"
                          onClick={() => setActiveIndex(i)}
                        >
                          <h3 className={`text-xl md:text-2xl font-serif font-bold transition-colors leading-[1.25] ${isOpen ? 'text-[#0575D7]' : 'text-slate-800 group-hover:text-[#0575D7]'
                            }`}>
                            {init.title}
                          </h3>
                        </div>

                        {/* Collapsible content area */}
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[300px] opacity-100 mt-4' : 'max-h-0 opacity-0 pointer-events-none'
                          }`}>
                          <div className="space-y-4">
                            <p className="text-slate-600 text-sm md:text-base leading-[1.65] font-light font-sans">
                              {init.longDesc}
                            </p>
                          </div>
                        </div>

                        {/* Custom +/- indicator action link */}
                        <div className="mt-2">
                          <button
                            onClick={() => setActiveIndex(i)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase cursor-pointer transition-colors duration-300 text-[#0575D7] hover:text-[#0D0D39]"
                          >
                            {isOpen ? (
                              <>
                                <Minus size={12} className="stroke-[3]" />
                                <span>Read Less</span>
                              </>
                            ) : (
                              <>
                                <Plus size={12} className="stroke-[3]" />
                                <span>Read More</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>


              </div>

            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
