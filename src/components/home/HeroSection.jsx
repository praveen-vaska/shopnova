'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      badge: "NEW SEASON ESSENTIALS",
      category: "Fashion & Apparel",
      headline: "Discover Your Next Favourite.",
      subtext: "Explore thoughtfully selected products across fashion, technology, lifestyle and more.",
      primaryImg: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900&auto=format&fit=crop",
      primaryCta: "Explore Collection",
      secondaryCta: "Discover What's New",
      primaryLink: "/shop",
      secondaryLink: "/shop?filter=new",
      floatingCard1: {
        title: "Top Rated Audio",
        name: "Wireless Headphones",
        price: "₹2,499",
        link: "/product/prod-7",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop"
      },
      floatingCard2: {
        title: "Home Decor",
        name: "Minimalist Table Lamp",
        price: "₹899",
        link: "/product/prod-11",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=200&auto=format&fit=crop"
      }
    },
    {
      badge: "AUDIO REVOLUTION",
      category: "Electronics & Sound",
      headline: "Sound, Reimagined In Pure Hi-Fi.",
      subtext: "Acoustic precision meets Scandinavian minimalist aesthetics in our studio audio collection.",
      primaryImg: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=900&auto=format&fit=crop",
      primaryCta: "Explore Collection",
      secondaryCta: "Shop Electronics",
      primaryLink: "/shop?category=electronics",
      secondaryLink: "/shop?category=electronics",
      floatingCard1: {
        title: "Smart Wearable",
        name: "Smart Watch Pro Titanium",
        price: "₹3,499",
        link: "/product/prod-8",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop"
      },
      floatingCard2: {
        title: "Studio Acoustics",
        name: "True Wireless Earbuds",
        price: "₹1,899",
        link: "/product/prod-9",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=200&auto=format&fit=crop"
      }
    },
    {
      badge: "TIMELESS SPACES",
      category: "Home & Sanctuary",
      headline: "Curated Living For Modern Homes.",
      subtext: "Bring warmth, serene lighting and handcrafted ceramics into your daily everyday sanctuary.",
      primaryImg: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=900&auto=format&fit=crop",
      primaryCta: "Explore Collection",
      secondaryCta: "View Decor",
      primaryLink: "/shop?category=home-living",
      secondaryLink: "/shop?category=home-living",
      floatingCard1: {
        title: "Artisanal Decor",
        name: "Handcrafted Vase Set",
        price: "₹1,199",
        link: "/product/prod-12",
        image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?q=80&w=200&auto=format&fit=crop"
      },
      floatingCard2: {
        title: "Textiles",
        name: "Linen Throw Blanket",
        price: "₹1,599",
        link: "/product/prod-13",
        image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=200&auto=format&fit=crop"
      }
    },
    {
      badge: "RADIANT WELLNESS",
      category: "Beauty & Botanical",
      headline: "Pure Formulas. Natural Glow.",
      subtext: "Dermatologist-tested, clean botanical skincare and nourishing self-care rituals.",
      primaryImg: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=900&auto=format&fit=crop",
      primaryCta: "Explore Collection",
      secondaryCta: "Shop Skincare",
      primaryLink: "/shop?category=beauty",
      secondaryLink: "/shop?category=beauty",
      floatingCard1: {
        title: "Youth Serum",
        name: "Hydrating Rose Elixir",
        price: "₹1,249",
        link: "/product/prod-15",
        image: "https://images.unsplash.com/photo-1608248597359-26939f7a77d7?q=80&w=200&auto=format&fit=crop"
      },
      floatingCard2: {
        title: "Daily Radiance",
        name: "Botanical Face Crème",
        price: "₹999",
        link: "/product/prod-14",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop"
      }
    }
  ];

  // Auto-play carousel automatically every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const current = heroSlides[activeSlide];

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <section className="bg-secondary relative overflow-hidden pt-8 pb-14 md:py-16 border-b border-borderSubtle">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center max-w-2xl">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-accent font-heading">
                {current.badge}
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 
              key={`head-${activeSlide}`} 
              className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-primary leading-[1.08] tracking-tight mb-5 transition-all duration-300"
            >
              {current.headline}
            </h1>

            {/* Supporting Text */}
            <p 
              key={`sub-${activeSlide}`} 
              className="text-base sm:text-lg text-mutedText leading-relaxed mb-8 max-w-xl font-normal transition-all duration-300"
            >
              {current.subtext}
            </p>

            {/* CTAs with Guaranteed High Contrast & Prominent Styling */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link
                href={current.primaryLink}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-md font-heading font-bold text-sm tracking-wide text-white bg-[#C6A477] hover:bg-[#171717] shadow-md hover:shadow-xl transition-all duration-300 active:scale-[0.98] group"
                style={{ backgroundColor: '#C6A477', color: '#FFFFFF' }}
              >
                <span>{current.primaryCta}</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>

              <Link
                href={current.secondaryLink}
                className="inline-flex items-center px-7 py-4 rounded-md font-heading font-semibold text-sm text-darkText bg-white border border-borderDark hover:bg-surface hover:border-primary shadow-sm transition-all duration-300 active:scale-[0.98]"
              >
                {current.secondaryCta}
              </Link>
            </div>

            {/* Value Propositions Trust Bar */}
            <div className="pt-8 border-t border-borderSubtle grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/15 text-accent flex items-center justify-center flex-shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-primary">Free Delivery</h4>
                  <p className="text-[11px] text-mutedText">Above ₹999 nationwide</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/15 text-accent flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-primary">Secure Payments</h4>
                  <p className="text-[11px] text-mutedText">100% Verified Gateway</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/15 text-accent flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-primary">Easy Returns</h4>
                  <p className="text-[11px] text-mutedText">Doorstep 7-day pickup</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Carousel Column (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[460px]">
              {/* Main Model/Hero Card Carousel with Crossfade & Slide Zoom */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-borderSubtle bg-white">
                {heroSlides.map((slide, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      activeSlide === idx 
                        ? 'opacity-100 scale-100 z-10' 
                        : 'opacity-0 scale-105 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={slide.primaryImg}
                      alt={slide.headline}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                  </div>
                ))}

                {/* Slide Category & Counter Header Badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-heading text-[11px] font-bold tracking-wider uppercase border border-white/20">
                    {current.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-20">
                  <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-primary font-heading text-[11px] font-extrabold tracking-widest shadow-sm">
                    0{activeSlide + 1} / 0{heroSlides.length}
                  </span>
                </div>

                {/* Left/Right Carousel Nav Arrows */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 text-primary shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all z-20 border border-borderSubtle"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 text-primary" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 text-primary shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all z-20 border border-borderSubtle"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 text-primary" />
                </button>

                {/* Animated Slide Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 z-20 overflow-hidden">
                  <div 
                    key={`bar-${activeSlide}`}
                    className="h-full bg-accent transition-all duration-[4000ms] ease-linear w-full origin-left animate-slide-progress"
                    style={{
                      animation: 'slideProgress 4s linear'
                    }}
                  />
                </div>
              </div>

              {/* Floating Top Right Card */}
              <Link
                key={`float1-${activeSlide}`}
                href={current.floatingCard1.link}
                className="hidden sm:flex absolute -top-5 -right-5 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-xl border border-borderSubtle items-center gap-3 w-56 hover:scale-105 transition-all z-20 group animate-fade-in"
              >
                <img
                  src={current.floatingCard1.image}
                  alt={current.floatingCard1.name}
                  className="w-12 h-12 object-cover rounded-lg bg-surface flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-accent uppercase tracking-wider">
                    {current.floatingCard1.title}
                  </p>
                  <p className="font-heading font-semibold text-xs text-darkText truncate group-hover:text-accent transition-colors">
                    {current.floatingCard1.name}
                  </p>
                  <p className="font-heading font-bold text-xs text-darkText mt-0.5">
                    {current.floatingCard1.price}
                  </p>
                </div>
              </Link>

              {/* Floating Bottom Left Card */}
              <Link
                key={`float2-${activeSlide}`}
                href={current.floatingCard2.link}
                className="hidden sm:flex absolute -bottom-5 -left-5 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-xl border border-borderSubtle items-center gap-3 w-56 hover:scale-105 transition-all z-20 group animate-fade-in"
              >
                <img
                  src={current.floatingCard2.image}
                  alt={current.floatingCard2.name}
                  className="w-12 h-12 object-cover rounded-lg bg-surface flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-accent uppercase tracking-wider">
                    {current.floatingCard2.title}
                  </p>
                  <p className="font-heading font-semibold text-xs text-darkText truncate group-hover:text-accent transition-colors">
                    {current.floatingCard2.name}
                  </p>
                  <p className="font-heading font-bold text-xs text-darkText mt-0.5">
                    {current.floatingCard2.price}
                  </p>
                </div>
              </Link>

              {/* Carousel Indicator Dots */}
              <div className="flex items-center justify-center gap-2.5 mt-6">
                {heroSlides.map((slide, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeSlide === idx 
                        ? 'w-8 bg-accent' 
                        : 'w-2.5 bg-borderDark hover:bg-mutedText'
                    }`}
                    aria-label={`Go to ${slide.category}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
