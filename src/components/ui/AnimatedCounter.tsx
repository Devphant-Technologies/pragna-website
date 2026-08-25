"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

export default function AnimatedCounter({ end, suffix = '', prefix = '', label, duration = 2 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration,
          ease: 'power2.out',
          onUpdate: () => setCount(Math.round(obj.val)),
        });
      },
    });

    return () => trigger.kill();
  }, [end, duration]);

  return (
    <div ref={ref} className="text-center group">
      <div className="relative inline-flex items-center justify-center mb-3">
        <span className="h-2 w-2 rounded-full bg-brand-mint blink-dot absolute -left-4 top-3"></span>
        <span className="text-4xl md:text-5xl font-bold text-brand-mint tabular-nums">
          {prefix}{count.toLocaleString()}{suffix}
        </span>
      </div>
      <p className="text-sm text-slate-700 font-medium uppercase tracking-wider">{label}</p>
    </div>
  );
}
