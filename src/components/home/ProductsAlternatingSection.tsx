"use client";

import { useEffect, useRef } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import WoofyHoverImage from '@/components/lightswind/woofy-hover-image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProductsAlternatingSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      id: 'speciality-chemicals',
      titlePart1: 'Speciality',
      titlePart2: 'Chemicals & Agro Intermediates',
      desc: 'Bromination and chlorination derivatives tailored for advanced crop protection systems. We ensure the highest standard of chemical synthesis supporting global supply chains.',
      src: '/assets/speciality01.jpg',
      hoverSrc: '/assets/speciality02.jpg',
      link: '/products/speciality-chemicals'
    },
    {
      id: 'dyes-intermediates',
      titlePart1: 'Dyes & Pharma',
      titlePart2: 'Intermediates Portfolio',
      desc: 'Anthraquinone and nitrobenzene derivatives supporting world-class color, print systems, and pharmaceutical actives. Our high-precision refinement process yields supreme purity indices.',
      src: '/assets/dyes01.png',
      hoverSrc: '/assets/dyes02.jpg',
      link: '/products/dyes-intermediates'
    },
    {
      id: 'api-intermediates',
      titlePart1: 'API Intermediates',
      titlePart2: 'and Bulk Actives',
      desc: 'High-purity resolved chiral intermediates and epoxide building blocks specifically optimized for Nebivolol API hydrochloride and targeted medical products.',
      src: '/assets/api01.jpg',
      hoverSrc: '/assets/api02.jpg',
      link: '/products/api-intermediates'
    },
    {
      id: 'agro-chemical-technical',
      titlePart1: 'Agro Chemical',
      titlePart2: 'Technical & Plant Regulators',
      desc: 'Technical grade crop protection actives including broad-spectrum systemic insecticides and fungicides. Engineered for optimum field efficacy and safety profiles.',
      src: '/assets/plant02.png',
      hoverSrc: '/assets/plant02.jpg',
      link: '/products/agro-chemical-technical'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = containerRef.current?.querySelectorAll('.product-row');
      rows?.forEach((row) => {
        const image = row.querySelector('.product-image-container');
        const text = row.querySelector('.product-text-container');
        const isReverse = row.classList.contains('md:flex-row-reverse');
        
        gsap.fromTo(
          image,
          { x: isReverse ? 50 : -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        );

        gsap.fromTo(
          text,
          { x: isReverse ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-[#FDF8F5] relative overflow-hidden w-full">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-20 text-center">
          <SectionHeader
            badge="Product Portfolio"
            title="Our Specialty"
            highlight="Product Catalog"
            align="center"
          />
        </div>

        {/* Alternating Grid List */}
        <div className="space-y-24 md:space-y-36">
          {products.map((prod, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={prod.id}
                className={`product-row flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${
                  isEven ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Image Container */}
                <div className="product-image-container w-full md:w-1/2 opacity-0">
                  <div className="relative w-full rounded-[32px] overflow-hidden shadow-xl border border-slate-200/40 select-none">
                    <WoofyHoverImage
                      src={prod.src}
                      hoverSrc={prod.hoverSrc}
                      alt={`${prod.titlePart1} ${prod.titlePart2}`}
                      width="100%"
                      height="380px"
                      maskRadius={0.45}
                      turbulenceIntensity={0.25}
                    />
                  </div>
                </div>

                {/* Text Container */}
                <div className="product-text-container w-full md:w-1/2 opacity-0 space-y-5">
                  <h3 className="text-3xl sm:text-4xl font-sans tracking-tight leading-tight">
                    <span className="text-[#0575D7] font-light block sm:inline mr-2">
                      {prod.titlePart1}
                    </span>
                    <span className="text-[#0D0D39] font-bold">
                      {prod.titlePart2}
                    </span>
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-[14px] leading-relaxed font-light font-sans">
                    {prod.desc}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={prod.link}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#0575D7] uppercase tracking-wider hover:text-[#0D0D39] transition-colors group"
                    >
                      <span>Explore Category</span>
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
