'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { formatCurrency } from '@/utils/format';

export default function CartDrawer() {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    cartItemCount,
    freeShippingThreshold,
    freeShippingRemaining,
    freeShippingProgress,
    appliedCoupon
  } = useShop();

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[9990] overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-out drawer panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-borderSubtle flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-accent" />
              <h2 className="font-heading font-bold text-lg text-darkText">
                Your Bag ({cartItemCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="text-mutedText hover:text-darkText p-1.5 rounded-full hover:bg-surface transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3 bg-secondary border-b border-borderSubtle">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span>
                {freeShippingRemaining > 0 ? (
                  <>Add <span className="text-accent">{formatCurrency(freeShippingRemaining)}</span> more for Free Shipping</>
                ) : (
                  <span className="text-success">You've unlocked Free Express Shipping!</span>
                )}
              </span>
              <span className="text-mutedText">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-borderSubtle rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-borderSubtle">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-mutedText">
                <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-mutedText" />
                </div>
                <h3 className="font-heading font-bold text-lg text-darkText mb-1">Your bag is empty</h3>
                <p className="text-sm max-w-xs mb-6">Explore our curated collections across fashion, technology, and home living.</p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="bg-primary text-white px-6 py-2.5 rounded-sm font-heading font-semibold text-sm hover:bg-primary-hover transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <img
                    src={item.product.image || item.product.images?.[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800'}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-sm bg-surface flex-shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800';
                    }}
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-heading font-semibold text-sm text-darkText leading-tight line-clamp-1">
                          <Link
                            href={`/product/${item.product.id}`}
                            onClick={() => setIsCartDrawerOpen(false)}
                            className="hover:text-accent transition-colors"
                          >
                            {item.product.name}
                          </Link>
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-mutedText hover:text-error transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-mutedText mt-1">
                        {item.selectedSize !== "Standard" && `Size: ${item.selectedSize} • `}
                        Color: {item.selectedColor}
                      </p>
                    </div>

                    {/* Price & Quantity Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-borderSubtle rounded-sm bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-darkText hover:bg-surface font-bold text-sm"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-darkText">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                          disabled={item.quantity >= (item.product.stock || 99)}
                          className="w-7 h-7 flex items-center justify-center text-darkText hover:bg-surface font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                          title={item.quantity >= (item.product.stock || 99) ? "Max stock reached" : "Increase quantity"}
                        >
                          +
                        </button>
                      </div>

                      <span className="font-heading font-bold text-sm text-darkText">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Calculations */}
          {cart.length > 0 && (
            <div className="p-5 bg-secondary border-t border-borderSubtle space-y-3">
              <div className="space-y-1.5 text-sm">
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
                  <span>Shipping</span>
                  <span className="font-semibold text-darkText">
                    {cartShipping === 0 ? <span className="text-success uppercase text-xs">Free</span> : formatCurrency(cartShipping)}
                  </span>
                </div>

                <div className="pt-2 border-t border-borderSubtle flex justify-between font-heading font-bold text-base text-darkText">
                  <span>Total</span>
                  <span className="text-lg">{formatCurrency(cartTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full py-3 px-4 bg-accent hover:bg-accent-hover text-white font-heading font-bold text-sm rounded-sm text-center shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full py-2.5 text-center font-heading font-semibold text-xs text-darkText hover:text-accent transition-colors"
                >
                  View Full Bag & Apply Coupons
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
