"use client";

import { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  cas: string;
  formula?: string;
  molarMass?: string;
  appearance?: string;
  purity?: string;
  waterContent?: string;
  acidity?: string;
  description: string;
}

interface ProductTableProps {
  products: Product[];
  categoryTitle: string;
}

export default function ProductTable({ products, categoryTitle }: ProductTableProps) {
  const [search, setSearch] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(search.toLowerCase());
    const casMatch = product.cas ? product.cas.includes(search) : false;
    return nameMatch || casMatch;
  });

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="dark:bg-[#0F2240] bg-white rounded-2xl shadow-xl border dark:border-slate-800/80 border-slate-200 p-6 md:p-8 transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold dark:text-white text-slate-900 font-serif">{categoryTitle}</h2>
          <p className="dark:text-slate-400 text-slate-500 text-xs mt-1">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>
        <div className="relative max-w-md w-full">
          <input
            type="text"
            placeholder="Search by product name or CAS number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#FDF8F5] border dark:border-slate-800 border-slate-300 rounded-xl text-xs focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint dark:text-white text-slate-800 placeholder-slate-500 transition-colors"
          />
          <svg
            className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border dark:border-slate-800 border-slate-200 shadow-xs">
          <table className="min-w-full divide-y dark:divide-slate-800 divide-slate-200">
            <thead className="dark:bg-slate-900/60 bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold dark:text-slate-400 text-slate-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold dark:text-slate-400 text-slate-500 uppercase tracking-wider">
                  CAS Number
                </th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold dark:text-slate-400 text-slate-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="dark:bg-[#0F2240] bg-white divide-y dark:divide-slate-800 divide-slate-200">
              {filteredProducts.map((product, index) => (
                <tr key={index} className="dark:hover:bg-slate-900/10 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-xs md:text-sm font-bold dark:text-white text-slate-800">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-xs md:text-sm dark:text-slate-400 text-slate-600">
                    {product.cas ? (
                      <div className="flex items-center space-x-2">
                        <span className="font-mono dark:bg-slate-950 bg-slate-100 px-2 py-0.5 rounded border dark:border-slate-800 border-slate-200 text-[10px] md:text-xs">
                          {product.cas}
                        </span>
                        <button
                          onClick={() => copyToClipboard(product.cas, index)}
                          className="text-slate-500 hover:text-brand-mint transition-colors focus:outline-none cursor-pointer"
                          title="Copy CAS Number"
                        >
                          {copiedIndex === index ? (
                            <span className="text-[10px] text-brand-cyan font-bold">Copied!</span>
                          ) : (
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-500 italic text-[10px] md:text-xs">Not Available</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-xs md:text-sm">
                    <Link
                      href={`/products/${product.category}/${product.slug}`}
                      className="inline-flex items-center justify-center px-4 py-1.5 border border-brand-mint/50 hover:border-brand-mint text-xs font-bold rounded-lg text-brand-mint hover:bg-brand-mint hover:text-[#FDF8F5] transition-all cursor-pointer uppercase tracking-wider"
                    >
                      View Specs
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed dark:border-slate-800 border-slate-300 rounded-xl">
          <svg className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-4 text-sm font-semibold dark:text-white text-slate-800 font-serif">No products found</h3>
          <p className="mt-1 text-xs text-slate-500">Try adjusting your search keywords.</p>
        </div>
      )}
    </div>
  );
}
