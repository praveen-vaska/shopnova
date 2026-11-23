'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { 
  Search, 
  Check, 
  Truck, 
  Package, 
  MapPin, 
  Clock, 
  AlertCircle,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { formatCurrency } from '@/utils/format';

function TrackingContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || 'SN-89241';

  const { orders, updateOrderStatus } = useShop();
  const [orderQuery, setOrderQuery] = useState(initialOrderId);
  const [currentOrder, setCurrentOrder] = useState(
    orders.find((o) => o.orderId === initialOrderId) || orders[0]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    const found = orders.find((o) => o.orderId.toLowerCase() === orderQuery.trim().toLowerCase());
    if (found) {
      setCurrentOrder(found);
    } else {
      alert(`No order found matching "${orderQuery}". Try SN-89241 or SN-89240.`);
    }
  };

  const steps = [
    { title: "Order Placed", desc: "Order details received" },
    { title: "Confirmed", desc: "Payment verified by bank" },
    { title: "Packed", desc: "Carefully wrapped in signature box" },
    { title: "Shipped", desc: "Dispatched from Bengaluru fulfillment center" },
    { title: "Out for Delivery", desc: "Courier partner en-route to your door" },
    { title: "Delivered", desc: "Handed over safely" }
  ];

  return (
    <div className="bg-secondary/40 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-mutedText mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-darkText font-semibold">Order Tracking</span>
        </nav>

        {/* Heading & Search Bar */}
        <div className="bg-white rounded-xl border border-borderSubtle p-6 sm:p-8 shadow-sm mb-8">
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-primary mb-2">
            Track Your Consignment
          </h1>
          <p className="text-xs text-mutedText mb-6">
            Enter your ShopNova Order ID (e.g. SN-89241) to monitor real-time shipping milestones.
          </p>

          <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
            <input
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="e.g. SN-89241"
              className="flex-1 px-4 py-2.5 text-xs font-bold rounded border border-borderSubtle outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-heading font-bold rounded transition-colors flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </form>
        </div>

        {/* Current Order Tracking Display */}
        {currentOrder && (
          <div className="bg-white rounded-xl border border-borderSubtle p-6 sm:p-8 shadow-sm space-y-8">
            {/* Top Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-borderSubtle">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-mutedText">
                  Tracking Order
                </span>
                <h2 className="font-heading font-extrabold text-2xl text-primary">
                  {currentOrder.orderId}
                </h2>
                <p className="text-xs text-mutedText mt-0.5">
                  Placed on {new Date(currentOrder.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="inline-block px-3 py-1 bg-accent text-white font-heading font-bold text-xs rounded-full uppercase tracking-wider">
                  Status: {currentOrder.status}
                </span>
                <p className="text-xs text-mutedText mt-1">
                  Estimated Delivery: <span className="font-bold text-darkText">{currentOrder.estimatedDelivery}</span>
                </p>
              </div>
            </div>

            {/* 6-Step Visual Timeline */}
            <div>
              <h3 className="font-heading font-bold text-base text-primary mb-6">
                Delivery Timeline
              </h3>

              <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-borderSubtle">
                {currentOrder.trackingTimeline ? (
                  currentOrder.trackingTimeline.map((item, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Node Circle */}
                      <div
                        className={`absolute -left-6 sm:-left-8 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-10 ${
                          item.completed
                            ? 'bg-success text-white ring-4 ring-white'
                            : 'bg-white border-2 border-borderSubtle text-mutedText'
                        }`}
                      >
                        {item.completed ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                      </div>

                      {/* Content */}
                      <div>
                        <h4 className={`font-heading font-bold text-sm ${item.completed ? 'text-primary' : 'text-mutedText'}`}>
                          {item.step}
                        </h4>
                        <p className="text-xs text-mutedText">
                          {item.date === "Pending" ? "Milestone in progress" : item.date}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-mutedText">Timeline data loading...</p>
                )}
              </div>
            </div>

            {/* Consignment Items */}
            <div className="pt-6 border-t border-borderSubtle">
              <h3 className="font-heading font-bold text-sm text-primary mb-3">Items in this package</h3>
              <div className="divide-y divide-borderSubtle">
                {currentOrder.items.map((it, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      {it.image && (
                        <img src={it.image} alt="" className="w-10 h-12 object-cover rounded bg-surface" />
                      )}
                      <div>
                        <p className="font-semibold text-darkText">{it.name}</p>
                        <p className="text-mutedText">Qty: {it.quantity} {it.selectedColor && `• Color: ${it.selectedColor}`}</p>
                      </div>
                    </div>
                    <span className="font-heading font-bold text-darkText">
                      {formatCurrency(it.price * it.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-mutedText">Loading order tracking...</div>}>
      <TrackingContent />
    </Suspense>
  );
}
