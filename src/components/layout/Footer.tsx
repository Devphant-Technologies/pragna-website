"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
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
      {/* Upper Info Grid Container with Light Off-White Background */}
      <div className="bg-[#FDF8F5] text-slate-700">
        {/* Gradient top border accent line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-brand-mint/60 to-transparent"></div>

        {/* Footer Info Grid */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Column 1: Company Info (4/12 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <Link href="/" className="inline-block">
                <img
                  src="/assets/menubar_pragna_group_logo.png"
                  alt="Pragna Group Logo"
                  className="h-10 md:h-12 object-contain hover:opacity-90 transition-all duration-300"
                />
              </Link>
              <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
                Established in 1999, Pragna Group is a premier manufacturer and exporter of speciality agrochemicals, dyes, and pharmaceutical intermediates, delivering world-class custom synthesis solutions.
              </p>
              {/* Certifications / Badges info */}
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="px-3 py-1 bg-brand-mint/10 border border-brand-mint/30 rounded-full text-[11px] font-bold tracking-wider text-[#5A9E24] uppercase hover:bg-brand-mint/20 transition-all duration-300 cursor-default">
                  ISO 9001:2015
                </span>
                <span className="px-3 py-1 bg-brand-cyan/10 border border-brand-cyan/30 rounded-full text-[11px] font-bold tracking-wider text-[#0284C7] uppercase hover:bg-brand-cyan/20 transition-all duration-300 cursor-default">
                  ISO 14001:2015
                </span>
                <span className="px-3 py-1 bg-slate-200/70 border border-slate-300 rounded-full text-[11px] font-bold tracking-wider text-slate-700 uppercase hover:bg-slate-300/50 transition-all duration-300 cursor-default">
                  ISO 45001:2018
                </span>
              </div>
            </div>

            {/* Column 2: Products Portfolio (2/12 cols) */}
            <div className="lg:col-span-2 space-y-5">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em] font-sans pb-1.5 border-b border-slate-300/80 w-fit">
                Products
              </h3>
              <ul className="space-y-3.5">
                {[
                  { label: 'Speciality Chemicals', href: '/products/speciality-chemicals' },
                  { label: 'Dyes Intermediates', href: '/products/dyes-intermediates' },
                  { label: 'API Intermediates', href: '/products/api-intermediates' },
                  { label: 'Agrochemicals', href: '/products/agro-chemical-technical' },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="group flex items-center text-sm text-slate-600 hover:text-brand-mint transition-colors duration-300 font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-mint mr-2 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Company / Quick Links (3/12 cols) */}
            <div className="lg:col-span-3 space-y-5">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em] font-sans pb-1.5 border-b border-slate-300/80 w-fit">
                Quick Links
              </h3>
              <ul className="space-y-3.5">
                {[
                  { label: 'About Us', href: '/about' },
                  { label: "Director's Message", href: '/about/directors-message' },
                  { label: 'Quality Policy', href: '/about/quality-policy' },
                  { label: 'Manufacturing', href: '/about/manufacturing-facilities' },
                  { label: 'Sustainability', href: '/about/sustainability' },
                  { label: 'Custom Synthesis', href: '/services/custom-synthesis' },
                  { label: 'Group Entities', href: '/group-companies' },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="group flex items-center text-sm text-slate-600 hover:text-brand-cyan transition-colors duration-300 font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan mr-2 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact Details (3/12 cols) */}
            <div className="lg:col-span-3 space-y-5">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em] font-sans pb-1.5 border-b border-slate-300/80 w-fit">
                Get In Touch
              </h3>
              <ul className="space-y-4 text-sm text-slate-600 text-left">
                <li className="flex items-start space-x-3 group">
                  <MapPin size={18} className="text-[#5A9E24] mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="leading-relaxed group-hover:text-slate-900 transition-colors duration-300">
                    Plot No.1210, GIDC Estate,<br />
                    Ankleshwar – 393002, Gujarat – India.
                  </span>
                </li>
                <li className="flex items-start space-x-3 group">
                  <Phone size={18} className="text-[#0284C7] mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <div className="flex flex-col gap-1">
                    <a
                      href="tel:+919723812606"
                      className="hover:underline hover:text-slate-900 transition-colors duration-300"
                    >
                      +91 97238 12606
                    </a>
                    <a
                      href="tel:+919913014035"
                      className="hover:underline hover:text-slate-900 transition-colors duration-300"
                    >
                      +91 99130 14035
                    </a>
                  </div>
                </li>
                <li className="flex items-start space-x-3 group">
                  <Mail size={18} className="text-[#5A9E24] mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <div className="flex flex-col gap-1 break-all">
                    <a
                      href="mailto:jignesh@pragnapharma.com"
                      className="hover:underline hover:text-slate-900 transition-colors duration-300"
                    >
                      jignesh@pragnapharma.com
                    </a>
                    <a
                      href="mailto:sitaram@pragnadyechem.com"
                      className="hover:underline hover:text-slate-900 transition-colors duration-300"
                    >
                      sitaram@pragnadyechem.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Big Animated Wordmark */}
      {showWordmark && (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
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
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#94A3B8]/60 gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <p>© {currentYear} Pragna Group. All rights reserved.</p>
            <span className="hidden md:inline text-white/20">|</span>
            <p>
              Designed by{" "}
              <a
                href="https://www.instagram.com/bigartstudio?utm_source=qr&igsi=bDFhem1yc29leTRn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-brand-mint font-medium transition-all duration-300 relative group"
              >
                BigArts Studio
                <span className="absolute bottom-0 left-0 w-0 h-px bg-brand-mint transition-all duration-300 group-hover:w-full"></span>
              </a>
            </p>
          </div>
          <p className="mt-2 md:mt-0 font-semibold uppercase tracking-wider text-[#94A3B8]/75 text-center">
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
