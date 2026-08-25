"use client";

import { useState, useEffect, use, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageBanner from '@/components/ui/PageBanner';
import { products, categories } from '@/data/products';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { category, slug } = use(params);

  const [product, setProduct] = useState<typeof products[0] | null>(null);
  const [activeTab, setActiveTab] = useState<'specs' | 'safety'>('specs');
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    company: '',
    quantity: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const foundProduct = products.find(
      (p) => p.category === category && p.slug === slug
    );
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      router.push(`/products/${category}`);
    }
  }, [category, slug, router]);

  useEffect(() => {
    if (!product) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
      );
      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
        );
      }
    });
    return () => ctx.revert();
  }, [product]);

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center dark:text-slate-400 text-slate-500">
        <p>Loading product details...</p>
      </div>
    );
  }

  const categoryName = categories[product.category as keyof typeof categories] || 'Chemical Products';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInquiryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inquiryForm.name.trim() && inquiryForm.email.trim()) {
      setSubmitted(true);
    }
  };

  const specRows = product.detailedSpecs
    ? Object.entries(product.detailedSpecs).map(([label, value]) => ({ label, value }))
    : [
        { label: 'Appearance', value: product.appearance || 'N/A' },
        { label: 'Purity', value: product.purity || 'N/A' },
        { label: 'Water Content (KF)', value: product.waterContent || 'N/A' },
        { label: 'Acidity (as HCl / pH)', value: product.acidity || 'N/A' },
        { label: 'Molar Mass', value: product.molarMass || 'N/A' },
        { label: 'Chemical Formula', value: product.formula || 'N/A' },
      ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-[#FDF8F5] text-foreground transition-colors duration-300 pb-24">
        {/* Banner */}
        <PageBanner
          title={product.name}
          subtitle={`Molecular Formula: ${product.formula || 'N/A'} • CAS No: ${product.cas || 'N/A'}`}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: categoryName, href: `/products/${product.category}` },
            { label: product.name }
          ]}
        />

        {/* Content Section */}
        <section className="max-w-[1400px] mx-auto px-4 py-16 -mt-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Details & Specs Tab System */}
            <div ref={leftRef} className="lg:col-span-2 space-y-8 opacity-0">
              <div className="glass-card rounded-2xl border dark:border-white/5 border-slate-200 p-6 md:p-8 space-y-6 shadow-2xl">
                
                {/* Tabs */}
                <div className="flex border-b dark:border-white/5 border-slate-200">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-4 px-6 text-sm font-bold uppercase tracking-wider relative transition-colors cursor-pointer ${
                      activeTab === 'specs' ? 'text-brand-mint font-extrabold' : 'dark:text-slate-400 text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Technical Specifications
                    {activeTab === 'specs' && (
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-mint to-brand-cyan"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('safety')}
                    className={`pb-4 px-6 text-sm font-bold uppercase tracking-wider relative transition-colors cursor-pointer ${
                      activeTab === 'safety' ? 'text-brand-mint font-extrabold' : 'dark:text-slate-400 text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Safety & Handling
                    {activeTab === 'safety' && (
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-mint to-brand-cyan"></div>
                    )}
                  </button>
                </div>

                {/* Tab Contents */}
                {activeTab === 'specs' ? (
                  <div className="space-y-8 animate-fade-in">
                    <div>
                      <h3 className="text-lg font-bold dark:text-white text-slate-900 mb-2.5 font-serif">Product Description</h3>
                      <p className="dark:text-brand-text-muted text-slate-600 text-sm leading-relaxed font-light">{product.description}</p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-bold dark:text-white text-slate-900 font-serif">Standard Certificate Specifications</h3>
                      <div className="overflow-hidden rounded-xl border dark:border-white/5 border-slate-200 shadow-lg">
                        <table className="min-w-full divide-y dark:divide-white/5 divide-slate-200">
                          <thead className="dark:bg-slate-900/60 bg-slate-50">
                            <tr>
                              <th className="px-6 py-4 text-left text-xs font-bold dark:text-slate-400 text-slate-500 uppercase tracking-widest font-mono">Parameters</th>
                              <th className="px-6 py-4 text-left text-xs font-bold dark:text-slate-400 text-slate-500 uppercase tracking-widest font-mono">Specifications</th>
                            </tr>
                          </thead>
                          <tbody className="dark:bg-[#0B1626]/50 bg-white divide-y dark:divide-white/5 divide-slate-200">
                            {specRows.map((row, idx) => (
                              <tr key={idx} className="hover:bg-slate-50/20 dark:hover:bg-slate-900/10 transition-colors">
                                <td className="px-6 py-4 text-xs md:text-sm font-bold dark:text-slate-200 text-slate-800">{row.label}</td>
                                <td className="px-6 py-4 text-xs md:text-sm dark:text-brand-text-muted text-slate-600 font-mono">
                                  {row.value}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 text-sm dark:text-brand-text-muted text-slate-600 leading-relaxed font-light animate-fade-in">
                    <div className="space-y-2.5">
                      <h3 className="text-lg font-bold dark:text-white text-slate-900 font-serif">Packaging & Packing Options</h3>
                      <p>Standard packaging options range from 25 kg fiber drums, HDPE drums, to ISO tank containers based on regulatory storage demands and safety parameters.</p>
                    </div>
                    <div className="space-y-2.5">
                      <h3 className="text-lg font-bold dark:text-white text-slate-900 font-serif">Storage Recommendations</h3>
                      <p>Store in original closed containers in cool, dry, and well-ventilated spaces. Keep away from incompatible materials, food items, strong oxidizing bases, and direct heat or combustion sources.</p>
                    </div>
                    <div className="space-y-2.5">
                      <h3 className="text-lg font-bold dark:text-white text-slate-900 font-serif">Handling & Transport Regulations</h3>
                      <p>All compounds are certified and dispatched under standardized international logistics guidelines, accompanied by updated safety data sheets (SDS) detailing hazard classes, transport classifications, and emergency protocols.</p>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Quick Stats Panel & RFQ Form */}
            <div ref={rightRef} className="lg:col-span-1 space-y-8">
              
              {/* Quick Specs Panel */}
              <div className="glass-card rounded-2xl border dark:border-white/5 border-slate-200 p-6 space-y-4 shadow-2xl opacity-0">
                <h3 className="text-base font-bold dark:text-white text-slate-900 border-b dark:border-white/5 border-slate-200 pb-2.5 font-serif">Quick Reference</h3>
                
                <div className="space-y-3.5 text-xs md:text-sm">
                  <div className="flex justify-between items-center">
                    <span className="dark:text-slate-400 text-slate-500 font-semibold">CAS Number:</span>
                    <span className="font-mono text-brand-mint font-bold dark:bg-slate-900/60 bg-slate-100 px-2.5 py-0.5 rounded border dark:border-white/5 border-slate-200">{product.cas || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="dark:text-slate-400 text-slate-500 font-semibold">Formula:</span>
                    <span className="font-mono dark:text-white text-slate-800 font-bold">{product.formula || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="dark:text-slate-400 text-slate-500 font-semibold">Molar Mass:</span>
                    <span className="dark:text-white text-slate-800 font-medium font-mono">{product.molarMass || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="dark:text-slate-400 text-slate-500 font-semibold">Category:</span>
                    <span className="text-brand-cyan font-bold">{categoryName}</span>
                  </div>
                </div>
              </div>

              {/* Direct RFQ / Inquiry Panel */}
              <div className="glass-card rounded-2xl border dark:border-white/5 border-slate-200 p-6 space-y-4 shadow-2xl opacity-0 group relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-mint/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-base font-bold dark:text-white text-slate-900 border-b dark:border-white/5 border-slate-200 pb-2.5 font-serif">Inquire for this Product</h3>
                
                {submitted ? (
                  <div className="text-center py-6 space-y-3 dark:bg-slate-900/30 bg-slate-50 rounded-xl border dark:border-white/5 border-slate-200 animate-fade-in">
                    <span className="text-3xl text-brand-mint block">✓</span>
                    <h4 className="font-bold dark:text-white text-slate-900 text-sm font-serif">RFQ Submitted</h4>
                    <p className="dark:text-brand-text-muted text-slate-600 text-xs px-4 font-light">
                      Your inquiry has been successfully sent. A representative will contact you at <strong>{inquiryForm.email}</strong> shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setInquiryForm({ name: '', email: '', company: '', quantity: '', message: '' });
                      }}
                      className="mt-2 text-xs font-bold text-brand-cyan hover:underline cursor-pointer"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold dark:text-slate-400 text-slate-500 uppercase tracking-widest font-mono">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={inquiryForm.name}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 bg-[#FDF8F5] border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint text-foreground"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold dark:text-slate-400 text-slate-500 uppercase tracking-widest font-mono">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={inquiryForm.email}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 bg-[#FDF8F5] border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint text-foreground"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold dark:text-slate-400 text-slate-500 uppercase tracking-widest font-mono">Company Name</label>
                      <input
                        type="text"
                        name="company"
                        value={inquiryForm.company}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 bg-[#FDF8F5] border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint text-foreground"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold dark:text-slate-400 text-slate-500 uppercase tracking-widest font-mono">Required Quantity (Tons / kg)</label>
                      <input
                        type="text"
                        name="quantity"
                        placeholder="e.g. 5 Tons"
                        value={inquiryForm.quantity}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 bg-[#FDF8F5] border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint text-foreground"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold dark:text-slate-400 text-slate-500 uppercase tracking-widest font-mono">Message / Specs Requirements</label>
                      <textarea
                        name="message"
                        rows={3}
                        value={inquiryForm.message}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 bg-[#FDF8F5] border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint text-foreground"
                        placeholder="Enter custom specifications..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-primary justify-center py-2.5 text-xs font-mono tracking-widest"
                    >
                      Submit Quote Request
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
