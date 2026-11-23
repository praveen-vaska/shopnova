'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import QuickViewModal from '@/components/ui/QuickViewModal';
import { useShop } from '@/context/ShopContext';

export default function TrendingSection() {
  const { products } = useShop();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'home-living', label: 'Home' },
    { id: 'beauty', label: 'Beauty' },
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedFilter === 'all') return true;
    return p.category === selectedFilter;
  }).slice(0, 8);

  return (
    <section className="py-16 md:py-20 bg-secondary/50 border-t border-borderSubtle">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filter Tabs matching Image 2 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent font-heading block mb-1.5">
              Handpicked Essentials
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-primary">
              Trending Products
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-heading font-semibold transition-all whitespace-nowrap ${
                  selectedFilter === tab.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white text-mutedText hover:text-darkText hover:bg-surface border border-borderSubtle'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4-column Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* Bottom CTA to Shop */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-surface border border-borderDark text-darkText font-heading font-bold text-sm rounded-sm shadow-subtle transition-all group"
          >
            <span>Explore All 50 Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
}
