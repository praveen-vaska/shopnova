'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CheckCircle2, ArrowRight, Package, MapPin, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '@/context/ShopContext';
import { formatCurrency } from '@/utils/format';

export default function OrderSuccessPage() {
  const { id } = useParams();
  const { orders } = useShop();

  const order = orders.find((o) => o.orderId === id) || orders[0];

  useEffect(() => {
    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  return (
    <div className="bg-secondary/40 min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl border border-borderSubtle shadow-xl p-8 sm:p-12 text-center">
        {/* Animated Checkmark */}
        <div className="w-20 h-20 rounded-full bg-success-bg text-success flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-accent font-heading block mb-1">
          Payment Confirmed
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary mb-3">
          Thank You For Your Order!
        </h1>
        <p className="text-sm text-mutedText leading-relaxed mb-6 max-w-md mx-auto">
          We've received your order and our atelier has begun packaging your items with care. A confirmation email has been dispatched.
        </p>

        {/* Order Details Badge Card */}
        <div className="bg-secondary/70 rounded-lg p-5 border border-borderSubtle text-left mb-8 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-borderSubtle">
            <span className="text-xs text-mutedText">Order Reference</span>
            <span className="font-heading font-bold text-sm text-primary">{id || 'SN-89241'}</span>
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-borderSubtle">
            <span className="text-xs text-mutedText">Estimated Doorstep Delivery</span>
            <span className="font-heading font-semibold text-xs text-darkText">
              {order?.estimatedDelivery || 'Within 3 Business Days'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-mutedText">Total Amount Paid</span>
            <span className="font-heading font-bold text-sm text-darkText">
              {formatCurrency(order?.pricing?.total || 4098)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/track-order?orderId=${id || 'SN-89241'}`}
            className="px-7 py-3.5 bg-primary hover:bg-primary-hover text-white rounded font-heading font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Truck className="w-4 h-4 text-accent" />
            <span>Track Order Timeline</span>
          </Link>
          <Link
            href="/shop"
            className="px-7 py-3.5 bg-white hover:bg-surface border border-borderDark text-darkText rounded font-heading font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
