"use client";

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import IntroAnimation from '@/components/ui/IntroAnimation';
import HeroSection from '@/components/home/HeroSection';
import AboutTeaser from '@/components/home/AboutTeaser';
import FeatureCards from '@/components/home/FeatureCards';
import StatsSection from '@/components/home/StatsSection';
import ProductsShowcase from '@/components/home/ProductsShowcase';
import GroupCompanies from '@/components/home/GroupCompanies';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';
import ProductsAlternatingSection from '@/components/home/ProductsAlternatingSection';

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    // Only check sessionStorage on client side mount
    const introPlayed = sessionStorage.getItem('intro-played');
    if (!introPlayed) {
      setShowIntro(true);
    } else {
      setIntroFinished(true);
    }
  }, []);

  const handleIntroFinish = () => {
    sessionStorage.setItem('intro-played', 'true');
    setShowIntro(false);
    setIntroFinished(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar mounts immediately and floats on top of the video splash */}
      <Navbar />

      {showIntro && <IntroAnimation onFinish={handleIntroFinish} />}

      {introFinished ? (
        <>
          <main className="flex-grow">
            <HeroSection />

            <div className="bg-[#0D0D39] py-24 w-full overflow-hidden">
              <ScrollStack
                useWindowScroll={true}
                itemDistance={100}
                itemScale={0.03}
                itemStackDistance={35}
                stackPosition="12%"
                scaleEndPosition="4%"
                className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"
              >
                <ScrollStackItem>
                  <div className="overflow-hidden rounded-[2.5rem] border border-black/8 shadow-lg">
                    <AboutTeaser />
                  </div>
                </ScrollStackItem>
                <ScrollStackItem>
                  <div className="overflow-hidden rounded-[2.5rem] border border-black/8 shadow-lg">
                    <FeatureCards />
                  </div>
                </ScrollStackItem>
                <ScrollStackItem>
                  <div className="overflow-hidden rounded-[2.5rem] border border-black/8 shadow-lg">
                    <ProductsShowcase />
                  </div>
                </ScrollStackItem>
              </ScrollStack>
            </div>

            <StatsSection />
            <ProductsAlternatingSection />
            <GroupCompanies />
          </main>
          <Footer showWordmark={true} />
        </>
      ) : (
        <main className="flex-grow" />
      )}
    </div>
  );
}
