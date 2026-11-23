'use client';

import React from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { ShoppingBag, ArrowRight, ShieldCheck, RefreshCw, Truck, Headphones, Mail } from 'lucide-react';
import { categories } from '@/data/categories';

export default function Footer() {
  const { showToast } = useShop();
  return (
    <footer className="bg-primary text-white pt-16 pb-10 border-t border-[#262626]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Icons Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-14 border-b border-[#2A2A2A]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">Free Express Delivery</h4>
              <p className="text-xs text-[#888888] mt-0.5">On all domestic orders above ₹999</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">100% Secure Checkout</h4>
              <p className="text-xs text-[#888888] mt-0.5">Encrypted UPI, Cards & NetBanking</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">Hassle-Free Returns</h4>
              <p className="text-xs text-[#888888] mt-0.5">7-day doorstep pickup guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">Dedicated Support</h4>
              <p className="text-xs text-[#888888] mt-0.5">24/7 concierge assistance</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-14 border-b border-[#2A2A2A]">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-primary font-bold">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
                Shipflux
              </span>
            </Link>
            <p className="text-sm text-[#999999] leading-relaxed max-w-sm mb-6">
              Shipflux is a premium curated marketplace connecting conscious shoppers with exceptional clothing, electronics, home decor and lifestyle essentials.
            </p>
            
            {/* Newsletter input */}
            <div className="max-w-md">
              <p className="text-xs font-bold uppercase tracking-wider text-accent mb-2">
                Stay in the Loop
              </p>
              <form onSubmit={(e) => { e.preventDefault(); showToast('Thank you for subscribing to Shipflux VIP edits!', 'success'); }} className="flex">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-[#222222] text-white text-sm px-4 py-2.5 rounded-l-md border border-[#333333] focus:border-accent w-full outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-accent text-white px-5 py-2.5 rounded-r-md font-heading font-semibold text-sm hover:bg-accent-hover transition-colors flex items-center gap-1.5"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">
              Categories
            </h5>
            <ul className="space-y-2.5 text-sm text-[#999999]">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/shop?category=${cat.id}`} className="hover:text-accent transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h5 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">
              Customer Care
            </h5>
            <ul className="space-y-2.5 text-sm text-[#999999]">
              <li><Link href="/track-order" className="hover:text-accent transition-colors">Track Order</Link></li>
              <li><Link href="/account" className="hover:text-accent transition-colors">My Account</Link></li>
              <li><Link href="/cart" className="hover:text-accent transition-colors">Shipping & Delivery</Link></li>
              <li><Link href="/wishlist" className="hover:text-accent transition-colors">Wishlist</Link></li>
              <li><a href="#" className="hover:text-accent transition-colors">FAQs & Support</a></li>
            </ul>
          </div>

          {/* Legal & Company */}
          <div>
            <h5 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">
              Policies
            </h5>
            <ul className="space-y-2.5 text-sm text-[#999999]">
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Return & Refund Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Sustainability Guarantee</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#777777] gap-4">
          <p>© 2026 Shipflux Inc. All rights reserved. Designed with precision and elegance.</p>
          <div className="flex items-center gap-6">
            <span>Prices in Indian Rupees (₹ INR)</span>
            <span>Made for modern retail</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
