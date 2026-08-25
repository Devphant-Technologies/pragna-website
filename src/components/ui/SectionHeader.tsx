"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionHeaderProps {
  badge: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeader({ badge, title, highlight, subtitle, align = 'center', light = false }: SectionHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    const badgeEl = headerRef.current.querySelector('.section-badge');
    const titleEl = headerRef.current.querySelector('h2');
    const subtitleEl = headerRef.current.querySelector('.section-subtitle');
    const lineEl = headerRef.current.querySelector('.section-line');

    const elements = [badgeEl, titleEl, subtitleEl, lineEl].filter(Boolean);

    gsap.fromTo(
      elements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div ref={headerRef} className={`space-y-4 ${align === 'center' ? 'text-center max-w-3xl mx-auto' : 'text-left max-w-2xl'}`}>
      <span className="section-badge inline-flex items-center space-x-2 text-xs font-bold text-brand-mint tracking-[0.25em] uppercase opacity-0">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-mint blink-dot"></span>
        <span>{badge}</span>
      </span>
      <h2 className={`text-3xl md:text-5xl font-bold leading-tight tracking-tight mt-1 opacity-0 ${light ? 'text-white' : 'text-black'}`}>
        {title}{' '}
        {highlight && <span className="text-brand-cyan">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className={`section-subtitle text-base md:text-lg leading-relaxed font-light max-w-2xl opacity-0 ${align === 'center' ? 'mx-auto' : ''} ${light ? 'text-slate-200' : 'text-slate-600'}`}>
          {subtitle}
        </p>
      )}
      <div className={`section-line w-14 h-1 rounded-full bg-gradient-to-r from-brand-mint to-brand-cyan opacity-0 ${align === 'center' ? 'mx-auto' : ''}`}></div>
    </div>
  );
}
