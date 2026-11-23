'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { reviews } from '@/data/reviews';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const current = reviews[currentIndex];

  return (
    <section className="py-20 bg-secondary/60 border-t border-borderSubtle">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-accent font-heading block mb-2">
            Verified Experiences
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-primary">
            Loved by 10,000+ Conscious Shoppers
          </h2>
          <p className="text-sm text-mutedText mt-2">
            Read real customer feedback on tailoring, audio fidelity, and swift deliveries.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl p-8 sm:p-12 border border-borderSubtle shadow-md relative">
          <div className="flex items-center gap-1 text-[#F59E0B] mb-5">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>

          <blockquote className="font-heading font-medium text-lg sm:text-xl text-darkText leading-relaxed mb-8">
            "{current.comment}"
          </blockquote>

          <div className="flex items-center justify-between border-t border-borderSubtle pt-6">
            <div className="flex items-center gap-3.5">
              <img
                src={current.avatar}
                alt={current.author}
                className="w-12 h-12 rounded-full object-cover border border-borderSubtle"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-heading font-bold text-sm text-primary">
                    {current.author}
                  </h4>
                  {current.verified && (
                    <span className="inline-flex items-center gap-0.5 text-[11px] text-success font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 fill-success/15" /> Verified Buyer
                    </span>
                  )}
                </div>
                <p className="text-xs text-mutedText">Purchased: {current.productName}</p>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full border border-borderSubtle hover:border-primary flex items-center justify-center text-darkText hover:bg-surface transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 rounded-full border border-borderSubtle hover:border-primary flex items-center justify-center text-darkText hover:bg-surface transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
