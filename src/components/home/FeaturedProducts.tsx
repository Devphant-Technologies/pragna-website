"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/ui/SectionHeader';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const productDomains = [
  {
    id: 'speciality-chemicals',
    name: 'Speciality Chemicals',
    subtitle: 'Agro Intermediates',
    desc: 'High-precision chlorination and bromination organic synthesis derivatives designed as precursors for advanced crop protection systems, herbicides, and bactericidal formulations.',
    link: '/products/speciality-chemicals',
    image: 'https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&q=80&w=600',
    badgeColor: 'bg-brand-mint/10 text-brand-mint border border-brand-mint/20',
    glow: 'shadow-[0_0_40px_rgba(126,194,66,0.06)]'
  },
  {
    id: 'dyes-intermediates',
    name: 'Dyes Intermediates',
    subtitle: 'Pharma Intermediates',
    desc: 'Anthraquinone and high-purity meta-dinitrobenzene (MDNB) export grade derivatives supporting global color systems, prints, and custom organic synthesis formulations.',
    link: '/products/dyes-intermediates',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=600',
    badgeColor: 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20',
    glow: 'shadow-[0_0_40px_rgba(41,182,246,0.06)]'
  },
  {
    id: 'api-intermediates',
    name: 'API Intermediates',
    subtitle: 'Bulk Actives & Intermediates',
    desc: 'Export-grade resolved chiral intermediates, epoxide building blocks, and precursors for advanced pharmaceuticals including Nebivolol API hydrochloride.',
    link: '/products/api-intermediates',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600',
    badgeColor: 'bg-purple-500/10 text-purple-650 border border-purple-500/20',
    glow: 'shadow-[0_0_40px_rgba(168,85,247,0.06)]'
  },
  {
    id: 'agro-chemical-technical',
    name: 'Agro Chemical Technical',
    subtitle: 'Plant Regulators',
    desc: 'Technical grade broad-spectrum systemic insecticides, active crop protection ingredients, and highly specialized growth regulators designed to optimize yield and durability.',
    link: '/products/agro-chemical-technical',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
    badgeColor: 'bg-orange-500/10 text-orange-655 border border-orange-500/20',
    glow: 'shadow-[0_0_40px_rgba(249,115,22,0.06)]'
  }
];

export default function FeaturedProducts() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!triggerRef.current || !containerRef.current) return;

    // Smooth scroll trigger tracking progress through the 300vh track
    const scrub = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress * 3.8);
      }
    });

    return () => scrub.kill();
  }, []);

  const activeIndex = Math.min(productDomains.length - 1, Math.round(scrollProgress));

  return (
    <div ref={triggerRef} className="relative h-[300vh] bg-white w-full" id="featured-domains-section">
      {/* CSS custom variable inject block */}
      <style>{`
        #featured-domains-section {
          --card-height: 330px;
        }
        @media (min-width: 1024px) {
          #featured-domains-section {
            --card-height: 360px;
          }
        }
      `}</style>

      {/* Sticky container that stays in viewport while scrolling trigger */}
      <div ref={containerRef} className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-white">
        
        {/* Background decorations */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-mint/15 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/15 to-transparent"></div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          {/* Section Header */}
          <div className="mb-8 lg:mb-12">
            <SectionHeader
              badge="Featured Portfolio"
              title="Our Domain"
              highlight="Expertise"
              subtitle="We provide export-grade chemical solutions across multiple high-precision domains, certified by leading regulatory agencies."
              align="center"
            />
          </div>

          {/* Layout Grid: 50% left for images, 50% right for text info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left Half: Clean, modern vertical translating images showcase */}
            <div className="w-full flex justify-center items-center">
              <div className="relative w-full max-w-[450px] h-[300px] lg:h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 bg-slate-50">
                <div 
                  className="absolute inset-0 flex flex-col w-full h-full"
                  style={{ 
                    transform: `translateY(calc(-${scrollProgress} * 100% / ${productDomains.length}))`,
                    height: `${productDomains.length * 100}%`
                  }}
                >
                  {productDomains.map((domain) => (
                    <div key={domain.id} className="relative w-full h-full flex-1">
                      <img 
                        src={domain.image} 
                        alt={domain.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {/* Subtle dark overlay for premium contrast */}
                      <div className="absolute inset-0 bg-black/5" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Half: Dynamic Parallax Card Slot */}
            <div className="w-full flex flex-col justify-center">
              <div className="relative h-[var(--card-height)] w-full max-w-xl mx-auto lg:mx-0 flex items-center">
                
                {productDomains.map((domain, index) => {
                  const distance = Math.abs(scrollProgress - index);
                  const isActive = index === activeIndex;

                  // Show information only when corresponding image is close to center
                  // Completely hidden if distance is >= 0.35
                  const opacity = distance < 0.1 
                    ? 1 
                    : Math.max(0, 1 - (distance - 0.1) / 0.25);

                  // Parallax translation: card slides up slightly as scroll advances
                  const translateY = (index - scrollProgress) * 35;

                  if (opacity <= 0) return null;

                  return (
                    <div 
                      key={domain.id} 
                      className="absolute inset-x-0 w-full transition-shadow duration-300"
                      style={{
                        opacity: opacity,
                        transform: `translateY(${translateY}px)`,
                        pointerEvents: isActive ? 'auto' : 'none'
                      }}
                    >
                      <div className={`p-6 lg:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-lg ${domain.glow} transition-all duration-300`}>
                        {/* Domain Index & Badge */}
                        <div className="flex items-center space-x-3 mb-3">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${domain.badgeColor}`}>
                            {domain.subtitle}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            0{index + 1} / 0{productDomains.length}
                          </span>
                        </div>

                        {/* Domain Title */}
                        <h3 className="text-xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mb-3 font-sans">
                          {domain.name}
                        </h3>

                        {/* Description */}
                        <p className="text-xs lg:text-base leading-relaxed font-light text-slate-655 mb-5">
                          {domain.desc}
                        </p>

                        {/* Explore Link */}
                        <div>
                          <Link
                            href={domain.link}
                            className="inline-flex items-center space-x-2.5 px-6 py-2.5 lg:py-3 rounded-full bg-brand-mint text-black text-xs font-bold uppercase tracking-widest hover:bg-brand-mint-light transition-all shadow-md hover:shadow-brand-mint/15 hover:-translate-y-0.5"
                          >
                            <span>Explore Products</span>
                            <span className="flex items-center justify-center p-0.5 rounded-full bg-black/10">
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
