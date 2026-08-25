"use client";

import Link from 'next/link';

interface PageBannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs: { label: string; href?: string }[];
}

export default function PageBanner({ title, subtitle, breadcrumbs }: PageBannerProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDF8F5] via-[#f5efea] to-[#ede5dc]"></div>
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(126,194,66,0.4) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>

      {/* Floating orbs */}
      <div className="absolute top-10 right-[15%] w-64 h-64 rounded-full bg-brand-mint/[0.06] blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-[10%] w-48 h-48 rounded-full bg-brand-cyan/[0.05] blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs font-medium mb-8">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center space-x-2">
              {i > 0 && (
                <svg className="h-3 w-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              {crumb.href ? (
                <Link href={crumb.href} className="text-slate-500 hover:text-brand-mint transition-colors uppercase tracking-wider">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-brand-mint uppercase tracking-wider">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="text-4xl md:text-6xl font-bold text-black tracking-tight animate-slide-up">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-slate-600 font-light max-w-2xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {subtitle}
          </p>
        )}

        {/* Decorative line */}
        <div className="mt-8 w-20 h-1 rounded-full bg-gradient-to-r from-brand-mint to-brand-cyan animate-slide-up" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </section>
  );
}
