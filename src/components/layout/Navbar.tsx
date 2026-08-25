"use client";

import { useState, useEffect } from 'react';
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
  Mail
} from 'lucide-react';

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) setTheme(savedTheme);
    else setTheme('dark');
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const menuItems = [
    { label: 'Home', href: '/', icon: <Home size={18} /> },
    { label: 'Company Profile', href: '/about', icon: <Info size={18} /> },
    { label: "Director's Message", href: '/about/directors-message', icon: <MessageSquare size={18} /> },
    { label: 'Quality Policy', href: '/about/quality-policy', icon: <Award size={18} /> },
    { label: 'Manufacturing Facilities', href: '/about/manufacturing-facilities', icon: <Factory size={18} /> },
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
      className={`fixed top-0 left-0 w-full z-[10000] transition-all duration-500 ${
        isSticky
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
              className="h-9 md:h-11 object-contain transition-all duration-300 group-hover:brightness-110"
            />
          </Link>

          {/* Hamburger Navigation */}
          <div className="flex items-center space-x-6 relative z-[1001]">
            
            {/* Dummy space for hamburger overlay button which is absolute positioned */}
            <div className="w-12 h-12 shrink-0" />
            
          </div>

          {/* Hamburger Menu Overlay (Mounted as fixed full screen overlay) */}
          <HamburgerMenuOverlay
            items={menuItems}
            buttonTop="32px"
            buttonRight="16px"
            buttonSize="md"
            buttonColor="transparent"
            buttonClassName="text-slate-800 dark:text-[#FDF8F5] hover:bg-slate-900/5 dark:hover:bg-white/5 transition-colors focus:outline-none"
            overlayBackground="linear-gradient(135deg, #050e1d 0%, #0c1a2f 100%)"
            textColor="#FDF8F5"
            fontSize="sm"
            fontWeight="semibold"
            fontFamily="var(--font-sans)"
            enableBlur={false}
            menuAlignment="center"
            animationDuration={1}
            zIndex={10050}
            className="fixed inset-0 pointer-events-none z-[10050]"
            menuItemClassName="hover:text-brand-mint transition-colors"
          />

        </div>
      </div>
    </header>
  );
}
