'use client';

import React, { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { categories } from '@/data/categories';
import ProductCard from '@/components/ui/ProductCard';
import QuickViewModal from '@/components/ui/QuickViewModal';
import { 
  Filter, 
  X, 
  ChevronRight, 
  SlidersHorizontal, 
  Grid3X3, 
  LayoutGrid, 
  Star,
  Search,
  RotateCcw
} from 'lucide-react';
import { formatCurrency } from '@/utils/format';

const FILTER_LABELS = {
  new: 'New Arrivals',
  bestseller: 'Best Sellers',
  discount: 'Sale & Special Deals'
};

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlCategory = searchParams.get('category') || 'all';
  const urlFilter = searchParams.get('filter') || 'all';
  const currentUrlKey = `${urlCategory}|${urlFilter}`;

  const { products } = useShop();

  const maxCatalogPrice = useMemo(() => {
    if (!products || products.length === 0) return 6000;
    const highest = Math.max(...products.map((p) => Number(p.price) || 0));
    return Math.max(6000, Math.ceil(highest / 500) * 500);
  }, [products]);

  // State
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [activeFilter, setActiveFilter] = useState(urlFilter);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(6000);
  const [selectedRating, setSelectedRating] = useState(0);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewCols, setViewCols] = useState(4); // 3 or 4
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const expectedInternalUrlRef = useRef(null);
  const prevMaxPriceRef = useRef(maxCatalogPrice);

  // Raise default max slider ceiling smoothly if live DB catalog contains higher-priced items
  useEffect(() => {
    if (maxCatalogPrice > prevMaxPriceRef.current && priceRange === prevMaxPriceRef.current) {
      setPriceRange(maxCatalogPrice);
    }
    prevMaxPriceRef.current = maxCatalogPrice;
  }, [maxCatalogPrice, priceRange]);

  // Sync component state whenever URL query params change (e.g. from Navbar dropdowns or Back/Forward)
  useEffect(() => {
    setSelectedCategory(urlCategory);
    setActiveFilter(urlFilter);
    setCurrentPage(1);

    if (expectedInternalUrlRef.current === currentUrlKey) {
      expectedInternalUrlRef.current = null;
      return;
    }
    expectedInternalUrlRef.current = null;

    setSelectedBrands([]);
    setPriceRange(maxCatalogPrice);
    setSelectedRating(0);
    setOnlyInStock(false);
    setSelectedDiscount('all');
    setSearchQuery('');
  }, [currentUrlKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateUrlParams = (nextCategory, nextFilter) => {
    const nextKey = `${nextCategory}|${nextFilter}`;
    if (nextKey !== currentUrlKey) {
      expectedInternalUrlRef.current = nextKey;
      const params = new URLSearchParams();
      if (nextCategory !== 'all') params.set('category', nextCategory);
      if (nextFilter !== 'all') params.set('filter', nextFilter);
      const qs = params.toString();
      router.replace(qs ? `/shop?${qs}` : '/shop', { scroll: false });
    }
  };

  // Update category & keep URL synchronized (prune brands not present in target category)
  const handleSelectCategory = (catId) => {
    const nextPool = catId === 'all' ? products : products.filter((p) => p.category === catId);
    const validBrands = new Set(nextPool.map((p) => p.brand));
    setSelectedBrands((prev) => prev.filter((b) => validBrands.has(b)));
    setSelectedCategory(catId);
    setCurrentPage(1);
    updateUrlParams(catId, activeFilter);
  };

  const handleClearFilterParam = () => {
    setActiveFilter('all');
    setCurrentPage(1);
    updateUrlParams(selectedCategory, 'all');
  };

  // Extract distinct brands relevant to current category view
  const brands = useMemo(() => {
    const pool = selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);
    return Array.from(new Set(pool.map((p) => p.brand))).sort();
  }, [products, selectedCategory]);

  // Handle Brand Toggle
  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Reset Filters
  const resetFilters = () => {
    setSelectedCategory('all');
    setActiveFilter('all');
    setSelectedBrands([]);
    setPriceRange(maxCatalogPrice);
    setSelectedRating(0);
    setOnlyInStock(false);
    setSelectedDiscount('all');
    setSearchQuery('');
    setSortBy('featured');
    setCurrentPage(1);
    updateUrlParams('all', 'all');
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, activeFilter, selectedBrands, priceRange, selectedRating, onlyInStock, selectedDiscount, searchQuery, sortBy]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        
        // Filter param from URL (e.g. filter=new, bestseller, discount)
        if (activeFilter === 'new' && !p.isNewArrival) return false;
        if (activeFilter === 'bestseller' && !p.isBestSeller) return false;
        if (activeFilter === 'discount' && p.discount <= 0) return false;

        // Brands (only filter if any selected brand is in current category's brand pool or explicit)
        if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;

        // Price
        if (p.price > priceRange) return false;

        // Rating
        if (selectedRating > 0 && p.rating < selectedRating) return false;

        // Stock
        if (onlyInStock && p.stock <= 0) return false;

        // Discount
        if (selectedDiscount === '20' && p.discount < 20) return false;
        if (selectedDiscount === '30' && p.discount < 30) return false;

        // Search within page
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        if (sortBy === 'bestselling') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        return 0; // featured
      });
  }, [
    products,
    selectedCategory,
    activeFilter,
    selectedBrands,
    priceRange,
    selectedRating,
    onlyInStock,
    selectedDiscount,
    searchQuery,
    sortBy
  ]);

  // Active filter count
  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (activeFilter !== 'all' ? 1 : 0) +
    selectedBrands.length +
    (priceRange < maxCatalogPrice ? 1 : 0) +
    (selectedRating > 0 ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (selectedDiscount !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const selectedCategoryObj = categories.find((c) => c.id === selectedCategory);
  const pageTitle =
    selectedCategory !== 'all'
      ? selectedCategoryObj?.name || 'Curated Products'
      : activeFilter !== 'all'
      ? FILTER_LABELS[activeFilter] || 'Featured Collection'
      : 'All Products';

  // Shared filter panel used by both Desktop Sidebar and Mobile Drawer
  const renderFilterControls = (closeOnCategorySelect = false) => (
    <>
      <div className="flex items-center justify-between pb-3 border-b border-borderSubtle">
        <h3 className="font-heading font-bold text-sm text-darkText flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-accent" />
          <span>Refine Results</span>
        </h3>
        {activeFiltersCount > 0 && (
          <button onClick={resetFilters} className="text-[11px] font-semibold text-accent hover:underline">
            Reset
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-mutedText mb-3">
          Category
        </h4>
        <div className="space-y-1.5 text-xs">
          <button
            onClick={() => {
              handleSelectCategory('all');
              if (closeOnCategorySelect) setIsMobileFilterOpen(false);
            }}
            className={`w-full text-left py-1 px-2 rounded font-medium flex items-center justify-between ${
              selectedCategory === 'all' ? 'bg-primary text-white font-bold' : 'text-darkText hover:bg-surface'
            }`}
          >
            <span>All Categories</span>
            <span>({products.length})</span>
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                handleSelectCategory(c.id);
                if (closeOnCategorySelect) setIsMobileFilterOpen(false);
              }}
              className={`w-full text-left py-1 px-2 rounded font-medium flex items-center justify-between ${
                selectedCategory === c.id ? 'bg-primary text-white font-bold' : 'text-darkText hover:bg-surface'
              }`}
            >
              <span>{c.name}</span>
              <span className="text-[11px] opacity-75">
                ({products.filter(p => p.category === c.id).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="pt-4 border-t border-borderSubtle">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-mutedText">
            Max Price
          </h4>
          <span className="font-heading font-bold text-xs text-darkText">
            {formatCurrency(priceRange)}
          </span>
        </div>
        <input
          type="range"
          min="800"
          max={maxCatalogPrice}
          step="200"
          value={Math.min(priceRange, maxCatalogPrice)}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-accent cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-mutedText mt-1">
          <span>₹800</span>
          <span>{formatCurrency(maxCatalogPrice)}</span>
        </div>
      </div>

      {/* Brands Filter */}
      <div className="pt-4 border-t border-borderSubtle">
        <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-mutedText mb-3">
          Brand
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {brands.map((b) => {
            const isChecked = selectedBrands.includes(b);
            return (
              <label key={b} className="flex items-center gap-2.5 text-xs text-darkText cursor-pointer hover:text-accent">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleBrand(b)}
                  className="rounded border-borderSubtle text-accent focus:ring-accent w-3.5 h-3.5"
                />
                <span>{b}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Customer Rating Filter */}
      <div className="pt-4 border-t border-borderSubtle">
        <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-mutedText mb-2.5">
          Rating
        </h4>
        <div className="space-y-1.5 text-xs">
          {[4, 3].map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRating(selectedRating === r ? 0 : r)}
              className={`flex items-center gap-1.5 w-full py-1 px-2 rounded transition-colors ${
                selectedRating === r ? 'bg-primary text-white font-bold' : 'text-darkText hover:bg-surface'
              }`}
            >
              <div className="flex items-center text-[#F59E0B]">
                {[...Array(r)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span>{r}★ & above</span>
            </button>
          ))}
        </div>
      </div>

      {/* In Stock Toggle */}
      <div className="pt-4 border-t border-borderSubtle">
        <label className="flex items-center gap-2.5 text-xs font-semibold text-darkText cursor-pointer">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="rounded border-borderSubtle text-accent focus:ring-accent w-4 h-4"
          />
          <span>In Stock Items Only</span>
        </label>
      </div>
    </>
  );

  return (
    <div className="bg-white min-h-screen py-6 sm:py-10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-mutedText mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-darkText font-semibold">Shop Catalog</span>
          {selectedCategory !== 'all' && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="capitalize text-accent">
                {selectedCategoryObj?.name || selectedCategory}
              </span>
            </>
          )}
          {selectedCategory === 'all' && activeFilter !== 'all' && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-accent">
                {FILTER_LABELS[activeFilter] || activeFilter}
              </span>
            </>
          )}
        </nav>

        {/* Page Heading Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-borderSubtle mb-8">
          <div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary">
              {pageTitle}
            </h1>
            <p className="text-sm text-mutedText mt-1.5 max-w-xl">
              Showing {filteredProducts.length} of {products.length} premium items. Refined materials and guaranteed authentic craftsmanship.
            </p>
          </div>

          {/* Controls: Search, Sort & Grid layout toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search input */}
            <div className="relative">
              <Search className="w-4 h-4 text-mutedText absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="pl-9 pr-3 py-2 text-xs font-medium rounded-sm border border-borderSubtle focus:border-accent outline-none w-44 sm:w-52 bg-surface focus:bg-white transition-all"
              />
            </div>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-3 text-xs font-semibold rounded-sm border border-borderSubtle bg-white text-darkText focus:border-accent outline-none cursor-pointer"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="newest">Sort by: Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="bestselling">Best Selling</option>
            </select>

            {/* Desktop Column Toggle */}
            <div className="hidden lg:flex items-center border border-borderSubtle rounded-sm overflow-hidden bg-white">
              <button
                onClick={() => setViewCols(3)}
                className={`p-2 transition-colors ${viewCols === 3 ? 'bg-primary text-white' : 'text-mutedText hover:text-darkText'}`}
                title="3 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewCols(4)}
                className={`p-2 transition-colors ${viewCols === 4 ? 'bg-primary text-white' : 'text-mutedText hover:text-darkText'}`}
                title="4 Columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter Trigger Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-primary text-white rounded-sm text-xs font-semibold"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs font-bold text-mutedText uppercase tracking-wider">Active:</span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface border border-borderSubtle rounded-full text-xs font-medium text-darkText">
                Category: {selectedCategoryObj?.name || selectedCategory}
                <button onClick={() => handleSelectCategory('all')} aria-label="Clear category filter"><X className="w-3 h-3 text-mutedText hover:text-error" /></button>
              </span>
            )}
            {activeFilter !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface border border-borderSubtle rounded-full text-xs font-medium text-darkText">
                Collection: {FILTER_LABELS[activeFilter] || activeFilter}
                <button onClick={handleClearFilterParam} aria-label="Clear collection filter"><X className="w-3 h-3 text-mutedText hover:text-error" /></button>
              </span>
            )}
            {selectedBrands.map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface border border-borderSubtle rounded-full text-xs font-medium text-darkText">
                Brand: {b}
                <button onClick={() => toggleBrand(b)}><X className="w-3 h-3 text-mutedText hover:text-error" /></button>
              </span>
            ))}
            {priceRange < maxCatalogPrice && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface border border-borderSubtle rounded-full text-xs font-medium text-darkText">
                Under {formatCurrency(priceRange)}
                <button onClick={() => setPriceRange(maxCatalogPrice)}><X className="w-3 h-3 text-mutedText hover:text-error" /></button>
              </span>
            )}
            {selectedRating > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface border border-borderSubtle rounded-full text-xs font-medium text-darkText">
                {selectedRating}★ & above
                <button onClick={() => setSelectedRating(0)}><X className="w-3 h-3 text-mutedText hover:text-error" /></button>
              </span>
            )}
            {onlyInStock && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface border border-borderSubtle rounded-full text-xs font-medium text-darkText">
                In Stock Only
                <button onClick={() => setOnlyInStock(false)}><X className="w-3 h-3 text-mutedText hover:text-error" /></button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-accent hover:underline flex items-center gap-1 ml-2"
            >
              <RotateCcw className="w-3 h-3" /> Clear All
            </button>
          </div>
        )}

        {/* Main Grid: Sidebar + Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-surface/50 border border-borderSubtle rounded-lg p-5">
            {renderFilterControls(false)}
          </aside>

          {/* Product Grid Area (9 cols) */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-surface/40 rounded-xl border border-borderSubtle p-8">
                <p className="font-heading font-bold text-lg text-darkText mb-2">No matching products found</p>
                <p className="text-xs text-mutedText max-w-sm mx-auto mb-6">
                  Try adjusting your filters, clearing your search query or broadening the price limit.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-primary text-white rounded-sm font-heading font-semibold text-xs hover:bg-primary-hover transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div
                  className={`grid grid-cols-2 ${
                    viewCols === 3
                      ? 'sm:grid-cols-2 md:grid-cols-3'
                      : 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                  } gap-4 sm:gap-6`}
                >
                  {filteredProducts
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onQuickView={(p) => setQuickViewProduct(p)}
                      />
                    ))}
                </div>

                {/* Pagination Controls */}
                {Math.ceil(filteredProducts.length / itemsPerPage) > 1 && (
                  <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-borderSubtle">
                    <p className="text-xs text-mutedText">
                      Showing <span className="font-bold text-darkText">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                      <span className="font-bold text-darkText">
                        {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
                      </span>{' '}
                      of <span className="font-bold text-darkText">{filteredProducts.length}</span> products
                    </p>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setCurrentPage((p) => Math.max(1, p - 1));
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 rounded border border-borderSubtle text-xs font-semibold text-darkText hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>

                      {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => {
                              setCurrentPage(page);
                              window.scrollTo({ top: 120, behavior: 'smooth' });
                            }}
                            className={`w-8 h-8 rounded text-xs font-bold transition-all ${
                              currentPage === page
                                ? 'bg-primary text-white shadow-sm'
                                : 'border border-borderSubtle text-darkText hover:bg-surface'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}

                      <button
                        onClick={() => {
                          setCurrentPage((p) => Math.min(Math.ceil(filteredProducts.length / itemsPerPage), p + 1));
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
                        className="px-3 py-1.5 rounded border border-borderSubtle text-xs font-semibold text-darkText hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs lg:hidden flex justify-end"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsMobileFilterOpen(false);
          }}
        >
          <div className="w-full max-w-xs bg-white h-full overflow-y-auto p-5 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-borderSubtle">
              <span className="font-heading font-bold text-base text-primary">Catalog Filters</span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 rounded-lg text-mutedText hover:text-darkText hover:bg-surface"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {renderFilterControls(true)}
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-2.5 bg-primary text-white text-xs font-heading font-bold rounded hover:bg-primary-hover transition-colors"
            >
              Show {filteredProducts.length} Results
            </button>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-mutedText">Loading products...</div>}>
      <ShopContent />
    </Suspense>
  );
}
