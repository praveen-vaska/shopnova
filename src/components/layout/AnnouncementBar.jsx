'use client';

import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary text-white py-2 px-4 text-xs md:text-sm font-medium relative z-50 flex items-center justify-center border-b border-[#282828]">
      <div className="flex items-center gap-2 md:gap-3 text-center pr-6">
        <span>Free shipping on orders above ₹999</span>
        <span className="text-[#666666] hidden sm:inline">|</span>
        <span className="hidden sm:inline">Extra 10% off on your first order</span>
        <span className="hidden xs:inline-flex items-center gap-1 bg-accent text-white px-2 py-0.5 rounded font-bold tracking-wider text-[11px]">
          CODE: WELCOME10
        </span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
