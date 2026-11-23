'use client';

import React from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { Heart, ShoppingBag, Trash2, ArrowRight, ChevronRight } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, moveWishlistToCart, moveAllWishlistToCart } = useShop();

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-mutedText mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-darkText font-semibold">Wishlist</span>
        </nav>

        {/* Heading & Bulk Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-borderSubtle mb-8">
          <div>
            <h1 className="font-heading font-extrabold text-3xl text-primary">
              My Saved Wishlist ({wishlist.length})
            </h1>
            <p className="text-xs text-mutedText mt-1">
              Items saved for future shopping. Prices and availability update automatically.
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={moveAllWishlistToCart}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-heading font-bold rounded-sm shadow-sm transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-accent" />
              <span>Move All to Bag</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {wishlist.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-surface border border-borderSubtle flex items-center justify-center mx-auto mb-4 text-mutedText">
              <Heart className="w-7 h-7" />
            </div>
            <h2 className="font-heading font-bold text-xl text-primary mb-2">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-mutedText leading-relaxed mb-6">
              Explore our curated apparel, audio technology, and interior essentials. Click the heart icon on any product to save it here.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-heading font-bold text-xs rounded-sm shadow-sm transition-all"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-borderSubtle rounded-md overflow-hidden flex flex-col justify-between hover:shadow-card transition-all"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] bg-surface overflow-hidden group">
                  <Link href={`/product/${product.id}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 border border-borderSubtle flex items-center justify-center text-error hover:bg-error-bg transition-colors shadow-sm"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Body */}
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-mutedText uppercase tracking-wider">
                      {product.brand}
                    </span>
                    <h3 className="font-heading font-semibold text-sm text-darkText line-clamp-1 mt-0.5 mb-1.5 hover:text-accent">
                      <Link href={`/product/${product.id}`}>{product.name}</Link>
                    </h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="font-heading font-bold text-base text-darkText">
                        {formatCurrency(product.price)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-mutedText line-through">
                          {formatCurrency(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Move to Cart CTA */}
                  <button
                    onClick={() => moveWishlistToCart(product)}
                    className="w-full py-2.5 px-3 bg-primary hover:bg-primary-hover text-white text-xs font-heading font-semibold rounded-sm flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-accent" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
