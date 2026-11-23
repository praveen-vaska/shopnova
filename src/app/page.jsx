'use client';

import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import TrendingSection from '@/components/home/TrendingSection';
import PromoBanner from '@/components/home/PromoBanner';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import Link from 'next/link';
import { ArrowRight, Sparkles, HeartHandshake, ShieldCheck, Gem } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Category Showcase */}
      <CategoryShowcase />

      {/* 3. Trending Products with category filters */}
      <TrendingSection />

      {/* 4. Promotional Banner */}
      <PromoBanner />

      {/* 5. Brand Story Section ("Shopping Should Feel Special") */}
      <section className="py-20 bg-white border-t border-borderSubtle">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-borderSubtle bg-surface">
                <img
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1200&auto=format&fit=crop"
                  alt="ShopNova Artisanal Atelier"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-accent font-heading block mb-2">
                Our Philosophy
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary leading-tight mb-5">
                Shopping Should Feel Special.
              </h2>
              <p className="text-mutedText leading-relaxed mb-6 text-base">
                In an era of mass-produced clutter, ShopNova was built on a simple premise: everyday items should delight the senses, withstand the test of time, and be crafted with transparent integrity.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/15 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Gem className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-darkText">Conscious Material Curation</h4>
                    <p className="text-xs text-mutedText">Extrafine merino, aerospace titanium, and Normandy flax.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/15 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-darkText">Fair Trade Partnerships</h4>
                    <p className="text-xs text-mutedText">Direct collaboration with independent ateliers and certified creators.</p>
                  </div>
                </div>
              </div>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-sm font-heading font-bold text-primary hover:text-accent transition-colors"
              >
                <span>Read our sustainability manifesto</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Carousel */}
      <TestimonialsSection />
    </div>
  );
}
