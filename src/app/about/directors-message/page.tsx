"use client";

import { useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageBanner from '@/components/ui/PageBanner';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DirectorsMessage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        portraitRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
      gsap.fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-[#FDF8F5] text-foreground transition-colors duration-300 pb-24">
        {/* Banner */}
        <PageBanner
          title="Director's Message"
          subtitle="A word from the founder of Pragna Group"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Company', href: '/about' },
            { label: "Director's Message" }
          ]}
        />

        {/* Message Content */}
        <section ref={containerRef} className="max-w-[1200px] mx-auto px-4 py-16 -mt-8 relative z-10">
          <div className="glass-card rounded-2xl p-8 md:p-12 shadow-2xl border dark:border-white/5 border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
              
              {/* Portrait Panel */}
              <div ref={portraitRef} className="md:col-span-1 flex flex-col items-center text-center space-y-4 opacity-0">
                <div className="h-80 w-64 rounded-2xl shadow-2xl overflow-hidden group">
                  <img
                    src="/assets/director.png"
                    alt="Dr. Mahesh Patel Portrait"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <h3 className="font-bold dark:text-white text-slate-900 text-lg font-serif">Dr. Mahesh Patel</h3>
                  <p className="dark:text-slate-400 text-slate-500 text-xs font-semibold uppercase tracking-wider mt-1">Founder & Managing Director</p>
                  <p className="text-brand-mint text-xs font-bold mt-1 tracking-widest font-mono">PRAGNA GROUP</p>
                </div>
              </div>

              {/* Text Message */}
              <div ref={textRef} className="md:col-span-2 space-y-6 opacity-0">
                <span className="text-7xl text-brand-mint/20 leading-none select-none block h-4 font-serif">“</span>
                <div className="dark:text-brand-text-muted text-slate-600 text-sm md:text-base leading-relaxed space-y-5 font-light">
                  <p className="font-semibold dark:text-slate-200 text-slate-800 text-lg leading-snug">
                    At Pragna, we are more than just a business; we are a thriving ecosystem where innovation, sustainability, and humanity converge.
                  </p>
                  <p>
                    Our vision is deeply rooted in contributing to the nation&apos;s growth while safeguarding the environment. Every step we take is guided by our commitment to sustainability, ensuring that progress today does not compromise the future of our planet.
                  </p>
                  <p>
                    As a group, we continuously embrace new technologies and innovative practices, driving excellence and resilience in our operations. Growth, for us, is not just about expanding our business; it is about enriching lives—our employees, their families, and the communities we serve.
                  </p>
                  <p>
                    We are proud to support our team members with robust insurance and welfare programs, fostering a sense of security and belonging that empowers them to thrive both professionally and personally.
                  </p>
                  <p>
                    At Pragna, we see ourselves as one unified family, where each individual plays a pivotal role in our shared success. Together, we work towards creating a better tomorrow—one that embodies harmony between industrial progress and environmental stewardship.
                  </p>
                </div>
                <div className="pt-6 border-t dark:border-white/5 border-slate-200 flex justify-between items-center text-xs font-bold text-slate-500 tracking-wider font-mono">
                  <span>ESTD. 1999</span>
                  <span className="text-brand-mint">PRAGNA GROUP OF COMPANIES</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
