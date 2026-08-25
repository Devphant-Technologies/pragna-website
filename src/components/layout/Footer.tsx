"use client";

import { useEffect, useState } from 'react';
import TextPressure from '@/components/ui/TextPressure';

interface FooterProps {
  showWordmark?: boolean;
}

export default function Footer({ showWordmark = false }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-black text-white/70 transition-colors duration-300">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-mint/40 to-transparent"></div>

      {/* Brand Big Animated Wordmark */}
      {showWordmark && (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <div style={{ position: 'relative', height: '250px' }} className="w-full select-none outline-none">
            <TextPressure
              text="PRAGNA"
              flex={true}
              alpha={false}
              stroke={true}
              width={true}
              weight={true}
              italic={true}
              textColor="#ffffff"
              strokeColor="#7EC242"
              strokeWidth={1.5}
              minFontSize={290}
            />
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/40">
          <p>© {currentYear} Pragna Group. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-semibold uppercase tracking-wider text-white/65">
            Export Grade Chemical Solutions
          </p>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 h-12 w-12 rounded-xl bg-brand-mint text-brand-blue flex items-center justify-center shadow-lg shadow-brand-mint/20 transition-all duration-500 cursor-pointer hover:scale-110 hover:shadow-xl hover:shadow-brand-mint/30 ${showTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
          }`}
        aria-label="Scroll to top"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
}
