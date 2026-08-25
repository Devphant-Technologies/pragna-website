"use client";

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatItem {
  end: number;
  suffix: string;
  label: string;
}

interface StatCardProps {
  stat: StatItem;
  className?: string;
}

function StatCard({ stat, className }: StatCardProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 90%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.end,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => setCount(Math.round(obj.val)),
        });
      },
    });

    return () => trigger.kill();
  }, [stat.end]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden group flex items-center gap-4 pl-12 pr-6 py-5 rounded-2xl bg-[#0B1E36] border border-white/5 shadow-xl transition-all duration-300 w-full z-10 cursor-pointer",
        className
      )}
    >
      {/* Expanding White Background from Bottom-Right on Hover */}
      <span className="absolute bottom-0 right-0 w-0 h-0 bg-white rounded-tl-[9999px] transition-all duration-700 ease-out group-hover:w-[350%] group-hover:h-[350%] z-0" />

      {/* Floating Glowing Dot (Aligned with the column line) */}
      <div className="absolute left-[24px] top-1/2 -translate-y-1/2 flex items-center justify-center w-2 h-2 z-10">
        {/* Pulsing glow ring */}
        <span className="absolute h-5 w-5 rounded-full bg-[#29B6F6]/30 animate-pulse-ring pointer-events-none" />
        {/* Inner dot */}
        <span className="h-2.5 w-2.5 rounded-full bg-[#29B6F6] shadow-[0_0_10px_#29B6F6] transition-all duration-500 group-hover:bg-[#7EC242] group-hover:shadow-[0_0_10px_#7EC242]" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col text-left space-y-1 z-10">
        <span className="text-3xl font-extrabold text-[#7EC242] group-hover:text-[#528d1f] transition-colors duration-500 tabular-nums font-sans">
          {count.toLocaleString()}{stat.suffix}
        </span>
        <span className="text-xs font-semibold text-white/80 group-hover:text-slate-900 transition-colors duration-500 tracking-wide font-sans">
          {stat.label}
        </span>
      </div>
    </div>
  );
}

export default function StatsSection() {
  const columns = [
    {
      stats: [
        { end: 9, suffix: '', label: 'Manufacturing Sites' },
        { end: 30000, suffix: '+', label: 'MTPA Installed Capacity' },
      ],
      staggerClasses: ["mt-0", ""],
    },
    {
      stats: [
        { end: 60, suffix: '+', label: 'Complex Molecules' },
        { end: 30, suffix: '+', label: 'Commercial Chemistries' },
      ],
      staggerClasses: ["mt-6", ""],
    },
    {
      stats: [
        { end: 1700, suffix: '+', label: 'Empowered Workforce' },
        { end: 90, suffix: '+', label: 'Scientists' },
      ],
      staggerClasses: ["mt-0", ""],
    },
    {
      stats: [
        { end: 27, suffix: '+', label: 'Years of Experience' },
        { end: 80, suffix: '+', label: 'Customers' },
      ],
      staggerClasses: ["mt-6", ""],
    },
  ];

  return (
    <section className="pt-4 pb-16 lg:pt-6 lg:pb-20 bg-[#90D5FF] text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-[0.1]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, #0D0D39 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Responsive Layout */}
        {/* Mobile View: Vertical stacking list with one line */}
        <div className="block lg:hidden relative pl-8 py-4 space-y-6">
          <div className="absolute top-0 bottom-0 left-[28px] w-px bg-[#0D0D39]/20" />
          {columns.flatMap(col => col.stats).map((stat, idx) => (
            <StatCard key={idx} stat={stat} />
          ))}
        </div>

        {/* Desktop View: Staggered columns */}
        <div className="hidden lg:grid grid-cols-4 gap-x-10 gap-y-12 xl:gap-x-16">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="relative w-full flex flex-col py-2">
              {/* Vertical line running behind the dot */}
              <div className="absolute top-0 bottom-0 left-[28px] w-px bg-[#0D0D39]/20" />

              {/* Cards in this column */}
              <div className="flex flex-col gap-12">
                <div className={col.staggerClasses[0]}>
                  <StatCard stat={col.stats[0]} />
                </div>
                <div className={col.staggerClasses[1]}>
                  <StatCard stat={col.stats[1]} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
