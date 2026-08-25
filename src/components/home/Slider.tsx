"use client";

import { useState, useEffect, useRef } from 'react';

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressTimer = useRef<NodeJS.Timeout | null>(null);
  const slideDuration = 6000; // 6 seconds

  const slides = [
    {
      title: 'Committed to Health and Safety',
      desc: 'Our zero-compromise environmental standard drives decarbonization, low-waste catalytic runs, and clean work spaces.',
      img: '/assets/hero-banner.png',
    },
    {
      title: 'Green Process & Eco-Conscious Chemistry',
      desc: 'Established in 1999, Pragna Group is a premier manufacturer and exporter of speciality agrochemicals, dyes, and pharmaceutical intermediates.',
      img: '/assets/hero-banner.png',
    },
    {
      title: 'Empowering Global Agrochemical Synthesis',
      desc: 'Advanced facilities certified by leading regulatory agencies, ensuring purity levels above 99% for international exports.',
      img: '/assets/hero-banner.png',
    },
  ];

  useEffect(() => {
    // Progress bar animation interval (updates every 50ms)
    const updateRate = 50;
    const steps = slideDuration / updateRate;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const currentProgress = (currentStep / steps) * 100;
      setProgress(currentProgress);

      if (currentStep >= steps) {
        currentStep = 0;
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, updateRate);

    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);

  const handleDotClick = (idx: number) => {
    setCurrentSlide(idx);
    setProgress(0);
  };

  return (
    <section className="relative h-[600px] w-full overflow-hidden dark:bg-brand-blue bg-white">
      {/* Top & bottom borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent z-20"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-mint/20 to-transparent z-20"></div>

      {/* Slides */}
      {slides.map((slide, idx) => {
        const isActive = idx === currentSlide;
        return (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none z-0'
            }`}
          >
            {/* Background Image with Zoom */}
            <img
              src={slide.img}
              alt={slide.title}
              className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />
            {/* Multi-gradient Overlay */}
            <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-brand-blue dark:via-brand-blue/50 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
            <div className="absolute inset-0 dark:bg-gradient-to-r dark:from-brand-blue/70 bg-gradient-to-r from-white/70 via-transparent to-transparent"></div>

            {/* Slide Text Content Container */}
            <div className="absolute bottom-24 left-0 w-full z-20">
              <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl space-y-4">
                  {/* Category badge */}
                  <span className={`inline-flex items-center space-x-2 text-[10px] font-bold text-brand-mint tracking-[0.25em] uppercase transition-all duration-700 delay-300 transform ${
                    isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    <span>Target Compliance</span>
                  </span>

                  <h2 className={`text-3xl sm:text-5xl font-bold font-serif dark:text-white text-slate-900 leading-tight tracking-tight transition-all duration-700 delay-500 transform ${
                    isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    {slide.title}
                  </h2>
                  <p className={`text-sm sm:text-base dark:text-brand-text-muted text-slate-600 leading-relaxed font-light max-w-xl transition-all duration-700 delay-700 transform ${
                    isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    {slide.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Slide Pagination & Auto-progress */}
      <div className="absolute bottom-10 left-0 w-full z-30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-4">
          {slides.map((_, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className="group flex flex-col items-start cursor-pointer focus:outline-none"
                aria-label={`Go to slide ${idx + 1}`}
              >
                <div className="flex items-center space-x-1.5 mb-1.5">
                  <span className={`text-[10px] font-bold tracking-wider transition-colors duration-300 ${
                    isActive ? 'text-brand-mint' : 'text-slate-500 dark:group-hover:text-slate-350 group-hover:text-slate-700'
                  }`}>
                    0{idx + 1}
                  </span>
                </div>
                {/* Progress bar container */}
                <div className="w-16 h-[2px] dark:bg-white/10 bg-slate-200 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-brand-mint rounded-full absolute left-0 top-0 transition-all ease-linear"
                    style={{
                      width: isActive ? `${progress}%` : '0%',
                      transitionDuration: isActive ? '50ms' : '0ms',
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
