"use client";

import { useState, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HamburgerMenuOverlay } from "@/components/lightswind/hamburger-menu-overlay";
import {
  Home,
  Info,
  MessageSquare,
  Award,
  Factory,
  Layers,
  Settings,
  Building2,
  Mail,
  Leaf
} from 'lucide-react';

function NavDropdown({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="relative group">
      <div className="inline-flex items-center gap-1 py-2 cursor-pointer hover:text-[#0575D7] transition-colors">
        <span>{label}</span>
        <svg
          className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <div className="absolute left-0 top-full z-[10002] pt-1 opacity-0 invisible pointer-events-none translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0">
        <div className="min-w-[15.5rem] w-max bg-white border border-slate-100 shadow-2xl rounded-2xl py-2 px-1.5 normal-case tracking-normal">
          {children}
        </div>
      </div>
    </div>
  );
}

const dropdownLinkClass =
  "block rounded-xl px-4 py-2.5 text-[13px] font-semibold text-slate-700 hover:text-[#0575D7] hover:bg-slate-50 transition-colors whitespace-nowrap";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', href: '/', icon: <Home size={18} /> },
    { label: 'Company Profile', href: '/about', icon: <Info size={18} /> },
    { label: "Director's Message", href: '/about/directors-message', icon: <MessageSquare size={18} /> },
    { label: 'Quality Policy', href: '/about/quality-policy', icon: <Award size={18} /> },
    { label: 'Manufacturing Facilities', href: '/about/manufacturing-facilities', icon: <Factory size={18} /> },
    { label: 'Sustainability Initiatives', href: '/about/sustainability', icon: <Leaf size={18} /> },
    {
      label: 'Product Portfolio',
      icon: <Layers size={18} />,
      subItems: [
        { label: 'Speciality Chemicals', href: '/products/speciality-chemicals' },
        { label: 'Dyes Intermediates', href: '/products/dyes-intermediates' },
        { label: 'API Intermediates', href: '/products/api-intermediates' },
        { label: 'Agro Chemical Technical', href: '/products/agro-chemical-technical' },
      ]
    },
    { label: 'Custom Services', href: '/services/custom-synthesis', icon: <Settings size={18} /> },
    { label: 'Group Entities', href: '/group-companies', icon: <Building2 size={18} /> },
    { label: 'Contact Us', href: '/contact', icon: <Mail size={18} /> },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[10000] overflow-visible transition-all duration-500 ${isSticky
        ? 'glass-header py-3 shadow-xl shadow-black/10'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 relative">

          {/* Logo */}
          <Link href="/" className="flex items-center group shrink-0 relative z-[1001]">
            <img
              src="/assets/menubar_pragna_group_logo.png"
              alt="Pragna Group Logo"
              className="h-9 md:h-19 object-contain transition-all duration-300 group-hover:brightness-110"
            />
          </Link>

          {/* Desktop Menu Options (Hidden on Mobile) */}
          <nav className="hidden lg:flex items-center space-x-8 text-[13px] font-bold text-slate-800 uppercase tracking-wider relative z-[1001]">

            {/* Home */}
            <Link href="/" className="relative py-2 hover:text-[#0575D7] transition-colors group">
              <span>Home</span>
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#0575D7] transition-all duration-300 group-hover:w-full ${pathname === '/' ? 'w-full' : 'w-0'}`} />
            </Link>

            {/* About Us Dropdown */}
            <NavDropdown label="About Us">
              <Link href="/about" className={dropdownLinkClass}>
                Company Profile
              </Link>
              <Link href="/about/directors-message" className={dropdownLinkClass}>
                Director's Message
              </Link>
              <Link href="/about/quality-policy" className={dropdownLinkClass}>
                Quality Policy
              </Link>
              <Link href="/about/manufacturing-facilities" className={dropdownLinkClass}>
                Manufacturing Facilities
              </Link>
              <Link href="/about/sustainability" className={dropdownLinkClass}>
                Sustainability Initiatives
              </Link>
            </NavDropdown>

            {/* Product Portfolio Dropdown */}
            <NavDropdown label="Products">
              <Link href="/products/speciality-chemicals" className={dropdownLinkClass}>
                Speciality Chemicals
              </Link>
              <Link href="/products/dyes-intermediates" className={dropdownLinkClass}>
                Dyes Intermediates
              </Link>
              <Link href="/products/api-intermediates" className={dropdownLinkClass}>
                API Intermediates
              </Link>
              <Link href="/products/agro-chemical-technical" className={dropdownLinkClass}>
                Agro Chemical Technical
              </Link>
            </NavDropdown>

            {/* Custom Services */}
            <Link href="/services/custom-synthesis" className="relative py-2 hover:text-[#0575D7] transition-colors group">
              <span>Custom Services</span>
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#0575D7] transition-all duration-300 group-hover:w-full ${pathname === '/services/custom-synthesis' ? 'w-full' : 'w-0'}`} />
            </Link>

            {/* Group Entities */}
            <Link href="/group-companies" className="relative py-2 hover:text-[#0575D7] transition-colors group">
              <span>Group Entities</span>
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#0575D7] transition-all duration-300 group-hover:w-full ${pathname === '/group-companies' ? 'w-full' : 'w-0'}`} />
            </Link>

            {/* Contact Us */}
            <Link href="/contact" className="relative py-2 hover:text-[#0575D7] transition-colors group">
              <span>Contact Us</span>
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#0575D7] transition-all duration-300 group-hover:w-full ${pathname === '/contact' ? 'w-full' : 'w-0'}`} />
            </Link>
          </nav>

          {/* Hamburger Navigation (Visible on Mobile only) */}
          <div className="flex lg:hidden items-center space-x-6 relative z-[1001]">
            <div className="w-12 h-12 shrink-0" />
          </div>

          {/* Hamburger Menu Overlay (Hidden on Desktop) */}
          <HamburgerMenuOverlay
            items={menuItems}
            buttonTop="28px"
            buttonRight="44px"
            buttonSize="md"
            buttonColor="transparent"
            buttonClassName="lg:hidden text-slate-800 dark:text-[#FDF8F5] hover:bg-slate-900/5 dark:hover:bg-white/5 transition-colors focus:outline-none z-[10001]"
            overlayBackground="linear-gradient(135deg, #050e1d 0%, #0c1a2f 100%)"
            textColor="#FDF8F5"
            fontSize="sm"
            fontWeight="semibold"
            fontFamily="var(--font-sans)"
            enableBlur={true}
            menuAlignment="center"
            animationDuration={1}
            zIndex={10000}
            className="fixed inset-0 pointer-events-none z-[10000] lg:hidden"
            menuItemClassName="hover:text-brand-mint transition-colors"
          />

        </div>
      </div>
    </header>
  );
}
