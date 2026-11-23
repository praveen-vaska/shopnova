'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { formatCurrency } from '@/utils/format';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [isAdding, setIsAdding] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div className="product-card group flex flex-col justify-between h-full bg-white border border-borderSubtle rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:border-borderDark">
      {/* Top Image Box */}
      <div className="relative w-full aspect-[4/5] bg-surface overflow-hidden">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          {/* Main Product Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Alternate Image on hover if available */}
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
              loading="lazy"
            />
          )}
        </Link>

        {/* Badges (Top Left) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.discount > 0 ? (
            <span className="bg-error text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              {product.discount}% Off
            </span>
          ) : product.isNewArrival ? (
            <span className="bg-primary text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              New
            </span>
          ) : product.isBestSeller ? (
            <span className="bg-accent text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              Best Seller
            </span>
          ) : null}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm border border-borderSubtle flex items-center justify-center transition-all z-10 shadow-sm hover:scale-110 ${
            isWishlisted ? 'text-error border-error fill-error' : 'text-darkText hover:text-error'
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-error text-error' : ''}`} />
        </button>

        {/* Quick View Button (Reveals on Hover) */}
        <button
          onClick={handleQuickViewClick}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white/95 backdrop-blur-md text-primary font-heading font-semibold text-xs py-1.5 px-4 rounded-full border border-borderSubtle shadow-md hover:bg-primary hover:text-white flex items-center gap-1.5 z-10"
        >
          <Eye className="w-3.5 h-3.5" /> Quick View
        </button>
      </div>

      {/* Product Information Card Body */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Brand & Rating Row */}
          <div className="flex items-center justify-between mb-1 text-xs">
            <span className="text-mutedText font-semibold uppercase tracking-wider text-[11px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-darkText font-medium">
              <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
              <span>{product.rating}</span>
              <span className="text-mutedText text-[11px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-heading font-semibold text-darkText text-[15px] leading-snug line-clamp-2 hover:text-accent transition-colors mb-2">
            <Link href={`/product/${product.id}`}>{product.name}</Link>
          </h3>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-heading font-bold text-darkText text-base sm:text-lg">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-mutedText line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart CTA Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-2.5 px-3 rounded-sm font-heading font-semibold text-xs tracking-wide flex items-center justify-center gap-2 transition-all ${
            product.stock === 0
              ? 'bg-surface text-mutedText cursor-not-allowed border border-borderSubtle'
              : isAdding
              ? 'bg-success text-white'
              : 'bg-primary text-white hover:bg-primary-hover active:scale-[0.98]'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>
            {product.stock === 0 ? 'Out of Stock' : isAdding ? 'Added to Bag ✓' : 'Add to Cart'}
          </span>
        </button>
      </div>
    </div>
  );
}
