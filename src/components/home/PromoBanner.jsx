'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function PromoBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-secondary rounded-2xl border border-borderSubtle overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left Text */}
          <div className="p-8 sm:p-12 lg:p-16 lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Seasonal Highlights</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-primary leading-tight mb-4">
              Something New.<br />Something You.
            </h2>
            <p className="text-mutedText text-base sm:text-lg mb-8 leading-relaxed max-w-md">
              Fresh styles, latest gadgets and home favourites — curated thoughtfully just for you with premium craftsmanship.
            </p>
            <div>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-7 py-3.5 rounded-sm font-heading font-bold text-sm shadow-md transition-all group"
              >
                <span>Shop the Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Aesthetic Imagery */}
          <div className="lg:col-span-6 h-full min-h-[340px] sm:min-h-[420px] relative">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"
              alt="Promo lifestyle"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}
