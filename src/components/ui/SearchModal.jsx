'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { formatCurrency } from '@/utils/format';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, products } = useShop();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  // Popular searches
  const popularKeywords = ["Headphones", "Denim Jacket", "Smart Watch", "Merino Sweater", "Linen", "Coffee"];

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const q = searchQuery.toLowerCase();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 8));
  }, [searchQuery, products]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    if (isSearchOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-primary/80 backdrop-blur-md flex flex-col items-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      {/* Search Container Box */}
      <div className="w-full max-w-2xl bg-white rounded-md shadow-2xl p-6 border border-borderSubtle">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b-2 border-borderSubtle pb-4">
          <Search className="w-6 h-6 text-accent absolute left-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, brands, or categories..."
            autoFocus
            className="w-full pl-9 pr-10 text-lg sm:text-xl font-heading font-medium text-darkText placeholder-mutedText outline-none bg-transparent"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="text-mutedText hover:text-darkText p-1"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-mutedText hover:text-darkText p-1 text-xs font-bold uppercase tracking-wider"
            >
              ESC
            </button>
          )}
        </div>

        {/* Popular searches suggestions */}
        {!searchQuery && (
          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-wider text-mutedText mb-3">
              Popular Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {popularKeywords.map((kw) => (
                <button
                  key={kw}
                  onClick={() => setSearchQuery(kw)}
                  className="px-3 py-1.5 bg-surface hover:bg-surface-hover text-darkText rounded-full text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <Tag className="w-3 h-3 text-accent" />
                  {kw}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div className="mt-5 max-h-[380px] overflow-y-auto divide-y divide-borderSubtle">
            {results.length === 0 ? (
              <div className="text-center py-8 text-mutedText text-sm">
                No products found matching "{searchQuery}". Try different keywords.
              </div>
            ) : (
              results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="py-3 flex items-center gap-4 hover:bg-surface/60 px-2 rounded-sm transition-colors group"
                >
                  <img
                    src={product.image || product.images?.[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800'}
                    alt={product.name}
                    className="w-14 h-16 object-cover rounded bg-surface"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] uppercase font-bold text-mutedText tracking-wider">
                      {product.brand}
                    </p>
                    <h4 className="font-heading font-semibold text-sm text-darkText group-hover:text-accent truncate">
                      {product.name}
                    </h4>
                    <p className="font-heading font-bold text-sm text-darkText mt-0.5">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-mutedText group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </Link>
              ))
            )}
          </div>
        )}
      </div>

      {/* Close button outside */}
      <button
        onClick={() => setIsSearchOpen(false)}
        className="mt-6 text-white/80 hover:text-white flex items-center gap-2 text-sm font-heading font-semibold"
      >
        <X className="w-5 h-5" /> Close Search
      </button>
    </div>
  );
}
