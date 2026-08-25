"use client";

import { useRef } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import LogoLoop from '@/components/ui/LogoLoop';

export default function GroupCompanies() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const clientLogos = Array.from({ length: 9 }, (_, i) => ({
    src: `/assets/client${i + 1}.png`,
    alt: `Client ${i + 1}`,
    title: `Client ${i + 1}`,
  }));

  return (
    <section ref={sectionRef} className="py-28 dark:bg-[#050e1d] bg-slate-50 relative overflow-hidden">
      {/* Glow orb */}
      <div className="absolute top-[-10%] right-[10%] w-[400px] h-[400px] rounded-full bg-brand-cyan/[0.02] blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-6">
          <SectionHeader
            badge="Our Clients"
            title="Trusted by"
            highlight="Leading Businesses"
            align="left"
          />
        </div>

        {/* Logo Loop Animation Carousel */}
        <div className="w-full relative py-6 select-none outline-none">
          <LogoLoop
            logos={clientLogos}
            speed={40}
            direction="left"
            logoHeight={80}
            gap={36}
            fadeOut={true}
            scaleOnHover={true}
            className="[--logoloop-fadeColorAuto:#FDF8F5] dark:[--logoloop-fadeColorAuto:#050e1d]"
            renderItem={(item) => {
              const src = 'src' in item ? item.src : '';
              const alt = 'alt' in item ? item.alt : '';
              const title = item.title;

              return (
                <div className="h-20 w-48 px-6 py-4 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-white/5 flex items-center justify-center transition-all duration-300 hover:border-brand-mint/40 hover:shadow-[0_8px_30px_rgba(126,194,66,0.12)] hover:-translate-y-1">
                  <img
                    src={src}
                    alt={alt ?? ''}
                    title={title}
                    className="h-full w-full object-contain filter transition-transform duration-300"
                    draggable={false}
                    loading="lazy"
                  />
                </div>
              );
            }}
          />
        </div>

      </div>
    </section>
  );
}


