"use client";

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageBanner from '@/components/ui/PageBanner';
import ManufacturingInfographic from '@/components/about/ManufacturingInfographic';
import { Download, Share2, X, Maximize2, Check, ZoomIn, ZoomOut } from 'lucide-react';
import gsap from 'gsap';

interface ImageDetail {
  src: string;
  title: string;
  description: string;
}

export default function ManufacturingFacilities() {
  const [selectedImage, setSelectedImage] = useState<ImageDetail | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [zoomScale, setZoomScale] = useState<number>(1);
  
  const images: ImageDetail[] = [
    {
      src: '/assets/manufacturing02.jpg',
      title: 'Quality & Catalytic Runs Facility',
      description: 'Dedicated environmental compliant systems implementing green process chemistry and catalysts recycling.',
    },
  ];

  // Reset zoom scale whenever selected image changes or closes
  useEffect(() => {
    setZoomScale(1);
  }, [selectedImage]);

  // Animate the image cards on load
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.animate-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
      );
    }
  }, []);

  const handleShare = async (img: ImageDetail) => {
    const shareUrl = `${window.location.origin}${img.src}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: img.title,
          text: img.description,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    }
  };

  const handleDownload = async (img: ImageDetail) => {
    setDownloading(true);
    try {
      const response = await fetch(img.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // Get filename from path
      const filename = img.src.split('/').pop() || 'manufacturing-facility.jpg';
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading file:', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleZoomIn = () => {
    setZoomScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomScale(prev => Math.max(prev - 0.25, 1));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main ref={containerRef} className="flex-grow bg-[#FDF8F5] text-foreground transition-colors duration-300 pb-24">
        {/* Banner */}
        <PageBanner
          title="Manufacturing Facilities"
          subtitle="Explore our advanced high-capacity industrial manufacturing units"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Company', href: '/about' },
            { label: 'Manufacturing Facilities' }
          ]}
        />

        {/* Facilities Showroom Section */}
        <section className="max-w-[1400px] mx-auto px-4 py-16 -mt-8 relative z-10">
          <div className="grid grid-cols-1 max-w-3xl mx-auto gap-10 md:gap-16">
            {images.map((img, i) => (
              <div 
                key={i} 
                className="animate-card opacity-0 flex flex-col group bg-white/60 border border-slate-200/80 rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-6 md:p-8 space-y-6"
              >
                {/* Visual Image Container (Renders the Full Uncropped Image) */}
                <div 
                  className="relative overflow-hidden w-full bg-slate-100/40 rounded-2xl flex items-center justify-center p-2 cursor-pointer" 
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-auto max-h-[500px] object-contain rounded-xl transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-950/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl">
                    <div className="p-4 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-slate-800 scale-90 group-hover:scale-100 transition-all duration-300">
                      <Maximize2 size={24} className="animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Text Content & Details */}
                <div className="flex flex-col justify-between flex-grow space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-900 font-serif leading-tight">
                      {img.title}
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed font-light font-sans">
                      {img.description}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedImage(img)}
                      className="flex-1 inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-widest rounded-2xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <Maximize2 size={16} />
                      <span>View Fullscreen</span>
                    </button>
                    
                    <button
                      onClick={() => handleDownload(img)}
                      title="Download Image"
                      disabled={downloading}
                      className="p-3.5 border border-slate-200 hover:border-brand-mint text-slate-700 hover:text-brand-mint rounded-2xl transition-all hover:bg-brand-mint/5 active:scale-[0.95] cursor-pointer disabled:opacity-50"
                    >
                      <Download size={18} />
                    </button>

                    <button
                      onClick={() => handleShare(img)}
                      title="Share Image"
                      className="p-3.5 border border-slate-200 hover:border-brand-cyan text-slate-700 hover:text-brand-cyan rounded-2xl transition-all hover:bg-brand-cyan/5 active:scale-[0.95] cursor-pointer"
                    >
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <ManufacturingInfographic />
      </main>

      {/* Lightbox / Immersive Full-Screen Modal (Occupies Entire Screen Page, No Text/Download/Share) */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[99999] bg-slate-950 flex items-center justify-center animate-fade-in select-none w-screen h-screen overflow-hidden"
          onClick={() => setSelectedImage(null)}
        >
          {/* Floating Close Button in Top-Right */}
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 z-[100001] p-3.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-full transition-all cursor-pointer shadow-lg hover:rotate-90 duration-300"
          >
            <X size={24} />
          </button>

          {/* Floating Zoom Controls at Bottom-Center */}
          <div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[100001] flex items-center bg-slate-900/90 border border-white/10 backdrop-blur-md rounded-2xl p-1.5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleZoomOut}
              disabled={zoomScale <= 1}
              title="Zoom Out"
              className="p-2 text-white hover:text-brand-mint hover:bg-white/5 rounded-xl transition-all cursor-pointer disabled:opacity-30 disabled:hover:text-white"
            >
              <ZoomOut size={18} />
            </button>
            <span className="px-4 text-white text-xs font-mono min-w-[60px] text-center select-none">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomScale >= 3}
              title="Zoom In"
              className="p-2 text-white hover:text-brand-mint hover:bg-white/5 rounded-xl transition-all cursor-pointer disabled:opacity-30 disabled:hover:text-white"
            >
              <ZoomIn size={18} />
            </button>
          </div>

          {/* Full Screen Image Wrapper */}
          <div className="w-full h-full overflow-auto flex items-center justify-center p-2">
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              onClick={(e) => e.stopPropagation()}
              style={{
                transform: `scale(${zoomScale})`,
                transition: 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
              className="max-w-full max-h-full object-contain rounded-sm shadow-2xl select-none"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
