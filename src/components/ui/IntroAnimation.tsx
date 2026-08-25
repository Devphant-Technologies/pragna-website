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
      className={`fixed inset-0 z-[9999] bg-[#0D0D39] flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ${
        phase === 'exit' ? 'translate-y-[-100%] opacity-0 pointer-events-none' : ''
      }`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-center text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white gap-x-4 px-6 text-center select-none font-sans">
        <span className="text-white">Pragna</span>
        <RotatingText
          texts={companySuffixes}
          mainClassName="text-[#7EC242]"
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
        className="absolute bottom-10 right-10 z-10 px-5 py-2 border border-white/20 hover:border-brand-mint text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-white rounded-full bg-slate-950/40 backdrop-blur-xs cursor-pointer transition-all duration-300 font-sans"
      >
        Skip
      </button>
    </div>
  );
}
