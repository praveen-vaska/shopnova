'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ChevronRight, 
  Tag, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Check
} from 'lucide-react';
import { formatCurrency } from '@/utils/format';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    freeShippingRemaining,
    freeShippingProgress,
    coupons
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-mutedText mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-darkText font-semibold">Shopping Bag</span>
        </nav>

        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary mb-8">
          Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
        </h1>

        {cart.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto bg-surface/50 rounded-xl border border-borderSubtle p-8">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 text-mutedText shadow-sm">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h2 className="font-heading font-bold text-xl text-primary mb-2">
              Your bag is currently empty
            </h2>
            <p className="text-xs text-mutedText leading-relaxed mb-6">
              Looks like you haven't added anything to your cart yet. Discover our curated collections across fashion, technology, and home living.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-heading font-bold text-xs rounded-sm shadow-sm transition-all"
            >
              <span>Start Exploring</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Items Column (7 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping Alert Box */}
              <div className="p-4 bg-secondary border border-borderSubtle rounded-md">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <div className="flex items-center gap-2 text-darkText">
                    <Truck className="w-4 h-4 text-accent" />
                    <span>
                      {freeShippingRemaining > 0 ? (
                        <>Add <span className="text-accent font-bold">{formatCurrency(freeShippingRemaining)}</span> more to qualify for Free Express Shipping</>
                      ) : (
                        <span className="text-success font-bold">You've unlocked Free Express Delivery!</span>
                      )}
                    </span>
                  </div>
                  <span className="text-mutedText">{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="w-full h-1.5 bg-borderSubtle rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Table / Card Container */}
              <div className="border border-borderSubtle rounded-md overflow-hidden bg-white divide-y divide-borderSubtle">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                    {/* Thumbnail */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-sm bg-surface flex-shrink-0"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-bold text-mutedText uppercase tracking-wider">
                        {item.product.brand}
                      </span>
                      <h3 className="font-heading font-bold text-sm sm:text-base text-darkText hover:text-accent truncate">
                        <Link href={`/product/${item.product.id}`}>{item.product.name}</Link>
                      </h3>
                      <p className="text-xs text-mutedText mt-1">
                        {item.selectedSize !== "Standard" && `Size: ${item.selectedSize} • `}
                        Color: {item.selectedColor}
                      </p>
                      <p className="font-heading font-bold text-sm text-darkText mt-2 sm:hidden">
                        {formatCurrency(item.product.price)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center border border-borderSubtle rounded-sm bg-white">
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-darkText hover:bg-surface font-bold text-sm"
                      >
                        -
                      </button>
                      <span className="w-9 text-center text-xs font-bold text-darkText">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-darkText hover:bg-surface font-bold text-sm"
                      >
                        +
                      </button>
                    </div>

                    {/* Item Subtotal */}
                    <div className="text-right hidden sm:block w-24">
                      <span className="font-heading font-bold text-base text-darkText block">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                      <span className="text-[11px] text-mutedText">
                        {formatCurrency(item.product.price)} each
                      </span>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-mutedText hover:text-error transition-colors p-2"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-2">
                <Link
                  href="/shop"
                  className="text-xs font-heading font-bold text-darkText hover:text-accent transition-colors flex items-center gap-1"
                >
                  <span>← Continue Shopping</span>
                </Link>
                <button
                  onClick={clearCart}
                  className="text-xs text-mutedText hover:text-error transition-colors"
                >
                  Clear Bag
                </button>
              </div>
            </div>

            {/* Right Summary Column (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-secondary/70 border border-borderSubtle rounded-md p-6 space-y-5">
                <h2 className="font-heading font-bold text-lg text-primary pb-3 border-b border-borderSubtle">
                  Order Summary
                </h2>

                {/* Subtotal lines */}
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-mutedText">
                    <span>Subtotal</span>
                    <span className="font-semibold text-darkText">{formatCurrency(cartSubtotal)}</span>
                  </div>

                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span className="font-semibold">-{formatCurrency(cartDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-mutedText">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-darkText">
                      {cartShipping === 0 ? <span className="text-success uppercase text-xs">Free</span> : formatCurrency(cartShipping)}
                    </span>
                  </div>

                  <div className="flex justify-between text-mutedText">
                    <span>Estimated Tax</span>
                    <span className="font-semibold text-darkText">Included</span>
                  </div>

                  <div className="pt-3 border-t border-borderSubtle flex justify-between font-heading font-extrabold text-lg text-darkText">
                    <span>Total Amount</span>
                    <span>{formatCurrency(cartTotal)}</span>
                  </div>
                </div>

                {/* Coupon Code Section */}
                <div className="pt-2">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 bg-success-bg border border-success/30 rounded text-xs text-success">
                      <div className="flex items-center gap-1.5 font-bold">
                        <Check className="w-3.5 h-3.5" />
                        <span>Code "{appliedCoupon.code}" applied</span>
                      </div>
                      <button onClick={removeCoupon} className="text-error font-bold underline text-[11px]">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo code (e.g. WELCOME10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs rounded border border-borderSubtle bg-white uppercase font-bold outline-none focus:border-accent"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-heading font-bold rounded transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {/* Quick Coupon Suggestions */}
                  {!appliedCoupon && (
                    <div className="mt-3">
                      <span className="text-[11px] font-bold text-mutedText uppercase tracking-wider block mb-1.5">
                        Available Coupons
                      </span>
                      <div className="space-y-1.5">
                        {coupons.filter(c => c.isActive).slice(0, 3).map((cp) => (
                          <div
                            key={cp.code}
                            onClick={() => applyCoupon(cp.code)}
                            className="p-2 bg-white rounded border border-dashed border-borderSubtle hover:border-accent cursor-pointer flex items-center justify-between text-xs transition-colors"
                          >
                            <div>
                              <span className="font-bold font-heading text-accent">{cp.code}</span>
                              <p className="text-[10px] text-mutedText">{cp.description}</p>
                            </div>
                            <span className="text-[10px] font-bold text-primary underline">Apply</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full py-3.5 px-4 bg-accent hover:bg-accent-hover text-white font-heading font-bold text-sm rounded shadow-md text-center block transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Security badges */}
                <div className="pt-2 border-t border-borderSubtle/60 flex items-center justify-around text-center text-[10px] text-mutedText">
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <span>SSL 256-bit Encrypted</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RotateCcw className="w-4 h-4 text-accent" />
                    <span>7-Day Return Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
