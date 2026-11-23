'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { ShoppingBag, Search, User, Heart, ChevronDown, Menu, X, ShieldCheck } from 'lucide-react';
import { categories } from '@/data/categories';

export default function Navbar() {
  const pathname = usePathname();
  const { cartItemCount, wishlist, setIsCartDrawerOpen, setIsSearchOpen, setIsAuthModalOpen, user } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop', hasDropdown: true },
    { label: 'Categories', href: '/#categories', hasCategories: true },
    { label: 'New Arrivals', href: '/shop?filter=new' },
    { label: 'Best Sellers', href: '/shop?filter=bestseller' },
    { label: 'Offers', href: '/shop?filter=discount' },
  ];

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-subtle border-b border-borderSubtle py-3.5'
          : 'bg-white border-b border-borderSubtle py-4'
        }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-darkText p-1.5 -ml-1 rounded-md hover:bg-surface"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm group-hover:bg-primary-hover transition-colors">
              <ShoppingBag className="w-5 h-5 text-accent" />
            </div>
            <span className="font-heading font-extrabold text-2xl tracking-tight text-primary">
              Shipflux
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <div key={link.label} className="relative group">
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 font-heading text-[15px] font-semibold transition-colors py-2 ${isActive ? 'text-primary' : 'text-darkText hover:text-accent'
                    }`}
                >
                  {link.label}
                  {(link.hasDropdown || link.hasCategories) && (
                    <ChevronDown className="w-3.5 h-3.5 text-mutedText group-hover:text-accent transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent rounded-full" />
                )}

                {/* Dropdown Menu for Shop / Categories */}
                {link.hasDropdown && (
                  <div className="absolute top-full left-0 w-56 bg-white border border-borderSubtle rounded-md shadow-hover py-3 px-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                    <Link href="/shop" className="block px-3 py-2 text-sm font-semibold text-darkText hover:text-accent hover:bg-surface rounded-sm transition-colors">
                      All Products
                    </Link>
                    <Link href="/shop?filter=new" className="block px-3 py-2 text-sm text-darkText hover:text-accent hover:bg-surface rounded-sm transition-colors">
                      New Arrivals
                    </Link>
                    <Link href="/shop?filter=bestseller" className="block px-3 py-2 text-sm text-darkText hover:text-accent hover:bg-surface rounded-sm transition-colors">
                      Best Sellers
                    </Link>
                    <Link href="/shop?filter=discount" className="block px-3 py-2 text-sm text-darkText hover:text-accent hover:bg-surface rounded-sm transition-colors">
                      Sale & Special Deals
                    </Link>
                  </div>
                )}

                {link.hasCategories && (
                  <div className="absolute top-full -left-12 w-72 bg-white border border-borderSubtle rounded-md shadow-hover py-3 px-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 grid grid-cols-1 gap-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/shop?category=${cat.id}`}
                        className="flex items-center justify-between px-3 py-2 text-sm text-darkText hover:text-accent hover:bg-surface rounded-sm transition-colors"
                      >
                        <span className="font-medium">{cat.name}</span>
                        <span className="text-xs text-mutedText font-normal">({cat.itemCount})</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3.5">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-darkText hover:bg-surface transition-colors"
            aria-label="Search products"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* User Account */}
          <Link
            href="/account"
            className="w-10 h-10 rounded-full flex items-center justify-center text-darkText hover:bg-surface transition-colors"
            aria-label="My Account"
          >
            <User className="w-5 h-5" />
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="w-10 h-10 rounded-full flex items-center justify-center text-darkText hover:bg-surface transition-colors relative"
            aria-label="Saved Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-accent text-white font-bold text-[10px] flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Shopping Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-darkText hover:bg-surface transition-colors relative"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-accent text-white font-bold text-[10px] flex items-center justify-center shadow-sm">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white border-b border-borderSubtle shadow-lg p-5 z-40 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="py-2.5 text-base font-semibold text-darkText border-b border-borderSubtle/60 flex items-center justify-between"
              >
                <span>{link.label}</span>
              </Link>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-mutedText">Browse Categories</span>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/shop?category=${c.id}`}
                    className="p-2 text-xs font-medium bg-surface rounded text-darkText hover:text-accent"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-borderSubtle flex items-center justify-between">
              <Link href="/account" className="text-sm font-semibold text-darkText">
                My Profile
              </Link>
              <Link href="/wishlist" className="text-sm font-semibold text-accent">
                Saved Items ({wishlist.length})
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
