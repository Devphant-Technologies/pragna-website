"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  text = "",
  className = "",
  delay = 15,
  duration = 1.0,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 25 },
  to = { opacity: 1, y: 0 },
  threshold = 0.0,
  rootMargin = "0px",
  tag = "p",
  textAlign = "center",
  onLetterAnimationComplete
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current || !text) return;

    const el = containerRef.current;
    
    // Find chars or words depending on splitType prop
    const targets = el.querySelectorAll(
      splitType.includes("chars") ? ".split-char" : ".split-word"
    );

    if (targets.length === 0) return;

    // Apply starting positions
    gsap.set(targets, from);

    // Setup the ScrollTrigger animation
    const tween = gsap.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      scrollTrigger: {
        trigger: el,
        start: `top bottom${rootMargin}`, // maps rootMargin threshold
        once: true,
        toggleActions: "play none none none"
      },
      onComplete: onLetterAnimationComplete
    });

    return () => {
      tween.kill();
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
    };
  }, [text, delay, duration, ease, splitType, JSON.stringify(from), JSON.stringify(to), rootMargin]);

  const style: React.CSSProperties = {
    textAlign,
    wordWrap: 'break-word',
    willChange: 'transform, opacity'
  };

  const classes = `split-parent overflow-hidden inline-block whitespace-normal ${className}`;
  const Tag = (tag || 'p') as React.ElementType;

  const words = text.split(" ");

  return (
    <Tag ref={containerRef} style={style} className={classes}>
      {words.map((word, wIdx) => {
        const isLastWord = wIdx === words.length - 1;
        
        if (splitType.includes("chars")) {
          const chars = Array.from(word);
          return (
            <span key={wIdx} className="split-word inline-block whitespace-nowrap">
              {chars.map((char, cIdx) => (
                <span 
                  key={cIdx} 
                  className="split-char inline-block"
                  style={{ willChange: "transform, opacity" }}
                >
                  {char}
                </span>
              ))}
              {!isLastWord && <span className="inline-block">&nbsp;</span>}
            </span>
          );
        } else {
          return (
            <span key={wIdx} className="split-word inline-block">
              {word}
              {!isLastWord && <span className="inline-block">&nbsp;</span>}
            </span>
          );
        }
      })}
    </Tag>
  );
}
