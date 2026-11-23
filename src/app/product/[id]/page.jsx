'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { 
  ChevronRight, 
  Star, 
  Heart, 
  ShoppingBag, 
  Zap, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  MapPin, 
  Check, 
  ArrowRight,
  Share2
} from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { formatCurrency } from '@/utils/format';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { products, addToCart, toggleWishlist, isInWishlist, showToast, setIsCartDrawerOpen } = useShop();

  const product = products.find((p) => p.id === id) || products[0];
  const hasSizes = Boolean(product?.sizes && product.sizes.length > 0 && product.sizes[0] !== "One Size");

  // Options State
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || "Standard");
  const [selectedSize, setSelectedSize] = useState(hasSizes ? '' : 'Standard');
  const [sizeError, setSizeError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('highlights'); // 'highlights' | 'specs' | 'reviews' | 'shipping'

  // Pincode check state
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);

  // Review Form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState([
    {
      author: "Aditi Rao",
      rating: 5,
      date: "2 days ago",
      comment: "Incredible attention to detail. The fabric texture and finish feels genuinely luxurious. Arrived in signature sustainable packaging.",
      verified: true
    },
    {
      author: "Saurabh Singhania",
      rating: 5,
      date: "1 week ago",
      comment: "Solid buy! Fits true to size and exceeded my expectations based on the photos. Definitely ordering in the other colorway.",
      verified: true
    }
  ]);

  if (!product) {
    return <div className="p-12 text-center text-mutedText">Product not found.</div>;
  }

  const isWishlisted = isInWishlist(product.id);

  // Pincode handler
  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6 || isNaN(pincode)) {
      setPincodeStatus({ valid: false, message: 'Please enter a valid 6-digit Indian PIN code.' });
      return;
    }
    const days = Math.floor(Math.random() * 2) + 2;
    const date = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    const dateStr = date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
    setPincodeStatus({
      valid: true,
      message: `Delivery available! Expected by ${dateStr}. Cash on delivery available.`
    });
  };

  const handleAddToCart = () => {
    if (hasSizes && !selectedSize) {
      setSizeError(true);
      showToast("Please select a size before adding to bag.", "error");
      return;
    }
    const success = addToCart(product, quantity, selectedColor, selectedSize || "Standard");
    if (success !== false) {
      setIsCartDrawerOpen(true);
    }
  };

  const handleBuyNow = () => {
    if (hasSizes && !selectedSize) {
      setSizeError(true);
      showToast("Please select a size before proceeding to checkout.", "error");
      return;
    }
    const success = addToCart(product, quantity, selectedColor, selectedSize || "Standard");
    if (success !== false) {
      router.push('/checkout');
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;
    setLocalReviews([
      {
        author: reviewName,
        rating: reviewRating,
        date: "Just now",
        comment: reviewComment,
        verified: true
      },
      ...localReviews
    ]);
    setReviewName('');
    setReviewComment('');
    showToast("Review submitted successfully! Thank you for your feedback.", "success");
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-mutedText mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/shop?category=${product.category}`} className="capitalize hover:text-primary transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-darkText font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Details Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20">
          {/* Left Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails row/column */}
            {product.images && product.images.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible flex-shrink-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-20 sm:w-20 sm:h-24 rounded-sm border overflow-hidden transition-all bg-surface ${
                      selectedImage === idx
                        ? 'border-accent ring-2 ring-accent'
                        : 'border-borderSubtle hover:border-darkText'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Active Image Display */}
            <div className="flex-1 aspect-[4/5] rounded-lg overflow-hidden bg-surface border border-borderSubtle relative group">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 bg-error text-white font-heading font-bold text-xs uppercase px-2.5 py-1 rounded-full shadow-sm">
                  {product.discount}% Off
                </span>
              )}
            </div>
          </div>

          {/* Right Product Information (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Brand & Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-mutedText">
                  {product.brand}
                </span>
                <span className="text-xs font-semibold text-success bg-success-bg px-2.5 py-0.5 rounded-full">
                  {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-primary leading-tight mb-3">
                {product.name}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center text-[#F59E0B]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-1.5 text-darkText font-bold text-sm">{product.rating}</span>
                </div>
                <span className="text-mutedText text-xs font-medium">|</span>
                <span className="text-xs text-mutedText underline cursor-pointer" onClick={() => setActiveTab('reviews')}>
                  {product.reviewCount} customer ratings
                </span>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mb-6 p-4 rounded-md bg-secondary/80 border border-borderSubtle">
                <span className="font-heading font-extrabold text-3xl text-darkText">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-base text-mutedText line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="text-xs font-bold text-error ml-auto">
                    Save {formatCurrency(product.originalPrice - product.price)} ({product.discount}%)
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-mutedText leading-relaxed mb-6 font-normal">
                {product.description}
              </p>

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center text-xs font-semibold text-darkText mb-2.5">
                    <span>Color: <span className="text-mutedText font-normal">{selectedColor}</span></span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedColor === c.name ? 'border-accent scale-110 shadow-sm' : 'border-borderSubtle'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor === c.name && (
                          <Check className="w-4 h-4 text-white mix-blend-difference" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {hasSizes && (
                <div className="mb-6">
                  <div className="flex justify-between items-center text-xs font-semibold text-darkText mb-2.5">
                    <span className={sizeError ? "text-error font-bold" : ""}>
                      Select Size * {sizeError && "(Required)"}
                    </span>
                    <button className="text-accent underline font-normal text-xs">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setSelectedSize(s);
                          setSizeError(false);
                        }}
                        className={`min-w-[44px] h-10 px-3 rounded-sm border text-xs font-heading font-bold transition-all flex items-center justify-center ${
                          selectedSize === s
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : sizeError
                            ? 'bg-white text-darkText border-error/70 hover:border-error'
                            : 'bg-white text-darkText border-borderSubtle hover:border-primary'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {sizeError && (
                    <p className="text-[11px] text-error mt-1.5 font-semibold">
                      Please choose a size to proceed.
                    </p>
                  )}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-darkText">Quantity</span>
                  <span className="text-xs text-mutedText">
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
                <div className="flex items-center border border-borderSubtle rounded-sm bg-white w-32">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center text-darkText hover:bg-surface font-bold text-base disabled:opacity-40"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold text-sm text-darkText">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
                    disabled={quantity >= (product.stock || 1)}
                    className="w-10 h-10 flex items-center justify-center text-darkText hover:bg-surface font-bold text-base disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 py-3.5 px-6 bg-primary hover:bg-primary-hover active:scale-[0.99] text-white rounded-sm font-heading font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-accent" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="flex-1 py-3.5 px-6 bg-accent hover:bg-accent-hover active:scale-[0.99] text-white rounded-sm font-heading font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Zap className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-12 h-12 rounded-sm border flex items-center justify-center transition-colors flex-shrink-0 ${
                    isWishlisted ? 'border-error text-error bg-error-bg' : 'border-borderDark text-darkText hover:text-error'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Delivery Availability Pincode Checker */}
              <div className="p-4 mt-6 rounded-md bg-surface border border-borderSubtle">
                <div className="flex items-center gap-2 text-xs font-bold text-darkText mb-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>Check Delivery Date & Postal Availability</span>
                </div>
                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode (e.g. 560103)"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs font-medium rounded-sm border border-borderSubtle bg-white focus:border-accent outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-darkText text-white text-xs font-heading font-bold rounded-sm hover:bg-primary transition-colors"
                  >
                    Check
                  </button>
                </form>

                {pincodeStatus && (
                  <p className={`text-xs mt-2 font-medium ${pincodeStatus.valid ? 'text-success' : 'text-error'}`}>
                    {pincodeStatus.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Specifications & Customer Reviews */}
        <div className="border-t border-borderSubtle pt-12 mb-20">
          {/* Tabs Navigation */}
          <div className="flex items-center gap-8 border-b border-borderSubtle pb-4 mb-8">
            <button
              onClick={() => setActiveTab('highlights')}
              className={`font-heading font-bold text-base transition-colors relative pb-4 ${
                activeTab === 'highlights' ? 'text-primary' : 'text-mutedText hover:text-darkText'
              }`}
            >
              Highlights & Features
              {activeTab === 'highlights' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`font-heading font-bold text-base transition-colors relative pb-4 ${
                activeTab === 'specs' ? 'text-primary' : 'text-mutedText hover:text-darkText'
              }`}
            >
              Technical Specifications
              {activeTab === 'specs' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`font-heading font-bold text-base transition-colors relative pb-4 ${
                activeTab === 'reviews' ? 'text-primary' : 'text-mutedText hover:text-darkText'
              }`}
            >
              Customer Reviews ({localReviews.length + 1})
              {activeTab === 'reviews' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('shipping')}
              className={`font-heading font-bold text-base transition-colors relative pb-4 ${
                activeTab === 'shipping' ? 'text-primary' : 'text-mutedText hover:text-darkText'
              }`}
            >
              Shipping & 7-Day Returns
              {activeTab === 'shipping' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl">
            {activeTab === 'highlights' && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-lg text-primary mb-3">Key Highlights</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-darkText">
                  {product.highlights?.map((h, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-accent/15 text-accent flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{h}</span>
                    </li>
                  )) || (
                    <li className="text-mutedText">Premium verified craftsmanship and durable materials.</li>
                  )}
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div>
                <h3 className="font-heading font-bold text-lg text-primary mb-4">Specifications</h3>
                <div className="border border-borderSubtle rounded-sm divide-y divide-borderSubtle text-sm">
                  {product.specifications ? (
                    Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="grid grid-cols-3 p-3.5 bg-white even:bg-surface/40">
                        <span className="font-semibold text-darkText">{key}</span>
                        <span className="col-span-2 text-mutedText">{val}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-mutedText">Standard manufacturer specifications apply.</div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-10">
                {/* Submit Review Form */}
                <div className="bg-surface p-6 rounded-md border border-borderSubtle">
                  <h4 className="font-heading font-bold text-base text-primary mb-3">
                    Write a Customer Review
                  </h4>
                  <form onSubmit={handleAddReview} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-darkText block mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          placeholder="e.g. Priya Nair"
                          className="w-full px-3 py-2 text-xs rounded border border-borderSubtle bg-white outline-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-darkText block mb-1">Rating</label>
                        <select
                          value={reviewRating}
                          onChange={(e) => setReviewRating(Number(e.target.value))}
                          className="w-full px-3 py-2 text-xs rounded border border-borderSubtle bg-white outline-none focus:border-accent cursor-pointer"
                        >
                          <option value={5}>5 Stars - Excellent</option>
                          <option value={4}>4 Stars - Good</option>
                          <option value={3}>3 Stars - Average</option>
                          <option value={2}>2 Stars - Poor</option>
                          <option value={1}>1 Star - Terrible</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-darkText block mb-1">Your Review</label>
                      <textarea
                        required
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Share your thoughts on build quality, fit, audio, or everyday usage..."
                        className="w-full px-3 py-2 text-xs rounded border border-borderSubtle bg-white outline-none focus:border-accent"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-sm hover:bg-primary-hover transition-colors"
                    >
                      Post Verified Review
                    </button>
                  </form>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {localReviews.map((rev, idx) => (
                    <div key={idx} className="p-5 border border-borderSubtle rounded-sm bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-sm text-darkText">{rev.author}</span>
                          {rev.verified && (
                            <span className="text-[10px] bg-success-bg text-success px-2 py-0.5 rounded-full font-bold">
                              Verified Buyer
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-mutedText">{rev.date}</span>
                      </div>
                      <div className="flex text-[#F59E0B] mb-2">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-mutedText leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4 text-sm text-darkText leading-relaxed">
                <h3 className="font-heading font-bold text-lg text-primary mb-2">Doorstep Delivery & Hassle-Free Returns</h3>
                <p>
                  All orders are dispatched from our automated hubs within 24 hours of placement. We offer complimentary express delivery across India on orders above ₹999.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-surface rounded border border-borderSubtle">
                    <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-accent mb-1">Standard Delivery</h4>
                    <p className="text-xs text-mutedText">3 to 5 business days across tier 1 and tier 2 cities.</p>
                  </div>
                  <div className="p-4 bg-surface rounded border border-borderSubtle">
                    <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-accent mb-1">7-Day Doorstep Pickup</h4>
                    <p className="text-xs text-mutedText">Hassle-free replacement or full refund credited back to your original payment method.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-borderSubtle pt-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-accent font-heading block mb-1">
                  You Might Also Like
                </span>
                <h2 className="font-heading font-bold text-2xl text-primary">
                  Related Products
                </h2>
              </div>
              <Link
                href={`/shop?category=${product.category}`}
                className="text-xs font-heading font-semibold text-darkText hover:text-accent flex items-center gap-1"
              >
                <span>View More in {product.category}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
