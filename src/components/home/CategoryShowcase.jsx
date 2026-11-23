'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/categories';

export default function CategoryShowcase() {
  return (
    <section id="categories" className="py-16 md:py-20 bg-white">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent font-heading block mb-1.5">
              Curated Collections
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-primary">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-heading font-semibold text-darkText hover:text-accent transition-colors flex items-center gap-1.5 group"
          >
            <span>Explore All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Grid Category Showcase matching Image 2 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              className="group bg-surface hover:bg-secondary border border-borderSubtle rounded-xl p-5 text-center flex flex-col items-center justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card hover:border-accent"
            >
              {/* Circular Thumbnail with zoom */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 bg-white shadow-sm border border-borderSubtle/60 flex-shrink-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-darkText group-hover:text-accent transition-colors mb-1">
                  {cat.shortName}
                </h3>
                <p className="text-[11px] text-mutedText line-clamp-1">
                  {cat.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="mt-3 w-7 h-7 rounded-full bg-white flex items-center justify-center text-mutedText group-hover:bg-accent group-hover:text-white transition-all shadow-subtle">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
