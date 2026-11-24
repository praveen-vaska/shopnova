'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Star, ShoppingBag, Heart, Check, ArrowRight } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { formatCurrency } from '@/utils/format';

export default function QuickViewModal({ product, onClose }) {
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useShop();
  const hasSizes = Boolean(product?.sizes && product.sizes.length > 0 && product.sizes[0] !== "One Size");
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || "Standard");
  const [selectedSize, setSelectedSize] = useState(hasSizes ? '' : 'Standard');
  const [sizeError, setSizeError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return null;
  const isWishlisted = isInWishlist(product.id);

  const handleAdd = () => {
    if (hasSizes && !selectedSize) {
      setSizeError(true);
      showToast("Please choose a size before adding to cart.", "error");
      return;
    }
    const success = addToCart(product, quantity, selectedColor, selectedSize || "Standard");
    if (success !== false) {
      onClose();
    }
    addToCart(product, quantity, selectedColor, selectedSize || "Standard");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9995] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-md shadow-2xl overflow-hidden border border-borderSubtle animate-fade-in max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 border border-borderSubtle flex items-center justify-center text-mutedText hover:text-darkText"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Images */}
          <div className="p-6 bg-surface flex flex-col gap-3">
            <div className="aspect-[4/5] w-full rounded-sm overflow-hidden bg-white">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-14 h-16 rounded border overflow-hidden ${
                      selectedImage === i ? 'border-accent ring-1 ring-accent' : 'border-borderSubtle'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-mutedText">
                {product.brand}
              </span>
              <h2 className="font-heading font-bold text-xl text-darkText mt-1 mb-2">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mb-4 text-xs font-medium">
                <div className="flex items-center text-[#F59E0B]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="ml-1 text-darkText font-bold">{product.rating}</span>
                </div>
                <span className="text-mutedText">({product.reviewCount} customer reviews)</span>
                <span className="text-success ml-auto">In Stock ({product.stock})</span>
              </div>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-heading font-extrabold text-2xl text-darkText">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-mutedText line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs text-mutedText leading-relaxed mb-5 line-clamp-3">
                {product.description}
              </p>

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <span className="text-xs font-semibold text-darkText block mb-2">
                    Color: <span className="text-mutedText font-normal">{selectedColor}</span>
                  </span>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedColor === c.name ? 'border-accent scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor === c.name && (
                          <Check className="w-3.5 h-3.5 text-white mix-blend-difference" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Buttons */}
              {hasSizes && (
                <div className="mb-5">
                  <span className={`text-xs font-semibold block mb-2 ${sizeError ? 'text-error font-bold' : 'text-darkText'}`}>
                    Select Size * {sizeError && '(Required)'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setSelectedSize(s);
                          setSizeError(false);
                        }}
                        className={`px-3 py-1.5 rounded-sm border text-xs font-bold transition-all ${
                          selectedSize === s
                            ? 'bg-primary text-white border-primary'
                            : sizeError
                            ? 'bg-white text-darkText border-error/70 hover:border-error'
                            : 'bg-white text-darkText border-borderSubtle hover:border-darkText'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-borderSubtle flex items-center gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 py-3 bg-primary hover:bg-primary-hover text-white rounded-sm font-heading font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-11 h-11 rounded-sm border flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? 'border-error text-error bg-error-bg'
                    : 'border-borderSubtle text-darkText hover:text-error'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
