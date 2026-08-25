"use client";

import { useEffect, useState } from 'react';
import RotatingText from './RotatingText';

interface IntroAnimationProps {
  onFinish: () => void;
}

export default function IntroAnimation({ onFinish }: IntroAnimationProps) {
  const [phase, setPhase] = useState<'intro' | 'exit'>('intro');

  const companySuffixes = [
    'Chemical Industries',
    'Dyechem',
    'Life Science',
    'Pharma',
    'Speciality',
    'Fine Chem',
    'Chem Tech'
  ];

  const handleNext = (index: number) => {
    // When it reaches the last company suffix, wait and exit
    if (index === companySuffixes.length - 1) {
      setTimeout(() => {
        setPhase('exit');
      }, 2000);
    }
  };

  useEffect(() => {
    if (phase === 'exit') {
      const timer = setTimeout(() => {
        onFinish();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, onFinish]);

  const handleSkip = () => {
    setPhase('exit');
  };

  return (
    <div
      className={`fixed inset-0 z-[10005] bg-[#FDF8F5] flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ${phase === 'exit' ? 'translate-y-[-100%] opacity-0 pointer-events-none' : ''
        }`}
    >
      {/* Top Left Logo (moves with the intro slide on exit) */}
      <div className="absolute top-6 left-4 sm:left-6 lg:left-8 z-10">
        <img
          src="/assets/menubar_pragna_group_logo.png"
          alt="Pragna Group Logo"
          className="h-12 md:h-18 lg:h-16 object-contain"
        />
      </div>

      {/* Decorative ambient background glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-mint/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center justify-center text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[#0D0D39] gap-x-4 px-6 text-center select-none font-sans relative z-10">
        <span className="text-[#0D0D39]">Pragna</span>
        <RotatingText
          texts={companySuffixes}
          mainClassName="text-[#5A9E24]"
          splitLevelClassName="overflow-hidden pb-1"
          staggerDuration={0.02}
          staggerFrom="last"
          rotationInterval={1600}
          loop={false}
          onNext={handleNext}
        />
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-10 right-10 z-10 px-6 py-2.5 border border-slate-300 hover:border-[#0D0D39] text-xs font-bold uppercase tracking-widest text-slate-700 hover:text-white rounded-full bg-white/80 hover:bg-[#0D0D39] backdrop-blur-md shadow-sm cursor-pointer transition-all duration-300 font-sans"
      >
        Skip
      </button>
    </div>
  );
}
