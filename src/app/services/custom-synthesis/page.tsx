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

export default function CustomSynthesis() {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro sections reveal
      if (introRef.current) {
        gsap.fromTo(
          introRef.current.querySelector('.intro-content'),
          { x: -40, opacity: 0 },
          {
            x: 0,
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
        gsap.fromTo(
          introRef.current.querySelector('.capabilities-grid'),
          { x: 40, opacity: 0 },
          {
            x: 0,
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
      }

      // Workflow cards stagger
      if (workflowRef.current) {
        const cards = workflowRef.current.querySelectorAll('.workflow-card');
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: workflowRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const processes = [
    { name: 'Chlorination', desc: 'Process control of reactive halogenations' },
    { name: 'Bromination', desc: 'Precise radical & addition brominations' },
    { name: 'Coupling Reaction', desc: 'Suzuki, Negishi and similar transformations' },
    { name: 'Condensation Reaction', desc: 'High-yield condensation pathways' },
    { name: 'Grignard Reactions', desc: 'Organomagnesium chemical transformations' },
    { name: 'Hydrogenation Reaction', desc: 'Catalyzed reductions under 20-40 Bar pressure' },
    { name: 'Friedel-Crafts Alkylation', desc: 'Aromatic ring conversions' },
    { name: 'Photochemical Reactions', desc: 'Light-triggered reactions in custom flow equipment' },
    { name: 'Catalytic Reaction', desc: 'Metal and organocatalyzed processes' },
    { name: 'Amination', desc: 'Substitution of amino groups' },
    { name: 'Oxidation', desc: 'Controlled oxidations with high heat transfer design' },
    { name: 'Nitration', desc: 'High-safety energetic reaction runs' },
  ];

  const workflow = [
    { step: '01', title: 'Process Scoping & Inquiry', desc: 'Initial study of client requirements, target structures, and safety guidelines.' },
    { step: '02', title: 'Lab Development (R&D)', desc: 'Synthesis optimization on lab scale, impurity profiling, and cost estimation.' },
    { step: '03', title: 'Pilot Scale-up', desc: 'Evaluation of process safety, yield parameters, and heat release on 50kg - 500kg scales.' },
    { step: '04', title: 'Commercial Manufacturing', desc: 'Metric ton scale runs in our high-capacity reactors (up to 20kL GLRs).' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main ref={containerRef} className="flex-grow bg-[#FDF8F5] text-foreground transition-colors duration-300 pb-24">
        {/* Banner */}
        <PageBanner
          title="Custom Synthesis"
          subtitle="Partnering with global companies for reliable, scalable chemical processes"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services' },
            { label: 'Custom Synthesis' }
          ]}
        />

        {/* Intro */}
        <section ref={introRef} className="max-w-[1400px] mx-auto px-4 py-16 -mt-8 relative z-10">
          <div className="glass-card rounded-2xl p-8 md:p-12 border dark:border-white/5 border-slate-200 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              <div className="intro-content space-y-6 opacity-0">
                <span className="inline-flex items-center space-x-2 text-xs font-bold text-brand-mint tracking-[0.25em] uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-mint blink-dot"></span>
                  <span>Our Services</span>
                </span>
                <h2 className="text-2xl md:text-4xl font-bold dark:text-white text-slate-900 leading-tight font-serif">
                  An Ideal Outsourced Manufacturing Partner
                </h2>
                <div className="w-14 h-1 rounded-full bg-gradient-to-r from-brand-mint to-brand-cyan"></div>
                <div className="dark:text-brand-text-muted text-slate-600 text-sm md:text-base leading-relaxed space-y-5 font-light">
                  <p>
                    Pragna Group of industries provides a range of services to support custom manufacturing projects. The expansion of our manufacturing capacity supports a key strategy for Pragna Group as we continue to increase our Custom Manufacturing and Toll Manufacturing Services.
                  </p>
                  <p>
                    We provide service to global clients, ensuring process development, optimization, and commercial scale-up of processes are carried out in an efficient and cost-effective manner. We aim to become an outsourced manufacturer of choice by ensuring quality specifications are met and maintained.
                  </p>
                  <p>
                    We are an ideal partner, especially for companies who either don&apos;t have spare capacity or do not have suitable development/manufacturing facilities for a particular project. We provide our services at every stage and produce products from kilo to metric tons.
                  </p>
                </div>
              </div>

              <div className="capabilities-grid space-y-6 opacity-0">
                <h3 className="font-bold dark:text-white text-slate-900 text-xl font-serif">Technical Capabilities Summary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {processes.map((proc, i) => (
                    <div
                      key={i}
                      className="p-5 dark:bg-[#0B1626]/50 bg-white/70 border dark:border-white/5 border-slate-200 rounded-2xl space-y-1 shadow-md hover:border-brand-mint/30 hover:scale-[1.03] transition-all duration-300 group relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-mint/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <h4 className="font-bold dark:text-white text-slate-800 text-sm font-serif group-hover:text-brand-cyan transition-colors">{proc.name}</h4>
                      <p className="dark:text-brand-text-muted text-slate-600 text-[11px] font-light">{proc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Workflow */}
        <section ref={workflowRef} className="max-w-[1400px] mx-auto px-4 py-16">
          <div className="mb-16">
            <SectionHeader
              badge="The Process"
              title="Our Manufacturing"
              highlight="Workflow"
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflow.map((flow, i) => (
              <div
                key={i}
                className="workflow-card glass-card glass-card-hover p-8 rounded-2xl border dark:border-white/5 border-slate-200 shadow-2xl relative flex flex-col justify-between opacity-0 group"
              >
                {/* Border glow */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-mint/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="space-y-4">
                  <span className="text-5xl font-extrabold text-brand-mint/15 block font-mono group-hover:text-brand-mint/30 transition-colors duration-300">{flow.step}</span>
                  <h3 className="font-bold dark:text-white text-slate-800 text-lg font-serif group-hover:text-brand-cyan transition-colors">{flow.title}</h3>
                  <p className="dark:text-brand-text-muted text-slate-600 text-xs leading-relaxed font-light">{flow.desc}</p>
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
