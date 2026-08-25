"use client";

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageBanner from '@/components/ui/PageBanner';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ContactForm() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    product: 'general',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const productParam = searchParams.get('product');
    if (productParam) {
      setFormData((prev) => ({
        ...prev,
        product: productParam,
        subject: `Inquiry for ${productParam}`,
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    // Entrance animations
    const ctx = gsap.context(() => {
      gsap.fromTo(
        infoRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        formRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, []);

  const productsList = [
    { value: 'general', label: 'General / Custom Synthesis Inquiry' },
    { value: '4-Bromo Toluene', label: '4-Bromo Toluene' },
    { value: '4-Bromo Ortho Cresol', label: '4-Bromo Ortho Cresol' },
    { value: 'Benzotrichloride (BTC)', label: 'Benzotrichloride (BTC)' },
    { value: '2,4,6-Tri Bromo Phenol', label: '2,4,6-Tri Bromo Phenol' },
    { value: '3-chloro benzotrifluoride', label: '3-chloro benzotrifluoride' },
    { value: '3-Amino benzotrifluoride', label: '3-Amino benzotrifluoride' },
    { value: '2,2-Dibromo-3-Nitrilopropionamide (DBNPA)', label: '2,2-Dibromo-3-Nitrilopropionamide (DBNPA)' },
    { value: '2-Bromo-2-Nitropropane-1,3-Diol (Bronopol)', label: '2-Bromo-2-Nitropropane-1,3-Diol (Bronopol)' },
    { value: 'Bromo Benzene', label: 'Bromo Benzene' },
    { value: '1,3 Di-Nitrobenzene (MDNB)', label: '1,3 Di-Nitrobenzene (MDNB)' },
    { value: '3-Nitro Aniline (MNA)', label: '3-Nitro Aniline (MNA)' },
    { value: 'N, N, N - Trimethyl Nitroanilinium Chloride (Nitri)', label: 'N, N, N - Trimethyl Nitroanilinium Chloride (Nitri)' },
    { value: '1 - Nitro Anthraquinone', label: '1 - Nitro Anthraquinone' },
    { value: '1 - Amino Anthraquinone', label: '1 - Amino Anthraquinone' },
    { value: 'Bromamine Acid', label: 'Bromamine Acid' },
    { value: '1,5 Dichloro Anthraquinone', label: '1,5 Dichloro Anthraquinone' },
    { value: '1,8 Dichloro Anthraquinone', label: '1,8 Dichloro Anthraquinone' },
    { value: '2 Chloro Benzotrichloride (OCBTC)', label: '2 Chloro Benzotrichloride (OCBTC)' },
    { value: '4-Chloro Benzotrichloride (PCBTC)', label: '4-Chloro Benzotrichloride (PCBTC)' },
    { value: 'Nebivolol Hydrochloride', label: 'Nebivolol Hydrochloride' },
    { value: '4-methylbenzyl chloride', label: '4-methylbenzyl chloride' },
    { value: '4-Chloro-4\'-Hydroxybenzophenone', label: '4-Chloro-4\'-Hydroxybenzophenone' },
    { value: 'Thiamethoxam', label: 'Thiamethoxam' },
    { value: 'Profenofos', label: 'Profenofos' },
    { value: 'Tebuconazole', label: 'Tebuconazole' },
    { value: 'Paclobutrazole', label: 'Paclobutrazole' },
    { value: 'Pymetrozine', label: 'Pymetrozine' },
    { value: 'Chlorantraniliprole', label: 'Chlorantraniliprole' },
    { value: 'Difenoconazole', label: 'Difenoconazole' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (formData.product === 'general') {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      }
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message content is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      product: 'general',
      subject: '',
      message: '',
    });
  };

  return (
    <>
      {/* Full-width section with sky blue background */}
      <div className="w-full bg-[#90D5FF] py-20 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Left Side: Get in touch details card */}
          <div ref={infoRef} className="lg:col-span-1 opacity-0 flex flex-col">
            <div className="bg-[#07132e] border border-white/[0.08] rounded-[24px] p-8 md:p-10 flex-grow flex flex-col justify-between min-h-[480px]">
              <div>
                <h2 className="text-4xl text-white tracking-tight mb-6 font-sans font-light">
                  Get in touch
                </h2>
                <p className="text-slate-300 text-sm font-light leading-relaxed mb-12 font-sans">
                  For queries and more information, please fill the form or mail to us at:
                </p>

                <ul className="space-y-8 font-sans">
                  {/* Email */}
                  <li className="flex items-start space-x-4">
                    <div className="text-[#7EC242] pt-1 shrink-0">
                      <svg className="w-6 h-6 text-[#7EC242]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div className="pt-0.5 flex flex-col gap-1.5">
                      <a href="mailto:jignesh@pragnapharma.com" className="text-white text-sm font-light hover:underline font-sans transition-all break-all">
                        jignesh@pragnapharma.com
                      </a>
                      <a href="mailto:sitaram@pragnadyechem.com" className="text-white text-sm font-light hover:underline font-sans transition-all break-all">
                        sitaram@pragnadyechem.com
                      </a>
                    </div>
                  </li>

                  {/* Phone */}
                  <li className="flex items-start space-x-4">
                    <div className="text-[#7EC242] pt-1 shrink-0">
                      <svg className="w-6 h-6 text-[#7EC242]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a20.373 20.373 0 01-6.727-6.727c-.155-.44.01-1.272.387-1.21l1.293-.97c.362-.271.528-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div className="pt-0.5 flex flex-col gap-1.5">
                      <a href="tel:+919723812606" className="text-white text-sm font-light hover:underline font-sans transition-all">
                        +91 97238 12606
                      </a>
                      <a href="tel:+919913014035" className="text-white text-sm font-light hover:underline font-sans transition-all">
                        +91 99130 14035
                      </a>
                    </div>
                  </li>

                  {/* Location */}
                  <li className="flex items-start space-x-4">
                    <div className="text-[#7EC242] pt-1 shrink-0">
                      <svg className="w-6 h-6 text-[#7EC242]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div className="pt-0.5">
                      <h4 className="text-white text-sm font-medium font-sans">Pragna Group (HQ)</h4>
                      <p className="text-slate-300 text-xs mt-1 leading-relaxed font-light font-sans">
                        Plot No.1210, GIDC Estate,<br />
                        Ankleshwar – 393002, Gujarat – India.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side: The White Form Card */}
          <div ref={formRef} className="lg:col-span-2 bg-white rounded-[32px] p-8 md:p-12 shadow-2xl opacity-0 flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Inquiry Type Radio Buttons */}
              <div className="flex items-center space-x-8 pb-4 font-sans">
                <span className="text-[#4F5B76] font-semibold text-sm">Inquiry Type</span>
                <label className="flex items-center space-x-2 text-slate-700 text-sm cursor-pointer select-none">
                  <input
                    type="radio"
                    name="inquiry-type"
                    checked={formData.product === 'general'}
                    onChange={() => setFormData(prev => ({ ...prev, product: 'general' }))}
                    className="w-4 h-4 text-[#0038A8] border-gray-300 focus:ring-[#0038A8]"
                  />
                  <span className="text-[#4F5B76] font-medium text-sm">General</span>
                </label>
                <label className="flex items-center space-x-2 text-slate-700 text-sm cursor-pointer select-none">
                  <input
                    type="radio"
                    name="inquiry-type"
                    checked={formData.product !== 'general'}
                    onChange={() => setFormData(prev => ({ ...prev, product: '4-Bromo Toluene' }))}
                    className="w-4 h-4 text-[#0038A8] border-gray-300 focus:ring-[#0038A8]"
                  />
                  <span className="text-[#4F5B76] font-medium text-sm">Business</span>
                </label>
              </div>

              {/* Name (Full Width) */}
              <div className="space-y-2 font-sans">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name *"
                  className={`w-full px-6 py-4 bg-white border rounded-[14px] text-sm focus:outline-none text-slate-800 placeholder-[#4F5B76]/50 ${errors.name ? 'border-red-500' : 'border-[#E2E8F0] focus:border-brand-cyan'
                    }`}
                />
                {errors.name && <p className="text-red-500 text-xs font-medium pl-2">{errors.name}</p>}
              </div>

              {/* Email, Company & Phone based on Inquiry Type */}
              {formData.product === 'general' ? (
                /* General Inquiry Fields: Email and Phone side by side */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
                  <div className="space-y-2">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email *"
                      className={`w-full px-6 py-4 bg-white border rounded-[14px] text-sm focus:outline-none text-slate-800 placeholder-[#4F5B76]/50 ${errors.email ? 'border-red-500' : 'border-[#E2E8F0] focus:border-brand-cyan'
                        }`}
                    />
                    {errors.email && <p className="text-red-500 text-xs font-medium pl-2">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number *"
                      className={`w-full px-6 py-4 bg-white border rounded-[14px] text-sm focus:outline-none text-slate-800 placeholder-[#4F5B76]/50 ${errors.phone ? 'border-red-500' : 'border-[#E2E8F0] focus:border-brand-cyan'
                        }`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs font-medium pl-2">{errors.phone}</p>}
                  </div>
                </div>
              ) : (
                /* Business Inquiry Fields: Email and Company side by side */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
                  <div className="space-y-2">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email *"
                      className={`w-full px-6 py-4 bg-white border rounded-[14px] text-sm focus:outline-none text-slate-800 placeholder-[#4F5B76]/50 ${errors.email ? 'border-red-500' : 'border-[#E2E8F0] focus:border-brand-cyan'
                        }`}
                    />
                    {errors.email && <p className="text-red-500 text-xs font-medium pl-2">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company Name"
                      className="w-full px-6 py-4 bg-white border border-[#E2E8F0] focus:border-brand-cyan rounded-[14px] text-sm focus:outline-none text-slate-800 placeholder-[#4F5B76]/50"
                    />
                  </div>
                </div>
              )}

              {/* Product Select & Subject based on Inquiry Type */}
              {formData.product === 'general' ? (
                /* General Inquiry Fields: Subject takes full width */
                <div className="space-y-2 font-sans">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject *"
                    className={`w-full px-6 py-4 bg-white border rounded-[14px] text-sm focus:outline-none text-slate-800 placeholder-[#4F5B76]/50 ${errors.subject ? 'border-red-500' : 'border-[#E2E8F0] focus:border-brand-cyan'
                      }`}
                  />
                  {errors.subject && <p className="text-red-500 text-xs font-medium pl-2">{errors.subject}</p>}
                </div>
              ) : (
                /* Business Inquiry Fields: Product Interest & Subject side by side */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
                  <div className="space-y-2">
                    <select
                      id="product"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-white border border-[#E2E8F0] focus:border-brand-cyan rounded-[14px] text-sm focus:outline-none text-[#4F5B76] cursor-pointer"
                    >
                      {productsList.map((prod) => (
                        <option key={prod.value} value={prod.value} className="bg-white text-slate-800">
                          {prod.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject *"
                      className={`w-full px-6 py-4 bg-white border rounded-[14px] text-sm focus:outline-none text-slate-800 placeholder-[#4F5B76]/50 ${errors.subject ? 'border-red-500' : 'border-[#E2E8F0] focus:border-brand-cyan'
                        }`}
                    />
                    {errors.subject && <p className="text-red-500 text-xs font-medium pl-2">{errors.subject}</p>}
                  </div>
                </div>
              )}

              {/* Message Details (Full Width) */}
              <div className="space-y-2 font-sans">
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  className={`w-full px-6 py-4 bg-white border rounded-[14px] text-sm focus:outline-none text-slate-800 placeholder-[#4F5B76]/50 resize-none ${errors.message ? 'border-red-500' : 'border-[#E2E8F0] focus:border-brand-cyan'
                    }`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs font-medium pl-2">{errors.message}</p>}
              </div>

              {/* Submit Block */}
              <div className="flex items-center space-x-3 pt-4 font-sans">
                <div className="h-10 w-10 rounded-full bg-[#7EC242] flex items-center justify-center text-white text-lg shrink-0 select-none">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" stroke="white" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <button
                  type="submit"
                  className="bg-[#0038A8] hover:bg-[#002D8C] text-white font-bold text-xs uppercase tracking-widest px-10 py-3.5 rounded-full transition-all duration-300 cursor-pointer shadow-md shadow-[#0038A8]/10"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Simulated Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center dark:bg-brand-blue/80 bg-slate-900/60 backdrop-blur-sm px-4">
          <div className="dark:bg-[#0F2240] bg-white rounded-2xl border dark:border-white/5 border-slate-200 shadow-2xl p-8 max-w-md w-full text-center space-y-5 animate-slide-up">
            <div className="h-16 w-16 dark:bg-slate-900/50 bg-slate-50 text-brand-mint rounded-full flex items-center justify-center text-3xl mx-auto border dark:border-brand-mint/20 border-brand-mint/10">
              ✓
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold dark:text-white text-slate-900 font-serif">Inquiry Sent Successfully</h3>
              <p className="dark:text-brand-text-muted text-slate-600 text-xs md:text-sm leading-relaxed font-light">
                Thank you for contacting Pragna Group, <span className="font-semibold dark:text-white text-slate-900">{formData.name}</span>. Your inquiry has been successfully simulated and logged. A trade expert will follow up via <span className="font-semibold dark:text-white text-slate-900">{formData.email}</span> shortly.
              </p>
            </div>
            <button
              onClick={handleCloseModal}
              className="w-full px-5 py-2.5 bg-[#FDF8F5] hover:bg-slate-100 border border-slate-200 text-foreground font-bold rounded-xl text-sm transition-colors cursor-pointer font-mono uppercase tracking-widest"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-[#FDF8F5] text-foreground transition-colors duration-300 relative pb-0">
        {/* Banner */}
        <PageBanner
          title="Contact Us"
          subtitle="Reach out to our team for sales, custom synthesis, or technical consultations"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Contact Us' }
          ]}
        />

        {/* Main Grid */}
        <Suspense fallback={<div className="text-center dark:text-slate-400 py-24">Loading inquiry form...</div>}>
          <ContactForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
