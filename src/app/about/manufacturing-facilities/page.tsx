"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageBanner from '@/components/ui/PageBanner';
import ManufacturingInfographic from '@/components/about/ManufacturingInfographic';

export default function ManufacturingFacilities() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-[#FDF8F5] text-foreground transition-colors duration-300 pb-24">
        <PageBanner
          title="Manufacturing Facilities"
          subtitle="Explore our advanced high-capacity industrial manufacturing units"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Company', href: '/about' },
            { label: 'Manufacturing Facilities' }
          ]}
        />

        <ManufacturingInfographic />
      </main>

      <Footer />
    </div>
  );
}
