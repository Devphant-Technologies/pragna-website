"use client";

import { useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageBanner from '@/components/ui/PageBanner';
import SectionHeader from '@/components/ui/SectionHeader';
import StylishCarousel from '@/components/lightswind/stylish-carousel';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Profile() {
  const mainRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const chooseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro sections reveal
      if (introRef.current) {
        gsap.fromTo(
          introRef.current.querySelector('.intro-text'),
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: introRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
        gsap.fromTo(
          introRef.current.querySelector('.intro-card'),
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: introRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Why choose cards stagger
      if (chooseRef.current) {
        const cards = chooseRef.current.querySelectorAll('.choose-card');
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
              trigger: chooseRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const values = [
    { title: 'Ongoing Delivery', desc: 'Prompt deliveries and strict adherence to committed delivery schedules form the cornerstone of our operations.' },
    { title: 'Customer Focus', desc: 'We excel at understanding customer quality requirements and consistently deliver value-added solutions.' },
    { title: 'Production Facility', desc: 'Modern manufacturing plants equipped with advanced machinery and eco-friendly technologies.' },
    { title: 'Business Relations', desc: 'We proactively nurture strategic business partnerships based on mutual trust, transparency, and ethical standards.' },
    { title: 'Scientific Method', desc: 'We leverage standard scientific systems, analytics, and operational feedback loops to optimize productivity and yield.' },
  ];

  const carouselItems = [
    {
      title: 'Ongoing Delivery',
      desc: 'Prompt deliveries and strict adherence to committed delivery schedules form the cornerstone of our operations.',
      src: '/assets/ongoing_delivery.png',
      iconNumber: '01'
    },
    {
      title: 'Customer Focus',
      desc: 'We excel at understanding customer quality requirements and consistently deliver value-added solutions.',
      src: '/assets/customer_focus.png',
      iconNumber: '02'
    },
    {
      title: 'Production Facility',
      desc: 'Modern manufacturing plants equipped with advanced machinery and eco-friendly technologies.',
      src: '/assets/production_facility.png',
      iconNumber: '03'
    },
    {
      title: 'Business Relations',
      desc: 'We proactively nurture strategic business partnerships based on mutual trust, transparency, and ethical standards.',
      src: '/assets/business_relation.png',
      iconNumber: '04'
    },
    {
      title: 'Scientific Method',
      desc: 'We leverage standard scientific systems, analytics, and operational feedback loops to optimize productivity and yield.',
      src: '/assets/scientific_method.png',
      iconNumber: '05'
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main ref={mainRef} className="flex-grow bg-[#FDF8F5] text-foreground transition-colors duration-300 pb-0">
        {/* Banner */}
        <PageBanner
          title="Company Profile"
          subtitle="Learn more about our heritage, vision, and corporate choices"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Company Profile' }
          ]}
        />

        {/* Intro Section */}
        <section ref={introRef} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8 relative z-10">
          <div className="glass-card rounded-2xl p-8 md:p-12 shadow-2xl border dark:border-white/5 border-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="intro-text space-y-6 opacity-0">
                <span className="inline-flex items-center space-x-2 text-xs font-bold text-brand-mint tracking-[0.25em] uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-mint blink-dot"></span>
                  <span>Our History</span>
                </span>
                <h2 className="text-2xl md:text-4xl font-bold dark:text-white text-slate-900 leading-tight font-serif">
                  Leading Agrochemical & Fine Chemical Manufacturer
                </h2>
                <div className="w-14 h-1 rounded-full bg-gradient-to-r from-brand-mint to-brand-cyan"></div>
                <div className="space-y-4 dark:text-brand-text-muted text-slate-600 text-sm md:text-base leading-relaxed font-light">
                  <p>Pragna Group was established in the year 1999. It is promoted and beckoned by a team of trade experts. We are a leading manufacturer and exporter of high-quality intermediates of Speciality & Agro Intermediates, Dyes Intermediates & Fine Chemicals, and Pharmaceutical Intermediates.</p>
                  <p>Prompt deliveries and adherence to committed Delivery schedules has been one of the company&apos;s foremost policies. The Company possesses the latest machineries and green process technologies which provides the best environment to manufacture high-quality intermediates.</p>
                  <p>Our technical and marketing teams are experts in their own fields, boasting vast experience in production, research, and marketing. We believe in complete transparency in all client partnerships.</p>
                </div>
              </div>

              <div className="intro-card dark:bg-[#0B1626] bg-slate-50/50 border dark:border-white/5 border-slate-200 p-8 rounded-2xl space-y-6 shadow-lg opacity-0">
                <h3 className="font-bold dark:text-white text-slate-900 text-lg font-serif">Process Scale & Capacities</h3>
                <div className="space-y-4 dark:text-brand-text-muted text-slate-600 text-sm leading-relaxed font-light">
                  <p>Pragna Group has the capability to provide a range of services to support custom manufacturing projects. The expansion of our manufacturing capacity supports a key strategy as we continue to increase our Custom Manufacturing and Toll Manufacturing Services.</p>
                  <p>We provide processes development, optimization, and commercial scale-up services for global clients in an efficient and cost-effective manner.</p>
                </div>
                <Link
                  href="/services/custom-synthesis"
                  className="inline-flex items-center space-x-2 px-6 py-2.5 dark:bg-white/5 bg-slate-100 dark:border-white/5 border-slate-200 border text-xs font-bold rounded-full dark:text-white text-slate-700 cursor-pointer group hover:border-brand-mint transition-colors"
                >
                  <span className="uppercase tracking-widest relative z-10 group-hover:text-brand-mint transition-colors">Explore Toll Services</span>
                  <span className="flex items-center justify-center p-1 rounded-full bg-slate-200 dark:bg-slate-800 group-hover:translate-x-1 transition-transform">
                    <svg className="h-3 w-3 dark:text-white text-slate-700 group-hover:text-brand-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section ref={chooseRef} className="w-full bg-[#0D0D39] py-20 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <SectionHeader
                badge="Our Pillars"
                title="Why Choose"
                highlight="Us?"
                align="center"
                light={true}
              />
            </div>

            <div className="choose-card w-full flex justify-center py-6 opacity-0">
              <div className="w-full max-w-lg">
                <StylishCarousel
                  items={carouselItems}
                  initialIndex={2}
                  showArrows={false}
                  showDots={false}
                  showControls={false}
                  showCounter={false}
                  clickToNavigate={true}
                  slideSize="clamp(280px, 85vw, 360px)"
                  rotationDegrees={12}
                  inactiveScale={0.8}
                  yOffsetPercent={12}
                  borderRadius="1.5rem"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
