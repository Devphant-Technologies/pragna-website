"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface StylishCarouselItem {
  src?: string;
  title?: string;
  alt?: string;
  desc?: string;
  iconNumber?: string;
}

export interface StylishCarouselProps {
  /** Array of items to display in the carousel */
  items: StylishCarouselItem[];
  /** Starting active index (0-based) */
  initialIndex?: number;
  /** Size of each slide (CSS clamp value or fixed px). Defaults to responsive clamp. */
  slideSize?: string;
  /** Rotation angle (degrees) applied per offset position */
  rotationDegrees?: number;
  /** Scale of non-active slides (0–1). Defaults to 0.6 */
  inactiveScale?: number;
  /** Y-offset multiplier for perspective fan-out. Defaults to 50 */
  yOffsetPercent?: number;
  /** Spring animation bounce (0–1). Defaults to 0.15 */
  springBounce?: number;
  /** Spring animation duration in seconds. Defaults to 0.8 */
  springDuration?: number;
  /** Whether to show navigation arrows */
  showArrows?: boolean;
  /** Whether to show dot indicators */
  showDots?: boolean;
  /** Whether images are clickable to navigate to that slide */
  clickToNavigate?: boolean;
  /** Auto-advance interval in ms. 0 = disabled */
  autoPlay?: number;
  /** Additional className for the root wrapper */
  className?: string;
  /** Callback fired when the active index changes */
  onIndexChange?: (index: number) => void;
  /** Border radius of each slide image. Defaults to "1rem" */
  borderRadius?: string;
  /** Custom dot active color (Tailwind or CSS color) */
  dotActiveColor?: string;
  /** Custom dot inactive color */
  dotInactiveColor?: string;
  /** Custom arrow button class override */
  arrowClassName?: string;
  /** Whether to show the bottom controls bar. Defaults to true */
  showControls?: boolean;
  /** Whether to show the bottom slide counter. Defaults to true */
  showCounter?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const StylishCarousel = ({
  items = [],
  initialIndex = 0,
  slideSize = "clamp(140px, 75vmin, 320px)",
  rotationDegrees = 28,
  inactiveScale = 0.62,
  yOffsetPercent = 48,
  springBounce = 0.15,
  springDuration = 0.8,
  showArrows = true,
  showDots = true,
  clickToNavigate = true,
  autoPlay = 0,
  className,
  onIndexChange,
  borderRadius = "1rem",
  arrowClassName,
  showControls = true,
  showCounter = true,
}: StylishCarouselProps) => {
  const clampedInitial = Math.max(0, Math.min(initialIndex, items.length - 1));
  const [activeIndex, setActiveIndex] = useState(clampedInitial);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── helpers ──────────────────────────────────────────────────────────────
  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, items.length - 1));
      setActiveIndex(clamped);
      onIndexChange?.(clamped);
    },
    [items.length, onIndexChange]
  );

  const toPrev = useCallback(
    () => goTo(activeIndex - 1),
    [activeIndex, goTo]
  );

  const toNext = useCallback(
    () => goTo(activeIndex + 1),
    [activeIndex, goTo]
  );

  // ── keyboard navigation ───────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") toPrev();
      if (e.key === "ArrowRight") toNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toPrev, toNext]);

  // ── touch / swipe ─────────────────────────────────────────────────────────
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? toNext() : toPrev();
    touchStartX.current = null;
  };

  // ── auto-play ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!autoPlay) return;
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev + 1 >= items.length ? 0 : prev + 1;
        onIndexChange?.(next);
        return next;
      });
    }, autoPlay);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay, items.length, onIndexChange]);

  // ── spring transition ──────────────────────────────────────────────────────
  const spring = {
    type: "spring" as const,
    bounce: springBounce,
    duration: springDuration,
  };

  if (!items.length) return null;

  return (
    <div
      ref={containerRef}
      className={cn("relative flex flex-col items-center select-none", className)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Stylish Carousel"
      role="region"
    >
      {/* ── SLIDES CONTAINER ─────────────────────────────────────────────── */}
      <div
        style={{ width: slideSize, aspectRatio: "1 / 1" }}
        className="relative mt-6"
      >
        {/* Horizontal sliding strip */}
        <motion.div
          className="flex w-fit"
          animate={{ x: `${(-activeIndex * 100) / items.length}%` }}
          transition={spring}
        >
          {items.map((item, i) => {
            const offset = i - activeIndex;
            const isActive = offset === 0;

            return (
              <motion.div
                key={i}
                style={{ width: slideSize, aspectRatio: "1 / 1" }}
                className="flex-shrink-0 flex flex-col items-center gap-2 will-change-transform group"
                animate={{
                  rotate: offset * rotationDegrees,
                  scale: isActive ? 1 : inactiveScale,
                  y: `${offset * yOffsetPercent}%`,
                }}
                transition={spring}
              >
                {/* Title label (only for image-only slides) */}
                <AnimatePresence>
                  {item.title && item.src && !item.desc && (
                    <motion.span
                      key={`title-${i}`}
                      initial={{ opacity: 0, y: -4 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="text-xs sm:text-sm font-semibold whitespace-nowrap text-foreground/80 tracking-wide"
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Card Container */}
                <div
                  className={cn(
                    "relative w-full h-full overflow-hidden flex flex-col justify-between p-6 transition-all duration-300",
                    isActive 
                      ? "bg-white dark:bg-slate-900 border-2 border-[#7EC242]/30 shadow-xl" 
                      : "bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/5 shadow-md"
                  )}
                  style={{ borderRadius }}
                >
                  {/* Image Background (Reduced size and centered) */}
                  {item.src && (
                    <div className="flex-grow flex items-center justify-center w-full pt-8 pb-4">
                      <img
                        src={item.src}
                        alt={item.alt ?? item.title ?? `Slide ${i + 1}`}
                        draggable={false}
                        onClick={() => clickToNavigate && goTo(i)}
                        className={cn(
                          "w-24 h-24 md:w-28 md:h-28 object-contain transition-all duration-300",
                          !isActive ? "brightness-[0.95] scale-90" : "brightness-100 scale-100",
                          clickToNavigate && !isActive && "cursor-pointer"
                        )}
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Icon Number badge floating at top-left */}
                  <div className="absolute top-4 left-4 z-20 pointer-events-none">
                    <span className={cn(
                      "inline-flex items-center justify-center h-8 w-8 rounded-lg font-bold text-xs font-mono shadow-sm transition-all duration-300",
                      isActive 
                        ? "bg-[#7EC242] text-white" 
                        : "bg-slate-200 text-slate-650 dark:bg-slate-800 dark:text-slate-450"
                    )}>
                      {item.iconNumber || `0${i + 1}`}
                    </span>
                  </div>

                  {/* Text Overlay content (rendered for both text-only or image-backed slides) */}
                  <div 
                    onClick={() => !isActive && clickToNavigate && goTo(i)}
                    className={cn(
                      "w-full text-center select-none pb-4 px-2",
                      isActive 
                        ? "text-black dark:text-white" 
                        : "opacity-75 scale-95 cursor-pointer text-slate-500 dark:text-slate-400"
                    )}
                  >
                    <div className="space-y-1">
                      <h4 
                        className={cn(
                          "font-bold text-sm md:text-base font-sans transition-colors duration-300",
                          isActive ? "text-black dark:text-white" : "text-slate-700 dark:text-slate-300"
                        )}
                      >
                        {item.title}
                      </h4>
                      <p 
                        className={cn(
                          "text-xs leading-relaxed font-light transition-all duration-300 text-slate-500 dark:text-slate-450 max-w-[285px] mx-auto",
                          isActive 
                            ? "opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-32 overflow-hidden mt-0 group-hover:mt-2" 
                            : "hidden"
                        )}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Active glow ring */}
                  {isActive && (
                    <motion.div
                      layoutId="glow-ring"
                      className="absolute inset-0 rounded-[inherit] pointer-events-none z-20"
                      style={{
                        boxShadow: "0 0 0 3px rgba(126, 194, 66, 0.4)",
                        borderRadius,
                      }}
                      transition={spring}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ── CONTROLS ─────────────────────────────────────────────────────── */}
      {showControls && (
        <div className="mt-8 flex items-center gap-4 px-3 py-2 rounded-full bg-background/60 border border-border/60 backdrop-blur-md shadow-lg">
          {/* Prev */}
          {showArrows && (
            <button
              aria-label="Previous slide"
              onClick={toPrev}
              disabled={activeIndex === 0}
              className={cn(
                "p-2 rounded-full transition-all hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed",
                arrowClassName
              )}
            >
              <ChevronLeft className="w-4 h-4 text-foreground/80" />
            </button>
          )}

          {/* Dots */}
          {showDots && (
            <div className="flex items-center gap-1.5">
              {items.map((_, i) => (
                <motion.button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  animate={{
                    width: activeIndex === i ? 28 : 8,
                    opacity: activeIndex === i ? 1 : 0.35,
                  }}
                  transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                  className="h-2 rounded-full bg-foreground cursor-pointer"
                  style={{ minWidth: 8 }}
                />
              ))}
            </div>
          )}

          {/* Next */}
          {showArrows && (
            <button
              aria-label="Next slide"
              onClick={toNext}
              disabled={activeIndex === items.length - 1}
              className={cn(
                "p-2 rounded-full transition-all hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed",
                arrowClassName
              )}
            >
              <ChevronRight className="w-4 h-4 text-foreground/80" />
            </button>
          )}
        </div>
      )}

      {/* Counter */}
      {showCounter && (
        <p className="mt-3 text-xs text-muted-foreground font-medium tabular-nums">
          {activeIndex + 1} / {items.length}
        </p>
      )}
    </div>
  );
};

export default StylishCarousel;
