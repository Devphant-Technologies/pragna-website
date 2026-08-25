"use client";
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
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
  /** Array of menu items */
  items: MenuItem[];
  /** Button position from top */
  buttonTop?: string;
  /** Button position from left */
  buttonLeft?: string;
  /** Button position from right */
  buttonRight?: string;
  /** Button size */
  buttonSize?: "sm" | "md" | "lg";
  /** Button background color */
  buttonColor?: string;
  /** Overlay background color/gradient */
  overlayBackground?: string;
  /** Menu text color */
  textColor?: string;
  /** Menu font size */
  fontSize?: "sm" | "md" | "lg" | "xl" | "2xl";
  /** Font family */
  fontFamily?: string;
  /** Font weight */
  fontWeight?: "normal" | "medium" | "semibold" | "bold";
  /** Animation duration in seconds */
  animationDuration?: number;
  /** Stagger delay between menu items */
  staggerDelay?: number;
  /** Menu items alignment */
  menuAlignment?: "left" | "center" | "right";
  /** Custom class for container */
  className?: string;
  /** Custom class for button */
  buttonClassName?: string;
  /** Custom class for menu items */
  menuItemClassName?: string;
  /** Disable overlay close on item click */
  keepOpenOnItemClick?: boolean;
  /** Custom button content */
  customButton?: React.ReactNode;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** Callback when menu opens */
  onOpen?: () => void;
  /** Callback when menu closes */
  onClose?: () => void;
  /** Menu items layout direction */
  menuDirection?: "vertical" | "horizontal";
  /** Enable blur backdrop */
  enableBlur?: boolean;
  /** Z-index for overlay */
  zIndex?: number;
}

export const HamburgerMenuOverlay: React.FC<HamburgerMenuOverlayProps> = ({
  items = [],
  buttonTop = "60px",
  buttonLeft,
  buttonRight = "60px",
  buttonSize = "md",
  buttonColor = "#6c8cff",
  overlayBackground = "#6c8cff",
  textColor = "#ffffff",
  fontSize = "md",
  fontFamily = '"Krona One", monospace',
  fontWeight = "bold",
  animationDuration = 1.5,
  staggerDelay = 0.1,
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
  enableBlur = false,
  zIndex = 1000,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const buttonSizes = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const fontSizes = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl",
    xl: "text-5xl md:text-6xl",
    "2xl": "text-6xl md:text-7xl",
  };

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedIndex(null);
    onClose?.();
  };

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
      setExpandedIndex(expandedIndex === index ? null : index);
      return;
    }

    if (item.onClick) {
      item.onClick();
    }

    if (!keepOpenOnItemClick) {
      closeMenu();
    }
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Lock page scroll while the overlay is open so touches stay on the menu
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
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
    };

    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    html.style.scrollBehavior = "auto";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }

    return () => {
      html.style.overflow = previous.htmlOverflow;
      html.style.overscrollBehavior = previous.htmlOverscroll;
      html.style.scrollBehavior = previous.htmlScrollBehavior;
      body.style.overflow = previous.bodyOverflow;
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.left = previous.bodyLeft;
      body.style.right = previous.bodyRight;
      body.style.width = previous.bodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  const clipPathCenter = buttonRight
    ? `calc(100% - ${buttonRight})`
    : (buttonLeft || "60px");

  const rowClassName =
    "flex items-center justify-between w-full min-h-[44px] cursor-pointer select-none touch-manipulation text-left";

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
      ref={containerRef}
      className={cn("fixed inset-0 pointer-events-none", className)}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Krona+One:wght@400&display=swap');
          
          .hamburger-overlay-${zIndex} {
            position: absolute;
            inset: 0;
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
            background: ${overlayBackground};
            z-index: ${zIndex};
            clip-path: circle(0px at ${clipPathCenter} ${buttonTop});
            transition: clip-path ${animationDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            ${enableBlur ? "backdrop-filter: blur(10px);" : ""}
            pointer-events: none;
            overflow: hidden;
            overscroll-behavior: none;
            -webkit-tap-highlight-color: transparent;
          }
          
          .hamburger-overlay-${zIndex}.open {
            clip-path: circle(150% at ${clipPathCenter} ${buttonTop});
            pointer-events: auto;
          }
          
          .hamburger-button-${zIndex} {
            position: absolute;
            ${buttonRight ? `right: ${buttonRight}; left: auto;` : `left: ${buttonLeft || "60px"};`}
            top: ${buttonTop};
            transform: translateY(-50%);
            border-radius: 20px;
            z-index: ${zIndex + 10};
            background: ${buttonColor};
            border: none;
            cursor: pointer;
            transition: transform 0.3s ease, background 0.3s ease;
            pointer-events: auto;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
          }
          
          .hamburger-button-${zIndex}:hover {
            transform: translateY(-50%) scale(1.1);
          }
          
          .hamburger-button-${zIndex}:focus {
            outline: 2px solid ${textColor};
            outline-offset: 2px;
          }
          
          .hamburger-button-${zIndex} svg {
            stroke: currentColor !important;
          }
          
          .hamburger-button-${zIndex}[aria-expanded="true"] svg {
            stroke: ${textColor} !important;
          }
          
          .menu-scroll-${zIndex} {
            flex: 1 1 auto;
            min-height: 0;
            width: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
            touch-action: pan-y;
            padding: 5.5rem 1.25rem calc(2rem + env(safe-area-inset-bottom, 0px));
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          
          .menu-scroll-${zIndex}::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
          }
          
          .menu-items-${zIndex} {
            width: 100%;
            max-width: 36rem;
            margin: 0 auto;
            ${menuDirection === "horizontal" ? "display: flex; flex-wrap: wrap; gap: 1rem;" : ""}
            ${menuAlignment === "center" ? "text-align: center;" : ""}
            ${menuAlignment === "right" ? "text-align: right;" : ""}
          }
          
          .menu-item-${zIndex} {
            position: relative;
            list-style: none;
            padding: 0.35rem 0;
            cursor: pointer;
            transform: translateX(-200px);
            opacity: 0;
            transition: all 0.3s ease;
            font-family: ${fontFamily};
            font-weight: ${fontWeight};
            color: ${textColor};
            ${menuDirection === "horizontal" ? "display: inline-block; margin: 0 1rem;" : ""}
          }
          
          .menu-item-${zIndex}.visible {
            transform: translateX(0);
            opacity: 1;
          }
          
          .menu-item-${zIndex}::before {
            content: "";
            position: absolute;
            left: -20%;
            top: 50%;
            transform: translate(-50%, -50%) translateX(-50%);
            width: 25%;
            height: 8px;
            border-radius: 10px;
            background: ${textColor};
            opacity: 0;
            transition: all 0.25s ease;
            pointer-events: none;
          }
          
          @media (hover: hover) and (pointer: fine) {
            .menu-item-${zIndex}:hover::before {
              opacity: 1;
              transform: translate(-50%, -50%) translateX(0);
            }
          }
          
          .menu-item-${zIndex} span {
            opacity: 0.7;
            transition: opacity 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .menu-item-${zIndex}:hover span {
            opacity: 1;
          }
          
          .menu-item-${zIndex} a,
          .menu-item-${zIndex} button {
            color: inherit;
            font: inherit;
            text-align: inherit;
            background: transparent;
            border: 0;
            padding: 0.4rem 0;
            width: 100%;
          }
          
          .menu-item-${zIndex}:focus-within {
            outline: 2px solid ${textColor};
            outline-offset: 2px;
            border-radius: 4px;
          }
          
          /* Mobile responsiveness */
          @media (max-width: 768px) {
            .hamburger-button-${zIndex} {
              ${buttonRight ? `right: 16px; left: auto;` : `left: 16px;`}
              top: 32px;
              transform: translateY(-50%);
            }
            
            .hamburger-button-${zIndex}:hover {
              transform: translateY(-50%) scale(1.05);
            }
            
            .hamburger-overlay-${zIndex} {
              clip-path: circle(0px at ${buttonRight ? "calc(100% - 16px)" : "16px"} 32px);
            }
            
            .hamburger-overlay-${zIndex}.open {
              clip-path: circle(150% at ${buttonRight ? "calc(100% - 16px)" : "16px"} 32px);
            }
            
            .menu-item-${zIndex} {
              padding: 0.15rem 0;
            }
            
            .menu-item-${zIndex}::before {
              display: none;
            }
          }
          
          @media (max-width: 480px) {
            .menu-items-${zIndex} {
              ${menuDirection === "horizontal" ? "flex-direction: column; gap: 0;" : ""}
            }
            
            .menu-item-${zIndex} {
              ${menuDirection === "horizontal" ? "display: block; margin: 0;" : ""}
            }
          }
        `}
      </style>

      {/* Navigation Overlay */}
      <div
        ref={navRef}
        className={cn(`hamburger-overlay-${zIndex}`, isOpen && "open")}
        aria-hidden={!isOpen}
      >
        <nav
          ref={scrollRef}
          id="navigation-menu"
          className={`menu-scroll-${zIndex}`}
        >
          <ul
            className={cn(
              `menu-items-${zIndex}`,
              menuDirection === "horizontal" && "flex flex-wrap "
            )}
          >
            {items.map((item, index) => (
              <li
                key={index}
                className={cn(
                  `menu-item-${zIndex} flex flex-col items-stretch`,
                  fontSizes[fontSize],
                  isOpen && "visible",
                  menuItemClassName
                )}
                style={{
                  transitionDelay: isOpen ? `${index * staggerDelay}s` : "0s",
                }}
              >
                {renderRow(item, index)}

                {/* Sub-menu rendering */}
                {item.subItems && item.subItems.length > 0 && expandedIndex === index && (
                  <ul className="pl-6 mt-2 mb-2 space-y-1 w-full border-l-2 border-brand-mint/20 text-left">
                    {item.subItems.map((sub, subIdx) => (
                      <li key={subIdx}>
                        {sub.href ? (
                          <Link
                            href={sub.href}
                            className="text-lg md:text-xl font-medium text-slate-350 hover:text-brand-mint cursor-pointer flex items-center gap-2 transition-colors py-2 min-h-[40px] select-none touch-manipulation"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleItemClick(sub, -1);
                            }}
                          >
                            {sub.icon && <span className="text-xs">{sub.icon}</span>}
                            <span>{sub.label}</span>
                          </Link>
                        ) : (
                          <button
                            type="button"
                            className="text-lg md:text-xl font-medium text-slate-350 hover:text-brand-mint cursor-pointer flex items-center gap-2 transition-colors py-2 min-h-[40px] select-none touch-manipulation w-full text-left"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleItemClick(sub, -1);
                            }}
                          >
                            {sub.icon && <span className="text-xs">{sub.icon}</span>}
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

      {/* Hamburger Button */}
      <button
        type="button"
        className={cn(
          `hamburger-button-${zIndex}`,
          buttonSizes[buttonSize],
          buttonClassName
        )}
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
              color={textColor}
            />
            <X
              className={cn(
                "absolute transition-all duration-300",
                isOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-45 scale-0"
              )}
              size={buttonSize === "sm" ? 16 : buttonSize === "md" ? 20 : 24}
              color={textColor}
            />
          </div>
        )}
      </button>
    </div>,
    document.body
  );
};

export default HamburgerMenuOverlay;
