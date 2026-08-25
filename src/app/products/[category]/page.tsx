import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageBanner from '@/components/ui/PageBanner';
import ProductTable from '@/components/products/ProductTable';
import { products, categories } from '@/data/products';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { category: 'speciality-chemicals' },
    { category: 'dyes-intermediates' },
    { category: 'api-intermediates' },
    { category: 'agro-chemical-technical' },
  ];
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  
  const categoryTitle = categories[category as keyof typeof categories];
  
  if (!categoryTitle) {
    notFound();
  }

  const filteredProducts = products.filter((p) => p.category === category);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-[#FDF8F5] text-foreground transition-colors duration-300 pb-24">
        {/* Banner */}
        <PageBanner
          title={categoryTitle}
          subtitle="Explore our high-purity synthesis products and detailed specifications"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Products' },
            { label: categoryTitle }
          ]}
        />

        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <ProductTable products={filteredProducts} categoryTitle="Product Catalog" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
