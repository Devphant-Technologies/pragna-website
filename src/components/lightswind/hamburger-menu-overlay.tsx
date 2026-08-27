"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  subItems?: MenuItem[];
}

export interface HamburgerMenuOverlayProps {
  items: MenuItem[];
  buttonTop?: string;
  buttonLeft?: string;
  buttonRight?: string;
  buttonSize?: "sm" | "md" | "lg";
  buttonColor?: string;
  overlayBackground?: string;
  textColor?: string;
  fontSize?: "sm" | "md" | "lg" | "xl" | "2xl";
  fontFamily?: string;
  fontWeight?: "normal" | "medium" | "semibold" | "bold";
  animationDuration?: number;
  staggerDelay?: number;
  menuAlignment?: "left" | "center" | "right";
  className?: string;
  buttonClassName?: string;
  menuItemClassName?: string;
  keepOpenOnItemClick?: boolean;
  customButton?: React.ReactNode;
  ariaLabel?: string;
  onOpen?: () => void;
  onClose?: () => void;
  menuDirection?: "vertical" | "horizontal";
  enableBlur?: boolean;
  zIndex?: number;
}

export const HamburgerMenuOverlay: React.FC<HamburgerMenuOverlayProps> = ({
  items = [],
  buttonTop = "16px",
  buttonLeft,
  buttonRight = "16px",
  buttonSize = "md",
  buttonColor = "transparent",
  overlayBackground = "#6c8cff",
  textColor = "#ffffff",
  fontSize = "md",
  fontFamily = "var(--font-sans)",
  fontWeight = "semibold",
  animationDuration = 0.7,
  staggerDelay = 0.06,
  menuAlignment = "left",
  className,
  buttonClassName,
  menuItemClassName,
  keepOpenOnItemClick = false,
  customButton,
  ariaLabel = "Navigation menu",
  onOpen,
  onClose,
  menuDirection = "vertical",
  zIndex = 10050,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const buttonSizes = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const fontSizes = {
    sm: "text-[1.35rem] leading-tight sm:text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl",
    xl: "text-5xl md:text-6xl",
    "2xl": "text-6xl md:text-7xl",
  };

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setExpandedIndex(null);
    onClose?.();
  }, [onClose]);

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
      return;
    }
    setIsOpen(true);
    onOpen?.();
  };

  const handleItemClick = (item: MenuItem, index: number = -1) => {
    if (item.subItems && item.subItems.length > 0) {
      setExpandedIndex((current) => (current === index ? null : index));
      return;
    }

    item.onClick?.();

    if (!keepOpenOnItemClick) {
      closeMenu();
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const isFirstPathRef = useRef(true);
  useEffect(() => {
    if (isFirstPathRef.current) {
      isFirstPathRef.current = false;
      return;
    }
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeMenu]);

  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;

    const previous = {
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
      htmlScrollBehavior: html.style.scrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
    };

    html.classList.add("nav-open");
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    html.style.scrollBehavior = "auto";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }

    const onTouchMove = (event: TouchEvent) => {
      const target = event.target as Node | null;
      if (target && scrollRef.current?.contains(target)) {
        return;
      }
      event.preventDefault();
    };

    document.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchmove", onTouchMove);
      html.classList.remove("nav-open");
      html.style.overflow = previous.htmlOverflow;
      html.style.overscrollBehavior = previous.htmlOverscroll;
      html.style.scrollBehavior = previous.htmlScrollBehavior;
      body.style.overflow = previous.bodyOverflow;
      body.style.overscrollBehavior = previous.bodyOverscroll;
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.left = previous.bodyLeft;
      body.style.right = previous.bodyRight;
      body.style.width = previous.bodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  const clipOriginX = buttonRight
    ? `calc(100% - ${buttonRight})`
    : buttonLeft || "16px";
  const clipOrigin = `${clipOriginX} ${buttonTop}`;

  const rowClassName =
    "flex items-center justify-between w-full min-h-[44px] cursor-pointer select-none touch-manipulation text-left";

  const alignmentClass =
    menuAlignment === "center"
      ? "text-center items-center"
      : menuAlignment === "right"
        ? "text-right items-end"
        : "text-left items-stretch";

  const renderRow = (item: MenuItem, index: number) => {
    const label = (
      <span className="flex items-center gap-2 pointer-events-none">
        {item.icon && <span className="menu-icon">{item.icon}</span>}
        {item.label}
      </span>
    );

    const chevron =
      item.subItems && item.subItems.length > 0 ? (
        <span
          className={`text-xs transition-transform duration-300 ml-4 opacity-60 pointer-events-none ${
            expandedIndex === index ? "rotate-180 text-brand-mint" : "rotate-0"
          }`}
        >
          ▼
        </span>
      ) : null;

    if (item.subItems && item.subItems.length > 0) {
      return (
        <button
          type="button"
          className={rowClassName}
          aria-expanded={expandedIndex === index}
          onClick={() => handleItemClick(item, index)}
        >
          {label}
          {chevron}
        </button>
      );
    }

    if (item.href) {
      return (
        <Link
          href={item.href}
          className={rowClassName}
          onClick={() => handleItemClick(item, index)}
        >
          {label}
        </Link>
      );
    }

    return (
      <button
        type="button"
        className={rowClassName}
        onClick={() => handleItemClick(item, index)}
      >
        {label}
      </button>
    );
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={cn("lg:hidden", className)}
      style={{ zIndex }}
    >
      <div
        className={cn(
          "fixed inset-0 h-[100dvh] w-full",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        style={{ zIndex: isOpen ? zIndex : 0 }}
        aria-hidden={!isOpen}
      >
        <div
          className="absolute inset-0"
          style={{
            background: overlayBackground,
            clipPath: isOpen
              ? `circle(150% at ${clipOrigin})`
              : `circle(0px at ${clipOrigin})`,
            transition: `clip-path ${animationDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
            pointerEvents: "none",
          }}
        />

        <nav
          ref={scrollRef}
          id="navigation-menu"
          className={cn(
            "nav-overlay-scroll absolute inset-0 block",
            isOpen ? "pointer-events-auto" : "pointer-events-none invisible"
          )}
          style={{
            overflowY: "scroll",
            overflowX: "hidden",
            height: "100%",
            maxHeight: "100dvh",
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y",
            paddingTop: "5.25rem",
            paddingLeft: "1.25rem",
            paddingRight: "1.25rem",
            paddingBottom: "calc(2rem + env(safe-area-inset-bottom, 0px))",
          }}
        >
          <ul
            className={cn(
              "w-full max-w-xl mx-auto flex flex-col shrink-0",
              alignmentClass,
              menuDirection === "horizontal" && "flex-wrap gap-4"
            )}
            style={{ fontFamily, fontWeight, color: textColor }}
          >
            {items.map((item, index) => (
              <li
                key={index}
                className={cn(
                  "flex flex-col py-1 transition-all duration-300",
                  fontSizes[fontSize],
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-16 opacity-0",
                  menuItemClassName
                )}
                style={{
                  transitionDelay: isOpen ? `${index * staggerDelay}s` : "0s",
                }}
              >
                {renderRow(item, index)}

                {item.subItems &&
                  item.subItems.length > 0 &&
                  expandedIndex === index && (
                    <ul className="pl-6 mt-2 mb-1 space-y-1 w-full border-l-2 border-brand-mint/20 text-left">
                      {item.subItems.map((sub, subIdx) => (
                        <li key={subIdx}>
                          {sub.href ? (
                            <Link
                              href={sub.href}
                              className="text-lg md:text-xl font-medium hover:text-brand-mint cursor-pointer flex items-center gap-2 transition-colors py-2 min-h-[44px] select-none touch-manipulation"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleItemClick(sub, -1);
                              }}
                            >
                              {sub.icon && (
                                <span className="text-xs">{sub.icon}</span>
                              )}
                              <span>{sub.label}</span>
                            </Link>
                          ) : (
                            <button
                              type="button"
                              className="text-lg md:text-xl font-medium hover:text-brand-mint cursor-pointer flex items-center gap-2 transition-colors py-2 min-h-[44px] select-none touch-manipulation w-full text-left"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleItemClick(sub, -1);
                              }}
                            >
                              {sub.icon && (
                                <span className="text-xs">{sub.icon}</span>
                              )}
                              <span>{sub.label}</span>
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <button
        type="button"
        className={cn(
          "fixed flex items-center justify-center rounded-2xl border-none cursor-pointer touch-manipulation",
          buttonSizes[buttonSize],
          isOpen ? "text-[#FDF8F5]" : "text-slate-800",
          buttonClassName
        )}
        style={{
          top: buttonTop,
          right: buttonRight || "auto",
          left: buttonRight ? "auto" : buttonLeft || "16px",
          zIndex: isOpen ? zIndex + 10 : 10001,
          background: buttonColor,
          pointerEvents: "auto",
        }}
        onClick={toggleMenu}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-controls="navigation-menu"
      >
        {customButton || (
          <div className="relative w-full h-full flex items-center justify-center">
            <Menu
              className={cn(
                "absolute transition-all duration-300",
                isOpen
                  ? "opacity-0 rotate-45 scale-0"
                  : "opacity-100 rotate-0 scale-100"
              )}
              size={buttonSize === "sm" ? 16 : buttonSize === "md" ? 20 : 24}
            />
            <X
              className={cn(
                "absolute transition-all duration-300",
                isOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-45 scale-0"
              )}
              size={buttonSize === "sm" ? 16 : buttonSize === "md" ? 20 : 24}
            />
          </div>
        )}
      </button>
    </div>,
    document.body
  );
};

export default HamburgerMenuOverlay;
