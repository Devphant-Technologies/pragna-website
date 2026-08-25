"use client";

import { useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageBanner from '@/components/ui/PageBanner';
import SectionHeader from '@/components/ui/SectionHeader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function QualityPolicy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro fade in
      gsap.fromTo(
        introRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Grid cards stagger
      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const policies = [
    { title: 'Customer Focus', desc: 'We excel at understanding our customers, their quality needs, and reliably delivering products and services that add value.', icon: '🎯' },
    { title: 'Relationships', desc: 'We proactively foster strategic business partnerships with customers and suppliers that improve quality and enhance business results.', icon: '🤝' },
    { title: 'Improvement', desc: 'We drive value-adding and market-directed continuous improvements and breakthrough innovations across all chemical processes.', icon: '📈' },
    { title: 'Process Focus', desc: 'We design and improve manufacturing and non-manufacturing processes that optimize business results and guarantee safety.', icon: '⚙️' },
    { title: 'Market Focus', desc: 'We understand new and existing market requirements and competitive trends. We rapidly innovate to meet customer needs and accelerate bringing solutions to market.', icon: '🌐' },
    { title: 'Leadership', desc: 'We build a shared quality vision, align our organizations to support that vision, and create engaging, safe work environments.', icon: '👑' },
    { title: 'Scientific Method', desc: 'We understand the concepts of variation and waste. We apply appropriate statistical tools to drive productivity and enable innovation.', icon: '🔬' },
    { title: 'Learning', desc: 'We assess performance and benchmark against best practices. We capture, share, and institutionalize learnings to improve results.', icon: '📚' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main ref={containerRef} className="flex-grow bg-[#FDF8F5] text-foreground transition-colors duration-300 pb-24">
        {/* Banner */}
        <PageBanner
          title="Quality Policy"
          subtitle="Quality is at the core of our success, culture, and brand"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Company', href: '/about' },
            { label: 'Quality Policy' }
          ]}
        />

        {/* Intro */}
        <section ref={introRef} className="max-w-[1400px] mx-auto px-4 py-16 -mt-8 relative z-10 opacity-0">
          <div className="glass-card rounded-2xl p-8 md:p-12 border dark:border-white/5 border-slate-200 shadow-2xl">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <span className="inline-flex items-center space-x-2 text-xs font-bold text-brand-mint tracking-[0.25em] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-mint blink-dot"></span>
                <span>Our Promise</span>
              </span>
              <h2 className="text-2xl md:text-4xl font-bold dark:text-white text-slate-900 font-serif leading-tight">
                Do It Right the First Time, Every Time
              </h2>
              <div className="w-14 h-1 rounded-full bg-gradient-to-r from-brand-mint to-brand-cyan mx-auto"></div>
              <p className="dark:text-brand-text-muted text-slate-600 text-base md:text-lg leading-relaxed font-light">
                At Pragna Group, quality is at the core of our success. It is an important part of our legacy, culture, and brand. We strive to run all processes reliably and to the desired targets while avoiding the costs of poor quality. Pragna Group team members are committed to doing it right the first time, every time, guided by these core principles.
              </p>
            </div>
          </div>
        </section>

        {/* Policies Grid */}
        <section className="max-w-[1400px] mx-auto px-4 py-16">
          <div className="mb-14">
            <SectionHeader
              badge="Core Guidelines"
              title="Our Quality"
              highlight="Commitments"
              align="center"
            />
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {policies.map((p, i) => (
              <div
                key={i}
                className="bg-[#0B122C] border border-white/[0.05] p-8 rounded-[24px] min-h-[320px] flex flex-col justify-between opacity-0 group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-blue/10 z-10"
              >
                {/* Bottom-right expanding hover background gradient */}
                <div className="absolute bottom-0 right-0 w-0 h-0 bg-gradient-to-tr from-[#0575D7] to-[#29B6F6] rounded-tl-full group-hover:w-[300%] group-hover:h-[300%] transition-all duration-700 ease-out z-0 pointer-events-none" />

                {/* Top Section: Number and Title */}
                <div className="relative z-10 space-y-4">
                  <span className="text-3xl font-bold tracking-tight text-white block font-sans">
                    {String(i + 1).padStart(2, '0')}.
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight leading-snug block font-sans">
                    {p.title}
                  </h3>
                </div>

                {/* Bottom Section: Description */}
                <div className="relative z-10 mt-8">
                  <p className="text-slate-200 group-hover:text-white transition-colors duration-300 text-[14px] leading-relaxed font-light font-sans">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
